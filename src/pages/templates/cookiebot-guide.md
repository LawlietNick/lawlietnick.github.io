---
layout: ../../layouts/Base.astro
title: "Cookiebot guide"
description: "Step-by-step Cookiebot and Google Consent Mode setup: install the script, configure consent defaults, and validate that tags fire correctly."
date: 2025-08-07
updatedDate: 2026-09-22
category: templates
order: 1
icon: "🍪"
summary: "Copy-ready Cookiebot and Google Consent Mode setup with configurable defaults, implementation code and validation steps."
tags: ["Cookiebot", "Consent Mode", "GDPR", "cookie consent"]
image: /images/blog/cookiebot-guide.jpeg
imageAlt: "Cartoon turtle with glasses standing beside a browser window showing the Cookiebot logo and a cookie shield"
imageCredit: "Generated with OpenAI ImageGen"
alternate:
  lang: fi
  href: /fi/toteutusmallit/cookiebot-opas/
about:
  - "Cookie consent"
  - "Google Consent Mode"
mentions:
  - "Cookiebot"
  - "GDPR"
  - "Google Tag Assistant"
  - "Microsoft UET"
citations:
  - name: "Consent mode: Basic vs Advanced"
    url: "https://developers.google.com/tag-platform/security/concepts/consent-mode#basic_vs_advanced_consent_mode"
  - name: "Consent debugging with Tag Assistant"
    url: "https://developers.google.com/tag-platform/security/guides/consent-debugging"
  - name: "Cookiebot: Automatic cookie blocking"
    url: "https://support.cookiebot.com/hc/en-us/articles/360009074960-Automatic-cookie-blocking"
  - name: "Cookiebot: Manual cookie blocking"
    url: "https://support.cookiebot.com/hc/en-us/articles/4405978132242-Manual-cookie-blocking"
  - name: "Cookiebot: Setting up Microsoft UET for Consent Mode"
    url: "https://support.cookiebot.com/hc/en-us/articles/12452886794908-Setting-up-Microsoft-Universal-Event-Tracking-for-Consent-Mode"
---

This guide takes a direct Cookiebot website implementation from adding the scripts to browser validation. Site owners can use the implementation notes, marketing and analytics specialists can use the expected consent states, and developers can copy and adapt the generated code.

## Before you start

This guide covers **direct website implementation**: you add the consent defaults and Cookiebot tag directly to the website's `<head>`. You need a Cookiebot Domain Group ID and access to the website source or a CMS feature that can insert scripts into `<head>`.

Do not combine these scripts with a Cookiebot CMP template in Google Tag Manager or another integration that already controls consent defaults and updates. Audit or remove the existing implementation before continuing, because two integrations controlling the same consent state can conflict.

This is an implementation guide, not a legal determination. The categories, regional behavior, retention period and banner wording still need to match the site's policy and applicable requirements.

## Step 1 - Choose how consent defaults are set

Both snippets below always set the defaults for Google Consent Mode v2. If the website uses Microsoft Advertising or Clarity, the same snippets can also set Microsoft UET and Microsoft Clarity Consent API v2 defaults. Microsoft Advertising enforces consent signals in the EEA, the UK and Switzerland, and UET assumes `granted` when no default is set, so an included UET integration needs the denied default.

Basic and Advanced Consent Mode describe **when a tag loads**, not which default snippet you copy. With Basic Consent Mode, the tag stays blocked until the relevant consent is granted. With Advanced Consent Mode, the tag loads with denied defaults and sends limited cookieless measurements. This guide uses **Basic mode for Microsoft UET**. Your Google tags can use either mode, depending on their loading rules. See Google's [Basic versus Advanced comparison](https://developers.google.com/tag-platform/security/concepts/consent-mode#basic_vs_advanced_consent_mode) and the [Cookiebot UET article](https://support.cookiebot.com/hc/en-us/articles/12452886794908-Setting-up-Microsoft-Universal-Event-Tracking-for-Consent-Mode).

UET reads `ad_storage` only. **Microsoft Clarity** is a separate product with its own Consent API v2 and reads both `ad_Storage` (marketing) and `analytics_Storage` (statistics). When selected, the snippets initialize these values before the relevant Microsoft tag loads. Since 31 October 2025 both UET and Clarity enforce consent signals for EEA, UK and Swiss traffic.

<fieldset class="consent-default-picker">
  <legend>Choose the default-state script</legend>
  <p>Should the page restore a returning visitor's saved Cookiebot choices before Cookiebot itself loads?</p>
  <label class="form-choice" for="consent-default-no">
    <input
      id="consent-default-no"
      name="consent-default-mode"
      type="radio"
      value="denied"
      aria-controls="consent-default-denied"
      checked
    >
    <span><strong>No — recommended for most sites.</strong> Start denied and let Cookiebot update the state.</span>
  </label>
  <label class="form-choice" for="consent-default-yes">
    <input
      id="consent-default-yes"
      name="consent-default-mode"
      type="radio"
      value="stored"
      aria-controls="consent-default-stored"
    >
    <span><strong>Yes — advanced.</strong> Read and validate the saved CookieConsent cookie first.</span>
  </label>
</fieldset>

<fieldset class="consent-service-picker">
  <legend>Include Microsoft consent handling</legend>
  <p>Google Consent Mode is always included. These selections apply to whichever default-state script you choose.</p>
  <label class="form-choice" for="consent-default-include-uet">
    <input id="consent-default-include-uet" type="checkbox" checked>
    <span>Include Microsoft Advertising UET consent handling</span>
  </label>
  <label class="form-choice" for="consent-default-include-clarity">
    <input id="consent-default-include-clarity" type="checkbox" checked>
    <span>Include Microsoft Clarity consent handling</span>
  </label>
