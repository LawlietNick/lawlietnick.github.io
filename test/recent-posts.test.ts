import assert from "node:assert/strict";
import test from "node:test";

import { selectRecentPosts } from "../src/utils/recent-posts.ts";

const now = new Date("2026-07-20");
const post = (url, date, data = {}) => ({ url, date: new Date(date), ...data });

test("selects the newest three published unique posts", () => {
  const selected = selectRecentPosts(
    [
      post("/old/", "2025-01-01"),
      post("/newest/", "2026-07-19"),
      post("/middle/", "2026-06-01"),
      post("/third/", "2026-05-01"),
      post("/middle/", "2026-06-01"),
    ],
    { now },
  );
  assert.deepEqual(selected.map(({ url }) => url), ["/newest/", "/middle/", "/third/"]);
});

test("excludes drafts and future posts and handles fewer than three", () => {
  const selected = selectRecentPosts(
    [
      post("/published/", "2026-01-01"),
      post("/draft/", "2026-02-01", { draft: true }),
      post("/future/", "2027-01-01"),
    ],
    { now },
  );
  assert.deepEqual(selected.map(({ url }) => url), ["/published/"]);
});
