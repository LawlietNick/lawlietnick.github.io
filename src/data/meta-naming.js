// Language-neutral model for the Meta naming convention step. Labels live in the
// language files (meta-utm.fi.js, meta-utm.js for English) under naming.components, keyed by id.
//
// type  predefined - the value is picked from `allowed`
//       free       - the value is typed; `sample` is the value a new row starts with
export const levelKeys = ["campaign", "adset", "ad"];

export const library = {
  market: { type: "predefined", allowed: ["FI", "SE", "NO", "DK", "EN", "EU", "US"] },
  year: { type: "predefined", allowed: ["2025", "2026", "2027"] },
  objective: { type: "predefined", allowed: ["Sales", "Leads", "Traffic", "Awareness", "AppInstalls"] },
  campaign: { type: "free", sample: "BlackFriday" },
  targeting: { type: "predefined", allowed: ["Broad", "Interest", "Lookalike", "CustomAudience"] },
  audience: { type: "free", sample: "RunningClub" },
  age_range: { type: "predefined", allowed: ["18-65", "18-24", "25-54", "35-64", "55+"] },
  format: { type: "predefined", allowed: ["Video", "Image", "Carousel", "Collection", "Reels"] },
  concept: { type: "free", sample: "UGC-Testimonial" },
  version: { type: "predefined", allowed: ["V1", "V2", "V3", "15s", "30s", "HookA", "HookB"] },
  product: { type: "free", sample: "Shoes" },
  season: { type: "predefined", allowed: ["Spring", "Summer", "Autumn", "Winter", "Q1", "Q2", "Q3", "Q4"] },
  language: { type: "predefined", allowed: ["FI", "SV", "EN"] },
  country: { type: "predefined", allowed: ["FI", "SE", "NO", "DK", "DE", "GB", "US"] },
  client: { type: "free", sample: "Client" },
  business_type: { type: "predefined", allowed: ["B2B", "B2C"] },
  service: { type: "free", sample: "Consulting" },
  product_category: { type: "free", sample: "Shoes" },
  promotion: { type: "free", sample: "BlackFriday" },
  funnel_stage: { type: "predefined", allowed: ["Prospecting", "Retargeting", "Retention", "Awareness"] },
  optimization: { type: "predefined", allowed: ["Conversions", "Purchase", "Leads", "LinkClicks", "Reach"] },
  message: { type: "free", sample: "FreeAudit" },
  creative: { type: "free", sample: "video_01" },
};

// Starting point for each level: [component key, value].
export const defaultLevels = {
  campaign: [["market", "FI"], ["year", "2026"], ["objective", "Sales"], ["campaign", "BlackFriday"]],
  adset: [["targeting", "Broad"], ["audience", "RunningClub"], ["age_range", "25-54"]],
  ad: [["format", "Video"], ["concept", "UGC-Testimonial"], ["version", "V1"]],
};

// Ready-made naming conventions. They only choose which library components each level
// starts with, their values and their separators; the components themselves stay in the
// one shared library above. Names and descriptions live in the language files under
// naming.templates, keyed by id.
//
// levels[level] = { separator, components: [[key, value, sepAfter?]] }. A component without
// its own sepAfter takes the level's separator. `main` marks the four cards shown first.
export const templates = [
  {
    id: "recommended",
    main: true,
    levels: {
      campaign: { separator: "_", components: [["market", "FI"], ["objective", "Leads"], ["campaign", "Summer"], ["year", "2027"]] },
      adset: { separator: "_", components: [["funnel_stage", "Prospecting"], ["audience", "Broad"], ["optimization", "Conversions"]] },
      ad: { separator: "_", components: [["format", "Video"], ["concept", "Benefits"], ["version", "V1"]] },
    },
  },
  {
    id: "ecommerce",
    main: true,
    levels: {
      campaign: { separator: "-", components: [["market", "FI"], ["product_category", "Shoes"], ["promotion", "BlackFriday"], ["year", "2027"]] },
      adset: { separator: "-", components: [["funnel_stage", "Prospecting"], ["audience", "Broad"], ["optimization", "Purchase"]] },
      ad: { separator: "-", components: [["product", "Sneakers"], ["format", "Carousel"], ["version", "V1"]] },
    },
  },
  {
    id: "leadgen",
    main: true,
    levels: {
      campaign: { separator: "_", components: [["market", "FI"], ["business_type", "B2B"], ["service", "Consulting"], ["objective", "Leads"]] },
      adset: { separator: "|", components: [["audience", "DecisionMakers"], ["funnel_stage", "Prospecting"], ["optimization", "Leads"]] },
      ad: { separator: "|", components: [["message", "FreeAudit"], ["format", "Video"], ["version", "V1"]] },
    },
  },
  {
    id: "custom",
    main: true,
    levels: {
      campaign: { separator: "_", components: [["campaign", "summer_sale"]] },
      adset: { separator: "_", components: [["audience", "broad"]] },
      ad: { separator: "_", components: [["creative", "video_01"]] },
    },
  },
  {
    id: "simple",
    levels: {
      campaign: { separator: "_", components: [["objective", "Leads"], ["campaign", "Summer"]] },
      adset: { separator: "_", components: [["audience", "Broad"]] },
      ad: { separator: "_", components: [["format", "Video"], ["version", "V1"]] },
    },
  },
  {
    id: "agency",
    levels: {
      campaign: { separator: "|", components: [["client", "Client"], ["market", "FI"], ["objective", "Leads"], ["campaign", "Summer2027"]] },
      adset: { separator: "|", components: [["funnel_stage", "Prospecting"], ["audience", "Broad"], ["optimization", "Leads"]] },
      ad: { separator: "|", components: [["concept", "Benefits"], ["format", "Video"], ["version", "V1"]] },
    },
  },
  {
    id: "international",
    levels: {
      campaign: { separator: "/", components: [["country", "FI"], ["language", "EN"], ["objective", "Leads"], ["campaign", "Summer2027"]] },
      adset: { separator: "/", components: [["market", "FI"], ["audience", "Broad"], ["optimization", "Conversions"]] },
      ad: { separator: "/", components: [["language", "EN"], ["concept", "Benefits"], ["format", "Video"], ["version", "V1"]] },
    },
  },
];
