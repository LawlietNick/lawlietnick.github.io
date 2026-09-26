// Static .astro pages (no per-entry frontmatter) map their EN<->FI pairs here.
// Content pages (blog posts, services) instead carry their pairing in an
// `alternate: { lang, href }` frontmatter field, passed in explicitly below.
const fiToEn = {
  "/fi/minusta/": "/about/",
  "/fi/palvelut/": "/services/",
  "/fi/tyokalut/": "/tools/",
  "/fi/toteutusmallit/": "/templates/",
};

const enToFi = {
  "/about/": "/fi/minusta/",
  "/services/": "/fi/palvelut/",
  "/tools/": "/fi/tyokalut/",
  "/templates/": "/fi/toteutusmallit/",
};

// Runtime safety checks; exhaustive prefix/reciprocity validation lives in
// scripts/validate-content.mjs (build step).
function validateAlternate(alternate, currentLanguage) {
  if (!alternate || typeof alternate !== "object" || Array.isArray(alternate)) {
    throw new Error("Frontmatter 'alternate' must be an object with lang and href fields.");
  }
  if (!["en", "fi"].includes(alternate.lang)) {
    throw new Error("Frontmatter 'alternate.lang' must be either 'en' or 'fi'.");
  }
  if (alternate.lang === currentLanguage) {
    throw new Error("Frontmatter 'alternate.lang' must be the opposite of the current language.");
  }
  if (
    typeof alternate.href !== "string" ||
    !alternate.href.startsWith("/") ||
    alternate.href.startsWith("//")
  ) {
    throw new Error("Frontmatter 'alternate.href' must be an internal path beginning with '/'.");
  }
}

export function resolveLanguageLinks({ currentPath, isFinnish, frontmatter, alternate }) {
  const isPost = Boolean(frontmatter);
  const currentLanguage = isFinnish ? "fi" : "en";
  // an explicit `alternate` (service/tool layouts) wins; posts carry it on their frontmatter
  const alt = alternate ?? frontmatter?.alternate;

  if (alt !== undefined) {
    validateAlternate(alt, currentLanguage);
    const enPath = isFinnish ? alt.href : currentPath;
    const fiPath = isFinnish ? currentPath : alt.href;
    return {
      enPath,
      fiPath,
      languageHref: isFinnish ? enPath : fiPath,
      hasLanguageAlternate: true,
      postWithoutTranslation: false,
    };
  }

  // This tool currently exists only in Finnish; the English menu goes to the hub,
  // without advertising the hub as an equivalent translation to search engines.
  if (currentPath === "/fi/tyokalut/ga4-annotaatiot/") {
    return {
      enPath: "/tools/",
      fiPath: currentPath,
      languageHref: "/tools/",
      hasLanguageAlternate: false,
      postWithoutTranslation: true,
    };
  }

  if (isPost) {
    // A translated pair is handled above. Untranslated toolkit entries point
    // to the matching collection; untranslated blog posts point home.
    const otherLanguageHome = currentPath.startsWith("/templates/")
      ? "/fi/toteutusmallit/"
      : currentPath.startsWith("/fi/toteutusmallit/")
        ? "/templates/"
        : isFinnish ? "/" : "/fi/";
    const enPath = isFinnish ? otherLanguageHome : currentPath;
    const fiPath = isFinnish ? currentPath : otherLanguageHome;
    return {
      enPath,
      fiPath,
      languageHref: isFinnish ? enPath : fiPath,
      hasLanguageAlternate: false,
      postWithoutTranslation: true,
    };
  }

  const enPath = isFinnish
    ? fiToEn[currentPath] ?? (currentPath.replace(/^\/fi/, "") || "/")
    : currentPath;
  const fiPath = isFinnish ? currentPath : enToFi[currentPath] ?? ("/fi" + enPath);

  return {
    enPath,
    fiPath,
    languageHref: isFinnish ? enPath : fiPath,
    hasLanguageAlternate: !enPath.startsWith("/404"),
    postWithoutTranslation: false,
  };
}
