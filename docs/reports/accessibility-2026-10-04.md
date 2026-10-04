# Saavutettavuustarkistus 4.10.2026

**Sivustossa on vielä korjattavaa. Ensimmäiseksi kannattaa korjata fokuskehysten kontrasti, Cookiebot-oppaiden koodikommenttien kontrasti ja mobiilissa leikkautuva otsikko.** Valikoiden keskeiset näppäimistötoiminnot toimivat testatuissa tilanteissa.

Tämä on tarkistus ja korjaussuunnitelma. Sivuston käyttöliittymään ei tehty tässä tarkistuksessa muutoksia eikä mitään julkaistu. Aiemmat lisälukemisen korjaukset ovat työtilassa; julkinen sivusto ja tuotantobuild tarkistettiin erikseen.

## Laajuus ja menetelmä

Tarkistettiin 37 julkaistua, indeksoitavaa HTML-reittiä sekä niiden tuotantobuild samasta työtilasta. Julkiselta sivustolta tarkistettiin lisäksi footerin sivustokartta `/entitymap.html` ja virhesivu `/404/`: yhteensä 39 julkista sivua. Molemmat kielet ja vaalea/tumma teema olivat mukana. Sivuluettelo on raportin lopussa.

Automaattinen tarkistus: Chromium, axe-core 4.13.0, WCAG A/AA -säännöt sekä rakennekohtaiset best practice -säännöt. Perusnäkymä 1280 × 900; reflow-havainnot 320 ja 390 CSS-pikselin levyisinä. Lisäksi tarkistettiin lähdekoodi ja rakennettu HTML sekä katsottiin julkisia sivuja Codexin selaimessa. Kolmannen osapuolen analytiikkapyyntö estettiin testikäynneillä. Axe injektoitiin vain testiselaimeen; sivuston CSP:tä ei muutettu.

Interaktiiviset lisätestit kattoivat ohituslinkin, työpöytävalikon, mobiilivalikon, GA4-annotaatioiden virhe- ja ehdotustilan, mittarin laatutarkistuksen tulostilan sekä GTM-työkalun virheellisen mittaustunnuksen. Testit tehtiin julkisella sivustolla molemmissa teemoissa. Olemassa olevat header-reflow-testit ajettiin tuotantobuildille.

## Ensisijaiset korjaukset (P1)

### 1. Fokuskehys erottuu liian heikosti

**Sijainti:** [tokens.css](/Users/niko/Documents/claude/nk-2026-astrojs/src/styles/tokens.css:76), [Header.astro](/Users/niko/Documents/claude/nk-2026-astrojs/src/components/Header.astro:595). Sama tavallinen fokusmuuttuja on käytössä muun muassa artikkelikorteissa, lisälukemisessa, kielivalikoissa ja footerissa.

Julkisen etusivun valikkopainikkeen näppäimistöfokuksen 3 px kehys käyttää korostusväriä 40 %:n peittävyydellä. Kehyksen ja sivun taustan laskettu kontrasti oli vaaleassa teemassa **1,89:1**, tummassa **2,11:1**. `:focus-visible` oli aktiivinen. Kehys voi jäädä huomaamatta etenkin heikolla näöllä; fokuksen toimiva siirtyminen ei ratkaise näkyvyyttä.

