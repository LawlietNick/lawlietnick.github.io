import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const guide = await readFile(new URL("../src/pages/templates/cookiebot-guide.md", import.meta.url), "utf8");

const codeBlockAfter = (heading) => {
  const start = guide.indexOf(heading);
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

test("shared Microsoft options feed the recommended generator", () => {
  const start = guide.indexOf("Recommended: start with denied defaults");
  const end = guide.indexOf("</section>", start);
  const section = guide.slice(start, end);

  assert.match(guide, /id="consent-default-include-uet"/);
  assert.match(guide, /id="consent-default-include-clarity"/);
  assert.match(section, /window\.uetq\.push\('consent', 'default'/);
  assert.match(section, /window\.clarity\('consentv2'/);
  assert.match(section, /ad_Storage: 'denied'/);
  assert.match(section, /analytics_Storage: 'denied'/);
});

test("stored-consent bootstrap restores explicit choices and updates Microsoft queues", () => {
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

test("stored-consent bootstrap fails closed for stale consent", () => {
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

test("stored-consent bootstrap can exclude both Microsoft integrations", () => {
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

test("console helper can run repeatedly in the same page context", () => {
  const logs = [];
  const context = {
    console: { log: (...args) => logs.push(args) },
    window: {},
  };
  const helper = codeBlockAfter("Step 5 - Validate consent and tag behavior");

  vm.runInNewContext(helper, context);
  vm.runInNewContext(helper, context);

  assert.equal(logs.filter(([message]) => message === "No Consent Mode data found").length, 2);
  assert.equal(logs.filter(([message]) => message === "No UET data found").length, 2);
  assert.equal(logs.filter(([message]) => message === "No Clarity data found").length, 2);
});
