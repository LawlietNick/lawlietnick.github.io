---
layout: ../../../layouts/Base.astro
title: "Hakunäkyvyys voi kasvaa ilman klikkien kasvua: mitä Googlen AI-vastaukset muuttavat?"
description: "Googlen AI-näkymän näyttökerrat kasvoivat omassa datassani, klikit eivät. Näin luen lukuja ja mitä AI-aikana kannattaa mitata."
date: 2026-11-04
category: seo
tags: ["SEO", "Search Console", "AI Overviews", "GEO", "raportointi"]
citations:
  - name: "Search Console Help: Generative AI performance report"
    url: "https://support.google.com/webmasters/answer/16984139"
  - name: "Agarwal ja Sen: The Impact of Google AI Overviews on Publisher Traffic and User Experience (SSRN-työpaperi)"
    url: "https://ssrn.com/abstract=6513059"
  - name: "Pew Research Center: Google users are less likely to click on links when an AI summary appears in the results"
    url: "https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/"
---

Google-haku ei toimi enää samalla tavalla kuin ennen.

Ennen vastaus löytyi usein klikkaamalla hakutulosta. Nyt AI-vastaus näkyy hauissa yhä useammin, ja omassa Search Console -datassani sen näyttökerrat kasvoivat nopeasti. Klikit eivät lähteneet mukaan.

Se ei todista, että AI vie klikit. Se kertoo, että näkyvyys ja liikenne eivät enää välttämättä liiku yhdessä.

## Nyt Google voi antaa vastauksen suoraan hakutuloksissa

