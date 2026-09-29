---
layout: ../../../layouts/Base.astro
title: "Cookiebot-opas"
description: "Vaiheittainen opas Cookiebotin käyttöönottoon sekä Google Consent Moden, Microsoft UET:n ja Clarityn suostumustilojen määrittämiseen ja testaamiseen."
date: 2025-08-07
updatedDate: 2026-09-28
category: templates
order: 1
icon: "🍪"
summary: "Cookiebotin käyttöönotto ja Googlen sekä Microsoftin suostumustilojen hallinta: asetukset, kopioitavat koodit ja testausohjeet."
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

Tässä oppaassa Cookiebot asennetaan suoraan verkkosivustolle. Ohje etenee skriptien lisäämisestä toiminnan tarkistamiseen selaimessa. Sivuston ylläpitäjä saa ohjeet toteutukseen, markkinoinnin ja analytiikan asiantuntija suostumustilojen tarkistamiseen ja kehittäjä kopioitavat koodit muokattaviksi.

## Ennen aloittamista

Opas käsittelee **suoraan sivustolle tehtävää toteutusta**: suostumuksen oletustilat ja Cookiebot-tagi lisätään sivuston `<head>`-osioon. Tarvitset Cookiebotin verkkotunnusryhmän tunnuksen (Domain Group ID) sekä pääsyn sivuston lähdekoodiin tai sisällönhallintajärjestelmän toimintoon, jolla skriptejä voi lisätä `<head>`-osioon.

Älä käytä näitä skriptejä yhdessä Google Tag Managerin Cookiebot CMP -mallipohjan tai muun suostumuksen oletustiloja ja päivityksiä jo hallitsevan integraation kanssa. Tarkista tai poista nykyinen toteutus ennen jatkamista, sillä samaa suostumustilaa hallitsevat integraatiot voivat toimia ristiriitaisesti.

Opas käsittelee teknistä toteutusta eikä ratkaise sen lainmukaisuutta. Evästeluokkien, aluekohtaisten toimintatapojen, säilytysajan ja banneritekstien on vastattava sivuston käytäntöjä ja sovellettavia vaatimuksia.

## Vaihe 1 – Valitse suostumuksen oletustilojen asettamistapa

Molemmat alla olevat skriptit asettavat Google Consent Mode v2:n oletustilat. Jos sivusto käyttää Microsoft Advertisingia tai Clarityä, samoilla skripteillä voi asettaa myös Microsoft UET:n ja Microsoft Clarity Consent API v2:n oletustilat. Microsoft Advertising edellyttää suostumussignaaleja ETA-alueella, Britanniassa ja Sveitsissä. UET olettaa arvon `granted`, jos oletustilaa ei ole asetettu, joten mukaan valitun UET-integraation oletustilaksi on asetettava `denied`.

