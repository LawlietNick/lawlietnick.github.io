---
layout: ../../../layouts/Base.astro
title: "Miten saat tilaajana kaiken irti markkinoinnin dashboard-projektista?"
description: "Dashboard-projektin hyöty riippuu tilaajan päätöksistä: tavoitteista, mittareista, vertailuista ja vastuista. Tässä kuusi päätöstä ja tarkistuslista."
date: 2026-11-07
category: reporting
tags: ["dashboard", "raportointi", "Data Studio", "mittarit", "mittaus"]
draft: true
image: /images/blog/how-to-get-the-most-out-of-your-dashboard-project.jpeg
imageAlt: "Kilpikonna asettaa keltaisen tavoitelaatan paikalleen. Vieressä sama tavoitemerkki näkyy dashboardin viivakaaviossa."
imageCredit: "Luotu OpenAI ImageGenillä"
citations:
  - name: "Google Analytics Help: Enhanced measurement events"
    url: "https://support.google.com/analytics/answer/9216061"
  - name: "Google Analytics Help: Understand (direct) / (none) traffic"
    url: "https://support.google.com/analytics/answer/15258820"
  - name: "arXiv: Semantic Layers for Reliable LLM-Powered Data Analytics (2604.25149)"
    url: "https://arxiv.org/abs/2604.25149"
  - name: "Google Cloud Blog: Looker Studio is Data Studio"
    url: "https://cloud.google.com/blog/products/data-analytics/looker-studio-is-data-studio"
---

<style>
.tldr{position:relative;margin:2.25rem 0 2.25rem;padding:1.6rem 1.25rem 1.1rem;border:2px solid var(--ink);border-radius:var(--radius-xs,.25rem);background:var(--color-surface);box-shadow:.4rem .4rem 0 var(--ink)}
.tldr .tag{position:absolute;top:0;left:1rem;transform:translateY(-50%);padding:.4rem .7rem;border:2px solid var(--ink);border-radius:var(--radius-xs,.25rem);background:var(--pop);color:oklch(20% .01 286);font:700 .8rem/1 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.06em;text-transform:uppercase}
.tldr dl{display:grid;grid-template-columns:max-content 1fr;gap:.8rem 1.25rem;margin:0}
.tldr dt{margin:0;color:var(--muted);font:700 .75rem/1.9 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.06em;text-transform:uppercase}
.tldr dd{margin:0}
@media (max-width:34rem){.tldr dl{grid-template-columns:1fr;gap:.1rem}.tldr dd{margin-bottom:.8rem}}
</style>
<aside class="tldr" aria-label="Lyhyesti">
<span class="tag" aria-hidden="true">TL;DR</span>
<dl>
<dt>Kenelle</dt>
<dd>Sinulle, joka tilaat markkinoinnin dashboardin etkä rakenna sitä itse.</dd>
<dt>Pääväite</dt>
<dd><strong>Dashboardin onnistuminen alkaa tilaajan päätöksistä.</strong> Ne määrittävät, mitä mitataan, miten tuloksia tulkitaan ja mihin raportointia käytetään. Kuusi päätöstä muodostaa perustan onnistuneelle projektille: tavoite, päätökset, onnistumisen määritelmä, vertailut, tietolähteet ja hyväksyntä.</dd>
<dt>Mitä saat</dt>
<dd>Päätöspolun, vastuutaulukon (kuka päättää mitä) ja tarkistuslistan, joka kertoo, mistä aloitat.</dd>
<dt>Ei sinulle</dt>
<dd>Jos haluat oppia rakentamaan dashboardin itse.</dd>
<dt>Jos on kiire</dt>
<dd>Hyppää suoraan <a href="#tarkistuslista-ennen-dashboard-projektia">tarkistuslistaan</a> ja ota avoimet kohdat mukaan ensimmäiseen palaveriin.</dd>
</dl>
</aside>

Mitä menettäisitte, jos verkkosivunne olisi puoli vuotta pois käytöstä?

Kysymys ei kuulosta raportoinnilta, mutta se on silti hyvä tapa aloittaa dashboard-projekti, koska vastaus kertoo, mitä sivustolta oikeasti odotetaan. Myyntiä, yhteydenottoja, asiakaspalvelua, tietoa vai tunnettuutta?

Verkkosivun pitäisi olla yksi organisaation parhaista myyjistä, ei käyntikortti. Selkeä tarkoitus näyttää raportoinnille suunnan. Mikäli verkkosivuston tarkoitus on hukassa, aloita siitä. Sen määrittely kantaa pitkälle.

Kaikkien päätösten ei tarvitse olla valmiita ennen kuin tilaat dashboardin. Projektin ensimmäinen vaihe voi olla juuri oikeiden kysymysten ja päätösten määrittely yhdessä toimittajan kanssa. Hyvä toimittaja auttaa siinä.

Tämä teksti on sinulle, joka tilaat markkinoinnin raportoinnin mutta et rakenna sitä itse. Oletko yrittäjä, markkinointipäällikkö vai johtaja, sillä ei ole väliä. Kerronpa kuusi päätöstä, jotka kuuluvat sinulle, ja mitä tapahtuu, jos ne jäävät tekemättä.

## Dashboard-projekti alkaa päätöksistä, ei kaavioista

Dashboardin onnistuminen ei riipu pelkästään toteuttajasta. Sinun päätöksesi määrittävät, mitä mitataan, miten tuloksia luetaan ja mitä päätöksiä raportilla voi tehdä.

