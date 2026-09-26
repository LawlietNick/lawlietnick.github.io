import { describe, expect, it } from "vitest";
import { buildGa4ReportUrl, compactValues, normalizeCustomDimensions, reportErrors, type ReportConfig } from "../../src/components/ga4-report-builder/engine";

const config: ReportConfig = {
  propertyId: "12345678",
  title: "Events report",
  dimensions: ["date", "eventName"],
  metrics: ["eventCount", "keyEvents"],
  filterType: "anyOf",
  filterDimension: "eventName",
  filterValue: "page_view, session_start",
  sortKey: "eventCount",
  ascending: false,
  lineChart: true,
  pieChart: false,
};

describe("GA4 report builder engine", () => {
  it("builds the GA4 detail report editor URL", () => {
    const url = buildGa4ReportUrl(config);
    expect(url).toContain("#/p12345678/assetlibrary/explorer/new?");
    const encodedParams = new URLSearchParams(url.split("?")[1]).get("params") ?? "";
    expect(encodedParams).toContain('_r.explorerCard..dimensions=["date","eventName"]');
    expect(encodedParams).toContain('"evaluationType":8');
    expect(encodedParams).toContain('"expressionList":["page_view","session_start"]');
    expect(encodedParams).toContain("_r.explorerCard.secondaryCard..isHidden=true");
  });

  it("rejects incomplete report settings", () => {
    expect(reportErrors({ ...config, propertyId: "G-ABC", metrics: [] })).toEqual([
      "Add a numeric GA4 property ID.",
      "Choose at least one metric.",
    ]);
  });

  it("trims, removes blanks, and deduplicates custom fields", () => {
    expect(compactValues(["date", ""], [" date ", "eventName"])).toEqual(["date", "eventName"]);
  });

  it("treats plain custom dimension names as event-scoped API names", () => {
    expect(normalizeCustomDimensions([
      " form_name ",
      "form_platform",
      "customUser:account_type",
      "customEvent:form_name",
      "",
    ])).toEqual([
      "customEvent:form_name",
      "customEvent:form_platform",
      "customUser:account_type",
    ]);
  });

  it("keeps standard-report links valid when custom fields need property-specific slot IDs", () => {
    const url = buildGa4ReportUrl({
      ...config,
      dimensions: ["customEvent:form_name"],
      metrics: ["customEvent:form_score"],
      sortKey: "customEvent:form_score",
    });
    const encodedParams = new URLSearchParams(url.split("?")[1]).get("params") ?? "";

    expect(encodedParams).toContain('_r.explorerCard..dimensions=["eventName"]');
    expect(encodedParams).toContain('_r.explorerCard..metrics=["eventCount"]');
    expect(encodedParams).not.toContain("customEvent:");
  });
});
