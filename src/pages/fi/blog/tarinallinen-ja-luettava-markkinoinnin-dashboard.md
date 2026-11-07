---
layout: ../../../layouts/Base.astro
title: "Miten rakennetaan tarinallinen ja helposti luettava dashboard?"
description: "Luonnos: miten dashboardin rakenne, otsikot ja korostukset auttavat lukijaa ymmärtämään tilanteen nopeasti."
date: 2026-11-07
category: reporting
tags: ["dashboard", "raportointi", "Data Studio", "visualisointi"]
draft: true
citations:
  - name: "Nielsen Norman Group: Dashboards, Making Charts and Graphs Easier to Understand"
    url: "https://www.nngroup.com/articles/dashboards-preattentive/"
---

<!-- LUONNOS: tämä on siirretty tilaajan artikkelista (miten-saat-tilaajana-kaiken-irti-dashboard-projektista). Artikkeli kohdistuu dashboardin tekijöille. Tarvitaan: oma johdanto, kaikki kaaviotyypit esimerkkikuvineen, väriteoria (harmaa pohja ja korostusväri), vasen tasaus, saavutettavuus ja lähteet. Niko vahvistaa rungon. -->

## Mitä tarinallinen ja luettava tarkoittaa?

Dashboard on tarkoitettu nopeaan lukemiseen. [Nielsen Norman Group kuvaa sen](https://www.nngroup.com/articles/dashboards-preattentive/) näkymäksi, josta tiedon pitäisi pystyä omaksumaan nopeasti, vähällä vuorovaikutuksella ja vähällä pohtimisella. Auton kojelaudalta näet yhdellä vilkaisulla, ajatko liian lujaa. Dashboardilta pitäisi nähdä, ovatko myynnit nousussa.

Tarinallisuus tarkoittaa samaa kuin hyvässä esityksessä. Ajatus muistuttaa McKinseyn SCQR-mallia (tilanne, haaste, kysymys, ratkaisu). Dashboardin tarina kulkee kolmessa osassa: mikä on normaali tilanne (context), mikä siitä poikkeaa (tension) ja mitä asialle tehdään (action). [McKinsey-tyylisestä esityksestä kirjoitin erikseen](/fi/blog/mckinsey-tyylinen-esitys-chatgpt-gemini/).

Luettavuus on sitä, ettei lukija jää arvailemaan. Dashboard jää helposti käyttämättä, jos lukija tuntee olonsa tyhmäksi tai sen käyttäminen on vaikeaa. Pelkät taulukot ovat tästä tuttu esimerkki: ne sopivat ihmiselle, joka lukee taulukoita päivittäin, mutta eivät ihmiselle, joka haluaa nähdä tilanteen.

<!-- TÄYDENNÄ (Niko): oma esimerkki dashboardista, joka koostui pelkistä taulukoista ja jäi käyttämättä. Mitä siinä oli vikana ja mitä muutettiin? -->

### Sama taulukko ennen ja jälkeen

Esimerkkinä on kirjakaupan verkkokaupan tuotekategoriataulukko. Luvut ovat keksittyjä. Aito esimerkki on peräisin asiakkaan oikeasta datasta, jota en voi julkaista, joten rakensin samanlaisen taulukon esimerkkidatalla.

Ensin taulukko, jossa on vain määrät. Otsikko on ”Myydyimmät tuotekategoriat”, eikä taulukko kerro, mitä siitä pitäisi huomata.

| Kategoria | Ostettuja tuotteita | Myynti |
|---|---:|---:|
| Romaanit | 1 450 | 25 800 € |
| Lastenkirjat | 820 | 11 900 € |
| Paperitavarat | 700 | 3 900 € |
| Tietokirjat | 560 | 15 400 € |
| Keittokirjat | 410 | 9 800 € |
| Pelit ja palapelit | 390 | 21 600 € |
| Kalenterit | 320 | 4 100 € |
| Matkaoppaat | 180 | 3 400 € |
| Lahjakortit | 150 | 7 500 € |

Sitten sama taulukko, johon on lisätty osuudet. Rivi korostetaan vihreällä vain, jos molemmat osuudet ylittävät 20 prosenttia. Tässä korostuvat vain romaanit.

<div role="region" aria-label="Kirjakaupan esimerkkitaulukko osuuksilla" tabindex="0" style="overflow-x:auto">
<table>
<thead><tr><th>Kategoria</th><th style="text-align:right">Ostettuja tuotteita</th><th>Osuus ostetuista</th><th style="text-align:right">Myynti</th><th>Osuus myynnistä</th></tr></thead>
<tbody>
<tr style="background:color-mix(in srgb,#2e9e5b 18%,transparent)"><td><strong>Romaanit</strong></td><td style="text-align:right"><strong>1 450</strong></td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem"><strong>29,1 %</strong></span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:100.0%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td><td style="text-align:right"><strong>25 800 €</strong></td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem"><strong>25,0 %</strong></span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:100.0%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td></tr>
<tr><td>Lastenkirjat</td><td style="text-align:right">820</td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem">16,5 %</span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:56.6%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td><td style="text-align:right">11 900 €</td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem">11,5 %</span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:46.1%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td></tr>
<tr><td>Paperitavarat</td><td style="text-align:right">700</td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem">14,1 %</span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:48.3%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td><td style="text-align:right">3 900 €</td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem">3,8 %</span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:15.1%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td></tr>
<tr><td>Tietokirjat</td><td style="text-align:right">560</td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem">11,2 %</span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:38.6%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td><td style="text-align:right">15 400 €</td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem">14,9 %</span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:59.7%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td></tr>
<tr><td>Keittokirjat</td><td style="text-align:right">410</td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem">8,2 %</span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:28.3%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td><td style="text-align:right">9 800 €</td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem">9,5 %</span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:38.0%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td></tr>
<tr><td>Pelit ja palapelit</td><td style="text-align:right">390</td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem">7,8 %</span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:26.9%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td><td style="text-align:right">21 600 €</td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem">20,9 %</span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:83.7%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td></tr>
<tr><td>Kalenterit</td><td style="text-align:right">320</td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem">6,4 %</span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:22.1%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td><td style="text-align:right">4 100 €</td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem">4,0 %</span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:15.9%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td></tr>
<tr><td>Matkaoppaat</td><td style="text-align:right">180</td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem">3,6 %</span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:12.4%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td><td style="text-align:right">3 400 €</td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem">3,3 %</span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:13.2%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td></tr>
<tr><td>Lahjakortit</td><td style="text-align:right">150</td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem">3,0 %</span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:10.3%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td><td style="text-align:right">7 500 €</td><td><span style="display:flex;align-items:center;gap:.6rem"><span style="flex:none;min-width:3.6rem">7,3 %</span><span aria-hidden="true" style="flex:1 1 2rem;min-width:2rem;height:.8rem"><span style="display:block;height:100%;width:29.1%;background:color-mix(in srgb,var(--muted) 45%,transparent)"></span></span></span></td></tr>
</tbody>
</table>
</div>

<!-- TÄYDENNÄ (Niko): kuvakaappaukset esimerkkitaulukosta Data Studiossa, ennen ja jälkeen. Osuussarakkeissa palkit ja vihreä korostus. -->

Osuudet kertovat sen, mitä määrät eivät kerro. Pelit ja palapelit ovat 7,8 prosenttia ostetuista tuotteista mutta 20,9 prosenttia myynnistä. Paperitavarat ovat 14,1 prosenttia ostetuista tuotteista mutta vain 3,8 prosenttia myynnistä. Myyntimäärä ei siis aina ole iso, vaikka osuus myynnistä on, ja päinvastoin.

Taulukossa on nyt pieni tarina: normaali tilanne (kategoriat), poikkeama (osuudet eroavat) ja kysymys, mihin kannattaa panostaa. Tarina syntyy kuitenkin vain, jos joku on päättänyt, mitä taulukolla halutaan selvittää. Se päätös kuuluu tilaajalle.

## Korostussääntö on liiketoimintapäätös

Edellisen taulukon vihreä korostus noudattaa sääntöä: rivi korostuu, kun sekä osuus ostetuista että osuus myynnistä ylittävät 20 prosenttia. Raja on keksitty esimerkkiä varten. Oikeassa raportissa se pitää miettiä erikseen.

Raja on liiketoimintapäätös. Jos kaupassa on kolme kategoriaa, 20 prosenttia on pieni. Jos kategorioita on sata, se on iso. Toimittaja osaa toteuttaa säännön, mutta ei tiedä, mikä raja on tilaajalle merkittävä.
