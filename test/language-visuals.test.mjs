import test from "node:test";
import assert from "node:assert/strict";
import { languageVisuals, total } from "../src/data/language-visuals.js";

const shape = (value) =>
  Array.isArray(value) ? value.map(shape) : value && typeof value === "object" ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)])) : typeof value;

test("example page views add up to the combined result", () => {
  for (const lang of ["fi", "en"]) {
    const { rows } = languageVisuals[lang].viewsMerge;
    assert.equal(rows.length, 5);
    assert.equal(total(rows), 1090);
    assert.deepEqual(Object.fromEntries(rows.map((r) => [r.code, r.views])), { FI: 320, EN: 280, SV: 190, DE: 160, FR: 140 });
  }
});

test("both languages describe the same five language versions in the same structure", () => {
  const fi = languageVisuals.fi;
  const en = languageVisuals.en;
  // the copy is localized, the structure is not
  assert.deepEqual(shape(fi), shape(en));
  assert.deepEqual([...fi.dataFlow.langs].sort(), [...en.dataFlow.langs].sort());
  assert.equal(fi.dataFlow.steps.length, 6);
  assert.deepEqual(fi.dataFlow.shared, en.dataFlow.shared);
});

test("the primary version has no language prefix in its own language", () => {
  assert.equal(languageVisuals.fi.viewsMerge.rows.find((r) => r.code === "FI").path, "/musiikkistudion-kayttoohjeet/");
  assert.equal(languageVisuals.en.viewsMerge.rows.find((r) => r.code === "EN").path, "/music-studio-user-guide/");
});

test("the permanent identifier is labelled as a proposal", () => {
  assert.match(languageVisuals.fi.urlChange.b.badge, /ei vielä toteutettu/);
  assert.match(languageVisuals.en.urlChange.b.badge, /not implemented/);
});
