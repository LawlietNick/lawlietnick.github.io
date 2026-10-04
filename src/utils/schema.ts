import { authorName, siteConfig } from "../data/site.js";
import { categoryLabel } from "../data/categories.js";
import { toolkit } from "../data/toolkit.js";
import { appearances } from "../data/appearances.js";

export type Language = "en" | "fi";
export type PageType = "about" | "blog-index" | "collection" | "service" | "toolkit" | "webpage";

type SchemaItem = { title?: string; label?: string; url: string };
type SchemaImage = { src: string; width?: number; height?: number; alt?: string; creditText?: string };
type Frontmatter = {
  title?: string;
  description?: string;
  date?: string | Date;
  updatedDate?: string | Date;
  modified?: string | Date;
  image?: string;
  imageAlt?: string;
  imageCredit?: string;
  tags?: string[];
  category?: string;
  blog?: string;
  about?: string[];
  mentions?: string[];
  citations?: { name: string; url: string; type?: string }[];
};

export type SchemaOptions = {
  canonicalUrl: string;
  pathname: string;
  title?: string;
  description?: string;
  language: Language;
  pageType?: PageType;
  frontmatter?: Frontmatter;
  items?: SchemaItem[];
  stats?: { words?: number; readTime?: number } | null;
  personImage?: SchemaImage;
  pageImage?: SchemaImage;
  // Service pages: name/description from `title`/`summary`, the rest from
  // the optional `schema:` frontmatter block. Absent values are omitted.
  service?: { name?: string; description?: string; serviceType?: string; about?: string };
  // Same values that already drive hreflang and the language switcher
  // (resolveLanguageLinks in Base.astro) — reused here so translation
  // relationships can't drift from what the page actually links to.
  hasTranslation?: boolean;
  translatedPath?: string;
};

type JsonLdNode = Record<string, unknown>;
type Breadcrumb = { name: string; url?: string };

const SITE_URL = siteConfig.url;
const WEBSITE_ID = `${SITE_URL}#website`;
const PERSON_ID = `${SITE_URL}#person`;
const PERSON_IMAGE_ID = `${SITE_URL}#personimage`;

// Expertise topics for Person.knowsAbout. Link a topic to the exact same
// external entity via its Wikidata Q-id (`wikidata`) and/or Wikipedia slug
// (`wikipedia`) — full sameAs URLs are derived below — or pass full URLs in
// `sameAs` directly. Leave all off for topics without a reliable match.
export type KnowsAboutTopic = {
  name: string;
  sameAs?: string[];
  wikidata?: string;
  wikipedia?: string;
};

export const personKnowsAbout: KnowsAboutTopic[] = siteConfig.person.knowsAbout;

const knowsAbout = personKnowsAbout.map(({ name, sameAs, wikidata, wikipedia }) => {
  const links = sameAs ?? [
    wikidata && `https://www.wikidata.org/wiki/${wikidata}`,
    wikipedia && `https://en.wikipedia.org/wiki/${wikipedia}`,
  ].filter((url): url is string => Boolean(url));
  return { "@type": "Thing", name, ...(links.length ? { sameAs: links } : {}) };
});

export const absoluteUrl = (value: string) => new URL(value, SITE_URL).href;
export const fragmentId = (canonicalUrl: string, fragment: string) =>
  `${canonicalUrl}#${fragment}`;

// Resolves a post's `blog: <key>` frontmatter to its Blog node — same
// identifier, one shared node, referenced by every post in that collection.
// Unknown or missing keys fall back to "thoughts".
type BlogEntry = Record<Language, { name: string; path: string }>;
const blogs = siteConfig.blogs as Record<string, BlogEntry>;

function resolveBlog(key: string | undefined, language: Language) {
  const entry = blogs[key ?? "thoughts"] ?? blogs.thoughts;
  const localized = entry[language] ?? entry.en;
  const url = absoluteUrl(localized.path);
  return { id: `${url}#blog`, url, name: localized.name };
}

export function isoDate(value?: string | Date) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function publicImage(image?: SchemaImage) {
  if (!image?.src) return undefined;
  let decodedSrc = image.src;
  try { decodedSrc = decodeURIComponent(image.src); } catch { /* retain the original value */ }
  if (decodedSrc.includes("/@fs/") || decodedSrc.includes("/Users/")) return undefined;
  return { ...image, src: absoluteUrl(image.src) };
}

function compact<T extends JsonLdNode>(node: T): T {
  return Object.fromEntries(
    Object.entries(node).filter(([, value]) => value !== undefined && value !== ""),
  ) as T;
}

