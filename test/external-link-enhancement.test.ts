import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

test("external icons survive navigation and dynamic link updates without duplication", async () => {
  const dom = new JSDOM('<a href="https://example.org">Source</a><a class="cta" href="https://example.org"><span class="cta__surface">Visit</span></a><a href="/about/">About</a><section class="ask-ai"><a href="https://chatgpt.com"><svg aria-hidden="true"></svg>ChatGPT</a></section>', { url: "http://localhost:4321/" });
  const { window } = dom;
  Object.assign(globalThis, {
    document: window.document,
    Element: window.Element,
    HTMLAnchorElement: window.HTMLAnchorElement,
    MutationObserver: window.MutationObserver,
  });
  await import("../src/scripts/external-links.ts");
  const document = window.document;
  const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

  const social = document.createElement("div");
  social.className = "site-footer__social";
  social.innerHTML = '<a href="https://linkedin.com">LinkedIn</a>';
  document.body.append(social);
  await tick();
  assert.equal(social.querySelectorAll(".external-link-icon").length, 0);

  const employer = document.createElement("a");
  employer.className = "about-employer";
  employer.href = "https://agencybobble.com/";
  employer.innerHTML = 'Agency Bobble<span class="about-employer__arrow" aria-hidden="true">↗</span>';
  document.body.append(employer);
  await tick();
  assert.equal(employer.querySelectorAll(".external-link-icon").length, 0);
  assert.equal(employer.querySelectorAll(".about-employer__arrow").length, 1);

  assert.equal(document.querySelectorAll(".external-link-icon").length, 1);
  assert.equal(document.querySelectorAll(".cta .external-link-icon").length, 0);
  assert.equal(document.querySelector(".external-link-icon")?.getAttribute("aria-hidden"), "true");
  assert.equal(document.querySelectorAll(".ask-ai .external-link-icon").length, 0);

  assert.equal(social.querySelectorAll(".external-link-icon").length, 0);
  assert.equal(document.querySelectorAll(".ask-ai svg").length, 1);

  document.dispatchEvent(new window.Event("astro:page-load"));
  assert.equal(document.querySelectorAll(".external-link-icon").length, 1);
  assert.equal(employer.querySelectorAll(".external-link-icon").length, 0);
  assert.equal(document.querySelectorAll(".cta .external-link-icon").length, 0);
  assert.equal(document.querySelectorAll(".ask-ai .external-link-icon").length, 0);

  const source = document.querySelector("a")!;
  source.textContent = "Updated source";
  await tick();
  assert.equal(source.querySelectorAll(".external-link-icon").length, 1);
  source.href = "/about/";
  await tick();
  assert.equal(source.querySelectorAll(".external-link-icon").length, 0);

  document.body.innerHTML = '<a href="//example.org">New page</a><a href="https://karppinen.one/about/">About</a>';
  document.dispatchEvent(new window.Event("astro:page-load"));
  await tick();
  assert.equal(document.querySelectorAll(".external-link-icon").length, 1);
  dom.window.close();
});
