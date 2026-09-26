export type GtmRecord = Record<string, any>;

export interface BuilderSettings {
  containerName: string;
  companyName: string;
  measurementId: string;
  defaultCurrency: string;
  outputFilename: string;
}

export interface BuilderState {
  version: 1;
  sourceFingerprint: string;
  selectedTagIds: string[];
  settings: BuilderSettings;
}

export type TagNecessity = "required" | "essential" | "recommended" | "optional";
export type TagNamingConvention = "numbered" | "short";

export interface TagOption {
  id: string;
  name: string;
  eventName: string;
  description: string;
  group: "Page views" | "Ecommerce" | "Browse" | "Cart" | "Checkout" | "Promotions";
  tagType: string;
  necessity: TagNecessity;
  defaultSelected: boolean;
}

export const NECESSITY_LABELS: Record<TagNecessity, string> = {
  required: "Required",
  essential: "Essential",
  recommended: "Recommended",
  optional: "Optional",
};

const TAG_TYPE_LABELS: Record<string, string> = {
  gaawe: "GA4 Event",
  googtag: "Google Tag",
};

export interface BuilderValidation {
  errors: string[];
  warnings: string[];
}

// Shared by validateBuilder and the HTML `pattern` attribute so there is one source of truth.
export const MEASUREMENT_ID_PATTERN = "G-[A-Z0-9]+";
export const CURRENCY_PATTERN = "[A-Z]{3}";

const clone = <T,>(value: T): T => structuredClone(value);

const parameterValue = (value: GtmRecord, key: string) =>
  value.parameter?.find((parameter: GtmRecord) => parameter.key === key)?.value ?? "";

const setParameterValue = (
  value: GtmRecord,
  key: string,
  nextValue: string,
  type = "TEMPLATE",
) => {
  const parameters = Array.isArray(value.parameter) ? value.parameter : [];
  const index = parameters.findIndex((parameter: GtmRecord) => parameter.key === key);
  const parameter = { type, key, value: nextValue };
  if (index < 0) parameters.push(parameter);
  else parameters[index] = { ...parameters[index], ...parameter };
  value.parameter = parameters;
};

const EVENT_DETAILS: Record<string, Pick<TagOption, "description" | "group" | "necessity">> = {
  view_item_list: { description: "A product list becomes visible.", group: "Browse", necessity: "recommended" },
  select_item: { description: "A visitor chooses an item from a list.", group: "Browse", necessity: "recommended" },
  view_item: { description: "A product detail view is shown.", group: "Browse", necessity: "essential" },
  add_to_wishlist: { description: "A product is saved to a wishlist.", group: "Cart", necessity: "optional" },
  add_to_cart: { description: "A product is added to the cart.", group: "Cart", necessity: "essential" },
  remove_from_cart: { description: "A product is removed from the cart.", group: "Cart", necessity: "recommended" },
  view_cart: { description: "The cart contents are viewed.", group: "Cart", necessity: "essential" },
  begin_checkout: { description: "A visitor starts checkout.", group: "Checkout", necessity: "essential" },
  add_shipping_info: { description: "Shipping details are submitted.", group: "Checkout", necessity: "recommended" },
  add_payment_info: { description: "Payment details are submitted.", group: "Checkout", necessity: "recommended" },
  purchase: { description: "An order is completed.", group: "Checkout", necessity: "essential" },
  view_promotion: { description: "An internal promotion is viewed.", group: "Promotions", necessity: "optional" },
  select_promotion: { description: "An internal promotion is selected.", group: "Promotions", necessity: "optional" },
};

export const tagOptions = (source: GtmRecord): TagOption[] =>
  (source.containerVersion.tag ?? []).map((tag: GtmRecord) => {
    const configuredEventName = parameterValue(tag, "eventName");
    const isPageView = tag.type === "googtag" && /Page View - All Pages/i.test(tag.name ?? "");
    const isSharedEcommerceTag = tag.type === "gaawe" && configuredEventName === "{{Event}}";
    const eventName = isSharedEcommerceTag
      ? "supported_ecommerce_events"
      : configuredEventName || (isPageView ? "page_view" : tag.name);
    const tagType = TAG_TYPE_LABELS[tag.type] ?? tag.type;
    if (isPageView) {
      return {
        id: String(tag.tagId),
        name: tag.name,
        eventName,
        description: "Required Google tag that sends a page view on every page.",
        group: "Page views",
        tagType,
        necessity: "required",
        defaultSelected: true,
      };
    }
    if (isSharedEcommerceTag) {
      return {
        id: String(tag.tagId),
        name: tag.name,
        eventName,
        description: "Sends all 13 supported ecommerce events through one shared tag.",
        group: "Ecommerce",
        tagType,
        necessity: "essential",
        defaultSelected: true,
      };
    }
    const details = EVENT_DETAILS[eventName] ?? {
      description: `Send the ${eventName || tag.name} event.`,
      group: "Browse" as const,
      necessity: "optional" as const,
    };
    return { id: String(tag.tagId), name: tag.name, eventName, tagType, defaultSelected: true, ...details };
  });