</fieldset>

<section id="consent-default-stored" hidden>

<h3>Advanced: restore saved Cookiebot choices</h3>

Use this version only when returning visitors' early page events justify the extra code and your team can maintain it. It always bootstraps Google Consent Mode v2. The Microsoft selections above add UET Consent Mode and Clarity Consent V2 using the same Cookiebot categories.

Place the code as high in the **\<head\>** as possible. In WordPress, load it before the `wp_head` hook.

This version fails closed: by default it accepts only explicit consent, rejects consent older than 366 days and ignores ambiguous or conflicting duplicate `CookieConsent` cookies. If stored consent cannot be verified, all non-essential signals remain denied while Cookiebot is given time to send its current update.

Set the Consent Mode default from one source only. Remove any earlier implementation that already sets consent defaults or updates before using this bootstrap.

<div class="code-accordion" data-code-accordion>
<div class="code-accordion__content" id="cookiebot-stored-consent-script" data-code-accordion-content>

```html
<!--
  Consent bootstrap for Cookiebot.

  Supports:
  - Google Consent Mode v2
  - Microsoft UET Consent Mode
  - Microsoft Clarity Consent V2

  PLACEMENT:
  Inline in <head> BEFORE:
  1. Cookiebot
  2. Google Tag Manager
  3. gtag.js
  4. Microsoft UET
  5. Microsoft Clarity

  No async.
  No defer.
  Do not place in an external file.

  PURPOSE:
  - Immediately restores a returning visitor's previous Cookiebot consent.
  - Allows early events to use the visitor's stored consent state.
  - If stored consent cannot be verified reliably, all non-essential
    signals remain denied.
  - Cookiebot remains the source of truth and later updates the state.
  - The same Cookiebot categories are used consistently for Google,
    Microsoft UET and Microsoft Clarity.

  MAPPING:

  Cookiebot marketing
  → Google ad_storage
  → Google ad_user_data
  → Google ad_personalization
  → Microsoft UET ad_storage
  → Microsoft Clarity ad_Storage

  Cookiebot statistics
  → Google analytics_storage
  → Microsoft Clarity analytics_Storage

  Cookiebot preferences
  → Google functionality_storage
  → Google personalization_storage

  NOTE:
  Consent Mode default should only be set from one source.
  Remove any earlier implementation that already controls the
  consent default or updates before using this script.
-->
<script type="text/javascript" data-cookieconsent="ignore">
(function (window, document) {
  'use strict';


  /*
   * =========================================================
   * CONFIGURATION
   * =========================================================
   */

  var CONFIG = {

    /*
     * Name of the consent cookie stored by Cookiebot.
     */
    cookieName: 'CookieConsent',

    /*
     * How long Google tags may wait for Cookiebot when no
     * previous valid consent can be found.
     *
     * 0 = no waiting period.
     */
    waitForUpdate: 1500,

    /*
     * Maximum permitted age of stored consent in days.
     *
     * 0 = disable the age check.
     */
    maxConsentAgeDays: 366,

    /*
     * Accept explicit consent only during bootstrap.
     *
     * Normally true in an EEA/GDPR implementation.
     */
    requireExplicit: true,

    /*
     * Google Consent Mode settings.
     */
    adsDataRedaction: true,
    urlPassthrough: false,

    /*
     * Optional Microsoft consent integrations.
     */
    includeMicrosoftUet: true,
    includeMicrosoftClarity: true,

    /*
     * Enable only if the site uses IAB TCF.
     */
    enableTcfSupport: false,

    /*
     * Debug mode.
     *
     * true = pushes consent_bootstrap and consent_microsoft_update
     * events to the dataLayer.
     */
    debug: false,

    /*
     * Cookiebot categories → Google Consent Mode signals.
     */
    mapping: {

      marketing: [
        'ad_storage',
        'ad_user_data',
        'ad_personalization'
      ],

      statistics: [
        'analytics_storage'
      ],

      preferences: [
        'functionality_storage',
        'personalization_storage'
      ]
    }
  };


  /*
   * =========================================================
   * COOKIEBOT FIELDS USED BY THIS SCRIPT
   * =========================================================
   *
   * Fields outside this list are ignored while parsing.
   * ver and stamp are listed so that a duplicated one is
   * still treated as an ambiguous cookie.
   */

  var ALLOWED_FIELDS = {
    necessary: true,
    preferences: true,
    statistics: true,
    marketing: true,
    method: true,
    utc: true,
    ver: true,
    stamp: true
  };


  /*
   * =========================================================
   * DATALAYER + GTAG
   * =========================================================
   */

  if (
    !window.dataLayer ||
    typeof window.dataLayer.push !== 'function'
  ) {
    window.dataLayer = [];
  }

  function gtag() {
    window.dataLayer.push(arguments);
  }


  /*
   * =========================================================
   * MICROSOFT CLARITY QUEUE
   * =========================================================
   *
   * Allows Clarity Consent V2 commands to be queued before
   * the Clarity script itself has loaded.
   *
   * Defined before the duplicate execution guard, because the
   * queue must exist even when this script runs twice.
   */

  if (CONFIG.includeMicrosoftClarity) {
    window.clarity = window.clarity || function () {
      window.clarity.q =
        window.clarity.q || [];

      window.clarity.q.push(arguments);
    };
  }


  /*
   * =========================================================
   * DUPLICATE EXECUTION GUARD
   * =========================================================
   */

  if (window.__cmBootstrapDone) {
    return;
  }


  /*
   * =========================================================
   * DEFAULT STATE
   * =========================================================
   *
   * All managed non-essential signals start as denied.
   *
   * Verified consent may only promote a signal
   * from denied → granted.
   */

  function createDeniedState() {
    return {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted'
    };
  }


  var consent = null;
  var state = createDeniedState();


  /*
   * =========================================================
   * READ STORED COOKIEBOT CONSENT
   * =========================================================
   *
   * Any error while processing the cookie must result in
   * the safe denied state.
   */

  try {

    if (CONFIG.enableTcfSupport) {
      window.gtag_enable_tcf_support = true;
    }

    consent =
      readStoredConsent();


    if (consent) {

      /*
       * Only verified true categories may promote
       * a signal to granted.
       */

      for (var category in CONFIG.mapping) {

        if (
          !Object.prototype.hasOwnProperty.call(
            CONFIG.mapping,
            category
          )
        ) {
          continue;
        }

        if (
          consent[category] !== true
        ) {
          continue;
        }


        var signals =
          CONFIG.mapping[category];


        for (
          var i = 0;
          i < signals.length;
          i++
        ) {
          state[signals[i]] =
            'granted';
        }
      }

    } else if (
      CONFIG.waitForUpdate > 0
    ) {

      /*
       * No previous verified consent was found.
       *
       * Keep non-essential signals denied and allow
       * Cookiebot time to send its update.
       */

      state.wait_for_update =
        CONFIG.waitForUpdate;
    }

  } catch (error) {

    /*
     * Final failsafe.
     */

    consent = null;
    state = createDeniedState();

    if (
      CONFIG.waitForUpdate > 0
    ) {
      state.wait_for_update =
        CONFIG.waitForUpdate;
    }
  }


  /*
   * =========================================================
   * GOOGLE CONSENT MODE
   * =========================================================
   */

  gtag(
    'consent',
    'default',
    state
  );


  /*
   * The default command has now definitely been pushed.
   * Mark the bootstrap as complete immediately, so that a
   * second execution can never send a second default, even
   * if something below this line fails.
   */

  window.__cmBootstrapDone = true;


  gtag(
    'set',
    'ads_data_redaction',
    CONFIG.adsDataRedaction
  );


  gtag(
    'set',
    'url_passthrough',
    CONFIG.urlPassthrough
  );


  /*
   * =========================================================
   * MICROSOFT UET CONSENT MODE
   * =========================================================
   *
   * UET uses ad_storage only.
   *
   * Without an explicit default UET assumes granted, so the
   * default is sent as denied whenever UET is included.
   *
   * The sent values are tracked in local variables because the
   * UET runtime exposes the current state, not the original
   * default. They are reported through the debug dataLayer
   * events, never on window, so that nothing else on the page
   * can overwrite them.
   */

  var uetConsentDefault = null;
  var uetConsentUpdate = null;


  if (CONFIG.includeMicrosoftUet) {
    window.uetq =
      window.uetq || [];


    uetConsentDefault = 'denied';


    window.uetq.push(
      'consent',
      'default',
      {
        ad_storage: uetConsentDefault
      }
    );
  }


  /*
   * Returning visitor with verified stored consent.
   */

  if (
    CONFIG.includeMicrosoftUet &&
    consent
  ) {

    uetConsentUpdate =
      state.ad_storage;


    window.uetq.push(
      'consent',
      'update',
      {
        ad_storage: uetConsentUpdate
      }
    );
  }


  /*
   * =========================================================
   * MICROSOFT CLARITY CONSENT V2
   * =========================================================
   */

  var lastClarityAdStorage = null;
  var lastClarityAnalyticsStorage = null;


  function setClarityConsent(
    adStorage,
    analyticsStorage
  ) {

    if (!CONFIG.includeMicrosoftClarity) {
      return;
    }

    /*
     * Avoid sending the exact same state repeatedly.
     */

    if (
      adStorage ===
        lastClarityAdStorage &&
      analyticsStorage ===
        lastClarityAnalyticsStorage
    ) {
      return;
    }


    window.clarity(
      'consentv2',
      {
        ad_Storage:
          adStorage,

        analytics_Storage:
          analyticsStorage
      }
    );


    lastClarityAdStorage =
      adStorage;

    lastClarityAnalyticsStorage =
      analyticsStorage;
  }


  setClarityConsent(
    state.ad_storage,
    state.analytics_storage
  );


  /*
   * =========================================================
   * COOKIEBOT LIVE UPDATE
   * =========================================================
   *
   * Keeps Microsoft UET and Clarity synchronized with the
   * current Cookiebot consent state, including later changes
   * made by the visitor.
   *
   * Google is deliberately NOT updated here. Cookiebot sends
   * the gtag consent update itself, and adding one here would
   * send it twice.
   *
   * Cookiebot also passes consent to UET and Clarity on its
   * own, so these pushes are normally a harmless duplicate of
   * the same value. They become the only source when the
   * Cookiebot script is loaded with data-ms-consent-mode or
   * data-ms-clarity-consent-mode set to disabled.
   */

  window.addEventListener(
    'CookiebotOnConsentReady',
    function () {

      if (
        typeof window.Cookiebot ===
          'undefined' ||
        !window.Cookiebot.consent
      ) {
        return;
      }


      var marketingState =
        window.Cookiebot.consent.marketing
          ? 'granted'
          : 'denied';


      var statisticsState =
        window.Cookiebot.consent.statistics
          ? 'granted'
          : 'denied';


      /*
       * Microsoft UET
       */

      if (
        CONFIG.includeMicrosoftUet &&
        uetConsentUpdate !==
          marketingState
      ) {

        uetConsentUpdate =
          marketingState;


        window.uetq.push(
          'consent',
          'update',
          {
            ad_storage:
              marketingState
          }
        );
      }


      /*
       * Microsoft Clarity
       */

      setClarityConsent(
        marketingState,
        statisticsState
      );


      if (CONFIG.debug) {

        window.dataLayer.push({
          event:
            'consent_microsoft_update',

          microsoft_uet_ad_storage:
            CONFIG.includeMicrosoftUet
              ? marketingState
              : null,

          clarity_ad_storage:
            CONFIG.includeMicrosoftClarity
              ? marketingState
              : null,

          clarity_analytics_storage:
            CONFIG.includeMicrosoftClarity
              ? statisticsState
              : null
        });
      }
    },
    false
  );


  /*
   * =========================================================
   * DEBUG
   * =========================================================
   */

  if (CONFIG.debug) {

    window.dataLayer.push({

      event:
        'consent_bootstrap',

      consent_bootstrap_source:
        consent
          ? 'stored_cookie'
          : 'default_denied',

      consent_bootstrap_preferences:
        consent
          ? consent.preferences
          : false,

      consent_bootstrap_statistics:
        consent
          ? consent.statistics
          : false,

      consent_bootstrap_marketing:
        consent
          ? consent.marketing
          : false,

      google_ad_storage:
        state.ad_storage,

      google_analytics_storage:
        state.analytics_storage,

      microsoft_uet_default:
        uetConsentDefault,

      microsoft_uet_update:
        uetConsentUpdate,

      clarity_ad_storage:
        CONFIG.includeMicrosoftClarity
          ? state.ad_storage
          : null,

      clarity_analytics_storage:
        CONFIG.includeMicrosoftClarity
          ? state.analytics_storage
          : null
    });
  }


  /*
   * =========================================================
   * COOKIE FUNCTIONS
   * =========================================================
   */

  /*
   * Reads and verifies the stored Cookiebot consent.
   *
   * Returns null whenever the state cannot be trusted:
   * no cookie, an unparseable copy, or two CookieConsent
   * cookies that disagree.
   */

  function readStoredConsent() {

    var values =
      findCookieValues(
        CONFIG.cookieName
      );


    if (!values.length) {
      return null;
    }


    var accepted = null;


    for (
      var i = 0;
      i < values.length;
      i++
    ) {

      var parsed =
        parseConsent(
          values[i]
        );


      if (!parsed) {
        return null;
      }


      if (
        accepted &&
        !isSameConsent(
          accepted,
          parsed
        )
      ) {
        return null;
      }


      accepted = parsed;
    }


    return accepted;
  }


  function findCookieValues(name) {

    var values = [];
    var raw;


    try {
      raw =
        document.cookie;
    } catch (error) {
      return values;
    }


    if (!raw) {
      return values;
    }


    var parts =
      raw.split(';');


    for (
      var i = 0;
      i < parts.length;
      i++
    ) {

      var part =
        trim(
          parts[i]
        );


      var separator =
        part.indexOf('=');


      if (
        separator === -1
      ) {
        continue;
      }


      var cookieName =
        part.slice(
          0,
          separator
        );


      if (
        cookieName !== name
      ) {
        continue;
      }


      var value =
        part.slice(
          separator + 1
        );


      if (value) {
        values.push(value);
      }
    }


    return values;
  }


  /*
   * Validates one CookieConsent value.
   *
   * Every optional category must be an explicit boolean,
   * necessary must be true, and the consent must be recent
   * enough. With requireExplicit, implied consent is rejected.
   */

  function parseConsent(
    rawValue
  ) {

    var decoded;


    try {

      decoded =
        decodeURIComponent(
          rawValue
        );

    } catch (error) {

      /*
       * Cookie may already be decoded.
       */

      decoded =
        rawValue;
    }


    var fields =
      readFields(
        decoded
      );


    if (!fields) {
      return null;
    }


    if (
      fields.necessary !==
        'true'
    ) {
      return null;
    }


    if (
      !isBoolean(
        fields.preferences
      )
    ) {
      return null;
    }


    if (
      !isBoolean(
        fields.statistics
      )
    ) {
      return null;
    }


    if (
      !isBoolean(
        fields.marketing
      )
    ) {
      return null;
    }


    if (
      CONFIG.requireExplicit
    ) {

      if (
        !fields.method ||
        String(
          fields.method
        ).toLowerCase() !==
          'explicit'
      ) {
        return null;
      }
    }


    if (
      !isRecent(
        fields.utc
      )
    ) {
      return null;
    }


    return {

      preferences:
        fields.preferences ===
          'true',

      statistics:
        fields.statistics ===
          'true',

      marketing:
        fields.marketing ===
          'true'
    };
  }


  /*
   * Reads the Cookiebot cookie fields.
   *
   * Supports for example:
   *
   * necessary:true
   * method:'explicit'
   * method:"explicit"
   * utc:1683027386232
   *
   * A known key appearing twice makes the structure
   * ambiguous, so the whole cookie is rejected.
   */

  function readFields(text) {

    var fields = {};


    var pattern =
      /([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(?:'([^']*)'|"([^"]*)"|([^,}\]]*))/g;


    var match;


    while (
      (match =
        pattern.exec(text)) !==
        null
    ) {

      var key =
        String(
          match[1]
        ).toLowerCase();


      if (
        !Object.prototype.hasOwnProperty.call(
          ALLOWED_FIELDS,
          key
        )
      ) {
        continue;
      }


      if (
        Object.prototype.hasOwnProperty.call(
          fields,
          key
        )
      ) {
        return null;
      }


      var value;


      if (
        match[2] !==
          undefined
      ) {

        value =
          match[2];

      } else if (
        match[3] !==
          undefined
      ) {

        value =
          match[3];

      } else {

        value =
          match[4] || '';
      }


      fields[key] =
        trim(value);
    }


    return fields;
  }


  function isBoolean(value) {

    return (
      value === 'true' ||
      value === 'false'
    );
  }


  /*
   * Checks the consent age.
   *
   * Cookiebot normally stores utc as epoch milliseconds.
   * A value that looks like epoch seconds is normalized,
   * and consent dated in the future is rejected.
   */

  function isRecent(value) {

    if (
      CONFIG.maxConsentAgeDays <=
        0
    ) {
      return true;
    }


    if (!value) {
      return false;
    }


    var timestamp;


    if (
      /^\d+$/.test(value)
    ) {

      timestamp =
        Number(value);


      if (
        !isFinite(timestamp) ||
        timestamp <= 0
      ) {
        return false;
      }


      if (
        timestamp <
          100000000000
      ) {
        timestamp =
          timestamp * 1000;
      }

    } else {

      /*
       * Fallback for possible alternative formats.
       */

      timestamp =
        Date.parse(value);
    }


    if (
      !timestamp ||
      isNaN(timestamp)
    ) {
      return false;
    }


    var age =
      new Date().getTime() -
      timestamp;


    if (age < 0) {
      return false;
    }


    var maxAge =
      CONFIG.maxConsentAgeDays *
      24 *
      60 *
      60 *
      1000;


    return (
      age <= maxAge
    );
  }


  function isSameConsent(
    a,
    b
  ) {

    return (
      a.preferences ===
        b.preferences &&
      a.statistics ===
        b.statistics &&
      a.marketing ===
        b.marketing
    );
  }


  function trim(value) {

    return String(value)
      .replace(
        /^\s+|\s+$/g,
        ''
      );
  }


})(window, document);
</script>
```

