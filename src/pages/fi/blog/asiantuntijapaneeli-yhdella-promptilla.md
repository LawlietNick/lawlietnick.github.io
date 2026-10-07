---
layout: ../../../layouts/Base.astro
title: "Käytä tekoälyä asiantuntijapaneelina yhdellä promptilla"
documentTitle: "Käytä tekoälyä asiantuntijapaneelina yhdellä promptilla"
description: "Muuta ChatGPT tai Gemini asiantuntijapaneeliksi yhdellä promptilla. Saat useamman näkökulman vastauksia geneeristen yhteenvetojen sijaan."
date: 2025-11-09
updatedDate: 2026-10-06
category: ai-prompting
tags: ["ChatGPT", "Gemini", "promptit", "tekoäly"]
image: /images/blog/ai-panel-with-experts.jpeg
imageAlt: "Eläinasiantuntijapaneeli kokouspöydän ääressä: pöllö, robotti, kilpikonna, kettu ja karhu puhekuplineen"
imageCredit: "Luotu OpenAI ImageGenillä"
imageLicense: cc0
alternate:
  lang: en
  href: /blog/ai-panel-with-experts/
about:
  - "Prompt engineering"
  - "Usean asiantuntijan tekoälyanalyysi"
mentions:
  - "ChatGPT"
  - "Gemini"
---

Useimmat tekoälytyökalut toimivat hyvin nopeisiin yhteenvetoihin. Kysyt monimutkaisen kysymyksen ja saat kohteliaan keskitien vastauksen. Se on hyödyllistä kertaukseen. Se ei ole yhtä hyödyllistä silloin, kun tarvitset selkeän suosituksen.

”Asiantuntijapaneeli”-prompti korjaa tätä. Se muuttaa tekoälyn pieneksi kolmen ammattilaisen keskusteluksi, jossa eri näkökulmat törmäävät, haastavat toisiaan ja tarkentuvat kohti käytännöllistä johtopäätöstä. Lopputulos tuntuu enemmän strategiapalaverilta kuin neutraalilta Wikipedia-yhteenvedolta.

## Miten se toimii

Sinä toimit keskustelun ohjaajana. Tekoäly esittää kolmea asiantuntijaa. Arvo syntyy heidän välisestä jännitteestään.

---

## Vaihe 1. Määrittele kuusi lähtötietoa

Ennen kuin ajat promptin, määrittele kuusi lyhyttä taustatietoa. Suurin osa laadusta syntyy juuri tästä kohdasta.

1. **Aihe**  
   Määrittele laajempi aihealue. Pidä se riittävän rajattuna, jotta kolmella asiantuntijalla voisi olla siitä perusteltuja näkemyksiä.  
   *Esimerkki: ”Etätyön tulevaisuus.”*

2. **Pääkysymys**  
   Muotoile päätös, ongelma tai haaste, johon paneelin pitää vastata.  
   *Esimerkki: ”Miten keskisuuret yritykset voivat säilyttää kulttuurin ja innovaation täysin hajautetussa työmallissa?”*

3. **Asiantuntija A, rooli ja näkökulma**  
   Anna asiantuntijalle rooli ja tarkka näkökulma.  
   *Esimerkki: Organisaatiopsykologi, joka keskittyy tiimin yhtenäisyyteen ja hyvinvointiin.*

4. **Asiantuntija B, rooli ja näkökulma**  
   Lisää vastakkainen tai täydentävä näkökulma.  
   *Esimerkki: Talousjohtaja, joka keskittyy kustannuksiin ja taloudelliseen kestävyyteen.*

5. **Asiantuntija C, rooli ja näkökulma**  
   Lisää kolmas kulma, joka vie keskustelua eteenpäin.  
   *Esimerkki: Teknologiakonsultti, joka keskittyy työkaluihin, tietoturvaan ja tehokkuuteen.*

6. **Vastauskieli**  
   Kerro, millä kielellä keskustelu kirjoitetaan.  
   *Esimerkki: suomi, englanti tai kaksikielinen vastaus.*

Kun nämä kuusi kohtaa ovat valmiina, voit täyttää ne promptiin.

---

## Vaihe 2. Aja prompti

