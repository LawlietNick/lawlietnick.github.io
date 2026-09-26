// Changeable site and structured-data identity values live here.
// Page copy, navigation, tool settings, and generated-document branding do not.
export const siteName = "Niko Karppinen";
export const conceptName = "Funky Analytics";

export const siteConfig = {
  url: "https://karppinen.one/",
  brand: {
    name: siteName,
  },
  website: {
    name: siteName,
    alternateName: conceptName,
    description: "Digital measurement, SEO and analytics consulting by Niko Karppinen.",
    atomFeedPath: "/atom.xml",
  },
  person: {
    givenName: "Niko",
    familyName: "Karppinen",
    aboutPath: "/about/",
    // Update only when the actual English or Finnish profile content changes.
    profileDateModified: "2026-08-07",
    jobTitle: "Senior SEO & Analytics Consultant",
    description: "Niko Karppinen helps teams make digital work measurable through SEO, analytics, technical implementation and AI-assisted workflows.",
    employerId: "https://agencybobble.com/#organization",
    employerName: "Agency Bobble",
    employerMonogram: "AB",
    employerUrl: "https://agencybobble.com/",
    profiles: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/karppinenniko/" },
      { name: "GitHub", url: "https://github.com/LawlietNick" },
      { name: "YouTube", url: "https://www.youtube.com/@LawlietNick" },
      { name: "Bluesky", url: "https://bsky.app/profile/lawlietnick.bsky.social" },
      { name: "WSocial", url: "https://wsocial.eu/profile/lawlietnick.wsocial.eu" },
      { name: "about.me", url: "https://about.me/nikokarppinen/", footer: false },
      { name: "imdb", url: "https://www.imdb.com/name/nm7385371/", footer: false },
      { name: "Pinterest", url: "https://fi.pinterest.com/nikokarppinen/", footer: false },
    ],
    knowsAbout: [
      { name: "Search engine optimization", wikidata: "Q180711", wikipedia: "Search_engine_optimization" },
      { name: "Web analytics", wikidata: "Q10719477", wikipedia: "Web_analytics" },
      { name: "Digital marketing", wikidata: "Q1323528", wikipedia: "Digital_marketing" },
      { name: "Digital measurement" },
      { name: "Measurement strategy" },
      { name: "Technical SEO" },
      { name: "Google Analytics", wikidata: "Q220577", wikipedia: "Google_Analytics" },
      { name: "Google Tag Manager", wikidata: "Q11775280", wikipedia: "" },
      { name: "Data Studio", wikidata: "", wikipedia: "Data_Studio" },
    ],
  },
  // Blog collections, keyed by the identifier a post's frontmatter can set as
  // `blog: <key>`. Frontmatter without that field falls back to "thoughts" —
  // the only blog the site has today, so existing posts need no edits.
  // `name` is the one label for nav, breadcrumbs and the Blog schema node.
  blogs: {
    thoughts: {
      en: { name: "Thoughts", path: "/blog/" },
      fi: { name: "Kirjoitukset", path: "/fi/blog/" },
    },
  },
};

// Derived compatibility exports used by existing layout, feed, and footer code.
export const brandName = siteName;
export const authorName = `${siteConfig.person.givenName} ${siteConfig.person.familyName}`;
export const profiles = siteConfig.person.profiles;
