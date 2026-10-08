---
layout: ../../../layouts/Base.astro
title: "Mitä yhteystietojen seurannasta jää piiloon?"
documentTitle: "Yhteystietojen seuranta: mitä klikkaukset eivät kerro?"
description: "Pelkkä sähköposti- ja puhelinlinkkien klikkausseuranta voi antaa vajaan kuvan yhteystietojen käytöstä. Tarkista, mitä raporttisi todella mittaa."
date: 2026-10-08
category: analytics
tags: ["tapahtumaseuranta", "yhteystietojen seuranta", "markkinoinnin mittaaminen"]
image: /images/blog/contact-detail-clicks-and-copy-tracking.jpeg
imageAlt: "Vihreä kilpikonnahahmo tutkii suurennuslasilla yhteystietojen käyttöä kuvaavaa näkymää, jossa sähköposti- ja puhelinlinkkien klikkausten lisäksi paljastuvat myös yhteystietojen kopiointitapahtumat."
imageCredit: "Luotu OpenAI ImageGenillä"
imageLicense: cc0
alternate:
  lang: en
  href: /blog/contact-detail-tracking/
about:
  - "Yhteystietojen seuranta"
  - "Verkkosivuston analytiikka"
  - "Käyttäjävuorovaikutuksen mittaaminen"
mentions:
  - "Sähköpostilinkki"
  - "Puhelinlinkki"
  - "Kopiointitapahtuma"
  - "Analytiikan tapahtumaseuranta"
---

Sähköpostilinkkiä klikattiin viisi kertaa. Samassa raportissa kirjautui 46 sähköpostiosoitteen kopiointitapahtumaa.

Pelkkien klikkausten perusteella yhteystietojen käyttö näyttäisi vähäiseltä. Jos sivustoa tai markkinointia muutetaan tämän perusteella, osa kävijöiden toiminnasta jää huomioimatta.

Yhteystietojen kopioinnin seuranta voi täydentää kuvaa siitä, miten sähköpostiosoitteita ja puhelinnumeroita käytetään. Sekään ei kerro, kuinka moni lopulta lähetti viestin tai soitti.

## Sähköpostilinkki voi avata väärän ohjelman

Sähköpostiosoitteen klikkaamisen pitäisi helpottaa viestin lähettämistä. Se voi silti avata aivan eri sähköpostiohjelman kuin sen, jota kävijä käyttää.

Kävijä saattaa hoitaa sähköpostinsa selaimessa, mutta linkki avaa koneelle asennetun sähköpostiohjelman. Vastassa voi olla esimerkiksi tilin käyttöönotto, vaikka tarkoitus oli lähettää yksi viesti.

Osoitteen kopioiminen ja liittäminen omaan sähköpostipalveluun on silloin luonteva tapa jatkaa. Osa kävijöistä kopioi osoitteen suoraan kokeilematta linkkiä lainkaan.

Klikkaus voi myös kirjautua analytiikkaan, vaikka kävijä sulkisi avautuneen ohjelman lähettämättä mitään.

Pelkkä sähköpostilinkin klikkaus ei siis kerro, kuinka moni todella jatkoi viestin kirjoittamiseen.

## Puhelinnumeroakin käytetään ilman klikkausta

Puhelimella puhelinnumerolinkki voi avata puhelusovelluksen. Tietokoneella linkin toiminta riippuu käytössä olevista sovelluksista ja laitteen asetuksista.

Kävijä voi myös kopioida numeron myöhempää käyttöä varten tai kirjoittaa sen puhelimeensa tietokoneen näytöltä.

Kummassakaan tapauksessa puhelinnumerolinkkiä ei tarvitse klikata.

Vähäinen klikkausmäärä ei siis yksin kerro, kuinka paljon puhelinnumeroa käytetään.

## Yksi tapahtuma voi kuvata eri käyttötapoja

Sen sijaan, että sähköpostilinkkien klikkauksille, puhelinlinkkien klikkauksille ja kopioinneille luotaisiin omat erilliset tapahtumat, ne voidaan kerätä yhden tapahtuman alle.

Tapahtuma voi olla:

`contact_detail_interaction`

Sen mukana lähetetään parametrina:

`contact_detail_type`

