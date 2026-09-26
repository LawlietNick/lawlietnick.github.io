---
layout: ../../../layouts/Base.astro
title: "Mikä on algoritmi? Selitys, esimerkit ja algoritmin ero prosessiin"
documentTitle: "Mikä on algoritmi? Esimerkit ja selitys | Niko Karppinen"
description: "Algoritmi on täsmällinen ja vaiheittainen toimintaohje, joka ratkaisee rajatun ongelman tai tuottaa määritellyn tuloksen. Katso käytännön esimerkit."
date: 2026-07-30
category: analytics
tags: ["algoritmit", "data", "päätöksenteko", "prosessit"]
image: /images/blog/what-is-an-algorithm-steps-and-process.jpeg
imageAlt: "Piirroskilpikonna osoittaa kahta taulua, joista toisessa algoritmi etenee syötteestä vaiheiden kautta tulokseen ja toisessa prosessi haarautuu ja palaa takaisin"
imageCredit: "Luotu OpenAI ImageGenillä"
relatedHeading: "Lisää käytännönläheisiä kirjoituksia"
about:
  - "Algoritmit"
  - "Algoritmin ja prosessin ero"
mentions:
  - "Sosiaalisen median syöte"
  - "Päätöksenteko"
---

Algoritmi kuulostaa helposti joltakin, joka asuu hakukoneen konehuoneessa ja ymmärtää vain matematiikkaa. Todellisuudessa algoritmi on **täsmällinen ja vaiheittainen toimintaohje, jonka avulla ratkaistaan rajattu ongelma tai tuotetaan määritelty lopputulos**.

Riittävän tarkka resepti muistuttaa algoritmia. Siinä määritellään käytettävät ainekset, suoritettavat vaiheet ja tavoiteltu lopputulos. Digitaalisessa palvelussa ainesten tilalla voi olla dataa, mutta perusidea on sama.

Pelkkä luettelo aineksista ja valmis kakku eivät silti muodosta algoritmia. Niiden väliin tarvitaan ohjeet, joiden perusteella suorittaja tietää, mitä tehdä jokaisessa vaiheessa. Ohjeen ei pitäisi nojata siihen, että joku arvaa puuttuvat kohdat tai tulkitsee ilmauksen ”paista sopivasti” samalla tavalla kuin ohjeen kirjoittaja.

<div class="algorithm-definition" role="group" aria-label="Algoritmin perusrakenne">
  <p class="algorithm-definition__label">Algoritmia voi kuvata kolmella osalla</p>
  <ol class="algorithm-flow">
    <li><span>01</span><strong>Syöte</strong><small>Mistä tiedosta tai tilanteesta aloitetaan?</small></li>
    <li><span>02</span><strong>Vaiheet</strong><small>Mitä tehdään ja millä ehdoilla?</small></li>
    <li><span>03</span><strong>Tulos</strong><small>Mitä suoritus tuottaa?</small></li>
  </ol>
</div>

> **Lyhyt vastaus:** algoritmi on riittävän täsmällinen sarja vaiheita, joilla lähtötilanteesta tuotetaan määritelty tulos.

Syöte, vaiheet ja tulos auttavat kuvaamaan algoritmin rakennetta. Ne eivät yksin todista, että jokin toiminta on algoritmi. Myös tavallisella työprosessilla, raportilla tai ihmisen tekemällä arviolla voi olla lähtötiedot ja lopputulos.

## Algoritmeja käytetään lähes kaikkialla

Algoritmeja ei käytetä vain sosiaalisen median suosituksiin. Niitä käytetään hakukoneissa, verkkokaupoissa, navigaattoreissa, tietojen lajittelussa ja toimiston jääkaapin täydentämisessä.

<div class="algorithm-examples" role="list" aria-label="Esimerkkejä algoritmien käyttökohteista">
  <div role="listitem"><span>Haku</span><p>Missä järjestyksessä sivut näytetään?</p></div>
  <div role="listitem"><span>Sosiaalinen media</span><p>Missä järjestyksessä julkaisut näytetään?</p></div>
  <div role="listitem"><span>Suoratoistopalvelu</span><p>Mitä katsottavaa suositellaan seuraavaksi?</p></div>
  <div role="listitem"><span>SEO-analyysi</span><p>Mihin järjestykseen löydetyt ongelmat asetetaan?</p></div>
  <div role="listitem"><span>Toimiston jääkaappi</span><p>Milloin juomia pitää tilata lisää?</p></div>
</div>

