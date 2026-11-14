import assert from "node:assert/strict";
import test from "node:test";
import { directory, macroKinds, platforms } from "../src/data/meta-utm.js";
import { fi } from "../src/data/meta-utm.fi.js";
import { filterDirectory, formats, metaUtm, metaUtmParts, normalize, previewRows, tableRows, tactics, terms, valuesOf } from "../src/utils/meta-utm.js";

const defaultString =
  "utm_source={{site_source_name}}&utm_medium=paidsocial&utm_source_platform=Meta%20Ads&utm_campaign={{campaign.name}}&utm_id={{campaign.id}}&utm_content={{ad.name}}&utm_term={{adset.name}}&utm_marketing_tactic=prospecting&utm_creative_format=video";

const items = directory.map((entry) => ({
  ...entry,
  ...fi.entries[entry.id],
  platformLabel: entry.platform ? fi.platforms[entry.platform] : "",
}));
const placements = valuesOf(items, "{{placement}}", platforms);
const sources = valuesOf(items, "{{site_source_name}}", platforms);
const values = (list) => list.map((item) => item.value);

test("default string keeps Meta macros raw and encodes spaces as %20", () => {
  assert.equal(metaUtm(), defaultString);
});

test("every tactic, format and term gives a valid string in a fixed parameter order", () => {
  const order = ["utm_source", "utm_medium", "utm_source_platform", "utm_campaign", "utm_id", "utm_content", "utm_term", "utm_marketing_tactic", "utm_creative_format"];
  for (const tactic of tactics) for (const format of formats) for (const term of Object.keys(terms)) {
    const string = metaUtm({ tactic, format, term });
    const keys = string.split("&").map((pair) => pair.split("=")[0]);
    assert.deepEqual(keys, order.filter((key) => term !== "none" || key !== "utm_term"));
    assert.match(string, new RegExp(`utm_marketing_tactic=${tactic}(&|$)`));
    assert.ok(string.endsWith(`utm_creative_format=${format}`));
    assert.doesNotMatch(string, /%7B|%7D/, "macros must not be percent-encoded");
  }
});

test("term can be a placement or left out", () => {
  assert.match(metaUtm({ term: "placement" }), /utm_term={{placement}}&/);
  assert.doesNotMatch(metaUtm({ term: "none" }), /utm_term/);
});

test("edited advanced settings are trimmed and encoded, and empty ones are dropped", () => {
  assert.match(metaUtm({ platform: "  Meta & Co " }), /utm_source_platform=Meta%20%26%20Co&/);
  assert.match(metaUtm({ medium: "paid social" }), /utm_medium=paid%20social&/);
  assert.match(metaUtm({ medium: "ääkkönen" }), /utm_medium=%C3%A4%C3%A4kk%C3%B6nen&/);
  assert.match(metaUtm({ medium: "  " }), /utm_medium=paidsocial&/);
  assert.doesNotMatch(metaUtm({ platform: "" }), /utm_source_platform/);
});

test("{{media_type}} is kept as a macro in the format slot", () => {
  const string = metaUtm({ format: "{{media_type}}" });
  assert.ok(string.endsWith("utm_creative_format={{media_type}}"));
  assert.equal(metaUtmParts({ format: "{{media_type}}" }).at(-1).kind, "dynamic");
});

test("preview shows exactly the parameters in the string, in the same order", () => {
  for (const options of [{}, { term: "none" }, { term: "placement", format: "{{media_type}}" }, { medium: "" }]) {
    const keys = metaUtm(options).split("&").map((pair) => pair.split("=")[0]);
    assert.deepEqual(previewRows(options).map((row) => row.key), keys);
  }
});

test("preview separates your choices, dynamic values and frozen names, and never invents media_type values", () => {
  const rows = Object.fromEntries(previewRows({ format: "{{media_type}}" }).map((row) => [row.key, row]));
  assert.equal(rows.utm_medium.kind, "fixed");
  assert.equal(rows.utm_medium.shown, "paidsocial");
  assert.equal(rows.utm_medium.isExample, false);
  assert.equal(rows.utm_source.kind, "dynamic");
  assert.equal(rows.utm_source.isExample, true);
  assert.equal(rows.utm_campaign.kind, "frozen");
  assert.equal(rows.utm_content.kind, "frozen");
  assert.equal(rows.utm_term.kind, "frozen");
  assert.equal(rows.utm_creative_format.shown, null);
  assert.equal(previewRows({ term: "placement" }).find((row) => row.key === "utm_term").shown, "instagram_stories");
});

test("every macro kind in the model has a directory entry and every parameter an explanation", () => {
  for (const [macro, kind] of Object.entries(macroKinds)) {
    const entry = directory.find((item) => item.value === macro);
    assert.ok(entry, macro);
    assert.equal(entry.kind, kind, macro);
  }
  for (const { key } of metaUtmParts()) assert.ok(fi.params[key]?.meaning, key);
});

