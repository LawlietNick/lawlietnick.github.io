import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import githubDark from "@shikijs/themes/github-dark";
import { createHash } from "node:crypto";
import { readdir, readFile, rm } from "node:fs/promises";
import { siteConfig, showServices } from "./src/data/site.js";
import { allInteractiveTools } from "./src/data/interactive-tools.js";
import { toolkit } from "./src/data/toolkit.js";

// Astro hashes the scripts it bundles, but not `is:inline` scripts or raw <script>
// blocks inside markdown. Hash those from source so the CSP <meta> allows them;
// editing a script updates its hash on the next build.
const srcDir = new URL("./src/", import.meta.url);
const inlineScriptHashes = [];
for (const file of (await readdir(srcDir, { recursive: true })).filter((f) => /\.(astro|md)$/.test(f))) {
  let source = await readFile(new URL(file, srcDir), "utf8");
  if (file.endsWith(".md")) source = source.replace(/^```[\s\S]*?^```/gm, "");
  for (const [, attrs, body] of source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc=|type="application\/(ld\+)?json"/.test(attrs)) continue;
    if (file.endsWith(".astro") && !/\bis:inline\b/.test(attrs)) continue;
    inlineScriptHashes.push(`sha256-${createHash("sha256").update(body).digest("base64")}`);
  }
}

export default defineConfig({
  site: siteConfig.url,
  markdown: {
    shikiConfig: {
      // Keep the existing code palette; make explanatory comments readable.
      theme: {
        ...githubDark,
        name: "github-dark-accessible",
        tokenColors: githubDark.tokenColors.map((token) => token.scope.includes("comment")
          ? { ...token, settings: { ...token.settings, foreground: "#8b949e" } }
          : token),
      },
    },
  },
  integrations: [
    react(),
    // `draft: true` in any src/pages markdown frontmatter or interactive-tools.js entry (and the services
    // section while showServices is false) is deleted from the production
    // output; `astro dev` still serves it for preview.
    {
      name: "drop-unpublished",
      hooks: {
        "astro:build:done": async ({ dir }) => {
          const pages = new URL("./src/pages/", import.meta.url);
          const md = (await readdir(pages, { recursive: true })).filter((f) => f.endsWith(".md"));
          const drafts = [];
          for (const f of md) {
            const fm = (await readFile(new URL(f, pages), "utf8")).match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
            if (/^draft:\s*true\s*$/m.test(fm)) drafts.push(f.replace(/\\/g, "/").replace(/\.md$/, "/"));
          }
          for (const t of allInteractiveTools.filter((t) => t.draft)) {
            if (t.en) drafts.push(`${t.category}/${t.en.slug ?? t.slug}/`);
            if (t.fi) drafts.push(`fi/${toolkit.find((c) => c.slug === t.category).fiSlug}/${t.fi.slug ?? t.slug}/`);
          }
          const hidden = showServices ? [] : ["services/", "fi/palvelut/"];
          await Promise.all([...drafts, ...hidden].map((p) => rm(new URL(p, dir), { recursive: true, force: true })));
        },
      },
    },
  ],
  // GitHub Pages cannot send response headers, so the CSP ships as a <meta> tag:
  // Astro hashes every bundled script; see inlineScriptHashes for the rest.
  security: {
    csp: {
      directives: ["object-src 'none'", "base-uri 'self'", "form-action 'self'"],
      scriptDirective: {
        resources: ["'self'", "https://app.rybbit.io"], // Rybbit analytics (Base.astro)
        hashes: [...new Set(inlineScriptHashes)],
      },
      styleDirective: {
        // Mermaid and Shiki style at runtime, so styles stay inline-allowed;
        // script-src (the part that stops XSS) keeps its strict hash list.
        resources: ["'self'", "'unsafe-inline'"],
      },
    },
  },
  trailingSlash: "always",
  // ponytail: CSS inline in every page (~17 KiB gz) removes the render-blocking
  // request; most visits land on one page from search, so the lost cache costs little
  build: { inlineStylesheets: "always" },
  // Keep ClientRouter navigation without its extra prefetch dependency.
  prefetch: false,
  // markdown ![]() images from src/assets get webp + srcset/sizes; components
  // that pass their own widths/sizes keep them (Astro only fills gaps)
  image: { layout: "constrained" },
  redirects: {
    "/work": showServices ? "/services/" : "/about/",
    "/fi/work": showServices ? "/fi/palvelut/" : "/fi/minusta/",
    // URLs from the previous karppinen.one site (Astro Nano), kept alive after the move
    "/blog/cookiebot-guide": "/templates/cookiebot-guide/",
    "/projects": "/about/",
    "/projects/podcast-hakuammuntaa": "/about/",
    "/projects/podcast-signal": "/about/",
    "/fi/tools": "/fi/tyokalut/",
    "/fi/templates": "/fi/toteutusmallit/",
    "/tools/form-type-picker": "/tools/form-name-builder/",
  },
});
