import { siteConfig } from "../data/site.js";

// The previous site's sitemap lived here (and may still be submitted in Search Console):
// point it at the current sitemap.
export const prerender = true;

export function GET({ site }) {
  const sitemap = new URL("/sitemap.xml", site ?? siteConfig.url).toString();
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${sitemap}</loc></sitemap>
</sitemapindex>
`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
