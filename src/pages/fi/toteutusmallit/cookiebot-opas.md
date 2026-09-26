---
layout: ../../../layouts/Base.astro
title: "Cookiebot-opas"
description: "Vaiheittainen opas Cookiebotin ja Google Consent Moden käyttöönottoon: skriptin asennus, suostumuksen oletustilat ja tagien toiminnan varmistus."
date: 2025-08-07
category: templates
order: 1
icon: "🍪"
summary: "Kopioitava Cookiebot- ja Google Consent Mode -toteutus asetusten valinnasta koodiin ja testaukseen."
tags: ["Cookiebot", "Consent Mode", "GDPR", "evästeet"]
image: /images/blog/cookiebot-guide.jpeg
imageAlt: "Silmälasipäinen sarjakuvakilpikonna seisoo Cookiebot-logon ja evästesuojan näyttävän selainikkunan vieressä"
imageCredit: "Luotu OpenAI ImageGenillä"
alternate:
  lang: en
  href: /templates/cookiebot-guide/
about:
  - "Evästesuostumus"
  - "Google Consent Mode"
mentions:
  - "Cookiebot"
  - "GDPR"
  - "Google Tag Assistant"
  - "Microsoft UET"
citations:
  - name: "Cookiebot: Automatic cookie blocking"
    url: "https://support.cookiebot.com/hc/en-us/articles/360009074960-Automatic-cookie-blocking"
  - name: "Cookiebot: Setting up Microsoft UET for Consent Mode"
    url: "https://support.cookiebot.com/hc/en-us/articles/12452886794908-Setting-up-Microsoft-Universal-Event-Tracking-for-Consent-Mode"
---

## Vaihe 1 – Valitse ConsentDefault-toimintatapa

Molemmat alla olevat skriptit asettavat sekä Google Consent Mode v2:n oletusarvot että Microsoft UET:n oletuksen (`ad_storage`). Microsoft Advertising edellyttää suostumussignaaleja ETA-alueella, Britanniassa ja Sveitsissä, ja UET olettaa arvon `granted`, jos oletusta ei ole asetettu. Siksi denied-oletus on pakko lähettää.

