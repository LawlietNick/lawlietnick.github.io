---
layout: ../../../layouts/Base.astro
title: "Mitä lämpökartat eivät kerro verkkosivustosi käytöstä?"
description: "Lämpökartat näyttävät, miten sivustoa käytetään, mutta eivät aina anna riittävästi tietoa sisältöelementtien vertailuun."
date: 2026-10-10
category: analytics
tags: ["analytiikka", "lämpökartat", "sisältöseuranta", "Matomo", "Piwik PRO", "GA4"]
image: /images/blog/heatmaps-and-content-element-tracking.jpeg
imageAlt: "Kilpikonnahahmo vertailee verkkosivun lämpökarttaa ja sisältöelementtien näkyvyyttä sekä käyttöä kuvaavaa raporttia."
imageCredit: "Luotu OpenAI ImageGenillä"
alternate:
  lang: en
  href: /blog/heatmaps-and-content-element-tracking/
about:
  - "Sisältöelementtien näkyvyyden ja käytön seuranta"
  - "Verkkosivuston kehittäminen"
mentions:
  - "Matomo"
  - "Piwik PRO"
  - "Google Analytics 4"
  - "Microsoft Clarity"
citations:
  - name: "Clarity heatmaps overview"
    url: "https://learn.microsoft.com/en-us/clarity/heatmaps/heatmaps-overview"
  - name: "Matomo Content Tracking"
    url: "https://matomo.org/guide/reports/content-tracking/"
  - name: "Piwik PRO Content performance report"
    url: "https://help.piwik.pro/support/reports/content-performance-report/"
  - name: "Piwik PRO Content tracking setup"
    url: "https://help.piwik.pro/support/questions/set-up-content-tracking/"
  - name: "GA4 event parameters"
    url: "https://developers.google.com/analytics/devguides/collection/ga4/event-parameters"
---

Etusivun kuvallinen nosto kerää enemmän klikkauksia kuin palvelusivun nosto. Kannattaako palvelusivun nostoa muuttaa tai poistaa?

Pelkkä klikkausmäärä ei riitä päätökseen. Etusivulla on ehkä enemmän kävijöitä, ja nosto sijaitsee heti sivun alussa. Palvelusivulla vastaava elementti löytyy vasta pitkän tekstin jälkeen.

Lämpökartta auttaa näkemään, miten käyttäjät toimivat sivulla. Jos haluat vertailla samaa sisältöelementtiä eri puolilla verkkosivustoa, tarvitset rinnalle yhtenäisen mittausmallin.

Muuten raportti voi olla teknisesti oikein ja silti jättää päätöksen kannalta olennaisen tiedon kertomatta.

## Vertailun tulos voi kääntyä, kun näkyvyys otetaan huomioon

Ajatellaan kolmea kuvallista nostoa samalla sivustolla. Alla olevat luvut ovat havainnollistavia esimerkkejä, eivät mitattua asiakasdataa.

Esimerkissä näyttökerta tarkoittaa sitä, että elementti on täyttänyt ennalta sovitun näkyvyysehdon. Pelkkä elementin latautuminen sivulle ei riitä.

| Nosto | Näyttökerrat | Klikkaukset | Klikkaukset suhteessa näyttökertoihin |
|---|---:|---:|---:|
| A | 1 000 | 80 | 8 % |
| B | 200 | 40 | 20 % |
| C | 800 | 16 | 2 % |

Pelkkien klikkausten perusteella nostoa A käytetään eniten. Näyttökertoihin suhteutettuna noston B klikkausaste on korkein. Nosto C puolestaan saa paljon näyttökertoja mutta vähän käyttöä.

Tämä ei tee nostosta B automaattisesti parasta tai nostosta C huonoa. Luvut antavat kuitenkin paremman lähtökohdan selvittää, mistä erot syntyvät.

Ovatko nostot eri tarkoituksiin? Esiintyvätkö ne eri sivutyypeillä? Onko noston C kohderyhmä muita rajatumpi? Ymmärtääkö käyttäjä, että nostoa voi klikata?

## Lämpökartta auttaa tutkimaan sivua

