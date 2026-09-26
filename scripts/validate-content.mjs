// Build-time validation for file-routed content that has no Astro collection
// guarding it (services now, tools later), plus EN<->FI `alternate` reciprocity
// for every translated content type. Blog schema is validated by its collection;
// here blog only gets the alternate check. Add a new type to `types` to extend.
import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import yaml from "js-yaml";
import { z } from "zod";
import { formCategories, formTypes } from "../src/data/form-types.js";

const root = process.cwd();
const pagesRoot = path.join(root, "src/pages");

const serviceSchema = z
  .object({
    title: z.string().min(1),
    group: z.enum(["seo", "analytics", "reporting"]),
    order: z.number(),
    icon: z.string().min(1),
    summary: z.string().min(1),
    navSummary: z.string().max(60).optional(), // short line for the nav menus
    format: z.enum(["fixed", "monthly"]),
    deliverables: z.array(z.string()).optional(),
    ctaLabel: z.string().min(1).optional(),
    ctaHref: z.string().min(1).optional(),
    related: z.array(z.string().min(1)).optional(),
    stage: z.enum(["diagnose", "build", "improve"]).optional(),
    stageOrder: z.number().optional(),
    primaryKeyword: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    faq: z.array(z.object({ q: z.string().min(1), a: z.string().min(1) })).optional(),
    nextSteps: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) })).optional(),
  })
  .passthrough(); // layout + alternate are page keys, checked separately

const toolSchema = z
  .object({
    title: z.string().min(1),
    category: z.enum(["tools", "templates"]),
    order: z.number(),
    summary: z.string().min(1),
    icon: z.string().min(1).optional(),
    ctaLabel: z.string().min(1).optional(),
    ctaHref: z.string().min(1).optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  })
  .passthrough();

// one entry per toolkit category; empty dirs are simply skipped
const toolType = (name, enDir, fiDir, enPrefix, fiPrefix, requireAlternate = true) => ({
  name,
  dirs: { en: enDir, fi: fiDir },
  prefix: { en: enPrefix, fi: fiPrefix },
  schema: toolSchema,
  requireAlternate,
});

const types = [
  {
    name: "post",
    dirs: { en: "src/pages/blog", fi: "src/pages/fi/blog" },
    prefix: { en: "/blog/", fi: "/fi/blog/" },
    schema: null, // validated by the blog content collection
    requireAlternate: false, // posts may be untranslated
  },
  {
    name: "service",
    dirs: { en: "src/pages/services", fi: "src/pages/fi/palvelut" },
    prefix: { en: "/services/", fi: "/fi/palvelut/" },
    schema: serviceSchema,
    requireAlternate: true,
    // EN service pages drive the situation-grouped hub, so they need these
    extra: (data, lang, file, errors) => {
      if (lang === "en" && (data.stage === undefined || data.stageOrder === undefined)) {
        errors.push(`${file}: EN service page needs both 'stage' and 'stageOrder'.`);
      }
    },
  },
  toolType("tool:tools", "src/pages/tools", "src/pages/fi/tyokalut", "/tools/", "/fi/tyokalut/"),
  toolType("tool:templates", "src/pages/templates", "src/pages/fi/toteutusmallit", "/templates/", "/fi/toteutusmallit/", false),
];

const routeFor = (file) =>
  `/${path.relative(pagesRoot, file).split(path.sep).join("/").replace(/\.md$/, "")}/`;

async function mdFiles(dir) {
  const abs = path.join(root, dir);
  const entries = await readdir(abs, { withFileTypes: true }).catch(() => []);
  return entries.filter((e) => e.isFile() && e.name.endsWith(".md")).map((e) => path.join(abs, e.name));
}

function frontmatter(source, file) {
  const m = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!m) throw new Error(`${file}: missing YAML frontmatter.`);
  return yaml.load(m[1]) ?? {};
}

// Docs quote form taxonomy values as worked examples. A rename in
// src/data/form-types.js silently leaves those examples describing a value that
// no longer exists, so check every quoted pair against the taxonomy here.
const categoryIds = formCategories.map((c) => c.id);
const typesByCategory = new Map(
  categoryIds.map((id) => [id, new Set(formTypes.filter((t) => t.category === id).map((t) => t.type))])
);
const allTypeNames = new Set(formTypes.map((t) => t.type));

// "Lead : Gated Content" — the type must belong to that category.
const pairPattern = new RegExp(`\\b(${categoryIds.join("|")}) : ([^|"'\`\\n<]+)`, "g");
// "Event Registration : …" — a label pasted where the category belongs.
const labelPattern = new RegExp(`\\b((?:[A-Z][A-Za-z]+ ){1,2}(?:${categoryIds.join("|")})|(?:${categoryIds.join("|")}) [A-Z][A-Za-z]+) :`, "g");
const fieldPattern = /\b\w*form_(category|type|full_name):\s*["']([^"']+)["']/g;

