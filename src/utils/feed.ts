import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { authorName, siteConfig, siteName } from "../data/site.js";
import { feedDate, selectFeedEntries } from "./feed-entries.ts";
import { categoryTerm, escapeXml, imageMimeType } from "./feed-xml.ts";
import { isoDate } from "./schema.ts";

export type FeedLang = "en" | "fi";

interface FeedSource {
  collection: "blog" | "blogFi";
  urlPrefix: string; // entry URL = urlPrefix + entry.id + "/"
}

interface FeedConfig {
  path: string;
  homePath: string;
  language: string;
  description: string;
  rights: string;
  sources: FeedSource[];
}

// All per-language feed configuration in one place.
// A future content type (templates, tools, case studies …) = one collection in
// src/content.config.ts + one source line per language here.
const FEEDS: Record<FeedLang, FeedConfig> = {
  en: {
    path: siteConfig.website.atomFeedPath,
    homePath: "/",
    language: "en",
    description: "Analytics professional. I turn messy data into decisions.",
    rights: "All rights reserved.",
    sources: [{ collection: "blog", urlPrefix: "/blog/" }],
  },
  fi: {
    path: "/fi/atom.xml",
    homePath: "/fi/",
    language: "fi",
    description: "Analytiikan ammattilainen. Käännän sotkuisen datan päätöksiksi.",
    rights: "Kaikki oikeudet pidätetään.",
    sources: [{ collection: "blogFi", urlPrefix: "/fi/blog/" }],
  },
};

export async function feedResponse(context: APIContext, lang: FeedLang): Promise<Response> {
  const { site } = context;
  if (!site) {
    throw new Error(
      "Atom feed requires `site` in astro.config.mjs — it is the base for canonical URLs and feed IDs.",
    );
  }
  const config = FEEDS[lang];
  const abs = (path: string) => new URL(path, site).href;

  const sourced = (
    await Promise.all(
      config.sources.map(async (source) =>
        (await getCollection(source.collection)).map((entry) => ({ data: entry.data, entry, source })),
      ),
    )
  ).flat();
  const items = selectFeedEntries(sourced);
  if (items.length === 0) throw new Error(`Atom feed ${config.path} has no publishable entries.`);

  const entries = items.map(({ data, entry, source }) => {
    const url = abs(`${source.urlPrefix}${entry.id}/`);
    const enclosureType = data.image && imageMimeType(data.image);
    const categories = data.tags
      .map((label) => ({ label, term: categoryTerm(label) }))
      .filter(({ term }) => term)
      .map(({ label, term }) => `    <category term="${escapeXml(term)}" label="${escapeXml(label)}"/>`);

    return [
      "  <entry>",
      `    <id>${escapeXml(url)}</id>`,
      `    <title>${escapeXml(data.title)}</title>`,
      `    <link rel="alternate" type="text/html" hreflang="${config.language}" href="${escapeXml(url)}"/>`,
      `    <published>${isoDate(data.date)}</published>`,
      `    <updated>${isoDate(feedDate(data))}</updated>`,
      `    <summary>${escapeXml(data.description)}</summary>`,
      ...categories,
      ...(data.image && enclosureType
        ? [`    <link rel="enclosure" href="${escapeXml(abs(data.image))}" type="${enclosureType}"/>`]
        : []),
      "  </entry>",
    ].join("\n");
  });

  const xml = [
    '<?xml version="1.0" encoding="utf-8"?>',
    `<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${config.language}">`,
    `  <id>${escapeXml(abs(config.path))}</id>`,
    `  <title>${escapeXml(siteName)}</title>`,
    `  <subtitle>${escapeXml(config.description)}</subtitle>`,
    `  <updated>${isoDate(feedDate(items[0].data))}</updated>`,
    `  <link rel="alternate" type="text/html" hreflang="${config.language}" href="${escapeXml(abs(config.homePath))}"/>`,
    `  <link rel="self" type="application/atom+xml" href="${escapeXml(abs(config.path))}"/>`,
    "  <author>",
    `    <name>${escapeXml(authorName)}</name>`,
    `    <uri>${escapeXml(abs("/"))}</uri>`,
    "  </author>",
    '  <generator uri="https://astro.build/">Astro</generator>',
    `  <rights>© 2026 ${escapeXml(authorName)}. ${escapeXml(config.rights)}</rights>`,
    `  <icon>${escapeXml(abs("/nk-logo.svg"))}</icon>`,
    ...entries,
    "</feed>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      // honored in dev/SSR; the static production host should mirror these for /atom.xml
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