**Korjaus:** anna fokuskehykseen riittävän peittävä väri ja varmista vähintään 3:1 kontrasti sitä ympäröivään taustaan. Tarkista myös 55 %:n vahvempi fokusmuuttuja ja eri komponenttien taustat. Mitatut luvut koskevat valikkopainiketta, eivät kaikkia muuttujan käyttökohteita. [WCAG 1.4.11: Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

### 2. Cookiebot-oppaiden koodikommentit ovat liian haaleita

**Sivut:** `/templates/cookiebot-guide/` ja `/fi/toteutusmallit/cookiebot-opas/`.

**Sijainti:** [englanninkielinen opas](/Users/niko/Documents/claude/nk-2026-astrojs/src/pages/templates/cookiebot-guide.md:1734), [suomenkielinen opas](/Users/niko/Documents/claude/nk-2026-astrojs/src/pages/fi/toteutusmallit/cookiebot-opas.md:1712); Shikin koodiesimerkkien väritys.

Kummankin oppaan JavaScript-esimerkistä tunnistettiin 14 heikon kontrastin tekstisolmua. Kommenttiväri `#6a737d` taustalla `#24292e` antaa **3,04:1** kontrastin. Teksti on 13,6 px normaalipainoista, joten tavoite on vähintään 4,5:1. Sama tulos sekä julkisella sivulla että tuotantobuildissä, molemmissa teemoissa.

**Korjaus:** vaihda syntaksivärityksen kommenttiväri tai teema niin, että myös selittävät kommentit täyttävät tekstikontrastin. Tarkista muut kooditokenit samalla korjauksen jälkeen. [WCAG 1.4.3: Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

### 3. Data layer -työkalun otsikko leikkautuu kapealla näytöllä

**Sivu:** `/fi/tyokalut/datalayer-dokumentaatiogeneraattori/`.

**Sijainti:** [ToolHero.astro](/Users/niko/Documents/claude/nk-2026-astrojs/src/components/ToolHero.astro:5), [global.css](/Users/niko/Documents/claude/nk-2026-astrojs/src/styles/global.css:35).

320 CSS-pikselin levyisessä näkymässä pitkä sana `dokumentaatiogeneraattori` ei mahdu otsikon sarakkeeseen. Otsikon oikea reuna ulottuu noin 340 pikseliin; sivun vaakasuuntainen leikkaus piilottaa osan sanasta. Selainkuva vahvistaa havainnon.

**Korjaus:** salli hero-sarakkeen kutistuminen (`min-inline-size: 0`) ja pitkän otsikkosanan rivittyminen (`overflow-wrap: anywhere` tai vastaava rajattu sääntö). Älä ratkaise tätä pienentämällä kaikkia otsikoita. Tarkista 320 px reflow ja suurennus korjauksen jälkeen. [WCAG 1.4.10: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

![Otsikon oikea reuna leikkautuu 320 px näkymässä](/Users/niko/Documents/claude/nk-2026-astrojs/docs/reports/accessibility-mobile-clipping.jpg)

## Muut korjattavat havainnot (P2)

### 4. Tietosuojasivujen pääotsikko on piilotettu

Sivuilla `/privacy/` ja `/fi/privacy/` on HTML:ssä h1, mutta [global.css](/Users/niko/Documents/claude/nk-2026-astrojs/src/styles/global.css:749) piilottaa `.prose > h1:first-child` -otsikon `display: none` -säännöllä. Sivuilla ei ole korvaavaa näkyvää pääotsikkoa. Selaimessa sisältö alkaa päivityspäivästä; myös saavutettavuuspuu menettää h1:n.

**Korjaus:** rajaa otsikon piilotus vain niihin artikkelipohjiin, joissa sama pääotsikko on jo hero-osassa, tai anna tietosuojasivuille näkyvä hero-otsikko. H1:n puuttuminen yksinään ei todista WCAG-rikkomusta, mutta tässä se heikentää sivun tunnistamista ja otsikkonavigointia.

### 5. Työkaluihin syntyy sisäkkäisiä main-alueita

[Base.astro](/Users/niko/Documents/claude/nk-2026-astrojs/src/layouts/Base.astro:256) sisältää pääsisällön `main`-elementin. Sen sisällä GTM-työkalu renderöi uuden [main-elementin](/Users/niko/Documents/claude/nk-2026-astrojs/src/components/gtm-builder/GtmContainerBuilder.tsx:227) ja data layer -työkalu oman [main-elementtinsä](/Users/niko/Documents/claude/nk-2026-astrojs/src/components/datalayer-documenter/DataLayerDocumenter.tsx:223).

Havainto koskee GTM-työkalun kumpaakin kieliversiota ja suomenkielistä data layer -työkalua. Ruudunlukijan pääsisältöalueiden luettelo muuttuu epäselväksi.

**Korjaus:** käytä sisäosassa nimettyä section-elementtiä tai div-elementtiä ja säilytä Base-pohjan yksi main. Sama rakenne esiintyy lähdekoodissa myös GA4-raporttirakentajassa; sitä ei laskettu julkaistujen sivujen löydöksiin, koska se ei kuulu tämän tarkistuksen julkaistuihin reitteihin. Axe luokittelee tämän rakennekohtaiseksi best practice -havainnoksi.

### 6. Otsikkotasoissa on hyppyjä

Axe havaitsi otsikkotason hyppyjä 11:llä julkaistulla sivulla sekä virhesivulla. Tyypillisesti h1:n jälkeen tulee footerin h3 ilman sitä edeltävää h2-tason kokonaisuutta. Mukana on myös neljä tekoälyartikkelia sekä data layer -työkalun dokumenttiosia. Täsmälliset sivut löytyvät alla olevasta taulukosta ja JSON-tiedostoista.

**Korjaus:** tarkista otsikot sisällön hierarkian perusteella. Footerin sarakkeet voivat olla h2-tasoa silloin, kun niitä ei ryhmitellä yhteisen h2-otsikon alle. Artikkelissa käytä h2:ta pääosille ja h3:a niiden alaosille. Älä muuta pelkkää ulkoasua tai väitä jokaisen numerohypyn automaattisesti rikkovan WCAG:ia.

### 7. GTM-kentän näkyvä virhe ei ole kentän saavutettava kuvaus

[Sijainti: GtmContainerBuilder.tsx](/Users/niko/Documents/claude/nk-2026-astrojs/src/components/gtm-builder/GtmContainerBuilder.tsx:87). Virheellisellä mittaustunnuksella `wrong` näkyy virhe “Käytä muotoa G-ABC123.”. Kentän `aria-describedby` viittaa silti vain piilotettuun ohjetekstiin, ja näkyvällä virheellä ei ole id:tä. Natiivi `required`/`pattern`-validointi toimii; `aria-invalid`-attribuutin puuttumista yksinään ei lasketa virheeksi.

**Korjaus:** anna virhetekstille id ja liitä se kentän kuvaukseen virhetilassa. Säilytä natiivi validointi ja varmista ilmoitus oikealla ruudunlukijalla. Sama komponentti palvelee molempia kieliä.

### 8. Annotaatioiden ylipitkässä kuvauksessa ehdotuslista ei ole näppäimistöllä vieritettävä

[Sijainti: Ga4AnnotationBuilder.astro](/Users/niko/Documents/claude/nk-2026-astrojs/src/components/Ga4AnnotationBuilder.astro:454). Kun kuvaus sisältää 170 merkkiä ja ehdotukset avataan, kaikki ehdotuspainikkeet voivat olla disabled-tilassa. Listalla on `overflow-y: auto`, mutta listaa tai sen sisältöä ei silloin voi fokusoida. Axe raportoi `scrollable-region-focusable`-havainnon molemmissa teemoissa. Ehdotukset ovat tässä tilassa poissa käytöstä, joten vakavuus on tavallista toiminnallista näppäimistöestettä pienempi.

**Korjaus:** mahdollista listan fokusointi vieritystä varten tai korvaa kokonaan käyttökelvoton ehdotuslista selkeällä ilmoituksella merkkirajan ylityksestä. Testaa myös normaali tila, jossa ehdotuspainikkeet ovat käytettävissä. Englanninkielinen työkalu käyttää samaa komponenttia; dynaaminen tila testattiin suomeksi.

## Toimivat asiat ja tarkistetut väärät hälytykset

- Ohituslinkki fokusoi pääsisällön. Työpöytävalikon nuolinäppäinavaus, ensimmäisen linkin fokus ja Escape-palautus toimivat molemmissa teemoissa.
- Mobiilivalikon Enter-avaus, Tab/Shift+Tab-kierto, Escape-sulkeminen ja fokuspalautus toimivat. Näyttöleveyden vaihtaminen vapauttaa fokuksen ja sivun vierityksen olemassa olevissa testeissä.
- Rakennetun HTML:n 37 sivulta ei löytynyt puuttuvia img-alt-attribuutteja tai päällekkäisiä id-arvoja. Tämä ei yksin osoita vaihtoehtoisten tekstien sisällöllistä laatua.
- GA4-annotaatiokentät merkitsevät virhetilan `aria-invalid="true"`-attribuutilla ja niillä on kuvaustekstiviittaukset. Mittarin laatutarkistuksen tulostila ei tuottanut uutta vahvistettua axe-löydöstä.
- Kaksi samannimistä kielinavigaatiota eivät ole tässä virhe: header ja footer tarjoavat samat linkit. [W3C:n landmark-ohje sallii saman nimen identtisille navigaatioille](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html). Tätä kaikkien sivujen `landmark-unique`-hälytystä ei laskettu korjauslistaan. Data layer -taulukoiden oma vaakavieritys on vastaavasti sallittu kaksiulotteisen sisällön poikkeus; se erotettiin oikeasti leikkautuvasta hero-otsikosta.

Impeccable-detektorikin ajettiin. Sen fontti- ja ulkoasumieltymyksiin liittyviä havaintoja ei tulkittu saavutettavuusvioiksi eikä sivuston typografiaa muutettu. Tässä tarkistuksessa ei lisätty uusia ignore-sääntöjä.

## Tarkistusten tulokset ja rajat

Tuotantobuild ja sisältövalidointi läpäisivät. Olemassa olevat header-reflow-testit: **3/3 läpäisi**. Julkisen sivuston interaktiivinen näppäimistötesti: **1/1 läpäisi** molemmat teemat; sen sisällä tehty axe-tarkistus löysi yllä kuvatun ehdotuslistan puutteen. Automaattisen skannauksen onnistuminen tarkoittaa, että sivut saatiin tarkistettua, ei sitä, että ne läpäisivät WCAG:n.

Header-reflow-testit kattavat leveydet 320, 390, 768, 896 ja 1440 sekä juurifontin 100 % / 200 %. Tämä on rajattu tekstin suurennustesti, **ei täysi selaimen zoomaus- tai tekstivälitestauksen korvike**. Mobiilinäkymät ovat selainemulaatioita, eivät fyysisellä puhelimella tehtyjä tarkistuksia.

Axe jätti osan kontrastitapauksista manuaaliseen arviointiin esimerkiksi pseudo-elementtitaustojen vuoksi; nämä ovat JSON-tiedostojen `incomplete`-kohdissa. Kaikkien grafiikoiden, kooditokenien, dynaamisten taulukoiden, viennin sisältöjen ja työkalujen kaikkien tilayhdistelmien saavutettavuutta ei voitu todentaa tällä otannalla. Todellista VoiceOver/NVDA-käyttöä, täyttä 400 %:n selaimen zoomausta, tekstivälien mukautusta tai koko lomakepolkujen ruudunlukijakäyttöä ei testattu. Sivustolle ei anneta WCAG AA -vaatimustenmukaisuusväitettä.

## Sivukohtainen luettelo

Taulukko kuvaa julkisen sivuston vaalean teeman automaattiset, väärien hälytysten karsinnan jälkeiset havainnot. Tumman teeman samat ongelmat tarkistettiin erikseen. Fokuskontrasti, mobiilileikkaus ja dynaamiset tilat eivät välttämättä näy perusnäkymän axe-tuloksissa. “Ei vahvistettua automaattista löydöstä” ei tarkoita koko sivun todettua virheettömyyttä.

| Sivu | Perusnäkymän löydökset |
| --- | --- |
| [/](https://karppinen.one/) | Ei vahvistettua automaattista löydöstä |
| [/tools/](https://karppinen.one/tools/) | heading-order |
| [/tools/metric-quality-checker/](https://karppinen.one/tools/metric-quality-checker/) | heading-order |
| [/tools/gtm-container-builder/](https://karppinen.one/tools/gtm-container-builder/) | landmark-main-is-top-level, landmark-no-duplicate-main |
| [/tools/ga4-annotations/](https://karppinen.one/tools/ga4-annotations/) | Ei vahvistettua automaattista löydöstä |
| [/tools/form-name-builder/](https://karppinen.one/tools/form-name-builder/) | Ei vahvistettua automaattista löydöstä |
| [/templates/](https://karppinen.one/templates/) | heading-order |
| [/templates/hubspot-form-tracking-gtm/](https://karppinen.one/templates/hubspot-form-tracking-gtm/) | Ei vahvistettua automaattista löydöstä |
| [/templates/cookiebot-guide/](https://karppinen.one/templates/cookiebot-guide/) | color-contrast |
| [/privacy/](https://karppinen.one/privacy/) | page-has-heading-one |
| [/fi/](https://karppinen.one/fi/) | Ei vahvistettua automaattista löydöstä |
| [/fi/tyokalut/](https://karppinen.one/fi/tyokalut/) | heading-order |
| [/fi/tyokalut/mittarin-laatutarkistus/](https://karppinen.one/fi/tyokalut/mittarin-laatutarkistus/) | heading-order |
| [/fi/tyokalut/lomakkeiden-nimeamistyokalu/](https://karppinen.one/fi/tyokalut/lomakkeiden-nimeamistyokalu/) | Ei vahvistettua automaattista löydöstä |
| [/fi/tyokalut/gtm-sailion-rakentaja/](https://karppinen.one/fi/tyokalut/gtm-sailion-rakentaja/) | landmark-main-is-top-level, landmark-no-duplicate-main |
| [/fi/tyokalut/ga4-annotaatiot/](https://karppinen.one/fi/tyokalut/ga4-annotaatiot/) | Ei vahvistettua automaattista löydöstä |
| [/fi/tyokalut/datalayer-dokumentaatiogeneraattori/](https://karppinen.one/fi/tyokalut/datalayer-dokumentaatiogeneraattori/) | heading-order, landmark-main-is-top-level, landmark-no-duplicate-main |
| [/fi/toteutusmallit/](https://karppinen.one/fi/toteutusmallit/) | heading-order |
| [/fi/toteutusmallit/hubspot-lomakkeiden-seuranta-gtm/](https://karppinen.one/fi/toteutusmallit/hubspot-lomakkeiden-seuranta-gtm/) | Ei vahvistettua automaattista löydöstä |
| [/fi/toteutusmallit/cookiebot-opas/](https://karppinen.one/fi/toteutusmallit/cookiebot-opas/) | color-contrast |
| [/fi/privacy/](https://karppinen.one/fi/privacy/) | page-has-heading-one |
| [/fi/minusta/](https://karppinen.one/fi/minusta/) | Ei vahvistettua automaattista löydöstä |
| [/fi/blog/](https://karppinen.one/fi/blog/) | Ei vahvistettua automaattista löydöstä |
| [/fi/blog/tekstin-tasaus-saavutettavuus/](https://karppinen.one/fi/blog/tekstin-tasaus-saavutettavuus/) | Ei vahvistettua automaattista löydöstä |
| [/fi/blog/sivujen-luokittelu-analytiikassa/](https://karppinen.one/fi/blog/sivujen-luokittelu-analytiikassa/) | Ei vahvistettua automaattista löydöstä |
| [/fi/blog/sisallon-kulutuksen-mittaaminen/](https://karppinen.one/fi/blog/sisallon-kulutuksen-mittaaminen/) | Ei vahvistettua automaattista löydöstä |
| [/fi/blog/promptien-optimointijarjestelma-chatgpt/](https://karppinen.one/fi/blog/promptien-optimointijarjestelma-chatgpt/) | heading-order |
| [/fi/blog/mika-on-algoritmi/](https://karppinen.one/fi/blog/mika-on-algoritmi/) | Ei vahvistettua automaattista löydöstä |
| [/fi/blog/mckinsey-tyylinen-esitys-chatgpt-gemini/](https://karppinen.one/fi/blog/mckinsey-tyylinen-esitys-chatgpt-gemini/) | heading-order |
| [/fi/blog/asiantuntijapaneeli-yhdella-promptilla/](https://karppinen.one/fi/blog/asiantuntijapaneeli-yhdella-promptilla/) | Ei vahvistettua automaattista löydöstä |
| [/blog/](https://karppinen.one/blog/) | Ei vahvistettua automaattista löydöstä |
| [/blog/text-alignment-accessibility/](https://karppinen.one/blog/text-alignment-accessibility/) | Ei vahvistettua automaattista löydöstä |
| [/blog/prompt-optimization-chatgpt/](https://karppinen.one/blog/prompt-optimization-chatgpt/) | heading-order |
| [/blog/mckinsey-style-presentation-chatgpt-gemini/](https://karppinen.one/blog/mckinsey-style-presentation-chatgpt-gemini/) | heading-order |
| [/blog/content-consumption-metrics/](https://karppinen.one/blog/content-consumption-metrics/) | Ei vahvistettua automaattista löydöstä |
| [/blog/ai-panel-with-experts/](https://karppinen.one/blog/ai-panel-with-experts/) | Ei vahvistettua automaattista löydöstä |
| [/about/](https://karppinen.one/about/) | Ei vahvistettua automaattista löydöstä |
| [/entitymap.html](https://karppinen.one/entitymap.html) | Ei vahvistettua automaattista löydöstä |
| [/404/](https://karppinen.one/404/) | heading-order |

## Tallennettu aineisto

- [Julkinen sivusto, vaalea teema](/Users/niko/Documents/claude/nk-2026-astrojs/docs/reports/accessibility-live-light-2026-10-04.json) ja [tumma teema](/Users/niko/Documents/claude/nk-2026-astrojs/docs/reports/accessibility-live-dark-2026-10-04.json).
- [Tuotantobuild, vaalea teema](/Users/niko/Documents/claude/nk-2026-astrojs/docs/reports/accessibility-light-2026-10-04.json) ja [tumma teema](/Users/niko/Documents/claude/nk-2026-astrojs/docs/reports/accessibility-dark-2026-10-04.json).
- [Interaktiiviset tilat ja fokusmittaukset](/Users/niko/Documents/claude/nk-2026-astrojs/docs/reports/accessibility-states-2026-10-04.json).
- [HTML-inventaario](/Users/niko/Documents/claude/nk-2026-astrojs/docs/reports/accessibility-pages-2026-10-04.json) sekä [lisäsivut, vaalea](/Users/niko/Documents/claude/nk-2026-astrojs/docs/reports/accessibility-extra-live-light-2026-10-04.json) ja [tumma](/Users/niko/Documents/claude/nk-2026-astrojs/docs/reports/accessibility-extra-live-dark-2026-10-04.json).

**Seuraava työ:** toteuta P1-korjaukset rajatuilla tyylimuutoksilla ja aja samat kontrasti-, fokus- ja 320 px reflow-tarkistukset uudelleen. Sen jälkeen korjaa otsikko- ja main-rakenne sekä lomakkeiden virhekuvaukset.