export function applyTagNamingConvention(
  source: GtmRecord,
  convention: TagNamingConvention,
): GtmRecord {
  const output = clone(source);
  const tags = output.containerVersion.tag ?? [];
  if (convention === "short") {
    for (const tag of tags) tag.name = String(tag.name ?? "").replace(/^\d{2}\.\d{2}\s+/, "");
    return output;
  }

  let nextNumber = 2;
  for (const tag of tags) {
    if (/^\d{2}\.\d{2}\s+/.test(tag.name ?? "")) continue;
    const number = tag.type === "googtag" && /Page View - All Pages/i.test(tag.name ?? "")
      ? 1
      : nextNumber++;
    tag.name = `01.${String(number).padStart(2, "0")} ${tag.name}`;
  }
  return output;
}

const slugify = (value: string) =>
  value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "container";

export function createBuilderState(source: GtmRecord): BuilderState {
  const container = source.containerVersion.container;
  return {
    version: 1,
    sourceFingerprint: String(source.containerVersion.fingerprint),
    selectedTagIds: tagOptions(source).filter(({ defaultSelected }) => defaultSelected).map(({ id }) => id),
    settings: {
      containerName: container.name,
      // ponytail: left empty on purpose — pre-filling the source placeholders produced
      // valid-looking state that exported a container wired to a fake GA4 property
      companyName: "",
      measurementId: "",
      defaultCurrency: "EUR",
      outputFilename: `gtm-${slugify(container.name)}.json`,
    },
  };
}

export function updateBuilderSetting(
  state: BuilderState,
  key: keyof BuilderSettings,
  value: string,
): BuilderState {
  const next = clone(state);
  next.settings[key] = value;
  if (key === "containerName") next.settings.outputFilename = `gtm-${slugify(value)}.json`;
  return next;
}

export function toggleTag(state: BuilderState, tagId: string): BuilderState {
  const next = clone(state);
  next.selectedTagIds = next.selectedTagIds.includes(tagId)
    ? next.selectedTagIds.filter((id) => id !== tagId)
    : [...next.selectedTagIds, tagId];
  return next;
}

export function selectTags(state: BuilderState, tagIds: string[]): BuilderState {
  return { ...clone(state), selectedTagIds: [...tagIds] };
}

export function validateBuilder(state: BuilderState, source?: GtmRecord): BuilderValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!state.selectedTagIds.length) errors.push("Choose at least one tag.");
  const missingRequiredTag = state.selectedTagIds.length > 0 && source && tagOptions(source).some(
    ({ id, necessity }) => necessity === "required" && !state.selectedTagIds.includes(id),
  );
  if (missingRequiredTag) errors.push("The GA4 page view tag is required.");
  if (!new RegExp(`^${MEASUREMENT_ID_PATTERN}$`).test(state.settings.measurementId)) errors.push("GA4 measurement ID must start with G- and use uppercase letters or numbers.");
  if (!state.settings.companyName.trim()) errors.push("Company suffix is required.");
  if (!new RegExp(`^${CURRENCY_PATTERN}$`).test(state.settings.defaultCurrency)) errors.push("Default currency must be a three-letter uppercase code.");
  if (!state.settings.containerName.trim()) errors.push("Container name is required.");
  if (!state.settings.outputFilename.toLowerCase().endsWith(".json")) errors.push("Output filename must end with .json.");
  const includesSharedEcommerceTag = source && tagOptions(source).some(
    ({ id, eventName }) => eventName === "supported_ecommerce_events" && state.selectedTagIds.includes(id),
  );
  if (state.selectedTagIds.length < 5 && !includesSharedEcommerceTag) warnings.push("This is a small selection. Confirm that it covers the full customer journey you measure.");
  return { errors, warnings };
}

const variableReferences = (value: any) => {
  const refs = new Set<string>();
  const visit = (item: any) => {
    if (typeof item === "string") {
      for (const match of item.matchAll(/\{\{([^{}]+)\}\}/g)) refs.add(match[1].trim());
    } else if (Array.isArray(item)) item.forEach(visit);
    else if (item && typeof item === "object") Object.values(item).forEach(visit);
  };
  visit(value);
  return refs;
};

const customTemplateType = (template: GtmRecord) =>
  template.templateData?.match(/"id"\s*:\s*"(cvt_[^"]+)"/)?.[1];

