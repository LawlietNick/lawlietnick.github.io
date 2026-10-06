import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { appearances } from "../src/data/appearances.js";
import { authorName, brandName, siteConfig, siteName } from "../src/data/site.js";
import { buildSchemaGraph, breadcrumbs, publicImage } from "../src/utils/schema.ts";

const root = siteConfig.url;
const url = (path) => new URL(path, root).href;
const graph = (overrides = {}) => buildSchemaGraph({
  canonicalUrl: root,
  pathname: "/",
  title: siteConfig.website.name,
  language: "en",
  ...overrides,
});
const node = (data, type) => data["@graph"].find((entry) => entry["@type"] === type);

test("appearances declare a displayable language", () => {
  const languageNames = new Intl.DisplayNames(["en"], { type: "language" });
  for (const appearance of appearances) {
    assert.match(appearance.inLanguage, /^[a-z]{2}(?:-[A-Z]{2})?$/);
    assert.ok(languageNames.of(appearance.inLanguage));
  }
});

test("The official website name has one shared source", () => {
  assert.equal(siteName, "Niko Karppinen");
  assert.equal(brandName, siteName);
  assert.equal(siteConfig.brand.name, siteName);
  assert.equal(siteConfig.website.name, siteName);
  assert.equal(siteName, authorName);
});

test("English and Finnish homepages use canonical WebPage IDs and language", () => {
  for (const [canonicalUrl, pathname, language] of [
    [root, "/", "en"],
    [url("/fi/"), "/fi/", "fi"],
  ]) {
    const data = graph({ canonicalUrl, pathname, language });
    const page = node(data, "WebPage");
    // Both front pages stay a plain WebPage about the Person: no ProfilePage, breadcrumb or ReadAction.
    assert.equal(node(data, "ProfilePage"), undefined);
    assert.equal(node(data, "BreadcrumbList"), undefined);
    assert.equal("breadcrumb" in page || "potentialAction" in page || "mainEntity" in page, false);
    assert.deepEqual(page.about, PERSON);
    assert.deepEqual(page.isPartOf, { "@id": `${root}#website` });
    assert.equal(data["@graph"].filter((entry) => entry["@type"] === "Person").length, 1);
    assert.equal(page["@id"], canonicalUrl);
    assert.equal(page.url, canonicalUrl);
    assert.equal(page.inLanguage, language);
  }
});

test("The English homepage keeps only its useful graph entities", () => {
  const description = "Personal portfolio and blog of Niko Karppinen, analytics professional.";
  const data = graph({ description });
  const page = node(data, "WebPage");
  const website = node(data, "WebSite");

  assert.deepEqual(data["@graph"].map((entry) => entry["@type"]), [
    "WebPage",
    "WebSite",
    "Person",
  ]);
  assert.equal(page["@id"], root);
  assert.equal(page.url, root);
  assert.equal(page.name, siteConfig.website.name);
  assert.equal(page.description, description);
  assert.deepEqual(page.isPartOf, { "@id": `${root}#website` });
  assert.deepEqual(page.about, PERSON);
  assert.equal(page.inLanguage, "en");
  assert.equal("breadcrumb" in page, false);
  assert.equal("potentialAction" in page, false);
  assert.equal("potentialAction" in website, false);
});

test("English and Finnish articles connect to their canonical page and omit missing dates", () => {
  for (const [canonicalUrl, pathname, language] of [
    [url("/blog/example/"), "/blog/example/", "en"],
    [url("/fi/blog/esimerkki/"), "/fi/blog/esimerkki/", "fi"],
  ]) {
    const data = graph({ canonicalUrl, pathname, language, frontmatter: { title: "Example" } });
    const page = node(data, "WebPage");
    const article = node(data, "BlogPosting");
    assert.deepEqual(page.mainEntity, { "@id": `${canonicalUrl}#article` });
    assert.equal("about" in page, false);
    assert.equal(article.mainEntityOfPage["@id"], canonicalUrl);
    assert.equal(article.inLanguage, language);
    assert.equal("datePublished" in article, false);
  }
});

test("article modification date uses updatedDate when provided", () => {
  const article = node(graph({
    canonicalUrl: url("/templates/cookiebot-guide/"),
    pathname: "/templates/cookiebot-guide/",
    frontmatter: {
      title: "Cookiebot guide",
      date: "2025-08-07",
      updatedDate: "2026-09-22",
    },
  }), "BlogPosting");
  assert.equal(article.datePublished, "2025-08-07T00:00:00.000Z");
  assert.equal(article.dateModified, "2026-09-22T00:00:00.000Z");
});