</div>
<button class="code-accordion__toggle" type="button" aria-expanded="false" aria-controls="cookiebot-stored-consent-script" data-code-accordion-toggle data-collapsed-label="Show complete Consent Mode script" data-expanded-label="Hide complete Consent Mode script">Show complete Consent Mode script</button>
</div>

<script data-astro-rerun>
(() => {
  const includeUet = document.getElementById('consent-default-include-uet');
  const includeClarity = document.getElementById('consent-default-include-clarity');
  const output = document.querySelector('#cookiebot-stored-consent-script pre code');

  if (!includeUet || !includeClarity || !output) {
    return;
  }

  const source = output.textContent;

  function updateStoredConsentScript() {
    output.textContent = source
      .replace(
        'includeMicrosoftUet: true',
        `includeMicrosoftUet: ${includeUet.checked}`
      )
      .replace(
        'includeMicrosoftClarity: true',
        `includeMicrosoftClarity: ${includeClarity.checked}`
      );
  }

  [includeUet, includeClarity].forEach(function (control) {
    control.addEventListener('change', updateStoredConsentScript);
  });

  if (!includeUet.checked || !includeClarity.checked) {
    updateStoredConsentScript();
  }
})();
</script>

</section>

<section id="consent-default-denied">

<h3>Recommended: start with denied defaults</h3>

