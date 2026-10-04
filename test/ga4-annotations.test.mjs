import assert from "node:assert/strict";
import test from "node:test";
import { annotationCategories, annotationDateGuidance, characterCount, hasPlaceholder, getDescriptionSuggestions } from "../src/data/ga4-annotations.js";
import { resolveLanguageLinks } from "../src/utils/language-links.js";

test("description completion preserves earlier sentences, avoids duplicates and leaves mid-sentence edits alone", () => {
  const category = annotationCategories.find((item) => item.code === "ADS");
  const suggestions = (text, caret) => getDescriptionSuggestions(category, "campaign", "fi", text, caret);
  assert.equal(suggestions("Meta-mainonta käynnistyi. Kampanja koh")[0].value, "Meta-mainonta käynnistyi. Kampanja kohdistettiin uusille asiakkaille.");
  assert.equal(suggestions("Kampanja kohdistettiin uusille asiakkaille.").some((item) => item.sentence === "Kampanja kohdistettiin uusille asiakkaille."), false);
  const original = "Kampanja kohdistettiin Helsinkiin.";
  assert.equal(suggestions(original, 9).every((item) => item.value.startsWith(original)), true);
});

test("Finnish and English annotation tools are a language pair", () => {
  const links = resolveLanguageLinks({ currentPath: "/fi/tyokalut/ga4-annotaatiot/", isFinnish: true, alternate: { lang: "en", href: "/tools/ga4-annotations/" } });
  assert.equal(links.enPath, "/tools/ga4-annotations/");
  assert.equal(links.hasLanguageAlternate, true);
});


test("all templates have bilingual copy, date guidance and relevant suggestions", () => {
  let count = 0;
  for (const category of annotationCategories) for (const template of category.templates) {
    count++;
    assert.ok(annotationDateGuidance.fi[template.id].startsWith("Valitse GA4:ssa"), template.id);
    assert.ok(annotationDateGuidance.en[template.id].startsWith("In GA4,"), template.id);
    assert.ok(template.label.fi && template.label.en, template.id);
    for (const language of ["fi", "en"]) {
      assert.ok(characterCount(`[${category.code}] ${template.title[language]}`) <= 60, template.id);
      const suggestions = getDescriptionSuggestions(category, template.id, language, "");
      assert.ok(suggestions.length > 0 && suggestions.length <= 4, template.id);
      for (const item of suggestions) assert.ok(characterCount(item.value) <= 150, template.id);
    }
  }
  assert.equal(count, 44);
  const podcast = getDescriptionSuggestions(annotationCategories[0], "podcast", "fi", "");
  assert.ok(podcast.every((item) => !item.sentence.includes("Uutiskirje")));
  assert.equal(hasPlaceholder("Valmis [INC-123]"), false);
  assert.equal(hasPlaceholder("Uutiskirje: [aihe]"), true);
});
