import { interactiveTools } from "../data/interactive-tools.js";
import { siteConfig, showServices } from "../data/site.js";

export const prerender = true;

const staticRoutes = [
  "/",
  "/blog/",
  "/about/",
  "/fi/",
  "/fi/minusta/",
  "/fi/blog/",
  ...(showServices ? ["/services/", "/fi/palvelut/"] : []),
];

const blogModules = import.meta.glob("./blog/*.md", { eager: true });
const finnishBlogModules = import.meta.glob("./fi/blog/*.md", { eager: true });
const serviceModules = showServices ? import.meta.glob("./services/*.md", { eager: true }) : {};
const finnishServiceModules = showServices ? import.meta.glob("./fi/palvelut/*.md", { eager: true }) : {};

// toolkit: a category hub is only indexable (and in the sitemap) once it has items
// (markdown entries or interactive .astro tools)
const toolCategories = [
  { hub: "/tools/", cat: "tools", lang: "en", items: import.meta.glob("./tools/*.md", { eager: true }) },
  { hub: "/templates/", cat: "templates", lang: "en", items: import.meta.glob("./templates/*.md", { eager: true }) },
  { hub: "/fi/tyokalut/", cat: "tools", lang: "fi", items: import.meta.glob("./fi/tyokalut/*.md", { eager: true }) },
  { hub: "/fi/toteutusmallit/", cat: "templates", lang: "fi", items: import.meta.glob("./fi/toteutusmallit/*.md", { eager: true }) },
];

const withTrailingSlash = (path) => path.endsWith("/") ? path : `${path}/`;

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const uniqueRoutes = (routes) => [...new Set(routes)].sort();

// noindex and draft pages never belong in the sitemap
const isIndexable = (page) => !page.frontmatter?.noindex && !page.frontmatter?.draft;
// lastmod comes from frontmatter where the content type has a date; static hubs have none
const lastmodOf = (page) => page.frontmatter?.updated ?? page.frontmatter?.date;

export function GET({ site }) {
  const baseUrl = new URL(site ?? siteConfig.url);
  const toolkitPages = [];
  const toolkitRoutes = toolCategories.flatMap(({ hub, cat, lang, items }) => {
    const pages = Object.values(items).filter(isIndexable);
    toolkitPages.push(...pages);
    const mdRoutes = pages.map((page) => withTrailingSlash(page.url));
    const interactiveRoutes = interactiveTools
      .filter((t) => t.category === cat && t[lang])
      .map((t) => `${hub}${t[lang].slug ?? t.slug}/`);
    const all = [...mdRoutes, ...interactiveRoutes];
    return all.length ? [hub, ...all] : [];
  });
  const mdPages = [
    ...Object.values(serviceModules),
    ...Object.values(finnishServiceModules),
    ...Object.values(blogModules),
    ...Object.values(finnishBlogModules),
  ].filter(isIndexable);
  const mdRoutes = mdPages.map((page) => withTrailingSlash(page.url));
  const lastmod = new Map(
    [...mdPages, ...toolkitPages]
      .map((page) => [withTrailingSlash(page.url), lastmodOf(page)])
      .filter(([, date]) => date)
      .map(([route, date]) => [route, new Date(date).toISOString().slice(0, 10)]),
  );
  const routes = uniqueRoutes([
    ...staticRoutes,
    ...toolkitRoutes,
    ...mdRoutes,
  ]);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => `  <url>
    <loc>${escapeXml(new URL(route, baseUrl).toString())}</loc>${
    lastmod.has(route) ? `\n    <lastmod>${lastmod.get(route)}</lastmod>` : ""
  }
  </url>`)
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
