import assert from "node:assert/strict";
import test from "node:test";

import { categoryTerm, escapeXml, imageMimeType } from "../src/utils/feed-xml.ts";

test("escapes Atom text and attributes and removes invalid XML characters", () => {
  assert.equal(
    escapeXml(`Analytics & <data> "decisions" 'now'\u0000`),
    "Analytics &amp; &lt;data&gt; &quot;decisions&quot; &apos;now&apos;",
  );
});

test("normalizes category terms and identifies supported image MIME types", () => {
  assert.equal(categoryTerm("Artificial intelligence"), "artificial-intelligence");
  assert.equal(categoryTerm("Kävijä-analyysi"), "kavija-analyysi");
  assert.equal(imageMimeType("/images/example.JPEG"), "image/jpeg");
  assert.equal(imageMimeType("/images/example.svg"), undefined);
});
