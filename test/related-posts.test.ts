import assert from "node:assert/strict";
import test from "node:test";

import { selectRelatedPosts } from "../src/utils/related-posts.ts";

const now = new Date("2026-07-19");
const post = (slug, data = {}) => ({
  slug,
  language: "en",
  title: slug,
  description: `${slug} description`,
  date: new Date("2026-01-01"),
  url: `/blog/${slug}/`,
  tags: [],
  ...data,
});

test("keeps valid manual order and ignores duplicate, missing, current, draft, and future slugs", () => {
  const current = post("current", {
    relatedPosts: ["second", "missing", "second", "current", "draft", "future", "first"],
  });
  const picked = selectRelatedPosts(
    current,
    [
      current,
      post("first"),
      post("second"),
      post("draft", { draft: true }),
      post("future", { date: new Date("2027-01-01") }),
    ],
    { now },
  );
  assert.deepEqual(picked.map(({ slug }) => slug), ["second", "first"]);
});

test("fills manual selections by relevance, then newest date, with slug as a stable tie-breaker", () => {
  const current = post("current", {
    tags: ["AI", "SEO"],
    category: "Guides",
    relatedPosts: ["manual"],
  });
  const picked = selectRelatedPosts(
    current,
    [
      post("manual"),
      post("category", { category: "guides", date: new Date("2026-05-01") }),
      post("two-tags", { tags: ["seo", "ai"], date: new Date("2025-01-01") }),
      post("a-tie", { tags: ["seo"], date: new Date("2026-06-01") }),
      post("z-tie", { tags: ["seo"], date: new Date("2026-06-01") }),
      post("newest-unmatched", { date: new Date("2026-07-01") }),
    ],
    { now },
  );
  assert.deepEqual(picked.map(({ slug }) => slug), ["manual", "two-tags", "a-tie"]);
});

test("uses recent fallback, isolates languages, and caps results", () => {
  const current = post("current");
  const picked = selectRelatedPosts(
    current,
    [
      post("old", { date: new Date("2025-01-01") }),
      post("new", { date: new Date("2026-06-01") }),
      post("middle", { date: new Date("2026-03-01") }),
      post("fourth", { date: new Date("2024-01-01") }),
      post("finnish", { language: "fi", date: new Date("2026-07-01") }),
    ],
    { now },
  );
  assert.deepEqual(picked.map(({ slug }) => slug), ["new", "middle", "old"]);
});

test("handles empty metadata, fewer than three posts, and a custom limit", () => {
  const current = post("current", { tags: undefined, relatedPosts: [] });
  const candidate = post("only", { tags: undefined, image: undefined, minutes: undefined });
  assert.deepEqual(selectRelatedPosts(current, [candidate], { now }).map(({ slug }) => slug), ["only"]);
  assert.deepEqual(selectRelatedPosts(current, [candidate], { now, limit: 0 }), []);
});