Lämpökartasta voi tutkia esimerkiksi klikkausten sijoittumista ja sitä, kuinka pitkälle sivua vieritetään. Ominaisuudet vaihtelevat työkaluittain. Esimerkiksi Microsoft Clarityssä voi tarkastella elementtikohtaisia klikkauksia ja muodostaa lämpökartan myös sivuryhmästä. [Clarityn lämpökarttojen ohje](https://learn.microsoft.com/en-us/clarity/heatmaps/heatmaps-overview)

Lämpökarttojen avulla voidaan siis tutkia myös sivuryhmiä ja yksittäisiä elementtejä. Jos tavoitteena on kuitenkin seurata tietyn komponenttityypin näkyvyyttä ja käyttöä johdonmukaisesti koko sivustolla, kannattaa mittaus rakentaa osaksi sivuston komponenttirakennetta.

Miten kuvallisia nostoja käytetään eri sivuilla? Missä kehotepalkit saavat näkyvyyttä? Millä sivutyypeillä haitareita avataan?

Tätä varten suosittelen sisältöelementtien näkyvyyden ja käytön seurantaa.

## Yhteinen nimeäminen mahdollistaa elementtien vertailun

Seuranta rakennetaan sivustolla toistuviin elementteihin, joissa on jokin interaktiivinen osa. Näitä voivat olla kuvalliset nostot, uutislistaukset, kehotepalkit, tiedostolinkit ja haitarit.

Elementtityypille annetaan pysyvä nimi. Kuvallinen nosto pysyy samana elementtityyppinä, vaikka sen otsikko, kuva tai kohdesivu vaihtuu.

<figure>

![Etusivun ja palvelusivun kuvalliset nostot, kehotepalkit ja haitarit on rajattu seurattaviksi kokonaisuuksiksi. Numerot erottavat otsikkolinkin (1), painikkeen (2) ja haitarin avauksen (3).](@assets/blog/sisaltoelementtien-seuranta-fi.jpeg)

  <figcaption>Samaa elementtityyppiä voidaan seurata eri sivuilla ja sen sisältämät toiminnot erotella tarkempaa analyysiä varten. Kuva luotu tekoälyllä.</figcaption>
</figure>

Kuvan elementit on nimetty suomeksi havainnollisuuden vuoksi. Seurannassa suosittelen käyttämään samoja elementtityyppien ja toimintojen tunnisteita kaikissa kieliversioissa. Esimerkiksi kuvallinen nosto voi olla `image_card` sekä suomen- että englanninkielisellä sivulla. Käyttäjälle näkyvät otsikot ja painiketekstit voivat vaihtua kielen mukaan, mutta seurannan yhteisiä tunnisteita ei käännetä. Näin saman elementtityypin käyttöä voidaan tarkastella yhdessä koko sivustolla tai erikseen kieliversioittain.

Yksittäistä sisältöä tai toimintoa voidaan tarkentaa erillisellä sisältöpalan tiedolla. Se voi olla otsikko tai sovittu staattinen luokka. Tarkkuus valitaan kehittämiskysymyksen mukaan.

Matomo käyttää käsitteitä *content name*, *content piece* ja *content target*: sisältöelementin nimi, sisältöpala ja kohde. Sen sisältöseuranta raportoi näyttökerrat ja vuorovaikutukset rinnakkain ja laskee niistä vuorovaikutusasteen. [Matomon sisältöseurannan ohje](https://matomo.org/guide/reports/content-tracking/)

### Erota sisältöelementti sen sisältämistä toiminnoista

Seurattava sisältöelementti ja sen sisältämät toiminnot kannattaa erottaa toisistaan. Kuvallinen nosto voi sisältää otsikkolinkin, linkitetyn kuvan ja erillisen ”Lue artikkeli” -painikkeen. Koko nosto voi olla yksi seurattava elementti, jonka sisäiset klikkaukset lasketaan yhteen.

Jos halutaan tutkia, mitä noston osaa käyttäjät hyödyntävät, toiminnot erotellaan omalla tiedollaan. Näin voidaan tarkastella sekä noston kokonaiskäyttöä että otsikon, kuvan ja painikkeen käyttöä. Erottelu pitää suunnitella toteutukseen; samat sisältöpalan ja kohteen arvot eivät yksin kerro, mitä osaa klikattiin.

Kun seurantatietoihin tallennetaan myös sivun osoite, sivutyyppi ja kieli, tietoa voidaan tarkastella kahdesta suunnasta:

- Mitä elementtejä tietyllä sivulla nähdään ja käytetään?
- Millä sivuilla tiettyä elementtityyppiä nähdään ja käytetään?

Nimistä pitää myös sopia yhdessä. Kehittäjän, markkinointipäättäjän, sisällön suunnittelijan ja sivuston visuaalisen suunnittelijan on hyvä käyttää samoista elementeistä samoja termejä. Kun puhutaan esimerkiksi bannerista, kaikkien pitää ymmärtää, mitä komponenttia sillä tarkoitetaan. Samaa sanastoa käytetään suunnitelmissa, toteutuksessa ja analytiikan raporteissa.

Yhteisten nimien ansiosta tiedot voi yhdistää. Tulosten vertailu vaatii lisäksi johdonmukaiset mittausehdot ja ymmärrystä elementtien sijoittelusta sekä käyttäjien tarkoituksesta.

## Näyttökerta pitää määritellä

Eri mittausratkaisuissa elementin näyttökerta voidaan määritellä eri tavoin. Esimerkiksi Piwik PROssa voi valita, kirjataanko näyttökerta, kun sisältö latautuu sivulle vai kun kävijä vierittää sen näkyviin. Siksi on tärkeää erottaa toisistaan elementin latautuminen sivulle ja sen tuleminen selaimen näkyvälle alueelle.

Jos tavoitteena on arvioida näkyvyyttä, latautuminen ei yksin riitä. Käyttäjä ei välttämättä koskaan vieritä elementin kohdalle.

Mittauksen suunnittelussa sovitaan, millä ehdolla näyttökerta kirjataan ja miten toistuva näkyminen käsitellään. Jos tarvitaan tietty näkyvä osuus tai näkyvyyden kesto, niiden toteutus pitää tarkistaa valitussa työkalussa.

Myös mitattavan alueen pitää vastata kysymystä. Koko noston näkyminen ei välttämättä tarkoita, että sen alareunassa oleva painike näkyi.

Näyttökerta kertoo sovitun mittausehdon täyttymisestä. Se ei todista, että käyttäjä huomasi tai luki sisällön.

## Vähäinen käyttö ei aina tarkoita epäonnistumista

Interaktiivisen elementin ei tarvitse saada klikkausta jokaiselta käyttäjältä.

Opiskelijoille suunnattu nosto voi palvella kohderyhmäänsä, vaikka muut ohittavat sen. Yhteystietokortista käyttäjä voi lukea puhelinnumeron klikkaamatta kortin soittolinkkiä.

Myös vuorovaikutusasteen tulkinta vaatii tarkkuutta. Klikkaukset jaettuna näyttökerroilla on tapahtumien suhdeluku. Se ei automaattisesti kerro, kuinka suuri osuus yksittäisistä käyttäjistä klikkasi. Piwik PROn raportissa on myös yksilöidyt näyttökerrat ja vuorovaikutukset. Yksilöity vuorovaikutus lasketaan kerran istuntoa kohden, joten sekään ei kerro käyttäjien määrää. [Piwik PROn raporttiohje](https://help.piwik.pro/support/reports/content-performance-report/)

Samaa komponenttia kannattaa vertailla sivutyypin, laitteen ja sijoittelun mukaan. Etusivun ja palvelusivun käyttäjillä voi olla erilainen tarkoitus, vaikka elementin ulkoasu olisi sama.

## Sisältöseuranta kannattaa rakentaa osaksi sivuston komponentteja

Matomossa ja Piwik PROssa on valmis sisältöseurannan ominaisuus. Sivuston omat elementit pitää silti määritellä ja merkitä seurantaa varten. Piwik PROn käyttöönotto-ohje kuvaa tarvittavat merkinnät. [Piwik PROn sisältöseurannan käyttöönotto](https://help.piwik.pro/support/questions/set-up-content-tracking/)

GA4:ssä vastaava mittausmalli rakennetaan tapahtumista (event) ja niiden parametreista (event parameters). Omat parametrit näkyvät raporteissa vasta, kun niille on luotu mukautetut dimensiot tai mittarit (custom dimensions, custom metrics). [Googlen ohje tapahtumaparametreista](https://developers.google.com/analytics/devguides/collection/ga4/event-parameters)

Suosittelen toteuttamaan seurannan yhteisiin komponentteihin. Näin uusi nosto saa sovitut seurantatiedot automaattisesti, eikä sisällöntuottajan tarvitse lisätä teknisiä merkintöjä käsin.

Ylläpidossa elementtityypin seurannan pitäisi olla helppo ottaa käyttöön tai poistaa käytöstä koko sivustolla.

Alkupanostukseen kuuluvat yhteinen sanasto, mittauksen määrittely, komponenttien toteutus, raportointi ja testaus. Työn laajuus riippuu sivuston nykyisestä rakenteesta. Seuranta tarvitsee myöhemmin ylläpitoa, kun komponentit muuttuvat.

## Käytä havaintoja seuraavan kokeilun valintaan

Aloita muutamasta tärkeästä elementtityypistä ja päätöksestä, johon tarvitset tietoa.

Jos tärkeä nosto saa vähän näyttökertoja, tutki sen sijoittelua. Jos näyttökertoja on paljon mutta käyttöä vähän, selvitä sisällön relevanssia ja toiminnon selkeyttä.

Ylläpitäjä määrittelee kysymyksen ja elementin tavoitteen. Analytiikan asiantuntija ja kehittäjä toteuttavat mittauksen, jolla kysymystä voidaan tutkia.

Lämpökartat voivat auttaa tunnistamaan sivulta kohtia, joita kannattaa tutkia tarkemmin. Sisältöelementtien seuranta tuo rinnalle mahdollisuuden arvioida, miten samat komponentit saavat näkyvyyttä ja käyttöä eri puolilla sivustoa.

Kumpikaan mittaustapa ei yksin kerro, miksi käyttäjä teki tai jätti tekemättä jotakin.

Mittauksen arvo syntyy siitä, että sen avulla voidaan kysyä tarkempia kysymyksiä, tutkia havaittuja eroja ja päättää, mitä sivustolla kannattaa seuraavaksi testata.
