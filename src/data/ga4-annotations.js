// Titles and suggestion copy share the same category codes in both languages.
const phrase = (fi, en) => ({ fi, en });
// Title prefix per template: plain English words beat cryptic abbreviations. Custom notes use the category code.
const templateCodes = {
  newsletter: "NEWSLETTER", pr: "PR", social: "SOCIAL", launch: "LAUNCH", webinar: "WEBINAR", podcast: "MEDIA", partnership: "PARTNER", "email-flow": "MA",
  outage: "OUTAGE", checkout: "FORM", "tracking-gap": "NO DATA", performance: "SLOW", abuse: "ABUSE", "login-issue": "LOGIN", "api-issue": "API", "payment-issue": "PAYMENT", "release-rollback": "ROLLBACK",
  page: "PAGE", redesign: "REDESIGN", test: "ABTEST", seo: "SEO", pricing: "PRICING", onboarding: "ONBOARD", feature: "FEATURE", migration: "MIGRATE",
  campaign: "CAMPAIGN", offline: "OFFLINE", "ad-destination": "LANDING",
  event: "DATA", fix: "DATA", consent: "CMP", "key-event": "KEYEVENT", "cross-domain": "XDOMAIN", "internal-traffic": "FILTER", referral: "REFERRAL", timezone: "TIMEZONE",
  season: "SEASON", competitor: "RIVAL", industry: "INDUSTRY", external: "EXT", "search-update": "ALGO", holiday: "HOLIDAY", weather: "WEATHER", "channel-change": "CHANNEL",
};
const template = (id, label, fi, en) => ({ id, code: templateCodes[id], label, title: phrase(fi, en) });

