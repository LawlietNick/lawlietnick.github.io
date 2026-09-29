---
layout: ../../../layouts/Base.astro
title: "Keskitetty vai vasemmalle tasattu teksti? Näin tasaus vaikuttaa luettavuuteen verkossa"
documentTitle: "Tekstin tasaus ja luettavuus verkossa | Niko Karppinen"
description: "Tekstin tasaus vaikuttaa lukurytmiin, silmäiltävyyteen ja saavutettavuuteen. Katso, milloin keskitys toimii ja miksi leipäteksti kannattaa yleensä tasata vasemmalle."
date: 2026-07-21
category: accessibility
tags: ["saavutettavuus", "typografia", "käytettävyys", "WCAG"]
image: /images/blog/tekstin-tasaus-saavutettavuus.jpeg
imageAlt: "Vihreä silmälasipäinen sarjakuvakilpikonna vertailee keskitettyä ja vasemmalle tasattua tekstikappaletta"
imageCredit: "Luotu OpenAI ImageGenillä"
relatedHeading: "Lisää luettavaa"
alternate:
  lang: en
  href: /blog/text-alignment-accessibility/
about:
  - "Saavutettavuus"
  - "Tekstin tasaus"
  - "Tekstin luettavuus"
mentions:
  - "WCAG 2.2"
  - "Keskitetty teksti"
  - "Tasattu teksti"
  - "Lukihäiriö"
  - "Typografia"
citations:
  - name: "The influence of line spacing and text alignment on visual search of web pages"
    url: "https://doi.org/10.1016/j.displa.2007.04.003"
    type: "ScholarlyArticle"
  - name: "Mobile Survey Design Research - Experiment 13: Text Alignment"
    url: "https://www.census.gov/library/working-papers/2022/adrm/rsm2022-05.html"
  - name: "Investigating Effects of Typographic Variables on Webpage Reading Through Eye Movements"
    url: "https://doi.org/10.1038/s41598-019-49051-x"
    type: "ScholarlyArticle"
  - name: "An eight experiment sequence to determine reading equality"
    url: "https://doi.org/10.1016/S0378-7206(98)00059-7"
    type: "ScholarlyArticle"
  - name: "Web Content Accessibility Guidelines (WCAG) 2.2"
    url: "https://www.w3.org/TR/WCAG22/"
  - name: "Understanding Success Criterion 1.4.8: Visual Presentation"
    url: "https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html"
  - name: "Page Structure Tutorial"
    url: "https://www.w3.org/WAI/tutorials/page-structure/"
  - name: "Supplemental Guidance: Text Justification"
    url: "https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Supplemental_Guidance%3A_Text_Justification"
  - name: "Text/Typographical Layout"
    url: "https://webaim.org/techniques/textlayout/"
  - name: "Dyslexia Style Guide 2023"
    url: "https://cdn.bdadyslexia.org.uk/uploads/documents/Advice/style-guide/BDA-Style-Guide-2023.pdf?v=1680084017"
  - name: "Why Justified (or Centered) Text is Bad for Accessibility"
    url: "https://www.boia.org/blog/why-justified-or-centered-text-is-bad-for-accessibility"
  - name: "Centered Text Is Harder to Read"
    url: "https://tracigardner.github.io/TechComm/document-design/page--centered-text-is-harder-to-read.html"
---

Tekstin tasaus näyttää helposti pieneltä visuaaliselta valinnalta. Käytännössä se vaikuttaa siihen, kuinka vaivattomasti lukija löytää uuden rivin alun, silmäilee sisältöä ja pysyy mukana pidemmässä tekstissä.

Vasemmalle tasattu teksti on turvallisin oletus suomen kaltaisissa vasemmalta oikealle luettavissa kielissä. Keskitetty teksti voi toimia otsikoissa, lyhyissä nostoissa ja yksittäisissä toimintakehotteissa, mutta pidemmissä kappaleissa sen epätasainen vasen reuna lisää rivien seuraamiseen liittyvää työtä.

