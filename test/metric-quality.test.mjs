import assert from "node:assert/strict";
import test from "node:test";
import { metricBandIndex, gatedBandIndex } from "../src/utils/metric-quality.js";

test("maps scores to the four metric quality bands", () => {
  assert.deepEqual(
    Array.from({ length: 11 }, (_, score) => metricBandIndex(score)),
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 3],
  );
});

test("caps the band at diagnostic when business relevance is zero", () => {
  assert.equal(gatedBandIndex(7, 0), 1); // supporting -> diagnostic
  assert.equal(gatedBandIndex(8, 0), 1); // critical -> diagnostic
  assert.equal(gatedBandIndex(3, 0), 0); // already vanity, unchanged
});

test("leaves the band unchanged when business relevance is present", () => {
  assert.equal(gatedBandIndex(7, 1), 2);
  assert.equal(gatedBandIndex(10, 2), 3);
});