Use this version for most direct implementations. It establishes a safe state immediately and lets Cookiebot send the current consent update after it loads.

Place the code as high in the **\<head\>** as possible. In WordPress, load it before the `wp_head` hook.

For Microsoft UET with Basic Consent Mode, keep the UET tag blocked until marketing consent is granted. When included, the generated script creates `window.uetq` and sets its initial state to `denied`; Cookiebot then pushes the visitor's current marketing consent to the same queue automatically. Do not add an unconditional `granted` update here, because it would run before the visitor has made a choice.

The Clarity option queues explicit denied defaults for both Clarity storage types before Clarity loads. Keep Cookiebot's automatic integrations enabled so it can send later consent changes.

<pre
  data-copy
  class="astro-code github-dark"
  style="background-color:#24292e;color:#e1e4e8;overflow-x:auto"
  tabindex="0"
  data-language="html"
><code id="consent-default-script-output" class="language-html" aria-live="polite"></code></pre>

<script data-astro-rerun>
(() => {
  const includeUet = document.getElementById('consent-default-include-uet');
  const includeClarity = document.getElementById('consent-default-include-clarity');
  const output = document.getElementById('consent-default-script-output');

  function updateConsentDefaultScript() {
    const lines = [
      '<!-- Initial Consent Mode v2 configuration -->',
      '<script type="text/javascript" data-cookieconsent="ignore">',
      '  window.dataLayer = window.dataLayer || [];',
      '',
      '  function gtag() {',
      '    window.dataLayer.push(arguments);',
      '  }',
      '',
      "  gtag('consent', 'default', {",
      "    ad_personalization: 'denied',",
      "    ad_storage: 'denied',",
      "    ad_user_data: 'denied',",
      "    analytics_storage: 'denied',",
      "    functionality_storage: 'denied',",
      "    personalization_storage: 'denied',",
      "    security_storage: 'granted',",
      '    wait_for_update: 1500',
      '  });',
      '',
      "  gtag('set', 'ads_data_redaction', true);",
      "  gtag('set', 'url_passthrough', false);",
    ];

    if (includeUet.checked) {
      lines.push(
        '',
        '  // Microsoft UET default. Without this, UET assumes granted.',
        '  window.uetq = window.uetq || [];',
        "  window.uetq.push('consent', 'default', { ad_storage: 'denied' });"
      );
    }

    if (includeClarity.checked) {
      lines.push(
        '',
        '  // Microsoft Clarity Consent API v2 defaults.',
        '  window.clarity = window.clarity || function () {',
        '    (window.clarity.q = window.clarity.q || []).push(arguments);',
        '  };',
        "  window.clarity('consentv2', {",
        "    ad_Storage: 'denied',",
        "    analytics_Storage: 'denied'",
        '  });'
      );
    }

    lines.push(
      '',
      "  // Enable only when Cookiebot's IAB TCF integration is active.",
      '  // window.gtag_enable_tcf_support = true;',
      '<' + '/script>'
    );

    output.textContent = lines.join('\n');
  }

  [includeUet, includeClarity].forEach(function (control) {
    control.addEventListener('change', updateConsentDefaultScript);
  });

  updateConsentDefaultScript();
})();
</script>
</section>