export const annotationCategories = [
  {
    code: "MPR", label: "Markkinointi ja PR", color: "#7627bb", colorName: "Violetti",
    hint: "Uutiskirjeet, viestintä ja orgaaninen näkyvyys.",
    templates: [
      template("newsletter", "Uutiskirje", "[aihe]", "[topic]"),
      template("pr", "PR ja tiedotteet", "[aihe]", "[topic]"),
      template("social", "Sosiaalinen media", "[kanava]: [aihe]", "[channel]: [topic]"),
      template("launch", "Lanseeraus", "[tuote tai palvelu]", "[product or service]"),
      template("webinar", "Webinaari", "[aihe]", "[topic]"),
      template("podcast", "Podcast- tai mediaesiintyminen", "[julkaisu]: [aihe]", "[publication]: [topic]"),
      template("partnership", "Yhteistyöjulkaisu", "[kumppani]", "[partner]"),
      template("email-flow", "Markkinoinnin automaation muutos", "[automaatio]: [muutos]", "[automation]: [change]"),
    ],
    suggestions: [
      phrase("Uutiskirje lähetettiin [kohderyhmälle].", "Newsletter sent to [audience]."),
      phrase("Aiheena [aihe].", "Topic: [topic]."),
      phrase("Julkaisu jaettiin [kanavassa].", "Post shared on [channel]."),
      phrase("Tiedote julkaistiin [mediassa].", "Press release published in [outlet]."),
      phrase("Liikenne ohjattiin sivulle [sivu].", "Traffic directed to [page]."),
      phrase("Tavoitteena lisätä tunnettuutta.", "The goal is to increase awareness."),
      phrase("Webinaarin aiheena [aihe].", "Webinar topic: [topic]."),
      phrase("Ilmoittautuminen ohjattiin sivulle [sivu].", "Registration directed to [page]."),
      phrase("Esiintyminen julkaisussa [julkaisu].", "Appearance in [publication]."),
      phrase("Jaksossa käsiteltiin [aihetta].", "The episode covered [topic]."),
      phrase("Yhteistyökumppani julkaisi [sisällön].", "A partner published [content]."),
      phrase("Julkaisun kohderyhmä: [kohderyhmä].", "Publication audience: [audience]."),
      phrase("Automaatiota muutettiin vaiheessa [vaihe].", "Automation changed at [stage]."),
      phrase("Viestin lähetysehto: [ehto].", "Email sending condition: [condition]."),
      phrase("[Tuote] tuli saataville markkinassa [markkina].", "[Product] became available in the [market] market."),
      phrase("Lanseerausta tuettiin kanavissa [kanavat].", "The launch was supported on [channels]."),
      phrase("Tiedote jaettiin palvelussa [jakelupalvelu].", "The press release was distributed via [service]."),
    ],
  },
  {
    code: "TECH", label: "Tekninen häiriö tai katkos", color: "#ba1212", colorName: "Punainen",
    hint: "Käyttö- ja mittauskatkot, tekniset häiriöt ja väärinkäyttöyritykset.",
    templates: [
      template("outage", "Sivuston käyttökatko", "[sivu, palvelu tai koko sivusto]", "[page, service or entire site]"),
      template("checkout", "Lomake- tai kassavirhe", "[lomake tai kassa]", "[form or checkout]"),
      template("tracking-gap", "Mittauskatko", "[seuranta]", "[tracking]"),
      template("performance", "Sivuston hidastuminen", "[sivu tai koko sivusto]", "[page or entire site]"),
      template("abuse", "Väärinkäyttöyritys", "[kohde]", "[target]"),
      template("login-issue", "Kirjautumishäiriö", "[palvelu]", "[service]"),
      template("api-issue", "API- tai integraatiohäiriö", "[palvelu]", "[service]"),
      template("payment-issue", "Maksamisen häiriö", "[maksutapa]", "[payment method]"),
      template("release-rollback", "Julkaisun palautus", "[versio]", "[version]"),
    ],
    suggestions: [
      phrase("Sivusto oli poissa käytöstä klo [alku]–[loppu].", "Website unavailable from [start] to [end]."),
      phrase("Häiriö koski [toimintoa].", "The issue affected [feature]."),
      phrase("Syynä [häiriön syy].", "Caused by [reason]."),
      phrase("Mittaus puuttui osalta ajanjaksoa.", "Tracking was missing for part of the period."),
      phrase("Ongelma korjattiin klo [aika].", "The issue was resolved at [time]."),
      phrase("Vaikutuksen laajuutta selvitetään.", "The extent of the impact is being investigated."),
      phrase("Havaittiin poikkeuksellista toimintaa: [havainto].", "Unusual activity detected: [observation]."),
      phrase("Epäillään automatisoituja rekisteröitymisiä.", "Automated registrations are suspected."),
      phrase("Epäillään ilmaiskokeilujen väärinkäyttöä.", "Free trial abuse is suspected."),
      phrase("API:n käyttörajoja yritettiin kiertää.", "Attempts were made to bypass API limits."),
      phrase("Torjuntatoimi: [toimenpide].", "Mitigation: [action]."),
      phrase("Vaikutus mittareihin: [havaittu vaikutus].", "Impact on metrics: [observed impact]."),
      phrase("Kirjautuminen epäonnistui käyttäjillä [rajaus].", "Login failed for [affected users]."),
      phrase("Häiriö liittyi kirjautumistapaan [tapa].", "The issue involved [login method]."),
      phrase("Integraatio palveluun [palvelu] ei toiminut.", "The integration with [service] was unavailable."),
      phrase("Tiedonsiirto viivästyi: [tiedot].", "Data transfer was delayed: [data]."),
      phrase("Maksaminen epäonnistui maksutavalla [tapa].", "Payments failed using [method]."),
      phrase("Häiriö koski uusia tilauksia tai uusintoja: [rajaus].", "The issue affected new orders or renewals: [scope]."),
      phrase("Versio [versio] palautettiin aiempaan.", "Version [version] was rolled back."),
      phrase("Palautuksen syy: [havaittu ongelma].", "Rollback reason: [observed issue]."),
      phrase("Mittaus puuttui klo [alku]–[loppu].", "Tracking was missing from [start] to [end]."),
      phrase("Puuttuva data: [tapahtumat tai sivut].", "Missing data: [events or pages]."),
      phrase("Latausaika muuttui: [ennen] → [jälkeen].", "Load time changed: [before] → [after]."),
      phrase("Hidastuminen koski sivuja [sivut].", "The slowdown affected [pages]."),
    ],
  },
  {
    code: "SITE", label: "Sivuston päivitykset ja sisällöt", color: "#14702e", colorName: "Vihreä",
    hint: "Uudet sivut, sisällöt, testit ja sivuston uudistukset.",
    templates: [
      template("page", "Uusi sivu tai sisältö", "[sivu tai sisältö]", "[page or content]"),
      template("redesign", "Sivuston uudistus", "[sivu tai osio]", "[page or section]"),
      template("test", "A/B-testi", "[kohde]", "[subject]"),
      template("seo", "SEO-muutos", "[kohde]", "[subject]"),
      template("pricing", "Hinnoittelun muutos", "[tuote]: [muutos]", "[product]: [change]"),
      template("onboarding", "Rekisteröitymisen tai aloituspolun muutos", "[muutos]", "[change]"),
      template("feature", "Uuden ominaisuuden julkaisu", "[nimi]", "[name]"),
      template("migration", "Verkkotunnuksen tai alustan vaihto", "[vanha] → [uusi]", "[old] → [new]"),
    ],
    suggestions: [
      phrase("Julkaistiin [sivu tai sisältö].", "Published [page or content]."),
      phrase("Uudistettiin [sivu tai osio].", "Redesigned [page or section]."),
      phrase("Muutettiin [asia].", "Changed [item]."),
      phrase("Testissä verrataan [versioita].", "The test compares [variants]."),
      phrase("Liikenne jaettiin: [osuus A] / [osuus B].", "Traffic split: [share A] / [share B]."),
      phrase("Testi päättyi, voittaja: [versio].", "The test ended, winner: [variant]."),
      phrase("Päivitettiin sivun otsikko ja metakuvaus.", "Updated the page title and meta description."),
      phrase("Uudelleenohjaus 301: [vanha] → [uusi].", "301 redirect: [old] → [new]."),
      phrase("Sivuille [sivut] lisättiin noindex.", "Added noindex to [pages]."),
      phrase("Tavoitteena helpottaa yhteydenottoa.", "The goal is to make contacting us easier."),
      phrase("Hinnoittelua muutettiin paketissa [paketti].", "Pricing changed for the [plan] plan."),
      phrase("Muutos koskee asiakkaita [rajaus].", "The change applies to [customer group]."),
      phrase("Rekisteröitymisestä muutettiin vaihe [vaihe].", "Registration step [step] was changed."),
      phrase("Aloituspolkuun lisättiin [toiminto].", "Added [feature] to onboarding."),
      phrase("Ominaisuus avattiin käyttäjäryhmälle [ryhmä].", "The feature was enabled for [user group]."),
      phrase("Uusi ominaisuus löytyy kohdasta [sijainti].", "The new feature is available under [location]."),
      phrase("Sivusto siirrettiin alustalle [alusta].", "The website migrated to [platform]."),
      phrase("Verkkotunnus vaihtui: [vanha] → [uusi].", "Domain changed: [old] → [new]."),
      phrase("Sivu linkitettiin kohdasta [sijainti].", "The page was linked from [location]."),
      phrase("Navigaatiota muutettiin: [muutos].", "Navigation changed: [change]."),
    ],
  },
  {
    code: "ADS", label: "Mainonta", color: "#009fb9", colorName: "Turkoosi",
    hint: "Maksetut kampanjat verkossa ja sen ulkopuolella.",
    templates: [
      template("campaign", "Kampanja", "[nimi]", "[name]"),
      template("offline", "Offline-mainonta", "[media]: [kampanja]", "[media]: [campaign]"),
      template("ad-destination", "Mainonnan laskeutumissivun vaihto", "[kampanja] → [sivu]", "[campaign] → [page]"),
    ],
    suggestions: [
      phrase("Kampanja kohdistettiin uusille asiakkaille.", "The campaign targeted new customers."),
      phrase("Kampanja kohdistettiin sivustolla vierailleille.", "The campaign targeted previous website visitors."),
      phrase("Kampanja kohdistettiin nykyisille asiakkaille.", "The campaign targeted existing customers."),
      phrase("Kampanja kohdistettiin alueelle [alue].", "The campaign targeted [region]."),
      phrase("Meta-mainonta käynnistyi.", "Meta advertising launched."),
      phrase("Google Ads -mainonta käynnistyi.", "Google Ads advertising launched."),
      phrase("Liikenne ohjattiin sivulle [sivu].", "Traffic directed to [page]."),
      phrase("Tavoitteena lisätä yhteydenottoja.", "The goal is to increase enquiries."),
      phrase("Mainonta näkyi [paikassa].", "Advertising appeared in [location]."),
      phrase("Mainosten kohdesivu vaihtui: [sivu].", "Ad destination changed to [page]."),
      phrase("Vaihto koski mainosryhmää [ryhmä].", "The change applied to ad group [group]."),
      phrase("Kampanja pysäytettiin, syy: [syy].", "The campaign was paused, reason: [reason]."),
      phrase("Media: [TV, radio, ulkomainos tai printti].", "Media: [TV, radio, outdoor or print]."),
      phrase("Mainoksessa oli kampanjakoodi tai QR-koodi: [koodi].", "The ad included a promo code or QR code: [code]."),
    ],
  },
  {
    code: "DATA", label: "Analytiikan ja seurannan muutokset", color: "#00679b", colorName: "Sininen",
    hint: "Seurannan käyttöönotot, asetusten muutokset ja korjaukset.",
    templates: [
      template("event", "Uusi tapahtumaseuranta", "EVENT: [tapahtuma]", "EVENT: [event]"),
      template("fix", "Seurannan korjaus", "FIX: [tapahtuma]", "FIX: [event]"),
      template("consent", "Suostumusten hallinta", "[muutos]", "[change]"),
      template("key-event", "Avaintapahtuman muutos", "[tapahtuma]: [muutos]", "[event]: [change]"),
      template("cross-domain", "Verkkotunnusten välisen seurannan muutos", "[verkkotunnus]", "[domain]"),
      template("internal-traffic", "Sisäisen liikenteen suodatuksen muutos", "[muutos]", "[change]"),
      template("referral", "Viittaavan liikenteen asetusten muutos", "[verkkotunnus]", "[domain]"),
      template("timezone", "Raportoinnin aikavyöhykkeen muutos", "[ennen] → [jälkeen]", "[before] → [after]"),
    ],
    suggestions: [
      phrase("Lisättiin tapahtuman [tapahtuma] seuranta.", "Added tracking for the [event] event."),
      phrase("Korjattiin tapahtuman [tapahtuma] seuranta.", "Fixed tracking for the [event] event."),
      phrase("Muutos julkaistiin GTM:ssä.", "The change was published in GTM."),
      phrase("Tapahtuma kirjautui aiemmin kahdesti.", "The event was previously recorded twice."),
      phrase("Muutos vaikuttaa vertailukelpoisuuteen.", "The change affects comparability."),
      phrase("Kaikki GTM-tagit noudattavat nyt evästebannerin suostumusta.", "All GTM tags now respect cookie banner consent."),
      phrase("Ilman suostumusta data puuttuu tai mallinnetaan.", "Without consent, data is dropped or modelled."),
      phrase("Consent Mode -asetukset päivitettiin.", "Consent Mode settings were updated."),
      phrase("Suostumusbanneri vaihtui: [ennen] → [jälkeen].", "Consent banner changed: [before] → [after]."),
      phrase("Suostumusten osuus muuttui: [ennen] → [jälkeen].", "Consent rate changed: [before] → [after]."),
      phrase("[Tapahtuma] merkittiin avaintapahtumaksi.", "[Event] was marked as a key event."),
      phrase("[Tapahtuma] poistettiin avaintapahtumista.", "[Event] was removed from key events."),
      phrase("Laskentatapa vaihtui: [kerran istunnossa / joka kerta].", "Counting method changed: [once per session / once per event]."),
      phrase("Verkkotunnusten väliseen seurantaan lisättiin [domain].", "Added [domain] to cross-domain tracking."),
      phrase("Muutos koski siirtymää [lähtö] → [kohde].", "The change covered navigation from [source] to [destination]."),
      phrase("Sisäisen liikenteen suodattimen tilaksi asetettiin [tila].", "Internal traffic filter state set to [state]."),
      phrase("Suodatuksen rajaus päivitettiin: [rajaus].", "Filter scope updated: [scope]."),
      phrase("Ei-toivottujen viittausten listaan lisättiin [domain].", "Added [domain] to the unwanted referrals list."),
      phrase("Muutos koski liikenteen lähdettä [lähde].", "The change concerned traffic source [source]."),
      phrase("Raportoinnin aikavyöhyke vaihtui: [ennen] → [jälkeen].", "Reporting time zone changed: [before] → [after]."),
      phrase("Vuorokausittaisten lukujen vertailussa huomioitava muutos.", "Consider the change when comparing daily figures."),
    ],
  },
  {
    code: "EXT", label: "Ulkoiset tapahtumat", color: "#874800", colorName: "Ruskea",
    hint: "Ulkoiset tapahtumat, sesongit ja kilpailijoiden toimet.",
    templates: [
      template("season", "Sesongin alku", "[nimi]", "[name]"),
      template("competitor", "Kilpailijan kampanja", "[kilpailija]: [kampanja]", "[competitor]: [campaign]"),
      template("industry", "Alan tapahtuma", "[nimi]", "[name]"),
      template("external", "Muu ulkoinen muutos", "[aihe]", "[topic]"),
      template("search-update", "Hakukoneen algoritmipäivitys", "[nimi]", "[name]"),
      template("holiday", "Pyhäpäivä tai lomakausi", "[nimi]", "[name]"),
      template("weather", "Poikkeuksellinen sää", "[sääilmiö], [alue]", "[weather event], [region]"),
      template("channel-change", "Ulkoisen kanavan muutos", "[kanava]: [muutos]", "[channel]: [change]"),
    ],
    suggestions: [
      phrase("Sesonki koskee erityisesti [tuoteryhmää].", "The season mainly concerns [product category]."),
      phrase("Kilpailija [nimi] käynnisti kampanjan.", "Competitor [name] launched a campaign."),
      phrase("Tapahtuma järjestettiin [paikassa].", "The event took place in [location]."),
      phrase("Muutos koskee markkinaa [markkina].", "The change concerns the [market] market."),
      phrase("Vaikutusta seurataan seuraavassa raportissa.", "The impact will be reviewed in the next report."),
      phrase("Hakukone ilmoitti päivityksestä [nimi].", "The search engine announced the [name] update."),
      phrase("Vaikutusta orgaaniseen liikenteeseen seurataan.", "The impact on organic traffic is being monitored."),
      phrase("Ajankohta koskee markkinaa [alue].", "The period concerns the [region] market."),
      phrase("Asiakkaiden lomakausi: [ajanjakso].", "Customer vacation period: [period]."),
      phrase("Alueella [alue] esiintyi [sääilmiö].", "[Weather event] occurred in [region]."),
      phrase("Mahdollista vaikutusta kysyntään seurataan.", "A possible impact on demand is being monitored."),
      phrase("Kanava [kanava] muutti toimintaansa: [muutos].", "Channel [channel] changed its operation: [change]."),
      phrase("Muutos koskee jakelua tai näkyvyyttä: [rajaus].", "The change concerns distribution or visibility: [scope]."),
      phrase("Sesonki alkoi [aiemmin tai myöhemmin] kuin edellisvuonna.", "The season started [earlier or later] than last year."),
      phrase("Kilpailija [nimi] muutti hintojaan: [muutos].", "Competitor [name] changed prices: [change]."),
      phrase("Osallistuimme tapahtumaan: [rooli].", "We took part in the event as [role]."),
    ],
  },
];

