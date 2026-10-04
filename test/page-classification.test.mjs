import assert from "node:assert/strict";
import test from "node:test";
import { classifyPage } from "../src/utils/page-classification.js";

test("classifies English and Finnish routes with language-independent values", () => {
  for (const [routes, pageType, primaryCategory, metadata] of [
    [["/", "/fi/"], "home", "general", {}],
    [["/blog/post/", "/fi/blog/kirjoitus/"], "article", "analytics", { category: "analytics" }],
    [["/templates/guide/", "/fi/toteutusmallit/opas/"], "template", "privacy", { category: "templates", primaryCategory: "privacy" }],
    [["/tools/builder/", "/fi/tyokalut/rakentaja/"], "tool", "reporting", { primaryCategory: "reporting" }],
    [["/services/audit/", "/fi/palvelut/auditointi/"], "service", "seo", { group: "seo" }],
    [["/about/", "/fi/minusta/"], "about", "general", {}],
    [["/privacy/", "/fi/privacy/"], "legal", "privacy", {}],
    [["/404.html", "/fi/404/"], "error", "general", {}],
    [["/design-system/", "/fi/other/"], "page", "general", {}],
    [["/blog/", "/fi/blog/", "/tools/", "/fi/tyokalut/", "/templates/", "/fi/toteutusmallit/", "/services/", "/fi/palvelut/"], "listing", "general", {}],
  ]) {
    for (const route of routes) assert.deepEqual(classifyPage(route, metadata), { pageType, primaryCategory });
  }
});

test("explicit primary category overrides existing article and service groups", () => {
  assert.equal(classifyPage("/blog/post/", { category: "analytics", primaryCategory: "seo" }).primaryCategory, "seo");
  assert.equal(classifyPage("/fi/palvelut/banneri/", { group: "analytics", primaryCategory: "privacy" }).primaryCategory, "privacy");
});

test("content needs a valid topic; collection names and invalid overrides are rejected", () => {
  for (const [route, metadata] of [
    ["/blog/post/", {}], ["/templates/guide/", { category: "templates" }],
    ["/tools/builder/", {}], ["/services/audit/", { group: "unknown" }],
    ["/", { primaryCategory: "Analytics" }], ["/", { primaryCategory: "" }],
    ["/", { primaryCategory: "toString" }],
  ]) assert.throws(() => classifyPage(route, metadata), /missing or invalid primaryCategory/);
});