<script data-astro-rerun>
(() => {
  const consentDefaultOptions = document.querySelectorAll(
    'input[name="consent-default-mode"]'
  );
  const storedConsentStep = document.getElementById(
    'consent-default-stored'
  );
  const deniedConsentStep = document.getElementById(
    'consent-default-denied'
  );

  function showSelectedConsentDefaultStep() {
    const selectedOption = document.querySelector(
      'input[name="consent-default-mode"]:checked'
    );
    const useStoredConsent = selectedOption?.value === 'stored';

    storedConsentStep.hidden = !useStoredConsent;
    deniedConsentStep.hidden = useStoredConsent;
  }

  consentDefaultOptions.forEach(function (option) {
    option.addEventListener(
      'change',
      showSelectedConsentDefaultStep
    );
  });
})();
</script>

## Step 2 - Add Cookiebot to the website

Place the generated Cookiebot tag as the **first script inside `<head>`**. This is especially important with automatic blocking, because anything that loads before Cookiebot can escape its control.

- **Automatic blocking** uses `data-blockingmode="auto"` and must not use `async` or `defer`.
- **Manual blocking** loads Cookiebot with `async`; you must then mark every non-essential script, iframe and image with the correct consent category. See Cookiebot's [automatic](https://support.cookiebot.com/hc/en-us/articles/360009074960-Automatic-cookie-blocking) and [manual blocking](https://support.cookiebot.com/hc/en-us/articles/4405978132242-Manual-cookie-blocking) guides.