// Useful in every category; listed after the category's own sentences.
const commonSuggestions = [
  phrase("Vastuuhenkilö: [nimi].", "Owner: [name]."),
  phrase("Lisätiedot: [tiketti tai linkki].", "Details: [ticket or link]."),
  phrase("Odotettu vaikutus: [mittari].", "Expected impact: [metric]."),
  phrase("Koskee vain [maata, laitetta tai sivua].", "Applies only to [country, device or page]."),
];

// Guidance belongs to the Finnish interface, independently of the annotation language.
export const annotationDateGuidance = {
  "webinar": "Valitse GA4:ssa webinaarin järjestämispäivä. Tee kutsujen lähetyksistä tarvittaessa erilliset merkinnät.",
  "podcast": "Valitse GA4:ssa jakson tai jutun julkaisupäivä, jolloin yleisö pääsi sen pariin.",
  "partnership": "Valitse GA4:ssa yhteistyöjulkaisun julkaisupäivä. Käytä usean päivän julkaisusarjalle aikaväliä.",
  "email-flow": "Valitse GA4:ssa päivä, jolloin uusi automaatio tai sen muutos tuli käyttöön.",
  "login-issue": "Valitse GA4:ssa päivä tai aikaväli, jolloin kirjautuminen ei toiminut. Lisää tarkat kellonajat kuvaukseen.",
  "api-issue": "Valitse GA4:ssa integraation häiriöjakso. Erota häiriön alkamishetki sen havaitsemishetkestä.",
  "payment-issue": "Valitse GA4:ssa päivä tai aikaväli, jolloin maksut epäonnistuivat. Kirjaa palautumisaika kuvaukseen.",
  "release-rollback": "Valitse GA4:ssa päivä, jolloin aiempi versio palautettiin. Lisää ongelmallisen version käyttöaika kuvaukseen.",
  "pricing": "Valitse GA4:ssa päivä, jolloin uusi hinnoittelu tuli asiakkaiden nähtäville tai voimaan. Kerro kumpi kuvauksessa.",
  "onboarding": "Valitse GA4:ssa päivä, jolloin uusi rekisteröitymis- tai aloituspolku julkaistiin käyttäjille.",
  "feature": "Valitse GA4:ssa ominaisuuden julkaisupäivä. Käytä vaiheittaiselle käyttöönotolle aikaväliä.",
  "migration": "Valitse GA4:ssa liikenteen siirtopäivä tai vaiheittaisen siirron aikaväli.",
  "ad-destination": "Valitse GA4:ssa päivä, jolloin mainokset alkoivat ohjata uudelle sivulle.",
  "cross-domain": "Valitse GA4:ssa päivä, jolloin seurannan muutos julkaistiin. Lisää mukana olevat verkkotunnukset kuvaukseen.",
  "internal-traffic": "Valitse GA4:ssa päivä, jolloin suodattimen tila tai rajaus muuttui.",
  "referral": "Valitse GA4:ssa päivä, jolloin viittaavan liikenteen asetuksia muutettiin.",
  "timezone": "Valitse GA4:ssa päivä, jolloin aikavyöhykeasetus muutettiin. Kirjaa vanha ja uusi aikavyöhyke kuvaukseen.",
  "search-update": "Valitse GA4:ssa ilmoitettu päivityspäivä tai käyttöönoton aikaväli. Merkitse oma liikennepoikkeama tarvittaessa erikseen.",
  "holiday": "Valitse GA4:ssa pyhäpäivä tai kohdemarkkinan lomakauden aikaväli.",
  "weather": "Valitse GA4:ssa sääilmiön toteutunut päivä tai aikaväli tarkasteltavalla alueella.",
  "channel-change": "Valitse GA4:ssa päivä, jolloin kanavan muutos tuli voimaan. Käytä vaiheittaiselle muutokselle aikaväliä.",

  newsletter: "Valitse GA4:ssa uutiskirjeen lähetyspäivä. Jos lähetys jakautui usealle päivälle, käytä aikaväliä.",
  pr: "Valitse GA4:ssa tiedotteen julkaisupäivä tai päivä, jolloin juttu ilmestyi mediassa.",
  social: "Valitse GA4:ssa somejulkaisun julkaisupäivä. Merkitse usean päivän julkaisusarja aikavälinä.",
  launch: "Valitse GA4:ssa päivä, jolloin tuote tai palvelu tuli saataville. Käytä vaiheittaiselle lanseeraukselle aikaväliä.",
  outage: "Valitse GA4:ssa käyttökatkon päivä tai aikaväli. Lisää tarkat alkamis- ja päättymiskellonajat kuvaukseen.",
  checkout: "Valitse GA4:ssa päivä tai aikaväli, jolloin lomake- tai kassavirhe vaikutti käyttäjiin.",
  "tracking-gap": "Valitse GA4:ssa päivä tai aikaväli, jolta mittaus puuttui. Lisää mahdolliset tarkat kellonajat kuvaukseen.",
  performance: "Valitse GA4:ssa päivä tai aikaväli, jolloin sivusto oli tavallista hitaampi.",
  abuse: "Valitse GA4:ssa havaitun väärinkäyttöyrityksen päivä tai aikaväli. Jos alkamisaika ei ole tiedossa, mainitse se kuvauksessa.",
  page: "Valitse GA4:ssa päivä, jolloin sivu tai sisältö julkaistiin kävijöille.",
  redesign: "Valitse GA4:ssa uudistuksen julkaisupäivä. Käytä vaiheittaiselle käyttöönotolle aikaväliä.",
  test: "Valitse GA4:ssa testin aloituspäivä. Jos testi on päättynyt, voit merkitä sen koko keston aikavälinä.",
  seo: "Valitse GA4:ssa SEO-muutoksen julkaisupäivä. Hakukonenäkyvyyden mahdollinen muutos voi näkyä vasta myöhemmin.",
  campaign: "Valitse GA4:ssa kampanjan koko kesto aikavälinä. Jos päättymispäivä ei ole vielä tiedossa, valitse aloituspäivä ja päivitä aikaväli kampanjan päätyttyä.",
  offline: "Valitse GA4:ssa aikaväli, jolloin mainonta oli näkyvissä. Yhden päivän mainontaan riittää päivämäärä.",
  event: "Valitse GA4:ssa päivä, jolloin tapahtuman seuranta otettiin käyttöön tuotannossa.",
  fix: "Valitse GA4:ssa päivä, jolloin seurannan korjaus julkaistiin. Merkitse aiempi virheellinen mittausjakso erikseen.",
  consent: "Valitse GA4:ssa päivä, jolloin suostumusten hallinnan muutos otettiin käyttöön sivustolla.",
  "key-event": "Valitse GA4:ssa päivä, jolloin avaintapahtuman määritystä muutettiin GA4:ssa.",
  season: "Valitse GA4:ssa sesongin alkamispäivä tai merkitse sesongin koko kesto aikavälinä.",
  competitor: "Valitse GA4:ssa kilpailijan kampanjan alkamispäivä tai tiedossa oleva kesto. Mainitse epävarma ajoitus kuvauksessa.",
  industry: "Valitse GA4:ssa tapahtumapäivä tai usean päivän tapahtuman aikaväli.",
  external: "Valitse GA4:ssa päivä tai aikaväli, jolloin ulkoinen muutos tapahtui. Mainitse epävarma ajoitus kuvauksessa.",
  custom: "Valitse GA4:ssa tapahtumapäivä. Käytä aikaväliä, jos tapahtuma kestää useita päiviä.",
};

