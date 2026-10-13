---
layout: ../../../layouts/Base.astro
title: Luo McKinsey-tyylinen esitys ChatGPT:n tai Geminin avulla
documentTitle: "McKinsey-tyylinen esitys ChatGPT:llä | Niko Karppinen"
description: "Luo McKinsey-tyylinen esitys ChatGPT:llä tai Geminillä. Opas näyttää, miten SCQR-malli ja pyramidiperiaate tekevät promptista selkeän esityksen."
date: 2025-11-03
updatedDate: 2026-10-04
category: ai-prompting
tags: ["ChatGPT", "Gemini", "esitykset"]
image: /images/blog/mckinsey-style-presentation-chatgpt-gemini.jpeg
imageAlt: "Liikemiehen pukuun pukeutunut kilpikonna esittelee pyramidimalliin rakennettua diaa ja kaavioita valkotaululla"
imageCredit: "Luotu OpenAI ImageGenillä"
alternate:
  lang: en
  href: /blog/mckinsey-style-presentation-chatgpt-gemini/
about:
  - "Esityksen rakenne"
  - "Prompt engineering"
mentions:
  - "ChatGPT"
  - "Gemini"
  - "Claude"
  - "Pyramid Principle"
  - "MECE"
  - "SCQR"
  - "McKinsey & Company"
---

Useimmat ammattilaiset osaavat tuottaa dataa. Harvempi osaa muuttaa datan tarinaksi, joka saa päätöksentekijät toimimaan.

Siksi McKinseyn, BCG:n ja Bainin kaltaiset konsulttiyhtiöt käyttävät esitysten jäsentämiseen loogisia viitekehyksiä, kuten SCQR-mallia ja pyramidiperiaatetta. Niiden avulla hajanaisista havainnoista muodostetaan selkeä kokonaisuus, joka etenee havainnoista suosituksiin ja toimintaan.

Hyvä puoli on se, ettei niiden hyödyntäminen vaadi taustaa strategiakonsultoinnissa. Yhdellä promptilla ChatGPT, Gemini tai Claude haastattelee sinua, rakentaa tarinan kanssasi ja tekee siitä valmiit diat. Näin se tehdään.

## 1. Aloita viitekehyksestä: näin konsultit rakentavat esityksen tarinan

McKinseyn ja vastaavien strategiayhtiöiden esityksissä käytetään usein kahta toisiinsa liittyvää viitekehystä:

**SCQR-mallia** ja **pyramidiperiaatetta**.

Yhdessä ne tekevät perustelusta sekä *loogisen* että *toimintaan ohjaavan*.

---

### SCQR-malli: esityksen tarina

SCQR-rakenne muodostuu sanoista Situation, Complication, Question ja Resolution. Se vie yleisön yhteisestä lähtötilanteesta kohti päätöstä.

| Osa | Tarkoitus | Esimerkki verkkosivuston suorituskykyauditoinnista |
|---|---|---|
| Tilanne | Kuvaa asian, jonka kaikki jo tunnistavat. | ”Verkkosivuston nopeus vaikuttaa suoraan konversioihin ja SEO-näkyvyyteen.” |
| Haaste | Tuo esiin ongelman tai jännitteen. | ”Auditoinnissa havaittiin yli kuuden sekunnin latausaikoja ja 10 megatavun sivukokoja.” |
| Kysymys | Muotoilee keskeisen päätöksen. | ”Miten suorituskykyä voidaan parantaa rakentamatta koko sivustoa uudelleen?” |
| Ratkaisu | Antaa selkeän, dataan perustuvan vastauksen. | ”Optimoidaan median lataus ensin ja uudistetaan URL-rakenne seuraavaksi.” |

Tämä rakenne auttaa yleisöä ymmärtämään aiheen merkityksen ennen suositusten esittämistä.

### Pyramidiperiaate: esityksen rakenne

Kun tarina on määritelty, **pyramidiperiaate** järjestää perustelut ylhäältä alaspäin eteneväksi kokonaisuudeksi.

Jokainen taso tukee sen yläpuolella olevaa tasoa:

1. **Taso 1, pääviesti:** Vastaus kysymykseen eli esityksen ratkaisu.

