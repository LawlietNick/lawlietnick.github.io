import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { readdir, readFile, rm } from "node:fs/promises";
import { siteConfig, showServices } from "./src/data/site.js";
import { allInteractiveTools } from "./src/data/interactive-tools.js";
import { toolkit } from "./src/data/toolkit.js";

export default defineConfig({
  site: siteConfig.url,
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
          const hidden = showServices ? [] : ["services/", "fi/palvelut/", "work/", "fi/work/"];
          await Promise.all([...drafts, ...hidden].map((p) => rm(new URL(p, dir), { recursive: true, force: true })));
        },
      },
    },
  ],
  trailingSlash: "always",
  prefetch: { prefetchAll: true },   // prefetch internal links on hover/tap
  // markdown ![]() images from src/assets get webp + srcset/sizes; components
  // that pass their own widths/sizes keep them (Astro only fills gaps)
  image: { layout: "constrained" },
  redirects: {
    ...(showServices && { "/work": "/services/", "/fi/work": "/fi/palvelut/" }),
    "/fi/tools": "/fi/tyokalut/",
    "/fi/templates": "/fi/toteutusmallit/",
    "/tools/form-type-picker": "/tools/form-name-builder/",
  },
});
