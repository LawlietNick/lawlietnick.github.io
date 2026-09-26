import assert from "node:assert/strict";
import test from "node:test";

import { resolveLanguageLinks } from "../src/utils/language-links.js";

test("keeps static page language pairs unchanged", () => {
  assert.deepEqual(
    resolveLanguageLinks({ currentPath: "/services/", isFinnish: false }),
    {
      enPath: "/services/",
      fiPath: "/fi/palvelut/",
      languageHref: "/fi/palvelut/",
      hasLanguageAlternate: true,
      postWithoutTranslation: false,
    },
  );
});

test("uses the other language homepage for an untranslated post", () => {
  assert.deepEqual(
    resolveLanguageLinks({
      currentPath: "/blog/example/",
      isFinnish: false,
      frontmatter: { title: "Example" },
    }),
    {
      enPath: "/blog/example/",
      fiPath: "/fi/",
      languageHref: "/fi/",
      hasLanguageAlternate: false,
      postWithoutTranslation: true,
    },
  );
});

test("uses the other language collection for an untranslated implementation template", () => {
  assert.deepEqual(
    resolveLanguageLinks({
      currentPath: "/templates/example/",
      isFinnish: false,
      frontmatter: { title: "Example" },
    }),
    {
      enPath: "/templates/example/",
      fiPath: "/fi/toteutusmallit/",
      languageHref: "/fi/toteutusmallit/",
      hasLanguageAlternate: false,
      postWithoutTranslation: true,
    },
  );
});

test("links an English post directly to its Finnish translation", () => {
  assert.deepEqual(
    resolveLanguageLinks({
      currentPath: "/blog/example/",
      isFinnish: false,
      frontmatter: {
        alternate: { lang: "fi", href: "/fi/blog/esimerkki/" },
      },
    }),
    {
      enPath: "/blog/example/",
      fiPath: "/fi/blog/esimerkki/",
      languageHref: "/fi/blog/esimerkki/",
      hasLanguageAlternate: true,
      postWithoutTranslation: false,
    },
  );
});

test("links a Finnish post directly to its English translation", () => {
  assert.deepEqual(
    resolveLanguageLinks({
      currentPath: "/fi/blog/esimerkki/",
      isFinnish: true,
      frontmatter: {
        alternate: { lang: "en", href: "/blog/example/" },
      },
    }),
    {
      enPath: "/blog/example/",
      fiPath: "/fi/blog/esimerkki/",
      languageHref: "/blog/example/",
      hasLanguageAlternate: true,
      postWithoutTranslation: false,
    },
  );
});

test("rejects an alternate with the current post language", () => {
  assert.throws(
    () =>
      resolveLanguageLinks({
        currentPath: "/blog/example/",
        isFinnish: false,
        frontmatter: { alternate: { lang: "en", href: "/blog/other/" } },
      }),
    /opposite/,
  );
});

test("rejects external alternate URLs", () => {
  assert.throws(
    () =>
      resolveLanguageLinks({
        currentPath: "/blog/example/",
        isFinnish: false,
        frontmatter: { alternate: { lang: "fi", href: "https://example.com/" } },
      }),
    /internal path/,
  );
});