export function breadcrumbs(
  pathname: string,
  canonicalUrl: string,
  title: string,
  language: Language,
): Breadcrumb[] {
  const fi = language === "fi";
  const result: Breadcrumb[] = [{ name: fi ? "Etusivu" : "Home", url: fi ? `${SITE_URL}fi/` : SITE_URL }];
  if (pathname.includes("/blog/") && !pathname.endsWith("/blog/")) {
    const { name, path } = blogs.thoughts[language];
    result.push({ name, url: absoluteUrl(path) });
  }
  const servicesRoot = fi ? "/fi/palvelut/" : "/services/";
  if (pathname.startsWith(servicesRoot) && pathname !== servicesRoot) {
    result.push({ name: fi ? "Palvelut" : "Services", url: fi ? `${SITE_URL}fi/palvelut/` : `${SITE_URL}services/` });
  }
  for (const cat of toolkit) {
    const hubPath = fi ? `/fi/${cat.fiSlug ?? cat.slug}/` : `/${cat.slug}/`;
    if (pathname.startsWith(hubPath) && pathname !== hubPath) {
      result.push({ name: fi ? cat.fi.label : cat.en.label, url: `${SITE_URL}${hubPath.replace(/^\//, "")}` });
      break;
    }
  }
  if (pathname !== "/" && pathname !== "/fi/") result.push({ name: title });
  return result;
}

