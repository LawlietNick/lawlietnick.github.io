# Saavutettavuuskorjaukset 4.10.2026

**Auditointiraportin kaikki kahdeksan vahvistettua puutetta on korjattu työtilaan. Muutoksia ei ole julkaistu.** Nykyinen typografia, väriteemat, artikkelitekstit ja työkalujen toiminnot säilyvät.

## Korjaukset

| Auditoinnin havainto | Toteutettu korjaus | Varmistus |
| --- | --- | --- |
| 1. Fokuskehysten kontrasti | Yhteinen fokusväri on nyt peittävä korostusväri. Vahvempi kehä käyttää samaa muuttujaa. Myös data layer -kenttien oma haalea kehä käyttää yhteistä tokenia. | Valikkopainike: vaalea 6.03:1, tumma 7.24:1. Näppäimistöfokus aktiivinen molemmissa. |
| 2. Cookiebot-oppaiden koodikommentit | Shikin nykyisen GitHub Dark -teeman kommenttiväri muutettiin `#8b949e`:ksi. Muu syntaksiväritys ja tausta säilyvät. | Oppaiden 14 aiempaa kontrastilöydöstä kummassakin kieliversiossa poistuivat molemmissa teemoissa. |
| 3. Mobiiliotsikon leikkautuminen | ToolHero-sarakkeet voivat kutistua ja pitkä otsikkosana rivittyy tarvittaessa. | 320 px näkymässä h1:n reunat x=20–300; koko otsikko näkyy. |
| 4. Tietosuojasivujen piilotettu h1 | Kaksoisotsikon piilotus rajattiin artikkelisivuihin. | Kumpikin tietosuojasivu sisältää näkyvän h1:n. |
| 5. Sisäkkäiset main-elementit | GTM-, data layer- ja myös yhteistä rakennetta käyttävän GA4-raporttityökalun sisäosa on div. CSS-selektorit päivitettiin vastaavasti. | Julkaistuissa työkaluissa yksi main; rakennekohtaiset axe-löydökset poistuivat. |
| 6. Otsikkotason hypyt | Footerin sarakeotsikot ovat h2. Neljän AI-artikkelin varsinaiset pääosiot ovat h2 ja niiden alaosiot h3. Data layer -dokumentin muokattavat osio-otsikot ovat nimettyjä h2-otsikoita. | Kaikki 11 julkaistun sivun ja virhesivun heading-order-löydökset poistuivat. |
| 7. GTM-kentän virhekuvaus | Virhetekstillä on oma id. Virheellisestä kentästä poistuttaessa kenttä merkitään virheelliseksi ja kuvaus viittaa virheeseen. Korjattu arvo palauttaa tavallisen ohjeen. Tyhjän kentän viesti kertoo pakollisuudesta. | Pysyvä selaintesti läpäisi virhe–korjaus-polun molemmilla kielillä. Natiivi required/pattern-validointi säilyy. |
| 8. Annotaatioiden vieritettävä ehdotuslista | Lista tulee Tab-järjestykseen vain, kun yksikään ehdotuspainike ei ole käytettävissä. Normaalissa tilassa painikkeet säilyvät Tab-kohteina. | Uusi testi fokusoi listan, vierittää sitä nuolinäppäimellä ja sulkee sen Escapella. Dynaamisen tilan axe-löydös poistui. |

Korjaukset palvelevat yhteisten komponenttien kautta suomea ja englantia. Artikkelien koodilohkot ja kopioitavat promptit verrattiin aiempaan versioon: niiden sisältö säilyi täsmälleen samana. Otsikkotekstit ja niiden slug-pohjaiset linkkikohteet säilyivät; uusia artikkelilinkkejä ei lisätty tässä tehtävässä.

