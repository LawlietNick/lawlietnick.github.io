import assert from "node:assert/strict";
import test from "node:test";

import { selectNewest } from "../src/utils/select-newest.ts";

const now = new Date("2026-07-20");
const item = (id, date, extra = {}) => ({ id, date, ...extra });
const ids = (list) => list.map(({ id }) => id);

test("selects the newest three", () => {
  const selected = selectNewest(
    [item("old", "2025-01-01"), item("newest", "2026-07-19"), item("middle", "2026-06-01"), item("third", "2026-05-01")],
    { now },
  );
  assert.deepEqual(ids(selected), ["newest", "middle", "third"]);
});

test("skips future and undated entries", () => {
  const selected = selectNewest(
    [item("future", "2027-01-01"), item("undated", undefined), item("ok", "2026-01-01")],
    { now },
  );
  assert.deepEqual(ids(selected), ["ok"]);
});

test("applies skip, uniqueBy and tieBreak", () => {
  const selected = selectNewest(
    [
      item("z", "2026-06-01"),
      item("a", "2026-06-01"),
      item("a", "2026-06-01"),
      item("draft", "2026-07-01", { draft: true }),
    ],
    {
      now,
      skip: (e) => e.draft,
      uniqueBy: (e) => e.id,
      tieBreak: (a, b) => a.id.localeCompare(b.id),
    },
  );
  assert.deepEqual(ids(selected), ["a", "z"]);
});