Sinun ei tarvitse osata rakentaa dashboardia, sillä SQL-kyselyt ja tapahtumaseuranta Google Tag Managerilla jäävät toimittajalle. Sinun pitää kuitenkin olla mukana keskustelussa, jossa vastataan kuuteen kysymykseen. Ne muodostavat päätöspolun:
<style>
.dpath{list-style:none;margin:1.5rem 0;padding:0}
.dpath li{display:grid;grid-template-columns:2.25rem 1fr;gap:0 .9rem;margin:0;padding:0 0 1.4rem;position:relative}
.dpath li:not(:last-child)::after{content:"↓" / "";position:absolute;left:.65rem;bottom:.1rem;font-weight:700}
.dpath .n{display:grid;place-items:center;width:2.25rem;height:2.25rem;border:2px solid currentColor;border-radius:50%;font-weight:700}
.dpath a{font-weight:700}
.dpath .d{display:block}
</style>
<nav aria-label="Tilaajan päätöspolku">
<ol class="dpath" role="list">
<li><span class="n" aria-hidden="true">1</span><span><a href="#1-mitä-liiketoiminnassa-halutaan-saavuttaa">Liiketoiminnan tavoite</a><span class="d">Mitä halutaan saavuttaa?</span></span></li>
<li><span class="n" aria-hidden="true">2</span><span><a href="#2-mitä-päätöksiä-dashboardilla-tehdään">Päätökset, joita dashboard tukee</a><span class="d">Mitä raportilla päätetään ja kuka päättää?</span></span></li>
<li><span class="n" aria-hidden="true">3</span><span><a href="#3-mitä-onnistuminen-tarkoittaa-ja-miten-se-mitataan">Mittareiden määritelmät</a><span class="d">Mikä kertoo onnistumisesta ja miten se mitataan?</span></span></li>
<li><span class="n" aria-hidden="true">4</span><span><a href="#4-mihin-tuloksia-verrataan-ja-milloin-reagoidaan">Vertailut ja reagointirajat</a><span class="d">Mihin tuloksia verrataan ja milloin reagoidaan?</span></span></li>
<li><span class="n" aria-hidden="true">5</span><span><a href="#5-mistä-tieto-tulee-ja-kuka-siitä-vastaa">Tietolähteet ja vastuut</a><span class="d">Mistä tieto tulee ja kuka siitä vastaa?</span></span></li>
<li><span class="n" aria-hidden="true">6</span><span><a href="#6-miten-dashboard-hyväksytään-ja-otetaan-käyttöön">Hyväksyntä ja käyttö</a><span class="d">Kuka hyväksyy dashboardin ja kuka sitä käyttää?</span></span></li>
</ol>
</nav>

**Miten tilaajan päätökset muuttavat dashboardia?**

| Jos asiaa ei sovita | Kun tilaaja ja toimittaja sopivat asiasta |
|---|---|
| Raportissa näytetään kaikki lomakkeen lähetysyritykset. | Raportissa näytetään onnistuneet lähetykset ja tarvittaessa erikseen laadukkaat liidit. |
| Myyntiä verrataan vain edelliseen kuukauteen. | Myyntiä verrataan myös viime vuoden vastaavaan jaksoon ja tavoitteeseen. |
| Raportti toimitetaan, mutta sen käsittelylle ei ole sovittu toimintatapaa. | Tulokset käsitellään säännöllisesti ja havainnoille nimetään vastuuhenkilöt. |

Päätökset muodostavat ketjun. Jos ensimmäinen on epäselvä, seuraavat perustuvat arvailuun, ja silloin mittari valitaan usein sen mukaan, mikä on helppo laskea eikä sen mukaan, mitä pitäisi tietää.

Vaiheita ei kannata ohittaa. Tavoitteet pitää sanoittaa ja määritellä ennen kuin mitään aletaan rakentaa, sillä muuten kumpikaan osapuoli ei tiedä, mitä ollaan tekemässä.

Hyvä dashboard on kuin lennonjohdon näkymä. Siinä ei ole mitään ylimääräistä, mittarit löytyvät ja jokainen ymmärtää, mitä ne tarkoittavat. Markkinoinnin näkymät ovat usein aika erilaisia, koska ei välttämättä tiedetä, mitä niillä yritetään ohjata ja mitä niillä yritetään kertoa.

Siksi tilaajan ja tekijän pitää ajatella asioista ja mittareista samalla tavalla ja ymmärtää ne samoin. Muuten lopputulos ei miellytä ketään. Olen kohdannut tämän itse muutaman kerran, ja tekijälle jää siitä huono fiilis pitkäksi aikaa. Näitä vaiheita ei kannata ohittaa. Laskuttaa pitää silti, joten tilaajakaan ei ole tyytyväinen.

Tilaaja tuntee oman liiketoimintansa parhaiten. Jos tavoitteita on vaikea sanoittaa, hyvä toimittaja auttaa muuttamaan ajatukset konkreettisiksi kysymyksiksi ja mitattaviksi tavoitteiksi.

## 1. Mitä liiketoiminnassa halutaan saavuttaa?

Ensimmäinen päätös on tavoite. Sivustolla voi olla monta tehtävää: myynti, yhteydenotot, asiakaspalvelu, tiedon jakaminen tai tunnettuuden kasvattaminen. Kaikkea ei tarvitse mitata yhtä tarkasti, ja sinun tehtäväsi on sanoa, mitkä niistä ovat tärkeimpiä.

Kaikki tulokset eivät myöskään synny verkkosivulla. B2B-yrityksessä sivusto tuo yhteydenoton, mutta kauppa syntyy vasta CRM-järjestelmässä. Silloin pitää miettiä, miten sivuston tapahtuma ja myöhempi tulos yhdistetään.

Hyvä tapa aloittaa on katsoa, mitä joudut itse raportoimaan ylöspäin. Jos olet markkinointipäällikkö, mitä johto kysyy sinulta ja millä luvuilla vastaat? Siitä on helppo lähteä, kun mietitään, miten dashboardin tavoite ja verkkosivuston tarkoitus saadaan kuvattua. Kyse ei ole vain raporteista vaan siitä, mitä niillä halutaan kertoa.

Jos tavoite jää auki, dashboardiin kertyy lukuja, jotka näyttävät hyödyllisiltä mutta eivät vastaa mihinkään. Tarkoitukseton dashboard on kuin navigaattori ilman määränpäätä: karttaa kyllä näkyy, mutta perille ei pääse. Jos liiketoiminnan tavoitetta ei mitata digitaalisissa kanavissa lainkaan, dashboard ei voi antaa oikeita vastauksia eikä historiasta saa tietoa, onko sivusto tuottanut tulosta. Silloin mittauksen rakentaminen on ensimmäinen tehtävä.

## 2. Mitä päätöksiä dashboardilla tehdään?

Tavoite ei vielä riitä, koska ”Kasvatetaan verkkokaupan myyntiä” ei kerro, mitä raportilta odotetaan. Pitää tietää, mitä päätöksiä sen pitäisi tukea. Päätöksestä johdetaan kysymys ja kysymyksestä mittari.

Esimerkkejä päätöksistä ja siitä, mitä ne vaativat raportilta:

- **Mihin kanaviin panostetaan?** Tarvitaan kanavakohtaiset tulokset, jotka on laskettu samalla tavalla.
- **Mitkä tuoteryhmät tarvitsevat huomiota?** Tarvitaan tuoteryhmien myynti ja niiden osuus kokonaismyynnistä.
- **Milloin kampanjaa pitää tutkia tarkemmin?** Tarvitaan vertailu kampanjaa edeltävään jaksoon.
- **Mitkä sisällöt tukevat tavoitteita?** Tarvitaan sisältökohtaiset yhteydenotot tai muut sovitut tulokset.
- **Onko muutos niin iso, että siihen pitää reagoida?** Tarvitaan tieto normaalista vaihtelusta ja sovittu raja.