test("directory holds Meta's documented values and nothing guessed", () => {
  assert.deepEqual(values(sources), ["fb", "ig", "msg", "an", "th"]);
  assert.deepEqual(values(placements).sort(), [
    "audience_network_classic", "audience_network_rewarded_video", "facebook_feed", "facebook_instream", "facebook_marketplace",
    "facebook_right_column", "instagram_feed", "instagram_stories", "messenger_inbox", "messenger_sponsored_messages", "threads_stream",
  ]);
  assert.equal(directory.filter((item) => item.macro === "{{media_type}}").length, 0);
  assert.equal(directory.find((item) => item.value === "{{media_type}}").origin, "unknown");
});

test("only {{placement}} and {{site_source_name}} have value lists", () => {
  const withValues = ["{{placement}}", "{{site_source_name}}"];
  for (const item of items.filter((entry) => entry.category === "macro" && !withValues.includes(entry.value))) {
    assert.equal(valuesOf(items, item.value, platforms).length, 0, `${item.value} has no value list`);
  }
});

test("placements are grouped by platform and alphabetical inside a platform", () => {
  assert.deepEqual(values(placements), [
    "facebook_feed", "facebook_instream", "facebook_marketplace", "facebook_right_column",
    "instagram_feed", "instagram_stories",
    "messenger_inbox", "messenger_sponsored_messages",
    "audience_network_classic", "audience_network_rewarded_video",
    "threads_stream",
  ]);
  assert.equal(placements.length, 11);
  assert.equal(sources.length, 5);
});

test("every listed value has an explanation that adds more than the name", () => {
  for (const item of [...placements, ...sources]) {
    assert.ok(item.name && item.description, item.id);
    assert.notEqual(item.description.replace(/\.$/, ""), item.name, item.id);
    assert.ok(item.description.length > item.name.length + 25, item.id);
    if (item.platform) assert.ok(platforms.includes(item.platform) && item.platformLabel, item.id);
  }
  assert.ok(Object.keys(fi.entries).every((id) => directory.some((entry) => entry.id === id)), "no copy without an entry");
});

test("search finds a value by technical value, plain name, platform and explanation words", () => {
  assert.deepEqual(values(filterDirectory(placements, { query: "instagram_stories" })), ["instagram_stories"]);
  assert.ok(values(filterDirectory(placements, { query: "Stories" })).includes("instagram_stories"));
  assert.ok(values(filterDirectory(placements, { query: "instagram stories" })).includes("instagram_stories"));
  assert.deepEqual(values(filterDirectory(placements, { query: "messenger" })), ["messenger_inbox", "messenger_sponsored_messages"]);
  // a word taken from an explanation finds its entry
  const described = placements.find((item) => item.id === "placement:audience_network_rewarded_video");
  const word = described.description.split(/\s+/).find((w) => /^[a-zäö]{8,}$/i.test(w));
  assert.ok(values(filterDirectory(placements, { query: word })).includes("audience_network_rewarded_video"), word);
  assert.deepEqual(values(filterDirectory(sources, { query: "threads" })), ["th"]);
  assert.deepEqual(filterDirectory(placements, { query: "ei-ole-olemassa" }), []);
});

test("search keeps the platform order and an empty query returns everything", () => {
  assert.deepEqual(values(filterDirectory(placements, { query: "" })), values(placements));
  const feeds = values(filterDirectory(placements, { query: "feed" }));
  assert.deepEqual(feeds, [...feeds].sort((a, b) => values(placements).indexOf(a) - values(placements).indexOf(b)));
});

test("normalize reduces underscores, dots, braces and case to plain words", () => {
  assert.equal(normalize("Instagram_Stories"), "instagram stories");
  assert.equal(normalize("{{campaign.name}}"), "campaign name");
});

test("every utm_term option has an effect text", () => {
  for (const term of Object.keys(terms)) assert.ok(fi.terms[term].effect);
});

test("the flat table lists names and IDs with examples first, then sources and placements, and no media_type", () => {
  const rows = tableRows(items, platforms);
  assert.equal(rows.length, 6 + 5 + 11);
  assert.deepEqual(rows.slice(0, 6).map((row) => row.value), ["{{campaign.id}}", "{{campaign.name}}", "{{adset.id}}", "{{adset.name}}", "{{ad.id}}", "{{ad.name}}"]);
  assert.ok(rows.slice(0, 6).every((row) => row.example && fi.entries[row.id].description));
  assert.deepEqual(values(rows.slice(6, 11)), ["fb", "ig", "msg", "an", "th"]);
  assert.ok(rows.slice(11).every((row) => row.macro === "{{placement}}"));
  assert.ok(!rows.some((row) => row.value === "{{media_type}}"));
});

test("a published campaign takes campaign, content and term as typed values, and an empty one drops its parameter", () => {
  const typed = metaUtm({ published: true, campaign: "BlackFriday 2026", content: "video_a", termText: "Retargeting_30d" });
  assert.match(typed, /utm_campaign=BlackFriday%202026&utm_id=\{\{campaign\.id\}\}&utm_content=video_a&utm_term=Retargeting_30d&/);
  assert.doesNotMatch(typed, /campaign\.name|ad\.name|adset\.name/);
  const empty = metaUtm({ published: true, campaign: "x" });
  assert.doesNotMatch(empty, /utm_content|utm_term/);
  assert.match(metaUtm({ term: "placement", campaign: "x" }), /utm_campaign=\{\{campaign\.name\}\}.*utm_term=\{\{placement\}\}/);
});
