import { useState } from "react";
import { buildGa4ReportUrl, compactValues, isPropertySpecificField, normalizeCustomDimensions, reportErrors, type FilterType, type ReportConfig } from "./engine";
import "./ga4-report-builder.css";

type FieldOption = { value: string; label: string; custom?: boolean };
type Template = Omit<ReportConfig, "propertyId"> & { id: string; description: string };

const DIMENSIONS: FieldOption[] = [
  { value: "date", label: "Date" },
  { value: "dateHour", label: "Date + hour" },
  { value: "dayOfWeekName", label: "Day of week" },
  { value: "eventName", label: "Event name" },
  { value: "deviceCategory", label: "Device category" },
  { value: "platform", label: "Platform" },
  { value: "browser", label: "Browser" },
  { value: "operatingSystem", label: "Operating system" },
  { value: "country", label: "Country" },
  { value: "city", label: "City" },
  { value: "language", label: "Language" },
  { value: "newVsReturning", label: "New / returning" },
  { value: "sessionPrimaryChannelGroup", label: "Session primary channel group" },
  { value: "sessionDefaultChannelGroup", label: "Session default channel group" },
  { value: "sessionSourceMedium", label: "Session source / medium" },
  { value: "sessionMedium", label: "Session medium" },
  { value: "sessionSource", label: "Session source" },
  { value: "sessionCampaignName", label: "Session campaign" },
  { value: "firstUserDefaultChannelGroup", label: "First user default channel group" },
  { value: "firstUserSourceMedium", label: "First user source / medium" },
  { value: "pagePathPlusQueryString", label: "Page path + query string" },
  { value: "pageTitle", label: "Page title" },
  { value: "landingPagePlusQueryString", label: "Landing page + query string" },
  { value: "pageReferrer", label: "Page referrer" },
  { value: "contentGroup", label: "Content group" },
  { value: "customEvent:contact_detail_type", label: "contact_detail_type", custom: true },
  { value: "customEvent:current_language", label: "current_language", custom: true },
  { value: "customEvent:file_extension", label: "file_extension", custom: true },
  { value: "customEvent:file_name", label: "file_name", custom: true },
  { value: "customEvent:form_id", label: "form_id", custom: true },
  { value: "customEvent:form_name", label: "form_name", custom: true },
  { value: "customEvent:form_platform", label: "form_platform", custom: true },
  { value: "customEvent:form_type", label: "form_type", custom: true },
  { value: "customEvent:link_domain", label: "link_domain", custom: true },
  { value: "customEvent:link_text", label: "link_text", custom: true },
  { value: "customEvent:link_type", label: "link_type", custom: true },
  { value: "customEvent:link_url", label: "link_url", custom: true },
  { value: "customEvent:outbound", label: "outbound", custom: true },
  { value: "customEvent:page_date", label: "page_date", custom: true },
  { value: "customEvent:page_type", label: "page_type", custom: true },
  { value: "itemName", label: "Item name" },
  { value: "itemCategory", label: "Item category" },
  { value: "itemBrand", label: "Item brand" },
  { value: "transactionId", label: "Transaction ID" },
  { value: "orderCoupon", label: "Order coupon" },
];

const METRICS: FieldOption[] = [
  { value: "activeUsers", label: "Active users" },
  { value: "newUsers", label: "New users" },
  { value: "totalUsers", label: "Total users" },
  { value: "sessions", label: "Sessions" },
  { value: "engagedSessions", label: "Engaged sessions" },
  { value: "engagementRate", label: "Engagement rate" },
  { value: "averageSessionDuration", label: "Average engagement time per session" },
  { value: "userEngagementDuration", label: "User engagement" },
  { value: "screenPageViews", label: "Views" },
  { value: "screenPageViewsPerSession", label: "Views per session" },
  { value: "eventCount", label: "Event count" },
  { value: "eventCountPerUser", label: "Events per user" },
  { value: "eventsPerSession", label: "Events per session" },
  { value: "keyEvents", label: "Key events" },
  { value: "sessionKeyEventRate", label: "Session key event rate" },
  { value: "userKeyEventRate", label: "User key event rate" },
  { value: "totalRevenue", label: "Total revenue" },
  { value: "purchaseRevenue", label: "Purchase revenue" },
  { value: "itemRevenue", label: "Item revenue" },
  { value: "transactions", label: "Transactions" },
  { value: "ecommercePurchases", label: "Ecommerce purchases" },
  { value: "itemsViewed", label: "Items viewed" },
  { value: "itemsAddedToCart", label: "Items added to cart" },
  { value: "itemsPurchased", label: "Items purchased" },
  { value: "totalPurchasers", label: "Total purchasers" },
];