Kaikissa tapauksissa ratkaistaan rajattu tehtävä ennalta määriteltyjen vaiheiden avulla. Lopputulos voi olla päätös, laskettu arvo, järjestetty lista, suositus tai muunnettu tieto.

## Esimerkki 1: sosiaalisen median syöte

Sosiaalisen median palvelun pitää valita suuresta julkaisujoukosta, missä järjestyksessä julkaisut näytetään. Yksinkertaistettu algoritmi voi toimia näin:

<div class="algorithm-machine" role="group" aria-label="Sosiaalisen median algoritmin toiminta">
  <section>
    <p class="algorithm-machine__eyebrow">Syöte</p>
    <h3>Mitä tietoa käytetään?</h3>
    <ul>
      <li>Tarjolla olevat julkaisut</li>
      <li>Katsotut julkaisut</li>
      <li>Klikkaukset ja kommentit</li>
      <li>Jaetut sisällöt</li>
      <li>Seuratut tilit</li>
    </ul>
  </section>
  <div class="algorithm-machine__rules">
    <p class="algorithm-machine__eyebrow">Vaiheet</p>
    <ol>
      <li>Laske jokaiselle julkaisulle kiinnostavuutta kuvaava arvio.</li>
      <li>Järjestä julkaisut arvion perusteella.</li>
      <li>Valitse korkeimmat arviot saaneet julkaisut näytettäviksi.</li>
    </ol>
  </div>
  <section class="algorithm-machine__result">
    <p class="algorithm-machine__eyebrow">Tulos</p>
    <p>Julkaisut näytetään siinä järjestyksessä, jossa niiden arvioidaan kiinnostavan sinua.</p>
  </section>
</div>

Todelliset suosittelujärjestelmät käyttävät paljon enemmän tietoa ja monimutkaisempia laskentamalleja. Esimerkki näyttää silti niiden perusrakenteen: järjestelmä vastaanottaa tietoa, käsittelee vaihtoehdot määriteltyjen vaiheiden avulla ja tuottaa järjestetyn syötteen.

Tulos ei ole välttämättä hyvä vain siksi, että algoritmi suoritettiin oikein. Jos kiinnostavuutta mitataan huonoilla perusteilla, järjestelmä voi järjestää julkaisut täysin johdonmukaisesti ja silti ärsyttävästi. Kone teki työnsä. Työ vain määriteltiin huonosti.

## Esimerkki 2: toimiston jääkaapin juomatilanne

Algoritmin ei tarvitse yrittää ennustaa ihmisen mieltymyksiä. Se voi vastata myös hyvin konkreettiseen kysymykseen: **riittävätkö jääkaapin juomat seuraavaan täyttöön asti?**

<div class="inventory-example" role="group" aria-label="Toimiston jääkaapin juomatilannetta arvioivan algoritmin esimerkki">
  <div class="inventory-example__stock">
    <p class="algorithm-machine__eyebrow">Syöte tänään</p>
    <strong>36</strong>
    <span>juomaa jääkaapissa</span>
    <dl>
      <div><dt>Arvioitu kulutus</dt><dd>6 / päivä</dd></div>
      <div><dt>Seuraava täyttö</dt><dd>8 päivän kuluttua</dd></div>
    </dl>
  </div>
  <div class="inventory-example__calculation">
    <p class="algorithm-machine__eyebrow">Vaiheet</p>
    <p><b>6 × 8 = 48</b><br>Laske ennen täyttöä tarvittavien juomien määrä.</p>
    <p><b>36 − 48 = −12</b><br>Vertaa nykyistä määrää arvioituun tarpeeseen.</p>
  </div>
  <div class="inventory-example__decision">
    <p class="algorithm-machine__eyebrow">Tulos</p>
    <strong>Tilaa lisää</strong>
    <p>Vähintään 12 juomaa, käytännössä hieman enemmän turvamarginaaliksi.</p>
  </div>
</div>

Tämä on algoritmi, koska ratkaistava tehtävä ja suoritettavat vaiheet on määritelty. Sama laskenta voidaan tehdä uudelleen eri juomamäärällä, kulutusarviolla ja täyttöpäivällä.

Näin torstaina jääkaapissa on muutakin kuin valo ja yksi kaikkien välttelemä sitruunavesi.

## Miten algoritmi eroaa prosessista?

Prosessi ja algoritmi voivat esiintyä samassa työnkulussa, mutta ne kuvaavat eri asioita.