Basic ja Advanced Consent Mode kuvaavat **tagin latausajankohtaa**, eivät sitä, kumman oletustilan asettavan skriptin kopioit. Basic-tilassa tagin lataaminen estetään, kunnes tarvittava suostumus on annettu. Advanced-tilassa tagi latautuu `denied`-oletustilassa ja lähettää rajattuja mittaustietoja ilman evästeitä. Tässä oppaassa Microsoft UET käyttää **Basic-tilaa**. Google-tagit voivat käyttää kumpaa tahansa tilaa lataussääntöjensä mukaan. Katso Googlen [Basic- ja Advanced-tilojen vertailu](https://developers.google.com/tag-platform/security/concepts/consent-mode#basic_vs_advanced_consent_mode) ja [Cookiebotin UET-ohje](https://support.cookiebot.com/hc/en-us/articles/12452886794908-Setting-up-Microsoft-Universal-Event-Tracking-for-Consent-Mode).

UET lukee vain `ad_storage`-arvon. **Microsoft Clarity** on erillinen tuote, jonka Consent API v2 lukee sekä `ad_Storage`-arvon (markkinointi) että `analytics_Storage`-arvon (tilastointi). Kun valitset palvelun mukaan, skriptit alustavat sen suostumusarvot ennen kyseisen Microsoft-tagin latautumista. Sekä UET että Clarity ovat edellyttäneet suostumussignaaleja ETA-alueen, Britannian ja Sveitsin kävijöiltä 31.10.2025 alkaen.

<fieldset class="consent-default-picker">
  <legend>Valitse oletustilan asettava skripti</legend>
  <p>Palautetaanko palaavan kävijän tallennetut Cookiebot-valinnat ennen Cookiebotin latautumista?</p>
  <label class="form-choice" for="consent-default-no">
    <input
      id="consent-default-no"
      name="consent-default-mode"
      type="radio"
      value="denied"
      aria-controls="consent-default-denied"
      checked
    >
    <span><strong>Ei. Suositus useimmille sivustoille.</strong> Aloita denied-tilasta ja anna Cookiebotin päivittää suostumustila.</span>
  </label>
  <label class="form-choice" for="consent-default-yes">
    <input
      id="consent-default-yes"
      name="consent-default-mode"
      type="radio"
      value="stored"
      aria-controls="consent-default-stored"
    >
    <span><strong>Kyllä. Edistynyt toteutus.</strong> Lue ja tarkista tallennettu CookieConsent-eväste ensin.</span>
  </label>
</fieldset>

<fieldset class="consent-service-picker">
  <legend>Valitse Microsoftin suostumusten hallinta</legend>
  <p>Google Consent Mode sisältyy aina toteutukseen. Nämä valinnat koskevat kumpaakin oletustilan asettavaa skriptiä.</p>
  <label class="form-choice" for="consent-default-include-uet">
    <input id="consent-default-include-uet" type="checkbox" checked>
    <span>Sisällytä Microsoft Advertising UET:n suostumusten hallinta</span>
  </label>
  <label class="form-choice" for="consent-default-include-clarity">
    <input id="consent-default-include-clarity" type="checkbox" checked>
    <span>Sisällytä Microsoft Clarityn suostumusten hallinta</span>
  </label>
</fieldset>

<section id="consent-default-stored" hidden>

<h3>Edistynyt toteutus: palauta tallennetut Cookiebot-valinnat</h3>

Käytä tätä versiota vain, jos palaavien kävijöiden varhaisten sivutapahtumien käsittely edellyttää lisäkoodia ja tiimisi pystyy ylläpitämään sitä. Skripti alustaa aina Google Consent Mode v2:n. Yllä olevilla Microsoft-valinnoilla lisäät mukaan UET Consent Moden ja Clarity Consent V2:n, jotka käyttävät samoja Cookiebotin evästeluokkia.

Sijoita koodi mahdollisimman lähelle **\<head\>**-osion alkua. WordPressissä se tulee ladata ennen `wp_head`-hookin suorittamista.

Tämä versio toimii varman eston periaatteella (fail closed): oletuksena se hyväksyy vain nimenomaisen suostumuksen, hylkää yli 366 päivää vanhan suostumuksen ja jättää ristiriitaiset tai epäselvät samannimiset `CookieConsent`-evästeet huomioimatta. Jos tallennettua suostumusta ei voida vahvistaa, kaikki ei-välttämättömät signaalit jäävät `denied`-tilaan. Cookiebotille annetaan aikaa lähettää ajantasainen päivitys.

Aseta Consent Moden oletustila vain yhdestä lähteestä. Poista aiempi suostumuksen oletustiloja tai päivityksiä hallitseva toteutus ennen tämän alustusskriptin käyttämistä.

<div class="code-accordion" data-code-accordion>
<div class="code-accordion__content" id="cookiebot-stored-consent-script" data-code-accordion-content>

```html
<!--
  Cookiebotin suostumustilojen alustusskripti.

  Tukee seuraavia palveluita:
  - Google Consent Mode v2
  - Microsoft UET Consent Mode
  - Microsoft Clarity Consent V2

  SIJOITUS:
  Suoraan <head>-osioon ennen seuraavia skriptejä:
  1. Cookiebot
  2. Google Tag Manager
  3. gtag.js
  4. Microsoft UET
  5. Microsoft Clarity

  Ei async- tai defer-attribuuttia.

  Suositus: sijoita skripti inline-muodossa suoraan <head>-osioon, jotta Consent Moden oletustila asetetaan mahdollisimman aikaisin.

  Jos käytetään ulkoista tiedostoa, sen on latauduttava synkronisesti ennen Cookiebotia, GTM:ää, gtag.js:ää, Microsoft UET:tä ja   Clarityä.

  TARKOITUS:
  - Palauttaa palaavan kävijän aiemman Cookiebot-suostumuksen heti.
  - Antaa varhaisten tapahtumien käyttää tallennettua suostumustilaa.
  - Jos tallennettua suostumusta ei voida vahvistaa luotettavasti,
    kaikki ei-välttämättömät signaalit jäävät denied-tilaan.
  - Cookiebot säilyy suostumustietojen lähteenä ja päivittää tilan myöhemmin.
  - Samoja Cookiebotin evästeluokkia käytetään Googlen,
    Microsoft UET:n ja Microsoft Clarityn suostumustiloissa.

  VASTAAVUUDET:
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

  HUOMAUTUS:
  Aseta Consent Moden oletustila vain yhdestä lähteestä.
  Poista aiempi oletustiloja tai päivityksiä hallitseva toteutus
  ennen tämän skriptin käyttämistä.
-->
<script type="text/javascript" data-cookieconsent="ignore">
(function (window, document) {
  'use strict';


  /*
   * ASETUKSET
   */

  var CONFIG = {

    /*
     * Cookiebotin tallentaman suostumusevästeen nimi.
     */
    cookieName: 'CookieConsent',

    /*
     * Kuinka kauan Google-tagit odottavat Cookiebotia, jos aiempaa
     * kelvollista suostumusta ei löydy.
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
     * ETA/GDPR-toteutuksessa arvo on yleensä true.
     */
    requireExplicit: true,

    /*
     * Google Consent Mode -asetukset.
     */
    adsDataRedaction: true,
    urlPassthrough: false,

    /*
     * Valinnaiset Microsoftin suostumusintegraatiot.
     */
    includeMicrosoftUet: true,
    includeMicrosoftClarity: true,

    /*
     * Ota käyttöön vain, jos sivusto käyttää IAB TCF:ää.
     */
    enableTcfSupport: false,

    /*
     * Virheenkorjaustila.
     *
     * true = lisää dataLayeriin consent_bootstrap- ja
     * consent_microsoft_update-tapahtumat.
     */
    debug: false,

    /*
     * Cookiebotin evästeluokat → Google Consent Moden signaalit.
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
   * TÄSSÄ SKRIPTISSÄ KÄYTETTÄVÄT COOKIEBOT-KENTÄT
   *
   * Muut kentät ohitetaan jäsentämisessä.
   * Myös ver ja stamp ovat mukana, jotta niiden toistuminen
   * johtaa evästeen hylkäämiseen epäselvänä.
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
   * DATALAYER + GTAG
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
   * MICROSOFT CLARITYN JONO
   *
   * Mahdollistaa Clarity Consent V2 -komentojen lisäämisen jonoon
   * ennen Clarity-skriptin latautumista.
   *
   * Määritellään ennen toistuvan suorituksen estoa, jotta jono
   * on olemassa myös silloin, kun skripti suoritetaan kahdesti.
   */

  if (CONFIG.includeMicrosoftClarity) {
    window.clarity = window.clarity || function () {
      window.clarity.q =
        window.clarity.q || [];

      window.clarity.q.push(arguments);
    };
  }


  /*
   * TOISTUVAN SUORITUKSEN ESTO
   */

  if (window.__cmBootstrapDone) {
    return;
  }


  /*
   * OLETUSTILA
   *
   * Kaikkien hallittavien ei-välttämättömien signaalien
   * oletusarvo on denied. Vahvistettu suostumus voi muuttaa
   * signaalin arvon denied-arvosta granted-arvoksi.
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
   * TALLENNETUN COOKIEBOT-SUOSTUMUKSEN LUKEMINEN
   *
   * Jos evästeen käsittelyssä tapahtuu virhe, käytetään
   * varmaa denied-oletustilaa.
   */

  try {

    if (CONFIG.enableTcfSupport) {
      window.gtag_enable_tcf_support = true;
    }

    consent =
      readStoredConsent();


    if (consent) {

      /*
       * Vain vahvistetut, arvon true saaneet evästeluokat
       * voivat muuttaa signaalin arvoksi granted.
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
       * Aiempaa vahvistettua suostumusta ei löytynyt.
       *
       * Pidetään ei-välttämättömät signaalit denied-tilassa ja
       * annetaan Cookiebotille aikaa lähettää päivitys.
       */

      state.wait_for_update =
        CONFIG.waitForUpdate;
    }

  } catch (error) {

    /*
     * Viimeinen varmistus.
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
   * GOOGLE CONSENT MODE
   */

  gtag(
    'consent',
    'default',
    state
  );


  /*
   * Oletustilan asettava komento on nyt lisätty jonoon.
   * Merkitään alustus heti suoritetuksi, jotta toistuva suoritus
   * ei lähetä oletustilaa uudelleen, vaikka myöhempi toiminto
   * epäonnistuisi.
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
   * MICROSOFT UET CONSENT MODE
   *
   * UET käyttää vain ad_storage-arvoa.
   * Ilman erikseen asetettua oletustilaa UET olettaa arvon granted.
   * Siksi oletustilaksi lähetetään denied aina, kun UET on mukana.
   *
   * Lähetetyt arvot tallennetaan paikallisiin muuttujiin, koska
   * UET näyttää nykyisen tilan alkuperäisen oletustilan sijaan.
   * Arvot raportoidaan virheenkorjauksen dataLayer-tapahtumissa.
   * Niitä ei tallenneta window-objektiin, jotta sivun muu koodi
   * ei voi ylikirjoittaa niitä.
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
   * Palaava kävijä, jonka tallennettu suostumus on vahvistettu.
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
   * MICROSOFT CLARITY CONSENT V2
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
     * Estetään saman tilan lähettäminen toistuvasti.
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
   * COOKIEBOTIN SUOSTUMUSPÄIVITYKSET
   *
   * Pitää Microsoft UET:n ja Clarityn suostumustilat ajan tasalla
   * Cookiebotin kanssa myös kävijän myöhempien muutosten jälkeen.
   *
   * Googlen tilaa ei päivitetä tässä. Cookiebot lähettää itse
   * gtag-suostumuspäivityksen, joten lisäpäivitys lähettäisi sen kahdesti.
   *
   * Cookiebot välittää suostumuksen myös UET:lle ja Claritylle.
   * Nämä komennot lähettävät siis yleensä saman arvon uudelleen.
   * Ne ovat päivitysten ainoa lähde, jos Cookiebot-skriptin
   * data-ms-consent-mode- tai data-ms-clarity-consent-mode-attribuutin
   * arvoksi on asetettu disabled.
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
   * VIRHEENKORJAUS
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
   * EVÄSTEIDEN KÄSITTELY
   */

  /*
   * Lukee ja tarkistaa tallennetun Cookiebot-suostumuksen.
   *
   * Palauttaa arvon null, jos tilaan ei voi luottaa:
   * eväste puuttuu, sitä ei voi jäsentää tai kahden
   * CookieConsent-evästeen suostumusvalinnat poikkeavat toisistaan.
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
   * Tarkistaa yhden CookieConsent-arvon.
   *
   * Jokaisen valinnaisen evästeluokan on oltava totuusarvo,
   * necessary-arvon on oltava true ja suostumuksen riittävän tuore.
   * Kun requireExplicit on käytössä, oletettua suostumusta ei hyväksytä.
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
       * Evästeen arvo voi olla jo valmiiksi dekoodattu.
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
   * Lukee Cookiebot-evästeen kentät.
   *
   * Tukee esimerkiksi seuraavia muotoja:
   * necessary:true
   * method:'explicit'
   * method:"explicit"
   * utc:1683027386232
   *
   * Tunnetun avaimen toistuminen tekee rakenteesta epäselvän,
   * joten koko eväste hylätään.
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
   * Tarkistaa suostumuksen iän.
   *
   * Cookiebot tallentaa utc-arvon yleensä epoch-millisekunteina.
   * Epoch-sekunneilta näyttävä arvo muunnetaan millisekunneiksi.
   * Tulevaisuuteen päivätty suostumus hylätään.
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
<button class="code-accordion__toggle" type="button" aria-expanded="false" aria-controls="cookiebot-stored-consent-script" data-code-accordion-toggle data-collapsed-label="Näytä koko Consent Mode -skripti" data-expanded-label="Piilota koko Consent Mode -skripti">Näytä koko Consent Mode -skripti</button>
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

<h3>Suositus: aloita denied-oletustiloista</h3>

Tämä versio sopii useimpiin suoraan sivustolle tehtäviin toteutuksiin. Se asettaa oletustilan heti ja antaa Cookiebotin päivittää suostumustilan latauduttuaan.

Sijoita koodi mahdollisimman lähelle **\<head\>**-osion alkua. WordPressissä se tulee ladata ennen `wp_head`-hookin suorittamista.

Pidä Microsoft UET -tagin lataaminen estettynä Basic Consent Modessa, kunnes markkinointisuostumus on annettu. Kun valitset UET:n mukaan, luotu skripti alustaa `window.uetq`-jonon ja asettaa oletustilaksi `denied`. Cookiebot välittää kävijän ajantasaisen markkinointisuostumuksen samaan jonoon automaattisesti. Älä lisää tähän ehdotonta `granted`-päivitystä, sillä se suoritettaisiin ennen kävijän valintaa.

Clarity-valinta lisää jonoon molempien tallennustyyppien `denied`-oletustilat ennen Clarityn latautumista. Pidä Cookiebotin automaattiset integraatiot käytössä, jotta se voi välittää myöhemmät suostumusmuutokset.

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
      '<!-- Consent Mode v2:n alkuasetukset -->',
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
        '  // Microsoft UET:n oletustila. Ilman tätä UET olettaa arvon granted.',
        '  window.uetq = window.uetq || [];',
        "  window.uetq.push('consent', 'default', { ad_storage: 'denied' });"
      );
    }

    if (includeClarity.checked) {
      lines.push(
        '',
        '  // Microsoft Clarity Consent API v2:n oletustilat.',
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
      "  // Ota käyttöön vain, kun Cookiebotin IAB TCF -integraatio on käytössä.",
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

## Vaihe 2 – Lisää Cookiebot verkkosivustolle

Sijoita luotu Cookiebot-tagi **ensimmäiseksi skriptiksi `<head>`-osioon**. Tämä on erityisen tärkeää automaattista estoa käytettäessä, sillä ennen Cookiebotia latautuvat skriptit voivat jäädä sen hallinnan ulkopuolelle.

- **Automaattinen esto** käyttää `data-blockingmode="auto"`-attribuuttia. Älä käytä sen kanssa `async`- tai `defer`-attribuuttia.
- **Manuaalisessa estossa** Cookiebot ladataan `async`-attribuutilla. Merkitse silloin jokaiseen ei-välttämättömään skriptiin, iframeen ja kuvaan oikea suostumusluokka. Katso Cookiebotin [automaattisen eston](https://support.cookiebot.com/hc/en-us/articles/360009074960-Automatic-cookie-blocking) ja [manuaalisen eston](https://support.cookiebot.com/hc/en-us/articles/4405978132242-Manual-cookie-blocking) ohjeet.

Jos WordPress-lisäosa lisää sivulle Google Tag Managerin, tarkista lopullinen sivun lähdekoodi lisäosan asetusten lisäksi. Tässä toteutuksessa Cookiebotin on suorituttava ennen Google Tag Manageria ja muita tageja, jotka voivat asettaa ei-välttämättömiä evästeitä.

<fieldset class="cookiebot-script-builder">
  <legend>Mukauta Cookiebot-skriptiä</legend>
  <div class="form-field">
    <label for="cookiebot-cbid">Cookiebot-tunnus (<code>data-cbid</code>)</label>
    <input
      id="cookiebot-cbid"
      type="text"
      placeholder="00000000-0000-0000-0000-000000000000"
      pattern="[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}"
      autocomplete="off"
      spellcheck="false"
      aria-describedby="cookiebot-cbid-help cookiebot-cbid-error"
    >
    <small id="cookiebot-cbid-help">Kopioi verkkotunnusryhmän tunnus (Domain Group ID) Cookiebot Managerista.</small>
    <p id="cookiebot-cbid-error" role="alert" hidden>Anna verkkotunnusryhmän koko tunnus UUID-muodossa.</p>
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
    const cbid = hasValidCbid ? rawCbid : 'COOKIEBOT-TUNNUS-TÄHÄN';
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
<summary>Edistynyt toteutus: poista automaattinen suostumusintegraatio käytöstä</summary>

Luotu tagi pitää Cookiebotin Google-, Microsoft UET- ja Microsoft Clarity -suostumusintegraatiot käytössä. Lisää käytöstä poistava attribuutti käsin vain, jos oma toteutuksesi hallitsee kyseisen palvelun kaikki suostumuspäivitykset: hyväksymisen ja kieltämisen, myöhemmät muutokset, suostumuksen peruuttamisen sekä palaavien kävijöiden suostumukset.

| Omalla koodilla korvattava integraatio | Cookiebot-tagiin lisättävä attribuutti |
| :-- | :-- |
| Google Consent Mode | `data-consentmode="disabled"` |
| Microsoft UET Consent Mode | `data-ms-consent-mode="disabled"` |
| Microsoft Clarity Consent Mode | `data-ms-clarity-consent-mode="disabled"` |

Poista käytöstä vain integraatio, jonka korvaat omalla toteutuksellasi. Jos palvelua ei käytetä lainkaan, jätä sen tagi ja siihen liittyvä koodi pois.

</details>

Valitse kiinteä kieli, jos sivuston kunkin kieliversion tulee näyttää banneri samalla kielellä. Valitse automaattinen kielentunnistus, jos Cookiebotin tulee käyttää kävijän selaimen kieltä.

<details>
<summary>Näytä kaikki <code>data-culture</code>-kielikoodit</summary>

| Kieli | `data-culture`-koodi |
| :---- | :-- |
Arabia | AR
Bulgaria | BG
Katalaani | CA
Tšekki | CS
Kymri | CY
Tanska | DA
Saksa | DE
Nykykreikka | EL
Englanti | EN
Espanja | ES
Viro | ET
Baski | EU
Suomi | FI
Ranska | FR
Iiri | GA
Heprea | HE
Hindi | HI
Kroatia | HR
Unkari | HU
Indonesia | ID
Islanti | IS
Italia | IT
Japani | JA
Korea | KO
Liettua | LT
Latvia | LV
Makedonia | MK
Malaiji | MS
Norjan bokmål | NB
Hollanti | NL
Puola | PL
Portugali | PT
Brasilianportugali | PT-BR
Romania | RO
Venäjä | RU
Sinhala | SI
Slovakki | SK
Sloveeni | SL
Albania | SQ
Serbia | SR
Ruotsi | SV
Tamili | TA
Thai | TH
Turkki | TR
Ukraina | UK
Vietnam | VI
Kiina | ZH
Perinteinen kiina | ZH-HANT

</details>

## Vaihe 3 – Lisää evästeluettelo evästesivulle

Evästeluettelo (Cookie Declaration) on valinnainen. Lisää se sivulle, jolla haluat luetella sivustolta löydetyt evästeet ja seurantatekniikat, esimerkiksi evästesivulle. Luettelo käyttää vaiheessa 2 annettua verkkotunnusryhmän tunnusta. Voit valita sen kielen erikseen.

<fieldset class="cookiebot-declaration-builder">
  <legend>Mukauta evästeluettelon skriptiä</legend>
  <div class="form-field">
    <label for="cookiebot-declaration-cbid">Cookiebot-tunnus</label>
    <input id="cookiebot-declaration-cbid" type="text" readonly>
    <small>Kenttä täytetään automaattisesti vaiheessa 2 antamallasi Cookiebot-tunnuksella.</small>
  </div>
  <div class="form-field">
    <label for="cookiebot-declaration-culture">Evästeluettelon kieli (<code>data-culture</code>)</label>
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
      : 'COOKIEBOT-TUNNUS-TÄHÄN';
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

## Vaihe 4 – Lisää painike evästeasetusten muuttamiseen

Cookiebotin Privacy Trigger -painikkeella kävijä voi jo muuttaa tai peruuttaa suostumuksensa. Jos haluat tarjota toisen tavan avata asetukset, lisää painike alatunnisteeseen tai tietosuojasivulle. Painike toimii Cookiebot-skriptin latauduttua.

<div data-copy>

```html

<button type="button" onclick="Cookiebot.renew()">
  Muokkaa evästeasetuksia
</button>
```

</div>

## Vaihe 5 – Tarkista suostumustilat ja tagien toiminta

Tarkista Googlen suostumustilat ensisijaisesti [Google Tag Assistantilla](https://developers.google.com/tag-platform/security/guides/consent-debugging): varmista, että ensimmäinen Consent-tapahtuma sisältää oletustilan ja viimeisin Consent-tapahtuma päivityksen. Alla oleva konsolikoodi tarjoaa täydentävän tarkistuksen Googlen, UET:n ja Clarityn tiloista nykyisellä sivulla.

Tarkista ennen suostumuksen antamista seuraavat asiat:

- Kaikkien Google-signaalien arvo on `denied`, paitsi `security_storage`-signaalin.
- UET:n `ad_storage`-oletusarvo on `denied`, tai tagin lataaminen on estetty Basic-tilassa.
- Clarityn molempien tallennustyyppien arvo on `DENIED`.

Suorita koodi uudelleen suostumuksen antamisen ja peruuttamisen jälkeen. Varmista, että suostumustilat päivittyvät molemmissa tapauksissa.

<div data-copy>

```js
(() => {

  // Määritellään funktion sisällä, jotta koodin voi suorittaa toistuvasti.
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
     MICROSOFT CLARITYN SUOSTUMUS
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