// Promote relevant sentences without separate suggestion libraries per template.
const templateTerms = {
  "webinar": ["Webinaarin aiheena [aihe].", "Ilmoittautuminen ohjattiin sivulle [sivu]."],
  "podcast": ["Esiintyminen julkaisussa [julkaisu].", "Jaksossa käsiteltiin [aihetta]."],
  "partnership": ["Yhteistyökumppani julkaisi [sisällön].", "Julkaisun kohderyhmä: [kohderyhmä]."],
  "email-flow": ["Automaatiota muutettiin vaiheessa [vaihe].", "Viestin lähetysehto: [ehto]."],
  "login-issue": ["Kirjautuminen epäonnistui käyttäjillä [rajaus].", "Häiriö liittyi kirjautumistapaan [tapa]."],
  "api-issue": ["Integraatio palveluun [palvelu] ei toiminut.", "Tiedonsiirto viivästyi: [tiedot]."],
  "payment-issue": ["Maksaminen epäonnistui maksutavalla [tapa].", "Häiriö koski uusia tilauksia tai uusintoja: [rajaus]."],
  "release-rollback": ["Versio [versio] palautettiin aiempaan.", "Palautuksen syy: [havaittu ongelma]."],
  "pricing": ["Hinnoittelua muutettiin paketissa [paketti].", "Muutos koskee asiakkaita [rajaus]."],
  "onboarding": ["Rekisteröitymisestä muutettiin vaihe [vaihe].", "Aloituspolkuun lisättiin [toiminto]."],
  "feature": ["Ominaisuus avattiin käyttäjäryhmälle [ryhmä].", "Uusi ominaisuus löytyy kohdasta [sijainti]."],
  "migration": ["Sivusto siirrettiin alustalle [alusta].", "Verkkotunnus vaihtui: [vanha] → [uusi]."],
  "ad-destination": ["Mainosten kohdesivu vaihtui: [sivu].", "Vaihto koski mainosryhmää [ryhmä]."],
  "cross-domain": ["Verkkotunnusten väliseen seurantaan lisättiin [domain].", "Muutos koski siirtymää [lähtö] → [kohde]."],
  "internal-traffic": ["Sisäisen liikenteen suodattimen tilaksi asetettiin [tila].", "Suodatuksen rajaus päivitettiin: [rajaus]."],
  "referral": ["Ei-toivottujen viittausten listaan lisättiin [domain].", "Muutos koski liikenteen lähdettä [lähde]."],
  "timezone": ["Raportoinnin aikavyöhyke vaihtui: [ennen] → [jälkeen].", "Vuorokausittaisten lukujen vertailussa huomioitava muutos."],
  "search-update": ["Hakukone ilmoitti päivityksestä [nimi].", "Vaikutusta orgaaniseen liikenteeseen seurataan."],
  "holiday": ["Ajankohta koskee markkinaa [alue].", "Asiakkaiden lomakausi: [ajanjakso]."],
  "weather": ["Alueella [alue] esiintyi [sääilmiö].", "Mahdollista vaikutusta kysyntään seurataan."],
  "channel-change": ["Kanava [kanava] muutti toimintaansa: [muutos].", "Muutos koskee jakelua tai näkyvyyttä: [rajaus]."],

  newsletter: ["Uutiskirje", "Aiheena"], pr: ["Tiedote"], social: ["Julkaisu"], launch: ["[Tuote]", "Lanseerausta", "Tavoitteena"],
  outage: ["Sivusto", "Syynä"], checkout: ["Häiriö koski [toimintoa]", "Ongelma korjattiin"], "tracking-gap": ["Mittaus puuttui klo", "Puuttuva data", "Syynä"], performance: ["Latausaika", "Hidastuminen", "Syynä"],
  abuse: ["Havaittiin", "Epäillään", "API:n"],
  page: ["Julkaistiin", "Sivu linkitettiin"], redesign: ["Uudistettiin", "Navigaatiota"], test: ["Testissä", "Liikenne jaettiin", "Testi päättyi"], seo: ["Päivitettiin", "Uudelleenohjaus", "Sivuille"],
  campaign: ["Kampanja kohdistettiin", "Kampanja pysäytettiin"], offline: ["Media:", "Mainoksessa oli", "Mainonta"],
  event: ["Lisättiin"], fix: ["Korjattiin", "Tapahtuma"], consent: ["Kaikki GTM-tagit", "Ilman suostumusta", "Consent", "Suostumus", "Muutos vaikuttaa"], "key-event": ["[Tapahtuma]", "Laskentatapa"],
  season: ["Sesonki"], competitor: ["Kilpailija"], industry: ["Tapahtuma", "Osallistuimme"], external: ["Muutos"],
};