function checkTaxonomy(source, file, errors) {
  for (const [, category, rest] of source.matchAll(pairPattern)) {
    const type = rest.trim().replace(/[.,;:)\]]+$/, "");
    if (!type || typesByCategory.get(category).has(type)) continue;
    errors.push(`${file}: "${category} : ${type}" is not in the form taxonomy.`);
  }

  for (const [, label] of source.matchAll(labelPattern)) {
    errors.push(`${file}: "${label} :" puts a type label where the category belongs.`);
  }

  for (const [, field, value] of source.matchAll(fieldPattern)) {
    if (field === "category" && !categoryIds.includes(value)) {
      errors.push(`${file}: form_category "${value}" is not a form category.`);
    }
    if (field === "type" && !allTypeNames.has(value)) {
      errors.push(`${file}: form_type "${value}" is not a form type.`);
    }
    if (field === "full_name") {
      const [head, ...tail] = value.split(" | ");
      const [category, type] = head.split(" : ").map((x) => (x ?? "").trim());
      if (!typesByCategory.get(category)?.has(type) || !tail.length) {
        errors.push(`${file}: form_full_name "${value}" does not match "Category : Type | Name".`);
      }
    }
  }
}

const errors = [];

for (const type of types) {
  const entries = new Map(); // route -> { file, lang, data }
  for (const [lang, dir] of Object.entries(type.dirs)) {
    for (const file of await mdFiles(dir)) {
      const rel = path.relative(root, file);
      const source = await readFile(file, "utf8");
      const data = frontmatter(source, rel);
      checkTaxonomy(source, rel, errors);

      if (type.schema) {
        const parsed = type.schema.safeParse(data);
        if (!parsed.success) {
          for (const issue of parsed.error.issues) {
            errors.push(`${rel}: ${issue.path.join(".") || "(root)"} — ${issue.message}`);
          }
        }
      }
      // BlogImage only emits <Picture> (webp + widths + intrinsic size) when the
      // frontmatter image has a src/assets twin; without it the fallback <img>
      // ships with no width/height and shifts the layout. Silent, so check here.
      if (typeof data.image === "string" && data.image.startsWith("/images/blog/")) {
        const asset = path.join(root, "src/assets/blog", path.basename(data.image));
        if (!existsSync(asset)) {
          errors.push(`${rel}: image ${data.image} has no src/assets/blog copy.`);
        }
      }

      // Body images are optimized only as ![alt](@assets/…) — a raw <img> or a
      // public /images/blog path ships the full jpeg, and a raw <img> with a
      // relative path is emitted untouched and 404s. Silent too, so check here.
      for (const [tag, src] of source.matchAll(/<img\b[^>]*?\bsrc="([^"]*)"/g)) {
        if (src.startsWith("/images/blog/") || !/^(\/|https?:|data:)/.test(src)) {
          errors.push(`${rel}: ${tag.slice(0, 60)}… — use ![alt](@assets/blog/…) so Astro optimizes it.`);
        }
      }
      for (const [, src] of source.matchAll(/!\[[^\]]*\]\((\/images\/blog\/[^)\s]+)/g)) {
        errors.push(`${rel}: ![](${src}) is not optimized — move it to src/assets/blog and use @assets/blog/….`);
      }

      type.extra?.(data, lang, rel, errors);
      entries.set(routeFor(file), { file: rel, lang, data });
    }
  }

  // alternate presence + reciprocity
  for (const [route, entry] of entries) {
    const alt = entry.data.alternate;
    if (!alt) {
      if (type.requireAlternate) errors.push(`${entry.file}: missing 'alternate' (EN<->FI pairing).`);
      continue;
    }
    const other = entry.lang === "fi" ? "en" : "fi";
    if (alt.lang !== other) {
      errors.push(`${entry.file}: alternate.lang must be '${other}'.`);
      continue;
    }
    if (typeof alt.href !== "string" || !alt.href.startsWith(type.prefix[other]) || !alt.href.endsWith("/")) {
      errors.push(`${entry.file}: alternate.href must use ${type.prefix[other]} and end with '/'.`);
      continue;
    }
    const target = entries.get(alt.href);
    if (!target) {
      errors.push(`${entry.file}: alternate target ${alt.href} does not exist.`);
      continue;
    }
    if (target.data.alternate?.href !== route) {
      errors.push(`${target.file}: reciprocal alternate must point back to ${route}.`);
    }
  }
}

if (errors.length) {
  console.error("Content validation failed:\n" + errors.map((e) => `- ${e}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("Content validation passed.");
}
