---
layout: ../../../layouts/Base.astro
title: Luo McKinsey-tyylinen esitys ChatGPT:n tai Geminin avulla
documentTitle: "McKinsey-tyylinen esitys ChatGPT:llä | Niko Karppinen"
description: Opi luomaan McKinsey-tyylisiä esityksiä ChatGPT:n tai Geminin avulla hyödyntämällä SCQR-mallia ja pyramidiperiaatetta. Vaiheittainen opas liike-elämän ammattilaisille.
date: 2025-11-03
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
  - "Pyramid Principle"
  - "MECE"
  - "SCQR"
  - "McKinsey & Company"
---

Useimmat ammattilaiset osaavat tuottaa dataa. Harvempi osaa muuttaa datan tarinaksi, joka saa päätöksentekijät toimimaan.

Siksi McKinseyn, BCG:n ja Bainin kaltaiset konsulttiyhtiöt käyttävät esitysten jäsentämiseen loogisia viitekehyksiä, kuten SCQR-mallia ja pyramidiperiaatetta. Niiden avulla hajanaisista havainnoista muodostetaan selkeä kokonaisuus, joka etenee havainnoista suosituksiin ja toimintaan.

Hyvä puoli on se, ettei niiden hyödyntäminen vaadi taustaa strategiakonsultoinnissa. Yhdellä tekoälypromptilla voit luoda valmiin, johdolle sopivan esitysrungon ChatGPT:n tai Geminin avulla. Näin se tehdään.

### 1. Aloita viitekehyksestä: Näin konsultit rakentavat esityksen tarinan

McKinseyn ja vastaavien strategiayhtiöiden esityksissä käytetään usein kahta toisiinsa liittyvää viitekehystä:

**SCQR-mallia** ja **pyramidiperiaatetta**.

Yhdessä ne tekevät perustelusta sekä *loogisen* että *toimintaan ohjaavan*.

---

#### SCQR-malli: Esityksen tarina

SCQR-rakenne muodostuu sanoista Situation, Complication, Question ja Resolution. Se vie yleisön yhteisestä lähtötilanteesta kohti päätöstä.

| Osa | Tarkoitus | Esimerkki verkkosivuston suorituskykyauditoinnista |
|---|---|---|
| Tilanne | Kuvaa asian, jonka kaikki jo tunnistavat. | ”Verkkosivuston nopeus vaikuttaa suoraan konversioihin ja SEO-näkyvyyteen.” |
| Haaste | Tuo esiin ongelman tai jännitteen. | ”Auditoinnissa havaittiin yli kuuden sekunnin latausaikoja ja 10 megatavun sivukokoja.” |
| Kysymys | Muotoilee keskeisen päätöksen. | ”Miten suorituskykyä voidaan parantaa rakentamatta koko sivustoa uudelleen?” |
| Ratkaisu | Antaa selkeän, dataan perustuvan vastauksen. | ”Optimoidaan median lataus ensin ja uudistetaan URL-rakenne seuraavaksi.” |

Tämä tarinarakenne varmistaa, että yleisö ymmärtää *miksi aiheella on merkitystä* ennen suositusten esittämistä.

#### Pyramidiperiaate: Esityksen rakenne

Kun tarina on määritelty, **pyramidiperiaate** järjestää perustelut ylhäältä alaspäin eteneväksi kokonaisuudeksi.

Jokainen taso tukee sen yläpuolella olevaa tasoa:

1. **Taso 1, pääviesti:** Vastaus kysymykseen eli esityksen ratkaisu.

2. **Taso 2, tukipilarit:** Kolme selkeää teemaa tai suositusta, jotka tukevat pääviestiä.

3. **Taso 3, näyttö:** Data, mittarit ja havainnot, jotka perustelevat jokaisen tukipilarin.

Rakenne tekee esityksestä selkeän. Jokaisella yksityiskohdalla on tehtävä, ja kaikki havainnot tukevat yhtä pääviestiä.

### 2. Hyödynnä viitekehystä tekoälyn avulla

Kun esityksen logiikka on selvä, voit antaa tekoälyn auttaa rakenteen ja sisällön muodostamisessa.

Tarvitset vain muutaman keskeisen tiedon esityksen aiheesta.

Näin etenet:

### Vaihe 1: Kokoa keskeinen aineisto

Kerää ennen aloittamista tärkeimmät datapisteet, havainnot ja auditointitulokset, jotka haluat esittää.

Et tarvitse vielä dioja. Muutama ranskalainen viiva tuloksista, ongelmista ja tarvittavista toimenpiteistä riittää.