If a WordPress plugin outputs Google Tag Manager, verify the final page source rather than the plugin settings alone. In this implementation, Cookiebot still needs to run before Google Tag Manager and any other tag that could set non-essential cookies.

<fieldset class="cookiebot-script-builder">
  <legend>Customize the Cookiebot script</legend>
  <div class="form-field">
    <label for="cookiebot-cbid">Cookiebot ID (<code>data-cbid</code>)</label>
    <input
      id="cookiebot-cbid"
      type="text"
      placeholder="00000000-0000-0000-0000-000000000000"
      pattern="[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}"
      autocomplete="off"
      spellcheck="false"
      aria-describedby="cookiebot-cbid-help cookiebot-cbid-error"
    >
    <small id="cookiebot-cbid-help">Copy the Domain Group ID from your Cookiebot Manager.</small>
    <p id="cookiebot-cbid-error" role="alert" hidden>Enter the complete Domain Group ID in UUID format.</p>
  </div>
  <div class="form-field">
    <label for="cookiebot-blocking-mode">Blocking mode</label>
    <select id="cookiebot-blocking-mode">
      <option value="auto" selected>Automatic blocking</option>
      <option value="manual">Manual blocking</option>
    </select>
  </div>
  <div class="form-field">
    <label for="cookiebot-culture">Banner language (<code>data-culture</code>)</label>
    <select id="cookiebot-culture">
      <option value="">Auto-detect visitor language</option>
      <option value="AR">Arabic</option>
      <option value="BG">Bulgarian</option>
      <option value="CA">Catalan</option>
      <option value="CS">Czech</option>
      <option value="CY">Welsh</option>
      <option value="DA">Danish</option>
      <option value="DE">Deutsch</option>
      <option value="EL">Greek (modern)</option>
      <option value="EN" selected>English</option>
      <option value="ES">Spanish</option>
      <option value="ET">Estonian</option>
      <option value="EU">Basque</option>
      <option value="FI">Finnish</option>
      <option value="FR">French</option>
      <option value="GA">Irish</option>
      <option value="HE">Hebrew</option>
      <option value="HI">Hindi</option>
      <option value="HR">Croatian</option>
      <option value="HU">Hungarian</option>
      <option value="ID">Indonesian</option>
      <option value="IS">Icelandic</option>
      <option value="IT">Italian</option>
      <option value="JA">Japanese</option>
      <option value="KO">Korean</option>
      <option value="LT">Lithuanian</option>
      <option value="LV">Latvian</option>
      <option value="MK">Macedonian</option>
      <option value="MS">Malay</option>
      <option value="NB">Norwegian Bokmål</option>
      <option value="NL">Dutch</option>
      <option value="PL">Polish</option>
      <option value="PT">Portuguese</option>
      <option value="PT-BR">Brazilian Portuguese</option>
      <option value="RO">Romanian</option>
      <option value="RU">Russian</option>
      <option value="SI">Sinhalese</option>
      <option value="SK">Slovak</option>
      <option value="SL">Slovenian</option>
      <option value="SQ">Albanian</option>
      <option value="SR">Serbian</option>
      <option value="SV">Swedish</option>
      <option value="TA">Tamil</option>
      <option value="TH">Thai</option>
      <option value="TR">Turkish</option>
      <option value="UK">Ukrainian</option>
      <option value="VI">Vietnamese</option>
      <option value="ZH">Chinese</option>
      <option value="ZH-HANT">Traditional Chinese</option>
    </select>
  </div>