test("service pages use their Service as mainEntity and Person only as provider", () => {
  const canonicalUrl = url("/services/technical-seo-audit/");
  const data = graph({
    canonicalUrl,
    pathname: "/services/technical-seo-audit/",
    pageType: "service",
    title: "Technical SEO Audit",
  });
  const page = node(data, "WebPage");
  const service = node(data, "Service");
  assert.equal("about" in page, false);
  assert.deepEqual(page.mainEntity, { "@id": `${canonicalUrl}#service` });
  assert.equal(service["@id"], `${canonicalUrl}#service`);
  assert.deepEqual(service.mainEntityOfPage, { "@id": canonicalUrl });
  assert.deepEqual(service.provider, PERSON);
});

test("collection pages use their ItemList as mainEntity", () => {
  const canonicalUrl = url("/services/");
  const data = graph({
    canonicalUrl,
    pathname: "/services/",
    pageType: "collection",
    title: "Services",
    items: [{ title: "Technical SEO Audit", url: "/services/technical-seo-audit/" }],
  });
  const page = node(data, "CollectionPage");
  const list = node(data, "ItemList");
  assert.equal("about" in page, false);
  assert.deepEqual(page.mainEntity, { "@id": `${canonicalUrl}#itemlist` });
  assert.equal(list["@id"], `${canonicalUrl}#itemlist`);
});

test("pages without images omit image properties and imported public images retain metadata", () => {
  const page = node(graph(), "WebPage");
  assert.equal("image" in page, false);
  const image = { src: "/_astro/portrait.hash.webp", width: 1000, height: 1250, alt: authorName };
  const data = graph({ personImage: image, pageImage: image });
  assert.equal(node(data, "WebPage").thumbnailUrl, url("/_astro/portrait.hash.webp"));
  assert.equal(node(data, "ImageObject").width, 1000);
  assert.equal(publicImage({ src: "/@fs/Users/niko/portrait.jpeg" }), undefined);
  assert.equal(publicImage({ src: "/_image/?href=%2F%40fs%2FUsers%2Fniko%2Fportrait.jpeg" }), undefined);
  assert.equal(publicImage({ src: "" }), undefined);
});

const PERSON = { "@id": `${root}#person` };

test("About pages are ProfilePages whose mainEntity is the shared person", () => {
  for (const [canonicalUrl, pathname, language] of [
    [url(siteConfig.person.aboutPath), "/about/", "en"],
    [url("/fi/minusta/"), "/fi/minusta/", "fi"],
  ]) {
    const page = node(graph({ canonicalUrl, pathname, language, pageType: "about", title: "About" }), "ProfilePage");
    assert.equal(page["@id"], `${canonicalUrl}#profilepage`);
    assert.equal(page.url, canonicalUrl);
    assert.deepEqual(page.about, PERSON);
    assert.deepEqual(page.mainEntity, PERSON);
    assert.equal(page.inLanguage, language);
    assert.equal(page.dateModified, new Date(siteConfig.person.profileDateModified).toISOString());
  }
});

test("English and Finnish articles credit the shared person as author and publisher", () => {
  for (const [canonicalUrl, pathname, language, aboutPath] of [
    [url("/blog/prompt-optimization-chatgpt/"), "/blog/prompt-optimization-chatgpt/", "en", "/about/"],
    [url("/fi/blog/hei-maailma/"), "/fi/blog/hei-maailma/", "fi", "/fi/minusta/"],
  ]) {
    const data = graph({ canonicalUrl, pathname, language, frontmatter: { title: "Post" } });
    const article = node(data, "BlogPosting");
    // author is a bare @id reference; the Person node in the same @graph links the about page in the page's language
    assert.deepEqual(article.author, PERSON);
    assert.equal(node(data, "Person").url, url(aboutPath));
    assert.deepEqual(article.publisher, PERSON);
  }
});

