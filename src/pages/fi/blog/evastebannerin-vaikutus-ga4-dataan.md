---
layout: ../../../layouts/Base.astro
title: "Miten evästebanneri vaikuttaa GA4-dataan?"
description: "Miksi GA4:n luvut muuttuvat evästebannerin jälkeen? Basic- ja Advanced-toteutukset, mallinnus sekä Suomen ja muiden EU-maiden viranomaisohjeet."
date: 2026-10-23
category: privacy
image: /images/blog/cookie-consent-and-analytics-visibility.jpeg
imageAlt: "Violettisilmälasinen kilpikonna kurkistaa läpikuultavan analytiikkapaneelin taakse. Etualalla on evästesuostumuksen valintapaneeli ja taustalla haaleita tapahtumamerkkejä."
imageCredit: "Luotu OpenAI ImageGenillä"
tags: ["GA4", "Consent Mode", "CMP", "evästeet", "analytiikka"]
alternate:
  lang: en
  href: /blog/how-cookie-consent-affects-ga4-data/
about:
  - "Evästesuostumus"
  - "Google Consent Mode"
  - "Analytiikan raportointi"
mentions:
  - "Google Analytics 4"
  - "Traficom"
  - "EDPB"
  - "Cookiebot"
---

Sivustolle tuli evästebanneri. Kävijämäärä analytiikassa laski dramaattisesti. Onko mittaus rikki? Väheneekö liikenne oikeasti vai onko Elviksellä keikka? Saako puuttuvan datan jotenkin takaisin?

Vastaukset eivät varmasti löydy raportista. Ensin pitää selvittää, mitä mittauksessa muuttui. Banneri on yleensä Cookiebot tai jokin muu suostumuksenhallinta-alusta eli CMP, ja logiikka on miltei samanlainen kaikilla.

## Mitä banneri muuttaa mittauksessa?