</fieldset>

<pre
  data-copy
  class="astro-code github-dark"
  style="background-color:#24292e;color:#e1e4e8;overflow-x:auto"
  tabindex="0"
  data-language="html"
><code id="cookiebot-script-output" class="language-html"></code></pre>

<script data-astro-rerun>
(() => {
  const cookiebotCbid = document.getElementById('cookiebot-cbid');
  const cookiebotBlockingMode = document.getElementById('cookiebot-blocking-mode');
  const cookiebotCulture = document.getElementById('cookiebot-culture');
  const cookiebotScriptOutput = document.getElementById('cookiebot-script-output');
  const cookiebotCbidError = document.getElementById('cookiebot-cbid-error');

  function updateCookiebotScript() {
    const rawCbid = cookiebotCbid.value.trim();
    const hasValidCbid = rawCbid !== '' && cookiebotCbid.checkValidity();
    const cbid = hasValidCbid ? rawCbid : 'YOUR COOKIEBOT ID HERE';
    const showCbidError = rawCbid !== '' && !hasValidCbid;
    if (showCbidError) {
      cookiebotCbid.setAttribute('aria-invalid', 'true');
    } else {
      cookiebotCbid.removeAttribute('aria-invalid');
    }
    cookiebotCbidError.hidden = !showCbidError;
    const lines = [
      '<script',
      '  id="Cookiebot"',
      '  src="https://consent.cookiebot.com/uc.js"',
      `  data-cbid="${cbid}"`,
    ];

    if (cookiebotBlockingMode.value === 'auto') {
      lines.push('  data-blockingmode="auto"');
    } else {
      lines.push('  async');
    }

    if (cookiebotCulture.value) {
      lines.push(`  data-culture="${cookiebotCulture.value}"`);
    }

    lines.push('  type="text/javascript"', '><' + '/script>');
    cookiebotScriptOutput.textContent = lines.join('\n');
  }

  [cookiebotCbid, cookiebotBlockingMode, cookiebotCulture].forEach(function (control) {
    control.addEventListener('input', updateCookiebotScript);
  });

  updateCookiebotScript();
})();
</script>

<details>
<summary>Advanced: disable an automatic consent integration</summary>

The generated tag keeps Cookiebot's Google, Microsoft UET and Microsoft Clarity consent integrations enabled. Add a disable attribute manually only when your own implementation supplies that service's complete consent update lifecycle, including granted and denied states, later changes, consent withdrawal and returning visitors.

| Integration replaced by your own code | Attribute to add to the Cookiebot tag |
| :-- | :-- |
| Google Consent Mode | `data-consentmode="disabled"` |
| Microsoft UET Consent Mode | `data-ms-consent-mode="disabled"` |
| Microsoft Clarity Consent Mode | `data-ms-clarity-consent-mode="disabled"` |

Disable only the integration you replace. If a service is not used at all, omit its tag and related code instead of disabling Cookiebot's consent passing.

</details>

Choose a fixed language when each language version of the website should always show its matching banner. Leave the field on auto-detect when Cookiebot should use the visitor's browser language.

<details>
<summary>View all <code>data-culture</code> language codes</summary>

| Language | Code in 'data-culture' |
| :---- | :-- |
Arabic | AR
Bulgarian | BG
Catalan | CA
Czech | CS
Welsh | CY
Danish | DA
Deutsch | DE
Greek (modern) | EL
English | EN
Spanish | ES
Estonian | ET
Basque | EU
Finnish | FI
French | FR
Irish | GA
Hebrew | HE
Hindi | HI
Croatian | HR
Hungarian | HU
Indonesian | ID
Icelandic | IS
Italian | IT
Japanese | JA
Korean | KO
Lithuanian | LT
Latvian | LV
Macedonian | MK
Malay | MS
Norwegian Bokmål | NB
Dutch | NL
Polish | PL
Portuguese | PT
Brazilian Portuguese | PT-BR
Romanian | RO
Russian | RU
Sinhalese | SI
Slovak | SK
Slovenian | SL
Albanian | SQ
Serbian | SR
Swedish | SV
Tamil | TA
Thai | TH
Turkish | TR
Ukrainian | UK
Vietnamese | VI
Chinese | ZH
Traditional Chinese | ZH-HANT

</details>

## Step 3 - Add Cookiebot declaration code to website's cookie listing page

The Cookie Declaration is optional. Add it where the site's discovered cookies and trackers should be listed, such as a cookie policy page. Its Domain Group ID follows Step 2, while its language can be selected independently.

<fieldset class="cookiebot-declaration-builder">
  <legend>Customize the Cookie Declaration script</legend>
  <div class="form-field">
    <label for="cookiebot-declaration-cbid">Cookiebot ID</label>
    <input id="cookiebot-declaration-cbid" type="text" readonly>
    <small>Inherited automatically from the Cookiebot ID entered in Step 2.</small>
  </div>
  <div class="form-field">
    <label for="cookiebot-declaration-culture">Declaration language (<code>data-culture</code>)</label>
    <select id="cookiebot-declaration-culture"></select>
  </div>
</fieldset>

<pre
  data-copy
  class="astro-code github-dark"
  style="background-color:#24292e;color:#e1e4e8;overflow-x:auto"
  tabindex="0"
  data-language="html"