export function buildSchemaGraph(options: SchemaOptions) {
  const {
    canonicalUrl,
    pathname,
    language,
    pageType = "webpage",
    frontmatter,
    items = [],
    stats,
    service,
    hasTranslation,
    translatedPath,
  } = options;
  const title = frontmatter?.title ?? options.title ?? siteConfig.website.name;
  const description = frontmatter?.description ?? options.description;
  const personImage = publicImage(options.personImage);
  // article hero image from frontmatter is the primary image on posts;
  // an explicit pageImage (home/about portrait) still wins where set
  const articleImage = frontmatter?.image
    ? publicImage({ src: frontmatter.image, alt: frontmatter.imageAlt, creditText: frontmatter.imageCredit })
    : undefined;
  const pageImage = publicImage(options.pageImage) ?? articleImage;
  const breadcrumbId = fragmentId(canonicalUrl, "breadcrumb");
  const primaryImageId = fragmentId(canonicalUrl, "primaryimage");
  const sharesPersonImage = Boolean(pageImage && personImage && pageImage.src === personImage.src);
  const pageImageId = sharesPersonImage ? PERSON_IMAGE_ID : primaryImageId;
  const graph: JsonLdNode[] = [];
  const isHomepage = pathname === "/";

  const preciseType = pageType === "about"
    ? "ProfilePage"
    : pageType === "blog-index" || pageType === "collection" || pageType === "toolkit"
      ? "CollectionPage"
      : "WebPage";
  const listId = fragmentId(canonicalUrl, "itemlist");
  const articleId = fragmentId(canonicalUrl, "article");
  const serviceId = fragmentId(canonicalUrl, "service");
  const pageId = pageType === "about" ? fragmentId(canonicalUrl, "profilepage") : canonicalUrl;
  const describesPerson = pageType === "about" || pathname === "/" || pathname === "/fi/";
  // Blog membership only applies to actual posts under /blog/ — template
  // guides also carry `frontmatter` but aren't part of the Thoughts blog.
  const isBlogPost = Boolean(frontmatter) && pathname.includes("/blog/");
  const blog = isBlogPost ? resolveBlog(frontmatter?.blog, language) : undefined;

  graph.push(compact({
    "@type": preciseType,
    "@id": pageId,
    url: canonicalUrl,
    name: title,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: describesPerson ? { "@id": PERSON_ID } : undefined,
    primaryImageOfPage: pageImage ? { "@id": pageImageId } : undefined,
    // articles describe their image via primaryImageOfPage + the shared ImageObject only
    image: pageImage && !frontmatter ? { "@id": pageImageId } : undefined,
    thumbnailUrl: frontmatter ? undefined : pageImage?.src,
    breadcrumb: isHomepage ? undefined : { "@id": breadcrumbId },
    inLanguage: language,
    datePublished: isoDate(frontmatter?.date),
    dateModified: pageType === "about"
      ? isoDate(siteConfig.person.profileDateModified)
      : isoDate(frontmatter?.modified),
    potentialAction: isHomepage
      ? undefined
      : [{ "@type": "ReadAction", target: [canonicalUrl] }],
    mainEntity: pageType === "about"
      ? { "@id": PERSON_ID }
      : frontmatter
        ? { "@id": articleId }
        : pageType === "service"
          ? { "@id": serviceId }
      : items.length
        ? { "@id": listId }
        : undefined,
  }));

  if (pageImage && !sharesPersonImage) {
    graph.push(compact({
      "@type": "ImageObject",
      "@id": primaryImageId,
      inLanguage: language,
      url: pageImage.src,
      contentUrl: pageImage.src,
      width: pageImage.width,
      height: pageImage.height,
      caption: pageImage.alt,
      creditText: pageImage.creditText,
    }));
  }

  if (!isHomepage) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: breadcrumbs(pathname, canonicalUrl, title, language).map((item, index, all) => compact({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: index === all.length - 1 && all.length > 1 ? undefined : item.url,
      })),
    });
  }

  graph.push({
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: siteConfig.website.name,
    description: siteConfig.website.description,
    publisher: { "@id": PERSON_ID },
    inLanguage: ["en", "fi"],
  });

  if (blog) {
    graph.push(compact({
      "@type": "Blog",
      "@id": blog.id,
      url: blog.url,
      name: blog.name,
      isPartOf: { "@id": WEBSITE_ID },
      publisher: { "@id": PERSON_ID },
      inLanguage: language,
    }));
  }

  if (personImage) {
    graph.push(compact({
      "@type": "ImageObject",
      "@id": PERSON_IMAGE_ID,
      url: personImage.src,
      contentUrl: personImage.src,
      width: personImage.width,
      height: personImage.height,
      caption: personImage.alt,
    }));
  }

  graph.push(compact({
    "@type": "Person",
    "@id": PERSON_ID,
    name: authorName,
    givenName: siteConfig.person.givenName,
    familyName: siteConfig.person.familyName,
    url: absoluteUrl(siteConfig.person.aboutPath),
    jobTitle: siteConfig.person.jobTitle,
    worksFor: {
      "@type": "Organization",
      "@id": siteConfig.person.employerId,
      name: siteConfig.person.employerName,
      url: siteConfig.person.employerUrl,
    },
    description: siteConfig.person.description,
    image: personImage ? { "@id": PERSON_IMAGE_ID } : undefined,
    knowsAbout,
    sameAs: siteConfig.person.profiles.map((profile) => profile.url),
    subjectOf: pageType === "about"
      ? appearances.map((appearance) => ({
          "@type": appearance.type,
          name: appearance.name,
          url: appearance.url,
          datePublished: appearance.datePublished,
          inLanguage: appearance.inLanguage,
        }))
      : undefined,
  }));

  const translatedArticleId = hasTranslation && translatedPath
    ? `${absoluteUrl(translatedPath)}#article`
    : undefined;

  if (frontmatter) {
    graph.push(compact({
      "@type": "BlogPosting",
      "@id": articleId,
      mainEntityOfPage: { "@id": canonicalUrl },
      headline: frontmatter.title,
      description: frontmatter.description,
      datePublished: isoDate(frontmatter.date),
      dateModified: isoDate(frontmatter.updatedDate ?? frontmatter.modified ?? frontmatter.date),
      author: {
        "@id": PERSON_ID,
        name: authorName,
        url: absoluteUrl(language === "fi" ? "/fi/minusta/" : siteConfig.person.aboutPath),
      },
      publisher: { "@id": PERSON_ID },
      isPartOf: { "@id": blog ? blog.id : WEBSITE_ID },
      inLanguage: language,
      image: pageImage ? { "@id": pageImageId } : undefined,
      keywords: frontmatter.tags?.length ? frontmatter.tags : undefined,
      articleSection: categoryLabel(frontmatter.category, language === "fi"),
      wordCount: stats?.words || undefined,
      timeRequired: stats?.readTime ? `PT${stats.readTime}M` : undefined,
      about: frontmatter.about?.length
        ? frontmatter.about.map((name) => ({ "@type": "Thing", name }))
        : undefined,
      mentions: frontmatter.mentions?.length
        ? frontmatter.mentions.map((name) => ({ "@type": "Thing", name }))
        : undefined,
      citation: frontmatter.citations?.length
        ? frontmatter.citations.map(({ name, url, type }) => ({ "@type": type ?? "WebPage", name, url }))
        : undefined,
      workTranslation: translatedArticleId && language === "en" ? { "@id": translatedArticleId } : undefined,
      translationOfWork: translatedArticleId && language === "fi" ? { "@id": translatedArticleId } : undefined,
    }));
  }

  if (items.length) {
    graph.push({
      "@type": "ItemList",
      "@id": listId,
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => compact({
        "@type": "ListItem",
        position: index + 1,
        name: item.title ?? item.label,
        url: absoluteUrl(item.url),
      })),
    });
  }

  if (pageType === "service") {
    graph.push(compact({
      "@type": "Service",
      "@id": serviceId,
      url: canonicalUrl,
      name: service?.name ?? title,
      description: service?.description ?? description,
      serviceType: service?.serviceType,
      about: service?.about ? { "@type": "Thing", name: service.about } : undefined,
      provider: { "@id": PERSON_ID },
      mainEntityOfPage: { "@id": canonicalUrl },
    }));
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