> **Tiivistetty vastaus:** Jos sisältö on tarkoitettu luettavaksi, silmäiltäväksi ja ymmärrettäväksi, tasaa leipäteksti vasemmalle. Käytä keskitystä vain lyhyissä ja selvästi rajatuissa elementeissä.

Keskitetyn leipätekstin välttäminen on saavutettavuuden hyvä käytäntö, ei yleinen WCAG-kielto.

## Päätöstaulukko tekstin tasaukseen

| Sisältötyyppi | Suositus | Perustelu |
| --- | --- | --- |
| Artikkelin leipäteksti | Vasemmalle | Vakaa rivinalku ja selkeä lukurytmi |
| Pitkä ingressi | Vasemmalle | Useita rivejä ja paljon informaatiota |
| Lyhyt hero-otsikko | Keskitys mahdollinen | Toimii erillisenä, korostavana viestinä |
| Hero-kuvaus | Tavallisesti vasemmalle | Teksti rivittyy helposti mobiilissa |
| Lyhyt CTA-rivi | Keskitys mahdollinen | Yksi selkeä toiminto |
| Sähköpostin leipäteksti | Vasemmalle | Kapea mobiilinäkymä ja silmäiltävä rakenne |
| PDF-raportti | Vasemmalle | Dokumentti on tarkoitettu luettavaksi |
| Lyhyt sitaatti | Keskitys mahdollinen | Rajattu visuaalinen nosto |
| Pitkä sitaatti | Vasemmalle | Muuttuu käytännössä leipätekstiksi |
| Virheilmoitus | Riippuu pituudesta | Yksi lause voi toimia keskitettynä |
| Lomakkeen ohje | Vasemmalle | Käyttäjän pitää löytää tieto nopeasti |

Taulukko on käytännön suunnitteluohje. Esimerkiksi myöhemmin mainittu 2–3 rivin raja ei ole tutkimuksessa osoitettu raja tai WCAG-vaatimus.

## Ensin yksi olennainen termiero

Ensin on syytä erottaa kaksi helposti sekoittuvaa käsitettä.

**Keskitetty teksti**, englanniksi *center-aligned text*, sijoittaa jokaisen rivin vaakasuunnassa keskelle. Rivien alkukohdat vaihtelevat niiden pituuden mukaan.

**Molempiin reunoihin tasattu teksti**, englanniksi *justified text*, muodostaa suoran reunan sekä vasemmalle että oikealle. Selain tai tekstinkäsittelyohjelma saavuttaa tämän muuttamalla sanojen tai merkkien välisiä etäisyyksiä.

Ero on tutkimusnäytön kannalta olennainen. Lingin ja van Schaikin vuonna 2007 julkaistu tutkimus vertasi vasemmalle tasattua ja molempiin reunoihin tasattua tekstiä. Se ei ollut suora keskitetyn ja vasemmalle tasatun tekstin vertailu. Tutkimusta voidaan käyttää osoittamaan, että tekstin asettelu vaikuttaa verkkosivulla tehtävään visuaaliseen hakuun, mutta sen tuloksia ei pidä esittää suorana mittauksena keskitetyn tekstin vaikutuksista.

## Miten tasaus vaikuttaa lukemiseen?

### Luettavuus

Rivin lopussa katseen täytyy palata seuraavan rivin alkuun. Vasemmalle tasatussa kappaleessa paluukohta on aina sama ja toimii visuaalisena ankkurina.

Keskitetyssä kappaleessa jokainen rivi alkaa eri kohdasta. Yhden rivinvaihdon kohdalla lisätyö on lähes huomaamaton. Pitkässä kappaleessa sama pieni etsintä kuitenkin toistuu kymmeniä kertoja.