const exportTime = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

export function buildSelectedContainer(
  state: BuilderState,
  source: GtmRecord,
  date = new Date(),
) {
  const validation = validateBuilder(state, source);
  if (validation.errors.length) throw new Error(validation.errors.join(" "));

  const output = clone(source);
  const version = output.containerVersion;
  const selectedTags = version.tag.filter((tag: GtmRecord) => state.selectedTagIds.includes(String(tag.tagId)));
  const triggerIds = new Set<string>(selectedTags.flatMap((tag: GtmRecord) => [
    ...(tag.firingTriggerId ?? []),
    ...(tag.blockingTriggerId ?? []),
  ]));
  const selectedTriggers = version.trigger.filter((trigger: GtmRecord) => triggerIds.has(String(trigger.triggerId)));

  const variableNames = new Set<string>();
  [...selectedTags, ...selectedTriggers].forEach((resource) =>
    variableReferences(resource).forEach((name) => variableNames.add(name)),
  );
  let grew = true;
  while (grew) {
    grew = false;
    for (const variable of version.variable) {
      if (!variableNames.has(variable.name)) continue;
      for (const name of variableReferences(variable)) {
        if (!variableNames.has(name)) {
          variableNames.add(name);
          grew = true;
        }
      }
    }
  }
  const selectedVariables = version.variable.filter((variable: GtmRecord) => variableNames.has(variable.name));

  const constant = selectedVariables.find(
    (variable: GtmRecord) => variable.type === "c" && /GA4 ID/i.test(variable.name ?? ""),
  );
  if (constant) {
    const oldName = constant.name;
    constant.name = `CONST - GA4 ID - ${state.settings.measurementId} - ${state.settings.companyName}`;
    setParameterValue(constant, "value", state.settings.measurementId);
    const before = `{{${oldName}}}`;
    const after = `{{${constant.name}}}`;
    const replace = (item: any): any => {
      if (typeof item === "string") return item.replaceAll(before, after);
      if (Array.isArray(item)) return item.map(replace);
      if (item && typeof item === "object") return Object.fromEntries(Object.entries(item).map(([key, value]) => [key, replace(value)]));
      return item;
    };
    selectedTags.splice(0, selectedTags.length, ...selectedTags.map(replace));
  }

  const currency = selectedVariables.find((variable: GtmRecord) => /Currency Code/i.test(variable.name ?? ""));
  if (currency) {
    setParameterValue(currency, "setDefaultValue", "true", "BOOLEAN");
    setParameterValue(currency, "defaultValue", state.settings.defaultCurrency);
  }

  const templateTypes = new Set(selectedVariables.map((variable: GtmRecord) => variable.type).filter((type: string) => type?.startsWith("cvt_")));
  const selectedTemplates = version.customTemplate.filter((template: GtmRecord) => templateTypes.has(customTemplateType(template)));
  const folderIds = new Set<string>(
    [...selectedTags, ...selectedTriggers, ...selectedVariables, ...selectedTemplates]
      .map((resource) => resource.parentFolderId)
      .filter(Boolean),
  );

  version.tag = selectedTags;
  version.trigger = selectedTriggers;
  version.variable = selectedVariables;
  version.folder = version.folder.filter((folder: GtmRecord) => folderIds.has(String(folder.folderId)));
  version.customTemplate = selectedTemplates;
  version.builtInVariable = version.builtInVariable ?? [];
  version.container.name = state.settings.containerName;
  output.exportTime = exportTime(date);
  return output;
}

export const generateSelectedJson = (
  state: BuilderState,
  source: GtmRecord,
  date = new Date(),
) => `${JSON.stringify(buildSelectedContainer(state, source, date), null, 2)}\n`;

export function outputCounts(output: GtmRecord) {
  const version = output.containerVersion;
  return {
    tags: version.tag.length,
    triggers: version.trigger.length,
    variables: version.variable.length,
    folders: version.folder.length,
    templates: version.customTemplate.length,
  };
}

export function parseBuilderState(text: string, source: GtmRecord): BuilderState {
  const parsed = JSON.parse(text);
  if (parsed?.version !== 1 || parsed?.sourceFingerprint !== String(source.containerVersion.fingerprint)) {
    throw new Error("Saved choices do not match this GTM template.");
  }
  if (!Array.isArray(parsed.selectedTagIds) || !parsed.settings) throw new Error("Saved choices are incomplete.");
  const requiredIds = tagOptions(source).filter(({ necessity }) => necessity === "required").map(({ id }) => id);
  return { ...parsed, selectedTagIds: [...new Set([...parsed.selectedTagIds, ...requiredIds])] };
}