test("The shared Person is emitted once, points to the About page, and keeps structured topics", () => {
  const data = graph({ canonicalUrl: url(siteConfig.person.aboutPath), pathname: "/about/", pageType: "about", title: "About" });
  const people = data["@graph"].filter((entry) => entry["@type"] === "Person");
  assert.equal(people.length, 1);
  const [person] = people;
  assert.equal(person["@id"], PERSON["@id"]);
  assert.equal(person.name, authorName);
  assert.equal(person.givenName, siteConfig.person.givenName);
  assert.equal(person.familyName, siteConfig.person.familyName);
  assert.equal(person.url, url(siteConfig.person.aboutPath));
  assert.equal(person.jobTitle, siteConfig.person.jobTitle);
  assert.equal(person.description, siteConfig.person.description);
  assert.deepEqual(person.worksFor, {
    "@type": "Organization",
    "@id": siteConfig.person.employerId,
    name: siteConfig.person.employerName,
    url: siteConfig.person.employerUrl,
  });
  assert.deepEqual(person.sameAs, siteConfig.person.profiles.map((profile) => profile.url));
  assert.deepEqual(person.knowsAbout.map((topic) => topic.name), siteConfig.person.knowsAbout);
  assert.ok(person.knowsAbout.every((topic) => topic["@type"] === "Thing"));
  assert.ok(person.knowsAbout.every((topic) => !("sameAs" in topic) || topic.sameAs.length > 0));
  // Personal identity links live under Person.sameAs; topic links must not leak in here.
  assert.ok(Array.isArray(person.sameAs) && person.sameAs.length > 0);
  assert.ok(person.sameAs.every((url) => !url.includes("wikidata.org") && !url.includes("wikipedia.org")));
  assert.deepEqual(person.subjectOf, appearances.map((appearance) => ({
    "@type": appearance.type,
    name: appearance.name,
    url: appearance.url,
    datePublished: appearance.datePublished,
    inLanguage: appearance.inLanguage,
  })));
});

test("The visible About employer lockup reads centralized identity values", () => {
  const aboutIntro = readFileSync(new URL("../src/components/AboutIntro.astro", import.meta.url), "utf8");
  for (const field of ["employerName", "employerMonogram", "employerUrl", "jobTitle"]) {
    assert.match(aboutIntro, new RegExp(`siteConfig\\.person\\.${field}`));
  }
  assert.doesNotMatch(aboutIntro, /Agency Bobble|Senior SEO & Analytics Consultant/);
});

test("Person subjectOf evidence is limited to About pages", () => {
  const article = graph({
    canonicalUrl: url("/blog/example/"),
    pathname: "/blog/example/",
    frontmatter: { title: "Example" },
  });
  assert.equal("subjectOf" in node(article, "Person"), false);
});

test("The WebSite identity comes from siteConfig", () => {
  const website = node(graph(), "WebSite");
  assert.equal(website["@id"], `${root}#website`);
  assert.equal(website.url, root);
  assert.equal(website.name, siteConfig.website.name);
  assert.equal(website.alternateName, "karppinen.one");
  assert.equal(website.description, siteConfig.website.description);
  assert.deepEqual(website.publisher, PERSON);
  assert.equal("potentialAction" in website, false);
});

test("The About ProfilePage reuses one public portrait ImageObject", () => {
  const canonicalUrl = url(siteConfig.person.aboutPath);
  const portrait = { src: "/_astro/portrait.test.webp", width: 1000, height: 1250, alt: authorName };
  const data = graph({
    canonicalUrl,
    pathname: "/about/",
    pageType: "about",
    title: "About Niko Karppinen",
    personImage: portrait,
    pageImage: portrait,
  });
  const imageObjects = data["@graph"].filter((entry) => entry["@type"] === "ImageObject");
  const profile = node(data, "ProfilePage");
  const person = node(data, "Person");
  const breadcrumb = node(data, "BreadcrumbList");
  const portraitId = `${root}#personimage`;
  const portraitUrl = url(portrait.src);

  assert.deepEqual(data["@graph"].map((entry) => entry["@type"]), [
    "ProfilePage",
    "BreadcrumbList",
    "WebSite",
    "ImageObject",
    "Person",
  ]);
  assert.equal(profile["@id"], `${canonicalUrl}#profilepage`);
  assert.equal(profile.url, canonicalUrl);
  assert.deepEqual(profile.isPartOf, { "@id": `${root}#website` });
  assert.deepEqual(profile.about, PERSON);
  assert.deepEqual(profile.mainEntity, PERSON);
  assert.deepEqual(profile.primaryImageOfPage, { "@id": portraitId });
  assert.deepEqual(profile.image, { "@id": portraitId });
  assert.equal(profile.thumbnailUrl, portraitUrl);
  assert.equal(imageObjects.length, 1);
  assert.equal(imageObjects[0]["@id"], portraitId);
  assert.equal(imageObjects[0].url, portraitUrl);
  assert.equal(imageObjects[0].contentUrl, portraitUrl);
  assert.equal(imageObjects[0].width, 1000);
  assert.equal(imageObjects[0].height, 1250);
  assert.deepEqual(person.image, { "@id": portraitId });
  assert.deepEqual(breadcrumb.itemListElement, [
    { "@type": "ListItem", position: 1, item: root, name: "Home" },
    { "@type": "ListItem", position: 2, name: "About Niko Karppinen" },
  ]);
});