const BASE = {
  filterType: "none" as FilterType,
  filterDimension: "eventName",
  filterValue: "",
  ascending: false,
  lineChart: true,
  pieChart: false,
};

const TEMPLATES: Template[] = [
  {
    ...BASE,
    id: "overview",
    title: "Executive overview",
    description: "Users, sessions, engagement, key events, and revenue by channel and device.",
    dimensions: ["date", "sessionDefaultChannelGroup", "deviceCategory"],
    metrics: ["activeUsers", "sessions", "engagementRate", "keyEvents", "totalRevenue"],
    sortKey: "sessions",
  },
  {
    ...BASE,
    id: "acquisition",
    title: "Traffic Acquisition",
    description: "Compare channels, sources, and campaigns by traffic quality and outcomes.",
    dimensions: ["sessionPrimaryChannelGroup", "sessionDefaultChannelGroup", "sessionSourceMedium", "sessionMedium", "sessionSource", "sessionCampaignName"],
    metrics: ["totalUsers", "sessions", "engagedSessions", "engagementRate", "averageSessionDuration", "eventsPerSession", "eventCount", "keyEvents", "sessionKeyEventRate", "totalRevenue"],
    sortKey: "totalUsers",
    pieChart: true,
  },
  {
    ...BASE,
    id: "content",
    title: "Content performance",
    description: "Find the pages that attract attention and support meaningful sessions.",
    dimensions: ["pagePathPlusQueryString", "pageTitle", "deviceCategory"],
    metrics: ["screenPageViews", "activeUsers", "engagedSessions", "averageSessionDuration", "keyEvents"],
    sortKey: "screenPageViews",
  },
  {
    ...BASE,
    id: "landing-pages",
    title: "Landing page performance",
    description: "Evaluate entry pages by acquisition channel, engagement, and business results.",
    dimensions: ["landingPagePlusQueryString", "sessionDefaultChannelGroup", "deviceCategory"],
    metrics: ["sessions", "activeUsers", "engagementRate", "keyEvents", "totalRevenue"],
    sortKey: "sessions",
  },
  {
    ...BASE,
    id: "events",
    title: "Events and key events",
    description: "Review event volume and key events over time and across devices.",
    dimensions: ["date", "eventName", "deviceCategory"],
    metrics: ["eventCount", "keyEvents", "totalUsers", "eventsPerSession"],
    sortKey: "eventCount",
  },
  {
    ...BASE,
    id: "form-submissions",
    title: "📝 Form Submissions",
    description: "Review form submissions by form details and the page where each submission occurred.",
    dimensions: ["customEvent:form_name", "customEvent:form_platform", "pagePathPlusQueryString", "pageTitle", "customEvent:form_id", "customEvent:form_type"],
    metrics: ["eventCount", "activeUsers", "sessions"],
    sortKey: "eventCount",
  },
  {
    ...BASE,
    id: "ecommerce",
    title: "Ecommerce performance",
    description: "Compare product discovery, cart activity, purchases, and item revenue.",
    dimensions: ["itemName", "itemCategory", "itemBrand"],
    metrics: ["itemsViewed", "itemsAddedToCart", "itemsPurchased", "itemRevenue", "purchaseRevenue"],
    sortKey: "itemRevenue",
    pieChart: true,
  },
];

const labels = new Map([...DIMENSIONS, ...METRICS].map((option) => [option.value, option.label]));
const EMPTY_DIMENSIONS = Array(6).fill("");
const EMPTY_METRICS = Array(12).fill("");