><code id="cookiebot-declaration-output" class="language-html"></code></pre>

<script data-astro-rerun>
(() => {
  const cookiebotCbid = document.getElementById('cookiebot-cbid');
  const cookiebotCulture = document.getElementById('cookiebot-culture');
  const cookiebotDeclarationCbid = document.getElementById('cookiebot-declaration-cbid');
  const cookiebotDeclarationCulture = document.getElementById('cookiebot-declaration-culture');
  const cookiebotDeclarationOutput = document.getElementById('cookiebot-declaration-output');

  cookiebotDeclarationCulture.replaceChildren(
    ...Array.from(cookiebotCulture.options, function (option) {
      return option.cloneNode(true);
    })
  );
  cookiebotDeclarationCulture.value = cookiebotCulture.value;

  function updateCookiebotDeclaration() {
    const rawCbid = cookiebotCbid.value.trim();
    const cbid = rawCbid !== '' && cookiebotCbid.checkValidity()
      ? rawCbid
      : 'YOUR COOKIEBOT ID HERE';
    cookiebotDeclarationCbid.value = cbid;
    const lines = [
      '<script',
      '  id="CookieDeclaration"',
      `  src="https://consent.cookiebot.com/${cbid}/cd.js"`,
      '  async',
    ];

    if (cookiebotDeclarationCulture.value) {
      lines.push(`  data-culture="${cookiebotDeclarationCulture.value}"`);
    }

    lines.push('  type="text/javascript"', '><' + '/script>');
    cookiebotDeclarationOutput.textContent = lines.join('\n');
  }

  cookiebotCbid.addEventListener('input', updateCookiebotDeclaration);
  cookiebotDeclarationCulture.addEventListener('input', updateCookiebotDeclaration);
  updateCookiebotDeclaration();
})();
</script>

## Step 4 - Add a cookie settings button

Cookiebot's Privacy Trigger already lets visitors change or withdraw consent. If the site needs another entry point, add a button to the footer or privacy page. It works after the Cookiebot script has loaded.

<div data-copy>

```html

<button type="button" onclick="Cookiebot.renew()">
  Cookie settings
</button>
```

</div>         

## Step 5 - Validate consent and tag behavior

Use [Google Tag Assistant](https://developers.google.com/tag-platform/security/guides/consent-debugging) as the primary Google check: confirm the earliest Consent event contains the default and the latest Consent event contains the update. The Console helper below is a quick supplementary check for Google, UET and Clarity on the current page.

Before consent, every Google signal except `security_storage` should be `denied`. UET should have a denied `ad_storage` default or remain blocked in Basic mode. Clarity should report both storage values as `DENIED`. Run the helper again after accepting and after withdrawing consent to confirm both directions work.

<div data-copy>

```js
(() => {

  // Defined inside the function so the helper can be pasted repeatedly.
  const consentStatusString = status =>
    status === undefined ? "" : status ? "granted" : "denied";

  const consentStatusColor = status =>
    status === "granted" ? "color: #4AF626" : "color: #ef2929";

  /* =========================================================
     GOOGLE CONSENT MODE
     ========================================================= */

  console.log(
    "%cGoogle Consent Mode",
    "font-weight: bold; font-size: 16px;"
  );

  if (
    !("google_tag_data" in window) ||
    !window.google_tag_data?.ics?.entries
  ) {
    console.log("No Consent Mode data found");
  } else {
    const consentEntries = window.google_tag_data.ics.entries;

    // Process each consent entry, except 'wait_for_update'
    for (const entry in consentEntries) {
      if (entry === "wait_for_update") continue;

      const defaultStatus = consentStatusString(
        consentEntries[entry]["default"]
      );

      const updateStatus = consentStatusString(
        consentEntries[entry]["update"]
      );

      console.log(
        `%c${entry}`,
        "font-weight: bold; font-size: 14px;"
      );

      // Default status
      if (defaultStatus !== "") {
        console.log(
          `\tdefault: %c${defaultStatus}`,
          consentStatusColor(defaultStatus)
        );
      } else {
        console.log("\tdefault: not found");
      }

      // Update status
      if (updateStatus !== "") {
        console.log(
          `\tupdate: %c${updateStatus}`,
          consentStatusColor(updateStatus)
        );
      } else {
        console.log("\tupdate: not found");
      }
    }

    // wait_for_update
    if ("wait_for_update" in consentEntries) {
      console.log(
        "%cwait_for_update",
        "font-weight: bold; font-size: 14px;"
      );

      const initialConfig = window.dataLayer?.find(
        item =>
          item?.[0] === "consent" &&
          item?.[1] === "default"
      );

      const waitForUpdate =
        initialConfig?.[2]?.wait_for_update ?? "not found";

      console.log(
        `\tdefault: %c${waitForUpdate}`,
        "color: #FFA500"
      );
    }
  }


  /* =========================================================
     MICROSOFT UET
     ========================================================= */

  console.log(
    "%cMicrosoft UET",
    "font-weight: bold; font-size: 16px;"
  );

  console.log(
    window.uetq ?? "No UET data found"
  );


  /* =========================================================
     MICROSOFT CLARITY CONSENT
     ========================================================= */

  console.log(
    "%cMicrosoft Clarity",
    "font-weight: bold; font-size: 16px;"
  );

  if (typeof window.clarity === "function") {
    clarity(
      "metadata",
      (d, upgrade, consent) => {
        console.log("consentStatus:", consent);
      },
      false,
      true,
      true
    );
  } else {
    console.log("No Clarity data found");
  }

})();
```

</div>