Microsoft kuvaa kaksi toteutustapaa: **Advanced**, jossa UET-tagi latautuu heti ja kerää anonymisoitua dataa suostumuksen puuttuessa, ja **Basic**, jossa UET-tagi ei laukea lainkaan ennen suostumusta. Tässä oppaassa käytetään **Basic Consent Modea**. Se on tiukempi, mutta samalla menetetään mallinnetut konversiot niiltä kävijöiltä, jotka eivät anna suostumusta. Vertailu löytyy [Cookiebotin UET-ohjeesta](https://support.cookiebot.com/hc/en-us/articles/12452886794908-Setting-up-Microsoft-Universal-Event-Tracking-for-Consent-Mode).

UET lukee vain `ad_storage`-arvon. **Microsoft Clarity** on oma tuotteensa, jolla on oma consent mode. Se lukee sekä `ad_storage`-arvon (markkinointi) että `analytics_storage`-arvon (tilastointi). Clarity ei vaadi omaa koodia: Cookiebot hoitaa sen automaattisesti, ja sen voi kytkeä pois vain vaiheen 2 valintaruudulla. Sekä UET että Clarity ovat edellyttäneet suostumussignaalia ETA-alueen, Britannian ja Sveitsin kävijöiltä 31.10.2025 alkaen.

<fieldset class="consent-default-picker">
  <legend>ConsentDefault-asetus</legend>
  <p>Haetaanko kävijän tallennetut Cookiebot-valinnat automaattisesti jokaisella sivulatauksella ConsentDefault-osion oletusarvoiksi?</p>
  <label class="form-choice" for="consent-default-no">
    <input
      id="consent-default-no"
      name="consent-default-mode"
      type="radio"
      value="denied"
      aria-controls="consent-default-denied"
      checked
    >
    <span><strong>Ei.</strong> Käytä estettyjä oletusarvoja, kunnes Cookiebot päivittää suostumustilan.</span>
  </label>
  <label class="form-choice" for="consent-default-yes">
    <input
      id="consent-default-yes"
      name="consent-default-mode"
      type="radio"
      value="stored"
      aria-controls="consent-default-stored"
    >
    <span><strong>Kyllä.</strong> Lue tallennetut valinnat CookieConsent-evästeestä jokaisella sivulatauksella.</span>
  </label>
</fieldset>

<section id="consent-default-stored" hidden>

<h3>Käytä tallennettuja Cookiebot-valintoja Consent Moden oletusarvoina</h3>

Käytä tätä versiota, kun ConsentDefault-osion pitää lukea kävijän tallennetut Cookiebot-valinnat automaattisesti jokaisella sivulatauksella.

Sijoita koodi mahdollisimman korkealle **\<head\>**-osioon. WordPressissä se tulee ladata ennen `wp_head`-hookin suorittamista.

Tämä versio toimii varman eston periaatteella (fail closed): oletuksena se hyväksyy vain nimenomaisen suostumuksen, hylkää yli 366 päivää vanhan suostumuksen ja jättää ristiriitaiset tai epäselvät samannimiset `CookieConsent`-evästeet huomioimatta. Jos tallennettua suostumusta ei voida vahvistaa, kaikki ei-välttämättömät signaalit jäävät `denied`-tilaan, kunnes Cookiebot lähettää ajantasaisen päivityksen.

Aseta Consent Moden oletustila vain yhdestä lähteestä. Jos GTM:n Cookiebot CMP -malli asettaa oletustilan, älä käytä tätä alustusskriptiä samanaikaisesti.

<div class="code-accordion" data-code-accordion>
<div class="code-accordion__content" id="cookiebot-stored-consent-script" data-code-accordion-content>

```html
<!--
  Google Consent Mode v2 -alustusskripti Cookiebotille.

  SIJOITUS:
  Suoraan <head>-osioon ENNEN:
  1. Cookiebotia
  2. Google Tag Manageria
  3. gtag.js:ää

  Ei async-attribuuttia.
  Ei defer-attribuuttia.
  Ei ulkoiseen tiedostoon.

  TARKOITUS:
  - Palauttaa palaavan käyttäjän aiempi Cookiebot-suostumus heti.
  - Mahdollistaa aikaisin syntyvien tapahtumien käsittelyn käyttäjän
    tallennetulla suostumustilalla.
  - Jos tallennettua suostumusta ei voida luotettavasti vahvistaa,
    kaikki ei-välttämättömät signaalit jäävät denied-tilaan.
  - Cookiebot säilyy varsinaisena suostumustietojen lähteenä ja
    lähettää myöhemmin ajantasaisen suostumuspäivityksen.
  - Välittää saman ad_storage-tilan Microsoft UET:lle jokaisella
    sivulatauksella.

  HUOM:
  Consent Moden oletustila pitää asettaa vain yhdestä lähteestä.
  Jos GTM:n Cookiebot CMP -malli asettaa oletustilan,
  älä aseta sitä myös tällä skriptillä.
-->
<script type="text/javascript" data-cookieconsent="ignore">
(function (window, document) {
  'use strict';


  /*
   * =========================================================
   * ASETUKSET
   * =========================================================
   */

  var CONFIG = {
    /*
     * Cookiebotin tallentaman suostumusevästeen nimi.
     */
    cookieName: 'CookieConsent',

    /*
     * Kuinka kauan Google-tagit odottavat Cookiebotin päivitystä,
     * jos aiempaa kelvollista suostumusta ei löydy.
     *
     * 0 = ei odotusta.
     */
    waitForUpdate: 1500,

    /*
     * Tallennetun suostumuksen sallittu enimmäisikä päivinä.
     *
     * 0 = ikätarkistus pois käytöstä.
     */
    maxConsentAgeDays: 366,

    /*
     * Hyväksy alustuksen aikana vain nimenomainen suostumus.
     *
     * ETA/GDPR-toteutuksessa tämän tulisi normaalisti olla true.
     */
    requireExplicit: true,

    /*
     * Google Consent Mode -asetukset.
     */
    adsDataRedaction: true,
    urlPassthrough: false,

    /*
     * Ota käyttöön vain, jos sivusto käyttää IAB TCF:ää.
     */
    enableTcfSupport: false,

    /*
     * Virheenkorjaustila.
     *
     * true = dataLayeriin lisätään consent_bootstrap-tapahtuma,
     * josta näkee, käytettiinkö tallennettua suostumusta vai
     * turvallista oletustilaa.
     */
    debug: false,

    /*
     * Cookiebot-kategoriat → Google Consent Mode.
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
   * SALLITUT COOKIEBOT-KENTÄT
   * =========================================================
   *
   * Parsinnassa huomioidaan vain kentät, joita tässä
   * toteutuksessa tarvitaan.
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
   * KAKSOISAJOSUOJA
   * =========================================================
   */

  if (window.__cmBootstrapDone) {
    return;
  }


  /*
   * =========================================================
   * DENIED-OLETUSTILA
   * =========================================================
   *
   * Signaalit määritellään eksplisiittisesti.
   *
   * Määritys ei koskaan luo lähtötilaa, vaan voi ainoastaan
   * nostaa vahvistetun kategorian denied → granted.
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
   * SUOSTUMUKSEN LUKEMINEN
   * =========================================================
   *
   * Mikään Cookiebot-evästeen käsittelyssä tapahtuva virhe
   * ei saa estää Consent Moden oletusarvokomennon lähettämistä.
   */

  try {

    if (CONFIG.enableTcfSupport) {
      window.gtag_enable_tcf_support = true;
    }

    consent = readStoredConsent();

    if (consent) {

      /*
       * Ainoastaan vahvistetut, arvon true saaneet kategoriat voivat
       * nostaa signaalin granted-tilaan.
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

        if (consent[category] !== true) {
          continue;
        }

        var signals = CONFIG.mapping[category];

        for (var i = 0; i < signals.length; i++) {
          state[signals[i]] = 'granted';
        }
      }

    } else if (CONFIG.waitForUpdate > 0) {

      /*
       * Aiempaa vahvistettua suostumusta ei löytynyt.
       *
       * Pidetään kaikki ei-välttämätön denied-tilassa ja
       * annetaan Cookiebotille aikaa lähettää päivitys.
       */
      state.wait_for_update =
        CONFIG.waitForUpdate;
    }

  } catch (error) {

    /*
     * Viimeinen varmistus.
     *
     * Jos mikä tahansa yllä olevassa logiikassa epäonnistuu,
     * palataan aina denied-oletukseen.
     */
    consent = null;
    state = createDeniedState();

    if (CONFIG.waitForUpdate > 0) {
      state.wait_for_update =
        CONFIG.waitForUpdate;
    }
  }


  /*
   * =========================================================
   * GOOGLE CONSENT MODEN OLETUSTILA
   * =========================================================
   */

  gtag(
    'consent',
    'default',
    state
  );


  /*
   * Oletustila on nyt varmasti lisätty dataLayeriin.
   * Vasta tämän jälkeen merkitään alustus suoritetuksi.
   */
  window.__cmBootstrapDone = true;


  /*
   * =========================================================
   * GOOGLE-LISÄASETUKSET
   * =========================================================
   */

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
   * MICROSOFT UET -OLETUS
   * =========================================================
   *
   * Ilman nimenomaista oletusta UET olettaa arvon granted, joten
   * oletus on aina denied.
   *
   * Jos tallennettu suostumus saatiin vahvistettua, se lähetetään
   * päivityksenä myös tällä sivulatauksella. UET odottaa granted-
   * tai denied-arvoa jokaisella sivulla, ei vain sillä sivulla,
   * jolla suostumus annettiin.
   *
   * Cookiebot lähettää lisäksi oman päivityksensä myöhemmin.
   */

  window.uetq = window.uetq || [];

  window.uetq.push(
    'consent',
    'default',
    {
      ad_storage: 'denied'
    }
  );

  if (consent) {
    window.uetq.push(
      'consent',
      'update',
      {
        ad_storage: state.ad_storage
      }
    );
  }


  /*
   * =========================================================
   * VIRHEENKORJAUS
   * =========================================================
   */

  if (CONFIG.debug) {
    window.dataLayer.push({
      event: 'consent_bootstrap',

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
          : false
    });
  }


  /*
   * =========================================================
   * TALLENNETUN COOKIEBOT-SUOSTUMUKSEN LUKEMINEN
   * =========================================================
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

    for (var i = 0; i < values.length; i++) {

      var parsed =
        parseConsent(
          values[i]
        );

      /*
       * Jos samannimisiä CookieConsent-evästeitä on useita,
       * yhdenkin epäkelvon kopion löytyminen tekee tilanteesta
       * epäselvän.
       *
       * Varma esto → yhteenkään ei luoteta.
       */
      if (!parsed) {
        return null;
      }

      /*
       * Jos useat kelvolliset CookieConsent-evästeet
       * sisältävät eri suostumusvalinnat, tilanne on ristiriitainen.
       */
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


  /*
   * =========================================================
   * COOKIECONSENT-EVÄSTEIDEN HAKU
   * =========================================================
   */

  function findCookieValues(name) {

    var values = [];
    var raw;

    try {
      raw = document.cookie;
    } catch (error) {
      return values;
    }

    if (!raw) {
      return values;
    }

    var parts =
      raw.split(';');

    for (var i = 0; i < parts.length; i++) {

      var part =
        trim(parts[i]);

      var separator =
        part.indexOf('=');

      if (separator === -1) {
        continue;
      }

      var cookieName =
        part.slice(
          0,
          separator
        );

      if (cookieName !== name) {
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
   * =========================================================
   * COOKIECONSENT-EVÄSTEEN JÄSENTÄMINEN
   * =========================================================
   */

  function parseConsent(rawValue) {

    var decoded;

    try {
      decoded =
        decodeURIComponent(
          rawValue
        );
    } catch (error) {

      /*
       * Eväste voi olla myös valmiiksi dekoodatussa muodossa.
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


    /*
     * necessary-kentän pitää aina olla true.
     */
    if (
      fields.necessary !== 'true'
    ) {
      return null;
    }


    /*
     * Kaikkien valinnaisten kategorioiden pitää löytyä
     * nimenomaisina totuusarvoina (true tai false).
     */
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


    /*
     * ETA/GDPR-toteutuksessa hyväksytään tarvittaessa vain
     * nimenomainen suostumus (explicit).
     */
    if (CONFIG.requireExplicit) {

      if (
        !fields.method ||
        String(
          fields.method
        ).toLowerCase() !== 'explicit'
      ) {
        return null;
      }
    }


    /*
     * Tarkistetaan suostumuksen ikä.
     */
    if (
      !isRecent(
        fields.utc
      )
    ) {
      return null;
    }


    return {
      preferences:
        fields.preferences === 'true',

      statistics:
        fields.statistics === 'true',

      marketing:
        fields.marketing === 'true'
    };
  }


  /*
   * =========================================================
   * COOKIEBOT-KENTTIEN JÄSENTÄMINEN
   * =========================================================
   *
   * Tukee esimerkiksi:
   *
   * necessary:true
   * method:'explicit'
   * method:"explicit"
   * utc:1683027386232
   */

  function readFields(text) {

    var fields = {};

    var pattern =
      /([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(?:'([^']*)'|"([^"]*)"|([^,}\]]*))/g;

    var match;

    while (
      (match = pattern.exec(text)) !== null
    ) {

      var key =
        String(
          match[1]
        ).toLowerCase();

      /*
       * Ohitetaan kentät, joita alustus ei tarvitse.
       */
      if (
        !Object.prototype.hasOwnProperty.call(
          ALLOWED_FIELDS,
          key
        )
      ) {
        continue;
      }


      /*
       * Sama tunnettu avain kahdesti tekee rakenteesta
       * epäselvän → varma esto.
       */
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
        match[2] !== undefined
      ) {
        value = match[2];

      } else if (
        match[3] !== undefined
      ) {
        value = match[3];

      } else {
        value =
          match[4] || '';
      }


      fields[key] =
        trim(value);
    }

    return fields;
  }


  /*
   * =========================================================
   * TOTUUSARVON TARKISTUS
   * =========================================================
   */

  function isBoolean(value) {
    return (
      value === 'true' ||
      value === 'false'
    );
  }


  /*
   * =========================================================
   * CONSENTIN IKÄ
   * =========================================================
   */

  function isRecent(value) {

    if (
      CONFIG.maxConsentAgeDays <= 0
    ) {
      return true;
    }

    if (!value) {
      return false;
    }


    var timestamp;


    /*
     * Cookiebot käyttää normaalisti epoch-millisekunteja.
     *
     * Esimerkiksi:
     * utc:1683027386232
     */
    if (/^\d+$/.test(value)) {

      timestamp =
        Number(value);

      if (
        !isFinite(timestamp) ||
        timestamp <= 0
      ) {
        return false;
      }


      /*
       * Jos arvo näyttää epoch-sekunneilta,
       * normalisoidaan millisekunneiksi.
       */
      if (timestamp < 100000000000) {
        timestamp =
          timestamp * 1000;
      }

    } else {

      /*
       * Varatapa mahdollisia muita muotoja varten.
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


    /*
     * Tulevaisuuteen päivättyä suostumusta ei hyväksytä.
     */
    if (age < 0) {
      return false;
    }


    var maxAge =
      CONFIG.maxConsentAgeDays *
      24 *
      60 *
      60 *
      1000;


    return age <= maxAge;
  }


  /*
   * =========================================================
   * SUOSTUMUSTILOJEN VERTAILU
   * =========================================================
   */

  function isSameConsent(a, b) {
    return (
      a.preferences === b.preferences &&
      a.statistics === b.statistics &&
      a.marketing === b.marketing
    );
  }


  /*
   * =========================================================
   * MERKKIJONON REUNOJEN SIISTIMINEN
   * =========================================================
   */

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
<button class="code-accordion__toggle" type="button" aria-expanded="false" aria-controls="cookiebot-stored-consent-script" data-code-accordion-toggle data-collapsed-label="Näytä koko Consent Mode -skripti" data-expanded-label="Piilota koko Consent Mode -skripti">Näytä koko Consent Mode -skripti</button>
</div>

</section>

<section id="consent-default-denied">

<h3>Lisää Consent Moden estävät oletusarvot</h3>

Käytä tätä versiota, kun Cookiebotin pitää päivittää suostumustila sivun latautumisen jälkeen.

Sijoita koodi mahdollisimman korkealle **\<head\>**-osioon. WordPressissä se tulee ladata ennen `wp_head`-hookin suorittamista.

```html
<!-- Consent Mode v2:n alkuasetukset -->
<script type="text/javascript" data-cookieconsent="ignore">
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  gtag('consent', 'default', {
    ad_personalization: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 1500
  });

  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', false);

  // Microsoft UET -oletus. Ilman tätä UET olettaa arvon granted.
  window.uetq = window.uetq || [];
  window.uetq.push('consent', 'default', { ad_storage: 'denied' });

  // Ota käyttöön vain, kun Cookiebotin IAB TCF -integraatio on käytössä.
  // window.gtag_enable_tcf_support = true;
</script>
```
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

## Vaihe 2 – Lisää Cookiebot-koodi verkkosivustolle

Liitä seuraava koodi mahdollisimman korkealle sivun **\<head\>**-osioon. Tämä on erityisen tärkeää, jos GTM lisätään esimerkiksi [Google Tag Manager for WordPress](https://wordpress.org/plugins/duracelltomi-google-tag-manager/) -lisäosalla.

Jos et halua käyttää automaattista evästeiden estotilaa, voit käyttää Cookiebotin [async/defer-toteutusta](https://support.cookiebot.com/hc/en-us/articles/360009074960-Automatic-cookie-blocking).

<fieldset class="cookiebot-script-builder">
  <legend>Mukauta Cookiebot-skriptiä</legend>
  <div class="form-field">
    <label for="cookiebot-cbid">Cookiebot-tunnus (<code>data-cbid</code>)</label>
    <input
      id="cookiebot-cbid"
      type="text"
      placeholder="00000000-0000-0000-0000-000000000000"
      autocomplete="off"
      spellcheck="false"
    >
    <small>Kopioi verkkotunnusryhmän tunnus (Domain Group ID) Cookiebot Managerista.</small>
  </div>
  <div class="form-field">
    <label for="cookiebot-blocking-mode">Estotila</label>
    <select id="cookiebot-blocking-mode">
      <option value="auto" selected>Automaattinen esto</option>
      <option value="manual">Manuaalinen esto</option>
    </select>
  </div>
  <div class="form-field">
    <label for="cookiebot-culture">Bannerin kieli (<code>data-culture</code>)</label>
    <select id="cookiebot-culture">
      <option value="">Tunnista kävijän kieli automaattisesti</option>
      <option value="AR">Arabia</option>
      <option value="BG">Bulgaria</option>
      <option value="CA">Katalaani</option>
      <option value="CS">Tšekki</option>
      <option value="CY">Kymri</option>
      <option value="DA">Tanska</option>
      <option value="DE">Saksa</option>
      <option value="EL">Nykykreikka</option>
      <option value="EN">Englanti</option>
      <option value="ES">Espanja</option>
      <option value="ET">Viro</option>
      <option value="EU">Baski</option>
      <option value="FI" selected>Suomi</option>
      <option value="FR">Ranska</option>
      <option value="GA">Iiri</option>
      <option value="HE">Heprea</option>
      <option value="HI">Hindi</option>
      <option value="HR">Kroatia</option>
      <option value="HU">Unkari</option>
      <option value="ID">Indonesia</option>
      <option value="IS">Islanti</option>
      <option value="IT">Italia</option>
      <option value="JA">Japani</option>
      <option value="KO">Korea</option>
      <option value="LT">Liettua</option>
      <option value="LV">Latvia</option>
      <option value="MK">Makedonia</option>
      <option value="MS">Malaiji</option>
      <option value="NB">Norjan bokmål</option>
      <option value="NL">Hollanti</option>
      <option value="PL">Puola</option>
      <option value="PT">Portugali</option>
      <option value="PT-BR">Brasilianportugali</option>
      <option value="RO">Romania</option>
      <option value="RU">Venäjä</option>
      <option value="SI">Sinhala</option>
      <option value="SK">Slovakki</option>
      <option value="SL">Sloveeni</option>
      <option value="SQ">Albania</option>
      <option value="SR">Serbia</option>
      <option value="SV">Ruotsi</option>
      <option value="TA">Tamili</option>
      <option value="TH">Thai</option>
      <option value="TR">Turkki</option>
      <option value="UK">Ukraina</option>
      <option value="VI">Vietnam</option>
      <option value="ZH">Kiina</option>
      <option value="ZH-HANT">Perinteinen kiina</option>
    </select>
  </div>
  <div class="form-field">
    <label class="form-choice" for="cookiebot-ms-consent-mode">
      <input id="cookiebot-ms-consent-mode" type="checkbox">
      <span>Poista käytöstä Cookiebotin automaattinen suostumuksen välitys Microsoft UET:lle</span>
    </label>
    <small>Lisää skriptiin <code>data-ms-consent-mode="disabled"</code>. Jätä valitsematta, ellet välitä UET:n suostumuspäivityksiä itse.</small>
  </div>
  <div class="form-field">
    <label class="form-choice" for="cookiebot-ms-clarity-consent-mode">
      <input id="cookiebot-ms-clarity-consent-mode" type="checkbox">
      <span>Poista käytöstä Cookiebotin automaattinen suostumuksen välitys Microsoft Claritylle</span>
    </label>
    <small>Lisää skriptiin <code>data-ms-clarity-consent-mode="disabled"</code>. Jätä valitsematta, ellet käytä Clarityä tai hoida sen suostumusta itse.</small>
  </div>
</fieldset>

<pre
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
  const cookiebotMsConsentMode = document.getElementById('cookiebot-ms-consent-mode');
  const cookiebotMsClarityConsentMode = document.getElementById('cookiebot-ms-clarity-consent-mode');
  const cookiebotScriptOutput = document.getElementById('cookiebot-script-output');

  function updateCookiebotScript() {
    const cbid = cookiebotCbid.value.trim() || 'COOKIEBOT-TUNNUS-TÄHÄN';
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

    if (cookiebotMsConsentMode.checked) {
      lines.push('  data-ms-consent-mode="disabled"');
    }

    if (cookiebotMsClarityConsentMode.checked) {
      lines.push('  data-ms-clarity-consent-mode="disabled"');
    }

    lines.push('  type="text/javascript"', '><' + '/script>');
    cookiebotScriptOutput.textContent = lines.join('\n');
  }

  [cookiebotCbid, cookiebotBlockingMode, cookiebotCulture, cookiebotMsConsentMode, cookiebotMsClarityConsentMode].forEach(function (control) {
    control.addEventListener('input', updateCookiebotScript);
  });

  updateCookiebotScript();
})();
</script>

Voit määrittää bannerin kielen `data-culture`-attribuutilla esimerkiksi silloin, kun sivustolla on erilliset kieliversiot etkä halua käyttää automaattista kielentunnistusta.

<details>
<summary>Näytä kaikki <code>data-culture</code>-kielikoodit</summary>

| Kieli | `data-culture`-koodi |
| :---- | :------------------ |
| Arabia | AR |
| Bulgaria | BG |
| Katalaani | CA |
| Tšekki | CS |
| Kymri | CY |
| Tanska | DA |
| Saksa | DE |
| Nykykreikka | EL |
| Englanti | EN |
| Espanja | ES |
| Viro | ET |
| Baski | EU |
| Suomi | FI |
| Ranska | FR |
| Iiri | GA |
| Heprea | HE |
| Hindi | HI |
| Kroatia | HR |
| Unkari | HU |
| Indonesia | ID |
| Islanti | IS |
| Italia | IT |
| Japani | JA |
| Korea | KO |
| Liettua | LT |
| Latvia | LV |
| Makedonia | MK |
| Malaiji | MS |
| Norjan bokmål | NB |
| Hollanti | NL |
| Puola | PL |
| Portugali | PT |
| Brasilianportugali | PT-BR |
| Romania | RO |
| Venäjä | RU |
| Sinhala | SI |
| Slovakki | SK |
| Sloveeni | SL |
| Albania | SQ |
| Serbia | SR |
| Ruotsi | SV |
| Tamili | TA |
| Thai | TH |
| Turkki | TR |
| Ukraina | UK |
| Vietnam | VI |
| Kiina | ZH |
| Perinteinen kiina | ZH-HANT |

</details>

### Microsoft UET ja Basic Consent Mode

Cookiebot välittää suostumuspäivitykset `window.uetq`-objektiin automaattisesti aina, kun objekti on olemassa. Useimmissa toteutuksissa muuta ei tarvita.

Basic Consent Modessa UET-tagi ei saa laueta ennen kuin markkinointisuostumus on annettu. Käytä siis Cookiebotin automaattista estoa tai GTM-liipaisinta, joka on sidottu markkinointisuostumukseen. Sivuilla, joilla tagi laukeaa, lähetä granted-päivitys:

<div data-copy>

```js
window.uetq = window.uetq || [];
window.uetq.push('consent', 'update', { ad_storage: 'granted' });
```

</div>

Valitse yllä olevat Microsoft-valintaruudut vain, jos haluat hoitaa päivitykset itse Cookiebotin sijaan.

## Vaihe 3 – Lisää Cookiebot Declaration -koodi evästesivulle

Liitä seuraava koodi sivulle, jolla verkkosivuston käyttämät evästeet luetellaan.

<fieldset class="cookiebot-declaration-builder">
  <legend>Mukauta Cookie Declaration -skriptiä</legend>
  <div class="form-field">
    <label for="cookiebot-declaration-cbid">Cookiebot-tunnus</label>
    <input id="cookiebot-declaration-cbid" type="text" readonly>
    <small>Tunnus periytyy automaattisesti vaiheessa 2 annetusta Cookiebot-tunnuksesta.</small>
  </div>
  <div class="form-field">
    <label for="cookiebot-declaration-culture">Evästeluettelon kieli (<code>data-culture</code>)</label>
    <select id="cookiebot-declaration-culture"></select>
  </div>
</fieldset>

<pre
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
    const cbid = cookiebotCbid.value.trim() || 'COOKIEBOT-TUNNUS-TÄHÄN';
    cookiebotDeclarationCbid.value = cbid;
    const lines = [
      '<script',
      '  id="CookieDeclaration"',
      `  src="https://consent.cookiebot.com/${cbid}/cd.js"`,
      '  defer',
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

## Vaihe 4 – Lisää suostumuksen uusimispainike

Voit lisätä verkkosivuston alatunnisteeseen oman painikkeen, jos haluat avata suostumusvalinnat muualtakin kuin Cookiebotin oletusarvoisesta kelluvasta painikkeesta. Kopioi seuraava koodi ja lisää painikkeelle tarvittavat tyylit.

```html
<button type="button" onclick="Cookiebot.renew();">
  Muokkaa evästeasetuksia
</button>
```

## Vaihe 5 – Tarkista Google- ja Microsoft-suostumustilat selaimen konsolissa

Avaa selaimen kehittäjätyökalujen konsoli ennen evästeiden hyväksymistä ja suorita seuraava koodi. Se tarkistaa kaikki kolme suostumusjärjestelmää kerralla.

Ennen suostumusta kaikkien Google-signaalien pitäisi olla arvossa `denied` lukuun ottamatta `security_storage`-signaalia, Microsoft UET:n pitäisi näyttää `consent default` -lähetys arvolla `ad_storage: denied` ja Clarityn pitäisi ilmoittaa sekä `ad_storage` että `analytics_storage` arvossa `DENIED`. Suorita koodi uudelleen hyväksynnän jälkeen ja varmista, että päivitykset menevät perille.

<div data-copy>

```js
// Apufunktiot tilan tekstille ja värille.
const consentStatusString = status =>
  status === undefined ? "" : status ? "granted" : "denied";

const consentStatusColor = status =>
  status === "granted" ? "color: #4AF626" : "color: #ef2929";

(() => {

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
    console.log("Consent Mode -tietoja ei löytynyt");
  } else {
    const consentEntries = window.google_tag_data.ics.entries;

    // Käy läpi kaikki suostumussignaalit paitsi 'wait_for_update'.
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

      // Oletustila
      if (defaultStatus !== "") {
        console.log(
          `\tdefault: %c${defaultStatus}`,
          consentStatusColor(defaultStatus)
        );
      } else {
        console.log("\tdefault: ei löytynyt");
      }

      // Päivitetty tila
      if (updateStatus !== "") {
        console.log(
          `\tupdate: %c${updateStatus}`,
          consentStatusColor(updateStatus)
        );
      } else {
        console.log("\tupdate: ei löytynyt");
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
        initialConfig?.[2]?.wait_for_update ?? "ei löytynyt";

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
    window.uetq ?? "UET-tietoja ei löytynyt"
  );


  /* =========================================================
     MICROSOFT CLARITY -SUOSTUMUS
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
    console.log("Clarity-tietoja ei löytynyt");
  }

})();
```

</div>
