---
layout: ../../../layouts/Base.astro
title: "Miten saat tilaajana kaiken irti markkinoinnin dashboard-projektista?"
description: "Dashboard-projektin hyöty riippuu tilaajan päätöksistä: tavoitteista, mittareista, vertailuista ja vastuista. Tässä kuusi päätöstä ja tarkistuslista."
date: 2026-11-07
category: reporting
tags: ["dashboard", "raportointi", "Data Studio", "mittarit", "mittaus"]
draft: true
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
<dd><strong>Dashboardin hyöty ratkeaa sinun päätöksissäsi, ei kaavioissa.</strong> Kuusi päätöstä riittää: tavoite, päätökset, onnistumisen määritelmä, vertailut, tietolähteet ja hyväksyntä.</dd>
<dt>Mitä saat</dt>
<dd>Päätöspolun, vastuutaulukon (kuka päättää mitä) ja tarkistuslistan, joka kertoo, mistä aloitat.</dd>
<dt>Ei sinulle</dt>
<dd>Jos haluat oppia rakentamaan dashboardin itse.</dd>
<dt>Jos on kiire</dt>
<dd>Hyppää suoraan <a href="#tarkistuslista-ennen-dashboard-projektia">tarkistuslistaan</a> ja ota avoimet kohdat mukaan ensimmäiseen palaveriin.</dd>
</dl>
</aside>

Mitä menettäisitte, jos verkkosivunne olisi puoli vuotta pois käytöstä?

Kysymys ei kuulosta raportoinnilta, mutta se on silti paras tapa aloittaa dashboard-projekti, koska vastaus kertoo, mitä sivustolta oikeasti odotetaan. Myyntiä, yhteydenottoja, asiakaspalvelua, tietoa vai tunnettuutta?

Verkkosivun pitäisi olla yksi organisaation parhaista myyjistä, ei käyntikortti. Selkeä tavoite näyttää raportoinnille suunnan. Mikäli verkkosivuston tarkoitus on hukassa, aloita siitä. Sen määrittely kantaa pitkälle.

Kaikkien päätösten ei tarvitse olla valmiita ennen kuin tilaat dashboardin. Projektin ensimmäinen vaihe voi olla juuri oikeiden kysymysten ja päätösten määrittely yhdessä toimittajan kanssa. Hyvä toimittaja auttaa siinä.

Tämä teksti on sinulle, joka tilaat markkinoinnin raportoinnin mutta et rakenna sitä itse. Oletko yrittäjä, markkinointipäällikkö vai johtaja, sillä ei ole väliä. Kerronpa kuusi päätöstä, jotka kuuluvat sinulle, ja mitä tapahtuu, jos ne jäävät tekemättä.

<!-- TÄYDENNÄ (Niko): lyhyt oma kokemus tai esimerkki avaukseen, jos haluat. En ole keksinyt sitä. -->

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

Päätökset muodostavat ketjun. Jos ensimmäinen on epäselvä, seuraavat perustuvat arvailuun, ja silloin mittari valitaan usein sen mukaan, mikä on helppo laskea eikä sen mukaan, mitä pitäisi tietää.

## 1. Mitä liiketoiminnassa halutaan saavuttaa?

Ensimmäinen päätös on tavoite. Sivustolla voi olla monta tehtävää: myynti, yhteydenotot, asiakaspalvelu, tiedon jakaminen tai tunnettuuden kasvattaminen. Kaikkea ei tarvitse mitata yhtä tarkasti, ja sinun tehtäväsi on sanoa, mitkä niistä ovat tärkeimpiä.

Kaikki tulokset eivät myöskään synny verkkosivulla. B2B-yrityksessä sivusto tuo yhteydenoton, mutta kauppa syntyy vasta CRM-järjestelmässä. Silloin pitää miettiä, miten sivuston tapahtuma ja myöhempi tulos yhdistetään.

Jos tavoite jää auki, dashboardiin kertyy lukuja, jotka näyttävät hyödyllisiltä mutta eivät vastaa mihinkään. Tavoitteeton dashboard on kuin navigaattori ilman määränpäätä: karttaa kyllä näkyy, mutta perille ei pääse. Jos tavoitetta ei mitata digitaalisissa kanavissa lainkaan, dashboard ei voi antaa oikeita vastauksia eikä historiasta saa tietoa, onko sivusto tuottanut tulosta. Silloin mittauksen rakentaminen on ensimmäinen tehtävä.

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

- Lähetä-painikkeen painaminen
- Lomakkeen lähetysyritys
- Teknisesti onnistunut lähetys
- Liiketoiminnallisesti hyvä liidi

