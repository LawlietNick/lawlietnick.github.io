// Language-neutral model for the Meta UTM builder. Labels and explanations live in
// meta-utm.fi.js, keyed by the ids below.
//
// kind   fixed   - the value comes from you, typed or picked in the tool
//        dynamic - Meta fills the value in when the ad is served
//        frozen  - Meta fills in a name, but the name it had when first published
// origin meta       - listed on Meta's page (see metaDocsUrl)
//        convention - this tool's recommendation, not defined by Meta
//        unknown    - Meta documents the macro but not its values
export const metaDocsUrl = "https://www.facebook.com/business/help/2360940870872492";
export const metaDocsChecked = "2026-10-20";

export const kinds = ["fixed", "dynamic", "frozen"];
export const platforms = ["facebook", "instagram", "messenger", "audience_network", "threads"];

export const tactics = ["prospecting", "remarketing", "all"];
// {{media_type}} is Meta's only format macro and works for Advantage+ catalog ads only.
export const formats = ["video", "image", "carousel", "{{media_type}}"];
export const terms = {
  adset: "{{adset.name}}",
  placement: "{{placement}}",
  none: "",
};

export const macroKinds = {
  "{{site_source_name}}": "dynamic",
  "{{placement}}": "dynamic",
  "{{media_type}}": "dynamic",
  "{{campaign.id}}": "dynamic",
  "{{adset.id}}": "dynamic",
  "{{ad.id}}": "dynamic",
  "{{campaign.name}}": "frozen",
  "{{adset.name}}": "frozen",
  "{{ad.name}}": "frozen",
};

// Made-up values for the preview. {{media_type}} has none: Meta lists no values.
export const exampleValues = {
  "{{site_source_name}}": "ig",
  "{{placement}}": "instagram_stories",
  "{{campaign.name}}": "autumn_sale",
  "{{campaign.id}}": "123456789",
  "{{adset.name}}": "retargeting_30d",
  "{{ad.name}}": "autumn_video",
};

// Made-up report rows for the utm_term comparison: [utm_source, utm_term].
export const termReport = {
  adset: [["fb", "retargeting_30d"], ["ig", "retargeting_30d"]],
  placement: [["fb", "facebook_feed"], ["ig", "instagram_stories"]],
  none: [["fb"], ["ig"]],
};

// example: a made-up value shown in the table for macros that have no value list.
const macro = (id, kind, origin = "meta", example = null) => ({ id: `macro:${id}`, value: `{{${id}}}`, macro: null, category: "macro", kind, origin, platform: null, example });
const source = (value, platform) => ({ id: `source:${value}`, value, macro: "{{site_source_name}}", category: "source", kind: "dynamic", origin: "meta", platform });
const placement = (value, platform) => ({ id: `placement:${value}`, value, macro: "{{placement}}", category: "placement", kind: "dynamic", origin: "meta", platform });

// Variables whose values Meta lists. The directory shows one of them at a time.
export const variables = ["{{placement}}", "{{site_source_name}}"];

export const directory = [
  macro("site_source_name", "dynamic"),
  macro("placement", "dynamic"),
  macro("campaign.id", "dynamic", "meta", "123456789"),
  macro("campaign.name", "frozen", "meta", "2026_Q4_Myynti_Syysale"),
  macro("adset.id", "dynamic", "meta", "234567890"),
  macro("adset.name", "frozen", "meta", "Retargeting_30pv"),
  macro("ad.id", "dynamic", "meta", "345678901"),
  macro("ad.name", "frozen", "meta", "Video_Tarjous_A"),
  macro("media_type", "dynamic", "unknown"),

  source("fb", "facebook"),
  source("ig", "instagram"),
  source("msg", "messenger"),
  source("an", "audience_network"),
  source("th", "threads"),

  placement("audience_network_classic", "audience_network"),
  placement("audience_network_rewarded_video", "audience_network"),
  placement("facebook_feed", "facebook"),
  placement("facebook_instream", "facebook"),
  placement("facebook_marketplace", "facebook"),
  placement("facebook_right_column", "facebook"),
  placement("instagram_feed", "instagram"),
  placement("instagram_stories", "instagram"),
  placement("messenger_inbox", "messenger"),
  placement("messenger_sponsored_messages", "messenger"),
  placement("threads_stream", "threads"),

];