test("BreadcrumbList uses Google's name + URL item form in EN and FI", () => {
  const cases = [
    ["/blog/content-consumption-metrics/", "en", [[root, "Home"], [url("/blog/"), "Thoughts"]]],
    ["/fi/blog/esimerkki/", "fi", [[url("/fi/"), "Etusivu"], [url("/fi/blog/"), "Kirjoitukset"]]],
  ];
  for (const [path, language, linked] of cases) {
    const canonicalUrl = url(path);
    const data = graph({ canonicalUrl, pathname: path, language, title: "Current page", frontmatter: { title: "Current page" } });
    const lists = data["@graph"].filter((entry) => entry["@type"] === "BreadcrumbList");
    assert.equal(lists.length, 1);
    assert.equal(lists[0]["@id"], `${canonicalUrl}#breadcrumb`);
    assert.deepEqual(lists[0].itemListElement, [
      ...linked.map(([item, name], i) => ({ "@type": "ListItem", position: i + 1, item, name })),
      { "@type": "ListItem", position: linked.length + 1, name: "Current page" },
    ]);
    for (const entry of lists[0].itemListElement) {
      assert.equal(typeof entry.position, "number");
      assert.ok(!("item" in entry) || typeof entry.item === "string");
    }
    const types = data["@graph"].map((entry) => entry["@type"]);
    assert.equal(types.filter((t) => t === "WebPage").length, 1);
    assert.equal(types.includes("Thing"), false);
  }
});

test("article breadcrumbs include the visible hierarchy and omit the final item URL", () => {
  const items = breadcrumbs("/blog/example/", url("/blog/example/"), "Example", "en");
  assert.deepEqual(items, [
    { name: "Home", url: root },
    { name: "Thoughts", url: url("/blog/") },
    { name: "Example" },
  ]);
});

test("posts belong to a language-specific Blog; WebPage stays part of the WebSite", () => {
  const post = (path, language, extra = {}) => graph({
    canonicalUrl: url(path),
    pathname: path,
    language,
    frontmatter: { title: "Post", category: "accessibility", ...extra },
  });
  const en = post("/blog/a/", "en");
  const fi = post("/fi/blog/b/", "fi");
  const blogEn = node(en, "Blog");
  const blogFi = node(fi, "Blog");
  assert.deepEqual(
    { id: blogEn["@id"], name: blogEn.name, lang: blogEn.inLanguage },
    { id: url("/blog/#blog"), name: "Thoughts", lang: "en" },
  );
  assert.deepEqual(
    { id: blogFi["@id"], name: blogFi.name, lang: blogFi.inLanguage },
    { id: url("/fi/blog/#blog"), name: "Kirjoitukset", lang: "fi" },
  );
  assert.deepEqual(node(en, "BlogPosting").isPartOf, { "@id": url("/blog/#blog") });
  assert.deepEqual(node(fi, "BlogPosting").isPartOf, { "@id": url("/fi/blog/#blog") });
  assert.deepEqual(node(en, "WebPage").isPartOf, { "@id": `${root}#website` });
  assert.deepEqual(blogEn.isPartOf, { "@id": `${root}#website` });
  assert.deepEqual(node(en, "WebSite").inLanguage, ["en", "fi"]);
  assert.equal("image" in node(en, "WebPage"), false);
  assert.equal("blogPost" in blogEn, false);
});

test("translation relations are @id references and only exist with a counterpart", () => {
  const post = (path, language, extra = {}) => node(graph({
    canonicalUrl: url(path),
    pathname: path,
    language,
    frontmatter: { title: "Post" },
    ...extra,
  }), "BlogPosting");
  const enPost = post("/blog/a/", "en", { hasTranslation: true, translatedPath: "/fi/blog/b/" });
  const fiPost = post("/fi/blog/b/", "fi", { hasTranslation: true, translatedPath: "/blog/a/" });
  assert.deepEqual(enPost.workTranslation, { "@id": url("/fi/blog/b/#article") });
  assert.equal("translationOfWork" in enPost, false);
  assert.deepEqual(fiPost.translationOfWork, { "@id": url("/blog/a/#article") });
  assert.equal("workTranslation" in fiPost, false);
  const lone = post("/blog/c/", "en");
  assert.equal("workTranslation" in lone || "translationOfWork" in lone, false);
});