export const characterCount = (text) => Array.from(text).length;
const placeholderTokens = new Set(
  [...annotationCategories.flatMap((category) => [...category.templates.map((item) => item.title), ...category.suggestions]), ...commonSuggestions]
    .flatMap((item) => Object.values(item).flatMap((text) => text.match(/\[[^\]]+\]/g) ?? []))
);
export const hasPlaceholder = (text) => (text.match(/\[[^\]]+\]/g) ?? []).some((token) => placeholderTokens.has(token));
const normalize = (text) => text.toLocaleLowerCase().normalize("NFC");

export function getDescriptionSuggestions(category, templateId, language, text, caret = text.length) {
  const terms = templateTerms[templateId] ?? [];
  // Template's own sentences first, then shared ones, then the rest of the category.
  const rank = (item) => terms.some((term) => item.fi.startsWith(term)) ? 2 : commonSuggestions.includes(item) ? 1 : 0;
  const phrases = [...category.suggestions.filter((item) => templateId === "custom" || rank(item) === 2), ...commonSuggestions].sort((a, b) => rank(b) - rank(a)).map((item) => item[language]).filter((item) => !normalize(text).includes(normalize(item)));
  const before = text.slice(0, caret);
  // ponytail: sentence-prefix completion uses punctuation; a language parser is only needed for richer prose editing.
  const fragment = before.match(/[^.!?\n]*$/)?.[0].trimStart() ?? "";
  const matching = fragment && caret === text.length ? phrases.filter((item) => normalize(item).startsWith(normalize(fragment))) : [];
  const lastWord = normalize(fragment).split(/\s+/).at(-1) ?? "";
  const related = lastWord.length > 2 ? phrases.filter((item) => normalize(item).includes(lastWord)) : [];
  return (matching.length ? matching : related.length ? related : phrases).slice(0, 4).map((sentence) => {
    const completion = matching.length > 0;
    const start = completion ? caret - fragment.length : text.length;
    const separator = !completion && text.trim() ? (/[.!?]\s*$/.test(text) ? " " : ". ") : "";
    const insertion = separator + sentence;
    const value = completion ? text.slice(0, start) + sentence : text.trimEnd() + insertion;
    return { sentence, value, completion, insertionStart: value.indexOf(sentence, Math.max(0, start - 1)) };
  });
}
