---
target: GA4-annotaatiotyökalun käyttöliittymä
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 0
timestamp: 2026-09-26T09-04-59Z
slug: src-pages-fi-tyokalut-ga4-annotaatiot-astro
---
Method: dual-agent (A: /root/critique_design · B: /root/critique_evidence)

Käyttöliittymä näyttää rauhalliselta ja tarkoitukseen tehdyltä, mutta tekstin muokkaaminen on turhan levotonta. Tärkein parannus on tehdä kirjoittamisesta ennakoitavaa.

Arvio perustuu kuvakaappaukseen, lähdekoodiin ja työpöytä- sekä mobiilikäyttöön selaimessa.

**Toimivat ratkaisut**

- Muokattava teksti on samalla lopputulos: erillistä esikatselua ei tarvita.
- Kategoriat, lyhenteet ja tapahtumakohtainen päivämääräohje tekevät työkalusta selvästi analytiikkaan suunnitellun.
- Merkkirajat, keskeneräisten kohtien tarkistus ja erilliset kopiointipainikkeet tukevat varsinaista tehtävää.

**Korjaisin nämä tässä järjestyksessä**

1. **[P2] Ehdotukset häiritsevät tekstin muokkaamista.** Nuoli alas siirtää kohdistuksen ehdotukseen myös monirivistä kuvausta muokattaessa. Escillä suljettu valikko avautuu taas kirjoittaessa. Säilytä tavallinen nuolinäppäinkäyttö ja pidä suljettu valikko kiinni saman muokkauskerran ajan. Automaattiset ehdotukset voivat edelleen avautua kirjoittamisen alussa. Korjaus: `impeccable harden`.
2. **[P2] Layout shift on vaihtunut sisällön peittymiseen.** Mobiilissa ehdotusvalikko peittää otsikon ja sen kopioinnin. Työpöydällä valikon yläosa voi jäädä kiinteän sivuotsakkeen alle. Rajaa valikon korkeus käytettävissä olevaan tilaan, tiivistä rivejä ja tuo kuvausotsikon viereen pieni Ehdotukset-painike uudelleen avaamista varten. Uutta ohjetekstikappaletta ei tarvita. Korjaus: `impeccable distill`.
3. **[P2] Mobiilissa kirjoittamiseen pääsee liian myöhään.** 390 × 844 -näkymässä sivun alku ja kuusi kategoriaa vievät ensimmäisen ruudun; tekstikentät jäävät alemmas. Tiivistä alun välejä ja näytä mobiilissa valittu kategoria avattavana valintana. Työpöydän kategoriapalsta toimii sellaisenaan. Korjaus: `impeccable adapt`.
4. **[P2] Osa pohjista ja kategorioista lupaa väärää sisältöä.** Offline-mainonta tuottaa otsikon Ulkomainonta, vaikka kyse voisi olla radiosta tai televisiosta. Kilpailijat ja sesongit sisältää myös sää- ja hakualgoritmimuutoksia. Korjaa offline-pohjan otsikko ja harkitse EXT-kategorialle nimeä Ulkoiset tapahtumat. Selvennä myös häiriöiden ja tarkoituksellisten seurantamuutosten eroa. Korjaus: `impeccable clarify`.
5. **[P2] Kielivalinta muuttaa myös säilytetyn tekstin kielimerkinnän.** Kun käyttäjä vaihtaa englantiin, oma suomenkielinen kuvaus säilyy mutta sen HTML-kieleksi tulee englanti. Tämä voi johtaa väärään ääntämiseen ruudunlukijalla. Säilytä luonnoksen todellinen kielimerkintä ja tee ehdotusvalikon tila ymmärrettäväksi avustaville teknologioille. Korjaus: `impeccable harden`.

**Visuaalinen kritiikki:** lomake on kuvan leveydellä turhan venytetty suhteessa 60 ja 150 merkin sisältöihin. Rajattu kokonaisleveys ja pienemmät pystysuuntaiset välit tekisivät työkalusta napakamman. Brändin fontteja tai värimaailmaa en vaihtaisi.

Ensikertalaiselle päivämääräohje voi näyttää puuttuvalta päivämääräkentältä. Lyhyt sanan GA4:ssa lisäys ohjeen alkuun selventäisi toimintaa säilyttäen pyytämäsi Väri-otsikon. Kokeneelle käyttäjälle suurin kitka on näppäimistökäytössä; mobiilikäyttäjälle pitkä matka ensimmäiseen kenttään.

Pienempiä huomioita: kaikkien hakasulkeiden estäminen voi torjua tarkoituksellisen tekstin. Kopioitu-palaute näkyisi varmemmin painikkeen yhteydessä. Luonnokset säilyvät pohjaa vaihtaessa, mutta eivät sivua päivittäessä.

**Heuristinen arvio: 27/40.** Tämä on suunnitteluarvio, ei saavutettavuussertifiointi.

| Osa-alue | Pisteet | Keskeinen havainto |
|---|---:|---|
| Tilan näkyvyys | 3/4 | Laskurit toimivat; ehdotusten avautuminen ei välity selvästi |
| Vastaavuus käyttäjän tehtävään | 3/4 | Hyvä kenttäjärjestys; osa pohjien nimistä epätarkkoja |
| Käyttäjän hallinta | 2/4 | Valikko avautuu uudelleen sulkemisen jälkeen |
| Johdonmukaisuus | 2/4 | Nuolinäppäin poikkeaa tekstikentän normaalista toiminnasta |
| Virheiden ehkäisy | 3/4 | Hyvät rajat, liian laaja hakasulkutarkistus |
| Tunnistettavuus | 3/4 | Pohjat auttavat; kategorioiden rajat osin epäselvät |
| Käytön tehokkuus | 2/4 | Muokkaaminen ja mobiilin aloitus vaativat ylimääräistä työtä |
| Visuaalinen selkeys | 3/4 | Rauhallinen ilme, väljyyttä liikaa |
| Virheistä palautuminen | 3/4 | Selkeät pituusvirheet ja kopioinnin varatoiminto |
| Ohjeistus | 3/4 | Hyvä päivämääräohje; GA4:ään siirtyminen kaipaa tarkennusta |

Automaattinen tunnistin löysi komponentista ja sivusta 0 huomautusta. Molemmat riippumattomat arviot löysivät silti saman nuolinäppäinongelman: staattinen tarkistus ei tavoita näitä vuorovaikutusongelmia. Selaimen päälle piirrettäviä merkintöjä ei voitu käyttää, joten näyttö perustuu tavallisiin selainhavaintoihin.

Jatkokysymykset: korjataanko ensin kirjoittaminen ja ehdotukset, mobiili ja tiiviys vai pohjien nimeäminen? Säilytetäänkö automaattinen avautuminen sulkemista kunnioittaen vai avataanko ehdotukset vain painikkeesta?
