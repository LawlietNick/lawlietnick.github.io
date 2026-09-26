import { describe, expect, test } from "vitest";
import sourceTemplate from "../../src/data/gtm-templates/full_ecom_gtm.json";
import simplifiedTemplate from "../../src/data/gtm-templates/full_simplified_ecom_gtm.json";
import {
  applyTagNamingConvention,
  buildSelectedContainer,
  createBuilderState,
  generateSelectedJson,
  outputCounts,
  parseBuilderState,
  selectTags,
  tagOptions,
  toggleTag,
  updateBuilderSetting,
  validateBuilder,
  type GtmRecord,
} from "../../src/components/gtm-builder/engine";

const source = sourceTemplate as GtmRecord;
const simplifiedSource = simplifiedTemplate as GtmRecord;

// createBuilderState leaves the identity fields empty on purpose; fill them to reach a valid state.
const identified = (state = createBuilderState(source)) =>
  updateBuilderSetting(updateBuilderSetting(state, "measurementId", "G-TEST123"), "companyName", "ACME");
const identifiedSimplified = (state = createBuilderState(simplifiedSource)) =>
  updateBuilderSetting(updateBuilderSetting(state, "measurementId", "G-TEST123"), "companyName", "ACME");
const withRequiredTags = (state: ReturnType<typeof createBuilderState>, sourceTemplate: GtmRecord, tagIds: string[]) =>
  selectTags(state, [
    ...tagOptions(sourceTemplate).filter(({ necessity }) => necessity === "required").map(({ id }) => id),
    ...tagIds,
  ]);

