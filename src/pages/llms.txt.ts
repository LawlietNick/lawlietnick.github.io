import { interactiveTools } from "../data/interactive-tools.js";
import { siteConfig, siteName } from "../data/site.js";

export const prerender = true;

type Page = { url?: string; frontmatter?: Record<string, any> };

const enServices = import.meta.glob<Page>("./services/*.md", { eager: true });
const fiServices = import.meta.glob<Page>("./fi/palvelut/*.md", { eager: true });
const enPosts = import.meta.glob<Page>("./blog/*.md", { eager: true });
const fiPosts = import.meta.glob<Page>("./fi/blog/*.md", { eager: true });
const enTools = import.meta.glob<Page>("./tools/*.md", { eager: true });
const enTemplates = import.meta.glob<Page>("./templates/*.md", { eager: true });
const fiTools = import.meta.glob<Page>("./fi/tyokalut/*.md", { eager: true });
const fiTemplates = import.meta.glob<Page>("./fi/toteutusmallit/*.md", { eager: true });

const withTrailingSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);

// one line of text, no newlines, so a description never breaks the list structure
const oneLine = (value: unknown) => String(value ?? "").replace(/\s+/g, " ").trim();

type Entry = { title: string; href: string; summary: string; date?: string };

const toEntries = (modules: Record<string, Page>): Entry[] =>
  Object.values(modules)
    .filter((page) => !page.frontmatter?.noindex)
    .map((page) => ({
      title: oneLine(page.frontmatter?.title),
      href: withTrailingSlash(page.url ?? ""),
      summary: oneLine(page.frontmatter?.summary ?? page.frontmatter?.description),
      date: page.frontmatter?.date ? new Date(page.frontmatter.date).toISOString() : undefined,
    }))
    .filter((entry) => entry.title && entry.href);

// interactive tools are .astro pages, so their metadata lives in interactive-tools.js
const interactiveEntries = (category: string, lang: "en" | "fi", hub: string): Entry[] =>
  interactiveTools
    .filter((tool) => tool.category === category && tool[lang])
    .map((tool) => ({
      title: oneLine(tool[lang]!.title),
      href: `${hub}${tool[lang]!.slug ?? tool.slug}/`,
      summary: oneLine(tool[lang]!.summary),
    }));

const byDateDesc = (a: Entry, b: Entry) => (b.date ?? "").localeCompare(a.date ?? "");
const byTitle = (a: Entry, b: Entry) => a.title.localeCompare(b.title);

export function GET({ site }: { site?: URL }) {
  const baseUrl = new URL(site ?? siteConfig.url);
  const abs = (href: string) => new URL(href, baseUrl).toString();

  const section = (heading: string, entries: Entry[]) =>
    entries.length
      ? `## ${heading}\n\n${entries
          .map((e) => `- [${e.title}](${abs(e.href)})${e.summary ? `: ${e.summary}` : ""}`)
          .join("\n")}\n`
      : "";

  const { person } = siteConfig;
  const body = [
    `# ${siteName}`,
    "",
    `> ${person.jobTitle}. ${person.description} Content is published in English under / and in Finnish under /fi/.`,
    "",
    section("Services", toEntries(enServices).sort(byTitle)),
    section("Articles", toEntries(enPosts).sort(byDateDesc)),
    section("Toolkit", [
      ...toEntries(enTools),
      ...interactiveEntries("tools", "en", "/tools/"),
      ...toEntries(enTemplates),
      ...interactiveEntries("templates", "en", "/templates/"),
    ].sort(byTitle)),
    section("Suomenkielinen sisältö (Finnish)", [
      ...toEntries(fiServices).sort(byTitle),
      ...toEntries(fiPosts).sort(byDateDesc),
      ...toEntries(fiTools),
      ...interactiveEntries("tools", "fi", "/fi/tyokalut/"),
      ...toEntries(fiTemplates),
      ...interactiveEntries("templates", "fi", "/fi/toteutusmallit/"),
    ]),
    section("Optional", [
      { title: "About", href: person.aboutPath, summary: "Background, experience and contact details." },
      { title: "Entity map", href: "/entitymap.json", summary: "Machine-readable map of the topics and entities this site covers." },
      { title: "Atom feed", href: siteConfig.website.atomFeedPath, summary: "Full-text feed of English articles." },
    ]),
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
