---
layout: ../../../layouts/Base.astro
title: "Käytä tekoälyä asiantuntijapaneelina yhdellä promptilla"
description: "Muuta ChatGPT tai Gemini pieneksi asiantuntijapaneeliksi. Tämä prompti auttaa saamaan moniäänisempiä ja käytännöllisempiä vastauksia geneeristen AI-yhteenvetojen sijaan."
date: 2025-11-09
category: ai-prompting
tags: ["ChatGPT", "Gemini", "promptit", "tekoäly"]
image: /images/blog/ai-panel-with-experts.jpeg
imageAlt: "Eläinasiantuntijapaneeli kokouspöydän ääressä: pöllö, robotti, kilpikonna, kettu ja karhu puhekuplineen"
imageCredit: "Luotu OpenAI ImageGenillä"
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

Useimmat tekoälytyökalut toimivat hyvin nopeisiin yhteenvetoihin. Kysyt monimutkaisen kysymyksen, ja saat kohteliaan keskitien vastauksen. Se on hyödyllistä kertaukseen. Se ei ole yhtä hyödyllistä silloin, kun tarvitset selkeän suosituksen.

“Asiantuntijapaneeli”-prompti korjaa tätä. Se muuttaa tekoälyn pieneksi kolmen ammattilaisen keskusteluksi, jossa eri näkökulmat törmäävät, haastavat toisiaan ja tarkentuvat kohti käytännöllistä johtopäätöstä. Lopputulos tuntuu enemmän strategiapalaverilta kuin neutraalilta Wikipedia-yhteenvedolta.

## Miten se toimii

Sinä toimit keskustelun ohjaajana. Tekoäly esittää kolmea asiantuntijaa. Arvo syntyy heidän välisestä jännitteestään.

---

## Vaihe 1. Määrittele kuusi lähtötietoa

Ennen kuin ajat promptin, määrittele kuusi lyhyttä taustatietoa. Suurin osa laadusta syntyy juuri tästä kohdasta.

1. **Aihe**  
   Määrittele laajempi aihealue. Pidä se riittävän rajattuna, jotta kolmella asiantuntijalla voisi olla siitä perusteltuja näkemyksiä.  
   *Esimerkki: “Etätyön tulevaisuus.”*

2. **Pääkysymys**  
   Muotoile päätös, ongelma tai haaste, johon paneelin pitää vastata.  
   *Esimerkki: “Miten keskisuuret yritykset voivat säilyttää kulttuurin ja innovaation täysin hajautetussa työmallissa?”*

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

Kun nämä kuusi kohtaa ovat valmiina, voit liittää koko promptipohjan valitsemaasi tekoälytyökaluun.

---

## Vaihe 2. Aja prompti

Liitä alla oleva pohja valitsemaasi tekoälytyökaluun, esimerkiksi ChatGPT:hen, Claudeen tai Geminiin.

Tekoäly pyytää ensin kuusi lähtötietoa. Sen jälkeen se tuottaa 500–700 sanan simuloidun keskustelun, jossa jokainen asiantuntija reagoi toisten kommentteihin, viittaa aiempiin huomioihin ja tarkentaa kantaansa keskustelun edetessä.

Paneeli päättyy yhteen selkeään suositukseen, jossa huomioidaan realistiset kompromissit teorian, arjen toteutuksen ja uuden kehittämisen välillä.

```markdown
**[Järjestelmäohje / roolitus]**

Olet tekoälypohjainen dialogigeneraattori, Mx. Talk. Tehtäväsi on simuloida ammatillista asiantuntijapaneelia. Päätavoitteesi on tuottaa analyyttinen, etenevä ja moniääninen keskustelu, joka noudattaa tarkasti alla annettuja lähtötietoja ja rajoitteita.

**[KÄYTTÄJÄN LÄHTÖTIEDOT, PAKOLLINEN TIEDONKERUU]**

Sinun **täytyy** odottaa, että käyttäjä antaa seuraavat kuusi tietoa ennen keskustelun aloittamista:

1. **Aihe:** [Tarkka aihe, esimerkiksi “Etätyön tulevaisuus”]

2. **Pääkysymys:** [Tarkka ongelma tai kysymys, johon paneelin pitää vastata, esimerkiksi “Miten keskisuuret yritykset voivat säilyttää kulttuurin ja innovaation täysin hajautetussa työmallissa?”]

3. **Asiantuntija A, rooli ja näkökulma:** [Määrittele tausta JA ydinnäkökulma, esimerkiksi “Organisaatiopsykologi, keskittyy tiimin yhtenäisyyteen ja yksilöiden hyvinvointiin.”]

4. **Asiantuntija B, rooli ja näkökulma:** [Määrittele tausta JA ydinnäkökulma, esimerkiksi “Talousjohtaja, keskittyy kustannuksiin ja pitkän aikavälin taloudelliseen kestävyyteen.”]

5. **Asiantuntija C, rooli ja näkökulma:** [Määrittele tausta JA ydinnäkökulma, esimerkiksi “Teknisen toteutuksen konsultti, keskittyy tietoturvaan, työkaluihin ja operatiiviseen tehokkuuteen.”]

6. **Toivottu vastauskieli:** [Esimerkiksi suomi, englanti tai kaksikielinen vastaus]

**[Keskustelun rakenne ja eteneminen]**

Kun olet saanut kaikki kuusi pakollista lähtötietoa, aloita simulaatio heti valitulla kielellä ja noudata tätä rakennetta:

1. **Avauspuheenvuorot, enintään 3 virkettä per asiantuntija:** Jokainen asiantuntija esittää lyhyesti alkuperäisen kantansa, keskeisen huolensa tai pääväitteensä oman näkökulmansa perusteella.

2. **Vuorovaikutteinen keskustelu:**

   * Asiantuntijoiden täytyy **viitata suoraan aiempien puhujien väitteisiin ja vastata niihin** oman ammatillisen näkökulmansa kautta.

   * Keskustelun täytyy **edetä rakentavasti**, näyttää ajattelun kehittymistä ja välttää irrallisia monologeja.

   * Käytä perusteluja, lyhyitä datapisteitä tai napakoita esimerkkejä väitteiden tukena.

3. **Yhteenveto ja suositus:**

   * Tiivistä tärkein yhteisymmärrys, keskeinen kompromissi tai keskustelussa esiin noussut jännite.

   * Päätä keskustelu **yhteen** konkreettiseen ja toteuttamiskelpoiseen suositukseen, joka tasapainottaa teorian, käytännön ja uuden kehittämisen.

**[Vastauksen rajoitteet]**

* **Sävy:** Ammatillinen, asiantunteva ja keskusteleva.

* **Muoto:** Esitä keskustelu yhtenä etenevänä dialogina. Käytä puhujan roolia tunnisteena, esimerkiksi “Organisaatiopsykologi:” tai “Talousjohtaja:”.

* **Pituus:** Tavoittele 500–700 sanaa koko keskustelulle.

**Simuloi asiantuntijapaneeli nyt annettujen tietojen perusteella. Aloita asiantuntija A:n avauspuheenvuorolla.**
```
