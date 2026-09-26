// Post categories — single source of truth for the visible category pill and
// the Schema.org articleSection. Posts set `category: <slug>` in frontmatter;
// components render the language-appropriate label via categoryLabel(). Add an
// entry here to introduce a new category in both languages.
export const categories = {
  "ai-prompting": { en: "AI & Prompting", fi: "Tekoäly & promptit" },
  "analytics": { en: "Analytics", fi: "Analytiikka" },
  "accessibility": { en: "Accessibility", fi: "Saavutettavuus" },
  "marketing-automation": { en: "Marketing automation", fi: "Markkinoinnin automaatio" },
  "seo": { en: "SEO", fi: "SEO" },
  "privacy": { en: "Privacy & Consent", fi: "Tietosuoja & suostumus" },
};

// Resolve a category slug to its label in the current language.
// Returns undefined for an unknown/missing slug so callers can hide the pill.
export function categoryLabel(slug, fi = false) {
  const entry = slug && categories[slug];
  if (!entry) return undefined;
  return fi ? entry.fi : entry.en;
}
