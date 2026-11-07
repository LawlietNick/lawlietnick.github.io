import assert from "node:assert/strict";
import test from "node:test";
import { assessMetric, metricBandIndex, metricQuestions } from "../src/utils/metric-quality.js";

const allYes = () => Object.fromEntries(metricQuestions.map(({ id }) => [id, "yes"]));

test("maps all score boundaries to quality bands", () => {
  assert.deepEqual(Array.from({ length: 11 }, (_, score) => metricBandIndex(score)),
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 3]);
});

for (const id of ["q1", "q3", "q6", "q8"]) {
  for (const answer of ["no"]) {
    test(`${id}=${answer} limits a nine-point assessment`, () => {
      const result = assessMetric({ ...allYes(), [id]: answer });
      assert.equal(result.yes, 9);
      assert.equal(result.complete, true);
      assert.equal(result.bandIndex, 1);
      assert.equal(result.capped, true);
      assert.deepEqual(result.unresolvedEssential, [id]);
      assert.deepEqual(result.gaps, [id]);
      assert.equal(result.nextId, id);
    });
  }
}

test("keeps unanswered and invalid answers separate from no answers", () => {
  const result = assessMetric({ ...allYes(), q2: null, q4: "no", q10: "invalid" });
  assert.equal(result.answered, 8);
  assert.equal(result.yes, 7);
  assert.equal(result.complete, false);
  assert.equal(result.bandIndex, null);
  assert.deepEqual(result.gaps, ["q4"]);
  assert.equal(result.answers.q10, null);
});

test("all no answers finish an unproven assessment", () => {
  const result = assessMetric(Object.fromEntries(metricQuestions.map(({ id }) => [id, "no"])));
  assert.equal(result.complete, true);
  assert.equal(result.yes, 0);
  assert.equal(result.bandIndex, 0);
  assert.equal(result.gaps.length, 10);
});

test("keeps strong scores when nonessential checks fail and prioritizes essential work", () => {
  const result = assessMetric({ ...allYes(), q2: "no", q4: "no" });
  assert.equal(result.bandIndex, 3);
  assert.equal(result.capped, false);
  assert.equal(result.nextId, "q2");
  assert.equal(assessMetric({ ...allYes(), q2: "no", q8: "no" }).nextId, "q8");
  assert.equal(assessMetric({ ...allYes(), q1: "no", q3: "no", q6: "no", q8: "no" }).nextId, "q1");
});

test("all yes answers return area scores and no follow-up gap", () => {
  const result = assessMetric(allYes());
  assert.equal(result.bandIndex, 3);
  assert.deepEqual(result.tierYes, { A: 2, B: 3, C: 5 });
  assert.deepEqual(result.unresolvedEssential, []);
  assert.equal(result.nextId, null);
  assert.equal(result.yes, 10);
});
