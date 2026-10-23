---
layout: ../../../layouts/Base.astro
title: Luo McKinsey-tyylinen esitys ChatGPT:n tai Geminin avulla
documentTitle: "McKinsey-tyylinen esitys ChatGPT:llä | Niko Karppinen"
description: "Rakenna ymmärrettävä McKinsey-tyylinen esitys tekoälyn avulla. Mukana diaesimerkit, SCQR, pyramidiperiaate, kopioitava prompti ja diatesti."
date: 2025-11-03
updatedDate: 2026-10-23
category: ai-prompting
tags: ["ChatGPT", "Gemini", "esitykset"]
image: /images/blog/mckinsey-presentation-pyramid-principle.jpeg
imageAlt: "Violettiin pukuun pukeutunut kilpikonnakonsultti esittelee taulua, jossa yksi pääviesti yhdistyy kolmeen sitä tukevaan perusteluun"
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

Jos dian otsikosta ei ymmärrä, mistä on kyse, diaa ei lueta. Yleisön pitäisi ensin selvittää, mitä mittari tarkoittaa, mitä kaaviossa tapahtuu ja miksi asian pitäisi kiinnostaa. Siinä vaiheessa puhuja on jo seuraavassa diassa.

Tämä opas on sinulle, jos teet esityksiä ihmisille, jotka eivät tunne aihettasi yhtä hyvin kuin sinä. Sillä ei ole väliä, oletko konsultti vai talon oma asiantuntija. Esimerkkinä on verkkosivuston nopeus, mutta sama tapa sopii muuhunkin aineistoon.

