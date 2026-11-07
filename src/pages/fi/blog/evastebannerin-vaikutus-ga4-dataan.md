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

Sivustolle lisätään evästebanneri, ja GA4:n kävijämäärä laskee. Onko mittaus rikki? Vähenikö liikenne? Voiko puuttuvan datan saada takaisin?

Pelkkä GA4:n raportti ei vielä vastaa näihin kysymyksiin. Ensin pitää selvittää, mitä mittauksessa muuttui.

Samat kysymykset koskevat Cookiebotia ja muita suostumuksenhallinta-alustoja eli CMP:itä. Vaikutus riippuu kävijän valinnasta, tagien lataussäännöistä ja siitä, miten analytiikka käsittelee kerättyä tietoa.

## Mitä banneri muuttaa mittauksessa?

Jos GA4 on aiemmin käynnistynyt jokaisella sivulatauksella ja käynnistyy muutoksen jälkeen vasta analytiikkasuostumuksen saatuaan, raportoitavan datan määrä voi pienentyä. Osa kävijöistä hylkää analytiikkaevästeet. Osa poistuu tekemättä valintaa.

Suostumuksenhallinnassa kävijältä pyydetään valinta, valinta välitetään käytetyille palveluille ja tagit toimivat sen mukaisesti. Näkyvä banneri on osa tätä toteutusta. [Googlen kuvaus suostumuksenhallinnasta](https://developers.google.com/tag-platform/security/concepts/consent-mode)

Jos raportoidut käyttäjät vähenevät bannerin julkaisupäivänä, selvitä sekä liikenteen että mittauksen muutokset ennen johtopäätöstä markkinoinnin tuloksista.

## Seuraa analytiikkaevästeiden hyväksyntäastetta

Hyväksyntäaste auttaa selittämään, miksi GA4:n luvut muuttuvat. Jos aiempaa pienempi osuus kävijöistä hyväksyy analytiikkaevästeet, suostumukseen perustuvaan mittaukseen voi päätyä vähemmän käyttäjiä, vaikka sivuston todellinen liikenne pysyisi ennallaan. Basic-toteutuksessa tämä rajaa suoraan, keiltä GA4 voi kerätä tietoa. Advanced-toteutuksen raportteja tulkittaessa pitää huomioida myös mahdollinen mallinnus.

GA4:n kannalta seuraa juuri analytiikkaevästeiden hyväksyntää. Pelkkä ”Hyväksy kaikki” -painikkeen käyttöaste ei riitä, sillä kävijä voi sallia analytiikan ja hylätä markkinointievästeet.

Tarkista CMP:n raportista, mistä joukosta hyväksyntäaste lasketaan. Ovatko mukana kaikki bannerin nähneet vai vain valinnan tehneet? Miten raportti käsittelee ilman valintaa poistuneet ja aiemmin tallennetut suostumukset? Kirjaa laskentatapa, jotta vertaat eri ajanjaksoilla samaa asiaa. Banneriin vastanneiden hyväksyntäaste ei yksin kerro, kuinka suuri osa kaikista kävijöistä hyväksyi analytiikan.

Cookiebotin Consent Analytics näyttää hyväksymisiä ja hylkäyksiä ajan kuluessa. Sen kategoriakohtaiset luvut sisältävät kuitenkin ohjeen mukaan vain erikseen tehdyt kategoriavalinnat: ”Hyväksy kaikki” ja ”Hylkää kaikki” jäävät niistä pois. Analytiikan kokonaisosuuden selvittämiseen tarvitaan siis myös nämä valinnat. [Cookiebotin Consent Analytics -ohje](https://support.cookiebot.com/hc/en-us/articles/31161341107100-Consent-Analytics-Overview)

Vertaa hyväksyntäasteen ja GA4-lukujen kehitystä samoilta ajanjaksoilta. Merkitse mukaan bannerin, CMP:n ja tagien muutospäivät. Hyväksyntäasteen lasku antaa syyn tarkistaa mittauksen kattavuus, mutta ei yksin osoita koko liikennemuutoksen syytä.

Hyväksyntäasteesta ei pidä tehdä suoraa korjauskerrointa GA4:n lukuihin. Laskenta olettaisi esimerkiksi, että suostumuksen antaneet ja sen hylänneet käyttäytyvät samalla tavalla ja että CMP:n vertailujoukko vastaa korjattavaa GA4-mittaria. Oletukset pitäisi pystyä perustelemaan. Googlen käyttäytymismallinnus puolestaan arvioi puuttuvaa käyttäytymistä saman GA4-omaisuuden samankaltaisten, suostumuksen antaneiden käyttäjien perusteella. [Googlen kuvaus käyttäytymismallinnuksesta](https://support.google.com/analytics/answer/11161109?hl=en)

## Basic ja Advanced vaikuttavat siihen, mitä Googlelle lähetetään

Google Consent Mode ohjaa Google-tagien toimintaa suostumuksen perusteella. Sen voi toteuttaa kahdella tavalla.

### Basic: mittaus käynnistyy suostumuksen jälkeen

Basic-toteutuksessa Google-tagit pidetään estettyinä, kunnes tarvittava suostumus on saatu. Ilman suostumusta GA4-tagi ei lähetä mittaustietoja Googlelle.

<figure data-image-modal="/images/blog/consent-mode-basic-fi.jpeg" data-image-caption="Basic Consent Mode">

![Kolme suostumustilannetta: ennen valintaa ja valinnaisten evästeiden hylkäämisen jälkeen tiedonsiirto pysähtyy; hyväksymisen jälkeen mittaus voi käynnistyä GA4:ään, Meta Pixeliin ja muihin palveluihin.](@assets/blog/consent-mode-basic-fi.jpeg)

<figcaption>Googlen osalta kuva esittää Basic Consent Modea. Muiden tagien osalta se kuvaa suostumukseen perustuvaa estoa. Kukin tagi tarvitsee käyttötarkoituksensa mukaisen suostumuksen. Kuva luotu OpenAI ImageGenillä.</figcaption>
</figure>

### Advanced: rajattuja mittaussignaaleja ilman analytiikkaevästeitä

Advanced-toteutuksessa Google-tagit latautuvat jo ennen valintaa. Kun analytiikan oletustila on `denied`, ne voivat lähettää rajattuja mittaustietoja ilman analytiikkaevästeitä. Suostumuksen hyväksyminen sallii analytiikkaevästeiden käytön. [Googlen Basic- ja Advanced-vertailu](https://developers.google.com/tag-platform/security/concepts/consent-mode#basic_versus_advanced_consent_mode)

<figure data-image-modal="/images/blog/consent-mode-advanced-fi.jpeg" data-image-caption="Advanced Consent Mode">

![Advanced Consent Mode: rajattuja sinisiä mittaussignaaleja kulkee GA4:ään ennen valintaa ja analytiikan hylkäämisen jälkeen. Hyväksymisen jälkeen vihreä reitti kuvaa mittausta analytiikkaevästeillä.](@assets/blog/consent-mode-advanced-fi.jpeg)

<figcaption>Kuva esittää Googlen Advanced-toteutuksen teknistä toimintaa. Muiden palveluiden toiminta riippuu niiden omasta toteutuksesta. Kuvasta ei voi päätellä, että tietojen lähettäminen ilman suostumusta olisi kyseisessä tilanteessa sallittua. Kuva luotu OpenAI ImageGenillä.</figcaption>
</figure>

CMP:n asetuksissa näkyvä Consent Mode -valinta ei yksin kerro, kumpi toteutus sivustolla toimii. Myös tagien lataussäännöt pitää tarkistaa.

## Miksi lähetetty tapahtuma ei tarkoita raportoitua käyntiä?

Advanced-toteutuksessa selaimesta voi lähteä GA4:ään mittauspyyntö, vaikka kävijä olisi hylännyt analytiikkaevästeet. Tästä ei voi päätellä, että kävijä näkyisi raportissa samalla tavalla kuin suostumuksen antanut käyttäjä.

Ilman pysyvää tunnistetta GA4 ei voi suoraan yhdistää tapahtumia samaan käyttäjään. Useat sivunäytöt voivat kuulua yhdelle tai usealle ihmiselle. [Googlen selitys havaitun ja mallinnetun datan erosta](https://support.google.com/analytics/answer/11161109?hl=en)

Teknisessä testauksessa kannattaa siksi tarkistaa sekä mittaustietojen lähettäminen että niiden näkyminen käytetyssä raportissa.

## Voiko mallinnus täydentää puuttuvaa dataa?

GA4:n käyttäytymismallinnus arvioi suostumuksen puuttumisen vuoksi havaitsematta jäävää käyttäytymistä. Se hyödyntää saman GA4-omaisuuden suostumuksen antaneista käyttäjistä kerättyä tietoa.

Mallinnus edellyttää muun muassa Advanced-toteutusta sekä riittävää datamäärää:

- vähintään 1 000 tapahtumaa päivässä `analytics_storage='denied'` -tilassa vähintään seitsemän päivän ajan
- vähintään 1 000 päivittäistä käyttäjää, jotka lähettävät tapahtumia `analytics_storage='granted'` -tilassa vähintään seitsemänä päivänä edeltävien 28 päivän aikana.

Ehtojen täyttyminen ei vielä takaa mallinnuksen saatavuutta. Pienellä sivustolla datamäärä voi jäädä vaatimusten alle. Mallinnuksen käyttö ja saatavuus pitää tarkistaa omasta GA4-omaisuudesta. Raportteihin sisältyvä käyttäytymismallinnus ei myöskään siirry BigQuery-vientiin. [Googlen mallinnusvaatimukset ja rajoitukset](https://support.google.com/analytics/answer/11161109?hl=en)

## Saako evästeettömiä mittauspyyntöjä lähettää ilman suostumusta?

Evästeettömyys ei yksin ratkaise suostumuksen tarvetta. Arvioinnissa pitää erottaa päätelaitteen tietojen käyttö ja mahdollinen henkilötietojen käsittely.

Euroopan tietosuojaneuvoston eli EDPB:n lopullinen ohje 2/2023 käsittelee sähköisen viestinnän tietosuojadirektiivin 5(3) artiklan teknistä soveltamisalaa. Päätelaitteen suoja koskee tietoa riippumatta siitä, onko se henkilötietoa. Tallentaminen ja tietoihin pääsy ovat erillisiä arvioitavia toimintoja. Ohje käsittelee muun muassa pikseliseurantaa sekä päätelaitteella tuotetun tiedon lähettämistä kolmannelle osapuolelle. [EDPB:n lopullinen ohje, erityisesti kohdat 6–10 ja 47–55](https://www.edpb.europa.eu/system/files/documents/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf)

Ohje ei nimeä Googlen Advanced Consent Modea eikä ratkaise suostumuspoikkeuksia. Näihin lähteisiin perustuva johtopäätökseni on, ettei evästeiden tai pysyvän käyttäjätunnisteen puuttuminen vielä osoita, että mittauspyynnöt saa lähettää ilman suostumusta.

### Mitä Suomen viranomaiset sanovat?

Traficomin evästeohjeen soveltamisalaan kuuluvat myös verkkokutsuihin perustuvat seurantapikselit, web beaconit ja tagit. Ohje kuvaa pyyntöjä, joissa voi välittyä esimerkiksi IP-osoite, kellonaika ja selaimen tyyppi. Analytiikan välttämättömyys pitää puolestaan perustella kyseisen palvelun kannalta. [Traficomin ohje, s. 3 ja 7](https://www.traficom.fi/files/media/file/Ev%C3%A4steohjeistus_palveluntarjoajille.pdf)

Forecaa koskevassa päätöksessään 12.6.2024 Traficom toteaa, ettei pelkkä väite käyttäjien tunnistamattomuudesta riitä osoittamaan yksityisyyden suojaamista. Käyttäjän ei myöskään voida katsoa pyytäneen seurantaa vain siksi, että palvelua kehitetään. Päätös mainitsee Consent Moden teknisenä mahdollisuutena, mutta ei arvioi erikseen Advanced-tilan evästeettömiä pyyntöjä. [Foreca-päätös, s. 26](https://www.kyberturvallisuuskeskus.fi/files/media/file/Foreca%20Oy.pdf)

Tätä artikkelia varten 22.10.2026 tarkistetuista suomalaisista viranomaisjulkaisuista ei löytynyt nimenomaista ratkaisua, joka hyväksyisi tai kieltäisi Googlen Advanced Consent Moden evästeettömät pyynnöt sellaisinaan. Kyse on lähdehaun tuloksesta. Foreca-päätöksen Consent Mode -mainintaa ei pidä esittää Advanced-tilan hyväksyntänä.

Suomessa päätelaitteen tietojen käyttöä koskevaa sääntelyä valvoo Traficom ja henkilötietojen käsittelyä tietosuojavaltuutettu. [Traficomin ohje, s. 2](https://www.traficom.fi/files/media/file/Ev%C3%A4steohjeistus_palveluntarjoajille.pdf)

### Miksi eri maiden ohjeet näyttävät erilaisilta?

Viranomaisten julkaistuissa ohjeissa on eroja siinä, millaista rajattua analytiikkaa voidaan toteuttaa ilman suostumusta. Alla olevat linjaukset koskevat yleisiä edellytyksiä. Ne eivät ole Googlen Advanced-tilan tuotehyväksyntöjä.

**Ranska – CNIL.** Rajattu yleisömittaus voi vapautua suostumuksesta. Sen pitää palvella vain julkaisijan omaa mittaustarvetta ja tuottaa anonyymejä tilastoja. Tietojen yhdistelyä, sivustojen välistä seurantaa ja ei-anonyymien tietojen luovuttamista rajoitetaan. Poikkeus ei automaattisesti koske GA4:ää tai Advanced-pyyntöjä. [CNIL, 4.7.2025](https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience)

**Alankomaat – ACM.** Vähäisiä yksityisyysvaikutuksia aiheuttavat analytiikkaevästeet voivat olla suostumuksesta vapaita. Yksityisyyteen puuttuvat analytiikkaevästeet ja vastaavat seurantatekniikat edellyttävät suostumusta. Analytiikaksi tai evästeettömäksi nimetty palvelu ei tällä perusteella automaattisesti kuulu poikkeukseen. [ACM:n ohje](https://www.acm.nl/nl/verkoop-aan-consumenten/reclame-en-verleiden/online-beinvloeden/cookies-plaatsen)

**Belgia – GBA/APD.** Analytiikkaevästeille ei FAQ:n mukaan ole yleistä suostumuspoikkeusta edes ensimmäisen osapuolen evästeinä. Kävijöiden laskeminen ei lähtökohtaisesti ole käyttäjän pyytämän palvelun tarjoamiseksi välttämätöntä. Evästeitä käsittelevä vastaus ei ole kaikkien evästeettömien toteutusten kielto. [GBA/APD, 17.11.2023](https://www.gegevensbeschermingsautoriteit.be/burger/faq/test)

**Saksa – Baden-Württembergin tietosuojaviranomainen.** Vanhempi FAQ kuvaa mahdollisuutta käyttää oikeutettua etua rajatussa palvelinpuolen analytiikassa, kun evästeitä ei käytetä ja käyttötiedot anonymisoidaan kokonaan ennen kolmannelle luovuttamista. Tämä ei ole selaimesta suoraan Googlelle lähtevien Advanced-pyyntöjen hyväksyntä eikä koko Saksan kattava kanta. [Viranomaisen FAQ](https://www.baden-wuerttemberg.datenschutz.de/faq-zu-cookies-und-tracking-2/)

Esimerkiksi Ranskan poikkeuksen soveltuminen pitää osoittaa käytetyn palvelun ja sen asetusten osalta. CNIL myös kieltää esittämästä poikkeuksen ehtojen täyttymistä viranomaisen sertifiointina tai hyväksyntänä. [CNIL:n ohje](https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience)

### Mitä toteutuksesta pitää selvittää?

Pyydä toteuttajalta kuvaus siitä, mitä selain lukee ja lähettää ennen valintaa, hylkäämisen jälkeen ja hyväksymisen jälkeen. Selvitä myös vastaanottajat, käyttötarkoitukset ja mahdollisen anonymisoinnin vaihe.

Päätelaitteen tietoihin pääsyn mahdollinen suostumusvaatimus pitää arvioida erikseen henkilötietojen käsittelyperusteesta. Mahdollinen oikeutettu etu ei sellaisenaan syrjäytä päätelaitteen tietojen käyttöä koskevaa suostumusvaatimusta. [Baden-Württembergin viranomaisen erottelu](https://www.baden-wuerttemberg.datenschutz.de/faq-zu-cookies-und-tracking-2/)

## Mitä markkinoinnin vastuuhenkilö voi tehdä?

Aloita toteutuksen ja raportoinnin tarkistamisesta. CMP:n vaihtaminen kannattaa arvioida vasta, kun nykyisen ongelman syy tunnetaan.

1. Kirjaa muutospäivä ja muutoksen sisältö. Lisättiinkö banneri, muutettiinko tagien lataussääntöjä vai vaihdettiinko suostumuksenhallinta-alustaa?
2. Pyydä testaamaan kolme tilannetta: ennen valintaa, hyväksymisen jälkeen ja hylkäämisen jälkeen. Selvitä samalla ilman suostumusta tapahtuvan tiedonsiirron perusteet.
3. Tarkista hyväksyntäaste ja mallinnuksen tila. Muuttuiko analytiikkasuostumuksen osuus? Käytetäänkö raportissa mallinnettua tietoa, ja onko sitä saatavilla?
4. Vertaa liiketoiminnan lukuihin, kuten verkkokaupan tilauksiin tai CRM:ään kirjattuihin yhteydenottoihin. Selvitä myös näiden lähteiden rajaukset.
5. Merkitse mittaustavan muutos raporttiin. Ennen muutosta ja sen jälkeen kerätyt luvut eivät välttämättä ole suoraan vertailukelpoisia.

Kun GA4:n käyttäjämäärä laskee bannerimuutoksen yhteydessä, selvitä ensin, mitä sivusto lähetti Googlelle ennen muutosta ja mitä se lähettää nyt.

Cookiebotin käytännön asennukseen löydät skriptit ja testausohjeet [Cookiebot-oppaasta](/fi/toteutusmallit/cookiebot-opas/).
