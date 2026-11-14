// Copy and example data for the language-version visuals (src/components/viz/).
// Components take `fi` and read everything from here, so a new language is a data
// change, not a copy of the markup. The example numbers are invented: FI 320, EN 280,
// SV 190, DE 160, FR 140. Totals are computed, never typed.

const SHY = "\u00ad"; // soft hyphen, keeps long Finnish words from overflowing narrow nodes

const rowsFi = [
  { code: "FI", path: "/musiikkistudion-kayttoohjeet/", views: 320 },
  { code: "EN", path: "/en/music-studio-user-guide/", views: 280 },
  { code: "SV", path: "/sv/musikstudions-bruksanvisning/", views: 190 },
  { code: "DE", path: "/de/musikstudio-anleitung/", views: 160 },
  { code: "FR", path: "/fr/mode-d-emploi-du-studio/", views: 140 },
];

// English article: English is the primary version, so it has no language prefix.
const rowsEn = [
  { code: "EN", path: "/music-studio-user-guide/", views: 280 },
  { code: "FI", path: "/fi/musiikkistudion-kayttoohjeet/", views: 320 },
  { code: "SV", path: "/sv/musikstudions-bruksanvisning/", views: 190 },
  { code: "DE", path: "/de/musikstudio-anleitung/", views: 160 },
  { code: "FR", path: "/fr/mode-d-emploi-du-studio/", views: 140 },
];

export const total = (rows) => rows.reduce((sum, row) => sum + row.views, 0);
const format = (n, locale) => n.toLocaleString(locale);

const langValues = { FI: "fi", EN: "en", SV: "sv", DE: "de", FR: "fr" };