Päätös vaikuttaa siihen, mitä raportilla näytetään (esimerkki on keksitty kirjakaupasta). Jos päätät, mihin tuoteryhmiin panostetaan, myytyjen tuotteiden määrä ei riitä. Pelit ja palapelit olivat 7,8 prosenttia ostetuista tuotteista mutta 20,9 prosenttia myynnistä. Määrät kertovat eri tarinan kuin myynnin osuus. Jos päätös koskee panostusta, pyydä raportille osuudet.

<!-- TÄYDENNÄ (Niko): linkki tarinallisen dashboardin artikkeliin, kun se on julkaistu. Luonnos: tarinallinen-ja-luettava-markkinoinnin-dashboard. -->

Mieti tässä vaiheessa myös käyttäjät, sillä johto, markkinointipäällikkö ja analyytikko tarvitsevat usein eri tarkkuuden. Johdolle riittää yleensä muutama tunnusluku ja poikkeamat, kun taas markkinoinnin arkeen tarvitaan kanava- ja kampanjatason tietoa. Jos tätä ei sovita, dashboardista tulee joko liian ylimalkainen tai liian raskas.

## 3. Mitä onnistuminen tarkoittaa ja miten se mitataan?

### Sama konversio voi tarkoittaa tilaajalle ja analyytikolle eri asiaa

Sana ”konversio” kuulostaa helpolta, kunnes sitä pitää laskea. Otetaan lomakkeen lähetys. Se voi tarkoittaa ainakin neljää asiaa:

- lähetä-painikkeen painaminen
- lomakkeen lähetysyritys
- teknisesti onnistunut lähetys
- liiketoiminnallisesti hyvä liidi

Luvut voivat olla eri suuruisia, ja vain viimeinen kertoo, mitä liiketoiminta oikeasti haluaa.

