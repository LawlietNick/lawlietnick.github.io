# Suomenkielisten tekstien tarkistus 28.9.2026

Tarkistin paikallisen lähdekoodin suomenkieliset palvelutekstit (10), blogiartikkelit (6), Cookiebot-oppaan leipätekstin, keskeiset sivutekstit sekä yhteisten komponenttien ja työkalujen suomenkielisiä merkkijonoja. Työkalujen kaikki dynaamisesti muodostuvat tekstit eivät kuulu kattavasti tarkistukseen. Tarkistus koskee kieltä, ei teknisten, oikeudellisten tai tutkimusta koskevien väitteiden paikkansapitävyyttä. Raportin kieli- ja tyylikorjaukset on toteutettu sivuston tiedostoihin 28.9.2026. Alla säilyvät alkuperäiset havainnot ja korjausehdotukset.

Alla olevat rivinumerot viittaavat tarkistushetken tiedostoihin. Polut ovat suhteessa projektin juureen. Korjattu muoto on annettu kunkin havainnon yhteydessä.

## Pilkutus

| Kohta | Nykyinen ilmaus | Korjausehdotus | Peruste |
|---|---|---|---|
| `src/components/AboutIntro.astro:15` | Sellaista, josta näkee mitä tapahtuu ja jonka pohjalta voi päättää, mitä tehdään seuraavaksi. | Sellaista, josta näkee, mitä tapahtuu, ja jonka pohjalta voi päättää, mitä tehdään seuraavaksi. | Sisäkkäinen kysyvä sivulause erotetaan molemmin puolin pilkuilla. |
| `src/pages/fi/palvelut.astro:81` | Kuvaile mitä näet, niin ehdotan järkevää aloituskohtaa. | Kuvaile, mitä näet, niin ehdotan järkevää aloituskohtaa. | Kysyvä sivulause erotetaan päälauseesta. |
| `src/pages/fi/palvelut/raataloity-dashboard.md:38` | Hyvä dashboard auttaa huomaamaan muutoksen, ymmärtämään missä se tapahtui ja päättämään, mitä tehdään seuraavaksi. | Hyvä dashboard auttaa huomaamaan muutoksen, ymmärtämään, missä se tapahtui, ja päättämään, mitä tehdään seuraavaksi. | Missä-sivulause tarvitsee alku- ja loppupilkun. |
| `src/pages/fi/blog/mckinsey-tyylinen-esitys-chatgpt-gemini.md:54` | Tämä tarinarakenne varmistaa, että yleisö ymmärtää miksi aiheella on merkitystä ennen suositusten esittämistä. | Tämä tarinarakenne varmistaa, että yleisö ymmärtää, miksi aiheella on merkitystä, ennen suositusten esittämistä. | Pilkut erottavat sisäkkäisen sivulauseen. Selkeämpi vaihtoehto: ”Tämä rakenne auttaa yleisöä ymmärtämään aiheen merkityksen ennen suositusten esittämistä.” |
| `src/pages/fi/blog/asiantuntijapaneeli-yhdella-promptilla.md:22` | Kysyt monimutkaisen kysymyksen, ja saat kohteliaan keskitien vastauksen. | Kysyt monimutkaisen kysymyksen ja saat kohteliaan keskitien vastauksen. | Molemmilla lauseilla on sama tekijä, sinä. |
| `src/pages/fi/palvelut/server-side-seuranta.md:38` | ja rakennan sen silloin kun on | ja rakennan sen silloin, kun siitä on hyötyä | Silloin-sanaan viittaava kun-lause erotetaan pilkulla. Samalla vältetään epämääräinen ”kun on”. |
| `src/data/work.js:131` | ja dokumentoin mikä laukeaa milloinkin | ja dokumentoin, mikä laukeaa milloinkin | Kysyvä sivulause erotetaan päälauseesta. |

## Yhdyssanat ja kirjoitusasut