Ennen banneria GA4 käynnistyi jokaisella sivulatauksella. Nyt se käynnistyy vasta, kun kävijä on hyväksynyt analytiikan. Osa hylkää evästeet. Osa poistuu valitsematta mitään. Raportoitu data pienenee, vaikka liikenne ei olisi muuttunut. [Googlen kuvaus suostumuksenhallinnasta](https://developers.google.com/tag-platform/security/concepts/consent-mode)

Jos käyttäjät putoavat bannerin julkaisupäivänä, älä syytä heti markkinointia. Selvitä ensin, mitä mittauksessa tapahtui.

Joskus evästebanneri latautuu liian hitaasti. Tai suostumuksen update-tapahtuma tulee myöhässä. Silloin analytiikan pingi ei lähde tarpeeksi aikaisin. Kävijä ehtii siirtyä seuraavalle sivulle, ennen kuin tapahtuma saadaan kiinni.

## Seuraa analytiikkaevästeiden hyväksyntäastetta

Hyväksyntäaste selittää usein ison osan muutoksesta. Seuraa nimenomaan analytiikkaevästeitä. Pelkkä "Hyväksy kaikki" -painikkeen käyttöaste ei riitä, koska kävijä voi sallia analytiikan ja hylätä markkinoinnin.

Tarkista CMP:n raportista, mistä joukosta aste lasketaan. Ovatko mukana kaikki bannerin nähneet vai vain valinnan tehneet? Entä ilman valintaa poistuneet ja aiemmin tallennetut suostumukset? Kirjaa laskentatapa ylös, jotta vertaat samaa asiaa eri jaksoilla.

Cookiebotin Consent Analytics näyttää kategoriakohtaiset luvut vain erikseen tehdyistä valinnoista. "Hyväksy kaikki" ja "Hylkää kaikki" puuttuvat niistä, joten ne pitää hakea erikseen. [Cookiebotin Consent Analytics -ohje](https://support.cookiebot.com/hc/en-us/articles/31161341107100-Consent-Analytics-Overview)

Merkitse kuvaajaan bannerin, CMP:n ja tagien muutospäivät. Hyväksyntäasteen lasku kertoo, että mittauksen kattavuus kannattaa tarkistaa. Koko liikennemuutosta se ei yksin selitä.

Älä tee hyväksyntäasteesta korjauskerrointa GA4:n lukuihin. Silloin oletat, että suostumuksen antaneet ja sen hylänneet käyttäytyvät samoin. Sitä oletusta on vaikea perustella. Googlen käyttäytymismallinnus arvioi puuttuvaa käyttäytymistä saman GA4-omaisuuden suostumuksen antaneiden käyttäjien perusteella. [Googlen kuvaus käyttäytymismallinnuksesta](https://support.google.com/analytics/answer/11161109?hl=en)

## Basic vai Advanced?

Google Consent Mode ohjaa Google-tagien toimintaa suostumuksen mukaan. Toteutustapoja on kaksi.

### Basic: mittaus alkaa suostumuksen jälkeen

Google-tagit pidetään estettyinä, kunnes suostumus on annettu. Ilman suostumusta GA4 ei lähetä Googlelle mitään.

<figure data-image-modal="/images/blog/consent-mode-basic-fi.jpeg" data-image-caption="Basic Consent Mode">

![Kolme suostumustilannetta: ennen valintaa ja valinnaisten evästeiden hylkäämisen jälkeen tiedonsiirto pysähtyy; hyväksymisen jälkeen mittaus voi käynnistyä GA4:ään, Meta Pixeliin ja muihin palveluihin.](@assets/blog/consent-mode-basic-fi.jpeg)

<figcaption>Googlen osalta kuva esittää Basic Consent Modea. Muiden tagien osalta se kuvaa suostumukseen perustuvaa estoa. Kukin tagi tarvitsee käyttötarkoituksensa mukaisen suostumuksen. Kuva luotu OpenAI ImageGenillä.</figcaption>
</figure>

### Advanced: rajattuja signaaleja ilman evästeitä

Google-tagit latautuvat jo ennen valintaa. Kun analytiikan oletustila on `denied`, ne voivat lähettää rajattuja mittaustietoja ilman analytiikkaevästeitä. Hyväksyminen sallii evästeiden käytön. [Googlen Basic- ja Advanced-vertailu](https://developers.google.com/tag-platform/security/concepts/consent-mode#basic_versus_advanced_consent_mode)

<figure data-image-modal="/images/blog/consent-mode-advanced-fi.jpeg" data-image-caption="Advanced Consent Mode">

![Advanced Consent Mode: rajattuja sinisiä mittaussignaaleja kulkee GA4:ään ennen valintaa ja analytiikan hylkäämisen jälkeen. Hyväksymisen jälkeen vihreä reitti kuvaa mittausta analytiikkaevästeillä.](@assets/blog/consent-mode-advanced-fi.jpeg)

<figcaption>Kuva esittää Googlen Advanced-toteutuksen teknistä toimintaa. Muiden palveluiden toiminta riippuu niiden omasta toteutuksesta. Kuvasta ei voi päätellä, että tietojen lähettäminen ilman suostumusta olisi kyseisessä tilanteessa sallittua. Kuva luotu OpenAI ImageGenillä.</figcaption>
</figure>

CMP:n asetuksissa näkyvä Consent Mode -valinta ei kerro, kumpi toteutus sivustolla toimii. Tarkista myös tagien lataussäännöt.

## Miksi lähetetty tapahtuma ei ole raportoitu käynti?

Advanced-toteutuksessa selaimesta lähtee mittauspyyntö, vaikka kävijä olisi hylännyt analytiikkaevästeet. Raportissa hän ei silti näy samalla tavalla kuin suostumuksen antanut. Ilman pysyvää tunnistetta GA4 ei voi yhdistää tapahtumia samaan käyttäjään. [Googlen selitys havaitun ja mallinnetun datan erosta](https://support.google.com/analytics/answer/11161109?hl=en)

Testaa siksi kaksi asiaa: lähteekö pyyntö ja näkyykö se käyttämässäsi raportissa.

## Voiko mallinnus täydentää puuttuvaa dataa?

GA4 voi arvioida käyttäytymistä, joka jää suostumuksen puuttuessa näkemättä. Se käyttää pohjana saman omaisuuden suostumuksen antaneita käyttäjiä. Mallinnus edellyttää Advanced-toteutusta ja riittävästi dataa:

- vähintään 1 000 tapahtumaa päivässä `analytics_storage='denied'` -tilassa vähintään seitsemän päivän ajan
- vähintään 1 000 päivittäistä käyttäjää, jotka lähettävät tapahtumia `analytics_storage='granted'` -tilassa vähintään seitsemänä päivänä edeltävien 28 päivän aikana.

Ehtojen täyttyminen ei takaa, että mallinnus on käytössä. Pienellä sivustolla data jää helposti alle rajojen, joten tarkista tilanne omasta GA4-omaisuudesta. Mallinnettu data ei myöskään siirry BigQuery-vientiin. [Googlen mallinnusvaatimukset ja rajoitukset](https://support.google.com/analytics/answer/11161109?hl=en)

## Saako evästeettömiä mittauspyyntöjä lähettää ilman suostumusta?

Ei välttämättä. Evästeettömyys ei yksin ratkaise suostumuksen tarvetta. Päätelaitteen tietojen käyttö ja henkilötietojen käsittely arvioidaan erikseen.

Euroopan tietosuojaneuvoston eli EDPB:n lopullinen ohje 2/2023 koskee sähköisen viestinnän tietosuojadirektiivin 5(3) artiklaa. Päätelaitteen suoja koskee tietoa riippumatta siitä, onko se henkilötietoa. Ohje käsittelee muun muassa pikseliseurantaa. [EDPB:n lopullinen ohje, erityisesti kohdat 6–10 ja 47–55](https://www.edpb.europa.eu/system/files/documents/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf)

Ohje ei nimeä Googlen Advanced Consent Modea eikä ratkaise suostumuspoikkeuksia. Näihin lähteisiin perustuva johtopäätökseni on, ettei evästeiden tai pysyvän tunnisteen puuttuminen vielä osoita, että pyynnöt saa lähettää ilman suostumusta.

### Mitä Suomen viranomaiset sanovat?

Traficomin evästeohje kattaa myös verkkokutsuihin perustuvat seurantapikselit, web beaconit ja tagit. Analytiikan välttämättömyys pitää perustella kyseisen palvelun kannalta. [Traficomin ohje, s. 3 ja 7](https://www.traficom.fi/files/media/file/Ev%C3%A4steohjeistus_palveluntarjoajille.pdf)

Forecaa koskevassa päätöksessään 12.6.2024 Traficom totesi, ettei pelkkä väite käyttäjien tunnistamattomuudesta riitä. Päätös mainitsee Consent Moden teknisenä mahdollisuutena, mutta ei arvioi Advanced-tilan evästeettömiä pyyntöjä. [Foreca-päätös, s. 26](https://www.kyberturvallisuuskeskus.fi/files/media/file/Foreca%20Oy.pdf)

Tarkistin 22.10.2026 suomalaiset viranomaisjulkaisut. Nimenomaista ratkaisua Googlen Advanced Consent Modesta ei löytynyt. Kyse on lähdehaun tuloksesta, joten älä lue Foreca-päätöksen mainintaa hyväksyntänä. Päätelaitteen tietojen käyttöä valvoo Suomessa Traficom ja henkilötietojen käsittelyä tietosuojavaltuutettu. [Traficomin ohje, s. 2](https://www.traficom.fi/files/media/file/Ev%C3%A4steohjeistus_palveluntarjoajille.pdf)

### Miksi eri maiden ohjeet näyttävät erilaisilta?

Viranomaiset eroavat siinä, millaista rajattua analytiikkaa saa tehdä ilman suostumusta. Mikään alla oleva ei ole Googlen Advanced-tilan hyväksyntä.

- **Ranska, CNIL.** Rajattu yleisömittaus voi vapautua suostumuksesta, jos se palvelee vain julkaisijan omaa tarvetta ja tuottaa anonyymejä tilastoja. Poikkeus ei automaattisesti koske GA4:ää. CNIL kieltää myös esittämästä ehtojen täyttymistä viranomaisen hyväksyntänä. [CNIL, 4.7.2025](https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience)
- **Alankomaat, ACM.** Vähäisiä yksityisyysvaikutuksia aiheuttavat analytiikkaevästeet voivat olla suostumuksesta vapaita. Pelkkä nimi "evästeetön analytiikka" ei riitä poikkeukseen. [ACM:n ohje](https://www.acm.nl/nl/verkoop-aan-consumenten/reclame-en-verleiden/online-beinvloeden/cookies-plaatsen)
- **Belgia, GBA/APD.** Analytiikkaevästeille ei FAQ:n mukaan ole yleistä poikkeusta edes ensimmäisen osapuolen evästeinä. Vastaus koskee evästeitä, ei kaikkia evästeettömiä toteutuksia. [GBA/APD, 17.11.2023](https://www.gegevensbeschermingsautoriteit.be/burger/faq/test)
- **Saksa, Baden-Württemberg.** Vanhempi FAQ kuvaa oikeutettua etua rajatussa palvelinpuolen analytiikassa, kun evästeitä ei käytetä ja tiedot anonymisoidaan ennen luovutusta. Se ei koske selaimesta suoraan Googlelle lähteviä Advanced-pyyntöjä. Oikeutettu etu ei myöskään syrjäytä päätelaitteen suostumusvaatimusta. [Viranomaisen FAQ](https://www.baden-wuerttemberg.datenschutz.de/faq-zu-cookies-und-tracking-2/)

## Mitä markkinoinnin vastuuhenkilö voi tehdä?

Aloita toteutuksen ja raportoinnin tarkistamisesta. CMP:n vaihtoa kannattaa miettiä vasta, kun nykyisen ongelman syy tunnetaan.

1. Kirjaa muutospäivä ja muutoksen sisältö. Lisättiinkö banneri, muutettiinko tagien lataussääntöjä vai vaihdettiinko CMP?
2. Pyydä toteuttajaa testaamaan kolme tilannetta: ennen valintaa, hyväksymisen jälkeen ja hylkäämisen jälkeen. Pyydä samalla kuvaus siitä, mitä selain lukee ja lähettää, kenelle ja mihin tarkoitukseen.
3. Tarkista hyväksyntäaste ja mallinnuksen tila. Muuttuiko analytiikkasuostumuksen osuus? Onko mallinnettua dataa käytössä?
4. Vertaa liiketoiminnan lukuihin, kuten verkkokaupan tilauksiin tai CRM:n yhteydenottoihin. Muista, että niilläkin on omat rajauksensa.
5. Merkitse mittaustavan muutos raporttiin. Ennen ja jälkeen kerätyt luvut eivät välttämättä ole vertailukelpoisia.

Kun GA4:n käyttäjämäärä laskee bannerimuutoksen yhteydessä, kysy ensin: mitä sivusto lähetti Googlelle ennen muutosta ja mitä se lähettää nyt?

Cookiebotin käytännön asennukseen löydät skriptit ja testausohjeet [Cookiebot-oppaasta](/fi/toteutusmallit/cookiebot-opas/).
