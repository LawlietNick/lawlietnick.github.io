import assert from "node:assert/strict";
import test from "node:test";

import { selectLatestToolkit } from "../src/utils/latest-toolkit.ts";

const now = new Date("2026-11-07");
const entry = (href, date, extra = {}) => ({ href, title: href, summary: "", date, ...extra });

test("selects the newest three entries", () => {
  const selected = selectLatestToolkit(
    [entry("/a/", "2026-01-01"), entry("/b/", "2026-10-29"), entry("/c/", "2026-09-20"), entry("/d/", "2026-05-01")],
    { now },
  );
  assert.deepEqual(selected.map(({ href }) => href), ["/b/", "/c/", "/d/"]);
});

test("breaks date ties by order, then href", () => {
  const selected = selectLatestToolkit(
    [
      entry("/z/", "2026-09-26", { order: 2 }),
      entry("/y/", "2026-09-26", { order: 1 }),
      entry("/x/", "2026-09-26", { order: 1 }),
    ],
    { now },
  );
  assert.deepEqual(selected.map(({ href }) => href), ["/x/", "/y/", "/z/"]);
});

test("skips future and undated entries", () => {
  const selected = selectLatestToolkit(
    [entry("/future/", "2027-01-01"), entry("/undated/", undefined), entry("/ok/", "2026-01-01")],
    { now },
  );
  assert.deepEqual(selected.map(({ href }) => href), ["/ok/"]);
});
