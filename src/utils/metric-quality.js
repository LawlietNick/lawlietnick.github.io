export const metricBandIndex = (score) =>
  Math.min(Math.max(Math.floor(score / 2) - 1, 0), 3);

export const metricQuestions = [
  { id: "q1", tier: "A" }, { id: "q2", tier: "A" },
  { id: "q3", tier: "B" }, { id: "q4", tier: "B" }, { id: "q5", tier: "B" },
  { id: "q6", tier: "C" }, { id: "q7", tier: "C" }, { id: "q8", tier: "C" },
  { id: "q9", tier: "C" }, { id: "q10", tier: "C" },
];
const essentialIds = ["q1", "q3", "q6", "q8"];

export const assessMetric = (answers) => {
  const normalized = Object.fromEntries(metricQuestions.map(({ id }) => [
    id, ["yes", "no"].includes(answers[id]) ? answers[id] : null,
  ]));
  const answered = Object.values(normalized).filter(Boolean).length;
  const yes = Object.values(normalized).filter((a) => a === "yes").length;
  const complete = answered === metricQuestions.length;
  const gaps = metricQuestions.filter(({ id }) => normalized[id] === "no").map(({ id }) => id);
  const unresolvedEssential = essentialIds.filter((id) => normalized[id] !== "yes");
  const baseBandIndex = metricBandIndex(yes);
  const bandIndex = !complete ? null : unresolvedEssential.length ? Math.min(baseBandIndex, 1) : baseBandIndex;
  const tierYes = { A: 0, B: 0, C: 0 };
  metricQuestions.forEach(({ id, tier }) => { if (normalized[id] === "yes") tierYes[tier] += 1; });
  const priority = [...essentialIds, ...metricQuestions.map(({ id }) => id).filter((id) => !essentialIds.includes(id))];
  const nextId = priority.find((id) => normalized[id] !== "yes") ?? null;
  return { answers: normalized, answered, yes, complete, tierYes, bandIndex,
    unresolvedEssential, capped: complete && bandIndex < baseBandIndex,
    gaps, nextId };
};