Parametrin arvo kertoo, mitä käyttäjä teki.

Esimerkiksi:

| Event | contact_detail_type |
|---|---|
| `contact_detail_interaction` | `Phone Number Link Click` |
| `contact_detail_interaction` | `Email Link Click` |
| `contact_detail_interaction` | `Phone Number Copied` |
| `contact_detail_interaction` | `Email Copied` |

Tämän rakenteen etuna on, että kaikki yhteystietojen käyttö voidaan nähdä yhdessä kokonaisuutena.

Jos haluat tietää vain kaikkien yhteystietojen käyttötapahtumien määrän, voit tarkastella `contact_detail_interaction`-tapahtumaa sellaisenaan.

Kun taas haluat erotella käyttötavat, voit käyttää raportissa `contact_detail_type`-parametria.

Näin sama seurantarakenne antaa yleiskuvan ja mahdollistaa myös tarkemman analyysin.

## Mitä kopiointien seuranta tuo raporttiin?

Esimerkkiraportissa tapahtumat jakautuivat näin:

| Yhteystiedon käyttö | Tapahtumat |
|---|---:|
| Email Link Click | 5 |
| Email Copied | 46 |
| Phone Number Link Click | 1 |
| Phone Number Copied | 30 |
| **Yhteensä** | **82** |

Jos raportissa näkyisivät vain linkkien klikkaukset, yhteystietojen käyttöä olisi kirjautunut kuusi kertaa.

Kun mukaan otetaan myös kopioinnit, tapahtumia on 82.

Tämä ei tarkoita, että yhteydenottoja olisi ollut 82. Se kertoo, että sähköpostiosoitetta tai puhelinnumeroa käytettiin seurannan tunnistamalla tavalla 82 kertaa.

Ero on olennainen.

Klikkaus tai kopiointi kertoo yhteystiedon käytöstä. Se ei vielä kerro toteutuneesta yhteydenotosta.

## Sama kävijä voi tuottaa useita tapahtumia

Tapahtumamäärät eivät tarkoita eri ihmisten määrää.

Sama kävijä voi esimerkiksi klikata sähköpostilinkkiä, huomata väärän sähköpostiohjelman avautuvan, sulkea sen ja kopioida tämän jälkeen sähköpostiosoitteen.

Tällöin yksi kävijä voi tuottaa kaksi `contact_detail_interaction`-tapahtumaa:

- `Email Link Click`
- `Email Copied`

Tämä ei välttämättä ole seurantavirhe. Kyse on kahdesta käyttäjän tekemästä toiminnosta.

Raporttia tulkittaessa on silti hyvä muistaa, ettei tapahtumien määrä vastaa käyttäjien tai yhteydenottojen määrää.

## Mitä tietoa markkinointi voi hyödyntää?

Jos sivustolla on useita sähköpostiosoitteita tai puhelinnumeroita, niiden käyttöä voidaan tarkastella vielä tarkemmin.

Esimerkiksi myynnin, asiakaspalvelun ja ajanvarauksen yhteystietojen käyttö voi vastata aivan eri kysymyksiin.

Asiakaspalvelun puhelinnumeron käyttö ei automaattisesti kerro uusien asiakkaiden kiinnostuksesta. Myynnin sähköpostiosoitteen käyttö voi puolestaan olla markkinoinnin kannalta kiinnostavampi signaali.

Seurantaan voidaan tällöin lisätä esimerkiksi toinen parametri, joka kertoo, mihin yhteystietoon tapahtuma liittyi.

Esimerkiksi:

`contact_detail_category`

Mahdollisia arvoja voisivat olla:

- `Sales`
- `Customer Service`
- `Booking`

Tällöin raportissa voidaan tarkastella esimerkiksi:

`contact_detail_interaction`

`contact_detail_type = Email Copied`

`contact_detail_category = Sales`

Tämä auttaa erottamaan toisistaan sen, **miten yhteystietoa käytettiin** ja **mihin tarkoitukseen kyseinen yhteystieto liittyy**.

## Yrityksen yleinen yhteystieto ei ole sama asia kuin käyttäjän henkilötieto

Tässä seurannassa tarkastellaan yrityksen omalla verkkosivustolla julkaistujen yhteystietojen käyttöä.