2. **Taso 2, tukipilarit:** Kahdesta neljään (usein kolme) selkeää teemaa tai suositusta, jotka tukevat pääviestiä.

3. **Taso 3, näyttö:** Data, mittarit ja havainnot, jotka perustelevat jokaisen tukipilarin.

Rakenne tekee esityksestä selkeän. Jokaisella yksityiskohdalla on tehtävä, ja kaikki havainnot tukevat yhtä pääviestiä.

### Väiteotsikot: otsikko kertoo viestin

Konsultti ei otsikoi diaa ”Sivunopeus”. Hän kirjoittaa johtopäätöksen kokonaisena virkkeenä: ”Mobiilisivut latautuvat 6 sekunnissa, kaksi kertaa suositusta hitaammin”. Kun luet pelkät otsikot järjestyksessä, saat koko perustelun. Dian sisältö on olemassa todistamaan otsikon.

Ennen dioja konsultit kirjoittavat ensin tämän otsikkolistan. Sitä kutsutaan *haamuesitykseksi* (ghost deck), ja siinä heikon perustelun korjaaminen on halvinta.

## 2. Hyödynnä viitekehystä tekoälyn avulla

Alla oleva prompti etenee kolmessa kierroksessa. Ensin tekoäly haastattelee sinua ja lukee aineistosi. Sitten se rakentaa kanssasi tarinan ja haamuesityksen, ja vasta lopuksi se tekee diat. Päätät itse perustelusta, ja tekoäly hoitaa luonnostelun ja taiton.

### Vaihe 1: Kokoa keskeinen aineisto

Kerää raportti, auditointi, taulukko tai muistiinpanot, jotka haluat esittää. Voit liittää tiedostot suoraan ChatGPT:hen, Geminiin tai Claudeen, joten lukuja ei tarvitse kirjoittaa uudelleen. Myös muutama ranskalainen viiva riittää.

Poista ennen latausta kaikki luottamuksellinen tieto, jota yrityksesi ei salli tekoälytyökaluihin.

### Vaihe 2: Liitä tämä prompti ChatGPT:hen, Geminiin tai Claudeen

Kopioi prompti ja liitä aineistosi samaan viestiin. Tekoäly lukee aineiston ja kysyy vain sen, mitä siitä vielä puuttuu.

```
Autat minua rakentamaan johdolle suunnatun esityksen strategiakonsulttien menetelmillä: SCQR-tarina (tilanne, haaste, kysymys, ratkaisu), pyramidiperiaate ja väiteotsikot.

Etene kolmessa kierroksessa. Pysähdy jokaisen kierroksen lopussa ja odota vastaustani.

KIERROS 1: HAASTATTELU
Lue liittämäni aineisto. Kysy sen jälkeen vain se, mikä on vielä epäselvää, yksi kysymys kerrallaan ja enintään viisi kysymystä. Sinun tulee tietää
- mitä päätöstä tai toimenpidettä haluan yleisöltä
- kuka yleisö on ja mitä se jo tietää
- keskeiset havainnot ja luvut (aineistostani, jos olen liittänyt sen)
- suositukseni, jos minulla on sellainen (jos ei ole, ehdota sitä aineiston perusteella)
- esityksen kieli, kesto minuutteina ja pakolliset sisällöt.
Tiivistä ymmärryksesi viiteen kohtaan ja pyydä minua vahvistamaan ne.

KIERROS 2: TARINA JA HAAMUESITYS
1. Kirjoita pääviesti: yksi virke, joka vastaa kysymykseen ja kertoo suosituksen.
2. Kirjoita SCQR, yksi virke kustakin osasta.
3. Anna 2–4 tukipilaria. Niiden tulee olla MECE-periaatteen mukaisia (ei päällekkäisyyksiä, mitään olennaista ei puutu), ja jokaisen tulee tukea suoraan pääviestiä.
4. Rakenna haamuesitys taulukoksi, jossa on sarakkeet: Nro | Väiteotsikko | Näyttö dialla | Visualisointi | Lähde.
   - Väiteotsikko on enintään 15 sanan kokonainen virke, joka kertoo johtopäätöksen eikä aihetta. (”Mobiilisivut latautuvat 6 sekunnissa, kaksi kertaa suositusta hitaammin”, ei ”Sivunopeus”.)
   - Yksi viesti diaa kohden. Varaa noin yksi dia kahta minuuttia kohden ja yksityiskohdille liiteosio.
   - Viimeisellä dialla kerrotaan yksi päätös tai seuraava askel, jota tarvitsen yleisöltä.
5. Tee kaksi tarkistusta ja kerro löytämäsi ongelmat:
   - Lue pelkät otsikot järjestyksessä. Kertovatko ne koko perustelun yksinään?
   - Todistaako jokaisen dian näyttö sen otsikon?
Kysy minulta, mitä muutetaan. Toista, kunnes sanon tarinan olevan hyväksytty.

KIERROS 3: DIAT
Kun hyväksyn tarinan, rakenna esitys dia kerrallaan:
- väiteotsikko diaotsikkona
- 3–5 lyhyttä kohtaa tai yksi kaavio, joka todistaa otsikon (kerro kaaviotyyppi ja sen taustalla oleva data)
- lähde pienellä dian alareunassa
- 2–4 virkkeen puhujan muistiinpanot.
Käytä selkeää ja yhtenäistä konsulttityyliä: valkoinen tausta, yksi korostusväri, ei kuvapankkikuvia. Jos pystyt luomaan tiedostoja tai käyttämään canvasia, tee varsinaiset diat (Google Slides tai .pptx). Jos et pysty, anna diojen sisältö valmiiksi liitettävässä muodossa.

KOKO TEHTÄVÄN SÄÄNNÖT
- Älä koskaan keksi lukuja, lähteitä tai lainauksia. Jos näyttö puuttuu, kirjoita [DATA PUUTTUU: mikä] ja kerro siitä minulle.
- Erota aineistoni faktat omista oletuksistasi ja merkitse oletukset.
- Jos data ei tue suositustani, sano se suoraan ja ehdota vahvempaa suositusta.
- Selkeä kieli. Ei muotisanoja eikä täytetekstiä.
```