test("citations default to WebPage, honour an explicit type, and category sets articleSection", () => {
  const article = node(graph({
    canonicalUrl: url("/blog/a/"),
    pathname: "/blog/a/",
    frontmatter: {
      title: "Post",
      category: "analytics",
      about: ["A"],
      mentions: ["M"],
      citations: [{ name: "One", url: "https://e.x/1" }, { name: "Two", url: "https://e.x/2", type: "ScholarlyArticle" }],
    },
  }), "BlogPosting");
  assert.deepEqual(article.citation.map((c) => c["@type"]), ["WebPage", "ScholarlyArticle"]);
  assert.deepEqual(article.about, [{ "@type": "Thing", name: "A" }]);
  assert.deepEqual(article.mentions, [{ "@type": "Thing", name: "M" }]);
  assert.equal(article.articleSection, "Analytics");
  const bare = node(graph({ canonicalUrl: url("/blog/a/"), pathname: "/blog/a/", frontmatter: { title: "Post" } }), "BlogPosting");
  for (const key of ["articleSection", "about", "mentions", "citation"]) assert.equal(key in bare, false);
  const section = (language, category) => node(graph({
    canonicalUrl: url("/blog/a/"), pathname: "/blog/a/", language, frontmatter: { title: "Post", category, tags: ["x"] },
  }), "BlogPosting").articleSection;
  assert.equal(section("en", "accessibility"), "Accessibility");
  assert.equal(section("fi", "accessibility"), "Saavutettavuus");
});

test("image credit comes from frontmatter and is omitted when absent", () => {
  const image = (frontmatter) => node(graph({
    canonicalUrl: url("/blog/a/"), pathname: "/blog/a/", frontmatter: { title: "Post", image: "/images/blog/a.jpeg", ...frontmatter },
  }), "ImageObject");
  assert.equal(image({ imageCredit: "Generated with OpenAI ImageGen" }).creditText, "Generated with OpenAI ImageGen");
  assert.equal("creditText" in image({}), false);
});

test("The shared head emits one Atom discovery link using the WebSite name", () => {
  const layout = readFileSync(new URL("../src/layouts/Base.astro", import.meta.url), "utf8");
  assert.match(layout, /<title>\{fullTitle\}<\/title>/);
  assert.match(layout, /property="og:title" content=\{documentTitle \?\? title \?\? siteName\}/);
  assert.match(layout, /property="og:site_name" content=\{siteName\}/);
  assert.equal(layout.match(/type="application\/atom\+xml"/g)?.length, 1);
  assert.match(layout, /title=\{siteConfig\.website\.name\}/);
  assert.match(layout, /siteConfig\.website\.atomFeedPath/);

  const feed = readFileSync(new URL("../src/utils/feed.ts", import.meta.url), "utf8");
  assert.match(feed, /<title>\$\{escapeXml\(siteName\)\}<\/title>/);
});

test("every in-graph @id has one typed node; nested @id objects are bare references", () => {
  for (const [path, language] of [["/blog/a/", "en"], ["/fi/blog/b/", "fi"], ["/about/", "en"]]) {
    const data = graph({ canonicalUrl: url(path), pathname: path, language, frontmatter: { title: "Post" } });
    const ids = data["@graph"].map((entry) => entry["@id"]);
    assert.equal(new Set(ids).size, ids.length, "each @id appears once as a top-level node");
    assert.ok(data["@graph"].every((entry) => entry["@type"]));
    const walk = (value) => {
      if (Array.isArray(value)) return value.forEach(walk);
      if (!value || typeof value !== "object") return;
      // A nested @id object must be a bare reference or a typed node, never an untyped fragment.
      if ("@id" in value && Object.keys(value).length > 1) assert.ok(value["@type"], JSON.stringify(value));
      if ("@id" in value && Object.keys(value).length === 1 && value["@id"].startsWith(root) && !/\/#article$/.test(value["@id"])) {
        assert.ok(ids.includes(value["@id"]), `unresolved ${value["@id"]}`);
      }
      Object.values(value).forEach(walk);
    };
    data["@graph"].forEach((entry) => Object.values(entry).forEach(walk));
  }
});