Luvut voivat olla eri suuruisia, ja vain viimeinen kertoo, mitä liiketoiminta oikeasti haluaa.

[Googlen GA4-ohje](https://support.google.com/analytics/answer/9216061) kuvaa lomakkeen lähetystapahtuman sanoin ”kun käyttäjä lähettää lomakkeen”. Kuvaus ei ole yksiselitteinen, sillä se voi tarkoittaa lähetysyritystä tai onnistunutta lähetystä. Siksi mittarit pitää varmentaa: luvun pitää tarkoittaa sitä, mitä sen nimi lupaa. Toimittaja tarkistaa tämän esimerkiksi Google Tag Managerin esikatselulla tai selaimen verkkopyynnöistä.

Tämä tarkistus eli mittauksen auditointi on pakollinen osa projektia, koska se vaikuttaa siihen, mitä mittareita voi määritellä.

Pidä erillään kolme asiaa:

1. **Liiketoiminnallinen tapahtuma:** asiakas ottaa yhteyttä.
2. **Mittaustoteutus:** tapahtuma kirjautuu analytiikkaan.
3. **Dashboardin mittari:** luku, joka raportilla näytetään.

Ne pitää saada vastaamaan toisiaan. Mittaus voi puuttua, vaikka tapahtuma tapahtuu sivustolla, ja silloin raportti näyttää nollaa, vaikka bisnes pyörii.

**Päätös:** Mikä lasketaan onnistuneeksi yhteydenotoksi?

**Merkitys:** Dashboardin konversiomäärän pitää vastata oikeita onnistuneita yhteydenottoja.

**Seuraus:** Jos lähetyspainikkeen painallukset lasketaan onnistuneiksi yhteydenotoiksi, dashboard voi näyttää enemmän liidejä kuin yritys oikeasti saa.

Toimittaja tarkistaa laskennan ja ehdottaa määritelmiä, ja sinä vahvistat, mikä tapahtuma on bisnekselle arvokas.

### Mitä termistönäkymä on?

Jokaiselle dashboardille tehdään oma termistönäkymä, johon kirjataan, mitä luvut tarkoittavat ja miten ne on laskettu. Toimittaja kirjoittaa sen ja sinä hyväksyt sen. Kentät voivat olla esimerkiksi nämä:

- Mittarin nimi
- Liiketoiminnallinen merkitys
- Laskentakaava
- Tietolähde
- Rajaukset
- Tiedon ajantasaisuus
- Tunnetut mittausrajoitteet
- Vastuuhenkilö

Kaikki eivät tarvitse samaa mallia, mutta kannattaa silti tehdä, koska se vähentää tulkintaeroja ja helpottaa ylläpitoa. Kun joku kysyy, miksi luku on eri kuin toisessa raportissa, vastaus löytyy sieltä.

Esimerkki on keksitty:

- **Mittarin nimi:** Onnistuneet yhteydenotot
- **Liiketoiminnallinen merkitys:** Lomakkeen lähettäneet kävijät, jotka ovat täyttäneet pakolliset tiedot
- **Laskentakaava:** Onnistuneiden lähetysten määrä valitulla ajanjaksolla
- **Tietolähde:** GA4
- **Rajaukset:** Testilähetykset on poistettu
- **Tiedon ajantasaisuus:** Päivittyy päivittäin
- **Tunnetut mittausrajoitteet:** Kävijät, jotka eivät ole antaneet suostumusta, voivat puuttua datasta
- **Vastuuhenkilö:** Markkinointipäällikkö

## 4. Mihin tuloksia verrataan ja milloin reagoidaan?

Luku ilman vertailukohtaa ei kerro mitään. Onko 120 000 euroa hyvä vai huono? Riippuu siitä, mihin sitä verrataan, ja sinun pitää olla mukana päättämässä vertailusta. Vaihtoehtoja ovat esimerkiksi:

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

Data Studio on ensisijaisesti raportointi- ja visualisointityökalu eikä automaattisesti tietolähde, sillä se tuo tiedot yhteen ja näyttää ne. Google palautti tuotteen nimeksi [Data Studion vuonna 2026](https://cloud.google.com/blog/products/data-analytics/looker-studio-is-data-studio), joten käytän sitä.

Sinä autat järjestämään käyttöoikeudet ja löytämään tietojen omistajat, ja integraatiot kuuluvat toimittajalle.

Tähän vaiheeseen kuuluvat myös UTM-merkinnät. UTM tulee sanoista Urchin Tracking Module. Ne ovat linkin lopussa olevia tunnisteita, joilla analytiikka saa tietää, mistä kampanjasta kävijä tuli. Niiden avulla raportti voi näyttää, mikä kampanja tai kanava toi kävijät ja tulokset.

UTMit ovat yleensä markkinoinnin vastuulla, ja usein niitä hoitaa mainostoimisto. Yhdenmukaisuus on tärkeää, koska raportti ryhmittelee liikenteen tunnisteiden perusteella. Jos sama kanava kirjoitetaan eri tavoin, esimerkiksi ”facebook” ja ”fb”, se voi näkyä raportissa kahtena lähteenä. Jos tunnisteet puuttuvat, [Googlen ohjeen mukaan](https://support.google.com/analytics/answer/15258820) lähdetieto voi hävitä, ja liikenne voi näkyä suorana-liikenteenä.

Seuraus on, että kampanjan tulokset voivat jäädä näkymättä siellä, missä niitä odotetaan, eikä dashboard voi korjata puuttuvia tunnisteita jälkikäteen.

## 6. Miten dashboard hyväksytään ja otetaan käyttöön?

Työ ei lopu siihen, että dashboard näyttää hyvältä, sillä sinun pitää varmistaa, että se vastaa sovittuihin kysymyksiin. Työ etenee yleensä näin:

1. Palaveri, jossa haetaan yhteinen ymmärrys kysymyksistä, joihin halutaan vastaus.
2. Tarkennukset tekstimuodossa, jotta kaikilla on sama ymmärrys mittareista.
3. Muutaman näkymän luonti dashboardiin.
4. Tilaajan kuittaus näkymistä.
5. Loput sivut ja ohjeistuksen kokoaminen, termistö mukaan lukien.
6. Koulutus.

Hyväksymisvaiheessa kannattaa käydä läpi nämä:

- ensimmäisten näkymien arviointi
- lukujen vertaaminen alkuperäisiin tietolähteisiin
- mittareiden määritelmien hyväksyminen
- raportin ymmärrettävyyden testaaminen
- käyttäjien koulutus
- vastuut mahdollisista korjauksista
- raportin käyttö johtamisessa ja markkinoinnin arjessa

Ymmärrettävyyden voi testata helposti pyytämällä jotakuta projektin ulkopuolista kertomaan omin sanoin, mitä näkymä kertoo.

**Mitä tapahtuu, kun dashboard näyttää jotain poikkeavaa?**

Jos kukaan ei reagoi, raportin hyöty jää pieneksi, joten sovi kuittauksen yhteydessä, kuka huomaa poikkeaman, kuka selvittää sen ja kuka päättää, mitä sille tehdään.

<!-- TÄYDENNÄ (Niko): oma esimerkki dashboardista, joka koostui pelkistä taulukoista tai jäi muuten käyttämättä. Mitä siinä oli vikana ja mitä muutettiin? -->

## Kuka päättää mitä?

Vastuunjako ei ole jäykkä. Tilaaja tuntee bisneksen, toimittaja analytiikan. Hyvässä projektissa he täydentävät toisiaan.

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

Sama termi voi tarkoittaa eri yrityksissä eri asiaa. Ihminen korjaa väärinkäsityksen keskustelussa, mutta tekoäly ei voi arvata, mitä ”konversio” tai ”asiakas” teillä tarkoittaa, jos sitä ei ole kirjattu.

Aiheesta on tuore tutkimus. Ennakkojulkaistussa [vertailussa](https://arxiv.org/abs/2604.25149) kolmelle kielimallille esitettiin sata kysymystä Contoso Retail -esimerkkiaineistosta. Kun malli sai vain tietokannan rakenteen, oikeita vastauksia oli 45,5–50,5 prosenttia. Kun se sai lisäksi lyhyen dokumentin määritelmistä, osuus nousi 67,7–68,7 prosenttiin. Tulos on yhdestä aineistosta ja yhdestä testitavasta, ja kysymykset oli tehty testaamaan epäselviä määritelmiä. Sitä ei voi yleistää kaikkiin tekoälyihin. Silti määritelmienkin kanssa kolmasosa vastauksista meni väärin.

Käytännössä tämä tarkoittaa tätä:

- Tekoäly tarvitsee selkeät mittarimääritelmät.
- Tekoälyn tekemä kysely voi toimia teknisesti ja olla silti liiketoiminnallisesti väärä.
- Määritelmän tarkistaminen ei takaa, että luku on oikein. Tärkeät luvut kannattaa tarvittaessa täsmäyttää alkuperäiseen tietoon tai tarkistettuun laskentaan.
- Syy-seurausselitykset ovat hypoteeseja, kunnes ne on tutkittu. Jos tekoäly kertoo, miksi luku laski, selitys voi olla uskottava ja silti väärä.

Tekoäly on hyvä renki mutta huono isäntä.

## Mitä tilaajan tarvitsee osata?

Sinun ei tarvitse tietää, miten dashboard rakennetaan. Sinun pitää tietää, mitä sillä halutaan saada aikaan.

Hyvä projekti on yhteistyötä. Toimittaja tuo analytiikan, datan ja visualisoinnin osaamisen. Sinä tuot bisneksen tavoitteet, päätöstarpeet ja tiedon siitä, mikä teille on arvokasta. Kun nämä yhdistyvät, raportti päätyy todennäköisemmin käyttöön eikä jää avoimeksi välilehdeksi, jota kukaan ei lue.

## Tarkistuslista ennen dashboard-projektia

Vastaa kysymyksiin yksi kerrallaan: kyllä, ei tai en tiedä. Lopuksi näet yhteenvedon: mikä on kunnossa, mitä pitää selvittää ja mistä kannattaa aloittaa. Vastauksia ei lähetetä minnekään eikä tallenneta.

<form class="checklist" data-checklist aria-label="Tarkistuslista ennen dashboard-projektia" novalidate>
<fieldset data-step data-stage="1" data-title="Liiketoiminnan tavoite">
<legend>Kysymys 1/14: Liiketoiminnan tavoite</legend>
<fieldset data-q data-tier="1" data-tip="Kirjoita yhteen lauseeseen, mitä menettäisitte, jos sivusto kaatuisi huomenna. Se on dashboardin tavoite. Jos lause ei synny, aloita tästä toimittajan kanssa."><legend>Tiedämme, mitä menettäisimme, jos verkkosivumme kaatuisi.</legend>
<label class="form-choice"><input type="radio" name="q1" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q1" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q1" value="unknown"> En tiedä</label>
</fieldset>
<p role="alert" data-error hidden style="display:none">Valitse vastaus ennen kuin jatkat.</p>
<div class="form-actions" data-actions hidden style="display:none">
<button type="button" data-next>Seuraava</button>
</div>
</fieldset>
<fieldset data-step data-stage="1" data-title="Liiketoiminnan tavoite">
<legend>Kysymys 2/14: Liiketoiminnan tavoite</legend>
<fieldset data-q data-tier="2" data-tip="Listaa, missä kauppa tai yhteydenotto oikeasti syntyy. Jos se syntyy muualla kuin sivustolla, sovi toimittajan kanssa, miten tieto tuodaan raportille."><legend>Tiedämme, mitkä tulokset syntyvät sivustolla ja mitkä muualla, esimerkiksi CRM:ssä.</legend>
<label class="form-choice"><input type="radio" name="q2" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q2" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q2" value="unknown"> En tiedä</label>
</fieldset>
<p role="alert" data-error hidden style="display:none">Valitse vastaus ennen kuin jatkat.</p>
<div class="form-actions" data-actions hidden style="display:none">
<button type="button" data-prev>Edellinen</button>
<button type="button" data-next>Seuraava</button>
</div>
</fieldset>
<fieldset data-step data-stage="2" data-title="Päätökset, joita dashboard tukee">
<legend>Kysymys 3/14: Päätökset, joita dashboard tukee</legend>
<fieldset data-q data-tier="1" data-tip="Kirjoita ylös kolme päätöstä, joita raportin pitäisi helpottaa, ja kuka ne tekee. Niistä johdetaan kysymykset ja mittarit."><legend>Tiedämme, mitä päätöksiä dashboardilla tehdään ja kuka ne tekee.</legend>
<label class="form-choice"><input type="radio" name="q3" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q3" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q3" value="unknown"> En tiedä</label>
</fieldset>
<p role="alert" data-error hidden style="display:none">Valitse vastaus ennen kuin jatkat.</p>
<div class="form-actions" data-actions hidden style="display:none">
<button type="button" data-prev>Edellinen</button>
<button type="button" data-next>Seuraava</button>
</div>
</fieldset>
<fieldset data-step data-stage="2" data-title="Päätökset, joita dashboard tukee">
<legend>Kysymys 4/14: Päätökset, joita dashboard tukee</legend>
<fieldset data-q data-tier="2" data-tip="Nimeä käyttäjät. Johto tarvitsee yleensä muutaman luvun, markkinointi kanava- ja kampanjatason tiedon."><legend>Tiedämme, ketkä raporttia käyttävät ja kuinka tarkkaa tietoa he tarvitsevat.</legend>
<label class="form-choice"><input type="radio" name="q4" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q4" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q4" value="unknown"> En tiedä</label>
</fieldset>
<p role="alert" data-error hidden style="display:none">Valitse vastaus ennen kuin jatkat.</p>
<div class="form-actions" data-actions hidden style="display:none">
<button type="button" data-prev>Edellinen</button>
<button type="button" data-next>Seuraava</button>
</div>
</fieldset>
<fieldset data-step data-stage="3" data-title="Mittareiden määritelmät">
<legend>Kysymys 5/14: Mittareiden määritelmät</legend>
<fieldset data-q data-tier="1" data-tip="Päätä, mikä lasketaan onnistumiseksi. Onnistunut yhteydenotto on eri asia kuin lähetä-painikkeen painallus."><legend>Olemme sopineet, mikä tapahtuma on meille arvokas.</legend>
<label class="form-choice"><input type="radio" name="q5" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q5" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q5" value="unknown"> En tiedä</label>
</fieldset>
<p role="alert" data-error hidden style="display:none">Valitse vastaus ennen kuin jatkat.</p>
<div class="form-actions" data-actions hidden style="display:none">
<button type="button" data-prev>Edellinen</button>
<button type="button" data-next>Seuraava</button>
</div>
</fieldset>
<fieldset data-step data-stage="3" data-title="Mittareiden määritelmät">
<legend>Kysymys 6/14: Mittareiden määritelmät</legend>
<fieldset data-q data-tier="2" data-tip="Pyydä toimittajaa tarkistamaan mittaus ja kirjaamaan määritelmät termistönäkymään. Hyväksy ne ennen kuin niiden varaan tehdään päätöksiä."><legend>Mittaus on tarkistettu ja mittareiden määritelmät on kirjattu.</legend>
<label class="form-choice"><input type="radio" name="q6" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q6" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q6" value="unknown"> En tiedä</label>
</fieldset>
<p role="alert" data-error hidden style="display:none">Valitse vastaus ennen kuin jatkat.</p>
<div class="form-actions" data-actions hidden style="display:none">
<button type="button" data-prev>Edellinen</button>
<button type="button" data-next>Seuraava</button>
</div>
</fieldset>
<fieldset data-step data-stage="4" data-title="Vertailut ja reagointirajat">
<legend>Kysymys 7/14: Vertailut ja reagointirajat</legend>
<fieldset data-q data-tier="2" data-tip="Valitse vertailukohta: edellinen kuukausi, viime vuoden sama jakso vai tavoite. Kerro toimittajalle, jos myynti vaihtelee kausittain."><legend>Tiedämme, mihin tuloksia verrataan.</legend>
<label class="form-choice"><input type="radio" name="q7" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q7" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q7" value="unknown"> En tiedä</label>
</fieldset>
<p role="alert" data-error hidden style="display:none">Valitse vastaus ennen kuin jatkat.</p>
<div class="form-actions" data-actions hidden style="display:none">
<button type="button" data-prev>Edellinen</button>
<button type="button" data-next>Seuraava</button>
</div>
</fieldset>
<fieldset data-step data-stage="4" data-title="Vertailut ja reagointirajat">
<legend>Kysymys 8/14: Vertailut ja reagointirajat</legend>
<fieldset data-q data-tier="3" data-tip="Sovi raja, jonka ylittyessä joku tekee jotain. Toimittaja ehdottaa rajaa datasta, sinä sanot, onko se bisnekselle iso."><legend>Olemme sopineet, milloin poikkeamaan reagoidaan.</legend>
<label class="form-choice"><input type="radio" name="q8" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q8" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q8" value="unknown"> En tiedä</label>
</fieldset>
<p role="alert" data-error hidden style="display:none">Valitse vastaus ennen kuin jatkat.</p>
<div class="form-actions" data-actions hidden style="display:none">
<button type="button" data-prev>Edellinen</button>
<button type="button" data-next>Seuraava</button>
</div>
</fieldset>
<fieldset data-step data-stage="5" data-title="Tietolähteet ja vastuut">
<legend>Kysymys 9/14: Tietolähteet ja vastuut</legend>
<fieldset data-q data-tier="2" data-tip="Tee lista tietolähteistä ja siitä, kuka kutakin omistaa. Toimittaja selvittää tiedon laadun ja yhteydet."><legend>Tiedämme, mistä tiedot tulevat ja kuka niistä vastaa.</legend>
<label class="form-choice"><input type="radio" name="q9" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q9" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q9" value="unknown"> En tiedä</label>
</fieldset>
<p role="alert" data-error hidden style="display:none">Valitse vastaus ennen kuin jatkat.</p>
<div class="form-actions" data-actions hidden style="display:none">
<button type="button" data-prev>Edellinen</button>
<button type="button" data-next>Seuraava</button>
</div>
</fieldset>
<fieldset data-step data-stage="5" data-title="Tietolähteet ja vastuut">
<legend>Kysymys 10/14: Tietolähteet ja vastuut</legend>
<fieldset data-q data-tier="2" data-tip="Anna toimittajalle lukuoikeudet lähteisiin. Jos et voi itse, sovi, kuka voi."><legend>Käyttöoikeudet lähteisiin on järjestetty tai sovittu.</legend>
<label class="form-choice"><input type="radio" name="q10" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q10" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q10" value="unknown"> En tiedä</label>
</fieldset>
<p role="alert" data-error hidden style="display:none">Valitse vastaus ennen kuin jatkat.</p>
<div class="form-actions" data-actions hidden style="display:none">
<button type="button" data-prev>Edellinen</button>
<button type="button" data-next>Seuraava</button>
</div>
</fieldset>
<fieldset data-step data-stage="5" data-title="Tietolähteet ja vastuut">
<legend>Kysymys 11/14: Tietolähteet ja vastuut</legend>
<fieldset data-q data-tier="3" data-tip="Sovi, kuka hoitaa UTMit. Ne ovat yleensä markkinoinnin vastuulla, usein mainostoimiston."><legend>UTM-merkintöjen vastuu on sovittu.</legend>
<label class="form-choice"><input type="radio" name="q11" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q11" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q11" value="unknown"> En tiedä</label>
</fieldset>
<p role="alert" data-error hidden style="display:none">Valitse vastaus ennen kuin jatkat.</p>
<div class="form-actions" data-actions hidden style="display:none">
<button type="button" data-prev>Edellinen</button>
<button type="button" data-next>Seuraava</button>
</div>
</fieldset>
<fieldset data-step data-stage="6" data-title="Hyväksyntä ja käyttö">
<legend>Kysymys 12/14: Hyväksyntä ja käyttö</legend>
<fieldset data-q data-tier="2" data-tip="Nimeä henkilö, joka kuittaa dashboardin. Sovi, että luvut verrataan alkuperäiseen lähteeseen ennen kuittausta."><legend>Tiedämme, kuka hyväksyy dashboardin ja miten luvut tarkistetaan.</legend>
<label class="form-choice"><input type="radio" name="q12" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q12" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q12" value="unknown"> En tiedä</label>
</fieldset>
<p role="alert" data-error hidden style="display:none">Valitse vastaus ennen kuin jatkat.</p>
<div class="form-actions" data-actions hidden style="display:none">
<button type="button" data-prev>Edellinen</button>
<button type="button" data-next>Seuraava</button>
</div>
</fieldset>
<fieldset data-step data-stage="6" data-title="Hyväksyntä ja käyttö">
<legend>Kysymys 13/14: Hyväksyntä ja käyttö</legend>
<fieldset data-q data-tier="2" data-tip="Sovi, kuka huomaa poikkeaman, kuka selvittää sen ja kuka päättää jatkosta. Ilman tätä raportti jää vain katsottavaksi."><legend>Tiedämme, kuka raporttia käyttää ja mitä tapahtuu, kun se näyttää jotain outoa.</legend>
<label class="form-choice"><input type="radio" name="q13" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q13" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q13" value="unknown"> En tiedä</label>
</fieldset>
<p role="alert" data-error hidden style="display:none">Valitse vastaus ennen kuin jatkat.</p>
<div class="form-actions" data-actions hidden style="display:none">
<button type="button" data-prev>Edellinen</button>
<button type="button" data-next>Seuraava</button>
</div>
</fieldset>
<fieldset data-step data-stage="6" data-title="Hyväksyntä ja käyttö">
<legend>Kysymys 14/14: Hyväksyntä ja käyttö</legend>
<fieldset data-q data-tier="3" data-tip="Vertaa tekoälyn antama luku termistönäkymän määritelmään. Pidä sen antamat syyt arvauksina, kunnes olet tarkistanut ne datasta."><legend>Jos käytämme tekoälyä raportoinnissa, tärkeät luvut tarkistetaan määritelmistä.</legend>
<label class="form-choice"><input type="radio" name="q14" value="yes"> Kyllä</label>
<label class="form-choice"><input type="radio" name="q14" value="no"> Ei</label>
<label class="form-choice"><input type="radio" name="q14" value="unknown"> En tiedä</label>
</fieldset>
<p role="alert" data-error hidden style="display:none">Valitse vastaus ennen kuin jatkat.</p>
<div class="form-actions" data-actions hidden style="display:none">
<button type="button" data-prev>Edellinen</button>
<button type="button" data-finish>Näytä yhteenveto</button>
</div>
</fieldset>
<fieldset data-result hidden tabindex="-1" style="display:none"></fieldset>
<p data-live role="status" aria-live="polite" style="display:none;position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap"></p>
</form>
<script>
(function () {
  var TIER = {
    1: { name: "Perusta", why: "Tämä on päätöspolun alussa. Kaikki muu nojaa tähän." },
    2: { name: "Toteutus", why: "Tämä vaikuttaa siihen, mitä raportti näyttää ja voiko lukuihin luottaa." },
    3: { name: "Täydentävä", why: "Tämä parantaa raporttia, mutta ei estä aloittamista." }
  };
  function show(el, on) { el.hidden = !on; el.style.display = on ? "" : "none"; }
  function add(parent, tag, text) { var e = document.createElement(tag); if (text) e.textContent = text; parent.appendChild(e); return e; }
  function init() {
    var form = document.querySelector("[data-checklist]");
    if (!form || form.dataset.ready) return;
    form.dataset.ready = "true";
    var steps = [].slice.call(form.querySelectorAll("[data-step]"));
    var result = form.querySelector("[data-result]");
    var live = form.querySelector("[data-live]");
    function showStep(n, focus) {
      steps.forEach(function (s, k) { show(s, k === n); });
      live.textContent = "Kysymys " + (n + 1) + "/" + steps.length;
      if (focus) { var lg = steps[n].querySelector("legend"); lg.tabIndex = -1; lg.focus(); }
    }
    function answered(step) { return !!step.querySelector("input:checked"); }
    function items() {
      return steps.map(function (s, i) {
        var q = s.querySelector("[data-q]");
        return { order: i, stage: +s.dataset.stage, stageTitle: s.dataset.title, tier: +q.dataset.tier, text: q.querySelector("legend").textContent, tip: q.dataset.tip, v: q.querySelector("input:checked").value };
      });
    }
    function card(parent, it, withWhy) {
      var c = add(parent, "div");
      c.style.cssText = "border:1px solid var(--line);border-radius:.75rem;padding:.9rem 1.1rem;margin:0 0 .9rem";
      var st = add(c, "p");
      st.style.margin = "0 0 .6rem";
      var pill = add(st, "strong", it.v === "no" ? "Ei vielä kunnossa" : "Selvitettävä");
      pill.style.cssText = "display:inline-block;padding:.1rem .65rem;border:1px solid currentColor;border-radius:999px;font-size:.85em;margin-right:.5rem";
      add(st, "span", "Taso: " + TIER[it.tier].name + " · Vaihe " + it.stage);
      var p1 = add(c, "p");
      p1.style.margin = "0 0 .6rem";
      add(p1, "strong", "Kohta: ");
      p1.appendChild(document.createTextNode(it.text));
      var p2 = add(c, "p");
      p2.style.margin = withWhy ? "0 0 .6rem" : "0";
      add(p2, "strong", "Suositus: ");
      p2.appendChild(document.createTextNode(it.tip));
      if (withWhy) {
        var p3 = add(c, "p");
        p3.style.margin = "0";
        add(p3, "strong", "Miksi tämä ensin: ");
        p3.appendChild(document.createTextNode(TIER[it.tier].why));
      }
    }
    function line(it) { return "- " + (it.v === "no" ? "Ei vielä kunnossa" : "Selvitettävä") + " (" + TIER[it.tier].name + ", vaihe " + it.stage + "): " + it.text + "\n  Suositus: " + it.tip; }
    function render() {
      var all = items();
      var ok = all.filter(function (i) { return i.v === "yes"; });
      var open = all.filter(function (i) { return i.v !== "yes"; }).sort(function (a, b) { return a.tier - b.tier || a.order - b.order; });
      var text = "Yhteenveto\n\nValmistelun tilanne\n" + ok.length + "/" + all.length + " kysymystä on kunnossa, " + open.length + " vaatii selvittämistä.";
      result.textContent = "";
      add(result, "legend", "Yhteenveto");
      add(result, "h3", "Valmistelun tilanne");
      add(result, "p", ok.length + "/" + all.length + " kysymystä on kunnossa, " + open.length + " vaatii selvittämistä. Luku kertoo vain tämän listan vastauksista. Se ei ennusta, onnistuuko projekti.");
      if (!open.length) {
        add(result, "p", "Kaikki on kunnossa. Käykää vastaukset silti läpi toimittajan kanssa ensimmäisessä palaverissa.");
        text += "\nKaikki on kunnossa.";
      } else {
        add(result, "h3", "Avoimet asiat");
        text += "\n\nAvoimet asiat";
        var ul = add(result, "ul");
        var seen = {};
        open.slice().sort(function (a, b) { return a.stage - b.stage; }).forEach(function (it) {
          seen[it.stage] = seen[it.stage] || { title: it.stageTitle, n: 0 };
          seen[it.stage].n++;
        });
        Object.keys(seen).forEach(function (k) {
          var s = "Vaihe " + k + ": " + seen[k].title + " (" + seen[k].n + ")";
          add(ul, "li", s);
          text += "\n- " + s;
        });
        add(result, "h3", "Ensimmäinen suositeltu tehtävä");
        card(result, open[0], true);
        text += "\n\nEnsimmäinen suositeltu tehtävä\n" + line(open[0]) + "\n  Miksi tämä ensin: " + TIER[open[0].tier].why;
        if (open.length > 1) {
          add(result, "h3", "Muut selvitettävät asiat");
          text += "\n\nMuut selvitettävät asiat";
          open.slice(1).forEach(function (it) { card(result, it, false); text += "\n" + line(it); });
        }
        add(result, "h3", "Näin järjestys muodostui");
        add(result, "p", "Asiat on jaettu kolmeen tasoon. Perusta: tavoite, päätökset ja onnistumisen määritelmä. Muut päätökset nojaavat niihin. Toteutus: mittaus, vertailut, tietolähteet ja hyväksyntä. Täydentävä: asiat, jotka parantavat raporttia mutta eivät estä aloittamista. Samalla tasolla järjestys seuraa päätöspolkua. ”Ei” ja ”En tiedä” painavat saman verran.");
        if (ok.length) {
          add(result, "h3", "Kunnossa");
          text += "\n\nKunnossa";
          var okList = add(result, "ul");
          ok.forEach(function (it) { add(okList, "li", it.text); text += "\n- " + it.text; });
        }
      }
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
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fail); else fail();
      });
      again.addEventListener("click", function () {
        form.reset();
        show(result, false);
        showStep(0, true);
        form.scrollIntoView({ block: "start" });
      });
    }
    form.querySelectorAll("[data-actions]").forEach(function (a) { show(a, true); });
    steps.forEach(function (step, k) {
      var err = step.querySelector("[data-error]");
      step.addEventListener("change", function () { show(err, false); step.querySelector("[data-q]").removeAttribute("aria-invalid"); });
      var next = step.querySelector("[data-next]");
      var prev = step.querySelector("[data-prev]");
      var fin = step.querySelector("[data-finish]");
      function missing() {
        step.querySelector("[data-q]").setAttribute("aria-invalid", "true");
        show(err, true);
        var q = step.querySelector("[data-q]");
        q.tabIndex = -1;
        q.focus();
      }
      if (prev) prev.addEventListener("click", function () { showStep(k - 1, true); });
      if (next) next.addEventListener("click", function () {
        if (!answered(step)) { missing(); return; }
        showStep(k + 1, true);
      });
      if (fin) fin.addEventListener("click", function () {
        if (!answered(step)) { missing(); return; }
        steps.forEach(function (s) { show(s, false); });
        render();
        show(result, true);
        live.textContent = "Yhteenveto on valmis.";
        result.focus();
        result.scrollIntoView({ block: "start" });
      });
    });
    showStep(0, false);
  }
  document.addEventListener("astro:page-load", init);
  if (document.readyState !== "loading") init(); else document.addEventListener("DOMContentLoaded", init);
})();
</script>


## Mistä aloitat?

Dashboardin hyöty ratkeaa usein ennen ensimmäistä kaaviota. Jos et osaa vastata kaikkiin kysymyksiin, olet hyvässä seurassa. Suositukseni on aloittaa kahdesta ensimmäisestä vaiheesta, tavoitteesta ja päätöksistä, koska ne ovat perusta kaikelle muulle. Ota avoimet kohdat mukaan ensimmäiseen palaveriin toimittajan kanssa ja aloita niistä.

<!-- Lähteet: GA4 Help (form_submit), GA4 Help ((direct) / (none)), arXiv 2604.25149, Google Cloud Blog (Data Studio). Täydennetään tarvittaessa. -->