function FieldSlots({ legend, values, options, onChange }: {
  legend: string;
  values: string[];
  options: FieldOption[];
  onChange: (values: string[]) => void;
}) {
  const nativeOptions = options.filter((option) => !option.custom);
  const customOptions = options.filter((option) => option.custom);

  return (
    <fieldset className="report-fields">
      <legend>{legend}</legend>
      <div className="report-fields__slots">
        {values.map((value, index) => (
          <label key={index}>
            <span className="visually-hidden">{legend.slice(0, -1)} {index + 1}</span>
            <select value={value} onChange={(event) => {
              const next = [...values];
              next[index] = event.target.value;
              onChange(next);
            }}>
              <option value="">{index ? "Add another" : "Choose one"}</option>
              {customOptions.length ? (
                <>
                  <optgroup label="Native dimensions">
                    {nativeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </optgroup>
                  <optgroup label="Custom dimensions (event-scoped)">
                    {customOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </optgroup>
                </>
              ) : options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function Ga4ReportBuilder() {
  const [propertyId, setPropertyId] = useState("");
  const [templateId, setTemplateId] = useState(TEMPLATES[0].id);
  const [settings, setSettings] = useState<Omit<ReportConfig, "propertyId">>(TEMPLATES[0]);
  const [dimensionSlots, setDimensionSlots] = useState([...TEMPLATES[0].dimensions, ...EMPTY_DIMENSIONS].slice(0, 6));
  const [metricSlots, setMetricSlots] = useState([...TEMPLATES[0].metrics, ...EMPTY_METRICS].slice(0, 12));
  const [customDimensions, setCustomDimensions] = useState("");
  const [customMetrics, setCustomMetrics] = useState("");
  const [status, setStatus] = useState("Choose a template or customize every setting.");

  const enteredCustomDimensions = normalizeCustomDimensions(customDimensions.split(","));
  const dimensions = compactValues(dimensionSlots, enteredCustomDimensions);
  const metrics = compactValues(metricSlots, customMetrics.split(","));
  const selectedCustomDimensions = dimensions.filter(isPropertySpecificField);
  const selectedCustomMetrics = metrics.filter(isPropertySpecificField);
  const propertySpecificFields = compactValues(selectedCustomDimensions, selectedCustomMetrics);
  const sortOptions = compactValues(metrics, dimensions);
  const sortKey = sortOptions.includes(settings.sortKey) ? settings.sortKey : sortOptions[0] ?? "";
  const config: ReportConfig = { ...settings, propertyId, dimensions, metrics, sortKey };
  const errors = reportErrors(config);
  const ready = errors.length === 0;

  const update = <K extends keyof Omit<ReportConfig, "propertyId" | "dimensions" | "metrics">>(key: K, value: Omit<ReportConfig, "propertyId" | "dimensions" | "metrics">[K]) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const applyTemplate = (template: Template) => {
    setTemplateId(template.id);
    setSettings(template);
    setDimensionSlots([...template.dimensions, ...EMPTY_DIMENSIONS].slice(0, 6));
    setMetricSlots([...template.metrics, ...EMPTY_METRICS].slice(0, 12));
    setCustomDimensions("");
    setCustomMetrics("");
    setStatus(`${template.title} template applied. Every field remains editable.`);
  };

  const copy = async () => {
    if (!ready) return;
    try {
      await navigator.clipboard.writeText(buildGa4ReportUrl(config));
      setStatus("GA4 report link copied.");
    } catch {
      setStatus("Copy failed. Open the report and copy the URL from the new tab.");
    }
  };

  const copyPropertySpecificFields = async () => {
    try {
      await navigator.clipboard.writeText(propertySpecificFields.map((value) => labels.get(value) ?? value.replace(/^[^:]+:/, "")).join("\n"));
      setStatus("Custom field names copied. Add them in the GA4 report editor.");
    } catch {
      setStatus("Copy failed. Use the custom field list shown above.");
    }
  };

  return (
    <div className="report-builder">
      <div className="report-builder__privacy">
        <strong>Local-only builder</strong>
        <span>Your property ID and report settings stay in this browser.</span>
      </div>

      <div className="report-builder__layout">
        <div className="report-builder__content">
          <section className="report-section" aria-labelledby="report-template-title">
            <div className="report-section__heading">
              <span>1</span>
              <div><h2 id="report-template-title">Start from a useful report</h2><p>Applying a template replaces the report settings below.</p></div>
            </div>
            <div className="report-templates" role="radiogroup" aria-label="Report templates">
              {TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  role="radio"
                  aria-checked={templateId === template.id}
                  onClick={() => applyTemplate(template)}
                >
                  <span>{template.title}</span>
                  <small>{template.description}</small>
                  <b aria-hidden="true">Apply</b>
                </button>
              ))}
            </div>
          </section>

          <section className="report-section" aria-labelledby="report-property-title">
            <div className="report-section__heading">
              <span>2</span>
              <div><h2 id="report-property-title">Name the report and property</h2><p>Use the numeric property ID from GA4 Admin, not the G- measurement ID.</p></div>
            </div>
            <div className="report-grid report-grid--two">
              <label className="report-control">
                <span>GA4 property ID</span>
                <input inputMode="numeric" pattern="[0-9]+" value={propertyId} placeholder="123456789" onChange={(event) => setPropertyId(event.target.value.replace(/\D/g, ""))} />
                <small>Admin → Property settings → Property details</small>
              </label>
              <label className="report-control">
                <span>Report name</span>
                <input value={settings.title} onChange={(event) => update("title", event.target.value)} />
                <small>You can change this again when saving in GA4.</small>
              </label>
            </div>
          </section>

          <section className="report-section" aria-labelledby="report-fields-title">
            <div className="report-section__heading">
              <span>3</span>
              <div><h2 id="report-fields-title">Choose dimensions and metrics</h2><p>The first dimension and metric become the report defaults.</p></div>
            </div>
            <FieldSlots legend="Dimensions" values={dimensionSlots} options={DIMENSIONS} onChange={(values) => { setTemplateId(""); setDimensionSlots(values); }} />
            <p className="report-fields__note">Custom dimensions are property-specific and must already be registered in this GA4 property. This local builder cannot read or verify the property.</p>
            <label className="report-control report-control--custom">
              <span>Custom dimensions</span>
              <input value={customDimensions} placeholder="plan_name, customUser:account_type" onChange={(event) => { setTemplateId(""); setCustomDimensions(event.target.value); }} />
              <small>Comma-separated parameter or GA4 API names. Plain names are treated as event-scoped.</small>
            </label>
            <FieldSlots legend="Metrics" values={metricSlots} options={METRICS} onChange={(values) => { setTemplateId(""); setMetricSlots(values); }} />
            <label className="report-control report-control--custom">
              <span>Custom metrics</span>
              <input value={customMetrics} placeholder="customEvent:score" onChange={(event) => { setTemplateId(""); setCustomMetrics(event.target.value); }} />
              <small>Comma-separated GA4 API names.</small>
            </label>
          </section>

          <section className="report-section" aria-labelledby="report-filter-title">
            <div className="report-section__heading">
              <span>4</span>
              <div><h2 id="report-filter-title">Filter and sort</h2><p>Keep all data or narrow the report to a specific dimension value.</p></div>
            </div>
            <div className="report-grid report-grid--three">
              <label className="report-control">
                <span>Filter type</span>
                <select value={settings.filterType} onChange={(event) => update("filterType", event.target.value as FilterType)}>
                  <option value="none">No filter</option>
                  <option value="anyOf">Any of this list</option>
                  <option value="exact">Exactly matches</option>
                  <option value="contains">Contains</option>
                  <option value="beginsWith">Starts with</option>
                  <option value="endsWith">Ends with</option>
                  <option value="regex">Regular expression</option>
                </select>
              </label>
              <label className="report-control">
                <span>Filter dimension</span>
                <select disabled={settings.filterType === "none"} value={settings.filterDimension} onChange={(event) => update("filterDimension", event.target.value)}>
                  {DIMENSIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  {enteredCustomDimensions.map((value) => <option key={value} value={value}>{value}</option>)}
                </select>
              </label>
              <label className="report-control">
                <span>Filter value</span>
                <input disabled={settings.filterType === "none"} value={settings.filterValue} placeholder={settings.filterType === "anyOf" ? "page_view, session_start" : "Value"} onChange={(event) => update("filterValue", event.target.value)} />
              </label>
              <label className="report-control">
                <span>Sort by</span>
                <select value={sortKey} onChange={(event) => update("sortKey", event.target.value)}>
                  {sortOptions.map((value) => <option key={value} value={value}>{metrics.includes(value) ? "Metric" : "Dimension"}: {labels.get(value) ?? value}</option>)}
                </select>
              </label>
              <label className="report-control">
                <span>Sort direction</span>
                <select value={settings.ascending ? "ascending" : "descending"} onChange={(event) => update("ascending", event.target.value === "ascending")}>
                  <option value="descending">Descending</option>
                  <option value="ascending">Ascending</option>
                </select>
              </label>
            </div>
          </section>

          <section className="report-section" aria-labelledby="report-charts-title">
            <div className="report-section__heading">
              <span>5</span>
              <div><h2 id="report-charts-title">Choose charts</h2><p>Charts use the same dimensions, metrics, filter, and sort order as the table.</p></div>
            </div>
            <div className="report-toggles">
              <label><input type="checkbox" checked={settings.lineChart} onChange={(event) => update("lineChart", event.target.checked)} /><span><b>Trend chart</b><small>Show change over time</small></span></label>
              <label><input type="checkbox" checked={settings.pieChart} onChange={(event) => update("pieChart", event.target.checked)} /><span><b>Pie chart</b><small>Show proportional breakdown</small></span></label>
            </div>
          </section>
        </div>

        <aside className="report-summary" aria-labelledby="report-summary-title">
          <div className="report-summary__inner">
            <p className="report-summary__eyebrow">Your report</p>
            <h2 id="report-summary-title">{settings.title || "Untitled report"}</h2>
            <dl>
              <div><dt>Dimensions</dt><dd>{dimensions.length}</dd></div>
              <div><dt>Metrics</dt><dd>{metrics.length}</dd></div>
              <div><dt>Filter</dt><dd>{settings.filterType === "none" ? "Off" : "On"}</dd></div>
              <div><dt>Charts</dt><dd>{Number(settings.lineChart) + Number(settings.pieChart)}</dd></div>
            </dl>
            <div className="report-summary__selection">
              <p><strong>Default dimension</strong><span>{labels.get(dimensions[0]) ?? dimensions[0] ?? "Not selected"}</span></p>
              <p><strong>Default metric</strong><span>{labels.get(metrics[0]) ?? metrics[0] ?? "Not selected"}</span></p>
            </div>
            {propertySpecificFields.length > 0 && (
              <div className="report-summary__custom-note">
                <strong>Complete this step in GA4</strong>
                <span>{propertySpecificFields.map((value) => labels.get(value) ?? value.replace(/^[^:]+:/, "")).join(", ")}</span>
                <small>GA4 report links use property-specific slot IDs for custom fields. The base report opens with valid native fields; add these registered fields in the report editor.</small>
              </div>
            )}
            {errors.length > 0 && <div className="report-summary__todo"><p>Before opening GA4:</p><ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
            <div className="report-summary__actions">
              <a className={ready ? "" : "is-disabled"} aria-disabled={!ready} tabIndex={ready ? undefined : -1} href={ready ? buildGa4ReportUrl(config) : undefined} target="_blank" rel="noopener">{propertySpecificFields.length ? "Open base report in GA4" : "Open in GA4"}</a>
              {propertySpecificFields.length > 0 && <button type="button" onClick={copyPropertySpecificFields}>Copy custom field names</button>}
              <button type="button" disabled={!ready} onClick={copy}>Copy report link</button>
            </div>
            <p className="report-summary__status" role="status" aria-live="polite">{status}</p>
            <p className="report-summary__note">GA4 opens a new unsaved detail report. Review it, then select Save to add it to your report library.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