Search Consolessa on Generative AI features -raportti. Googlen ohjeen mukaan se laskee, kuinka monta kertaa sivuston linkkejä näytettiin AI Overviews- tai AI Mode -vastauksissa ([Search Console Help](https://support.google.com/webmasters/answer/16984139)). Raportti on kaikkien sivustojen käytössä 31.8.2026 alkaen.

Raportti näyttää vain näyttökerrat, ei klikkejä. Jos sivusto näkyy samassa haussa usealla linkillä, se lasketaan yhdeksi näyttökerraksi. Search Labs -kokeilut eivät ole mukana.

## AI:n yleistyminen näkyy myös hakudatassa

Vertasin kuukausitasolla useamman suomalaisen sivuston AI-raportin näyttökertoja ja tavallisen Performance-raportin klikkejä (Search type: Web). Kuvan ja taulukon luvut ovat esimerkkilukuja.

<!-- TODO Niko: vahvista, ovatko AI-raportin ja klikkien sivustot samat. Sivustojen määrä ja nimet jätetty pois tarkoituksella. -->

```chart
{
  "type": "bar",
  "wide": true,
  "title": "AI-näkymän näyttökerrat kuukausittain, kesäkuu–lokakuu",
  "desc": "Kesäkuu 30 000, heinäkuu 39 000, elokuu 44 000, syyskuu 47 000, lokakuu 84 000. Lokakuu on 79 % syyskuuta suurempi.",
  "caption": "AI-näkymän näyttökerrat kuukaudessa, tuhatta (k). Syyskuusta lokakuuhun kasvua 79 %.",
  "data": [
    {
      "label": "Kesä",
      "value": 30000,
      "text": "30k"
    },
    {
      "label": "Heinä",
      "value": 39000,
      "text": "39k",
      "note": "+30 %"
    },
    {
      "label": "Elo",
      "value": 44000,
      "text": "44k",
      "note": "+13 %"
    },
    {
      "label": "Syys",
      "value": 47000,
      "text": "47k",
      "note": "+7 %"
    },
    {
      "label": "Loka",
      "value": 84000,
      "text": "84k"
    }
  ],
  "badge": {
    "text": "+79 %",
    "label": "lokakuu syyskuuhun verrattuna"
  }
}
```

| Kuukausi | AI-näkymän näyttökerrat | Muutos | Klikit | Muutos |
| --- | --- | --- | --- | --- |
| Kesäkuu | 30 000 | | 28 000 | |
| Heinäkuu | 39 000 | +30 % | 31 000 | +11 % |
| Elokuu | 44 000 | +13 % | 43 000 | +39 % |
| Syyskuu | 47 000 | +7 % | 43 000 | 0 % |
| Lokakuu | 84 000 | +79 % | 39 000 | −9 % |

Luvut on luettu Search Consolen kuvaajista, joten niissä on noin 5 prosentin lukuvirhe. AI-raportin data alkaa toukokuusta.
## Satunnaistetussa kokeessa AI-yhteenveto laski klikkejä noin 40 %

Kaksi tutkimusta kannattaa lukea yhdessä.

Ensimmäinen on satunnaistettu koe. Saharsh Agarwal ja Ananya Sen jakoivat 1 065 yhdysvaltalaista Chrome-käyttäjää satunnaisesti eri ryhmiin. Yhdessä ryhmässä AI Overview piilotettiin, kontrolliryhmässä ei. Koe kesti kaksi viikkoa tammikuussa ja helmikuussa 2026. Hauissa, joissa AI Overview olisi näkynyt, sivustoille johtavia orgaanisia klikkejä oli 0,37 per haku, kun AI Overview näkyi. Kun se oli piilotettu, klikkejä oli 0,62. AI Overview vähensi klikkejä 39,8 %. Hakuja ilman yhtään klikkiä oli 73 %, kun AI Overview näkyi, ja 54 %, kun se oli piilotettu. Käyttäjien kokemus hakutulosten laadusta ei muuttunut mitattavasti ([SSRN-työpaperi](https://ssrn.com/abstract=6513059)).

```chart
{
  "type": "hbar",
  "title": "Ulospäin johtavat orgaaniset klikit per haku kokeessa",
  "desc": "Kun AI Overview oli piilotettu, klikkejä oli 0,62 per haku. Kun se näkyi, klikkejä oli 0,37 per haku. Ero on 39,8 %.",
  "caption": "Orgaanisia klikkejä per haku kokeessa, kun AI Overview oli piilotettu ja kun se näkyi. Lähde: Agarwal ja Sen, SSRN-työpaperi, ei vertaisarvioitu.",
  "data": [
    {
      "label": "AI Overview piilotettu",
      "value": 0.62,
      "text": "0,62"
    },
    {
      "label": "AI Overview näkyvissä",
      "value": 0.37,
      "text": "0,37"
    }
  ],
  "delta": "−39,8 %"
}
```

Koe on työpaperi, jota ei ole vertaisarvioitu. Aineisto on yhdysvaltalaisia pöytäkoneen Chrome-käyttäjiä kahden viikon ajalta, eikä se mittaa julkaisijoiden tuloja.

Toinen on Pew Researchin selvitys. Se seurasi 900 yhdysvaltalaisen aikuisen selailua maaliskuussa 2025. Käyttäjät klikkasivat perinteistä tulosta 8 prosentissa vierailuista, kun sivulla oli AI-tiivistelmä, ja 15 prosentissa, kun sitä ei ollut. Tiivistelmän omaa linkkiä klikattiin 1 prosentissa ([Pew Research Center](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)). Se on havaintoaineisto. Se näyttää yhteyden, mutta ei todista syytä.

Koe on vahvempi todiste syystä, ja Pew antaa laajemman kuvan käyttäytymisestä. Kumpikaan ei mittaa suomalaisia hakuja.

## Hakunäkyvyys voi kasvaa ilman vastaavaa liikenteen kasvua

Elokuusta lokakuuhun AI-näkymän näyttökerrat kasvoivat 91 % ja klikit laskivat 9 %. Syyskuusta lokakuuhun luvut ovat +79 % ja −9 %.

```chart
{
  "type": "line",
  "wide": true,
  "title": "AI-näkymän näyttökerrat ja klikit, indeksi elokuu = 100",
  "desc": "AI-näkymän näyttökerrat: kesäkuu 68, heinäkuu 89, elokuu 100, syyskuu 107, lokakuu 191. Klikit: kesäkuu 65, heinäkuu 72, elokuu 100, syyskuu 100, lokakuu 91.",
  "caption": "AI-näkymän näyttökerrat ja klikit, indeksi: elokuu = 100. Syyskuusta lokakuuhun väli aukeaa.",
  "categories": [
    "Kesä",
    "Heinä",
    "Elo",
    "Syys",
    "Loka"
  ],
  "baseline": 100,
  "series": [
    {
      "name": "Klikit",
      "values": [
        65,
        72,
        100,
        100,
        91
      ],
      "raw": [28000, 31000, 43000, 43000, 39000],
      "endText": "−9 %"
    },
    {
      "name": "AI-näkymä",
      "values": [
        68,
        89,
        100,
        107,
        191
      ],
      "raw": [30000, 39000, 44000, 47000, 84000],
      "accent": true,
      "endText": "+91 %"
    }
  ]
}
```

Valitsin vertailukuukaudeksi elokuun. Kesäkuu on monella sivustolla kesän pohja, ja siihen verrattuna klikit näyttäisivät kasvaneen 39 %. Se olisi harhaanjohtava kuva.

Tämä on havainto, ei koe. En tiedä, miksi klikit laskivat. Syynä voi olla AI-vastaus, kausivaihtelu tai jokin muu muutos.

## Pelkkä liikenne ei kerro koko kuvaa hakunäkyvyydestä

Suosittelen katsomaan kolmea asiaa erikseen.

<figure style="width:100%">
<svg viewBox="0 0 620 230" role="img" aria-labelledby="f4t f4d" style="width:100%;height:auto;font-family:var(--font-body);font-variant-numeric:tabular-nums"><title id="f4t">Kolme näkökulmaa hakunäkyvyyteen</title><desc id="f4d">Näkyvyys: löydetäänkö sivusto? Liikenne: klikataanko sitä? AI-näkyvyys: mainitaanko brändi tai sivusto AI-vastauksessa?</desc>
<rect x="0.0" y="10" width="192" height="210" rx="14" style="fill:var(--color-surface);stroke:var(--line);stroke-width:2"/>
<path d="M62.0 76 C76.0 46 116.0 46 130.0 76 C116.0 106 76.0 106 62.0 76 Z" style="fill:none;stroke:var(--ink);stroke-width:4;stroke-linejoin:round"/><circle cx="96.0" cy="76" r="11" style="fill:none;stroke:var(--ink);stroke-width:4"/><circle cx="96.0" cy="76" r="3.5" style="fill:var(--ink)"/>
<text x="96.0" y="158" text-anchor="middle" style="fill:var(--ink);font-size:28px;font-weight:700;">Näkyvyys</text>
<text x="96.0" y="194" text-anchor="middle" style="fill:var(--muted);font-size:22px;font-weight:400;">Löydetäänkö?</text>
<rect x="214.0" y="10" width="192" height="210" rx="14" style="fill:var(--color-surface);stroke:var(--line);stroke-width:2"/>
<path d="M296.0 52 L296.0 100 L308.0 90 L316.0 110 L325.0 106 L317.0 87 L332.0 87 Z" style="fill:none;stroke:var(--ink);stroke-width:4;stroke-linejoin:round"/>
<text x="310.0" y="158" text-anchor="middle" style="fill:var(--ink);font-size:28px;font-weight:700;">Liikenne</text>
<text x="310.0" y="194" text-anchor="middle" style="fill:var(--muted);font-size:22px;font-weight:400;">Klikataanko?</text>
<rect x="428.0" y="10" width="192" height="210" rx="14" style="fill:var(--color-surface);stroke:var(--line);stroke-width:2"/>
<path d="M524.0 46 C524.0 70 542.0 82 564.0 82 C542.0 82 524.0 94 524.0 118 C524.0 94 506.0 82 484.0 82 C506.0 82 524.0 70 524.0 46 Z" style="fill:var(--accent)"/>
<text x="524.0" y="158" text-anchor="middle" style="fill:var(--ink);font-size:28px;font-weight:700;">AI</text>
<text x="524.0" y="194" text-anchor="middle" style="fill:var(--muted);font-size:22px;font-weight:400;">Mainitaanko?</text>
</svg>
<figcaption>Kolme näkökulmaa hakunäkyvyyteen: näkyvyys, liikenne ja AI-näkyvyys.</figcaption>
</figure>

1. **Näkyvyys:** näyttökerrat ja hakutermien kattavuus. Löydetäänkö sivusto?
2. **Liikenne:** orgaaniset klikit, CTR ja sivustokäynnit. Klikataanko sitä?
3. **AI-näkyvyys:** näyttökerrat AI-näkymässä. Mainitaanko brändi tai sivusto AI-vastauksessa?

Search Console ei kerro mainintoja, vain näyttökerrat linkeistä. Maininnat pitää seurata erikseen, jos haluat tietää ne.

Älä yhdistä kolmea yhdeksi luvuksi. Se vaatisi perustellun laskentamallin, jota minulla ei ole. Kolme näkökulmaa antaa kattavamman kuvan.

Käytännössä tämä tarkoittaa neljää asiaa:

1. Vie AI-raportin ja Performance-raportin luvut kuukausitasolla samaan taulukkoon.
2. Valitse vertailukuukausi, joka ei ole kausivaihtelun pohja, ja kirjoita se näkyviin.
3. Lue muutokset erikseen. Jos AI-näyttökerrat kasvavat ja klikit eivät, tutki sivutasolla, mitkä sivut menettävät klikkejä.
4. Älä päättele syytä pelkästä rinnakkaisesta kehityksestä.

Näkyykö sama muutos teidän hakudatassanne?