| Kohta | Nykyinen ilmaus | Korjausehdotus | Peruste |
|---|---|---|---|
| `src/components/MetricQualityChecker.astro:74` | päätöksen tekoon | päätöksentekoon | Päätöksenteko on tässä vakiintunut käsite. |
| `src/pages/fi/palvelut/consent-mode-toteutus.md:62` | Tag Manager- ja Consent Mode -muutokset | Tag Manager -muutokset ja Consent Mode -muutokset | Monisanaisen alkuosan ja yhdysmerkin väliin tulee välilyönti. Molempien loppuosien kirjoittaminen näkyviin tekee rinnastuksesta selkeän. |
| `src/pages/fi/blog/asiantuntijapaneeli-yhdella-promptilla.md:24` ja saman artikkelin esimerkit | “Asiantuntijapaneeli” | ”Asiantuntijapaneeli” | Suomen lainausmerkit ovat samanmuotoiset molemmissa päissä. Vaihda artikkelin kaarevat alkulainausmerkit myös promptin luonnollisessa kielessä. |
| `src/pages/fi/tyokalut/datalayer-dokumentaatiogeneraattori.astro:39`; `src/components/datalayer-documenter/engine.ts:123` | GTM Preview'ssa | GTM:n esikatselutilassa | Suomenkielinen ilmaus välttää vieraan nimen ongelmallisen taivutuksen ja on lukijalle selkeä. |
| `src/pages/fi/index.astro:36` ja `src/components/MetricQualityChecker.astro:21` sekä `src/data/work.js` | — | – | Suomen tekstin ajatusviivana käytetään tavallisesti lyhyempää ajatusviivaa välilyönteineen. Muuta vain näkyvää suomenkielistä tekstiä, älä koodin operaattoreita. |

## Lauserakenne ja luetelmat

| Kohta | Nykyinen ilmaus | Korjausehdotus | Peruste |
|---|---|---|---|
| `src/pages/fi/blog/mckinsey-tyylinen-esitys-chatgpt-gemini.md:133` | Jokaisen tason 2 kohdan tulee olla toisistaan erillinen, mutta yhdessä kattava eli MECE-periaatteen mukainen. | Tason 2 kohtien tulee olla toisistaan erillisiä ja yhdessä kattavia eli MECE-periaatteen mukaisia. | Yksiköllinen ”jokaisen kohdan” ei sovi yhteen ilmausten ”toisistaan” ja ”yhdessä” kanssa. |
| `src/pages/fi/blog/mckinsey-tyylinen-esitys-chatgpt-gemini.md:183` | esitysrungon, jonka voit: / Siirtää / Täydentää / Esittää | esitysrungon, jonka voit / siirtää / täydentää / esittää | Luetelma täydentää kesken jäävää johdantolausetta: ei kaksoispistettä, luetelmakohtiin pienet alkukirjaimet. |
| `src/pages/fi/palvelut/google-analytics-auditointi.md:10` | Löydä GA4:n puuttuva, kahteen kertaan kerätty tai harhaanjohtava data ja saat selkeän korjaussuunnitelman. | Saat selville GA4-datan puutteet, päällekkäisyydet ja virheet sekä selkeän suunnitelman niiden korjaamiseen. | Käskymuodon ja lupauksen rinnastus on kömpelö. Uusi muoto kertoo, mitä asiakas saa. |
| `src/pages/fi/palvelut/tag-manager-auditointi.md:10` | Löydä Google Tag Managerin rikkinäinen, päällekkäinen ja vanhentunut seuranta ja saat turvallisen siivoussuunnitelman. | Saat selville Google Tag Managerin seurannan virheet, päällekkäisyydet ja vanhentuneet osat sekä turvallisen siivoussuunnitelman. | Sama käskymuodon ja lupauksen rinnastus. |
| `src/pages/fi/palvelut/tekninen-seo-auditointi.md:10` | Löydä tekniset ongelmat, jotka pitävät tärkeät sivut poissa hakutuloksista, ja saat selkeän suunnitelman niiden korjaamiseen. | Saat selville tekniset ongelmat, jotka pitävät tärkeät sivut poissa hakutuloksista, sekä selkeän suunnitelman niiden korjaamiseen. | Sama rinnastus. Nämä kolme ovat selkeytyksiä; käskyn ja seurauksen yhdistäminen ei itsessään ole kaikissa yhteyksissä kielioppivirhe. |

## Tyyliehdotukset

Nämä ovat toimituksellisia ehdotuksia, eivät yksiselitteisiä kielioppivirheitä. No-ai-slop-tarkistus koskee tekstin piirteitä eikä osoita, kuka tekstin on kirjoittanut.

