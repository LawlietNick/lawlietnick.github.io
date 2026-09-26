import assert from "node:assert/strict";
import test from "node:test";

import { feedDate, selectFeedEntries } from "../src/utils/feed-entries.ts";

const now = new Date("2026-07-18");
const entry = (title, data = {}) => ({
  data: { title, description: "d", tags: [], draft: false, date: new Date("2026-01-01"), ...data },
});

test("excludes drafts and future-dated entries", () => {
  const picked = selectFeedEntries(
    [
      entry("draft", { draft: true }),
      entry("future", { date: new Date("2027-01-01") }),
      entry("published"),
    ],
    { now },
  );
  assert.deepEqual(picked.map((e) => e.data.title), ["published"]);
});

test("sorts by updatedDate over date, newest first, capped at limit", () => {
  const picked = selectFeedEntries(
    [
      entry("old", { date: new Date("2026-01-01") }),
      entry("newest", { date: new Date("2026-03-01") }),
      entry("updated-old", { date: new Date("2025-06-01"), updatedDate: new Date("2026-06-01") }),
    ],
    { now, limit: 2 },
  );
  assert.deepEqual(picked.map((e) => e.data.title), ["updated-old", "newest"]);
});

test("feedDate falls back to publish date", () => {
  assert.equal(feedDate(entry("x").data).getTime(), new Date("2026-01-01").getTime());
});
