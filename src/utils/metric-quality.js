// Base band from the raw yes-count: 0–3 vanity, 4–5 diagnostic, 6–7 supporting, 8–10 critical.
export const metricBandIndex = (score) =>
  Math.min(Math.max(Math.floor(score / 2) - 1, 0), 3);

// Business relevance (Tier A) is foundational. A metric with no relevance answers
// can be diagnostic at best — however tidy and reliable the rest of it is — so the
// band is capped at "diagnostic" (index 1) in that case.
export const gatedBandIndex = (score, relevanceYes) => {
  const base = metricBandIndex(score);
  return relevanceYes === 0 ? Math.min(base, 1) : base;
};