Shikin teema mukautettiin [Astron tukemalla custom theme -asetuksella](https://docs.astro.build/en/guides/syntax-highlighting/). Projektiin ei lisätty uutta riippuvuutta; teema tulee jo asennetusta Shiki-paketista.

## Varmistus

- `npm run build`: läpäisi, 69 rakennettua sivua; sisältövalidointi läpäisi.
- `npm test`: **37/37 Vitest-testiä ja 62/62 Node-testiä läpäisi**.
- Kohdennetut projektin Playwright-testit: **32/32 läpäisi**. Mukana valikon reflow/fokus, GTM-vienti ja validointi, data layer -muokkaus ja Markdown/DOCX/tulostus, GA4-annotaatioiden näppäimistö ja lisälukemisen linkit.
- Axe-core 4.13.0: **39 sivua × 2 teemaa**, korjatun tuotantobuildin perusnäkymät. Ei vahvistettuja rikkomuksia aiemmin dokumentoidun, identtisiä kielinavigaatioita koskevan väärän hälytyksen poistamisen jälkeen. Myös interaktiiviset näppäimistö- ja virhetilat tarkistettiin molemmissa teemoissa; niihin ei jäänyt vahvistettua axe-löydöstä.
- Selainkatselu: tietosuojasivun näkyvä otsikko ja data layer -otsikon 320 px mobiilinäkymä. `git diff --check` läpäisi.

Automaattinen tarkistus sisälsi WCAG A/AA -sääntöjä ja rakenteen best practice -sääntöjä. Aiempi [auditointiraportti](/Users/niko/Documents/claude/nk-2026-astrojs/docs/reports/accessibility-2026-10-04.md) sisältää tarkistetut URL:t, löydösten perustelut ja WCAG-lähteet. Julkista sivustoa ei muutettu eikä väitetä korjatuksi ennen julkaisua.

## Selainkuvat

![Korjattu mobiiliotsikko, 320 px](/Users/niko/Documents/claude/nk-2026-astrojs/docs/reports/accessibility-fixed-mobile.jpg)

![Tietosuojasivun näkyvä pääotsikko](/Users/niko/Documents/claude/nk-2026-astrojs/docs/reports/accessibility-fixed-privacy.jpg)

## Jäljelle jäävät tarkistuksen rajat

Todellista VoiceOver/NVDA-käyttöä, fyysistä mobiililaitetta tai täydellistä selaimen 400 % zoomausta ja tekstivälien mukautusta ei testattu. Axe jättää osan kontrastiarvioista manuaaliseen tarkistukseen esimerkiksi pseudo-elementtitaustojen vuoksi; `incomplete`-kohdat ovat raakadatassa. Kaikkia työkalujen mahdollisia tilayhdistelmiä ei käyty läpi. Tulokset eivät ole koko sivuston WCAG-vaatimustenmukaisuussertifikaatti.

Impeccable-detektorin ainoa uusi käsiteltävä havainto oli footerin olemassa oleva Roboto Flex -fontti. DESIGN.md määrittää sen tarkoitukselliseksi UI-fontiksi. Säilytin sen ja tallensin tiedostoon rajatun `overused-font: Roboto` -poikkeuksen työkalun kautta `.impeccable/config.json`-tiedostoon. Muita uusia poikkeuksia ei lisätty.

## Tarkistusaineisto

[Vaalea teema, 37 sivua](/Users/niko/Documents/claude/nk-2026-astrojs/docs/reports/accessibility-fixed-light-2026-10-04.json) · [Tumma teema, 37 sivua](/Users/niko/Documents/claude/nk-2026-astrojs/docs/reports/accessibility-fixed-dark-2026-10-04.json) · [Interaktiiviset tilat ja fokusmittaukset](/Users/niko/Documents/claude/nk-2026-astrojs/docs/reports/accessibility-fixed-states-2026-10-04.json) · [Lisäsivut, vaalea](/Users/niko/Documents/claude/nk-2026-astrojs/docs/reports/accessibility-fixed-extra-light-2026-10-04.json) · [Lisäsivut, tumma](/Users/niko/Documents/claude/nk-2026-astrojs/docs/reports/accessibility-fixed-extra-dark-2026-10-04.json).
