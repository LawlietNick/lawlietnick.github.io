import { exampleValues, formats, macroKinds, tactics, termReport, terms } from "../data/meta-utm.js";

export { formats, tactics, terms };

// Meta fills {{macros}} itself, so they must stay unencoded. Every other
// character is percent-encoded, a space as %20.
const encode = (v) => (v.startsWith("{{") ? v : encodeURIComponent(v));

// The string is built from these parts, and so are the preview and the
// parameter-by-parameter view, so the three can never disagree.
export const metaUtmParts = ({ medium = "paidsocial", platform = "Meta Ads", tactic = tactics[0], format = formats[0], term = "adset" } = {}) =>
  [
    ["utm_source", "{{site_source_name}}"],
    ["utm_medium", medium.trim()],
    ["utm_source_platform", platform.trim()],
    ["utm_campaign", "{{campaign.name}}"],
    ["utm_id", "{{campaign.id}}"],
    ["utm_content", "{{ad.name}}"],
    ["utm_term", terms[term] ?? ""],
    ["utm_marketing_tactic", tactic],
    ["utm_creative_format", format],
  ]
    .filter(([, raw]) => raw)
    .map(([key, raw]) => ({ key, raw, value: encode(raw), kind: macroKinds[raw] ?? "fixed" }));

export const metaUtm = (options) =>
  metaUtmParts(options)
    .map(({ key, value }) => `${key}=${value}`)
    .join("&");

// shown is null when no honest example exists ({{media_type}}: Meta lists no values).
export const previewRows = (options) =>
  metaUtmParts(options).map(({ key, raw, kind }) => ({
    key,
    kind,
    macro: kind === "fixed" ? null : raw,
    shown: kind === "fixed" ? raw : (exampleValues[raw] ?? null),
    isExample: kind !== "fixed",
  }));

export const termReportRows = (term) => termReport[term] ?? termReport.none;

// "Instagram_Stories", "instagram stories" and "stories" all reduce to words,
// so a search by technical value and by plain name find the same entry.
export const normalize = (text) =>
  String(text ?? "")
    .toLowerCase()
    .replace(/[{}._\-\s]+/g, " ")
    .trim();

const text = (item) => normalize([item.value, item.shown, item.variable, item.name, item.macro, item.platformLabel, item.description].join(" "));

// Values of one macro, grouped by platform in the order of the platforms list and
// alphabetical by technical value inside a platform.
export const valuesOf = (items, macro, platformOrder) =>
  items
    .filter((item) => item.macro === macro)
    .sort((a, b) => platformOrder.indexOf(a.platform) - platformOrder.indexOf(b.platform) || a.value.localeCompare(b.value));

// The one flat table: macros that carry an example (names and IDs) first, then the
// values of {{site_source_name}} and {{placement}}, both grouped by platform.
export const tableRows = (items, platformOrder) => [
  ...items.filter((item) => item.category === "macro" && item.example),
  ...valuesOf(items, "{{site_source_name}}", platformOrder),
  ...valuesOf(items, "{{placement}}", platformOrder),
];

// Every word of the query must appear in the value, name, platform or explanation.
// The order of the given items is kept.
export const filterDirectory = (items, { query = "" } = {}) => {
  const words = normalize(query).split(" ").filter(Boolean);
  return items.filter((item) => words.every((word) => text(item).includes(word)));
};