describe("focused GTM tag builder", () => {
  test("loads the required page view and all 13 ecommerce choices", () => {
    const options = tagOptions(source);
    expect(options).toHaveLength(14);
    expect(options.map(({ eventName }) => eventName)).toContain("purchase");
    expect(options.find(({ eventName }) => eventName === "page_view")).toMatchObject({
      name: "01.01 GA4 - Page View - All Pages",
      tagType: "Google Tag",
      necessity: "required",
      defaultSelected: true,
    });
    expect(options.find(({ eventName }) => eventName === "purchase")).toMatchObject({
      tagType: "GA4 Event",
      group: "Checkout",
      necessity: "essential",
    });
    expect(createBuilderState(source).selectedTagIds).toHaveLength(14);
  });

  test("grades every tag and keeps the essential tier at the five funnel events", () => {
    const options = tagOptions(source);
    expect(options.every(({ necessity }) => ["required", "essential", "recommended", "optional"].includes(necessity))).toBe(true);
    expect(options.filter(({ necessity }) => necessity === "essential").map(({ eventName }) => eventName).sort()).toEqual(
      ["add_to_cart", "begin_checkout", "purchase", "view_cart", "view_item"],
    );
  });

  test("supports the simplified source and its short tag names", () => {
    const options = tagOptions(simplifiedSource);
    expect(options).toHaveLength(2);
    expect(options.find(({ eventName }) => eventName === "supported_ecommerce_events")).toMatchObject({
      name: "GA4 - Ecommerce Event - Supported Events",
      group: "Ecommerce",
      necessity: "essential",
      defaultSelected: true,
    });
    expect(options.find(({ eventName }) => eventName === "page_view")).toMatchObject({
      name: "GA4 - Page View - All Pages",
      necessity: "required",
      defaultSelected: true,
    });

    const state = identifiedSimplified();
    const output = buildSelectedContainer(state, simplifiedSource);
    expect(state.selectedTagIds).toEqual(["45", "55"]);
    expect(validateBuilder(state, simplifiedSource).warnings).toEqual([]);
    expect(output.containerVersion.tag).toHaveLength(2);
    const sharedTag = output.containerVersion.tag.find((tag: GtmRecord) => tag.type === "gaawe");
    expect(sharedTag.name).toBe("GA4 - Ecommerce Event - Supported Events");
    expect(sharedTag.parameter.find((item: GtmRecord) => item.key === "eventName").value).toBe("{{Event}}");
    expect(output.containerVersion.trigger).toHaveLength(13);
    expect(output.containerVersion.variable).toHaveLength(2);
  });

  test("applies tag structure and naming as independent choices", () => {
    const individualShort = applyTagNamingConvention(source, "short");
    expect(individualShort.containerVersion.tag.every((tag: GtmRecord) => !/^\d{2}\.\d{2}\s/.test(tag.name))).toBe(true);
    expect(individualShort.containerVersion.tag.find((tag: GtmRecord) => tag.tagId === "35").name).toBe("GA4 - Ecom Event - Purchase");

    const simplifiedNumbered = applyTagNamingConvention(simplifiedSource, "numbered");
    expect(simplifiedNumbered.containerVersion.tag.map((tag: GtmRecord) => tag.name)).toEqual([
      "01.01 GA4 - Page View - All Pages",
      "01.02 GA4 - Ecommerce Event - Supported Events",
    ]);
    expect(buildSelectedContainer(identifiedSimplified(), simplifiedNumbered).containerVersion.tag.find((tag: GtmRecord) => tag.type === "gaawe").name).toBe(
      "01.02 GA4 - Ecommerce Event - Supported Events",
    );
  });

  test("requires a measurement ID and company suffix before anything can be exported", () => {
    const state = createBuilderState(source);
    expect(state.settings.measurementId).toBe("");
    expect(state.settings.companyName).toBe("");
    expect(validateBuilder(state).errors).toEqual([
      "GA4 measurement ID must start with G- and use uppercase letters or numbers.",
      "Company suffix is required.",
    ]);
    expect(() => generateSelectedJson(state, source)).toThrow(/measurement ID/);
    expect(validateBuilder(identified()).errors).toEqual([]);
  });

  test("exports the required page view with its built-in trigger and GA4 constant", () => {
    const pageView = tagOptions(source).find(({ eventName }) => eventName === "page_view")!;
    const output = buildSelectedContainer(identified(selectTags(createBuilderState(source), [pageView.id])), source);
    expect(output.containerVersion.tag).toHaveLength(1);
    expect(output.containerVersion.tag[0]).toMatchObject({
      name: "01.01 GA4 - Page View - All Pages",
      type: "googtag",
      firingTriggerId: ["2147479573"],
    });
    expect(output.containerVersion.trigger).toHaveLength(0);
    expect(output.containerVersion.variable.map((variable: GtmRecord) => variable.name)).toContain("CONST - GA4 ID - G-TEST123 - ACME");
  });

  test("exports only selected tags and their matching triggers", () => {
    const purchase = tagOptions(source).find(({ eventName }) => eventName === "purchase")!;
    const state = identified(withRequiredTags(createBuilderState(source), source, [purchase.id]));
    const output = buildSelectedContainer(state, source, new Date("2026-01-02T03:04:05"));
    expect(output.containerVersion.tag).toHaveLength(2);
    expect(output.containerVersion.tag.some((tag: GtmRecord) => tag.name.includes("Purchase"))).toBe(true);
    expect(output.containerVersion.trigger).toHaveLength(1);
    expect(output.containerVersion.trigger[0].triggerId).toBe("29");
    expect(output.exportTime).toBe("2026-01-02 03:04:05");
  });

  test("recursively includes variables and folders required by the selection", () => {
    const purchase = tagOptions(source).find(({ eventName }) => eventName === "purchase")!;
    const output = buildSelectedContainer(identified(withRequiredTags(createBuilderState(source), source, [purchase.id])), source);
    const variableNames = output.containerVersion.variable.map((variable: GtmRecord) => variable.name);
    expect(variableNames).toContain("GA4 Ecom Base Parameters");
    expect(variableNames).toContain("DLV - Ecommerce - Transaction ID (Order ID)");
    expect(output.containerVersion.folder.length).toBeGreaterThan(0);
  });

  test("includes the custom template only when a chosen tag needs its custom variable", () => {
    const options = tagOptions(source);
    const purchase = options.find(({ eventName }) => eventName === "purchase")!;
    const viewList = options.find(({ eventName }) => eventName === "view_item_list")!;
    expect(buildSelectedContainer(identified(withRequiredTags(createBuilderState(source), source, [purchase.id])), source).containerVersion.customTemplate).toHaveLength(0);
    expect(buildSelectedContainer(identified(withRequiredTags(createBuilderState(source), source, [viewList.id])), source).containerVersion.customTemplate).toHaveLength(1);
  });

  test("updates the measurement ID, company suffix, currency, and container name", () => {
    let state = createBuilderState(source);
    state = updateBuilderSetting(state, "measurementId", "G-TEST123");
    state = updateBuilderSetting(state, "companyName", "ACME");
    state = updateBuilderSetting(state, "defaultCurrency", "USD");
    state = updateBuilderSetting(state, "containerName", "ACME ecommerce");
    const output = buildSelectedContainer(state, source);
    const constant = output.containerVersion.variable.find((variable: GtmRecord) => variable.type === "c");
    const currency = output.containerVersion.variable.find((variable: GtmRecord) => /Currency Code/.test(variable.name));
    expect(constant.name).toBe("CONST - GA4 ID - G-TEST123 - ACME");
    expect(constant.parameter.find((item: GtmRecord) => item.key === "value").value).toBe("G-TEST123");
    expect(currency.parameter.find((item: GtmRecord) => item.key === "defaultValue").value).toBe("USD");
    expect(output.containerVersion.container.name).toBe("ACME ecommerce");
    expect(JSON.stringify(output.containerVersion.tag)).toContain("{{CONST - GA4 ID - G-TEST123 - ACME}}");
  });

  test("blocks output when no tags are selected or settings are invalid", () => {
    let state = selectTags(identified(), []);
    state = updateBuilderSetting(state, "measurementId", "bad");
    expect(validateBuilder(state).errors).toHaveLength(2);
    expect(() => buildSelectedContainer(state, source)).toThrow(/Choose at least one/);
  });

  test("blocks output when the required page view tag is omitted", () => {
    const purchase = tagOptions(source).find(({ eventName }) => eventName === "purchase")!;
    const state = identified(selectTags(createBuilderState(source), [purchase.id]));
    expect(validateBuilder(state, source).errors).toContain("The GA4 page view tag is required.");
    expect(() => buildSelectedContainer(state, source)).toThrow(/page view tag is required/);
  });

  test("toggles a tag without changing the source fixture", () => {
    const state = createBuilderState(source);
    const firstId = state.selectedTagIds[0];
    expect(toggleTag(state, firstId).selectedTagIds).not.toContain(firstId);
    expect(source.containerVersion.tag).toHaveLength(14);
  });

  test("generates formatted JSON with a newline and accurate counts", () => {
    const json = generateSelectedJson(identified(), source);
    expect(json.endsWith("\n")).toBe(true);
    expect(JSON.parse(json).exportFormatVersion).toBe(2);
    expect(outputCounts(JSON.parse(json))).toEqual({ tags: 14, triggers: 13, variables: 20, folders: 4, templates: 1 });
  });

  test("restores saved choices only for the matching source template", () => {
    const state = selectTags(createBuilderState(source), ["35"]);
    expect(parseBuilderState(JSON.stringify(state), source).selectedTagIds).toEqual(["35", "57"]);
    expect(() => parseBuilderState(JSON.stringify({ ...state, sourceFingerprint: "other" }), source)).toThrow(/do not match/);
  });
});