[Googlen GA4-ohje](https://support.google.com/analytics/answer/9216061) kuvaa lomakkeen lähetystapahtuman sanoin ”kun käyttäjä lähettää lomakkeen”. Kuvaus ei ole yksiselitteinen, sillä se voi tarkoittaa lähetysyritystä tai onnistunutta lähetystä. Siksi mittarit pitää varmentaa: luvun pitää tarkoittaa sitä, mitä sen nimi lupaa. Toimittaja tarkistaa tämän esimerkiksi Google Tag Managerin esikatselulla tai selaimen verkkopyynnöistä.

Tämä tarkistus eli mittauksen auditointi kuuluu aina projektiin, koska se vaikuttaa siihen, mitä mittareita voi määritellä.

Pidä erillään kolme asiaa:

1. **Liiketoiminnallinen tapahtuma:** asiakas ottaa yhteyttä.
2. **Mittaustoteutus:** tapahtuma kirjautuu analytiikkaan.
3. **Dashboardin mittari:** luku, joka raportilla näytetään.

Ne pitää saada vastaamaan toisiaan. Mittaus voi puuttua tai olla virheellinen, vaikka tapahtuma tapahtuu sivustolla. Silloin luku voi puuttua raportista, olla liian pieni tai kertoa vain osan todellisista tapahtumista.

**Päätös:** Mikä lasketaan onnistuneeksi yhteydenotoksi?

**Merkitys:** Dashboardin konversiomäärän pitää vastata oikeita onnistuneita yhteydenottoja.

**Seuraus:** Jos lähetyspainikkeen painallukset lasketaan onnistuneiksi yhteydenotoiksi, dashboard voi näyttää enemmän liidejä kuin yritys oikeasti saa.

Toimittaja tarkistaa laskennan ja ehdottaa määritelmiä, ja sinä vahvistat, mikä tapahtuma on bisnekselle arvokas.

### Mitä termistönäkymä on?

Jokaiselle dashboardille tehdään oma termistönäkymä, johon kirjataan, mitä luvut tarkoittavat ja miten ne on laskettu. Toimittaja kirjoittaa sen ja sinä hyväksyt sen. Kentät voivat olla esimerkiksi nämä:

- mittarin nimi
- liiketoiminnallinen merkitys
- laskentakaava
- tietolähde
- rajaukset
- tiedon ajantasaisuus
- tunnetut mittausrajoitteet
- vastuuhenkilö

Kaikki eivät tarvitse samaa mallia, mutta kannattaa silti tehdä, koska se vähentää tulkintaeroja ja helpottaa ylläpitoa. Kun joku kysyy, miksi luku on eri kuin toisessa raportissa, vastaus löytyy sieltä.

Esimerkki on keksitty:

- **Mittarin nimi:** Onnistuneet lomakelähetykset
- **Liiketoiminnallinen merkitys:** Lomakkeen lähetykset, joiden onnistuminen on vahvistettu teknisesti.
- **Laskentakaava:** Onnistuneiksi vahvistettujen lomakelähetysten määrä valitulla ajanjaksolla.
- **Tietolähde:** GA4, johon onnistumisen vahvistava tapahtuma on toteutettu.
- **Rajaukset:** Testilähetykset poistetaan sovitulla tavalla.
- **Tiedon ajantasaisuus:** Päivittäinen, jos käytetty tietolähde ja raportointiratkaisu tukevat sitä.
- **Tunnetut mittausrajoitteet:** Esimerkiksi suostumukset, mittauskatkokset ja lähetyksen vahvistustavan rajoitteet.
- **Vastuuhenkilö:** Markkinointipäällikkö tai muu nimetty henkilö.

Lomakkeen tekninen onnistuminen ei tarkoita automaattisesti laadukasta liidiä. Jos liiketoiminta haluaa seurata laadukkaita liidejä, niitä varten tarvitaan oma määritelmä ja mahdollisesti CRM-tietoa.

## 4. Mihin tuloksia verrataan ja milloin reagoidaan?

Luku ilman vertailukohtaa kertoo vähän. Onko 120 000 euroa hyvä vai huono? Riippuu siitä, mihin sitä verrataan, ja sinun pitää olla mukana päättämässä vertailusta. Vaihtoehtoja ovat esimerkiksi:

- edellinen kuukausi
- edellisen vuoden vastaava ajanjakso
- liiketoiminnallinen tavoite
- kampanjan tai muun toimenpiteen vertailujakso
- normaalia vaihtelua suurempi poikkeama

Esimerkki on keksitty. Lokakuun myynti on 120 000 euroa, ja syyskuuhun (100 000 euroa) verrattuna se kasvoi 20 prosenttia. Edellisen vuoden lokakuuhun (130 000 euroa) verrattuna se laski 7,7 prosenttia. Sama kuukausi näyttää siis sekä kasvulta että laskulta. Jos myynti vaihtelee kausittain, vertailukohta ratkaisee, ja sen tietää parhaiten tilaaja.

Sinun ei tarvitse keksiä korostusrajoja yksin, sillä toimittaja voi ehdottaa niitä historiadatan, normaalin vaihtelun ja tavoitteiden perusteella. Sinä päätät, milloin poikkeama on liiketoiminnalle tärkeä. Raja ei ole sama kaikille: jos kaupassa on kolme tuotekategoriaa, 20 prosentin osuus on pieni, ja jos kategorioita on sata, se on iso.

Jos rajaa ei ole sovittu, dashboard korostaa joko liikaa tai liian vähän. Kumpikin voi johtaa siihen, ettei kukaan reagoi.

## 5. Mistä tieto tulee ja kuka siitä vastaa?

Tietolähteet, käyttöoikeudet ja omistajuus kuuluvat yhteen. Lähteitä voivat olla esimerkiksi:

- Google Analytics 4
- Google Search Console
- Google Ads
- Meta Ads
- CRM
- verkkokaupan tilausjärjestelmä
- BigQuery

Data Studio on ensisijaisesti raportointi- ja visualisointityökalu eikä automaattisesti tietolähde, sillä se tuo tiedot yhteen ja näyttää ne. Google palautti tuotteen nimeksi [Data Studio vuonna 2026](https://cloud.google.com/blog/products/data-analytics/looker-studio-is-data-studio), joten käytän sitä.

Sinä autat järjestämään käyttöoikeudet ja löytämään tietojen omistajat, ja integraatiot kuuluvat toimittajalle.

Tähän vaiheeseen kuuluvat myös UTM-merkinnät. UTM tulee sanoista Urchin Tracking Module. UTM-merkinnät ovat linkin lopussa olevia tunnisteita, joilla analytiikka saa tietää, mistä kampanjasta kävijä tuli. Niiden avulla raportti voi näyttää, mikä kampanja tai kanava toi kävijät ja tulokset.

UTMit ovat yleensä markkinoinnin vastuulla, ja usein niitä hoitaa mainostoimisto. Yhdenmukaisuus on tärkeää, koska raportti ryhmittelee liikenteen tunnisteiden perusteella. Jos sama kanava kirjoitetaan eri tavoin, esimerkiksi ”facebook” ja ”fb”, se voi näkyä raportissa kahtena lähteenä. Jos tunnisteet puuttuvat, [Googlen ohjeen mukaan](https://support.google.com/analytics/answer/15258820) lähdetieto voi hävitä, ja liikenne voi näkyä suorana liikenteenä.

Seuraus on, että kampanjan tulokset voivat jäädä näkymättä siellä, missä niitä odotetaan, eikä dashboard voi korjata puuttuvia tunnisteita jälkikäteen.

## 6. Miten dashboard hyväksytään ja otetaan käyttöön?

Työ ei lopu siihen, että dashboard näyttää hyvältä, sillä sinun pitää varmistaa, että se vastaa sovittuihin kysymyksiin. Projekti etenee yleensä näin:

1. palaveri, jossa haetaan yhteinen ymmärrys kysymyksistä, joihin halutaan vastaus
2. tarkennukset tekstimuodossa, jotta kaikilla on sama ymmärrys mittareista
3. muutaman näkymän luonti dashboardiin
4. tilaajan kuittaus näkymistä
5. loput sivut ja ohjeistuksen kokoaminen, termistö mukaan lukien
6. koulutus

Ennen julkaisua tarkistetaan nämä:

- ensimmäisten näkymien arviointi
- lukujen vertaaminen alkuperäisiin tietolähteisiin
- raportin ymmärrettävyyden testaaminen
- vastuut mahdollisista korjauksista
- raportin käyttö johtamisessa ja markkinoinnin arjessa

Ymmärrettävyyden voi testata helposti pyytämällä jotakuta projektin ulkopuolista kertomaan omin sanoin, mitä näkymä kertoo.

**Mitä tapahtuu, kun dashboard näyttää jotain poikkeavaa?**

Jos kukaan ei reagoi, raportin hyöty jää pieneksi, joten sovi kuittauksen yhteydessä, kuka huomaa poikkeaman, kuka selvittää sen ja kuka päättää, mitä sille tehdään.

<!-- TÄYDENNÄ (Niko): oma esimerkki dashboardista, joka koostui pelkistä taulukoista tai jäi muuten käyttämättä. Mitä siinä oli vikana ja mitä muutettiin? -->

## Kuka päättää mitä?

Vastuunjako ei ole jäykkä: tilaaja tuntee bisneksen ja toimittaja analytiikan.

| Asia | Tilaaja päättää | Toimittaja ehdottaa, toteuttaa tai tarkistaa | Yhdessä hyväksytään |
|---|---|---|---|
| Liiketoiminnan tavoitteet | Kertoo tavoitteet ja prioriteetit | Auttaa muuttamaan ne mitattaviksi kysymyksiksi | Mitkä tavoitteet raportoidaan |
| Päätökset | Kertoo, mitä päätöksiä raportilla tehdään | Ehdottaa, mitä raportilta tarvitaan | Raportin tarkoitus ja käyttäjät |
| Mittarit | Vahvistaa liiketoiminnalliset määritelmät | Ehdottaa mittareita ja tarkistaa laskennan | Termistönäkymä |
| Vertailut ja rajat | Kertoo kausivaihtelusta ja tavoitteista | Suosittelee vertailuja ja rajoja datan perusteella | Milloin poikkeamaan reagoidaan |
| Tietolähteet | Järjestää käyttöoikeudet ja tunnistaa omistajat | Selvittää tiedon laadun ja yhdistää lähteet | Tietolähteet ja niiden vastuut |
| UTM-merkinnät | Sopii vastuun markkinoinnin tai toimiston kanssa | Tarkistaa, että luokittelu toimii raportissa | UTM-käytäntö |
| Hyväksyntä | Varmistaa, että raportti vastaa tarpeita | Korjaa virheet ja dokumentoi toteutuksen | Julkaisu |
| Käyttö | Varmistaa, että raporttia käytetään | Kouluttaa ja tukee sovitusti | Käyttötavat ja vastuuhenkilöt |

## Voiko dashboardin lukuihin luottaa?

Luottamus ei synny kerralla, koska sivusto, lomakkeet ja kampanjat muuttuvat ja mittaus muuttuu niiden mukana. Nimeä siksi termistönäkymälle vastuuhenkilö jo projektissa ja päivitä määritelmät, kun mittaus muuttuu.

### Miksi mittarimääritelmät kiinnostavat myös tekoälyä?

Sama termi voi tarkoittaa eri yrityksissä eri asiaa. Ihminen korjaa väärinkäsityksen keskustelussa, mutta tekoäly ei voi arvata, mitä ”konversio” tai ”asiakas” teillä tarkoittaa, jos sitä ei ole kirjattu termistönäkymään. Ennakkojulkaistussa [vertailussa](https://arxiv.org/abs/2604.25149) kolmelle kielimallille esitettiin sata kysymystä Contoso Retail -esimerkkiaineistosta. Kun malli sai vain tietokannan rakenteen, oikeita vastauksia oli 45,5–50,5 prosenttia. Kun se sai lisäksi lyhyen dokumentin määritelmistä, osuus nousi 67,7–68,7 prosenttiin. Tulos on yhdestä aineistosta ja yhdestä testitavasta, eikä sitä voi yleistää kaikkiin tekoälyihin. Silti määritelmienkin kanssa kolmasosa vastauksista meni väärin.

Määritelmät auttavat vähentämään virhetulkintoja, mutta eivät takaa oikeita vastauksia. Tekoälyn tekemä kysely voi toimia teknisesti ja olla silti liiketoiminnallisesti väärä, joten tärkeät luvut kannattaa täsmäyttää alkuperäiseen tietoon tai tarkistettuun laskentaan. Syyselitykset ovat hypoteeseja, kunnes ne on tutkittu: jos tekoäly kertoo, miksi luku laski, selitys voi olla uskottava ja silti väärä. Tekoäly on hyvä renki mutta huono isäntä.

Jos dashboardiin yhdistetään tekoälyavusteinen kyselytoiminto, sovi myös, miten tekoälyn tuottamat luvut tarkistetaan ja kuka vastaa määritelmistä.

## Mitä tilaajan tarvitsee osata?

Sinun ei tarvitse tietää, miten dashboard rakennetaan. Sinun pitää tietää, mitä sillä halutaan saada aikaan.

Hyvä projekti on yhteistyötä. Toimittaja tuo analytiikan, datan ja visualisoinnin osaamisen. Sinä tuot bisneksen tavoitteet, päätöstarpeet ja tiedon siitä, mikä teille on arvokasta. Kun nämä yhdistyvät, raportti päätyy todennäköisemmin käyttöön eikä jää avoimeksi välilehdeksi, jota kukaan ei lue.

## Tarkistuslista ennen dashboard-projektia

<style>
.cl{margin:2rem 0}
.prose .cl h4{margin:1.4rem 0 .4rem;font-size:1.15rem}
.prose .cl h4:focus,.prose .cl [data-result]:focus{outline:2px solid var(--accent);outline-offset:4px}
.cl-progress{list-style:none;display:grid;grid-template-columns:repeat(6,1fr);gap:.4rem;margin:1rem 0 .4rem;padding:0}
.cl-progress li{margin:0;padding:.45rem 0 0;border-top:3px solid var(--line);color:var(--muted);font-size:.8rem;line-height:1.3}
.cl-progress li.done{border-top-color:var(--muted)}
.cl-progress li[aria-current="step"]{border-top-color:var(--ink);color:var(--ink);font-weight:700}
.cl-progress .lbl{display:none}
@media (min-width:44rem){.cl-progress .lbl{display:block}}
.cl-nav{display:flex;justify-content:space-between;gap:.75rem;margin-top:1.1rem}
.cl-nav [data-next]{margin-left:auto}
.prose .cl .cl-nav [data-next]{color:var(--color-neutral-950);background:var(--pop);border-color:var(--pop)}
.cl-err{margin:.8rem 0 0;font-weight:650}
.prose .cl [data-result]{margin-top:1.25rem;padding-top:1.25rem;border-top:2px solid var(--ink)}
.prose .cl [data-result] h3{margin:0 0 1rem}
.prose .cl [data-result] h4{margin:2rem 0 .6rem;padding-bottom:.35rem;border-bottom:1px solid var(--line);font-size:1.05rem}
.cl-score{display:block;margin:.25rem 0;font-size:2.5rem;font-weight:800;line-height:1.1}
.cl-first{margin:.6rem 0 1rem;padding:1rem 1.25rem;border:2px solid var(--ink);border-left:8px solid var(--pop);border-radius:var(--radius-sm);background:var(--bg);box-shadow:.3rem .3rem 0 var(--ink)}
.cl-first p{margin:.45rem 0}
.cl-stage{display:block;margin:1.5rem 0 .4rem;color:var(--muted);font:700 .75rem/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.06em;text-transform:uppercase}
.cl-item{margin:.5rem 0;padding:.75rem 1rem;border:1px solid var(--line);border-radius:var(--radius-sm);background:var(--bg)}
.cl-item p{margin:.3rem 0}
.cl-chip{display:inline-block;margin-right:.5rem;padding:.05rem .6rem;border:1.5px solid var(--muted);border-radius:var(--radius-pill);font-size:.78rem;font-weight:700;line-height:1.5}
.cl-chip--no{border-color:var(--color-danger);color:var(--color-danger)}
.prose .cl [data-result] details{margin:1.5rem 0 0;padding:.6rem 1rem;border:1px solid var(--line);border-radius:var(--radius-sm);background:var(--bg)}
.prose .cl [data-result] summary{cursor:pointer;font-weight:700}
</style>
<form class="checklist cl" data-checklist aria-labelledby="cl-title" novalidate>
<fieldset class="cl-panel">
<legend id="cl-title">Dashboard-projektin tarkistuslista</legend>
<p>Vastaa kysymyksiin ja selvitä, mitkä asiat kannattaa sopia toimittajan kanssa. Kaiken ei tarvitse olla valmista ennen projektin aloittamista. Vastauksia ei lähetetä minnekään eikä tallenneta.</p>
<ol class="cl-progress" data-progress aria-label="Tarkistuslistan vaiheet">
<li data-p="1"><span>1</span><span class="lbl">Liiketoiminnan tavoitteet</span></li>
<li data-p="2"><span>2</span><span class="lbl">Päätökset ja käyttäjät</span></li>
<li data-p="3"><span>3</span><span class="lbl">Mittarit ja onnistuminen</span></li>
<li data-p="4"><span>4</span><span class="lbl">Vertailut ja reagointi</span></li>
<li data-p="5"><span>5</span><span class="lbl">Tietolähteet ja vastuut</span></li>
<li data-p="6"><span>6</span><span class="lbl">Hyväksyntä ja käyttö</span></li>
</ol>
<p data-status><strong>Vaihe 1/6 · Liiketoiminnan tavoitteet</strong></p>
<section data-stage data-n="1" data-title="Liiketoiminnan tavoitteet" aria-labelledby="cl-s1">
<h4 id="cl-s1" tabindex="-1">1. Liiketoiminnan tavoitteet</h4>
<fieldset class="cl-q" data-q data-id="q1" data-tier="1" data-topic="liiketoiminnan tavoitteen määrittelystä" data-why="Ette ole vielä sopineet, mitä tuloksia raportoinnilla halutaan seurata. Ilman tätä myöhempien mittareiden valinta perustuu helposti oletuksiin." data-tip="Kirjoita tärkeimmät liiketoiminnalliset tavoitteet. Mieti esimerkiksi, mitä menettäisitte, jos verkkosivusto olisi pitkään pois käytöstä."><legend>Tiedämme, mitä liiketoiminnallista hyötyä verkkosivustolta tai digitaaliselta markkinoinnilta odotamme.</legend>
<label class="form-choice"><input type="radio" name="q1" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q1" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q1" value="unknown"> En tiedä</label>
</fieldset>
<fieldset class="cl-q" data-q data-id="q2" data-tier="2" data-topic="tulosten syntypaikan selvittämisestä" data-why="Jos ei tiedetä, missä tärkeät tulokset syntyvät, raportti voi jäädä näyttämään vain osan kuvasta." data-tip="Selvitä, missä myynti, yhteydenotto tai muu tärkeä tulos syntyy. Sopikaa toimittajan kanssa, miten sitä voidaan seurata."><legend>Tiedämme, missä tavoitteidemme kannalta tärkeät tulokset syntyvät, esimerkiksi verkkosivustolla, verkkokaupassa tai CRM-järjestelmässä.</legend>
<label class="form-choice"><input type="radio" name="q2" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q2" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q2" value="unknown"> En tiedä</label>
</fieldset>
</section>
<section data-stage data-n="2" data-title="Päätökset ja käyttäjät" aria-labelledby="cl-s2">
<h4 id="cl-s2" tabindex="-1">2. Päätökset ja käyttäjät</h4>
<fieldset class="cl-q" data-q data-id="q3" data-tier="1" data-topic="päätösten tunnistamisesta" data-why="Ilman tunnistettuja päätöksiä dashboardiin kertyy lukuja, jotka eivät auta mihinkään päätökseen." data-tip="Kirjaa kolme tärkeintä päätöstä, joita raportin pitäisi tukea. Nimeä myös henkilöt, jotka tekevät päätökset."><legend>Olemme tunnistaneet päätökset, joita dashboardin pitäisi auttaa tekemään.</legend>
<label class="form-choice"><input type="radio" name="q3" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q3" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q3" value="unknown"> En tiedä</label>
</fieldset>
<fieldset class="cl-q" data-q data-id="q4" data-tier="2" data-topic="käyttäjien nimeämisestä" data-why="Ilman sovittuja käyttäjiä raportista tulee helposti joko liian ylimalkainen tai liian raskas." data-tip="Nimeä raportin käyttäjäryhmät ja päätä, mitä heidän pitää nähdä. Johdon ja markkinoinnin arjen tarpeet voivat olla erilaisia."><legend>Tiedämme, ketkä dashboardia käyttävät ja millaista tietoa he tarvitsevat.</legend>
<label class="form-choice"><input type="radio" name="q4" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q4" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q4" value="unknown"> En tiedä</label>
</fieldset>
</section>
<section data-stage data-n="3" data-title="Mittarit ja onnistuminen" aria-labelledby="cl-s3">
<h4 id="cl-s3" tabindex="-1">3. Mittarit ja onnistuminen</h4>
<fieldset class="cl-q" data-q data-id="q5" data-tier="1" data-topic="onnistumisen määrittelystä" data-why="Jos onnistumista ei ole sovittu, mittariksi valitaan helposti se, mikä on helppo laskea, eikä se, mikä on liiketoiminnalle arvokasta." data-tip="Määrittele esimerkiksi, mikä lasketaan onnistuneeksi yhteydenotoksi, ostoksi tai laadukkaaksi liidiksi."><legend>Olemme sopineet, mitä onnistuminen tarkoittaa liiketoiminnalle.</legend>
<label class="form-choice"><input type="radio" name="q5" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q5" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q5" value="unknown"> En tiedä</label>
</fieldset>
<fieldset class="cl-q" data-q data-id="q6" data-tier="2" data-topic="mittauksen tarkistamisesta" data-why="Jos mittausta ei ole tarkistettu, luvut voivat puuttua, olla virheellisiä tai kertoa vain osan tapahtumista." data-tip="Sovi toimittajan kanssa mittauksen tarkistuksesta. Pyydä mittareiden määritelmät dokumentoituna ennen niiden hyväksymistä."><legend>Mittareiden määritelmät ja mittauksen toimivuus on tarkistettu tai niiden tarkistamisesta on sovittu.</legend>
<label class="form-choice"><input type="radio" name="q6" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q6" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q6" value="unknown"> En tiedä</label>
</fieldset>
</section>
<section data-stage data-n="4" data-title="Vertailut ja reagointi" aria-labelledby="cl-s4">
<h4 id="cl-s4" tabindex="-1">4. Vertailut ja reagointi</h4>
<fieldset class="cl-q" data-q data-id="q7" data-tier="2" data-topic="vertailukohtien valinnasta" data-why="Sama luku voi näyttää kasvulta tai laskulta sen mukaan, mihin sitä verrataan." data-tip="Valitse liiketoiminnan kannalta merkitykselliset vertailut yhdessä toimittajan kanssa. Huomioi tavoitteet, kausivaihtelu ja aikaisemmat ajanjaksot."><legend>Olemme sopineet, mihin tuloksia verrataan.</legend>
<label class="form-choice"><input type="radio" name="q7" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q7" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q7" value="unknown"> En tiedä</label>
</fieldset>
<fieldset class="cl-q" data-q data-id="q8" data-tier="3" data-topic="reagointirajojen miettimisestä" data-why="Ilman sovittua rajaa ei ole selvää, milloin poikkeama vaatii selvittämistä." data-tip="Mieti, millainen muutos vaatii selvittämistä. Toimittaja voi ehdottaa rajoja historiallisen datan perusteella."><legend>Tiedämme, millaisiin muutoksiin tai poikkeamiin pitää reagoida.</legend>
<label class="form-choice"><input type="radio" name="q8" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q8" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q8" value="unknown"> En tiedä</label>
</fieldset>
</section>
<section data-stage data-n="5" data-title="Tietolähteet ja vastuut" aria-labelledby="cl-s5">
<h4 id="cl-s5" tabindex="-1">5. Tietolähteet ja vastuut</h4>
<fieldset class="cl-q" data-q data-id="q9" data-tier="2" data-topic="tietolähteiden ja omistajien selvittämisestä" data-why="Jos tietolähteiden omistajia ei tiedetä, virheiden selvittäminen ja käyttöoikeuksien järjestäminen viivästyy." data-tip="Listaa tärkeimmät järjestelmät ja niiden omistajat. Toimittaja selvittää, miten tietoja voidaan käyttää raportoinnissa."><legend>Tiedämme, mistä dashboardin tiedot saadaan ja kuka vastaa tietolähteistä.</legend>
<label class="form-choice"><input type="radio" name="q9" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q9" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q9" value="unknown"> En tiedä</label>
</fieldset>
<fieldset class="cl-q" data-q data-id="q10" data-tier="2" data-topic="käyttöoikeuksien järjestämisestä" data-why="Ilman käyttöoikeuksia toimittaja ei voi yhdistää tietoja raportille." data-tip="Selvitä, kuka voi antaa toimittajalle tarvittavat käyttöoikeudet. Suosi tehtävään sopivia vähimmäisoikeuksia."><legend>Tarvittavien käyttöoikeuksien järjestämisestä on sovittu.</legend>
<label class="form-choice"><input type="radio" name="q10" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q10" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q10" value="unknown"> En tiedä</label>
</fieldset>
<fieldset class="cl-q" data-q data-id="q11" data-tier="3" data-topic="kampanjatunnisteiden sopimisesta" data-why="Epäyhtenäiset tunnisteet voivat jakaa saman kanavan liikenteen useaan ryhmään tai jättää lähdetiedon pois." data-tip="Sopikaa, kuka vastaa kampanjalinkkien merkinnöistä ja miten tunnisteet kirjoitetaan yhdenmukaisesti."><legend>Kampanjatunnisteiden, kuten UTM-merkintöjen, käytännöt ja vastuut on sovittu.</legend>
<label class="form-choice"><input type="radio" name="q11" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q11" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q11" value="unknown"> En tiedä</label>
</fieldset>
</section>
<section data-stage data-n="6" data-title="Hyväksyntä ja käyttö" aria-labelledby="cl-s6">
<h4 id="cl-s6" tabindex="-1">6. Hyväksyntä ja käyttö</h4>
<fieldset class="cl-q" data-q data-id="q12" data-tier="2" data-topic="hyväksyjän nimeämisestä" data-why="Ilman nimettyä hyväksyjää ja sovittua täsmäytystä virheet löytyvät vasta, kun niiden varassa on jo tehty päätöksiä." data-tip="Nimeä hyväksyjä ja sovi, miten tärkeät luvut täsmäytetään alkuperäisiin tietolähteisiin ennen julkaisua."><legend>Tiedämme, kuka hyväksyy dashboardin ja miten sen luvut tarkistetaan.</legend>
<label class="form-choice"><input type="radio" name="q12" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q12" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q12" value="unknown"> En tiedä</label>
</fieldset>
<fieldset class="cl-q" data-q data-id="q13" data-tier="2" data-topic="käytön ja reagoinnin sopimisesta" data-why="Jos kukaan ei vastaa poikkeamista, raportin hyöty jää pieneksi." data-tip="Nimeä raportin käyttäjät ja sovi, missä tilanteessa tulokset käsitellään, kuka selvittää poikkeamat ja kuka tekee päätökset."><legend>Olemme sopineet, kuka käyttää dashboardia ja miten havaittuihin muutoksiin reagoidaan.</legend>
<label class="form-choice"><input type="radio" name="q13" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q13" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q13" value="unknown"> En tiedä</label>
</fieldset>
</section>
<p class="cl-err" role="alert" data-error hidden style="display:none" tabindex="-1"></p>
<div class="cl-nav" data-nav><button type="button" data-prev hidden style="display:none">Edellinen</button><button type="button" data-next>Seuraava vaihe</button></div>
<section data-result hidden tabindex="-1" style="display:none" aria-labelledby="cl-res"></section>
<p data-live role="status" aria-live="polite" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap"></p>
</fieldset>
</form>
<script>
(function () {
  var TIER = { 1: "Perusta", 2: "Toteutus", 3: "Täydentävä" };
  function show(el, on) { el.hidden = !on; el.style.display = on ? "" : "none"; }
  function add(parent, tag, text) { var e = document.createElement(tag); if (text) e.textContent = text; parent.appendChild(e); return e; }
  function init() {
    var form = document.querySelector("[data-checklist]");
    if (!form || form.dataset.ready) return;
    form.dataset.ready = "true";
    var stages = [].slice.call(form.querySelectorAll("[data-stage]"));
    var progress = [].slice.call(form.querySelectorAll("[data-p]"));
    var status = form.querySelector("[data-status]");
    var error = form.querySelector("[data-error]");
    var nav = form.querySelector("[data-nav]");
    var prev = form.querySelector("[data-prev]");
    var next = form.querySelector("[data-next]");
    var result = form.querySelector("[data-result]");
    var live = form.querySelector("[data-live]");
    var current = 0;
    function questions(stage) { return [].slice.call(stage.querySelectorAll("[data-q]")); }
    function missing(stage) { return questions(stage).filter(function (q) { return !q.querySelector("input:checked"); }); }
    function showStage(n, focus) {
      current = n;
      stages.forEach(function (s, k) { show(s, k === n); });
      progress.forEach(function (p, k) {
        p.classList.toggle("done", k < n);
        if (k === n) p.setAttribute("aria-current", "step"); else p.removeAttribute("aria-current");
      });
      var title = stages[n].dataset.title;
      status.querySelector("strong").textContent = "Vaihe " + (n + 1) + "/" + stages.length + " · " + title;
      show(prev, n > 0);
      next.textContent = n === stages.length - 1 ? "Näytä yhteenveto" : "Seuraava vaihe";
      show(error, false);
      live.textContent = "Vaihe " + (n + 1) + "/" + stages.length + ": " + title;
      if (focus) stages[n].querySelector("h4").focus();
    }
    function items() {
      var out = [], order = 0;
      stages.forEach(function (s) {
        questions(s).forEach(function (q) {
          out.push({ order: order++, id: q.dataset.id, stage: +s.dataset.n, stageTitle: s.dataset.title, tier: +q.dataset.tier, text: q.querySelector("legend").textContent, tip: q.dataset.tip, topic: q.dataset.topic, why: q.dataset.why, v: q.querySelector("input:checked").value });
        });
      });
      return out;
    }
    function answerOf(v) { return v === "yes" ? "Kyllä" : v === "no" ? "Ei" : "En tiedä"; }
    function statusOf(v) { return v === "no" ? "Ei vielä kunnossa" : "Selvitettävä"; }
    function render() {
      var all = items();
      var ok = all.filter(function (i) { return i.v === "yes"; });
      var open = all.filter(function (i) { return i.v !== "yes"; }).sort(function (a, b) { return a.tier - b.tier || a.order - b.order; });
      var lines = ["Dashboard-projektin tarkistuslista"];
      try { lines.push("Päivämäärä: " + new Date().toLocaleDateString("fi-FI")); } catch (e) {}
      lines.push("Kunnossa: " + ok.length + "/" + all.length + " asiaa. Selvitettävää: " + open.length + " asiaa.");
      result.textContent = "";
      result.setAttribute("aria-labelledby", "cl-res");
      var h = add(result, "h3", "Yhteenveto");
      h.id = "cl-res";
      add(result, "h4", "Valmistelun tilanne");
      add(add(result, "p"), "strong", ok.length + "/" + all.length + " asiaa kunnossa").className = "cl-score";
      add(result, "p", open.length + " asiaa vaatii selvittämistä");
      add(result, "p", "Tulos kuvaa tämän tarkistuslistan vastauksia. Se ei ole arvio dashboard-projektin onnistumistodennäköisyydestä.");
      if (!open.length) {
        add(result, "p", "Kaikki tämän listan asiat ovat kunnossa. Käykää vastaukset silti läpi toimittajan kanssa ensimmäisessä palaverissa.");
      } else {
        var first = open[0];
        add(result, "h4", "Aloita tästä");
        var box = add(result, "div");
        box.className = "cl-first";
        add(add(box, "p"), "strong", "Aloita " + first.topic + ".");
        add(box, "p", first.why);
        var todo = add(box, "p");
        add(todo, "strong", "Mitä tehdä: ");
        todo.appendChild(document.createTextNode(first.tip));
        add(box, "p", "Vastauksesi: " + answerOf(first.v) + " · " + statusOf(first.v));
        lines.push("", "Aloita tästä: " + first.topic + ".", first.why, "Mitä tehdä: " + first.tip, "Vastauksesi: " + answerOf(first.v));
        var rest = open.slice(1);
        if (rest.length) {
          add(result, "h4", "Muut selvitettävät asiat");
          lines.push("", "Muut selvitettävät asiat");
          stages.forEach(function (s) {
            var n = +s.dataset.n;
            var group = rest.filter(function (i) { return i.stage === n; });
            if (!group.length) return;
            add(result, "p", "Vaihe " + n + ": " + s.dataset.title).className = "cl-stage";
            lines.push("Vaihe " + n + ": " + s.dataset.title);
            group.forEach(function (it) {
              var d = add(result, "div");
              d.className = "cl-item";
              var p1 = add(d, "p");
              add(p1, "span", statusOf(it.v)).className = "cl-chip" + (it.v === "no" ? " cl-chip--no" : "");
              p1.appendChild(document.createTextNode(it.text));
              add(d, "p", "Vastauksesi: " + answerOf(it.v) + " · Taso: " + TIER[it.tier]);
              var p3 = add(d, "p");
              add(p3, "strong", "Suositus: ");
              p3.appendChild(document.createTextNode(it.tip));
              lines.push("- " + statusOf(it.v) + ": " + it.text, "  Vastauksesi: " + answerOf(it.v), "  Suositus: " + it.tip);
            });
          });
        }
        add(result, "h4", "Näin järjestys muodostui");
        add(result, "p", "Avoimet asiat on jaettu kolmeen tasoon. Perusta: tavoite, päätökset ja onnistumisen määritelmä. Toteutus: mittaus, vertailut, tietolähteet ja hyväksyntä. Täydentävä: asiat, jotka parantavat raporttia mutta eivät estä aloittamista. Saman tason sisällä järjestys seuraa päätöspolkua. Järjestys on ohjaava eikä tarkka pisteytys. Esimerkiksi puuttuvat käyttöoikeudet voivat käytännössä estää toteutuksen.");
      }
      if (ok.length) {
        var det = add(result, "details");
        add(det, "summary", "Kunnossa olevat asiat (" + ok.length + ")");
        var ul = add(det, "ul");
        ok.forEach(function (it) { add(ul, "li", it.text); });
        lines.push("", "Kunnossa");
        ok.forEach(function (it) { lines.push("- " + it.text); });
      }
      var text = lines.join("\n");
      var actions = add(result, "div");
      actions.className = "form-actions";
      var copy = add(actions, "button", "Kopioi yhteenveto");
      copy.type = "button";
      var again = add(actions, "button", "Aloita alusta");
      again.type = "button";
      var note = add(result, "p");
      note.setAttribute("role", "status");
      copy.addEventListener("click", function () {
        var done = function () { note.textContent = "Yhteenveto kopioitu."; };
        var fail = function () { note.textContent = "Kopiointi ei onnistunut. Valitse teksti ja kopioi se käsin."; };
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fail); else fail();
        } catch (e) { fail(); }
      });
      again.addEventListener("click", function () {
        form.reset();
        show(result, false);
        show(nav, true);
        show(status, true);
        show(form.querySelector("[data-progress]"), true);
        showStage(0, true);
      });
    }
    next.addEventListener("click", function () {
      var stage = stages[current];
      var miss = missing(stage);
      questions(stage).forEach(function (q) { if (miss.indexOf(q) > -1) q.setAttribute("aria-invalid", "true"); else q.removeAttribute("aria-invalid"); });
      if (miss.length) {
        error.textContent = "Vastaa vielä " + miss.length + (miss.length === 1 ? " kysymykseen" : " kysymykseen") + " tässä vaiheessa. Vastaamaton kysymys on merkitty.";
        show(error, true);
        miss[0].tabIndex = -1;
        miss[0].focus();
        return;
      }
      if (current < stages.length - 1) { showStage(current + 1, true); return; }
      stages.forEach(function (s) { show(s, false); });
      show(nav, false);
      show(status, false);
      show(form.querySelector("[data-progress]"), false);
      show(error, false);
      render();
      show(result, true);
      live.textContent = "Yhteenveto on valmis.";
      result.focus();
      result.scrollIntoView({ block: "start" });
    });
    prev.addEventListener("click", function () { if (current > 0) showStage(current - 1, true); });
    form.addEventListener("change", function (e) {
      var q = e.target.closest && e.target.closest("[data-q]");
      if (q) q.removeAttribute("aria-invalid");
      if (!missing(stages[current]).length) show(error, false);
    });
    showStage(0, false);
  }
  document.addEventListener("astro:page-load", init);
  if (document.readyState !== "loading") init(); else document.addEventListener("DOMContentLoaded", init);
})();
</script>


## Mistä aloitat?

Jos et osaa vastata kaikkiin kysymyksiin, olet hyvässä seurassa. Suositukseni on aloittaa kahdesta ensimmäisestä vaiheesta, tavoitteesta ja päätöksistä, koska ne ovat perusta kaikelle muulle. Ota avoimet kohdat mukaan ensimmäiseen palaveriin toimittajan kanssa ja aloita niistä.

<!-- Lähteet: GA4 Help (form_submit), GA4 Help ((direct) / (none)), arXiv 2604.25149, Google Cloud Blog (Data Studio). Täydennetään tarvittaessa. -->
