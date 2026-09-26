import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { siteConfig } from "./src/data/site.js";

export default defineConfig({
  site: siteConfig.url,
  integrations: [react()],
  trailingSlash: "always",
  prefetch: { prefetchAll: true },   // prefetch internal links on hover/tap
  // markdown ![]() images from src/assets get webp + srcset/sizes; components
  // that pass their own widths/sizes keep them (Astro only fills gaps)
  image: { layout: "constrained" },
  redirects: {
    "/work": "/services/",
    "/fi/work": "/fi/palvelut/",
    "/fi/tools": "/fi/tyokalut/",
    "/fi/templates": "/fi/toteutusmallit/",
    "/tools/form-type-picker": "/tools/form-name-builder/",
  },
});
