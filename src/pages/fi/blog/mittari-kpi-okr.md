---
layout: ../../../layouts/Base.astro
title: "Mittari, KPI ja OKR: mistä ne eroavat ja milloin mittarista tulee KPI?"
description: "Mittari, KPI ja OKR ovat kaikki lukuja, mutta ne vastaavat eri kysymyksiin. Metriikkapyramidi auttaa valitsemaan, mitä seurataan ja mitä johdetaan."
date: 2026-11-01
category: analytics
tags: ["mittarit", "KPI", "OKR", "analytiikka"]
draft: true
citations:
  - name: "Understand Business Metrics for Data Analysts (Most Get This Wrong)"
    url: "https://www.youtube.com/watch?v=9BwpcO-0LuI"
  - name: "Set goals with OKRs"
    url: "https://rework.withgoogle.com/intl/en/guides/set-goals-with-okrs"
  - name: "Sitoutumisaste ja välitön poistuminen"
    url: "https://support.google.com/analytics/answer/12195621?hl=fi"
  - name: "About Analytics sessions"
    url: "https://support.google.com/analytics/answer/9191807?hl=en"
---

Raportissa voi olla kolmekymmentä lukua, ja kaikkia kutsutaan KPI:ksi. Kun kaikki on avainmittari, mikään ei ohjaa päätöksiä.

