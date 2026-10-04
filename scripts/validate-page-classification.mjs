import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { JSDOM } from "jsdom";
import { categories } from "../src/data/categories.js";
import { pageTypes, classifyPage } from "../src/utils/page-classification.js";

const pages = new Map();
for (const file of await readdir(new URL("../dist/", import.meta.url), { recursive: true })) {
  // Static entity metadata companion is not a classified site content page.
  if (!file.endsWith(".html") || file === "entitymap.html") continue;
  const html = await readFile(new URL(`../dist/${file}`, import.meta.url), "utf8");
  const dom = new JSDOM(html);
  const document = dom.window.document;
  if (document.querySelector('meta[http-equiv="refresh" i]')) {
    dom.window.close();
    continue;
  }
  const route = `/${file.replace(/index\.html$/, "")}`;
  const values = {};
  for (const name of ["page_type", "primary_category"]) {
    const tags = document.head.querySelectorAll(`meta[name="${name}"]`);
    assert.equal(tags.length, 1, `${file}: expected exactly one ${name} tag in head`);
    values[name] = tags[0].getAttribute("content");
  }
  assert.ok(pageTypes.includes(values.page_type), `${file}: invalid page_type`);
  assert.ok(Object.hasOwn(categories, values.primary_category), `${file}: invalid primary_category`);
  assert.equal(values.page_type, classifyPage(route, { primaryCategory: values.primary_category }).pageType, `${file}: wrong page_type`);
  const canonical = document.querySelector('link[rel="canonical"]')?.href;
  if (canonical) pages.set(canonical, {
    file, values,
    alternates: [...document.querySelectorAll('link[rel="alternate"][hreflang="en"], link[rel="alternate"][hreflang="fi"]')].map((link) => link.href),
  });
  dom.window.close();
}
for (const [canonical, page] of pages) {
  for (const alternate of page.alternates) {
    const counterpart = pages.get(alternate);
    // Some untranslated tools link to the other language's hub, not a translation.
    if (!counterpart?.alternates.includes(canonical)) continue;
    assert.deepEqual(page.values, counterpart.values, `${page.file} and ${counterpart.file}: classification differs`);
  }
}
console.log(`Page classification validation passed (${pages.size} canonical HTML pages).`);
