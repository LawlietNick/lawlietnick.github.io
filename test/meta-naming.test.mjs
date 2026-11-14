import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { library, templates as templateList } from "../src/data/meta-naming.js";
import { en } from "../src/data/meta-utm.js";
import { fi } from "../src/data/meta-utm.fi.js";
import { addComponent, cleanKey, example, formula, levelKeys, levelsFromTemplate, move, newLevels, sameStructure, setLowercase, setSeparator, startValue, structureOf, templates as exportedTemplates, validate } from "../src/utils/meta-naming.js";

// Most tests are about the typed case, so they start with lowercase off.
const mixedCase = () => {
  const levels = newLevels();
  Object.values(levels).forEach((level) => setLowercase(level, false));
  return levels;
};

test("default levels give the recommended formulas and examples", () => {
  const { campaign, adset, ad } = mixedCase();
  assert.equal(formula(campaign), "{market}_{year}_{objective}_{campaign}");
  assert.equal(example(campaign), "FI_2026_Sales_BlackFriday");
  assert.equal(example(adset), "Broad_RunningClub_25-54");
  assert.equal(example(ad), "Video_UGC-Testimonial_V1");
});

test("a level separator applies between all components and never after the last", () => {
  const { campaign } = mixedCase();
  setSeparator(campaign, "");
  assert.equal(example(campaign), "FI2026SalesBlackFriday");
  setSeparator(campaign, " ");
  assert.equal(example(campaign), "FI 2026 Sales BlackFriday");
});

test("a custom separator after one component stays", () => {
  const { campaign } = mixedCase();
  campaign.components[1].sepAfter = "|";
  assert.equal(example(campaign), "FI_2026|Sales_BlackFriday");
});

test("move reorders and ignores moves past the ends", () => {
  const { campaign } = mixedCase();
  move(campaign, 0, 1);
  assert.equal(formula(campaign), "{year}_{market}_{objective}_{campaign}");
  move(campaign, 0, -1);
  assert.equal(formula(campaign), "{year}_{market}_{objective}_{campaign}");
});

test("added components take the level separator", () => {
  const { adset } = mixedCase();
  setSeparator(adset, "-");
  addComponent(adset, "version", startValue(library.version));
  assert.equal(example(adset), "Broad-RunningClub-25-54-V1");
});

test("validation warns about empty levels, missing values, spaces and duplicates", () => {
  const { campaign } = mixedCase();
  assert.deepEqual(validate(campaign), []);
  campaign.components[3].value = "Black Friday";
  assert.deepEqual(validate(campaign), [{ code: "spaces", key: "campaign" }]);
  campaign.components[3].value = "";
  assert.deepEqual(validate(campaign), [{ code: "noValue", key: "campaign" }]);
  addComponent(campaign, "year", "2026");
  assert.ok(validate(campaign).some((w) => w.code === "duplicate" && w.key === "year"));
  assert.deepEqual(validate({ separator: "_", components: [] }), [{ code: "empty" }]);
});

test("lowercase is on by default for every level and only changes the generated name", () => {
  const { campaign, adset, ad } = newLevels();
  assert.deepEqual([campaign.lowercase, adset.lowercase, ad.lowercase], [true, true, true]);
  assert.equal(example(campaign), "fi_2026_sales_blackfriday");
  assert.equal(formula(campaign), "{market}_{year}_{objective}_{campaign}");
  assert.equal(campaign.components[3].value, "BlackFriday");
  setLowercase(campaign, false);
  assert.equal(example(campaign), "FI_2026_Sales_BlackFriday");
  setLowercase(campaign, true);
  assert.equal(example(campaign), "fi_2026_sales_blackfriday");
});

test("lowercase is per level and new levels do not share state", () => {
  const first = newLevels();
  setLowercase(first.adset, false);
  assert.equal(example(first.campaign), "fi_2026_sales_blackfriday");
  assert.equal(example(first.adset), "Broad_RunningClub_25-54");
  assert.equal(example(first.ad), "video_ugc-testimonial_v1");
  assert.equal(newLevels().adset.lowercase, true);
});

test("the text for a missing value comes from the caller", () => {
  const { campaign } = mixedCase();
  campaign.components[3].value = "";
  assert.equal(example(campaign, "X"), "FI_2026_Sales_X");
  setLowercase(campaign, true);
  assert.equal(example(campaign, "X"), "fi_2026_sales_x");
  assert.equal(startValue({ type: "free" }, "Example"), "Example");
});

test("custom keys are cleaned to lower case letters, digits and underscores", () => {
  assert.equal(cleanKey("  Offer Type! "), "offertype");
  assert.equal(cleanKey("a_b9"), "a_b9");
});

// Same shape in both languages, so the language switch never finds a missing text.
const shape = (value, path = "") =>
  Array.isArray(value)
    ? value.flatMap((item, n) => shape(item, `${path}.${n}`))
    : value && typeof value === "object"
      ? Object.entries(value).flatMap(([key, item]) => shape(item, `${path}.${key}`))
      : [path];

test("Finnish and English copy have exactly the same keys", () => {
  assert.deepEqual(shape(en).sort(), shape(fi).sort());
});

test("every library component has a label in both languages", () => {
  for (const key of Object.keys(library)) {
    assert.ok(fi.naming.components[key], `fi ${key}`);
    assert.ok(en.naming.components[key], `en ${key}`);
  }
});

// Light grep-style check: no ui or naming text stays in the copy files without being used in the tool.
const component = readFileSync(new URL("../src/components/MetaUtmTool.astro", import.meta.url), "utf8");