export const languageVisuals = {
  fi: {
    locale: "fi-FI",
    replay: "Toista animaatio",
    viewsMerge: {
      title: "Viidestä raporttirivistä yhteen",
      tableLabel: "Katselukerrat kieliversioittain",
      colContent: "Sisältö",
      colViews: "Katselukerrat",
      parentTitle: "Musiikkistudion käyttöohjeet",
      parentHint: "Yksi sisältö",
      phases: ["1/2 Viisi erillistä riviä", "2/2 Yksi sisältö"],
      merge: "Yhdistä rivit",
      before: "Ennen",
      after: "Jälkeen",
      viewGroup: "Näkymä",
      tag: "yhteinen tunniste",
      rows: rowsFi,
      caption: (sum) =>
        `Sama sisältö on raportissa ensin viitenä rivinä. Yhteisen tunnisteen avulla rivit ryhmitellään yhden sisällön alle, ja yhteistulos on ${sum} katselukertaa. Kielikohtainen erittely säilyy. Luvut ovat kuvitteellisia.`,
    },
    dataFlow: {
      title: "Miten tieto kulkee sivulta raporttiin",
      steps: [
        { key: "cms", label: `Sisällön${SHY}hallinta` },
        { key: "page", label: "Sivu" },
        { key: "dl", label: "dataLayer" },
        { key: "tm", label: `Tunnisteen${SHY}hallinta` },
        { key: "an", label: "Analytiikka" },
        { key: "rep", label: "Raportti" },
      ],
      cmsNote: "Yksi sisältö, viisi kieliversiota",
      pageNote: "Viisi kieliversiota",
      tmNote: "Lukee arvot dataLayerista ja lähettää ne analytiikkaan",
      dlNote: "Säilyttää arvot sivulla. Ei lähetä niitä analytiikkaan itse.",
      sharedHeading: "Samat kaikilla viidellä versiolla",
      shared: ["primary_url", "primary_path", "primary_title", "amount_of_translations"],
      langHeading: "Eri jokaisella versiolla",
      langField: "current_language",
      langs: ["FI", "SV", "EN", "DE", "FR"],
      langValues,
      reportTitle: "Musiikkistudion käyttöohjeet",
      reportHint: "Yksi sisältö, jonka alla kieliversiot",
      caption:
        "Sivu tallentaa arvot dataLayeriin. Tunnisteenhallinta lukee ne ja lähettää analytiikkaan, ja raportti ryhmittelee kieliversiot yhden sisällön alle. Kentistä neljä on samoja kaikilla kieliversioilla, ja vain current_language vaihtuu.",
    },
    urlChange: {
      title: "Kaksi tapaa tunnistaa sivu, kun osoite muuttuu",
      oldPath: "/musiikkistudion-kayttoohjeet/",
      newPath: "/ohjeet/musiikkistudio/",
      oldLabel: "vanha osoite",
      newLabel: "uusi osoite",
      a: {
        heading: "Vaihtoehto A: osoite tunnisteena",
        chartLabel: "Historia katkeaa osoitteen vaihtuessa: vanha ja uusi osoite ovat raportissa kaksi erillistä riviä.",
        oldHistory: "Vanha historia",
        newHistory: "Uusi historia",
        result: "Raportissa on kaksi riviä, ja historia katkeaa.",
      },
      b: {
        heading: "Vaihtoehto B: pysyvä sisältötunniste",
        badge: "Jatkokehitysehdotus, ei vielä toteutettu",
        id: "primary_page_id: 1234",
        chartLabel: "Historia jatkuu osoitteen vaihtuessa, koska pysyvä tunniste pysyy samana.",
        history: "Yhteinen historia",
        result: "Tunniste pysyy samana, joten historia pysyy koossa.",
      },
      caption:
        "Kun pääkielisen sivun osoite vaihtuu, osoitteeseen perustuva tunniste vaihtuu ja historia katkeaa. Pysyvä sisältötunniste on artikkelin jatkokehitysehdotus eikä ole käytössä missään toteutuksessa. Viivat ovat havainnollistavia.",
    },
  },
  en: {
    locale: "en-US",
    replay: "Replay animation",
    viewsMerge: {
      title: "From five report rows to one",
      tableLabel: "Page views by language version",
      colContent: "Content",
      colViews: "Page views",
      parentTitle: "Music studio user guide",
      parentHint: "One piece of content",
      phases: ["1/2 Five separate rows", "2/2 One piece of content"],
      merge: "Merge rows",
      before: "Before",
      after: "After",
      viewGroup: "View",
      tag: "shared identifier",
      rows: rowsEn,
      caption: (sum) =>
        `The same content first shows up as five report rows. A shared identifier groups the rows under one piece of content, and the combined result is ${sum} page views. The breakdown by language stays visible. The numbers are invented.`,
    },
    dataFlow: {
      title: "How data travels from the page to the report",
      steps: [
        { key: "cms", label: "CMS" },
        { key: "page", label: "Page" },
        { key: "dl", label: "dataLayer" },
        { key: "tm", label: "Tag manager" },
        { key: "an", label: "Analytics" },
        { key: "rep", label: "Report" },
      ],
      cmsNote: "One piece of content, five language versions",
      pageNote: "Five language versions",
      tmNote: "Reads the values from the dataLayer and sends them to analytics",
      dlNote: "Holds the values on the page. It does not send them to analytics itself.",
      sharedHeading: "Same on all five versions",
      shared: ["primary_url", "primary_path", "primary_title", "amount_of_translations"],
      langHeading: "Different on each version",
      langField: "current_language",
      langs: ["EN", "FI", "SV", "DE", "FR"],
      langValues,
      reportTitle: "Music studio user guide",
      reportHint: "One piece of content with its language versions underneath",
      caption:
        "The page stores the values in the dataLayer. The tag manager reads them and sends them to analytics, and the report groups the language versions under one piece of content. Four of the fields are the same on every version, and only current_language changes.",
    },
    urlChange: {
      title: "Two ways to identify a page when its URL changes",
      oldPath: "/music-studio-user-guide/",
      newPath: "/guides/music-studio/",
      oldLabel: "old URL",
      newLabel: "new URL",
      a: {
        heading: "Option A: the URL as identifier",
        chartLabel: "The history breaks when the URL changes: the old and new URLs are two separate rows in the report.",
        oldHistory: "Old history",
        newHistory: "New history",
        result: "The report has two rows, and the history breaks.",
      },
      b: {
        heading: "Option B: a permanent content identifier",
        badge: "Proposed next step, not implemented yet",
        id: "primary_page_id: 1234",
        chartLabel: "The history continues when the URL changes, because the permanent identifier stays the same.",
        history: "Shared history",
        result: "The identifier stays the same, so the history stays together.",
      },
      caption:
        "When the URL of the primary page changes, an identifier based on the URL changes too and the history breaks. A permanent content identifier is a proposed next step and is not in use in any implementation. The lines are illustrative.",
    },
  },
};

export { format };