Mittari, KPI ja OKR ovat kaikki lukuja. Ne vastaavat vain eri kysymyksiin. Selkein erottelu on metriikkapyramidi, jonka esittelen [Christinen videon](https://www.youtube.com/watch?v=9BwpcO-0LuI) mukaan. Se on yksittäisen valmentajan näkemys aloitteleville data-analyytikoille, ei standardi. Luvut ovat hänen nyrkkisääntöjään.

## Mitä pyramidin kolme tasoa ovat?

**Mittari** on mikä tahansa luku, jonka voi seurata. Videon YouTube-kanavalla niitä ovat katselut, tilaajat, tykkäykset, kommentit ja videon pituus. Tässä vaiheessa ei vielä kysytä, onko luku olennainen.

**KPI** eli avainmittari tarkoittaa niitä muutamia mittareita, joista näkee, onnistuuko tiimi. Videon kanavatiimi valitsi sadoista kolme: keskimääräisen katseluajan, napsautussuhteen ja uudet tilaajat videota kohden. Nyrkkisääntö on korkeintaan 5–10 KPI:tä tiimiä kohden, ja johto hyväksyy ne. Jos johtoa ei kiinnosta mittari lainkaan, se on todennäköisesti vain mittari.

**OKR** (objectives and key results) kertoo suunnan ja tavoitteen aikarajan kanssa. Videon esimerkki on 90 000 tilaajaa joulukuuhun mennessä. Se on yksinkertaistus. Googlen [OKR-oppaan](https://rework.withgoogle.com/intl/en/guides/set-goals-with-okrs) mukaan objective on kunnianhimoinen kuvaus siitä, minne tiimi haluaa päästä. Key results ovat mitattavia välietappeja, jotka kuvaavat tuloksia eivätkä tehtyjä töitä. Opas on alun perin vuodelta 2016 ja kuvaa Googlen omaa käytäntöä.

Mittarit löytyvät datasta, KPI:t raporteista ja OKR:t johdon tavoitteista.

## Miten mittarista tulee KPI?

Videon mukaan KPI valitaan kahdella kysymyksellä:

1. Voimmeko vaikuttaa tähän mittariin?
2. Kuvaako mittari todella suoritusta?

Esimerkki toisesta on sivustolla vietetty aika. Jos ostaja viipyy minuutin tai kaksikymmentä ja ostaa silti, aika ei kerro ostamisesta mitään.

[Mittarin laatutarkistus](/fi/tyokalut/mittarin-laatutarkistus/) kysyy samaa. Sen kysymys 2 selvittää, tiedetäänkö tulokseen vaikuttavat toimet. Kysymys 10 selvittää, voisiko luku parantua ilman tavoiteltua hyötyä. Yhteys on minun tulkintani, ei videon väite.

## Miltä se näyttää käytännössä?

Esimerkit ovat laatutarkistuksen kuvitteellisia malleja, eivät asiakastapauksia.

Liidit: mittari on myynnin hyväksymät liidit kuukaudessa. Siitä tulee KPI, kun tiimi valitsee sen keskeisten joukkoon ja sillä on omistaja, laskentatapa ja vertailukohta. Tavoite on nostaa määrä 20:stä 25:een kolmessa kuukaudessa. Videon mukaan aloitteleva analyytikko kertoo luvun. Kokeneempi kertoo, mitä muutos tarkoittaa tavoitteelle.

Verkkokauppa: tavoite on nostaa ostavien istuntojen osuus 2,0 prosentista 2,4 prosenttiin kolmessa kuukaudessa. Alennuskampanja voi nostaa sitä ja samalla syödä tilauskohtaista katetta. Siksi KPI:n pariksi tarvitaan vastamittari, tässä kate ja palautettujen tilausten osuus.

## Onko GA4:n sitoutumisaste hyvä KPI?

Ei automaattisesti. GA4 laskee session aktiiviseksi, kun se kestää yli 10 sekuntia (oletus, joka on [muutettavissa](https://support.google.com/analytics/answer/9191807?hl=en)), sisältää avaintapahtuman tai sisältää vähintään kaksi sivun tai näytön katselua. Sitoutumisaste on aktiivisten sessioiden osuus kaikista. [Googlen määritelmä](https://support.google.com/analytics/answer/12195621?hl=fi) kertoo laskentatavan, mutta ei sitä, onko luku hyvä KPI.

Kaksi samannimistä lukua voi siis perustua eri rajaan. Kirjaa raja laskentatavan osaksi ja pidä se samana vertailujaksoilla. Ohje ei kerro, koskeeko muutos jo kerättyä dataa, joten tarkista se ennen kuin vertaat.

Yhteydenottoa tavoittelevan sivuston sitoutumisaste voi nousta, kun sivuja ja katseluita lisätään, vaikka yhteydenotot eivät lisäänny. Tämä on oma päätelmäni, ei Googlen väite.

Koko sivuston tasolla luku on heikko myös siksi, että se mittaa kaikkia sivuja samalla mitalla. Kävijä vilkaisee aikataulun ja lähtee tyytyväisenä. Käynti onnistui, mutta GA4 voi laskea sen ei-aktiiviseksi. Tämä on käytännön näkemys, ei mitattu tulos. Valitse sivutyypit, joilla pidempi käynti on tavoite, ja arvioi ne erikseen.

## Mitä pyramidi ei kerro?

Se kertoo, mihin mittari kuuluu, ei sitä, onko luku luotettava. Suositukseni on, ettei mittarista tehdä KPI:tä ennen kuin laskentatapa on dokumentoitu, datan laatu tarkistettu ja vertailukohta löytyy. Laatutarkistus kattaa tämän puolen. Kokeile sitä mittariin, jonka haluat nostaa KPI:ksi: [Mittarin laatutarkistus](/fi/tyokalut/mittarin-laatutarkistus/).

Mikä raportin luvuista on KPI vain nimeltä?

## Lähteet

- Video: [Understand Business Metrics for Data Analysts (Most Get This Wrong)](https://www.youtube.com/watch?v=9BwpcO-0LuI). Mielipide ja opetusmateriaali, ei tutkimus. Pyramidimalli ja KPI-valinnan kaksi kriteeriä.
- Google re:Work: [Set goals with OKRs](https://rework.withgoogle.com/intl/en/guides/set-goals-with-okrs). Dokumentaatio Googlen omasta käytännöstä, julkaistu alun perin 2016. OKR:n osat ja suositellut määrät.
- Google Analytics -ohje: [Sitoutumisaste ja välitön poistuminen](https://support.google.com/analytics/answer/12195621?hl=fi). Dokumentaatio. Aktiivisen session ehdot.
- Google Analytics -ohje: [About Analytics sessions](https://support.google.com/analytics/answer/9191807?hl=en). Dokumentaatio. Aktiivisen session aikarajan säätökohta.
- Esimerkit liideistä ja verkkokaupasta ovat [Mittarin laatutarkistuksen](/fi/tyokalut/mittarin-laatutarkistus/) kuvitteellisia malleja. Ne eivät perustu asiakasdataan.