// A key counts as used when the component names it directly (naming.key in code) or through a
// data-i18n attribute (the same "group.key" text).
const used = (group, key) => new RegExp(`\\b${group}\\.${key}\\b`).test(component);

test("every ui and naming key in the copy is used by the tool", () => {
  for (const group of ["ui", "naming"]) {
    for (const key of Object.keys(fi[group])) {
      assert.ok(used(group, key), `${group}.${key} is not used in MetaUtmTool.astro`);
    }
  }
});

test("the generated name and level separator labels are the same everywhere", () => {
  assert.equal(fi.naming.exampleTitle, "Generoitu nimi");
  assert.equal(en.naming.exampleTitle, "Generated name");
  assert.equal(fi.naming.separatorLabel, "Tason erotin");
  assert.equal(en.naming.separatorLabel, "Level separator");
  for (const copy of [fi, en]) assert.doesNotMatch(JSON.stringify(copy), /Esimerkkinimi|Example name/);
});

test("the lowercase option has copy in both languages", () => {
  assert.ok(fi.naming.lowercase && en.naming.lowercase);
});

test("short hints are written without a trailing period in both languages", () => {
  for (const copy of [fi, en]) for (const key of ["customKeyHint", "customAllowedHint"]) assert.doesNotMatch(copy.naming[key], /\.$/, key);
});

// ---------- templates ----------

test("there are seven templates, four of them main, in the agreed order", () => {
  assert.deepEqual(templateList.map((t) => t.id), ["recommended", "ecommerce", "leadgen", "custom", "simple", "agency", "international"]);
  assert.deepEqual(templateList.filter((t) => t.main).map((t) => t.id), ["recommended", "ecommerce", "leadgen", "custom"]);
  assert.equal(exportedTemplates, templateList);
});

test("every template uses components from the one shared library, with values its list allows", () => {
  for (const template of templateList) {
    for (const key of levelKeys) {
      const level = template.levels[key];
      assert.ok(level.components.length > 0, `${template.id} ${key}`);
      for (const [component, value] of level.components) {
        const def = library[component];
        assert.ok(def, `${template.id}: ${component} is in the library`);
        if (def.type === "predefined") assert.ok(def.allowed.includes(value), `${template.id}: ${component}=${value}`);
      }
    }
  }
});

test("each template builds its agreed example names with its own separators", () => {
  const names = (id) => {
    const levels = levelsFromTemplate(templateList.find((t) => t.id === id));
    return levelKeys.map((key) => example(levels[key]));
  };
  assert.deepEqual(names("recommended"), ["fi_leads_summer_2027", "prospecting_broad_conversions", "video_benefits_v1"]);
  assert.deepEqual(names("ecommerce"), ["fi-shoes-blackfriday-2027", "prospecting-broad-purchase", "sneakers-carousel-v1"]);
  assert.deepEqual(names("leadgen"), ["fi_b2b_consulting_leads", "decisionmakers|prospecting|leads", "freeaudit|video|v1"]);
  assert.deepEqual(names("custom"), ["summer_sale", "broad", "video_01"]);
  assert.deepEqual(names("simple"), ["leads_summer", "broad", "video_v1"]);
  assert.deepEqual(names("agency"), ["client|fi|leads|summer2027", "prospecting|broad|leads", "benefits|video|v1"]);
  assert.deepEqual(names("international"), ["fi/en/leads/summer2027", "fi/broad/conversions", "en/benefits/video/v1"]);
});

test("Mukautettu has one component per level", () => {
  const levels = levelsFromTemplate(templateList.find((t) => t.id === "custom"));
  for (const key of levelKeys) assert.equal(levels[key].components.length, 1);
});

test("a template's structure equals itself, and any real change breaks the match", () => {
  const template = templateList.find((t) => t.id === "recommended");
  const fresh = () => levelsFromTemplate(template);
  assert.ok(sameStructure(fresh(), fresh()));

  const value = fresh();
  value.campaign.components[0].value = "SE";
  assert.ok(!sameStructure(value, fresh()));
  value.campaign.components[0].value = "FI";
  assert.ok(sameStructure(value, fresh()), "changing a value back removes the difference");

  const order = fresh();
  move(order.ad, 0, 1);
  assert.ok(!sameStructure(order, fresh()));
  move(order.ad, 1, -1);
  assert.ok(sameStructure(order, fresh()));

  const separator = fresh();
  setSeparator(separator.adset, "-");
  assert.ok(!sameStructure(separator, fresh()));
  setSeparator(separator.adset, "_");
  assert.ok(sameStructure(separator, fresh()));

  const removed = fresh();
  removed.campaign.components.pop();
  assert.ok(!sameStructure(removed, fresh()));

  const lower = fresh();
  setLowercase(lower.ad, false);
  assert.ok(!sameStructure(lower, fresh()));
});

test("the structure carries no ids, and the separator after the last component is ignored", () => {
  const template = templateList.find((t) => t.id === "leadgen");
  const a = levelsFromTemplate(template);
  const b = levelsFromTemplate(template);
  b.adset.components.at(-1).sepAfter = "###";
  assert.equal(structureOf(a), structureOf(b));
  assert.doesNotMatch(structureOf(a), /[a-f0-9]{8}-[a-f0-9]{4}/);
});

test("editing a level made from a template never changes the template data", () => {
  const template = templateList.find((t) => t.id === "recommended");
  const levels = levelsFromTemplate(template);
  levels.campaign.components[0].value = "SE";
  levels.campaign.components.pop();
  assert.equal(template.levels.campaign.components[0][1], "FI");
  assert.equal(template.levels.campaign.components.length, 4);
});
