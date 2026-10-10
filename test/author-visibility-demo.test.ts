import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { observeAuthorVisibility } from "../src/scripts/author-visibility-demo.ts";

for (const complete of ["Kirjoittajalaatikon näkyvyysehto täyttyi", "Author box visibility condition met"]) {
test(`author visibility requires continuous foreground exposure: ${complete}`, (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const dom = new JSDOM(`<div data-author-visibility-demo><aside class="author-bio"></aside><div data-visibility-note hidden><span data-visibility-status data-visibility-complete="${complete}">Waiting</span></div></div>`);
  let onIntersection;
  let disconnected = false;
  class Observer {
    constructor(callback) { onIntersection = callback; }
    observe() {}
    disconnect() { disconnected = true; }
  }
  Object.assign(globalThis, { window: dom.window, document: dom.window.document, IntersectionObserver: Observer });
  t.after(() => { delete globalThis.window; delete globalThis.document; delete globalThis.IntersectionObserver; });
  dom.window.IntersectionObserver = Observer;
  let hidden = false;
  Object.defineProperty(dom.window.document, "hidden", { get: () => hidden });
  const root = dom.window.document.querySelector("[data-author-visibility-demo]");
  const cleanup = observeAuthorVisibility(root);
  assert.equal(root.querySelector("[data-visibility-note]").hidden, false);
  const intersect = (ratio) => onIntersection([{ isIntersecting: ratio > 0, intersectionRatio: ratio }]);

  intersect(0.49);
  t.mock.timers.tick(1500);
  assert.equal(root.hasAttribute("data-seen"), false);
  intersect(0.5);
  t.mock.timers.tick(600);
  intersect(0.2);
  t.mock.timers.tick(1000);
  assert.equal(root.hasAttribute("data-seen"), false);

  intersect(0.8);
  t.mock.timers.tick(600);
  hidden = true;
  dom.window.document.dispatchEvent(new dom.window.Event("visibilitychange"));
  t.mock.timers.tick(1500);
  assert.equal(root.hasAttribute("data-seen"), false);
  hidden = false;
  dom.window.document.dispatchEvent(new dom.window.Event("visibilitychange"));
  t.mock.timers.tick(999);
  assert.equal(root.hasAttribute("data-seen"), false);
  t.mock.timers.tick(1);
  assert.equal(root.hasAttribute("data-seen"), true);
  assert.equal(root.querySelector("[data-visibility-status]").textContent, complete);
  assert.equal(disconnected, true);
  cleanup();
  dom.window.close();
});
}

test("leaving the article cancels a pending visibility marker", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const dom = new JSDOM('<div><aside class="author-bio"></aside><p data-visibility-note hidden><span data-visibility-status data-visibility-complete="Complete">Waiting</span></p></div>');
  let callback;
  class Observer {
    constructor(cb) { callback = cb; }
    observe() {}
    disconnect() {}
  }
  Object.assign(globalThis, { window: dom.window, document: dom.window.document, IntersectionObserver: Observer });
  t.after(() => { delete globalThis.window; delete globalThis.document; delete globalThis.IntersectionObserver; });
  dom.window.IntersectionObserver = Observer;
  Object.defineProperty(dom.window.document, "hidden", { value: false });
  const root = dom.window.document.querySelector("div");
  const cleanup = observeAuthorVisibility(root);
  callback([{ isIntersecting: true, intersectionRatio: 1 }]);
  cleanup();
  t.mock.timers.tick(1500);
  assert.equal(root.hasAttribute("data-seen"), false);
  assert.equal(typeof observeAuthorVisibility(null), "function");
  dom.window.close();
});
