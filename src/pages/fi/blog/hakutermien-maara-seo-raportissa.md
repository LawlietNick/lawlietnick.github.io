---
layout: ../../../layouts/Base.astro
title: "Hakutermien määrä SEO-raportissa: mitä se kertoo ja mitä ei?"
description: "Klikkaukset ja näyttökerrat eivät kerro, kuinka monella eri haulla sivusto näkyy. Hakutermien määrä kertoo, mutta vain yhdessä sijoitusten kanssa."
date: 2026-11-01
category: analytics
tags: ["SEO", "Search Console", "BigQuery", "raportointi"]
draft: true
citations:
  - name: "SEO Gets: 5 Reasons Why You Should Count Queries in Search Console"
    url: "https://seogets.com/blog/5-reasons-to-count-queries"
  - name: "Search Console Help: Table guidelines and reference (bulk export)"
    url: "https://support.google.com/webmasters/answer/12917991"
  - name: "Search Console Help: Performance report, troubleshooting data discrepancies"
    url: "https://support.google.com/webmasters/answer/17010575"
---

Klikkaukset kertovat, kuinka paljon liikennettä Google toi. Näyttökerrat kertovat, kuinka usein sivusto näkyi. Kumpikaan ei kerro, kuinka monella eri haulla.

Siihen tarvitaan kolmas luku: uniikit hakutermit. [SEO Gets perustelee sen artikkelissaan](https://seogets.com/blog/5-reasons-to-count-queries) viidellä käyttötavalla. Se on yhden yrityksen näkemys, ei standardi. Kokeilin lukua oikealla datalla ja kerron, mitä siitä tuli.

## Mitä hakutermien määrä kertoo?

Hakunäkyvyyden laajuuden. Kaksi sivustoa voi saada saman 10 000 näyttökertaa. Toinen saa ne 20 hakutermillä, toinen 1 000:lla. Ensimmäisen näkyvyys nojaa muutamaan hakuun, toisen näkyvyys jakautuu laajalle. Kumpikaan ei ole automaattisesti parempi. Luku näyttää rakenteen.

## Miltä se näyttää oikealla datalla?

Ajoin luvut Search Consolen bulk exportista BigQueryssä kahdelle peräkkäiselle 28 päivän jaksolle: edellinen jakso on 3.–30.9.2026 ja uusin 1.–28.10.2026. Kohde on oikea sivusto. Luvuissa ovat mukana kaikki haut, myös brändihaut. Luvut on anonymisoitu ja pyöristetty, joten tasot eivät ole oikeat. Muutosprosentit, osuudet ja klikkausprosentit ovat.

| Mittari | Edellinen jakso | Uusin jakso | Muutos |
| --- | --- | --- | --- |
| Uniikit hakutermit | 580 | 590 | +1,6 % |
| Hakutermit sijoilla 1–10 | 300 | 330 | +12,2 % |
| Näyttökerrat | 19 200 | 24 200 | +26,2 % |
| Klikkaukset | 1 100 | 1 940 | +76,7 % |

Hakutermien kokonaismäärä pysyi lähes ennallaan, mutta se peittää suuren vaihtuvuuden. Vain 350 termiä oli mukana molemmissa jaksoissa. Uusimmassa jaksossa oli 240 termiä, joita edellisessä ei ollut, ja edellisessä 230 termiä, joita uusimmassa ei ollut. Noin 40 % kummankin jakson termeistä puuttui siis toisesta.

Sijoilla 1–10 olevien termien määrä kasvoi 12,2 %, ja niiden osuus kaikista termeistä nousi 51 %:sta 57 %:iin. Näyttökerrat kasvoivat 26,2 % ja klikkaukset 76,7 %, joten klikkausprosentti nousi noin 5,7 %:sta noin 8,0 %:iin. En tiedä vielä, mistä se johtuu. Koska brändihaut ovat mukana, seuraavaksi erottaisin ne muista ja katsoisin, mitkä termit klikit toivat.

Kuukausitasolla luvut näyttävät tältä.

<figure class="bleed" style="margin:2rem 0;width:100vw">
<style>.m{outline:none}.m .tip,.m .hl{display:none}.m.d .tip,.m.d .hl{display:block}figure:has(.m:hover) .m.d:not(:hover) :is(.tip,.hl),figure:has(.m:focus) .m.d:not(:focus) :is(.tip,.hl){display:none}.m:hover .tip,.m:focus .tip,.m:hover .hl,.m:focus .hl{display:block}.ix-w{display:none}@media(min-width:760px){.ix-n{display:none}.ix-w{display:block}}</style>
<svg class="ix-n" viewBox="0 0 360 320" role="img" aria-labelledby="tixn" style="width:100%;height:auto;font-family:var(--font-body)">
<title id="tixn">Hakutermit ja klikkaukset viivoina, näyttökerrat palkkeina, kuukausittain, indeksi lokakuu 2025 = 100</title><desc>Hakutermit: 10/25 100, 11/25 101, 12/25 125, 1/26 136, 2/26 133, 3/26 135, 4/26 150, 5/26 123, 6/26 114, 7/26 102, 8/26 93, 9/26 115, 10/26 119; Klikkaukset: 10/25 100, 11/25 75, 12/25 140, 1/26 85, 2/26 72, 3/26 75, 4/26 71, 5/26 60, 6/26 71, 7/26 46, 8/26 51, 9/26 49, 10/26 84; Näyttökerrat: 10/25 100, 11/25 98, 12/25 120, 1/26 108, 2/26 102, 3/26 110, 4/26 107, 5/26 91, 6/26 83, 7/26 59, 8/26 70, 9/26 72, 10/26 88</desc>
<line x1="40" x2="346" y1="280.0" y2="280.0" style="stroke:var(--line);stroke-width:1"/>
<text x="32" y="284.6" text-anchor="end" style="fill:var(--muted);font-size:15.5px">0</text>
<line x1="40" x2="346" y1="197.5" y2="197.5" style="stroke:var(--line);stroke-width:1"/>
<text x="32" y="202.2" text-anchor="end" style="fill:var(--muted);font-size:15.5px">50</text>
<line x1="40" x2="346" y1="115.0" y2="115.0" style="stroke:var(--line);stroke-width:1.5"/>
<text x="32" y="119.7" text-anchor="end" style="fill:var(--muted);font-size:15.5px">100</text>
<line x1="40" x2="346" y1="32.5" y2="32.5" style="stroke:var(--line);stroke-width:1"/>
<text x="32" y="37.1" text-anchor="end" style="fill:var(--muted);font-size:15.5px">150</text>
<rect x="44.5" y="115.0" width="14.6" height="165.0" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="68.0" y="118.3" width="14.6" height="161.7" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="91.5" y="82.0" width="14.6" height="198.0" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="115.1" y="101.8" width="14.6" height="178.2" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="138.6" y="111.7" width="14.6" height="168.3" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="162.2" y="98.5" width="14.6" height="181.5" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="185.7" y="103.4" width="14.6" height="176.6" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="209.2" y="129.8" width="14.6" height="150.2" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="232.8" y="143.1" width="14.6" height="136.9" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="256.3" y="182.7" width="14.6" height="97.3" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="279.9" y="164.5" width="14.6" height="115.5" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="303.4" y="161.2" width="14.6" height="118.8" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="326.9" y="134.8" width="14.6" height="145.2" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<polyline points="51.8,115.0 75.3,113.3 98.8,73.8 122.4,55.6 145.9,60.6 169.5,57.2 193.0,32.5 216.5,77.1 240.1,91.9 263.6,111.7 287.2,126.6 310.7,90.2 334.2,83.7" style="fill:none;stroke:var(--accent);stroke-width:2.5;stroke-linejoin:round;stroke-linecap:round"/>
<circle cx="334.2" cy="83.7" r="4.0" style="fill:var(--accent)"/>
<polyline points="51.8,115.0 75.3,156.2 98.8,49.0 122.4,139.8 145.9,161.2 169.5,156.2 193.0,162.8 216.5,181.0 240.1,162.8 263.6,204.1 287.2,195.8 310.7,199.2 334.2,141.4" style="fill:none;stroke:var(--ink);stroke-width:2.5;stroke-linejoin:round;stroke-linecap:round"/>
<circle cx="334.2" cy="141.4" r="4.0" style="fill:var(--ink)"/>
<text x="44.5" y="312" text-anchor="start" style="fill:var(--muted);font-size:15.5px">10/25</text>
<text x="193.0" y="312" text-anchor="middle" style="fill:var(--muted);font-size:15.5px">4/26</text>
<text x="341.5" y="312" text-anchor="end" style="fill:var(--muted);font-size:15.5px">10/26</text>
<g class="m" tabindex="0" role="group" aria-label="lokakuu 2025">
<rect class="hl" x="40.0" y="16" width="23.5" height="264" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="40.0" y="16" width="23.5" height="264" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="67.5" y="20" width="235.6" height="80.6" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="77.5" y="40.2" style="fill:var(--ink);font-size:15.5px;font-weight:650">lokakuu 2025</text>
<rect x="77.5" y="49.5" width="12.4" height="3.0" style="fill:var(--accent)"/>
<text x="96.1" y="58.0" style="fill:var(--ink);font-size:15.5px">Hakutermit 520 (100)</text>
<rect x="77.5" y="67.3" width="12.4" height="3.0" style="fill:var(--ink)"/>
<text x="96.1" y="75.8" style="fill:var(--ink);font-size:15.5px">Klikkaukset 2 530 (100)</text>
<rect x="77.5" y="82.8" width="12.4" height="10.8" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="96.1" y="93.6" style="fill:var(--ink);font-size:15.5px">Näyttökerrat 29 800 (100)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="marraskuu 2025">
<rect class="hl" x="63.5" y="16" width="23.5" height="264" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="63.5" y="16" width="23.5" height="264" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="91.1" y="20" width="235.6" height="80.6" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="101.1" y="40.2" style="fill:var(--ink);font-size:15.5px;font-weight:650">marraskuu 2025</text>
<rect x="101.1" y="49.5" width="12.4" height="3.0" style="fill:var(--accent)"/>
<text x="119.7" y="58.0" style="fill:var(--ink);font-size:15.5px">Hakutermit 520 (101)</text>
<rect x="101.1" y="67.3" width="12.4" height="3.0" style="fill:var(--ink)"/>
<text x="119.7" y="75.8" style="fill:var(--ink);font-size:15.5px">Klikkaukset 1 900 (75)</text>
<rect x="101.1" y="82.8" width="12.4" height="10.8" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="119.7" y="93.6" style="fill:var(--ink);font-size:15.5px">Näyttökerrat 29 200 (98)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="joulukuu 2025">
<rect class="hl" x="87.1" y="16" width="23.5" height="264" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="87.1" y="16" width="23.5" height="264" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="114.6" y="20" width="235.6" height="80.6" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="124.6" y="40.2" style="fill:var(--ink);font-size:15.5px;font-weight:650">joulukuu 2025</text>
<rect x="124.6" y="49.5" width="12.4" height="3.0" style="fill:var(--accent)"/>
<text x="143.2" y="58.0" style="fill:var(--ink);font-size:15.5px">Hakutermit 640 (125)</text>
<rect x="124.6" y="67.3" width="12.4" height="3.0" style="fill:var(--ink)"/>
<text x="143.2" y="75.8" style="fill:var(--ink);font-size:15.5px">Klikkaukset 3 540 (140)</text>
<rect x="124.6" y="82.8" width="12.4" height="10.8" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="143.2" y="93.6" style="fill:var(--ink);font-size:15.5px">Näyttökerrat 35 700 (120)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="tammikuu 2026">
<rect class="hl" x="110.6" y="16" width="23.5" height="264" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="110.6" y="16" width="23.5" height="264" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="138.2" y="20" width="235.6" height="80.6" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="148.2" y="40.2" style="fill:var(--ink);font-size:15.5px;font-weight:650">tammikuu 2026</text>
<rect x="148.2" y="49.5" width="12.4" height="3.0" style="fill:var(--accent)"/>
<text x="166.8" y="58.0" style="fill:var(--ink);font-size:15.5px">Hakutermit 700 (136)</text>
<rect x="148.2" y="67.3" width="12.4" height="3.0" style="fill:var(--ink)"/>
<text x="166.8" y="75.8" style="fill:var(--ink);font-size:15.5px">Klikkaukset 2 150 (85)</text>
<rect x="148.2" y="82.8" width="12.4" height="10.8" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="166.8" y="93.6" style="fill:var(--ink);font-size:15.5px">Näyttökerrat 32 300 (108)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="helmikuu 2026">
<rect class="hl" x="134.2" y="16" width="23.5" height="264" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="134.2" y="16" width="23.5" height="264" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="161.7" y="20" width="235.6" height="80.6" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="171.7" y="40.2" style="fill:var(--ink);font-size:15.5px;font-weight:650">helmikuu 2026</text>
<rect x="171.7" y="49.5" width="12.4" height="3.0" style="fill:var(--accent)"/>
<text x="190.3" y="58.0" style="fill:var(--ink);font-size:15.5px">Hakutermit 680 (133)</text>
<rect x="171.7" y="67.3" width="12.4" height="3.0" style="fill:var(--ink)"/>
<text x="190.3" y="75.8" style="fill:var(--ink);font-size:15.5px">Klikkaukset 1 810 (72)</text>
<rect x="171.7" y="82.8" width="12.4" height="10.8" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="190.3" y="93.6" style="fill:var(--ink);font-size:15.5px">Näyttökerrat 30 300 (102)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="maaliskuu 2026">
<rect class="hl" x="157.7" y="16" width="23.5" height="264" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="157.7" y="16" width="23.5" height="264" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="185.2" y="20" width="235.6" height="80.6" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="195.2" y="40.2" style="fill:var(--ink);font-size:15.5px;font-weight:650">maaliskuu 2026</text>
<rect x="195.2" y="49.5" width="12.4" height="3.0" style="fill:var(--accent)"/>
<text x="213.8" y="58.0" style="fill:var(--ink);font-size:15.5px">Hakutermit 700 (135)</text>
<rect x="195.2" y="67.3" width="12.4" height="3.0" style="fill:var(--ink)"/>
<text x="213.8" y="75.8" style="fill:var(--ink);font-size:15.5px">Klikkaukset 1 890 (75)</text>
<rect x="195.2" y="82.8" width="12.4" height="10.8" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="213.8" y="93.6" style="fill:var(--ink);font-size:15.5px">Näyttökerrat 32 700 (110)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="huhtikuu 2026">
<rect class="hl" x="181.2" y="16" width="23.5" height="264" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="181.2" y="16" width="23.5" height="264" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="208.8" y="20" width="235.6" height="80.6" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="218.8" y="40.2" style="fill:var(--ink);font-size:15.5px;font-weight:650">huhtikuu 2026</text>
<rect x="218.8" y="49.5" width="12.4" height="3.0" style="fill:var(--accent)"/>
<text x="237.4" y="58.0" style="fill:var(--ink);font-size:15.5px">Hakutermit 780 (150)</text>
<rect x="218.8" y="67.3" width="12.4" height="3.0" style="fill:var(--ink)"/>
<text x="237.4" y="75.8" style="fill:var(--ink);font-size:15.5px">Klikkaukset 1 790 (71)</text>
<rect x="218.8" y="82.8" width="12.4" height="10.8" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="237.4" y="93.6" style="fill:var(--ink);font-size:15.5px">Näyttökerrat 31 800 (107)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="toukokuu 2026">
<rect class="hl" x="204.8" y="16" width="23.5" height="264" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="204.8" y="16" width="23.5" height="264" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="-34.8" y="20" width="235.6" height="80.6" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="-24.8" y="40.2" style="fill:var(--ink);font-size:15.5px;font-weight:650">toukokuu 2026</text>
<rect x="-24.8" y="49.5" width="12.4" height="3.0" style="fill:var(--accent)"/>
<text x="-6.2" y="58.0" style="fill:var(--ink);font-size:15.5px">Hakutermit 630 (123)</text>
<rect x="-24.8" y="67.3" width="12.4" height="3.0" style="fill:var(--ink)"/>
<text x="-6.2" y="75.8" style="fill:var(--ink);font-size:15.5px">Klikkaukset 1 520 (60)</text>
<rect x="-24.8" y="82.8" width="12.4" height="10.8" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="-6.2" y="93.6" style="fill:var(--ink);font-size:15.5px">Näyttökerrat 27 200 (91)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="kesäkuu 2026">
<rect class="hl" x="228.3" y="16" width="23.5" height="264" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="228.3" y="16" width="23.5" height="264" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="-11.3" y="20" width="235.6" height="80.6" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="-1.3" y="40.2" style="fill:var(--ink);font-size:15.5px;font-weight:650">kesäkuu 2026</text>
<rect x="-1.3" y="49.5" width="12.4" height="3.0" style="fill:var(--accent)"/>
<text x="17.3" y="58.0" style="fill:var(--ink);font-size:15.5px">Hakutermit 590 (114)</text>
<rect x="-1.3" y="67.3" width="12.4" height="3.0" style="fill:var(--ink)"/>
<text x="17.3" y="75.8" style="fill:var(--ink);font-size:15.5px">Klikkaukset 1 800 (71)</text>
<rect x="-1.3" y="82.8" width="12.4" height="10.8" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="17.3" y="93.6" style="fill:var(--ink);font-size:15.5px">Näyttökerrat 24 800 (83)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="heinäkuu 2026">
<rect class="hl" x="251.8" y="16" width="23.5" height="264" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="251.8" y="16" width="23.5" height="264" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="12.2" y="20" width="235.6" height="80.6" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="22.2" y="40.2" style="fill:var(--ink);font-size:15.5px;font-weight:650">heinäkuu 2026</text>
<rect x="22.2" y="49.5" width="12.4" height="3.0" style="fill:var(--accent)"/>
<text x="40.8" y="58.0" style="fill:var(--ink);font-size:15.5px">Hakutermit 530 (102)</text>
<rect x="22.2" y="67.3" width="12.4" height="3.0" style="fill:var(--ink)"/>
<text x="40.8" y="75.8" style="fill:var(--ink);font-size:15.5px">Klikkaukset 1 160 (46)</text>
<rect x="22.2" y="82.8" width="12.4" height="10.8" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="40.8" y="93.6" style="fill:var(--ink);font-size:15.5px">Näyttökerrat 17 700 (59)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="elokuu 2026">
<rect class="hl" x="275.4" y="16" width="23.5" height="264" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="275.4" y="16" width="23.5" height="264" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="35.8" y="20" width="235.6" height="80.6" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="45.8" y="40.2" style="fill:var(--ink);font-size:15.5px;font-weight:650">elokuu 2026</text>
<rect x="45.8" y="49.5" width="12.4" height="3.0" style="fill:var(--accent)"/>
<text x="64.4" y="58.0" style="fill:var(--ink);font-size:15.5px">Hakutermit 480 (93)</text>
<rect x="45.8" y="67.3" width="12.4" height="3.0" style="fill:var(--ink)"/>
<text x="64.4" y="75.8" style="fill:var(--ink);font-size:15.5px">Klikkaukset 1 300 (51)</text>
<rect x="45.8" y="82.8" width="12.4" height="10.8" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="64.4" y="93.6" style="fill:var(--ink);font-size:15.5px">Näyttökerrat 20 800 (70)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="syyskuu 2026">
<rect class="hl" x="298.9" y="16" width="23.5" height="264" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="298.9" y="16" width="23.5" height="264" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="59.3" y="20" width="235.6" height="80.6" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="69.3" y="40.2" style="fill:var(--ink);font-size:15.5px;font-weight:650">syyskuu 2026</text>
<rect x="69.3" y="49.5" width="12.4" height="3.0" style="fill:var(--accent)"/>
<text x="87.9" y="58.0" style="fill:var(--ink);font-size:15.5px">Hakutermit 590 (115)</text>
<rect x="69.3" y="67.3" width="12.4" height="3.0" style="fill:var(--ink)"/>
<text x="87.9" y="75.8" style="fill:var(--ink);font-size:15.5px">Klikkaukset 1 240 (49)</text>
<rect x="69.3" y="82.8" width="12.4" height="10.8" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="87.9" y="93.6" style="fill:var(--ink);font-size:15.5px">Näyttökerrat 21 500 (72)</text>
</g></g>
<g class="m d" tabindex="0" role="group" aria-label="lokakuu 2026">
<rect class="hl" x="322.5" y="16" width="23.5" height="264" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="322.5" y="16" width="23.5" height="264" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="82.9" y="20" width="235.6" height="80.6" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="92.9" y="40.2" style="fill:var(--ink);font-size:15.5px;font-weight:650">lokakuu 2026</text>
<rect x="92.9" y="49.5" width="12.4" height="3.0" style="fill:var(--accent)"/>
<text x="111.5" y="58.0" style="fill:var(--ink);font-size:15.5px">Hakutermit 610 (119)</text>
<rect x="92.9" y="67.3" width="12.4" height="3.0" style="fill:var(--ink)"/>
<text x="111.5" y="75.8" style="fill:var(--ink);font-size:15.5px">Klikkaukset 2 110 (84)</text>
<rect x="92.9" y="82.8" width="12.4" height="10.8" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="111.5" y="93.6" style="fill:var(--ink);font-size:15.5px">Näyttökerrat 26 400 (88)</text>
</g></g>
</svg>
<svg class="ix-w" viewBox="0 0 1000 420" role="img" aria-labelledby="tixw" style="width:100%;height:auto;font-family:var(--font-body)">
<title id="tixw">Hakutermit ja klikkaukset viivoina, näyttökerrat palkkeina, kuukausittain, indeksi lokakuu 2025 = 100</title><desc>Hakutermit: 10/25 100, 11/25 101, 12/25 125, 1/26 136, 2/26 133, 3/26 135, 4/26 150, 5/26 123, 6/26 114, 7/26 102, 8/26 93, 9/26 115, 10/26 119; Klikkaukset: 10/25 100, 11/25 75, 12/25 140, 1/26 85, 2/26 72, 3/26 75, 4/26 71, 5/26 60, 6/26 71, 7/26 46, 8/26 51, 9/26 49, 10/26 84; Näyttökerrat: 10/25 100, 11/25 98, 12/25 120, 1/26 108, 2/26 102, 3/26 110, 4/26 107, 5/26 91, 6/26 83, 7/26 59, 8/26 70, 9/26 72, 10/26 88</desc>
<line x1="48" x2="960" y1="380.0" y2="380.0" style="stroke:var(--line);stroke-width:1"/>
<text x="40" y="385.1" text-anchor="end" style="fill:var(--muted);font-size:17px">0</text>
<line x1="48" x2="960" y1="266.2" y2="266.2" style="stroke:var(--line);stroke-width:1"/>
<text x="40" y="271.4" text-anchor="end" style="fill:var(--muted);font-size:17px">50</text>
<line x1="48" x2="960" y1="152.5" y2="152.5" style="stroke:var(--line);stroke-width:1.5"/>
<text x="40" y="157.6" text-anchor="end" style="fill:var(--muted);font-size:17px">100</text>
<line x1="48" x2="960" y1="38.8" y2="38.8" style="stroke:var(--line);stroke-width:1"/>
<text x="40" y="43.9" text-anchor="end" style="fill:var(--muted);font-size:17px">150</text>
<rect x="61.3" y="152.5" width="43.5" height="227.5" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="131.5" y="157.1" width="43.5" height="222.9" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="201.6" y="107.0" width="43.5" height="273.0" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="271.8" y="134.3" width="43.5" height="245.7" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="341.9" y="147.9" width="43.5" height="232.1" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="412.1" y="129.8" width="43.5" height="250.2" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="482.3" y="136.6" width="43.5" height="243.4" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="552.4" y="173.0" width="43.5" height="207.0" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="622.6" y="191.2" width="43.5" height="188.8" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="692.7" y="245.8" width="43.5" height="134.2" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="762.9" y="220.8" width="43.5" height="159.2" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="833.0" y="216.2" width="43.5" height="163.8" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<rect x="903.2" y="179.8" width="43.5" height="200.2" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<polyline points="83.1,152.5 153.2,150.2 223.4,95.6 293.5,70.6 363.7,77.4 433.8,72.9 504.0,38.8 574.2,100.2 644.3,120.6 714.5,147.9 784.6,168.4 854.8,118.4 924.9,109.3" style="fill:none;stroke:var(--accent);stroke-width:3;stroke-linejoin:round;stroke-linecap:round"/>
<circle cx="924.9" cy="109.3" r="4.8" style="fill:var(--accent)"/>
<polyline points="83.1,152.5 153.2,209.4 223.4,61.5 293.5,186.6 363.7,216.2 433.8,209.4 504.0,218.5 574.2,243.5 644.3,218.5 714.5,275.4 784.6,264.0 854.8,268.5 924.9,188.9" style="fill:none;stroke:var(--ink);stroke-width:3;stroke-linejoin:round;stroke-linecap:round"/>
<circle cx="924.9" cy="188.9" r="4.8" style="fill:var(--ink)"/>
<text x="61.3" y="412" text-anchor="start" style="fill:var(--muted);font-size:17px">10/25</text>
<text x="293.5" y="412" text-anchor="middle" style="fill:var(--muted);font-size:17px">1/26</text>
<text x="504.0" y="412" text-anchor="middle" style="fill:var(--muted);font-size:17px">4/26</text>
<text x="714.5" y="412" text-anchor="middle" style="fill:var(--muted);font-size:17px">7/26</text>
<text x="946.7" y="412" text-anchor="end" style="fill:var(--muted);font-size:17px">10/26</text>
<g class="m" tabindex="0" role="group" aria-label="lokakuu 2025">
<rect class="hl" x="48.0" y="16" width="70.2" height="364" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="48.0" y="16" width="70.2" height="364" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="122.2" y="20" width="258.4" height="88.4" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="132.2" y="42.1" style="fill:var(--ink);font-size:17px;font-weight:650">lokakuu 2025</text>
<rect x="132.2" y="52.3" width="13.6" height="3.0" style="fill:var(--accent)"/>
<text x="152.6" y="61.7" style="fill:var(--ink);font-size:17px">Hakutermit 520 (100)</text>
<rect x="132.2" y="71.8" width="13.6" height="3.0" style="fill:var(--ink)"/>
<text x="152.6" y="81.2" style="fill:var(--ink);font-size:17px">Klikkaukset 2 530 (100)</text>
<rect x="132.2" y="88.8" width="13.6" height="11.9" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="152.6" y="100.8" style="fill:var(--ink);font-size:17px">Näyttökerrat 29 800 (100)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="marraskuu 2025">
<rect class="hl" x="118.2" y="16" width="70.2" height="364" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="118.2" y="16" width="70.2" height="364" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="192.3" y="20" width="258.4" height="88.4" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="202.3" y="42.1" style="fill:var(--ink);font-size:17px;font-weight:650">marraskuu 2025</text>
<rect x="202.3" y="52.3" width="13.6" height="3.0" style="fill:var(--accent)"/>
<text x="222.7" y="61.7" style="fill:var(--ink);font-size:17px">Hakutermit 520 (101)</text>
<rect x="202.3" y="71.8" width="13.6" height="3.0" style="fill:var(--ink)"/>
<text x="222.7" y="81.2" style="fill:var(--ink);font-size:17px">Klikkaukset 1 900 (75)</text>
<rect x="202.3" y="88.8" width="13.6" height="11.9" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="222.7" y="100.8" style="fill:var(--ink);font-size:17px">Näyttökerrat 29 200 (98)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="joulukuu 2025">
<rect class="hl" x="188.3" y="16" width="70.2" height="364" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="188.3" y="16" width="70.2" height="364" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="262.5" y="20" width="258.4" height="88.4" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="272.5" y="42.1" style="fill:var(--ink);font-size:17px;font-weight:650">joulukuu 2025</text>
<rect x="272.5" y="52.3" width="13.6" height="3.0" style="fill:var(--accent)"/>
<text x="292.9" y="61.7" style="fill:var(--ink);font-size:17px">Hakutermit 640 (125)</text>
<rect x="272.5" y="71.8" width="13.6" height="3.0" style="fill:var(--ink)"/>
<text x="292.9" y="81.2" style="fill:var(--ink);font-size:17px">Klikkaukset 3 540 (140)</text>
<rect x="272.5" y="88.8" width="13.6" height="11.9" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="292.9" y="100.8" style="fill:var(--ink);font-size:17px">Näyttökerrat 35 700 (120)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="tammikuu 2026">
<rect class="hl" x="258.5" y="16" width="70.2" height="364" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="258.5" y="16" width="70.2" height="364" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="332.6" y="20" width="258.4" height="88.4" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="342.6" y="42.1" style="fill:var(--ink);font-size:17px;font-weight:650">tammikuu 2026</text>
<rect x="342.6" y="52.3" width="13.6" height="3.0" style="fill:var(--accent)"/>
<text x="363.0" y="61.7" style="fill:var(--ink);font-size:17px">Hakutermit 700 (136)</text>
<rect x="342.6" y="71.8" width="13.6" height="3.0" style="fill:var(--ink)"/>
<text x="363.0" y="81.2" style="fill:var(--ink);font-size:17px">Klikkaukset 2 150 (85)</text>
<rect x="342.6" y="88.8" width="13.6" height="11.9" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="363.0" y="100.8" style="fill:var(--ink);font-size:17px">Näyttökerrat 32 300 (108)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="helmikuu 2026">
<rect class="hl" x="328.6" y="16" width="70.2" height="364" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="328.6" y="16" width="70.2" height="364" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="402.8" y="20" width="258.4" height="88.4" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="412.8" y="42.1" style="fill:var(--ink);font-size:17px;font-weight:650">helmikuu 2026</text>
<rect x="412.8" y="52.3" width="13.6" height="3.0" style="fill:var(--accent)"/>
<text x="433.2" y="61.7" style="fill:var(--ink);font-size:17px">Hakutermit 680 (133)</text>
<rect x="412.8" y="71.8" width="13.6" height="3.0" style="fill:var(--ink)"/>
<text x="433.2" y="81.2" style="fill:var(--ink);font-size:17px">Klikkaukset 1 810 (72)</text>
<rect x="412.8" y="88.8" width="13.6" height="11.9" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="433.2" y="100.8" style="fill:var(--ink);font-size:17px">Näyttökerrat 30 300 (102)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="maaliskuu 2026">
<rect class="hl" x="398.8" y="16" width="70.2" height="364" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="398.8" y="16" width="70.2" height="364" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="472.9" y="20" width="258.4" height="88.4" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="482.9" y="42.1" style="fill:var(--ink);font-size:17px;font-weight:650">maaliskuu 2026</text>
<rect x="482.9" y="52.3" width="13.6" height="3.0" style="fill:var(--accent)"/>
<text x="503.3" y="61.7" style="fill:var(--ink);font-size:17px">Hakutermit 700 (135)</text>
<rect x="482.9" y="71.8" width="13.6" height="3.0" style="fill:var(--ink)"/>
<text x="503.3" y="81.2" style="fill:var(--ink);font-size:17px">Klikkaukset 1 890 (75)</text>
<rect x="482.9" y="88.8" width="13.6" height="11.9" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="503.3" y="100.8" style="fill:var(--ink);font-size:17px">Näyttökerrat 32 700 (110)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="huhtikuu 2026">
<rect class="hl" x="468.9" y="16" width="70.2" height="364" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="468.9" y="16" width="70.2" height="364" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="543.1" y="20" width="258.4" height="88.4" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="553.1" y="42.1" style="fill:var(--ink);font-size:17px;font-weight:650">huhtikuu 2026</text>
<rect x="553.1" y="52.3" width="13.6" height="3.0" style="fill:var(--accent)"/>
<text x="573.5" y="61.7" style="fill:var(--ink);font-size:17px">Hakutermit 780 (150)</text>
<rect x="553.1" y="71.8" width="13.6" height="3.0" style="fill:var(--ink)"/>
<text x="573.5" y="81.2" style="fill:var(--ink);font-size:17px">Klikkaukset 1 790 (71)</text>
<rect x="553.1" y="88.8" width="13.6" height="11.9" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="573.5" y="100.8" style="fill:var(--ink);font-size:17px">Näyttökerrat 31 800 (107)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="toukokuu 2026">
<rect class="hl" x="539.1" y="16" width="70.2" height="364" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="539.1" y="16" width="70.2" height="364" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="276.7" y="20" width="258.4" height="88.4" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="286.7" y="42.1" style="fill:var(--ink);font-size:17px;font-weight:650">toukokuu 2026</text>
<rect x="286.7" y="52.3" width="13.6" height="3.0" style="fill:var(--accent)"/>
<text x="307.1" y="61.7" style="fill:var(--ink);font-size:17px">Hakutermit 630 (123)</text>
<rect x="286.7" y="71.8" width="13.6" height="3.0" style="fill:var(--ink)"/>
<text x="307.1" y="81.2" style="fill:var(--ink);font-size:17px">Klikkaukset 1 520 (60)</text>
<rect x="286.7" y="88.8" width="13.6" height="11.9" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="307.1" y="100.8" style="fill:var(--ink);font-size:17px">Näyttökerrat 27 200 (91)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="kesäkuu 2026">
<rect class="hl" x="609.2" y="16" width="70.2" height="364" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="609.2" y="16" width="70.2" height="364" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="346.8" y="20" width="258.4" height="88.4" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="356.8" y="42.1" style="fill:var(--ink);font-size:17px;font-weight:650">kesäkuu 2026</text>
<rect x="356.8" y="52.3" width="13.6" height="3.0" style="fill:var(--accent)"/>
<text x="377.2" y="61.7" style="fill:var(--ink);font-size:17px">Hakutermit 590 (114)</text>
<rect x="356.8" y="71.8" width="13.6" height="3.0" style="fill:var(--ink)"/>
<text x="377.2" y="81.2" style="fill:var(--ink);font-size:17px">Klikkaukset 1 800 (71)</text>
<rect x="356.8" y="88.8" width="13.6" height="11.9" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="377.2" y="100.8" style="fill:var(--ink);font-size:17px">Näyttökerrat 24 800 (83)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="heinäkuu 2026">
<rect class="hl" x="679.4" y="16" width="70.2" height="364" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="679.4" y="16" width="70.2" height="364" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="417.0" y="20" width="258.4" height="88.4" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="427.0" y="42.1" style="fill:var(--ink);font-size:17px;font-weight:650">heinäkuu 2026</text>
<rect x="427.0" y="52.3" width="13.6" height="3.0" style="fill:var(--accent)"/>
<text x="447.4" y="61.7" style="fill:var(--ink);font-size:17px">Hakutermit 530 (102)</text>
<rect x="427.0" y="71.8" width="13.6" height="3.0" style="fill:var(--ink)"/>
<text x="447.4" y="81.2" style="fill:var(--ink);font-size:17px">Klikkaukset 1 160 (46)</text>
<rect x="427.0" y="88.8" width="13.6" height="11.9" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="447.4" y="100.8" style="fill:var(--ink);font-size:17px">Näyttökerrat 17 700 (59)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="elokuu 2026">
<rect class="hl" x="749.5" y="16" width="70.2" height="364" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="749.5" y="16" width="70.2" height="364" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="487.1" y="20" width="258.4" height="88.4" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="497.1" y="42.1" style="fill:var(--ink);font-size:17px;font-weight:650">elokuu 2026</text>
<rect x="497.1" y="52.3" width="13.6" height="3.0" style="fill:var(--accent)"/>
<text x="517.5" y="61.7" style="fill:var(--ink);font-size:17px">Hakutermit 480 (93)</text>
<rect x="497.1" y="71.8" width="13.6" height="3.0" style="fill:var(--ink)"/>
<text x="517.5" y="81.2" style="fill:var(--ink);font-size:17px">Klikkaukset 1 300 (51)</text>
<rect x="497.1" y="88.8" width="13.6" height="11.9" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="517.5" y="100.8" style="fill:var(--ink);font-size:17px">Näyttökerrat 20 800 (70)</text>
</g></g>
<g class="m" tabindex="0" role="group" aria-label="syyskuu 2026">
<rect class="hl" x="819.7" y="16" width="70.2" height="364" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="819.7" y="16" width="70.2" height="364" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="557.3" y="20" width="258.4" height="88.4" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="567.3" y="42.1" style="fill:var(--ink);font-size:17px;font-weight:650">syyskuu 2026</text>
<rect x="567.3" y="52.3" width="13.6" height="3.0" style="fill:var(--accent)"/>
<text x="587.7" y="61.7" style="fill:var(--ink);font-size:17px">Hakutermit 590 (115)</text>
<rect x="567.3" y="71.8" width="13.6" height="3.0" style="fill:var(--ink)"/>
<text x="587.7" y="81.2" style="fill:var(--ink);font-size:17px">Klikkaukset 1 240 (49)</text>
<rect x="567.3" y="88.8" width="13.6" height="11.9" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="587.7" y="100.8" style="fill:var(--ink);font-size:17px">Näyttökerrat 21 500 (72)</text>
</g></g>
<g class="m d" tabindex="0" role="group" aria-label="lokakuu 2026">
<rect class="hl" x="889.8" y="16" width="70.2" height="364" style="fill:var(--accent);fill-opacity:.08"/>
<rect x="889.8" y="16" width="70.2" height="364" style="fill:transparent"/>
<g class="tip" style="pointer-events:none"><rect x="627.4" y="20" width="258.4" height="88.4" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>
<text x="637.4" y="42.1" style="fill:var(--ink);font-size:17px;font-weight:650">lokakuu 2026</text>
<rect x="637.4" y="52.3" width="13.6" height="3.0" style="fill:var(--accent)"/>
<text x="657.8" y="61.7" style="fill:var(--ink);font-size:17px">Hakutermit 610 (119)</text>
<rect x="637.4" y="71.8" width="13.6" height="3.0" style="fill:var(--ink)"/>
<text x="657.8" y="81.2" style="fill:var(--ink);font-size:17px">Klikkaukset 2 110 (84)</text>
<rect x="637.4" y="88.8" width="13.6" height="11.9" style="fill:color-mix(in srgb,var(--muted) 38%,transparent)"/>
<text x="657.8" y="100.8" style="fill:var(--ink);font-size:17px">Näyttökerrat 26 400 (88)</text>
</g></g>
</svg>
<figcaption>Kuukausittaiset luvut lokakuusta 2025 lokakuuhun 2026, indeksi: lokakuu 2025 = 100. Hakutermit ja klikkaukset ovat viivoja, näyttökerrat palkkeja. Kuukauden päälle viemällä näkyvät kuukauden luvut ja suluissa indeksi.</figcaption>
</figure>

## Miten luku lasketaan?

1. Laske `COUNT(DISTINCT query)` koko jaksolta. Älä summaa päivittäisiä määriä, koska sama termi laskettaisiin monta kertaa.
2. Sijoitusluokkaa varten laske hakutermille ensin näyttökerroilla painotettu keskisijoitus. Exportin `sum_top_position` on [Googlen taulukkokuvauksen mukaan](https://support.google.com/webmasters/answer/12917991) nollapohjainen, joten lisää tulokseen yksi.
3. Jätä pois anonymisoidut haut (`is_anonymized_query`). Niillä ei ole termitekstiä, joten ne eivät kuulu laskentaan.
4. Vertaa edelliseen jaksoon, jonka pituus on sama.

Kysely BigQueryssä. Se laskee yllä olevat luvut kahdelle jaksolle ja katsoo, kuinka moni termi on mukana molemmissa. Päivämäärät ovat esimerkkejä, vaihda omiisi. Search Consolen exportin päivät ovat Tyynenmeren aikaa.

```sql
DECLARE uusin_jakso_alku DATE DEFAULT DATE '2026-02-01';
DECLARE uusin_jakso_loppu DATE DEFAULT DATE '2026-02-28';
DECLARE edellinen_jakso_alku DATE DEFAULT DATE '2026-01-04';
DECLARE edellinen_jakso_loppu DATE DEFAULT DATE '2026-01-31';
-- Brändihakujen sanat. Esimerkki, vaihda oman brändisi sanoihin.
DECLARE brandi_haku STRING DEFAULT r'ninja ?shell';

CREATE TEMP TABLE haut AS
SELECT
  IF(data_date BETWEEN uusin_jakso_alku AND uusin_jakso_loppu, 'uusin', 'edellinen') AS jakso,
  query,
  REGEXP_CONTAINS(query, brandi_haku) AS brandihaku,
  SUM(impressions) AS nayttokerrat,
  SUM(clicks) AS klikkaukset,
  SUM(sum_top_position) / SUM(impressions) + 1 AS keskisijoitus
FROM `projekti.searchconsole.searchdata_site_impression`
WHERE NOT is_anonymized_query
  AND (data_date BETWEEN uusin_jakso_alku AND uusin_jakso_loppu
    OR data_date BETWEEN edellinen_jakso_alku AND edellinen_jakso_loppu)
GROUP BY jakso, query, brandihaku;

-- 1. Luvut jaksoittain, brändihaut erikseen
SELECT
  jakso,
  brandihaku,
  COUNT(*) AS uniikit_hakutermit,
  COUNTIF(keskisijoitus <= 10) AS hakutermit_sijoilla_1_10,
  SUM(nayttokerrat) AS nayttokerrat,
  SUM(klikkaukset) AS klikkaukset
FROM haut
GROUP BY jakso, brandihaku
ORDER BY jakso, brandihaku;

-- 2. Kuinka moni termi on mukana molemmissa jaksoissa
SELECT
  COUNTIF(uusimmassa AND edellisessa) AS molemmissa,
  COUNTIF(uusimmassa AND NOT edellisessa) AS vain_uusimmassa,
  COUNTIF(edellisessa AND NOT uusimmassa) AS vain_edellisessa
FROM (
  SELECT
    query,
    LOGICAL_OR(jakso = 'uusin') AS uusimmassa,
    LOGICAL_OR(jakso = 'edellinen') AS edellisessa
  FROM haut
  GROUP BY query
);
```

Kysely sopii kertaluonteiseen tarkasteluun. Jos luku menee jatkuvaan käyttöön, esimerkiksi Data Studio -raportin pohjaksi, minusta Dataform on siihen parempi vaihtoehto.

Search Consolen suorituskykyraportin [taulukossa on enintään 1 000 riviä, ja anonymisoidut haut puuttuvat siitä](https://support.google.com/webmasters/answer/17010575). Bulk exportissa anonymisoiduilla riveillä on `is_anonymized_query`-lippu, mutta hakutekstiä niillä ei ole.

## Mitä luku ei kerro?

Ei sitä, ovatko termit liiketoiminnalle tärkeitä. 500 uutta hakutermiä sijoilla 30–80 ei tuo liikennettä. Siksi seuraisin kokonaismäärän rinnalla sijoitusjakaumaa.

Brändihaut kannattaa erottaa omiksi. Muuten brändikysynnän kasvu peittää sen, mitä sisältö on saanut aikaan.

Hakutermien määrä on minusta diagnostinen mittari, ei KPI. Se selittää liikenteen muutosta, mutta tavoite ei ole kasvattaa sitä. Sama kysymys pätee tähänkin: mitä tämä numero tekee bisnekselle?

Kuinka monella eri haulla oma sivustosi näkyy, ja tiedätkö sen?

## Lähteet

- [SEO Gets: 5 Reasons Why You Should Count Queries in Search Console](https://seogets.com/blog/5-reasons-to-count-queries). Hakutermien laskemista myyvän yrityksen oma näkemys, ei tutkimus.
- [Search Console Help: Table guidelines and reference](https://support.google.com/webmasters/answer/12917991). Dokumentaatio: bulk exportin taulut ja kentät, myös `sum_top_position` ja `is_anonymized_query`.
- [Search Console Help: Performance report, troubleshooting data discrepancies](https://support.google.com/webmasters/answer/17010575). Dokumentaatio: taulukon 1 000 rivin raja ja anonymisoidut haut.
- Luvut ovat oikean sivuston Search Console bulk exportista, anonymisoituja ja pyöristettyjä. Tulkinnat ovat omiani.
