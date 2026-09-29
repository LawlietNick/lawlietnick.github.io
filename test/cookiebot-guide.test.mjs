import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import { JSDOM } from "jsdom";

for (const [language, path] of [
  ["en", "../src/pages/templates/cookiebot-guide.md"],
  ["fi", "../src/pages/fi/toteutusmallit/cookiebot-opas.md"],
]) {
const guide = await readFile(new URL(path, import.meta.url), "utf8");
const headings = language === "fi" ? {
  "Recommended: start with denied defaults": "Suositus: aloita denied-oletustiloista",
  "Advanced: restore saved Cookiebot choices": "Edistynyt toteutus: palauta tallennetut Cookiebot-valinnat",
  "Step 5 - Validate consent and tag behavior": "Vaihe 5 – Tarkista suostumustilat ja tagien toiminta",
} : {};
const localized = (heading) => headings[heading] || heading;

const codeBlockAfter = (heading) => {
  const start = guide.indexOf(localized(heading));
  assert.notEqual(start, -1, `Missing heading: ${heading}`);
  const match = guide.slice(start).match(/```(?:html|js)\n([\s\S]*?)\n```/);
  assert.ok(match, `Missing code block after: ${heading}`);
  return match[1];
};

const inlineScript = (html) => {
  const match = html.match(/<script[^>]*>([\s\S]*?)<\/script>/);
  assert.ok(match, "Missing inline script");
  return match[1];
};

test(`${language}: shared Microsoft options feed the recommended generator`, () => {
  const start = guide.indexOf(localized("Recommended: start with denied defaults"));
  const end = guide.indexOf("</section>", start);
  const section = guide.slice(start, end);

  assert.match(guide, /id="consent-default-include-uet"/);
  assert.match(guide, /id="consent-default-include-clarity"/);
  assert.match(section, /window\.uetq\.push\('consent', 'default'/);
  assert.match(section, /window\.clarity\('consentv2'/);
  assert.match(section, /ad_Storage: 'denied'/);
  assert.match(section, /analytics_Storage: 'denied'/);
});

test(`${language}: stored-consent bootstrap restores explicit choices and updates Microsoft queues`, () => {
  const listeners = new Map();
  const timestamp = Date.now();
  const context = {
    document: {
      cookie: `CookieConsent=${encodeURIComponent(`{stamp:'test',necessary:true,preferences:false,statistics:true,marketing:false,method:'explicit',ver:1,utc:${timestamp}}`)}`,
    },
    window: {
      addEventListener(name, listener) {
        listeners.set(name, listener);
      },
    },
  };
  context.window.window = context.window;
  context.window.document = context.document;

  vm.runInNewContext(inlineScript(codeBlockAfter("Advanced: restore saved Cookiebot choices")), context);

  const googleDefault = Array.from(context.window.dataLayer[0]);
  assert.equal(googleDefault[0], "consent");
  assert.equal(googleDefault[1], "default");
  assert.equal(googleDefault[2].analytics_storage, "granted");
  assert.equal(googleDefault[2].ad_storage, "denied");
  assert.equal(context.window.uetq[0], "consent");
  assert.equal(context.window.uetq[1], "default");
  assert.equal(context.window.uetq[2].ad_storage, "denied");

  context.window.Cookiebot = { consent: { marketing: true, statistics: true } };
  listeners.get("CookiebotOnConsentReady")();
  assert.equal(context.window.uetq.at(-3), "consent");
  assert.equal(context.window.uetq.at(-2), "update");
  assert.equal(context.window.uetq.at(-1).ad_storage, "granted");
  const clarityUpdate = Array.from(context.window.clarity.q.at(-1));
  assert.equal(clarityUpdate[0], "consentv2");
  assert.equal(clarityUpdate[1].ad_Storage, "granted");
  assert.equal(clarityUpdate[1].analytics_Storage, "granted");
});

test(`${language}: stored-consent bootstrap fails closed for stale consent`, () => {
  const context = {
    document: {
      cookie: `CookieConsent=${encodeURIComponent("{stamp:'test',necessary:true,preferences:true,statistics:true,marketing:true,method:'explicit',ver:1,utc:1}")}`,
    },
    window: { addEventListener() {} },
  };
  context.window.window = context.window;
  context.window.document = context.document;

  vm.runInNewContext(inlineScript(codeBlockAfter("Advanced: restore saved Cookiebot choices")), context);

  const state = Array.from(context.window.dataLayer[0])[2];
  assert.equal(state.ad_storage, "denied");
  assert.equal(state.analytics_storage, "denied");
  assert.equal(state.wait_for_update, 1500);
});

test(`${language}: stored-consent bootstrap can exclude both Microsoft integrations`, () => {
  const listeners = new Map();
  const context = {
    document: { cookie: "" },
    window: {
      addEventListener(name, listener) {
        listeners.set(name, listener);
      },
    },
  };
  context.window.window = context.window;
  context.window.document = context.document;

  const script = inlineScript(codeBlockAfter("Advanced: restore saved Cookiebot choices"))
    .replace("includeMicrosoftUet: true", "includeMicrosoftUet: false")
    .replace("includeMicrosoftClarity: true", "includeMicrosoftClarity: false");

  vm.runInNewContext(script, context);

  assert.ok(context.window.dataLayer);
  assert.equal(context.window.uetq, undefined);
  assert.equal(context.window.clarity, undefined);

  context.window.Cookiebot = { consent: { marketing: true, statistics: true } };
  listeners.get("CookiebotOnConsentReady")();
  assert.equal(context.window.uetq, undefined);
  assert.equal(context.window.clarity, undefined);
});

test(`${language}: console helper can run repeatedly in the same page context`, () => {
  const logs = [];
  const context = {
    console: { log: (...args) => logs.push(args) },
    window: {},
  };
  const helper = codeBlockAfter("Step 5 - Validate consent and tag behavior");

  vm.runInNewContext(helper, context);
  vm.runInNewContext(helper, context);

  assert.equal(logs.filter(([message]) => message === (language === "fi" ? "Consent Mode -tietoja ei löytynyt" : "No Consent Mode data found")).length, 2);
  assert.equal(logs.filter(([message]) => message === (language === "fi" ? "UET-tietoja ei löytynyt" : "No UET data found")).length, 2);
  assert.equal(logs.filter(([message]) => message === (language === "fi" ? "Clarity-tietoja ei löytynyt" : "No Clarity data found")).length, 2);
});

test(`${language}: generators respond to service choices, valid IDs and language settings`, () => {
  const html = guide.replace(/```(?:html|js)\n([\s\S]*?)\n```/g, (_, code) =>
    `<pre><code>${code.replaceAll("&", "&amp;").replaceAll("<", "&lt;")}</code></pre>`);
  const dom = new JSDOM(html, { runScripts: "outside-only" });
  const { document, Event } = dom.window;
  try {
    for (const script of document.querySelectorAll("script[data-astro-rerun]")) {
      dom.window.eval(script.textContent);
    }
    const uet = document.getElementById("consent-default-include-uet");
    const clarity = document.getElementById("consent-default-include-clarity");
    for (const useUet of [false, true]) {
      for (const useClarity of [false, true]) {
        uet.checked = useUet;
        clarity.checked = useClarity;
        uet.dispatchEvent(new Event("change"));
        clarity.dispatchEvent(new Event("change"));
        const output = document.getElementById("consent-default-script-output").textContent;
        const context = { window: {} };
        vm.runInNewContext(inlineScript(output), context);
        assert.ok(context.window.dataLayer);
        assert.equal(Boolean(context.window.uetq), useUet);
        assert.equal(Boolean(context.window.clarity), useClarity);
        const stored = document.querySelector("#cookiebot-stored-consent-script code").textContent;
        assert.ok(stored.includes(`includeMicrosoftUet: ${useUet}`));
        assert.ok(stored.includes(`includeMicrosoftClarity: ${useClarity}`));
      }
    }
    const cbid = document.getElementById("cookiebot-cbid");
    cbid.value = "invalid";
    cbid.dispatchEvent(new Event("input"));
    assert.equal(cbid.getAttribute("aria-invalid"), "true");
    assert.equal(document.getElementById("cookiebot-cbid-error").hidden, false);
    cbid.value = "12345678-90ab-cdef-1234-567890abcdef";
    cbid.dispatchEvent(new Event("input"));
    assert.equal(cbid.hasAttribute("aria-invalid"), false);
    const declaration = document.getElementById("cookiebot-declaration-output").textContent;
    assert.ok(declaration.includes(cbid.value));
    assert.ok(declaration.includes("async"));
    assert.ok(declaration.includes(`data-culture="${language.toUpperCase()}"`));
    const mode = document.getElementById("cookiebot-blocking-mode");
    mode.value = "manual";
    mode.dispatchEvent(new Event("input"));
    assert.ok(document.getElementById("cookiebot-script-output").textContent.includes("async"));
  } finally {
    dom.window.close();
  }
});

}
