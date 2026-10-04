// Topics — shared allowed values for primary_category, post category pills and
// Schema.org articleSection. Posts use category; templates use primaryCategory
// because their category names the collection. Astro pages pass primaryCategory
// to Base. Add each new topic here with labels in both languages.
export const categories = {
  "ai-prompting": { en: "AI & Prompting", fi: "Tekoäly & promptit" },
  "analytics": { en: "Analytics", fi: "Analytiikka" },
  "accessibility": { en: "Accessibility", fi: "Saavutettavuus" },
  "marketing-automation": { en: "Marketing automation", fi: "Markkinoinnin automaatio" },
  "seo": { en: "SEO", fi: "SEO" },
  "reporting": { en: "Reporting", fi: "Raportointi" },
  "general": { en: "General", fi: "Yleinen" },
  "privacy": { en: "Privacy & Consent", fi: "Tietosuoja & suostumus" },
};

// Resolve a category slug to its label in the current language.
// Returns undefined for an unknown/missing slug so callers can hide the pill.
export function categoryLabel(slug, fi = false) {
  const entry = slug && categories[slug];
  if (!entry) return undefined;
  return fi ? entry.fi : entry.en;
}
