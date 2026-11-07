---
layout: ../../../layouts/Base.astro
title: "Miksi GA4:n kävijämäärä laskee evästebannerin jälkeen?"
description: "Miksi GA4:n kävijä- ja istuntomäärät muuttuvat evästebannerin jälkeen, miksi hyväksyntäasteesta ei voi laskea puuttuvaa liikennettä ja mitä tästä voi päätellä?"
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

## Mitä evästebanneri muuttaa mittauksessa?

Ennen banneria GA4 käynnistyi jokaisella sivulatauksella. Nyt se käynnistyy vasta, kun kävijä on hyväksynyt analytiikan. Osa hylkää evästeet. Osa poistuu valitsematta mitään. Raportoitu data pienenee, vaikka liikenne ei olisi muuttunut. [Googlen kuvaus suostumuksenhallinnasta](https://developers.google.com/tag-platform/security/concepts/consent-mode)

Jos käyttäjät putoavat bannerin julkaisupäivänä, älä syytä heti markkinointia. Selvitä ensin, mitä mittauksessa tapahtui.

Mittauskatoa voi syntyä myös toteutusvirheestä. Joskus evästebanneri latautuu liian hitaasti. Tai suostumuksen update-tapahtuma tulee myöhässä. Silloin analytiikan pingi ei lähde tarpeeksi aikaisin. Kävijä ehtii siirtyä seuraavalle sivulle, ennen kuin tapahtuma saadaan kiinni.

## Miksi hyväksyntäaste ei kerro GA4:n mittauksen kattavuutta?

Houkutteleva ajatus menee näin: CMP kertoo, että 67 % hyväksyi analytiikan, joten GA4 näkee 67 % liikenteestä. Se ei pidä paikkaansa. 67 prosentin hyväksyntäaste ei tarkoita 33 prosentin mittauskatoa.

Syy on se, että puhumme kolmesta eri asiasta:

- **Suostumuksen hyväksyntäaste** kuvaa suostumusvalintoja CMP:n käyttämällä laskentatavalla.
- **Mittauksen kattavuus** kuvaa, kuinka suuri osa todellisesta käyttäytymisestä tulee mitatuksi. Sitä ei välttämättä näe suoraan GA4:n eikä CMP:n raporteista.
- **GA4:n raportoitu liikenne** on GA4:n määritelmien mukaan havaittua liikennettä. Raportointitavasta riippuen mukana voi olla mallinnettua käyttäytymistä.

Tähän kuuluu vielä käyttäjien, istuntojen, sivun katseluiden ja tapahtumien erottaminen toisistaan. Ne ovat eri mittareita, eikä yhden jakaumaa voi soveltaa toiseen.

### Miksi laskelma ei toimi?

**Suostumus voi olla voimassa pitkään.** Suostumus voi olla voimassa esimerkiksi 12 kuukautta. Kävijä hyväksyy analytiikan tammikuussa ja käy sivustolla useita kertoja seuraavina kuukausina. Näillä käynneillä ei synny uutta valintaa. Sama koskee analytiikan hylänneitä, koska heidänkin valintansa voi säilyä.

**Uudet valinnat eivät edusta kaikkia kävijöitä.** Jos CMP raportoi jakson uusia suostumusvalintoja, raportissa ei välttämättä ole kaikkia kävijöitä, joilla on jo voimassa oleva suostumus. Uusien valintojen määrä voi olla pieni suhteessa liikenteeseen. GA4:n istunnot ja CMP:n uudet valinnat eivät siis kuvaa samaa joukkoa.

<figure>
<p style="margin:0 0 0.5rem;font-weight:var(--font-weight-strong)">Yksi suostumus, monta käyntiä</p>
<p style="margin:0 0 0.75rem;font-size:0.9rem"><span style="margin-right:1.25rem;white-space:nowrap"><span style="display:inline-block;width:0.9rem;height:0.9rem;border-radius:2px;margin-right:0.5rem;vertical-align:-0.1rem;background:var(--color-accent)"></span>Käynnit</span><span style="white-space:nowrap"><span style="display:inline-block;width:0.9rem;height:0.9rem;border-radius:2px;margin-right:0.5rem;vertical-align:-0.1rem;background:var(--color-pop);border:2px solid var(--color-ink)"></span>Uudet analytiikkasuostumuksen hyväksynnät</span></p>
<svg viewBox="0 0 480 276" width="560" role="img" aria-labelledby="yksi-suostumus-title yksi-suostumus-desc" style="display:block;width:100%;max-width:560px;height:auto;margin-inline:auto">
<title id="yksi-suostumus-title">Yksi suostumus, monta käyntiä</title>
<desc id="yksi-suostumus-desc">Ryhmitelty pylväskaavio yhden kuvitteellisen käyttäjän neljästä viikosta. Käyntejä oli viikolla 1 kolme, viikolla 2 kuusi, viikolla 3 neljä ja viikolla 4 yhdeksän. Uusia analytiikkasuostumuksen hyväksyntöjä oli vain viikolla 1, yksi. Viikoilla 2, 3 ja 4 niitä oli nolla.</desc>
<line x1="40" x2="476" y1="244.0" y2="244.0" style="stroke:var(--color-line);stroke-width:1"/>
<text x="30" y="250.0" font-size="19" text-anchor="end" style="font-family:var(--font-body);fill:var(--color-muted)">0</text>
<line x1="40" x2="476" y1="170.7" y2="170.7" style="stroke:var(--color-line);stroke-width:1"/>
<text x="30" y="176.7" font-size="19" text-anchor="end" style="font-family:var(--font-body);fill:var(--color-muted)">3</text>
<line x1="40" x2="476" y1="97.3" y2="97.3" style="stroke:var(--color-line);stroke-width:1"/>
<text x="30" y="103.3" font-size="19" text-anchor="end" style="font-family:var(--font-body);fill:var(--color-muted)">6</text>
<line x1="40" x2="476" y1="24.0" y2="24.0" style="stroke:var(--color-line);stroke-width:1"/>
<text x="30" y="30.0" font-size="19" text-anchor="end" style="font-family:var(--font-body);fill:var(--color-muted)">9</text>
<rect x="53.5" y="170.7" width="38" height="73.3" rx="2" style="fill:var(--color-accent)"/>
<text x="72.5" y="164.7" font-size="19" text-anchor="middle" style="font-family:var(--font-body);fill:var(--color-ink)">3</text>
<rect x="97.5" y="219.6" width="38" height="24.4" rx="2" style="fill:var(--color-pop);stroke:var(--color-ink);stroke-width:2"/>
<text x="116.5" y="213.6" font-size="19" text-anchor="middle" style="font-family:var(--font-body);fill:var(--color-ink)">1</text>
<text x="94.5" y="270" font-size="19" text-anchor="middle" style="font-family:var(--font-body);fill:var(--color-muted)">Viikko 1</text>
<rect x="162.5" y="97.3" width="38" height="146.7" rx="2" style="fill:var(--color-accent)"/>
<text x="181.5" y="91.3" font-size="19" text-anchor="middle" style="font-family:var(--font-body);fill:var(--color-ink)">6</text>
<text x="225.5" y="238.0" font-size="19" text-anchor="middle" style="font-family:var(--font-body);fill:var(--color-ink)">0</text>
<text x="203.5" y="270" font-size="19" text-anchor="middle" style="font-family:var(--font-body);fill:var(--color-muted)">Viikko 2</text>
<rect x="271.5" y="146.2" width="38" height="97.8" rx="2" style="fill:var(--color-accent)"/>
<text x="290.5" y="140.2" font-size="19" text-anchor="middle" style="font-family:var(--font-body);fill:var(--color-ink)">4</text>
<text x="334.5" y="238.0" font-size="19" text-anchor="middle" style="font-family:var(--font-body);fill:var(--color-ink)">0</text>
<text x="312.5" y="270" font-size="19" text-anchor="middle" style="font-family:var(--font-body);fill:var(--color-muted)">Viikko 3</text>
<rect x="380.5" y="24.0" width="38" height="220.0" rx="2" style="fill:var(--color-accent)"/>
<text x="399.5" y="18.0" font-size="19" text-anchor="middle" style="font-family:var(--font-body);fill:var(--color-ink)">9</text>
<text x="443.5" y="238.0" font-size="19" text-anchor="middle" style="font-family:var(--font-body);fill:var(--color-ink)">0</text>
<text x="421.5" y="270" font-size="19" text-anchor="middle" style="font-family:var(--font-body);fill:var(--color-muted)">Viikko 4</text>
</svg>
<div class="visually-hidden">
<table>
<caption>Yhden kuvitteellisen käyttäjän käynnit ja uudet analytiikkasuostumuksen hyväksynnät viikoittain</caption>
<thead><tr><th scope="col">Viikko</th><th scope="col">Käynnit</th><th scope="col">Uudet analytiikkasuostumuksen hyväksynnät</th></tr></thead>
<tbody>
<tr><th scope="row">1</th><td>3</td><td>1</td></tr>
<tr><th scope="row">2</th><td>6</td><td>0</td></tr>
<tr><th scope="row">3</th><td>4</td><td>0</td></tr>
<tr><th scope="row">4</th><td>9</td><td>0</td></tr>
</tbody>
</table>
</div>
<figcaption>Yksi käyttäjä tekee 22 käyntiä mutta antaa suostumuksen vain kerran. Voimassa oleva suostumus mahdollistaa mittauksen myöhemmilläkin käynneillä. Esimerkki on kuvitteellinen.</figcaption>
</figure>

CMP:t myös raportoivat eri tavoin, joten älä oleta, että hyväksyntäaste lasketaan kaikilla samoin. Tarkista, mistä joukosta aste lasketaan. Ovatko mukana kaikki bannerin nähneet vai vain valinnan tehneet? Entä aiemmin tallennetut suostumukset? Kirjaa laskentatapa ylös, jotta vertaat samaa asiaa eri jaksoilla.

Cookiebotin Consent Analytics näyttää kategoriakohtaiset luvut vain erikseen tehdyistä valinnoista. "Hyväksy kaikki" ja "Hylkää kaikki" puuttuvat niistä, joten ne pitää hakea erikseen. [Cookiebotin Consent Analytics -ohje](https://support.cookiebot.com/hc/en-us/articles/31161341107100-Consent-Analytics-Overview)

**Käyttäjä ei ole istunto.** Yksi suostumuksen antanut käyttäjä voi synnyttää monta GA4-istuntoa. Yksi analytiikan hylännyt käyttäjä voi myös käydä useita kertoja. Valintojen jakaumaa ei voi sellaisenaan soveltaa istuntoihin.

**Osa poistuu valitsematta mitään.** Se, miten he näkyvät CMP:n raportissa, riippuu raportin määrittelystä.

**Toteutus ratkaisee, mitä tageille tapahtuu.** Hyväksyntäaste ei kerro, onko sivustolla Basic vai Advanced. Siitä lisää seuraavassa osiossa.

### Esimerkki

Alla olevat luvut ovat kuvitteellisia. Ne eivät ole tutkimustuloksia eivätkä kuvaa mitään todellista sivustoa.

| Mittari | Esimerkkiluku |
|---|---:|
| Tarkastelujakson uudet suostumusvalinnat | 1 000 |
| Analytiikan hyväksyneet | 670 |
| Analytiikan hylänneet | 330 |
| Uusien valintojen hyväksyntäaste | 67 % |
| GA4:n raportoimat istunnot | 15 000 |

Virheellinen laskelma näyttäisi tältä: 15 000 / 0,67 ≈ 22 388. Lopputulos näyttää tarkalta, mutta se ei ole perusteltu arvio todellisesta liikenteestä.

Tuhat uutta valintaa kertoo vain, mitä tuhat ihmistä päätti jakson aikana. Se ei kerro, kuinka monta kävijää sivustolla kävi. Se ei myöskään kerro, kuinka moni heistä oli tehnyt valintansa jo aiemmin. Istuntoja taas voi syntyä kävijöistä, joiden suostumus on tallessa kuukausien takaa, ja yhdestä kävijästä monta. Jakaja ja jaettava ovat eri joukoista.

## Miten Basic ja Advanced Consent Mode eroavat?

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

### Miksi lähetetty tapahtuma ei ole raportoitu käynti?

Advanced-toteutuksessa selaimesta lähtee mittauspyyntö, vaikka kävijä olisi hylännyt analytiikkaevästeet. Raportissa hän ei silti näy samalla tavalla kuin suostumuksen antanut. Ilman pysyvää tunnistetta GA4 ei voi yhdistää tapahtumia samaan käyttäjään. [Googlen selitys havaitun ja mallinnetun datan erosta](https://support.google.com/analytics/answer/11161109?hl=en)

Testaa siksi kaksi asiaa: lähteekö pyyntö ja näkyykö se käyttämässäsi raportissa.

## Voiko GA4 täydentää puuttuvaa liikennettä mallinnuksella?

GA4 voi arvioida käyttäytymistä, joka jää suostumuksen puuttuessa näkemättä. Se käyttää pohjana saman omaisuuden suostumuksen antaneita käyttäjiä. Mallinnus edellyttää Advanced-toteutusta ja riittävästi dataa:

- vähintään 1 000 tapahtumaa päivässä `analytics_storage='denied'` -tilassa vähintään seitsemän päivän ajan
- vähintään 1 000 päivittäistä käyttäjää, jotka lähettävät tapahtumia `analytics_storage='granted'` -tilassa vähintään seitsemänä päivänä edeltävien 28 päivän aikana.

Ehtojen täyttyminen ei takaa, että mallinnus on käytössä. Googlen mukaan malli huomioi myös esimerkiksi uusien ja palaavien käyttäjien suhteen sekä käyttäjä- ja istuntomäärät. Pienellä sivustolla data jää helposti alle rajojen, joten tarkista tilanne omasta GA4-omaisuudesta.

Mallinnettu data näkyy vain, kun raportointitunnisteeksi on valittu Blended. Se koskee esimerkiksi käyttäjiä, istuntoja ja uusia käyttäjiä, ei tapahtumamääriä. BigQuery-vienti ei tue mallinnettua dataa. [Googlen mallinnusvaatimukset ja rajoitukset](https://support.google.com/analytics/answer/11161109?hl=en)

Mallinnus ei siis palauta kaikkea puuttuvaa tietoa. Se on arvio, ei mitattu luku.

## Miten selvität, mistä GA4:n liikennemuutos johtuu?

Käy läpi nämä:

- **Mittausmuutoksen ajankohta.** Merkitse kuvaajaan bannerin, CMP:n ja tagien muutospäivät.
- **Toiminta ennen valintaa ja sen jälkeen.** Miten CMP ja Google-tagit toimivat ennen valintaa, hyväksymisen jälkeen ja hylkäämisen jälkeen?
- **Suostumusraportoinnin määritelmät.** Mistä joukosta CMP laskee hyväksyntäasteen?
- **Tekniset mittausongelmat.** Latautuuko banneri ja lähteekö update-tapahtuma ajoissa?
- **Mallinnuksen tila.** Onko mallinnus käytössä ja näkyykö se käyttämässäsi raportissa?
- **Liiketoiminnan luvut.** Vertaa verkkokaupan tilauksiin tai CRM:n yhteydenottoihin.

Nämä luvut ovat vertailupisteitä. Ne eivät kerro sivustoliikenteen absoluuttista määrää, ja niilläkin on omat rajauksensa. Mittausmuutoksen jälkeiset luvut eivät välttämättä ole myöskään vertailukelpoisia aiempiin.

Hyväksyntäasteen lasku kertoo, että mittauksen kattavuus kannattaa tarkistaa. Koko liikennemuutosta se ei yksin selitä.

## Saako mittaussignaaleja lähettää ilman suostumusta?

Ei välttämättä. Tekninen mahdollisuus ja oikeudellinen sallittavuus ovat eri asioita. Advanced voi teknisesti lähettää rajattuja signaaleja ilman evästeitä. Se ei kerro, saako niin tehdä. Evästeettömyys ei yksin ratkaise suostumuksen tarvetta, koska päätelaitteen tietojen käyttö ja henkilötietojen käsittely arvioidaan erikseen.

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

## Mitä markkinoinnin vastuuhenkilön kannattaa tehdä?

Aloita toteutuksen ja raportoinnin tarkistamisesta. CMP:n vaihtoa kannattaa miettiä vasta, kun nykyisen ongelman syy tunnetaan.

1. Kirjaa muutospäivä ja muutoksen sisältö. Lisättiinkö banneri, muutettiinko tagien lataussääntöjä vai vaihdettiinko CMP?
2. Pyydä toteuttajaa testaamaan kolme tilannetta: ennen valintaa, hyväksymisen jälkeen ja hylkäämisen jälkeen. Pyydä samalla kuvaus siitä, mitä selain lukee ja lähettää, kenelle, mihin tarkoitukseen ja missä vaiheessa mahdollinen anonymisointi tapahtuu.
3. Kysy CMP:n hyväksyntäasteen määritelmä ja perusjoukko.
4. Merkitse mittaustavan muutos raporttiin ja kerro siitä lukijoille. Ennen ja jälkeen kerätyt luvut eivät välttämättä ole suoraan vertailukelpoisia. Älä esitä korjattua lukua ilman perusteltuja oletuksia.

Kun GA4:n käyttäjämäärä laskee bannerimuutoksen yhteydessä, kysy ensin: mitä sivusto lähetti Googlelle ennen muutosta ja mitä se lähettää nyt?

Cookiebotin käytännön asennukseen löydät skriptit ja testausohjeet [Cookiebot-oppaasta](/fi/toteutusmallit/cookiebot-opas/).