### Vaihe 3: Vastaa kysymyksiin

Tekoäly kysyy vain sitä, mitä se ei löytänyt aineistostasi. Verkkosivuston suorituskykyauditoinnissa vastaukset voisivat olla esimerkiksi nämä:

- **Haluttu päätös:** kahden sprintin suorituskykykorjausten hyväksyminen ennen kevään kampanjaa
- **Yleisö:** markkinointijohtaja ja teknologiajohtaja, eivät syvällisesti teknisiä
- **Keskeiset havainnot:** mobiilisivujen lataus kestää 6,2 sekuntia (LCP), keskimääräinen sivukoko on 10 megatavua ja liikenteestä 70 % tulee mobiilista
- **Suositus:** kuvat ja kolmansien osapuolten skriptit optimoidaan ensin, sivupohjat uudistetaan seuraavalla neljänneksellä
- **Muoto:** suomi, 15 minuuttia

### Vaihe 4: Korjaa tarina ennen dioja

Tämä on arvokkain vaihe. Lue haamuesityksen otsikot järjestyksessä kuin olisit toimitusjohtaja. Jos perustelu ei kestä pelkkien otsikoiden varassa, pyydä tekoälyä korjaamaan se nyt. Yhden taulukkorivin muuttaminen on paljon helpompaa kuin kymmenen valmiin dian muokkaaminen.

Käy läpi myös jokainen `[DATA PUUTTUU]`-merkintä. Anna puuttuva luku tai poista väite.

### Vaihe 5: Rakenna diat

Kun hyväksyt tarinan, tekoäly rakentaa diat:

- **Gemini:** ota Canvas käyttöön ennen aloittamista. Sen avulla valmiin esityksen voi viedä Google Slidesiin.
- **ChatGPT:** pyydä kolmannen kierroksen lopussa ladattava .pptx-tiedosto.
- **Claude:** pyydä kolmannen kierroksen lopussa PowerPoint-tiedosto. Claude tekee siitä ladattavan .pptx-tiedoston.

Tarkista työkalusta riippumatta jokainen luku lähdettä vasten ennen esittämistä. Lisää sitten brändipohjasi ja vaihda tilalle oikeat kaaviot. Lopputuloksena saat konsulttityylisesti perustellun esityksen ilman tyhjästä diasta aloittamista.