<div class="process-comparison">
  <section>
    <p class="algorithm-machine__eyebrow">Prosessi</p>
    <h3>Kuvaa koko työnkulun</h3>
    <ol>
      <li>Kerää data</li>
      <li>Tarkista sivut</li>
      <li>Priorisoi löydökset</li>
      <li>Raportoi</li>
    </ol>
    <p><strong>Vastaa:</strong> mitä työssä tehdään ja missä järjestyksessä?</p>
  </section>
  <section>
    <p class="algorithm-machine__eyebrow">Algoritmi</p>
    <h3>Ratkaisee rajatun tehtävän</h3>
    <dl>
      <div><dt>Syöte</dt><dd>Sivun liikenne, konversiot ja tekniset virheet</dd></div>
      <div><dt>Vaiheet</dt><dd>Laske sivun merkitys, arvioi virheen vakavuus ja yhdistä arviot</dd></div>
      <div><dt>Tulos</dt><dd>Korkea, keskitasoinen tai matala korjausprioriteetti</dd></div>
    </dl>
    <p><strong>Vastaa:</strong> millä täsmällisillä vaiheilla tulos tuotetaan?</p>
  </section>
</div>

**Prosessi kuvaa laajemman työnkulun. Algoritmi määrittelee, miten rajattu tehtävä suoritetaan tai yksittäinen tulos tuotetaan.**

Algoritmi voi olla yksi vaihe prosessin sisällä. SEO-auditoinnin prosessi voi esimerkiksi sisältää algoritmin, joka asettaa löydetyt ongelmat korjausjärjestykseen. Raportin kirjoittaminen tai asiakkaan kanssa keskusteleminen eivät silti muutu algoritmeiksi vain siksi, että ne ovat saman prosessin osia.

## Tuottaako algoritmi aina hyvän tuloksen?

Ei. Algoritmi voi suorittaa sille annetut vaiheet oikein ja tuottaa silti huonon tai hyödyttömän tuloksen.

Tuloksen laatu riippuu ainakin neljästä asiasta:

1. **Tehtävän määrittelystä.** Algoritmi voi ratkaista väärän ongelman erittäin tehokkaasti.
2. **Syötteen laadusta.** Puutteellinen tai virheellinen data heikentää tulosta.
3. **Vaiheiden oikeellisuudesta.** Virheellinen laskenta tai huonosti määritelty ehto tuottaa väärän tuloksen.
4. **Tavoitteen valinnasta.** Jonkun täytyy päättää, mitä hyvällä tuloksella tarkoitetaan.

<div class="algorithm-reminder">
  <p class="algorithm-reminder__mark" aria-hidden="true">!</p>
  <div>
    <h3>Algoritmi ei poista vastuuta</h3>
    <p>Se tekee suoritustavasta täsmällisen ja toistettavan. Ihmisen tehtäväksi jää määritellä tavoite, valita käytettävä tieto ja arvioida tuloksen seuraukset.</p>
  </div>
</div>

## Yhteenveto

Algoritmi on täsmällinen ja vaiheittainen toimintaohje, jonka avulla ratkaistaan rajattu ongelma tai tuotetaan määritelty tulos. Se voi järjestää hakutuloksia, laskea reitin, lajitella tietoja, priorisoida SEO-löydöksiä tai kertoa, milloin toimiston jääkaappiin pitää tilata lisää juomia.

Syöte, vaiheet ja tulos auttavat kuvaamaan algoritmin rakennetta. Algoritmin tunnistamiseen tarvitaan silti tarkempia kysymyksiä.

Kun haluat arvioida, onko jokin toiminta algoritmi, kysy:

1. Onko ratkaistava tehtävä tai tuotettava tulos rajattu selkeästi?
2. Onko toiminta kuvattu täsmällisinä ja suoritettavina vaiheina?
3. Onko jokaisessa vaiheessa selvää, mitä tehdään ja millä ehdolla siirrytään seuraavaan vaiheeseen?
4. Voidaanko sama ohje suorittaa uudelleen sallituilla lähtötiedoilla ilman, että suorittajan täytyy keksiä puuttuvia ohjeita?
5. Onko suorituksen tuottama tulos tai päättymisehto määritelty?

Jos kaikkiin kysymyksiin löytyy vastaus, toimintaa voidaan todennäköisesti kuvata algoritmina. Pelkkä syöte, jonkinlainen käsittely ja lopputulos eivät vielä riitä. Muuten lähes jokainen maanantaipalaverikin olisi algoritmi, eikä siihen ole syytä ryhtyä.