### Vaihe 2: Liitä tämä prompti ChatGPT:hen tai Geminiin

Kopioi ja liitä seuraava teksti sellaisenaan.

Tekoäly pyytää sinulta kuusi lyhyttä tietoa ja muodostaa niiden perusteella **valmiin McKinsey-tyylisen esitysrungon SCQR-mallin ja pyramidiperiaatteen avulla**.

```
**Rooli:** Toimi liike-elämän viestintään erikoistuneena konsulttina, joka hallitsee **McKinsey & Companyn SCQR-mallin (Situation–Complication–Question–Resolution) ja pyramidiperiaatteen**. Erityisosaamistasi on monimutkaisten analyysien, auditointien ja strategioiden muuttaminen selkeiksi, asiakaslähtöisiksi ja toimintaan ohjaaviksi esityksiksi.

**Tavoite:** Luo täydellinen esitysrakenne, joka noudattaa tarkasti määriteltyä viitekehystä. Lopputuloksen tulee palvella yhtä kahdesta tavoitteesta: 1) **Hankkeen hyväksynnän saaminen** tai 2) **Kriittisten auditointihavaintojen esittäminen**.

**Syöttötiedot, jotka käyttäjän tulee antaa:**
1. **[TULOSTUSKIELI]:** Esimerkiksi ensin suomi, sitten englanti
2. **[AIHEEN_OTSIKKO]:** Esimerkiksi Strategia toisen vuosineljänneksen operatiivisten kustannusten vähentämiseksi 15 prosentilla
3. **[ESITYKSEN_TAVOITE]:** Valitse yksi: Hankkeen hyväksynnän saaminen TAI Kriittisten auditointihavaintojen esittäminen
4. **[YLEISÖ]:** Esimerkiksi johtoryhmä, operatiivisen toiminnan johtajat tai tekninen arviointiryhmä
5. **[KESKEISET_DATAPISTEET]:** Esityksessä tarvittavat tärkeät luvut, esimerkiksi ”Nykyinen virheprosentti on 22 %”, ”Ratkaisun arvioitu kustannus on 4 miljoonaa euroa” tai ”Auditoinnissa havaittiin kolme kriittistä tietoturva-aukkoa”
6. **[KESKEINEN_RATKAISU_TAI_SUOSITUS]:** Tärkein toimenpide, vastaus tai suositeltu seuraava askel, esimerkiksi ”Meidän tulee ottaa keskitetty pilviarkkitehtuuri käyttöön kolmanteen vuosineljännekseen mennessä”

**Tulosteen rajoitteet ja rakenne:**
* **Pituus:** Esitysrungon tulee sisältää **8–12 loogisesti ryhmiteltyä diaa tai osiota**, jotka sopivat 15–30 minuutin esitykseen.
* **Sävy:** Erittäin ammattimainen, dataan perustuva, varma ja toimintaan ohjaava.
* **Muoto:** Laadi esitysrakenne alla olevan mallin mukaisesti. Kaiken sisällön tulee olla määritellyllä **[TULOSTUSKIELELLÄ]**.

---
## **ESITYSRUNKO: [AIHEEN_OTSIKKO]**

### **I. Johdanto, SCQR ja kiinnostuksen herättäminen**

*   **Dia 1: Otsikko ja tilanne (S)**
    *   **Otsikko:** [AIHEEN_OTSIKKO]
    *   **Alaotsikko:** [Esittäjän nimi / Päivämäärä / Asiayhteys]
    *   **S, tilanne:** [Laadi 1–2 virkettä yleisön tuntemasta ja yhteisesti hyväksytystä lähtötilanteesta. Tämä on nykytila.]

*   **Dia 2: Haaste (C)**
    *   **Otsikko:** Keskeinen haaste
    *   **C, haaste:** [Laadi 1–2 vaikuttavaa virkettä keskeisestä haasteesta, riskistä tai kiireellisyydestä.]
    *   **Keskeinen data:** [Nosta yksi **[KESKEISET_DATAPISTEET]**-kohdan luku näkyvästi esiin. Tämä toimii huomion herättäjänä.]

*   **Dia 3: Ohjaava kysymys (Q)**
    *   **Otsikko:** Suunta eteenpäin
    *   **Q, kysymys:** [Laadi yksi yksinkertainen kysymys, johon esitys vastaa. Kysymyksen tulee liittyä suoraan haasteeseen.]

*   **Dia 4: Ratkaisumme ja pääväite**
    *   **R, ratkaisu ja tason 1 pääviesti:** [Esitä **[KESKEINEN_RATKAISU_TAI_SUOSITUS]** selkeänä ja tiiviinä vastauksena kysymykseen.]
    *   **Etenemismalli:** Käymme läpi ratkaisua tukevat **kolme pilaria**: [Luettele alla olevien tason 2 osioiden otsikot.]

### **II. Runko, pyramidiperiaate ja MECE-pilarit**

*(Jokaisen tason 2 kohdan tulee olla toisistaan erillinen, mutta yhdessä kattava eli MECE-periaatteen mukainen. Jokaisen kohdan tulee tukea suoraan ratkaisua R.)*

*   **Dia 5: Pilari 1: [Tiivis ja toimintaan ohjaava otsikko 1]**
    *   **Tason 2 väite:** [Tämän pilarin tärkein havainto tai suositus.]
    *   **Tason 3 perustelut ja näyttö:** [Kuvaa miksi ja mitä. Viittaa yhteen **[KESKEISET_DATAPISTEET]**-kohdan datapisteeseen.]
    *   **Vaikutus asiakkaalle:** [Selitä hyöty **[YLEISÖLLE]**.]

*   **Diat 6–7: Pilari 2: [Tiivis ja toimintaan ohjaava otsikko 2]**
    *   **Tason 2 väite:** [Tämän pilarin tärkein havainto tai suositus.]
    *   **Tason 3 perustelut ja näyttö:** [Kuvaa miksi ja mitä. Käytä esimerkkejä tai havainnollistavaa dataa.]
    *   **Tarvittava toimenpide:** [Määritä asiakkaan tehtäväksi tuleva konkreettinen askel.]

*   **Diat 8–9: Pilari 3: [Tiivis ja toimintaan ohjaava otsikko 3]**
    *   **Tason 2 väite:** [Tämän pilarin tärkein havainto tai suositus.]
    *   **Tason 3 perustelut ja näyttö:** [Kuvaa miksi ja mitä. Sisällytä kustannus-hyötyanalyysi tai riskienhallintaan liittyvät tiedot.]
    *   **Tämän pilarin seuraavat vaiheet:** [Määritä konkreettinen tuotos tai tavoiteltu lopputulos.]

### **III. Yhteenveto ja toiminta**

*   **Dia 10: Taloudellinen yhteenveto tai riskienhallinta tarvittaessa**
    *   [Tee yhteenveto sijoitetun pääoman tuotosta, toimettomuuden kustannuksista tai auditointihavainnon vakavuudesta.]

*   **Dia 11: Johtopäätös ja toimintakehotus**
    *   **Yhteenveto:** Suunta eteenpäin on selkeä: **[Toista tason 1 pääviesti eli ratkaisu R]**.
    *   **Kolmen pilarin yhteenveto:** [Luettele lyhyesti kolme tason 2 kohtaa.]
    *   **Toimintakehotus ja tarvittava päätös:** Määritä **[ESITYKSEN_TAVOITTEEN]** perusteella yksi selkeä pyyntö, esimerkiksi ”Hyväksytään 4 miljoonan euron budjetti välittömästi” tai ”Nimetään johtoryhmätason omistaja kolmen korjaavan toimenpiteen toteutukselle”.
```

