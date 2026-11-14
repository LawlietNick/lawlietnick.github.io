import { defaultLevels, levelKeys, templates } from "../data/meta-naming.js";

export { levelKeys, templates };

// A level is { separator, lowercase, components: [{ key, value, sepAfter }] }. The last
// component never has a separator after it, so sepAfter is ignored there.
// lowercase only changes the generated name; the typed values stay as they are.
export const newLevels = () =>
  Object.fromEntries(levelKeys.map((level) => [level, { separator: "_", lowercase: true, components: defaultLevels[level].map(([key, value]) => ({ key, value, sepAfter: "_" })) }]));

const join = (level, part) =>
  level.components.map((c, i) => part(c) + (i < level.components.length - 1 ? (c.sepAfter ?? level.separator) : "")).join("");

export const formula = (level) => (level.components.length ? join(level, (c) => `{${c.key}}`) : "");
// missing is the text for a component without a value; it comes from the copy files.
export const example = (level, missing = "") => {
  if (!level.components.length) return "";
  const name = join(level, (c) => c.value || missing);
  return level.lowercase ? name.toLowerCase() : name;
};

export const setLowercase = (level, on) => {
  level.lowercase = Boolean(on);
};

export const setSeparator = (level, separator) => {
  level.separator = separator;
  level.components.forEach((c) => (c.sepAfter = separator));
};

export const move = (level, index, step) => {
  const to = index + step;
  if (to < 0 || to >= level.components.length) return;
  [level.components[index], level.components[to]] = [level.components[to], level.components[index]];
};

// A new component takes the level's separator, and the one before it gets it too.
export const addComponent = (level, key, value) => {
  const last = level.components.at(-1);
  if (last) last.sepAfter = level.separator;
  level.components.push({ key, value, sepAfter: level.separator });
};

// sample is the value for a free component without its own sample; it comes from the copy files.
export const startValue = (def, sample = "") => (def.type === "predefined" ? (def.allowed[0] ?? "") : (def.sample ?? sample));

// Custom keys are lower case letters, digits and underscores only.
export const cleanKey = (raw) => String(raw ?? "").trim().toLowerCase().replace(/[^a-z0-9_]/g, "");

// Warnings are codes, not text, so the page can show them in either language.
// They never block anything.
export const validate = (level) => {
  if (!level.components.length) return [{ code: "empty" }];
  const warnings = [];
  for (const { key, value } of level.components) {
    if (!value || !value.trim()) warnings.push({ code: "noValue", key });
    else if (/\s/.test(value.trim()) && level.separator !== " ") warnings.push({ code: "spaces", key });
  }
  const keys = level.components.map((c) => c.key);
  const dup = keys.find((k, i) => keys.indexOf(k) !== i);
  if (dup) warnings.push({ code: "duplicate", key: dup });
  return warnings;
};

// A template as the same level objects the builder works on. Every call returns fresh
// objects, so editing the builder never touches the template data.
export const levelsFromTemplate = (template, lowercase = true) =>
  Object.fromEntries(
    levelKeys.map((level) => {
      const { separator, components } = template.levels[level];
      return [level, { separator, lowercase, components: components.map(([key, value, sepAfter]) => ({ key, value, sepAfter: sepAfter ?? separator })) }];
    })
  );

// The structure of the levels as plain text: separator, lowercase and every component's key,
// value and separator (the last component's is ignored). It has no UI ids, so a template and
// the builder's current state can be compared directly.
export const structureOf = (levels) =>
  JSON.stringify(
    levelKeys.map((level) => {
      const { separator, lowercase, components } = levels[level];
      return [separator, Boolean(lowercase), components.map((c, i) => [c.key, c.value ?? "", i < components.length - 1 ? (c.sepAfter ?? separator) : ""])];
    })
  );

export const sameStructure = (a, b) => structureOf(a) === structureOf(b);
