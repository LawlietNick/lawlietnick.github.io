import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { siteConfig } from "./src/data/site.js";

export default defineConfig({
  site: siteConfig.url,
  integrations: [react()],
  trailingSlash: "always",
  prefetch: { prefetchAll: true },   // prefetch internal links on hover/tap
  redirects: {
    "/work": "/services/",
    "/fi/work": "/fi/palvelut/",
    "/fi/tools": "/fi/tyokalut/",
    "/fi/templates": "/fi/toteutusmallit/",
    "/tools/form-type-picker": "/tools/form-name-builder/",
  },
});
