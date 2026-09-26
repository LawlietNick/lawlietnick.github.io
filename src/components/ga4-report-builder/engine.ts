export type FilterType = "none" | "exact" | "contains" | "beginsWith" | "endsWith" | "regex" | "anyOf";

export type ReportConfig = {
  propertyId: string;
  title: string;
  dimensions: string[];
  metrics: string[];
  filterType: FilterType;
  filterDimension: string;
  filterValue: string;
  sortKey: string;
  ascending: boolean;
  lineChart: boolean;
  pieChart: boolean;
};

const FILTER_TYPES: Record<Exclude<FilterType, "none">, number> = {
  exact: 1,
  beginsWith: 2,
  endsWith: 3,
  contains: 4,
  regex: 5,
  anyOf: 8,
};

export const compactValues = (...groups: string[][]) => [
  ...new Set(groups.flat().map((value) => value.trim()).filter(Boolean)),
];

export const normalizeCustomDimensions = (values: string[]) => compactValues(
  compactValues(values).map((value) => value.includes(":") ? value : `customEvent:${value}`),
);

export const isPropertySpecificField = (value: string) => /^(customEvent|customUser|customItem):/.test(value);

export function reportErrors(config: ReportConfig) {
  const errors: string[] = [];
  if (!/^\d+$/.test(config.propertyId.trim())) errors.push("Add a numeric GA4 property ID.");
  if (!config.dimensions.length) errors.push("Choose at least one dimension.");
  if (!config.metrics.length) errors.push("Choose at least one metric.");
  if (config.filterType !== "none" && (!config.filterDimension || !config.filterValue.trim())) {
    errors.push("Complete the filter dimension and value, or turn the filter off.");
  }
  return errors;
}

export function buildGa4ReportUrl(config: ReportConfig) {
  const errors = reportErrors(config);
  if (errors.length) throw new Error(errors.join(" "));

  // GA4 standard-report links use property-specific slot IDs for custom fields
  // (for example customDimensionsGroup2Slot06), not Data API names. A property
  // ID alone cannot resolve that mapping, so keep the generated base report valid.
  const dimensions = config.dimensions.filter((value) => !isPropertySpecificField(value));
  const metrics = config.metrics.filter((value) => !isPropertySpecificField(value));
  if (!dimensions.length) dimensions.push("eventName");
  if (!metrics.length) metrics.push("eventCount");
  const sortKey = [...metrics, ...dimensions].includes(config.sortKey) ? config.sortKey : metrics[0];

  const params = [
    "_u..nav=maui",
    `_r.explorerCard..dimensions=${JSON.stringify(dimensions)}`,
    `_r.explorerCard..seldim=${JSON.stringify(dimensions)}`,
    `_r.explorerCard.primaryCard..isHidden=${!config.lineChart}`,
    `_r.explorerCard.secondaryCard..isHidden=${!config.pieChart}`,
    `_r.explorerCard..ddimensions=${JSON.stringify(["source"])}`,
    `_r.explorerCard..metrics=${JSON.stringify(metrics)}`,
    `_r.explorerCard..selmet=${JSON.stringify([metrics[0]])}`,
    `_r.explorerCard..sortKey=${sortKey}`,
    `_r.explorerCard..isAscending=${config.ascending}`,
  ];

  if (config.filterType !== "none" && !isPropertySpecificField(config.filterDimension)) {
    const expressionList = config.filterType === "anyOf"
      ? compactValues(config.filterValue.split(","))
      : [config.filterValue.trim()];
    params.push(`_r..dataFilters=${JSON.stringify([{
      type: 1,
      fieldName: config.filterDimension,
      evaluationType: FILTER_TYPES[config.filterType],
      expressionList,
      complement: false,
      isCaseSensitive: true,
      expression: "",
    }])}`);
  }

  const title = config.title.trim() || "Custom GA4 report";
  params.push(`_r..title=${title}`, `_r..defaultReportTitle=${title}`);
  const query = new URLSearchParams({ params: params.join("&"), r: "new-report" });
  return `https://analytics.google.com/analytics/web/#/p${config.propertyId.trim()}/assetlibrary/explorer/new?${query}`;
}
