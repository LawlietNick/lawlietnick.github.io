// Changeable site and structured-data identity values live here.
// Page copy, navigation, tool settings, and generated-document branding do not.
export const siteName = "Niko Karppinen";

// Temporary: false hides every services link (header, footer, hero, sitemap,
// llms.txt) and drops /services/ + /fi/palvelut/ from the production build.
// The pages stay in src and still render under `astro dev`. Flip to true to publish.
export const showServices = false;

export const siteConfig = {
  url: "https://karppinen.one/",
  brand: {
    name: siteName,
  },
  website: {
    name: siteName,
    alternateName: "karppinen.one",
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
    // Portrait photographer; the copyright stays with her (Finnish default).
    portraitCreator: { name: "Pinja Tuominen", studio: "Pinja’s Photography", url: "https://www.pinjasphotography.com/" },
    profiles: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/karppinenniko" },
      { name: "GitHub", url: "https://github.com/LawlietNick" },
      { name: "YouTube", url: "https://www.youtube.com/@LawlietNick" },
      { name: "Bluesky", url: "https://bsky.app/profile/lawlietnick.bsky.social" },
      { name: "WSocial", url: "https://wsocial.eu/profile/lawlietnick.wsocial.eu" },
      { name: "about.me", url: "https://about.me/nikokarppinen/", footer: false },
      { name: "imdb", url: "https://www.imdb.com/name/nm7385371/", footer: false },
      { name: "Pinterest", url: "https://fi.pinterest.com/nikokarppinen/", footer: false },
    ],
    // Expertise topics for Person.knowsAbout; sameAs ids come from `entities`.
    knowsAbout: [
      "Search engine optimization",
      "Web analytics",
      "Digital marketing",
      "Digital measurement",
      "Measurement strategy",
      "Technical SEO",
      "Google Analytics",
      "Google Tag Manager",
      "Data Studio",
      "GDPR",
      "Web accessibility",
      "Prompt engineering",
      "Generative AI",
      "Marketing automation",
    ],
  },
  // External entity ids for schema `about`/`mentions` and `knowsAbout`, keyed
  // by the exact name used in frontmatter. Each Wikidata item carries the
  // Google Knowledge Graph id (P646/P2671); `kgmid` repeats it as a direct
  // google.com/search?kgmid= link. Left off where Wikidata lists two ids.
  // Names not listed here stay plain Things without sameAs.
  entities: {
    "ChatGPT": { wikidata: "Q115564437", wikipedia: "ChatGPT" },
    "Claude": { wikidata: "Q118876059", wikipedia: "Claude_(AI)", kgmid: "/g/11kq5ghr35" },
    "Data Studio": { wikidata: "Q60165325", wikipedia: "Data_Studio" },
    "Digital marketing": { wikidata: "Q1323528", wikipedia: "Digital_marketing", kgmid: "/g/122hcnps" },
    "Dyslexia": { wikidata: "Q132971", wikipedia: "Dyslexia", kgmid: "/m/029sk" },
    "GDPR": { wikidata: "Q1172506", wikipedia: "General_Data_Protection_Regulation", kgmid: "/m/0pk_7xs" },
    "Generative AI": { wikidata: "Q117246174", wikipedia: "Generative_AI", kgmid: "/g/11khkg2rwf" },
    "Google Analytics": { wikidata: "Q220577", wikipedia: "Google_Analytics", kgmid: "/m/08w9_f" },
    "Google Tag Manager": { wikidata: "Q11775280", wikipedia: "Google_Tag_Manager", kgmid: "/g/125_f6l68" },
    "HubSpot": { wikidata: "Q5926631", wikipedia: "HubSpot", kgmid: "/m/02yxmbc" },
    "Klaviyo": { wikidata: "Q106631196", wikipedia: "Klaviyo" },
    "Lukihäiriö": { wikidata: "Q132971", wikipedia: "Dyslexia", kgmid: "/m/029sk" },
    "Marketing automation": { wikidata: "Q17103526", wikipedia: "Marketing_automation", kgmid: "/m/02z3kxx" },
    "McKinsey & Company": { wikidata: "Q310207", wikipedia: "McKinsey_%26_Company", kgmid: "/m/02zt92" },
    "Prompt engineering": { wikidata: "Q108941486", wikipedia: "Prompt_engineering", kgmid: "/g/11p6kpgt_n" },
    "Saavutettavuus": { wikidata: "Q808932", wikipedia: "Web_accessibility", kgmid: "/m/04g28m" },
    "Search engine optimization": { wikidata: "Q180711", wikipedia: "Search_engine_optimization", kgmid: "/m/019qb_" },
    "Shopify": { wikidata: "Q7501150", wikipedia: "Shopify" },
    "Typografia": { wikidata: "Q159964", wikipedia: "Typography", kgmid: "/m/07p4g" },
    "Typography": { wikidata: "Q159964", wikipedia: "Typography", kgmid: "/m/07p4g" },
    "Web accessibility": { wikidata: "Q808932", wikipedia: "Web_accessibility", kgmid: "/m/04g28m" },
    "Web analytics": { wikidata: "Q10719477", wikipedia: "Web_analytics", kgmid: "/m/07gnl6" },
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
// every "Get in touch" / "Start a consultation" button points here
export const contactUrl = profiles.find((p) => p.name === "LinkedIn").url;