[WebAIMin typografiaohjeen](https://webaim.org/techniques/textlayout/) mukaan vasemmalle tasattu teksti on lähes aina helpoin ratkaisu vasemmalta oikealle luettavissa kielissä. Myös British Dyslexia Association suosittelee vasemmalle tasausta ilman molempien reunojen tasausta, jotta rivien alut ja loput löytyvät helpommin ja sanavälit säilyvät tasaisina.

W3C:n Low Vision Accessibility Task Force -työryhmän [täydentävä ohje](https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Supplemental_Guidance%3A_Text_Justification) nostaa esiin saman mekanismin. Usean rivin keskitetty teksti tekee seuraavan rivin aloituskohdasta vaihtelevan, mikä voi vaikeuttaa tasaisen lukurytmin säilyttämistä. Ohje on informatiivinen suositus, ei itsenäinen WCAG-vaatimus.

<figure>
  <img
    src="/src/assets/blog/tekstin-tasaus-katseen-paluuliike.jpeg"
    alt="Kaavio katseen paluuliikkeestä. Keskitetyssä tekstissä katse palaa vaihteleviin aloituskohtiin, vasemmalle tasatussa tekstissä samalle pystylinjalle, vaikka rivien pituudet vaihtelevat."
  />
  <figcaption>Vasemmalla keskitetty teksti, jossa seuraavan rivin aloituskohta vaihtuu. Oikealla vasemmalle tasattu teksti, jossa katse voi palata aina samaan linjaan.</figcaption>
</figure>

### Silmäiltävyys

Digitaalisesta sisällöstä etsitään usein otsikoita, avainsanoja ja kohtaa, joka vastaa lukijan kysymykseen.

Vasemmalle tasattu sisältö muodostaa selkeän linjan, jota pitkin katse voi edetä. Jos otsikot, ingressit ja kappaleet on kaikki keskitetty, niiden aloituskohdat vaihtelevat. Sivun rakenne on silloin vaikeampi hahmottaa yhdellä silmäyksellä.

### Lukunopeus ja ymmärtäminen

Luettavuus, lukunopeus ja luetun ymmärtäminen eivät ole sama asia. Tekstin asettelu voi tehdä lukemisesta visuaalisesti työläämpää ilman, että ero näkyy suoraan lukunopeudessa tai siinä, kuinka hyvin sisältö muistetaan.

U.S. Census Bureau vertasi vuonna 2022 mobiilissa vasemmalle tasattua ja keskitettyä tekstiä 30 osallistujalla. [Tutkimuksessa](https://www.census.gov/library/working-papers/2022/adrm/rsm2022-05.html) ei havaittu tilastollisesti merkitsevää eroa lukunopeudessa tai luetun ymmärtämisessä. Ymmärtämisen mediaanitulos oli molemmissa versioissa 66,67 prosenttia. Sen sijaan 80 prosenttia osallistujista piti vasemmalle tasattua versiota parempana, ja tutkijat suosittelivat vasemmalle tasausta älypuhelimella esitettävissä kyselyissä.

Tulos on tärkeä rajaus. Keskitetystä tekstistä ei ole perusteltua sanoa, että se automaattisesti hidastaa lukemista tai heikentää ymmärtämistä. Perustellumpi väite on, että monirivinen keskitys tekee rivien aloituskohdista epäsäännöllisiä ja voi lisätä seuraavan rivin löytämiseen tarvittavaa visuaalista työtä.

Kun tekstipalsta kapenee tai käyttäjä suurentaa tekstiä, sama sisältö jakautuu useammalle riville. Keskitetyssä tekstissä tämä tarkoittaa samalla useampia vaihtelevia rivinaloituskohtia. Tästä ei silti seuraa, että jokainen keskitetty otsikko tai lyhyt nosto olisi vaikeasti ymmärrettävä.

## Mitä tutkimus kertoo tekstin tasauksesta?

Jonathan Ling ja Paul van Schaik tutkivat rivivälin ja tekstin tasauksen vaikutusta verkkosivujen visuaaliseen hakuun. Tutkimuksessa leveämpi riviväli paransi tarkkuutta ja nopeutti reaktioaikoja. Vasemmalle tasattu teksti johti parempaan suoritukseen kuin molempiin reunoihin tasattu teksti, vaikka osallistujat pitivät ulkonäöltään enemmän tasatusta versiosta.

Havainto nostaa esiin hyödyllisen eron:

> *Esteettinen mieltymys ei aina kerro, kuinka tehokkaasti sisältöä pystytään käyttämään.*

Keskitetyn ja vasemmalle tasatun tekstin suorempi vertailu löytyy U.S. Census Bureaun vuoden 2022 mobiilitutkimuksesta. Siinä lukunopeudessa tai ymmärtämisessä ei löytynyt tilastollisesti merkitsevää eroa, mutta 80 prosenttia osallistujista suosi vasemmalle tasattua versiota. Tämä erottaa toisistaan mitatun suorituksen ja käyttäjän kokemuksen: vasemmalle tasaus voi tuntua selkeämmältä, vaikka pienessä kokeessa ero ei näkyisi lukunopeudessa tai ymmärtämistuloksissa.

Vuonna 2019 Scientific Reportsissa julkaistu [silmänliiketutkimus](https://doi.org/10.1038/s41598-019-49051-x) tarkasteli todellisten verkkosivujen useita typografisia ominaisuuksia yhtä aikaa. Suurempi vasemmalle tasatun tekstin osuus liittyi pienempään fiksaatiomäärään. Tutkijat tulkitsivat vasemmalle tasauksen helpottavan lukemista tämän mittarin perusteella. Tutkimus ei silti ollut puhdas koe, jossa sama sisältö olisi näytetty vain keskitettynä ja vasemmalle tasattuna, joten sitä ei pidä käyttää suorana mittauksena keskityksen aiheuttamasta nopeuserosta.

Myös molempiin reunoihin tasattua tekstiä koskeva tutkimus muistuttaa siitä, etteivät erot lukunopeudessa ole yksiselitteisiä. Coll, Fjermestad ja Coll vertasivat vuonna 1998 kahdeksassa kokeessa neljää tasaustapaa. Seitsemässä kahdeksasta kokeesta lukuaikojen välillä ei löytynyt merkitsevää eroa, eikä luetun säilymisessä löytynyt tilastollisesti merkitseviä eroja.

Tutkimusnäyttö tukee siis varovaisempaa johtopäätöstä: tekstin tasaus vaikuttaa lukemisen visuaaliseen rakenteeseen ja voi vaikuttaa silmänliikkeisiin sekä koettuun helppouteen, mutta väite ”keskitetty teksti on aina hitaampaa tai vaikeammin ymmärrettävää” olisi liian ehdoton. Käytännön suositus perustuu tutkimuksen lisäksi typografisiin periaatteisiin sekä WebAIMin, W3C:n ja muiden saavutettavuustoimijoiden ohjeisiin.

## Mobiili tekee ongelman näkyväksi

Työpöydällä kahdelle riville asettuva keskitetty ingressi voi näyttää tasapainoiselta. Puhelimessa sama teksti saattaa jakautua kuudelle riville.

Kun tila kapenee, rivejä ja epäsäännöllisiä aloituskohtia syntyy enemmän. Tekstiblokista tulee korkeampi, ja katseen pitää löytää seuraavan rivin alku useammin eri kohdasta.

Sama tapahtuu, kun käyttäjä suurentaa tekstiä. Siksi tasausta ei kannata hyväksyä vain leveän työpöytänäkymän perusteella.

<figure>
  <img
    src="/src/assets/blog/tekstin-tasaus-mobiili.jpeg"
    alt="Keskitetyn ja vasemmalle tasatun tekstin vertailu työpöytä- ja mobiilinäkymissä. Keskitetyn tekstin epätasainen rivinalku korostuu mobiilissa."
  />
  <figcaption>Vasemmalla keskitetty teksti ja oikealla vasemmalle tasattu teksti. Mobiilissa keskitetyn tekstin epätasainen vasen reuna korostuu.</figcaption>
</figure>

[WCAG 2.2:n](https://www.w3.org/TR/WCAG22/) AA-tason kriteerit edellyttävät, että tekstiä voi suurentaa 200 prosenttiin ilman sisällön tai toiminnallisuuden menetystä ja että sisältö mukautuu kapeaan näkymään ilman tarpeetonta kahdensuuntaista vierittämistä. Nämä vaatimukset eivät kiellä keskitystä, mutta ne tekevät mobiili- ja suurennustestauksesta olennaista.

## Tasaus eri digikanavissa

### Verkkosivut

Verkkosivulla keskitys voi toimia visuaalisena tehokeinona, kun sisältö on lyhyt ja elementillä on yksi selkeä tehtävä.

Sopivia käyttökohteita voivat olla lyhyt hero-otsikko, yhden lauseen nosto, lyhyt sitaatti, tunnusluku, yksittäinen CTA-rivi tai vahvistusviesti. Leipäteksti, pitkä ingressi, palvelukuvaus, ohje tai artikkelikappale kannattaa sen sijaan tasata vasemmalle.

Hyvä käytännön sääntö on arvioida elementti sen pisimmällä todellisella sisällöllä, ei lyhyellä mallitekstillä. ”Kasvua datalla” näyttää keskitettynä moitteettomalta. Viiden lauseen kuvaus siitä, mitä kasvu datalla tarkoittaa, on jo eri eläin. Valitettavasti sekin on päästetty tuotantoon.

### Sähköpostit

Keskitys voi toimia sähköpostin lyhyessä otsikossa, kuvallisessa yläosassa ja painikkeen ympärillä. Varsinainen viesti kannattaa tasata vasemmalle: sähköposteja luetaan paljon kapeissa näkymissä, joissa pitkä keskitetty kappale jakautuu nopeasti usealle riville.

Tämä on kanavasovellus yleisistä luettavuus- ja saavutettavuusperiaatteista, ei väite siitä, että jokainen vasemmalle tasattu sähköposti tuottaisi enemmän klikkauksia. Tasaus voi helpottaa viestin käyttämistä, mutta kampanjan tuloksiin vaikuttavat myös sisältö, lähettäjä, tarjous, ajoitus ja noin kaksikymmentä muuta asiaa, joista joku ehdottaa lopulta painikkeen värin testaamista.

### PDF-dokumentit

PDF voi olla joko visuaalinen esitys tai luettava dokumentti. Näitä ei kannata suunnitella samalla tavalla.

Esityksessä yksittäinen keskitetty väite voi toimia, koska puhuja tuo ympärille puuttuvan kontekstin. Oppaassa, raportissa tai tarjouksessa lukijan pitää pystyä etenemään ilman puhujaa.

Kun PDF on tarkoitettu luettavaksi, tasaa leipäteksti vasemmalle, pidä kappaleet lyhyinä ja käytä väliotsikoita. Vältä liian pitkiä rivejä ja testaa dokumentti myös suurennettuna sekä pienellä näytöllä.

British Dyslexia Associationin opas ulottaa samat tekstin esitystä koskevat periaatteet sähköposteihin, esityksiin, verkkosivuihin ja painettuihin materiaaleihin.

## Saavutettavuus ja WCAG

WCAG 2.2:ssa ei ole yleistä kieltoa keskitetylle tekstille. AAA-tason onnistumiskriteeri 1.4.8 käsittelee tekstiblokkien visuaalista esitystä ja mahdollisuutta muuttaa sitä. Kriteeri mainitsee molempiin reunoihin tasatun tekstin, ei keskitettyä tekstiä koskevaa yleiskieltoa.

[W3C:n kriteeriä 1.4.8 selittävä sivu](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html) täsmentää lisäksi, ettei sisällön oletustyylin tarvitse käyttää kaikkia lueteltuja arvoja. Vaatimus koskee mekanismia, jolla käyttäjä voi saavuttaa kyseisen esitystavan.

Tarkka johtopäätös on siis tämä:

> *Pitkä keskitetty teksti ei ole sellaisenaan WCAG-rikkomus, mutta sen välttäminen on perusteltu saavutettavuus- ja käytettävyyssuositus.*

Myös W3C:n Low Vision Accessibility Task Force -työryhmän [täydentävä ohje](https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Supplemental_Guidance%3A_Text_Justification) suosittelee välttämään keskitystä yhtä virkettä pidemmissä tekstiblokeissa. Kyseessä on hyödyllinen käytännön ohje, ei itsenäinen WCAG-vaatimus.

Tämä ero kannattaa säilyttää. Muuten hyvä käytäntö muuttuu vahingossa keksityksi lakipykäläksi, ja kokous saa uuden sivujuonen.

## Milloin keskitetty teksti toimii?

Keskitys toimii parhaiten, kun teksti on lyhyt, visuaalisesti erillinen ja tarkoitettu pysäyttämään katse.

Sopivia käyttökohteita voivat olla:

- lyhyt hero-otsikko

- yhden lauseen nosto

- yksittäinen tunnusluku

- lyhyt sitaatti

- vahvistusviesti

- lyhyt toimintakehote

Keskitys muuttuu riskiksi, kun elementti sisältää useita virkkeitä tai rivittyy kapeassa näkymässä pitkäksi siksakiksi.

Käytännöllinen design system -sääntö voisi olla:

> *Keskitystä saa käyttää elementissä, joka säilyy enintään 2–3 lyhyenä rivinä tavallisissa näyttöleveyksissä. Pidempi teksti tasataan vasemmalle.*

Raja ei ole tutkimuksessa todistettu taikaluku. Sen hyöty on johdonmukaisuudessa: tiimin ei tarvitse ratkaista samaa kysymystä uudelleen jokaisessa komponentissa.

## Näin testaat tekstin tasauksen

### 1. Käytä pisintä realistista sisältöä

Lyhyt malliteksti peittää ongelmat. Testaa komponentti otsikolla tai kuvauksella, joka vastaa tuotannon pisintä todennäköistä sisältöä.

### 2. Tarkista mobiilinäkymä

Katso, kuinka monelle riville teksti jakautuu. Jos keskitetty sisältö muodostaa pitkän ja epätasaisen reunan, vaihda se vasemmalle tasatuksi.

### 3. Suurenna teksti 200 prosenttiin

Varmista, että sisältö säilyy luettavana, käyttökelpoisena ja loogisesti ryhmiteltynä.

### 4. Silmäile lukematta

Yritä löytää otsikot, avainkohdat ja seuraava toiminto muutamassa sekunnissa. Jos sisältöblokit alkavat jatkuvasti eri kohdista, rakenne voi olla tarpeettoman levoton.

### 5. Mittaa toimintaa, älä vain mieltymystä

Pyydä käyttäjää etsimään tekstistä tietty tieto. Tarkkaile löytämiseen käytettyä aikaa ja virheitä. Kysymys ”kumpi näyttää paremmalta?” mittaa ulkonäkömieltymystä, ei yksin käytettävyyttä.

## Suositus design systemiin

Digitaalisten palvelujen turvallinen oletus on yksinkertainen:

> *Tasaa kaikki luettava leipäteksti vasemmalle. Salli keskitys vain lyhyissä otsikoissa, nostoissa ja toimintakehotteissa, jotka säilyvät lyhyinä myös mobiilissa ja suurennetulla tekstillä.*

Tämä sääntö ei estä visuaalista ilmaisua. Se erottaa korostettavan sisällön luettavasta sisällöstä.

## Yhteenveto

Vasemmalle tasattu teksti on paras lähtökohta leipätekstille suomenkielisissä digitaalisissa palveluissa. Vakaa vasen reuna helpottaa uuden rivin löytämistä ja tekee sisällöstä selkeämmin silmäiltävää.

Keskitetty teksti toimii lyhyissä, erillisissä elementeissä, joiden tehtävä on korostaa. Tekstimäärän kasvaessa, kapeassa näkymässä ja suurennetulla tekstillä vaihtelevia rivinaloituskohtia syntyy enemmän, jolloin keskityksen käyttöä kannattaa arvioida tarkemmin.

## Lähteet

- **Vertaisarvioitu tutkimus:** Ling, J. & van Schaik, P. (2007). [*The influence of line spacing and text alignment on visual search of web pages*](https://doi.org/10.1016/j.displa.2007.04.003). Displays, 28(2), 60–67. Tutkimus käsittelee vasemmalle tasatun ja molempiin reunoihin tasatun tekstin vaikutuksia visuaaliseen hakuun.

- **Suora vasemmalle tasaus vs. keskitys -vertailu:** Figueroa, I., Rivas, A. & Wang, L. (2022). [*Mobile Survey Design Research - Experiment 13: Text Alignment*](https://www.census.gov/library/working-papers/2022/adrm/rsm2022-05.html). U.S. Census Bureau. Tutkimuksessa ei havaittu merkitsevää eroa lukunopeudessa tai ymmärtämisessä, mutta 80 % osallistujista suosi vasemmalle tasausta.

- **Vertaisarvioitu silmänliiketutkimus:** Scaltritti, M., Miniukovich, A., Venuti, P. et al. (2019). [*Investigating Effects of Typographic Variables on Webpage Reading Through Eye Movements*](https://doi.org/10.1038/s41598-019-49051-x). Scientific Reports, 9, 12711. Suurempi vasemmalle tasatun tekstin osuus liittyi pienempään fiksaatiomäärään todellisia verkkosivuja luettaessa.

- **Vertaisarvioitu tutkimussarja:** Coll, J. H., Fjermestad, J. & Coll, R. (1998). [*An eight experiment sequence to determine reading equality*](https://doi.org/10.1016/S0378-7206(98)00059-7). Information & Management, 34(4), 231–242. Kahdeksan kokeen sarjassa tasaustapojen välillä löytyi vain yksi merkitsevä ero lukuajassa eikä merkitseviä eroja muistamisessa.

- **WCAG-standardi:** W3C. [*Web Content Accessibility Guidelines 2.2*](https://www.w3.org/TR/WCAG22/). Onnistumiskriteerit 1.4.4, 1.4.8 ja 1.4.10.

- **W3C:n selittävä ohje:** W3C. [*Understanding Success Criterion 1.4.8: Visual Presentation*](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html). Selitys tekstiblokkien visuaalista esitystä koskevalle AAA-tason kriteerille.

- **W3C:n opetussisältö:** W3C Web Accessibility Initiative. [*Page Structure Tutorial*](https://www.w3.org/WAI/tutorials/page-structure/). Ohje verkkosisällön selkeästä rakenteesta ja esittämisestä.

- **W3C-työryhmän informatiivinen ohje:** Low Vision Accessibility Task Force. [*Supplemental Guidance: Text Justification*](https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Supplemental_Guidance%3A_Text_Justification). Täydentävä ohje keskitetyn ja molempiin reunoihin tasatun tekstin käytöstä; ei itsenäinen WCAG-vaatimus.

- **Saavutettavuusorganisaation käytännön ohje:** WebAIM. [*Text/Typographical Layout*](https://webaim.org/techniques/textlayout/). Ohje tekstin tasauksesta, rivin pituudesta ja tyhjästä tilasta.

- **Saavutettavuusorganisaation tyyliopas:** British Dyslexia Association. [*Dyslexia Style Guide 2023*](https://cdn.bdadyslexia.org.uk/uploads/documents/Advice/style-guide/BDA-Style-Guide-2023.pdf?v=1680084017). Suosituksia vasemmalle tasauksesta, rivin pituudesta ja dokumentin rakenteesta.

- **Käytännön asiantuntijalähde:** Bureau of Internet Accessibility. [*Why Justified (or Centered) Text is Bad for Accessibility*](https://www.boia.org/blog/why-justified-or-centered-text-is-bad-for-accessibility). Tulkinta keskitetyn ja molempiin reunoihin tasatun tekstin saavutettavuusvaikutuksista.

- **Käytännön asiantuntijalähde:** Traci Gardner. [*Centered Text Is Harder to Read*](https://tracigardner.github.io/TechComm/document-design/page--centered-text-is-harder-to-read.html). Havainnollistus keskitetyn tekstin epätasaisesta vasemmasta reunasta.