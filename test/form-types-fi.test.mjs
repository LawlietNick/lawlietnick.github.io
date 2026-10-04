import assert from "node:assert/strict";
import test from "node:test";
import { formCategories, formTypes } from "../src/data/form-types.js";
import { categoriesFi, typesFi, localizeFormTaxonomy } from "../src/data/form-types.fi.js";

test("every form category and type has Finnish copy, and shown notes are translated", () => {
  for (const c of formCategories) for (const key of ["blurb", "action", "hint", "examples"]) assert.ok(categoriesFi[c.id]?.[key], `${c.id}.${key}`);
  for (const t of formTypes) {
    assert.ok(typesFi[t.id]?.description, t.id);
    assert.ok(!typesFi[t.id].description.endsWith("."), `${t.id}: no final period`);
    if (/^(SENSITIVE|Exclude|Required|Review trigger)/.test(t.note)) assert.ok(typesFi[t.id].note, `${t.id}.note`);
  }
  assert.deepEqual(Object.keys(typesFi).sort(), formTypes.map((t) => t.id).sort());
});

test("localizing keeps tracked names and examples in English", () => {
  const { types } = localizeFormTaxonomy(formCategories, formTypes);
  assert.deepEqual(types.map((t) => [t.category, t.type, t.examples, t.confusedWith, t.note]), formTypes.map((t) => [t.category, t.type, t.examples, t.confusedWith, t.note]));
});
