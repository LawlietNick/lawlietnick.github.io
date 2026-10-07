import test from "node:test";
import assert from "node:assert/strict";
import { isExternalLink } from "../src/utils/external-links.js";

const base = "http://localhost:4321/blog/example/";

test("own-domain and local links stay internal in preview", () => {
  for (const href of ["/about/", "#source", "../", "https://karppinen.one", "https://www.karppinen.one/about/", "http://localhost:4321/about/"]) {
    assert.equal(isExternalLink(href, base), false, href);
  }
});

test("external HTTP links include protocol-relative and misleading domain names", () => {
  for (const href of ["https://google.com", "http://example.org", "//example.org", "https://karppinen.one.example.org", "https://example.org/?url=karppinen.one", "https://karppinen.one@example.org", "HTTPS://EXAMPLE.ORG"]) {
    assert.equal(isExternalLink(href, base), true, href);
  }
});

test("non-web and malformed URLs do not receive an icon", () => {
  for (const href of ["mailto:hello@example.org", "tel:+358123", "javascript:void(0)", "https://[", null]) {
    assert.equal(isExternalLink(href, base), false, href);
  }
});