[Siirry suoraan kopioitavaan promptiin](#2-kopioi-prompti-chatgpthen-geminiin-tai-claudeen).

Me konsultit puhumme aiheista, jotka tunnemme läpikotaisin. Siksi unohdamme helposti, että yleisölle ne ovat uusia. Kun olet sanonut ”LCP” satoja kertoja, se kuulostaa arkikieleltä. Yleisölle se on kolme kirjainta.

Lyhenteen kirjoittaminen auki ei auta. Largest Contentful Paint on sekin vain kolme vierasta sanaa. Kerro, mitä käsite tarkoittaa ja miksi se liittyy juuri tähän asiaan.

Tähän auttaa McKinsey-tyylisen esityksen väiteotsikko. Otsikko kertoo tärkeimmän havainnon heti, ja dian sisältö näyttää, mihin se perustuu. Kun luet pelkät otsikot peräkkäin, saat koko perustelun. Yksityiskohtiin voi syventyä, jos haluaa.

ChatGPT, Gemini tai Claude osaa rakentaa tällaisen esityksen, kunhan se tietää muutakin kuin luvut: kenelle puhut, miksi ja mitä haluat yleisön ymmärtävän. Oppaan prompti kysyy nämä, ennen kuin yksikään dia syntyy. Luonnoksen arviointi jää sinulle. Tekoäly on hyvä renki mutta huono isäntä.

## Miksi McKinsey-tyylinen esitys toimii?

Hyvä konsulttiesitys säästää yleisöltä työtä matkalla luvuista johtopäätökseen. Siisti kaavio voi näyttää luvut selkeästi ja silti jättää kertomatta, mitä niistä pitäisi ajatella. Esityksen tekijän pitää kertoa, mikä aineistossa vastaa kysymykseen ja kuinka pitkälle siitä voi päätellä.

## Samat luvut, eri määrä työtä lukijalle

Katsotaan kahta diaa, jotka on tehty samoista kuvitteellisista luvuista. Luvut kertovat, kuinka kauan sivun latauksen alusta kestää, ennen kuin sivun suurin näkyvä sisältöelementti tulee näkyviin. Mittarin nimi on LCP eli Largest Contentful Paint.

### Raportoiva dia näyttää mittaustulokset

<figure>

![Raportoiva dia, jonka otsikko on ”LCP-tulokset”. Harmaat palkit esittävät sivuryhmät järjestämättöminä. Tuotesivujen palkki on pisin, mutta kaaviossa ei ole arviointirajaa eikä tarkkoja arvoja palkkien vieressä.](@assets/blog/mckinsey-raportoiva-dia-fi.jpeg)

<figcaption>Raportoiva dia jättää tulkinnan yleisölle. Kuvitteellinen esimerkkiaineisto, dia tehty tekoälyn avulla. <a href="/images/blog/mckinsey-raportoiva-dia-fi.jpeg">Avaa raportoiva dia täysikokoisena</a>.</figcaption>
</figure>

Kaaviosta näkee, että tuotesivujen palkki on pisin. Mittarin tuntevalle asiantuntijalle dia riittää säännölliseen seurantaan. Muut jäävät miettimään: mitä LCP tarkoittaa, onko iso luku hyvä vai huono ja mihin tulosta pitäisi verrata? Vähän kuin kauppakeskuksen kartta ilman ”Olet tässä” -merkkiä.

Lopun ehdotus seurata sivuston nopeutta jää sekin yleiseksi. Se ei kerro, mistä selvitys aloitetaan.

### Analysoiva dia auttaa tulkitsemaan luvut

<figure>

![Analysoiva dia kertoo tuotesivujen suurimman sisältöelementin näkyvän 3,7 sekuntia hyvän tuloksen rajaa myöhemmin. Tuotesivujen 6,2 sekunnin palkki on violetti. Katkoviiva näyttää 2,5 sekunnin arviointirajan. Suositus on selvittää hitauden syyt ennen korjausten valintaa.](@assets/blog/mckinsey-analysoiva-dia-fi.jpeg)

<figcaption>Samat luvut, mutta otsikko kertoo havainnon, kaavio näyttää vertailukohdan ja suositus seuraavan tutkimusvaiheen. Kuvitteellinen esimerkkiaineisto, dia tehty tekoälyn avulla. <a href="/images/blog/mckinsey-analysoiva-dia-fi.jpeg">Avaa analysoiva dia täysikokoisena</a>.</figcaption>
</figure>

Otsikon ymmärtää, vaikkei tuntisi LCP-lyhennettä. Kaavion 2,5 sekunnin arviointiraja antaa luvuille vertailukohdan. Palkkien järjestys helpottaa vertailua, ja violetti korostus ohjaa huomion tuotesivuihin.

Molempien diojen esimerkkiluvut ovat samat:

| Sivuryhmä | LCP mobiilissa, 75. persentiili |
|---|---|
| Tuotesivut | 6,2 sekuntia |
| Kategoriasivut | 3,8 sekuntia |
| Artikkelit | 3,1 sekuntia |
| Etusivu | 2,4 sekuntia |

Luvut eivät ole peräisin todelliselta sivustolta, eikä niillä ole mittausjaksoa. Hyvän LCP-tuloksen raja, enintään 2,5 sekuntia, perustuu [Googlen LCP-ohjeeseen](https://web.dev/articles/lcp). LCP:n 75. persentiili on arvo, jonka alapuolelle tai kohdalle 75 prosenttia havainnoista sijoittuu. Tuotesivujen esimerkkiluku 6,2 sekuntia ei siis tarkoita kaikkien käyntien samaa latausaikaa eikä koko sivun valmistumista.

Raportoiva dia sopii seurantaan. Analysoiva dia sopii silloin, kun luvuista pitää päättää jotain.

## Mitä otsikon pitää kertoa?

”LCP-tulokset” nimeää aiheen. Se ei vielä kerro, mitä tuloksissa kannattaa huomata.

Väiteotsikko kertoo havainnon, ja dian sisällöstä näkee, pitääkö se paikkansa. Siksi otsikko ja kaavio suunnitellaan yhdessä.

Jos otsikko väittäisi tuotekuvien aiheuttavan hitauden, tämän esimerkin aineisto ei todistaisi sitä. Kaavio näyttää sivuryhmien välisen eron, mutta ei selitä sen syytä. Siksi suosituksena on selvittää syyt ennen korjausten valintaa.

Kaikki diat eivät tarvitse omaa suositusta. Yksi dia voi tunnistaa ongelman, seuraava selvittää sen syitä ja kolmas vertailla ratkaisuja. Esityksen otsikoista pitäisi pystyä seuraamaan, miten perustelu etenee.

## Mitä yleisö jo tietää?

Ennen sanavalintoja täytyy tietää, kenelle puhutaan. Markkinointijohtaja ja sivuston kehittäjä voivat tarvita samasta aineistosta erilaisen esityksen. Tehtävänimike ei silti kerro, mitä ihminen aiheesta tietää.

Selvitä, mitä yleisö tuntee ennestään, mitkä käsitteet tarvitsevat selityksen ja mitä haluat sen ymmärtävän tai päättävän. Jos lähtötaso on epäselvä, kysy tilaajalta tai yleisöä tuntevalta henkilöltä.

Valmisteluvaiheessa voit arvioida, onko yleisöllä eväät seurata päättelyäsi. Ymmärtääkö yleisö sen oikeasti, selviää vasta palautteesta ja keskustelusta.

Tein tämän artikkelin esimerkkidiat keskustellen tekoälyn kanssa. Ensimmäisen analysoivan dian otsikossa luki LCP, eikä kaaviossa näkynyt arviointirajaa. Dia oli siisti, mutta vaati lukijalta liikaa taustatietoa. Annoin palautetta, ja tekoäly korjasi sen.

## Rakenna perustelu ennen dioja

SCQR-malli, pyramidiperiaate ja väiteotsikot auttavat suunnittelemaan kokonaisuuden, ennen kuin avaat PowerPointin. Kun puhun McKinsey-tyylistä, tarkoitan tätä konsulttiviestinnän tapaa. Tämä ei ole McKinseyn virallinen esityspohja.

### SCQR jäsentää tilanteen ja ratkaistavan kysymyksen

SCQR muodostuu sanoista Situation, Complication, Question ja Resolution: tilanne, haaste, kysymys ja ratkaisu. Sen avulla voit kuvata, miksi esitys tarvitaan ja mihin kysymykseen se vastaa.

| Osa | Tehtävä | Esimerkki saman kuvitteellisen aineiston pohjalta |
|---|---|---|
| Tilanne | Määrittelee tarkasteltavan asian. | ”Arvioimme sivuston eri sivuryhmien nopeutta mobiilissa.” |
| Haaste | Tuo esiin ongelman. | ”Tuotesivujen LCP on 6,2 sekuntia, kun hyvän tuloksen raja on 2,5 sekuntia.” |
| Kysymys | Rajaa seuraavan päätöksen. | ”Mihin suorituskyvyn selvitystyö kannattaa kohdistaa ensin?” |
| Ratkaisu | Antaa aineiston tukeman vastauksen. | ”Selvitetään tuotesivujen hitauden syyt ennen korjausten valintaa.” |

### Pyramidiperiaate järjestää vastauksen ja perustelut

Pyramidiperiaatteessa pääviesti tulee ensin. Sen alle ryhmitellään sitä tukevat perustelut ja niiden alle näyttö. Periaatteen on kehittänyt [Barbara Minto](https://www.barbaraminto.com/).

Esimerkin pääviesti voisi olla: ”Kohdistetaan ensimmäinen suorituskykyselvitys tuotesivuihin.” Sitä tukee kaksi perustelua: tuotesivujen tulos on vertailun heikoin ja ylittää hyvän tuloksen rajan 3,7 sekunnilla. Näyttönä ovat sivuryhmien mittaustulokset ja arviointirajan määritelmä.

SCQR muotoilee kysymyksen ja vastauksen. Pyramidiperiaate järjestää perustelut.

### Haamuesitys näyttää, eteneekö perustelu

Kirjoita ennen dioja niiden otsikot järjestykseen. Tätä luonnosta kutsutaan haamuesitykseksi eli ghost deckiksi. Lisää jokaisen otsikon viereen, millä aineistolla aiot perustella sen.

Jos otsikoiden välistä puuttuu päättelyaskel tai väitteelle ei löydy näyttöä, korjaa se tässä vaiheessa. Taulukkorivin muuttaminen on helpompaa kuin valmiin dian rakentaminen uudelleen.

Saman kuvitteellisen aineiston pohjalta neljän dian otsikkoketju voisi olla tällainen:

| Dia | Otsikko | Tehtävä ja perustelu |
|---|---|---|
| 1 | Tuotesivujen suurin sisältöelementti näkyy vasta 6,2 sekunnissa | Osoittaa ongelman vertaamalla tulosta muihin sivuryhmiin ja hyvän tuloksen 2,5 sekunnin rajaan. |
| 2 | Sivuryhmien nopeusvertailu ei vielä kerro hitauden syytä | Rajaa sen, mitä aineistosta tiedetään. Pelkät ajat eivät osoita, mikä latausta hidastaa. |
| 3 | Tuotesivujen hitauden syyt on selvitettävä ennen korjausten valintaa | Perustelee ehdotetun tutkimusvaiheen. Suosituksessa oletetaan, että korjaus halutaan kohdistaa todettuun syyhyn. |
| 4 | Tuotesivujen suorituskykyselvitys esitetään hyväksyttäväksi | Tuo yleisölle päätösehdotuksen. Päätöstä varten tarvitaan vielä työn rajaus, kustannus ja aikataulu. |

Viimeinen dia ei olisi näillä tiedoilla valmis päätettäväksi. Joko puuttuvat tiedot hankitaan, tai kokouksessa sovitaan ensin vain selvityksen rajauksesta. Haamuesitys auttaa huomaamaan tämän ennen valmiiden diojen tekemistä.

## Hyvä dia kertoo myös, mistä johtopäätökset ovat peräisin

Lähdemerkintä auttaa arvioimaan lukua. Sen pitäisi kertoa aineiston alkuperä, ajanjakso, rajaukset ja olennainen käsittely. Erota mittaustiedon lähde arviointikriteerin lähteestä.

Tämän artikkelin esimerkissä luvut ovat kuvitteellisia. Google on LCP:n määritelmän ja arviointirajan lähde. Todellisessa esityksessä merkitään myös mittausjakso ja esimerkiksi se, onko kyse mobiilikäynneistä, yksittäisistä sivuista vai sivuryhmistä.

Jos olet laskenut tai ryhmitellyt tuloksia itse, kerro menetelmä. Tarkemman kuvauksen voi siirtää liitteeseen, kunhan dia sisältää tulkinnan kannalta olennaiset rajaukset. Pitkä lähdemerkintä ei yksin tee aineistosta luotettavaa.

### Erota havainto, laskelma, mahdollinen selitys ja suositus

Näillä on eri tehtävät esityksen perustelussa:

| Väitelaji | Esimerkki | Mitä pitää tarkistaa? |
|---|---|---|
| Aineistosta havaittu | Tuotesivujen LCP on 6,2 sekuntia. | Mitä käyntejä ja ajanjaksoa luku kuvaa? |
| Aineistosta laskettu tai päätelty | Tulos ylittää 2,5 sekunnin rajan 3,7 sekunnilla. | Ovatko laskelma, yksiköt ja vertailukohta oikein? |
| Mahdollinen selitys | Raskaat tuotekuvat saattavat hidastaa sisältöelementin näkymistä. | Tämä on tutkittava oletus. Nykyinen vertailu ei osoita syytä. |
| Suositus | Selvitetään tuotesivujen hitauden syyt ensin. | Miksi tämä eteneminen on perusteltu ja millä oletuksilla? |

Mieti myös muita selityksiä. Jos tuotesivuja selataan muita useammin heikolla mobiiliyhteydellä, ero voi johtua käyttäjistä, ei sivupohjasta. Selvitä, millä tiedolla nämä selitykset voi erottaa toisistaan. Otsikko ei saa väittää enempää kuin aineisto tukee.

### Tarkista, mitä aineisto todella kuvaa

Vertaa lähdettä, ajanjaksoa, havaintojen määrää, analyysiyksikköä ja laskentamenetelmää siihen, mitä otsikko väittää. Koko verkkotunnuksen tulos ei sellaisenaan kuvaa tuotesivuja, eikä lyhyen mittausjakson tulos osoita koko vuoden kehitystä.

Myöskään yksittäisten sivujen p75-arvojen keskiarvo ei yleensä vastaa sivuryhmän todellista 75. persentiiliä. Ryhmän tuloksen laskemiseen tarvitaan soveltuva aineisto ja määritelty laskentamenetelmä. Jos menetelmä ei ole tiedossa, merkitse se avoimeksi kysymykseksi.

Oman kävijämittauksen eli RUM-mittauksen lähdemerkinnän voisi rakentaa esimerkiksi näin:

> Lähde: oma RUM-mittaus, [mittausjakso]. Mobiili, LCP p75. Sivuryhmät muodostettu URL-polun perusteella. Otos: [sivulatausten määrä].

Tämä on täytettävä lähdemerkintämalli. Hakasulkeissa olevat tiedot pitää korvata todellisilla tiedoilla. Myös ryhmittely ja mittaustapa on kuvattava oman aineiston mukaisesti.

## Luo oma esityksesi tekoälyn avulla

Tekoäly muotoilee havaintoja, ehdottaa rakennetta ja luonnostelee dioja nopeasti. Sinä annat kontekstin ja arvioit tuloksen. Varo erityisesti sujuvia otsikoita, koska ne lupaavat helposti enemmän kuin luvut kestävät.

Yleisön pitää pystyä myös kyseenalaistamaan johtopäätös. Siksi lähteiden, vertailukohtien ja epävarmuuksien pitää näkyä myös tekoälyn luonnoksessa.

Alla oleva prompti etenee kolmessa kierroksessa: konteksti, tarina ja diat. Jokaisen kierroksen lopussa tekoäly odottaa palautettasi. Kolmannella kierroksella hyväksytään ensin yksi mallidia, jotta samoja esitystavan ongelmia ei tarvitse korjata koko esityksestä.

### 1. Kokoa aineisto

Kerää raportti, auditointi, taulukko tai muistiinpanot, jotka haluat esittää. Liitä mukaan lähteet, ajanjaksot ja tiedossasi olevat rajaukset. Jos aineisto on alustavaa, sano se.

Poista ennen latausta luottamuksellinen tieto, jota yrityksesi ei salli viedä tekoälytyökaluihin.

### 2. Kopioi prompti ChatGPT:hen, Geminiin tai Claudeen

Liitä aineisto samaan keskusteluun. Prompti ohjaa tekoälyä kysymään puuttuvan kontekstin ja tarkistamaan sekä perustelut että muotoilun.

```text
Autat minua rakentamaan esityksen konsulttiviestinnän menetelmillä: SCQR (tilanne, haaste, kysymys, ratkaisu), pyramidiperiaate ja väiteotsikot.

Etene kolmessa kierroksessa. Pysähdy jokaisen lopussa ja odota vastaustani.

KIERROS 1: AINEISTO JA YLEISÖN LÄHTÖTASO
Lue aineistoni. Kysy sen jälkeen vain se, mikä on epäselvää, yksi kysymys kerrallaan ja aluksi enintään viisi kysymystä. Selvitä:
- kenelle esitys on tarkoitettu, mitä yleisö tietää aiheesta ja mihin arvio perustuu
- mitä haluan yleisön ymmärtävän tai päättävän
- mitkä ovat keskeiset havainnot, lähteet, ajanjaksot ja aineiston rajaukset
- mikä on oma suositukseni, jos minulla on sellainen
- millä kielellä ja missä tilanteessa esitys pidetään, kauanko se kestää ja mitä sen on pakko sisältää.
Älä päättele lähtötasoa vain tehtävänimikkeistä. Selvitä, mitkä käsitteet tarvitsevat selityksen. Erota tiedetty konteksti oletuksista. Jos olennainen asia jää avoimeksi, kysy siitä ennen etenemistä.
Tarkista, että lähde, ajanjakso, analyysiyksikkö, aineiston kattavuus ja laskentamenetelmä sopivat aiottuun väitteeseen. Älä laske sivuryhmän persentiiliä yksittäisten sivujen persentiilien keskiarvona. Jos menetelmä ei ole tiedossa, merkitse se avoimeksi kysymykseksi.
Tiivistä ymmärryksesi ja pyydä minua vahvistamaan se.

KIERROS 2: TARINA JA HAAMUESITYS
Ennen tarinaa luokittele keskeiset väitteet taulukoksi:
Väite | Luokka | Näyttö tai laskentatapa | Oletukset ja puutteet
Käytä luokkia: suoraan aineistosta havaittu, laskettu tai päätelty, mahdollinen selitys, suositus.
Tunnista keskeisille johtopäätöksille vaihtoehtoiset uskottavat tulkinnat. Kerro, mitä lisätietoa niiden erottamiseen tarvitaan. Älä keksi vaihtoehtoja ilman perustetta. Muotoile vahvin aineiston tukema väite ja rajaa sitä, jos näyttö ei riitä.
Jos ratkaiseva tieto puuttuu, pyydä se tai ehdota rajatumpaa esityksen tavoitetta ennen tarinan rakentamista.

1. Kirjoita pääviesti: yksi virke, joka vastaa ratkaistavaan kysymykseen.
2. Kirjoita SCQR, yksi virke kustakin osasta.
3. Ryhmittele pääviestiä tukevat perustelut 2–4 kokonaisuudeksi. Vältä päällekkäisyyksiä ja tarkista, puuttuuko olennainen perustelu.
4. Rakenna haamuesitys taulukoksi:
   Nro | Dian tehtävä | Väiteotsikko | Näyttö | Visualisointi ja vertailukohta | Lähde ja rajaukset
   - Yksi pääviesti diaa kohden.
   - Muotoile otsikot yleisön lähtötasoon sopivalla kielellä. Selitä tarvittavat erikoistermit.
   - Käytä johtopäätöksen kertovaa otsikkoa analyysidioissa. Taustadia voi nimetä aiheen suoraan.
   - Päätä diojen määrä keston ja sisällön perusteella. Varaa lisäanalyysit liitteisiin.
   - Kaikki diat eivät tarvitse suositusta. Etene havainnoista perustellusti kohti tavoiteltua päätöstä tai ymmärrystä.
5. Tarkista otsikoiden eteneminen, väitteiden näyttö ja yleisöltä edellytetty ennakkotieto. Osoita puuttuvat päättelyaskeleet.
Kysy, mitä muutetaan. Älä tee dioja, ennen kuin hyväksyn tarinan.

KIERROS 3: DIAT JA LAADUNTARKISTUS
Tee ensin yksi analyysidia malliksi hyväksytystä haamuesityksestä. Sen pitää sisältää otsikko, näyttö, tarvittava vertailukohta ja lähdemerkintä. Näytä myös visuaalinen toteutus, jos työkalusi pystyy siihen.
Pysähdy ja odota hyväksyntääni. Korjaa mallidia palautteeni perusteella. Älä tee loppuja dioja ennen mallidian hyväksyntää.
Rakenna sen jälkeen loput diat sovittua rakennetta ja esitystapaa noudattaen. Jokaisessa diassa on
- otsikko, joka vastaa dian tehtävää ja yleisön lähtötasoa
- otsikkoa tukeva kaavio, taulukko, kuva tai lyhyt teksti
- lukujen yksiköt sekä tulkintaan tarvittavat arviointirajat tai muut vertailukohdat
- lähdemerkintä, jossa ovat aineiston alkuperä, ajanjakso, rajaukset ja olennainen käsittely
- 2–4 virkkeen puhujan muistiinpanot.
Erota datan lähde arviointikriteerin lähteestä. Ehdota seuraavaa toimenpidettä, kun se kuuluu dian tehtävään.
Tarkista lähdemerkintöjä vasten myös väitteen analyysiyksikkö, ajanjakso ja laskentamenetelmä. Tuo tulkintaan vaikuttavat epävarmuudet näkyviin.

MUOTOILU
- Käytä esityspohjaani, jos olen toimittanut sen. Muuten käytä vaaleaa taustaa, rajattua väripalettia ja yhtä tai kahta kirjasinperhettä.
- Korosta vain olennaista. Väreillä ja kuvakkeilla pitää olla johdonmukainen merkitys. Älä välitä tietoa vain värillä.
- Tavoittele enintään kaksirivisiä otsikoita ja yhtenäistä otsikkokokoa vastaavissa dioissa. Tiivistä ennen fontin pienentämistä. Jos kahteen riviin pakottaminen heikentää ymmärrettävyyttä, ehdota perusteltu poikkeus.
- Kohdista otsikot, lähteet, dianumerot ja muut toistuvat elementit samoihin kohtiin. Pysy marginaalien sisällä.
- Varmista luettava tekstikoko, kontrasti ja riittävät välit. Poista päällekkäisyydet.
- Sijoita selitteet lähelle kohteitaan. Käytä järjestystä ja korostuksia havaintojen avaamiseen.
- Käytä numerointia, kun järjestyksellä on merkitys. Käytä muuten luetelmamerkkejä.
- Kuvakkeiden pitää tukea ymmärtämistä ja noudattaa samaa tyyliä. Poista tarpeettomat koristeet, animaatiot ja tekstin toisto.

TARKISTA ENNEN LUOVUTUSTA
1. Lähtötaso: Mitä ennakkotietoja kukin dia edellyttää? Anna tarpeellinen tausta ja selitä termit. Nosta esiin vaatimukset, jotka ylittävät yleisöstä annetun kuvauksen. Älä väitä yleisön ymmärtävän esitystä.
2. Näyttö: Tukeeko aineisto väitteitä? Näkyvätkö yksiköt, vertailukohdat, lähteet ja rajaukset? Onko yhteyttä väitetty syyksi ilman näyttöä?
3. Visualisointi: auttavatko kaavio, järjestys ja korostukset arvioimaan otsikon väitettä?
4. Muotoilu: tarkista tekstin mahtuminen, luettavuus, marginaalit, kohdistukset ja toistuvien elementtien yhtenäisyys.
5. Eteneminen: poista toisto, tarkista päättelyaskeleet ja siirrä pääviestille tarpeettomat yksityiskohdat liitteisiin.
Vastaa lisäksi jokaisesta analyysidiasta kolmeen kysymykseen:
- Mitä tästä pitäisi ymmärtää? Nimeä pääviesti ja tarkista sanavalinnat suhteessa yleisön kuvattuun lähtötasoon.
- Miksi väite on perusteltu? Nimeä näyttö, vertailukohta, rajaukset ja tarvittavat oletukset.
- Miten tämä vie esitystä eteenpäin? Kerro dian yhteys seuraavaan perusteluun, päätökseen tai tavoiteltuun ymmärrykseen. Älä pakota jokaiseen diaan erillistä suositusta.
Korjaa ongelmat ja tarkista muutetut diat uudelleen.
Raportoi ratkaisemattomat ongelmat muodossa:
Dia | Ongelma | Vaikutus | Tarvittava korjaus
Jos et voi tarkistaa varsinaista ulkoasua, kerro se. Älä väitä tehneesi visuaalista tarkistusta pelkän tekstin perusteella.

KOKO TEHTÄVÄN SÄÄNNÖT
- Älä keksi lukuja, lähteitä, päivämääriä tai lainauksia. Merkitse puute muodossa [DATA PUUTTUU: mikä] ja kerro, miten se rajoittaa johtopäätöstä.
- Erota aineistoni faktat oletuksista, tulkinnoista ja suosituksista. Merkitse kuvitteellinen aineisto.
- Jos aineisto ei tue suositustani, sano se ja ehdota aineiston tukemaa etenemistä.
- Kirjoita selkeää kieltä äläkä käytä muotisanoja tai täytetekstiä.
- Jos työkalusi tukee esitystiedostoja, tee ladattava .pptx tai työkalun tukema esitysmuoto. Muuten anna sisältö valmiiksi liitettävässä muodossa ja kerro rajoitus.
```

### 3. Vastaa kysymyksiin ja korjaa tarina

Saman kuvitteellisen suorituskykyesimerkin pohjalta voisit antaa nämä vastaukset:

- **Haluttu päätös:** hyväksytään tuotesivujen suorituskyvyn tarkempi selvitys ennen korjausten valintaa.
- **Yleisö:** Markkinoinnin ja teknologian vastuuhenkilöt. Varmistetaan erikseen, tuntevatko he LCP-mittarin ja sen arviointirajat.
- **Keskeiset havainnot:** Tuotesivujen LCP p75 on mobiilissa 6,2 sekuntia, etusivun 2,4 sekuntia. Hyvän tuloksen raja on 2,5 sekuntia. Hitauden syy ei käy ilmi tästä vertailusta.
- **Suositus:** selvitetään ensin, mikä hidastaa tuotesivujen suurimman näkyvän sisältöelementin renderöitymistä.
- **Muoto:** suomi, 15 minuutin esitys ja sen jälkeen keskustelu.

Lue haamuesityksen otsikot järjestyksessä. Tarkista, ettei niiden väliltä puutu päättelyä. Käy läpi jokainen `[DATA PUUTTUU]`-merkintä: anna puuttuva tieto, rajaa väitettä tai poista se.

### 4. Rakenna diat ja tarkista tiedosto

Kun hyväksyt tarinan, pyydä ensin yksi mallidia käyttämäsi työkalun tukemaan muotoon. Tarkista siitä otsikko, vertailukohdat, korostukset, lähdemerkintä ja tekstin luettavuus. Anna palaute ja hyväksy esitystapa ennen muiden diojen tekemistä.

Kaikki palvelut eivät osaa tehdä esitystiedostoa. Jos tiedostoa ei synny, pyydä diojen sisältö ja kaavioiden lähtödata erikseen. Silloin ulkoasun tarkistat vasta taitetusta esityksestä.

Avaa valmis tiedosto. Tarkista jokainen luku lähteestä ja jokainen dia siinä muodossa, jossa aiot esittää tai jakaa sen. Tekoälyn oma tarkistus ei korvaa tätä vaihetta.

## Kolmen kysymyksen diatesti

Käy jokainen analyysidia läpi näillä kysymyksillä ennen yksityiskohtaista muotoilutarkistusta:

1. **Mitä tästä pitäisi ymmärtää?** Kirjoita pääviesti yhdellä virkkeellä. Tarkista, ilmaiseeko otsikko sen ja mitä ennakkotietoja sen sanavalinnat edellyttävät.
2. **Miksi väite on perusteltu?** Osoita väitettä tukeva aineisto, vertailukohta ja rajaukset. Jos et pysty, hanki lisää näyttöä tai rajaa väitettä.
3. **Miten tämä vie esitystä eteenpäin?** Nimeä yhteys seuraavaan perusteluun, päätökseen tai tavoiteltuun ymmärrykseen. Kaikki diat eivät tarvitse omaa toimenpide-ehdotusta.

Tämä on tekijän tarkistus esityksen rakenteesta ja perusteluista. Se ei vielä osoita, miten yleisö tulkitsee esityksen.

Suosittelen vielä yhtä testiä: näytä luonnos yhdelle yleisöä edustavalle ihmiselle ja pyydä häntä kertomaan omin sanoin, mitä hän siitä päättelee. Jos vastaus eroaa pääviestistäsi, korjaa otsikot ja selitykset.