### Vaihe 3: Anna tarvittavat tiedot

Kun olet liittänyt promptin, tekoäly pyytää sinulta edellä mainitut kuusi tietoa.

Vastaa niihin selkeästi. Jokainen vastaus antaa tekoälylle aineistoa esityksen tarinan rakentamiseen.

Esimerkiksi:

- **TULOSTUSKIELI:** Suomi

- **AIHEEN_OTSIKKO:** Verkkosivuston suorituskyvyn optimointi

- **ESITYKSEN_TAVOITE:** Kriittisten auditointihavaintojen esittäminen

- **YLEISÖ:** Operatiivinen tiimi

- **KESKEISET_DATAPISTEET:** Largest Contentful Paint puolittui ja sivun kokonaiskoko pieneni 10 megatavusta 5 megatavuun

- **KESKEINEN_RATKAISU_TAI_SUOSITUS:** Optimoi sisältö AI Overview -näkyvyyttä varten

### Vaihe 4: Tarkista, viimeistele ja esitä

Tekoäly palauttaa **dia kerrallaan etenevän esitysrungon**, jonka voit:

- Siirtää PowerPointiin tai Google Slidesiin

- Täydentää kuvilla, kaavioilla ja brändin mukaisella tyylillä

- Esittää päätöksentekijöille selkeänä ja jäsenneltynä suosituksena

Lopputuloksena saat McKinsey-tyylisesti rakennetun esityksen ilman tyhjästä diasta aloittamista.