Seurattava arvo voi olla esimerkiksi:

`info@company.com`

tai yrityksen yleinen puhelinnumero.

Kyse ei tällöin ole sivuston käyttäjän sähköpostiosoitteen tai puhelinnumeron keräämisestä.

Tämä ero on tärkeä.

Analytiikkaan ei ole tarkoitus lähettää kävijän kirjoittamia tai antamia henkilökohtaisia yhteystietoja. Tässä seurataan sitä, mitä yrityksen sivustolla julkaistuja yhteystietoja käytetään.

Raportointia varten varsinaista sähköpostiosoitetta tai puhelinnumeroa ei silti välttämättä tarvitse käyttää parametrina. Usein yhteystietojen luokittelu esimerkiksi myynnin ja asiakaspalvelun yhteystiedoiksi tekee raportista myös helpommin tulkittavan.

## Kopiointi ei tarkoita yhteydenottoa

Kopiointitapahtuma kertoo vain siitä, että sähköpostiosoite tai puhelinnumero kopioitiin.

Sen jälkeen käyttäjä voi:

- liittää sähköpostiosoitteen omaan sähköpostipalveluunsa
- tallentaa numeron puhelimeensa
- lähettää yhteystiedon toiselle henkilölle
- käyttää sitä myöhemmin
- olla tekemättä mitään

Sama koskee linkin klikkausta.

Sähköpostilinkin klikkaus ei tarkoita lähetettyä sähköpostia. Puhelinnumerolinkin klikkaus ei tarkoita toteutunutta puhelua.

Tästä syystä `contact_detail_interaction` kannattaa nähdä yhteystietojen käytön mittarina, ei suoraan yhteydenottojen tai liidien mittarina.

## Milloin seurantaa kannattaa täydentää?

Kopiointiseurannasta on hyötyä erityisesti silloin, kun sähköposti ja puhelin ovat sivuston keskeisiä yhteydenottotapoja.

Jos raportissa näkyy vain muutama sähköposti- tai puhelinlinkin klikkaus, ensimmäinen tulkinta voi olla, etteivät kävijät käytä yhteystietoja.

Se ei välttämättä pidä paikkaansa.

Kopiointien seuranta voi osoittaa, että yhteystietoja käytetään paljon enemmän kuin pelkkien klikkausten perusteella voisi päätellä.

Se ei kuitenkaan yksin vastaa siihen, kuinka moni otti yritykseen yhteyttä.

Jos tärkein kysymys on, mistä toteutuneet yhteydenotot tulevat, tarvitaan tietoa lähempää varsinaista lopputulosta, esimerkiksi lomakkeiden lähetyksistä, puheluista tai CRM-järjestelmään kirjatuista yhteydenotoista.

## Etene havaintojen perusteella

1. **Tarkista, mitä nykyinen raportti mittaa.** Jos yhteydenottotapahtumat tarkoittavat vain sähköposti- ja puhelinlinkkien klikkauksia, nimeä ne sen mukaisesti.

2. **Lisää kopiointien seuranta, jos se vastaa avoimeen kysymykseen.** Yksi `contact_detail_interaction`-tapahtuma ja `contact_detail_type`-parametri pitävät rakenteen yksinkertaisena.

3. **Tarkastele kaikkia yhteystietojen käyttötapoja yhdessä.** Tapahtuman kokonaismäärä kertoo, kuinka paljon yhteystietojen kanssa ollaan vuorovaikutuksessa.

4. **Erottele käyttötavat tarvittaessa.** `contact_detail_type` näyttää, oliko kyse sähköpostilinkin klikkauksesta, puhelinlinkin klikkauksesta vai yhteystiedon kopioinnista.

5. **Älä tulkitse tapahtumaa valmiiksi yhteydenotoksi.** Klikkaus ja kopiointi ovat käyttäjän toimintoja. Ne eivät vielä vahvista sähköpostin lähettämistä tai puhelun toteutumista.

Tarkista seuraavassa raportointipalaverissa, mitä yhteystietojen käyttöä raporttisi todella mittaa.

Jos siinä näkyvät vain linkkien klikkaukset, osa käyttäjien toiminnasta voi jäädä kokonaan näkymättömäksi.