| Kohta | Havainto | Ehdotus |
|---|---|---|
| `src/pages/fi/minusta.astro:99` | ”Minulla on heikko kohta vahvoille konsepteille” on englannin *soft spot* -ilmauksen suora käännös. | ”Pidän erityisesti vahvoista konsepteista ja maailmoista, jotka ottavat oman sisäisen logiikkansa tosissaan.” |
| `src/pages/fi/palvelut/server-side-seuranta.md:44` | ”pitää pitää pois selaimesta” toistaa samaa verbiä. | ”salaisia avaimia tai muita suojattavia tietoja ei saa tallentaa selaimeen” |
| `src/pages/fi/palvelut/raataloity-dashboard.md:75` | ”Luovutus kertoo määritelmät, lähteet, rajoitukset ja ylläpidon” on epämääräinen. | ”Dokumentoin lukujen määritelmät, lähteet, rajoitukset ja ylläpitovastuut.” |
| `src/pages/fi/blog/promptien-optimointijarjestelma-chatgpt.md:34` | ”Täysin optimoitu prompti” on perustelematon ehdoton ilmaus. | ”Parannettu prompti, jonka voit ottaa heti käyttöön.” |
| `src/pages/fi/blog/promptien-optimointijarjestelma-chatgpt.md:10` ja `:28` | ”prompt engineer” sekä prompti/promptti-vaihtelu rikkovat sanaston yhtenäisyyttä. | ”promptien suunnittelija”; käytä muuten artikkelissa johdonmukaisesti yhtä valittua kirjoitusasua. |
| `src/pages/fi/palvelut/google-analytics-auditointi.md:67` | ”Tavoite ei ole… Tavoite on…” käyttää tarpeetonta vastakkainasettelua. | ”Tavoitteena on ymmärtää nykyistä dataa ja tehdä siitä riittävän luotettavaa päätöksenteon tueksi.” |
| `src/pages/fi/palvelut/tag-manager-auditointi.md:67` | Sama toistuva vastakkainasettelu. | ”Tavoitteena on seuranta, jota tiimi ymmärtää ja pystyy testaamaan ja muuttamaan pienemmällä riskillä.” |
| `src/pages/fi/blog/tekstin-tasaus-saavutettavuus.md`, loppu ennen lähteitä | ”Keskitys voi sanoa: ’Katso tätä.’ Vasemmalle tasaus sanoo: ’Lue tämä.’” muuttaa jo perustellun suosituksen loppuiskulauseeksi. | Poista tämä vastakkainasettelu ja sitä seuraava jälkimmäiseen viittaava virke. Konkreettinen suositus on jo edellä. |
| `src/pages/fi/tyokalut/datalayer-dokumentaatiogeneraattori.astro:22` | ”Ei lomakkeesta dokumenttiin -arpaa” on vaikeasti avautuva kielikuva. | ”Muokkaat koko ajan juuri sitä sisältöä, jonka viet kehittäjälle.” |
| `src/pages/fi/blog/sivujen-luokittelu-analytiikassa.md:152` | ”HTML-meta-elementeissä, eli … tietoina” sekoittaa sijamuotoja selittävässä rinnastuksessa. | ”Luokittelu voidaan julkaista esimerkiksi sivun omissa HTML-meta-elementeissä. Ne sisältävät sivun koodissa olevia koneellisesti luettavia tietoja.” |

## Yhtenäistäminen ilman ylikorjaamista

Kaksoispisteen jälkeiset otsikon selitykset kannattaa kirjoittaa pienellä: esimerkiksi ”SCQR-malli: esityksen tarina”, ”Pyramidiperiaate: esityksen rakenne” ja ”Donatello-prompti: kopioi ja liitä”. Käyttöliittymän itsenäisiä otsikoita tai kielivalinnan nimikkeitä ei tarvitse tämän perusteella muuttaa pienellä alkaviksi.

Sivuston omaa huumoria, esimerkiksi algoritmiartikkelin toimistojääkaappia tai Minusta-sivun tanssikuvausta, ei tarvitse poistaa. Teknisiä termejä, kuten dataLayer, GA4 ja Consent Mode, ei pidä kääntää tai muuttaa koneellisesti käytettävissä tunnisteissa. Koodin lainausmerkkejä ei vaihdeta typografisiksi.

Ohjepohja: suomi-finnish-skillin yhdyssana-, pilkutus-, luetelma- ja lauserakenneohjeet sekä no-ai-slop-skillin vähäisten muutosten periaate.