Kopioi alla oleva pohja, täytä sen alussa olevat kuusi kenttää ja liitä se valitsemaasi tekoälytyökaluun, esimerkiksi ChatGPT:hen, Claudeen tai Geminiin. Jos jätät kentän tyhjäksi, tekoäly kysyy sitä ennen aloittamista.

Tämän jälkeen tekoäly kirjoittaa 500–700 sanan keskustelun. Siinä asiantuntijat vastaavat toisilleen nimeltä, haastavat heikkoja perusteluja ja muuttavat kantaansa, kun joku esittää paremman argumentin.

Paneeli päättyy moderaattorin yhteenvetoon ja yhteen konkreettiseen suositukseen. Suosituksessa kerrotaan myös, missä tilanteessa se olisi väärä valinta.

```markdown
<inputs>
Aihe:
Pääkysymys:
Asiantuntija A (rooli ja näkökulma):
Asiantuntija B (rooli ja näkökulma):
Asiantuntija C (rooli ja näkökulma):
Vastauskieli:
</inputs>

<task>
Simuloi paneelikeskustelu yllä mainittujen kolmen asiantuntijan välillä. Käytän keskustelua pääkysymystä koskevan päätöksen tukena, joten tarvitsen todelliset kompromissit enkä tasapainoista yhteenvetoa. Jokainen asiantuntija perustelee omista lähtökohdistaan ja prioriteeteistaan. Paneelin arvo syntyy kohdista, joissa he ovat eri mieltä.

Jos jokin <inputs>-kenttä on tyhjä, kysy puuttuvia tietoja yhdellä lyhyellä viestillä ja odota vastaustani. Muuten aloita heti.
</task>

<structure>
1. Avaus: jokainen asiantuntija kertoo kantansa ja suurimman huolensa kahdella tai kolmella virkkeellä.
2. Keskustelu: asiantuntijat vastaavat toisilleen nimeltä, haastavat heikkoja kohtia ja myöntävät, kun toinen esittää paremman argumentin. Jokainen puheenvuoro tuo jotain uutta: perustelun, riskin, vastaesimerkin tai myönnytyksen.
3. Lopetus: moderaattori kokoaa, mistä paneeli oli samaa mieltä, mistä se joutui tinkimään ja mikä jäi auki. Sen jälkeen moderaattori antaa yhden tarkan suosituksen ja konkreettisen ensimmäisen askeleen sekä nimeää tärkeimmän tilanteen, jossa suositus olisi väärä valinta.
</structure>

<guidelines>
- Pidä erimielisyys aitona. Älä anna asiantuntijoiden liukua kohteliaaseen yksimielisyyteen ennen lopetusta.
- Tue väitteitä perusteluilla ja konkreettisilla esimerkeillä. Älä keksi tilastoja tai lähteitä. Jos jokin luku on tärkeä, kerro, mikä pitäisi tarkistaa.
- Kirjoita puheenvuorot niin kuin ihmiset puhuisivat samassa huoneessa, ei luetteloina.
</guidelines>

<format>
Kirjoita koko keskustelu valitulla vastauskielellä. Merkitse jokainen puheenvuoro puhujan roolilla lihavoituna, esimerkiksi **Talousjohtaja:**, ja käytä lopetuksessa merkintää **Moderaattori:**. Tavoittele 500–700 sanaa.
</format>
```

## Miksi prompti on kirjoitettu näin

- **Selkeät ohjeet ja perustelu.** Nykyiset Claude- ja ChatGPT-mallit noudattavat ohjeita kirjaimellisesti. Kun kerrot, *miksi* (tarvitset kompromissit päätöksen tueksi), tulos on parempi kuin isoilla kirjaimilla ja sanoilla ”täytyy” ja ”tarkasti”.
- **Tageilla erotetut osiot.** XML-tyyliset tagit pitävät lähtötietosi erillään ohjeista. Sekä Claude että ChatGPT lukevat ne luotettavasti.
- **Ei keksittyä dataa.** Vanha versio pyysi ”lyhyitä datapisteitä”, mikä houkuttelee keksimään lukuja. Nyt paneeli kertoo, mitä pitäisi tarkistaa.
