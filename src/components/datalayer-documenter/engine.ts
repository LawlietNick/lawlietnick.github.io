export type RequiredLevel = "Kyllä" | "Jompikumpi" | "Jos value" | "Suositeltu" | "Ei";

export interface DocumentParameter {
  name: string;
  type: string;
  required: RequiredLevel;
  description: string;
}

export interface DocumentSection {
  id: string;
  group: "Perusta" | "Selaus" | "Ostoskori" | "Kassa" | "Tilaus" | "Markkinointi" | "Käyttäjä";
  eventName?: string;
  title: string;
  purpose: string;
  trigger: string;
  parameters: DocumentParameter[];
  code: string;
  notes: string[];
  source: string;
  selected: boolean;
}

export interface DocumentSettings {
  title: string;
  clientName: string;
  platform: string;
  currency: string;
  documentVersion: string;
  notes: string;
}

export interface DocumentState {
  version: 1;
  settings: DocumentSettings;
  sections: DocumentSection[];
}

const ecommerceSource = "https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm";
const ecommerceSources = {
  implementation: `${ecommerceSource}#implementation`,
  itemList: `${ecommerceSource}#select_an_item_from_a_list`,
  itemDetails: `${ecommerceSource}#view_item_details`,
  cart: `${ecommerceSource}#add_or_remove_an_item_from_a_shopping_cart`,
  checkout: `${ecommerceSource}#initiate_the_checkout_process`,
  purchase: `${ecommerceSource}#make_a_purchase_or_issue_a_refund`,
  promotion: `${ecommerceSource}#apply_promotions`,
} as const;
const eventsSource = "https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm";
const dataLayerSource = "https://developers.google.com/tag-platform/tag-manager/datalayer";
const consentSource = "https://developers.google.com/tag-platform/security/guides/consent";

const item = (extras = "") => `{
  item_id: "SKU-11001",
  item_name: "Black Running Shoes",
  price: 89.95,
  quantity: 1,
  item_brand: "Nike",
  item_category: "Shoes",
  item_category2: "Running",
  item_variant: "Black / 42"${extras}
}`;

const ecommercePush = (eventName: string, body: string) => `window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ ecommerce: null });
window.dataLayer.push({
  event: "${eventName}",
  ecommerce: {
${body}
  }
});`;

const moneyParameters: DocumentParameter[] = [
  { name: "currency", type: "string", required: "Jos value", description: "Valuutan ISO 4217 -koodi, esimerkiksi EUR." },
  { name: "value", type: "number", required: "Suositeltu", description: "Tapahtumaan liittyvien tuotteiden arvo. Ei sisällä toimitusta tai veroa." },
  { name: "items", type: "array", required: "Kyllä", description: "Tapahtumaan liittyvät tuotteet." },
];

const sectionDefinitions: DocumentSection[] = [
  {
    id: "implementation",
    group: "Perusta",
    title: "Toteutuksen periaatteet",
    purpose: "Dokumentti määrittelee selaimen dataLayeriin lähetettävät GA4-tapahtumat. Sivuston toteutus vastaa oikeasta laukaisuhetkestä ja tapahtuman tiedoista; Google Tag Manager lukee datan ja välittää sen sovittuihin kohteisiin.",
    trigger: "Alusta window.dataLayer vain kerran. Lisää tiedot aina dataLayer.push()-kutsulla ja käytä tapahtuma- sekä parametrinimiä yhdenmukaisesti koko sivustolla.",
    parameters: [],
    code: `window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "example_event",
  example_parameter: "example_value"
});`,
    notes: [
      "Älä ylikirjoita olemassa olevaa dataLayer-taulukkoa muodolla window.dataLayer = [].",
      "Tapahtumat käsitellään jonossa siinä järjestyksessä, jossa ne lisätään dataLayeriin.",
      "Älä lähetä sähköpostiosoitetta, nimeä, puhelinnumeroa tai muuta suoraan tunnistavaa henkilötietoa.",
      "Tyhjennä ecommerce-objekti ennen uutta verkkokauppatapahtumaa, jos GTM-toteutus voi muuten yhdistää edellisen tapahtuman arvoja uuteen tapahtumaan.",
    ],
    source: dataLayerSource,
    selected: true,
  },
  {
    id: "consent",
    group: "Perusta",
    title: "Consent Mode ja tapahtumajärjestys",
    purpose: "Consent Mode ohjaa Google-tagien toimintaa käyttäjän suostumusvalintojen perusteella. dataLayer-tapahtumaa ja suostumustilaa ei pidä sekoittaa samaan vastuuseen.",
    trigger: "Aseta suostumuksen oletustila ennen mittausta lähettäviä komentoja. Päivitä tila heti samalla sivulla, kun käyttäjä muuttaa valintaansa. Jos CMP latautuu asynkronisesti, määritä tarpeeseen sopiva wait_for_update oletuskomennossa.",
    parameters: [
      { name: "analytics_storage", type: "granted | denied", required: "Kyllä", description: "Analytiikkaan liittyvän tallennuksen suostumustila." },
      { name: "ad_storage", type: "granted | denied", required: "Kyllä", description: "Mainontaan liittyvän tallennuksen suostumustila." },
      { name: "ad_user_data", type: "granted | denied", required: "Kyllä", description: "Suostumus mainontaan liittyvien käyttäjätietojen lähettämiseen." },
      { name: "ad_personalization", type: "granted | denied", required: "Kyllä", description: "Suostumus personoituun mainontaan." },
    ],
    code: `gtag("consent", "default", {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  wait_for_update: 500
});`,
    notes: [
      "Ecommerce-tapahtumia ei yleisesti tarvitse viivästää odottamaan käyttäjän hyväksyntää. Google-tagien tulee toimia kulloisenkin suostumustilan mukaisesti.",
      "GTM:n omassa consent-templatessa käytä setDefaultConsentState- ja updateConsentState-rajapintoja.",
      "Testaa consentin oletustila, päivitys ja tapahtumien lähetys GTM Preview'ssa ennen julkaisua.",
    ],
    source: consentSource,
    selected: true,
  },
  {
    id: "items",
    group: "Perusta",
    title: "Items-taulukon yhteinen rakenne",
    purpose: "items-taulukko kuvaa tapahtumaan liittyvät tuotteet tai palvelut. Käytä samaa item_id-arvoa jokaisessa tapahtumassa, jotta tuotevaiheet voidaan yhdistää raportoinnissa.",
    trigger: "Muodosta jokainen tuote samalla tietomallilla. Lähetä kaikki saatavilla olevat suositellut parametrit ja enintään 27 omaa parametria tuotetta kohti.",
    parameters: [
      { name: "item_id", type: "string", required: "Jompikumpi", description: "Tuotteen pysyvä tunniste, esimerkiksi SKU. Vähintään item_id tai item_name vaaditaan." },
      { name: "item_name", type: "string", required: "Jompikumpi", description: "Tuotteen nimi. Vähintään item_id tai item_name vaaditaan." },
      { name: "price", type: "number", required: "Suositeltu", description: "Yksikköhinta tuotetason alennuksen jälkeen." },
      { name: "discount", type: "number", required: "Ei", description: "Tuotekohtainen alennus per yksikkö. Ei prosenttiosuus." },
      { name: "quantity", type: "number", required: "Suositeltu", description: "Tuotteiden määrä. Oletusarvo GA4:ssa on 1." },
      { name: "item_brand", type: "string", required: "Ei", description: "Tuotteen brändi." },
      { name: "item_category...item_category5", type: "string", required: "Ei", description: "Tuotekategorian tasot yhdestä viiteen." },
      { name: "item_variant", type: "string", required: "Ei", description: "Variantti, kuten väri ja koko." },
      { name: "item_list_id / item_list_name", type: "string", required: "Ei", description: "Lista, jossa tuote näytettiin tai valittiin." },
      { name: "index", type: "number", required: "Ei", description: "Tuotteen nollasta alkava sijainti listalla." },
      { name: "coupon", type: "string", required: "Ei", description: "Tuotetason kuponki tai alennuskoodi." },
      { name: "affiliation", type: "string", required: "Ei", description: "Kauppa tai kumppani, jonka kautta tapahtuma syntyi." },
    ],
    code: item(),
    notes: [
      "Yhdessä items-taulukossa voi olla enintään 200 tuotetta.",
      "price ja discount ovat erillisiä arvoja. price on alennettu yksikköhinta ja discount alennuksen määrä per yksikkö.",
      "Älä vaihda item_id:n lähdettä tapahtumien välillä esimerkiksi tuote-ID:stä variantti-SKU:hun.",
    ],
    source: ecommerceSources.implementation,
    selected: true,
  },
  {
    id: "view_item_list",
    group: "Selaus",
    eventName: "view_item_list",
    title: "Tuotelistan näkeminen",
    purpose: "Lähetetään, kun käyttäjälle näytetään tuotteiden luettelo, kuten kategoria, hakutulos, suosituslohko tai kuratoitu kokoelma.",
    trigger: "Lähetä tuotteet, kun ne tulevat näkyviin. Lazyload- ja infinite scroll -toteutuksissa lähetä vain uudet näkyviin tulleet tuotteet.",
    parameters: [
      { name: "item_list_id", type: "string", required: "Suositeltu", description: "Listan vakaa tunniste." },
      { name: "item_list_name", type: "string", required: "Suositeltu", description: "Listan käyttäjälle ymmärrettävä nimi." },
      { name: "items", type: "array", required: "Kyllä", description: "Näkyville tulleet tuotteet listajärjestyksessä." },
    ],
    code: ecommercePush("view_item_list", `    item_list_id: "category_shoes",\n    item_list_name: "Shoes",\n    items: [\n      ${item(',\n  index: 0,\n  item_list_id: "category_shoes",\n  item_list_name: "Shoes"').replaceAll("\n", "\n      ")}\n    ]`),
    notes: [
      "Estä saman tuotelistan saman näyttökerran tuplat esimerkiksi IntersectionObserverin ja fired-tilan avulla.",
      "Älä lähetä listaa vielä silloin, kun tiedot vain haetaan mutta tuotteet eivät ole näkyvissä.",
    ],
    source: ecommerceSources.itemList,
    selected: true,
  },
  {
    id: "select_item",
    group: "Selaus",
    eventName: "select_item",
    title: "Tuotteen valitseminen listalta",
    purpose: "Lähetetään, kun käyttäjä valitsee tuotteen listalta ja siirtyy esimerkiksi tuotesivulle.",
    trigger: "Lähetä klikkauksen tai muun yksiselitteisen valinnan yhteydessä. Säilytä listan tunniste, nimi ja tuotteen index samana kuin view_item_list-tapahtumassa.",
    parameters: [
      { name: "item_list_id", type: "string", required: "Suositeltu", description: "Lista, josta tuote valittiin." },
      { name: "item_list_name", type: "string", required: "Suositeltu", description: "Listan nimi." },
      { name: "items", type: "array", required: "Kyllä", description: "Valittu tuote. Lähetä vain valittu tuote." },
    ],
    code: ecommercePush("select_item", `    item_list_id: "category_shoes",\n    item_list_name: "Shoes",\n    items: [\n      ${item(',\n  index: 0,\n  item_list_id: "category_shoes",\n  item_list_name: "Shoes"').replaceAll("\n", "\n      ")}\n    ]`),
    notes: ["Älä lähetä select_item-tapahtumaa pelkästä hoverista tai listan näyttämisestä."],
    source: ecommerceSources.itemList,
    selected: false,
  },
  {
    id: "view_item",
    group: "Selaus",
    eventName: "view_item",
    title: "Tuotetietojen katsominen",
    purpose: "Lähetetään, kun käyttäjä näkee tuotteen yksityiskohtaiset tiedot.",
    trigger: "Lähetä tuotesivun tai muun tuotedetaljin renderöidyttyä. Lähetä uudelleen, jos käyttäjän valitsema variantti vaihtaa seurattavaa tuotetta tai hintaa.",
    parameters: moneyParameters,
    code: ecommercePush("view_item", `    currency: "EUR",\n    value: 89.95,\n    items: [\n      ${item().replaceAll("\n", "\n      ")}\n    ]`),
    notes: ["value on items-taulukon price × quantity -arvojen summa."],
    source: ecommerceSources.itemDetails,
    selected: true,
  },
  {
    id: "add_to_wishlist",
    group: "Selaus",
    eventName: "add_to_wishlist",
    title: "Tuotteen lisääminen toivelistalle",
    purpose: "Lähetetään, kun käyttäjä lisää yhden tai useamman tuotteen toivelistalle.",
    trigger: "Lähetä vasta onnistuneen lisäyksen jälkeen.",
    parameters: moneyParameters,
    code: ecommercePush("add_to_wishlist", `    currency: "EUR",\n    value: 89.95,\n    items: [\n      ${item().replaceAll("\n", "\n      ")}\n    ]`),
    notes: ["Älä lähetä tapahtumaa, jos lisäys epäonnistuu tai käyttäjä peruu toiminnon."],
    source: ecommerceSources.cart,
    selected: false,
  },
  {
    id: "add_to_cart",
    group: "Ostoskori",
    eventName: "add_to_cart",
    title: "Tuotteen lisääminen ostoskoriin",
    purpose: "Lähetetään, kun käyttäjä lisää yhden tai useamman tuotteen ostoskoriin.",
    trigger: "Lähetä vasta, kun ostoskori on päivittynyt onnistuneesti.",
    parameters: moneyParameters,
    code: ecommercePush("add_to_cart", `    currency: "EUR",\n    value: 89.95,\n    items: [\n      ${item().replaceAll("\n", "\n      ")}\n    ]`),
    notes: [
      "Jos määrä kasvaa kahdesta kolmeen, lähetä quantity: 1, koska tapahtuma kuvaa lisättyä määrää.",
      "Jos yhdellä toiminnolla lisätään useita tuotteita, lähetä kaikki lisätyt tuotteet samassa items-taulukossa.",
    ],
    source: ecommerceSources.cart,
    selected: true,
  },
  {
    id: "remove_from_cart",
    group: "Ostoskori",
    eventName: "remove_from_cart",
    title: "Tuotteen poistaminen ostoskorista",
    purpose: "Lähetetään, kun käyttäjä poistaa tuotteen tai pienentää sen määrää ostoskorissa.",
    trigger: "Lähetä vasta onnistuneen ostoskoripäivityksen jälkeen.",
    parameters: moneyParameters,
    code: ecommercePush("remove_from_cart", `    currency: "EUR",\n    value: 89.95,\n    items: [\n      ${item().replaceAll("\n", "\n      ")}\n    ]`),
    notes: [
      "Jos määrä pienenee kahdesta yhteen, lähetä quantity: 1, koska tapahtuma kuvaa poistettua määrää.",
      "Koko ostoskorin tyhjennyksessä lähetä kaikki poistetut tuotteet yhdessä tapahtumassa.",
    ],
    source: ecommerceSources.cart,
    selected: true,
  },
  {
    id: "view_cart",
    group: "Ostoskori",
    eventName: "view_cart",
    title: "Ostoskorin katsominen",
    purpose: "Lähetetään, kun käyttäjä näkee ostoskorin sisällön sivulla, avautuvassa paneelissa tai modaalissa.",
    trigger: "Lähetä ostoskorin sivun latauduttua tai varsinaisen ostoskoripaneelin avauduttua. Älä lähetä hover-esikatselusta.",
    parameters: moneyParameters,
    code: ecommercePush("view_cart", `    currency: "EUR",\n    value: 164.45,\n    items: [\n      ${item().replaceAll("\n", "\n      ")}\n    ]`),
    notes: [
      "Tyhjästä ostoskorista voidaan lähettää value: 0 ja tyhjä items-taulukko.",
      "Jos avoimen ostoskorin sisältö muuttuu, lähetä uusi view_cart vain, jos uusi näkymä vastaa toteutuksen määriteltyä näyttökertaa. Vältä jokaisen pienen renderöinnin tuplia.",
    ],
    source: ecommerceSources.cart,
    selected: true,
  },
  {
    id: "begin_checkout",
    group: "Kassa",
    eventName: "begin_checkout",
    title: "Kassan aloittaminen",
    purpose: "Lähetetään, kun käyttäjä aloittaa kassaprosessin.",
    trigger: "Lähetä, kun käyttäjä siirtyy ostoskorista kassalle tai aloittaa kassan Osta nyt -toiminnolla. Älä lähetä pelkästä kassasivun päivityksestä, jos uutta kassayritystä ei synny.",
    parameters: [
      ...moneyParameters,
      { name: "coupon", type: "string", required: "Ei", description: "Tilauksen tasolla aktiivinen alennuskoodi." },
    ],
    code: ecommercePush("begin_checkout", `    currency: "EUR",\n    value: 164.45,\n    coupon: "SUMMER10",\n    items: [\n      ${item().replaceAll("\n", "\n      ")}\n    ]`),
    notes: [
      "Jos käyttäjä palaa ostoskoriin ja aloittaa kassan uudelleen, kyseessä voi olla uusi begin_checkout.",
      "Osta nyt -toiminnossa lähetä add_to_cart vain, jos tuote todella lisätään ostoskoriin, ja begin_checkout kassan alkaessa.",
    ],
    source: ecommerceSources.checkout,
    selected: true,
  },
  {
    id: "add_shipping_info",
    group: "Kassa",
    eventName: "add_shipping_info",
    title: "Toimitustietojen lisääminen",
    purpose: "Lähetetään, kun käyttäjä on antanut tai vahvistanut toimitustiedot ja etenee kassalla.",
    trigger: "Lähetä onnistuneen toimitusvaiheen jälkeen, ei pelkästä kentän muutoksesta.",
    parameters: [
      ...moneyParameters,
      { name: "shipping_tier", type: "string", required: "Ei", description: "Valittu toimitustapa, esimerkiksi Standard tai Express." },
      { name: "coupon", type: "string", required: "Ei", description: "Tilauksen tasolla aktiivinen alennuskoodi." },
    ],
    code: ecommercePush("add_shipping_info", `    currency: "EUR",\n    value: 164.45,\n    shipping_tier: "Standard",\n    items: [\n      ${item().replaceAll("\n", "\n      ")}\n    ]`),
    notes: [
      "value kuvaa tuotteiden arvoa eikä siihen lisätä shipping- tai tax-parametreja.",
      "SPA-kassassa estä saman vaiheen automaattisten uudelleenrenderöintien tuplat.",
    ],
    source: ecommerceSources.checkout,
    selected: true,
  },
  {
    id: "add_payment_info",
    group: "Kassa",
    eventName: "add_payment_info",
    title: "Maksutietojen lisääminen",
    purpose: "Lähetetään, kun käyttäjä antaa tai vahvistaa maksutavan ja etenee kassalla.",
    trigger: "Lähetä onnistuneen maksuvaiheen jälkeen. Älä lähetä maksutavan pelkästä näyttämisestä.",
    parameters: [
      ...moneyParameters,
      { name: "payment_type", type: "string", required: "Ei", description: "Valittu maksutapa, esimerkiksi Credit Card, PayPal tai Apple Pay." },
      { name: "coupon", type: "string", required: "Ei", description: "Tilauksen tasolla aktiivinen alennuskoodi." },
    ],
    code: ecommercePush("add_payment_info", `    currency: "EUR",\n    value: 164.45,\n    payment_type: "Credit Card",\n    items: [\n      ${item().replaceAll("\n", "\n      ")}\n    ]`),
    notes: [
      "Lähetä maksutavan vaihdosta uudelleen vain, jos käyttäjä vahvistaa uuden valinnan osana kassavaihetta.",
      "Älä lähetä korttinumeroa, tilinumeroa tai muuta maksamiseen liittyvää henkilötietoa.",
    ],
    source: ecommerceSources.checkout,
    selected: true,
  },
  {
    id: "purchase",
    group: "Tilaus",
    eventName: "purchase",
    title: "Onnistunut osto",
    purpose: "Lähetetään, kun tilaus on varmasti valmis ja palvelin on antanut yksilöllisen tilaustunnisteen.",
    trigger: "Lähetä onnistumissivulla tai palvelimen vahvistaman tilausvalmistumisen jälkeen. Älä lähetä Osta-painikkeen klikkauksesta. Estä saman transaction_id:n lähettäminen uudelleen sivun päivityksessä.",
    parameters: [
      { name: "transaction_id", type: "string", required: "Kyllä", description: "Palvelimen luoma yksilöllinen tilaustunniste." },
      { name: "currency", type: "string", required: "Jos value", description: "Valuutan ISO 4217 -koodi." },
      { name: "value", type: "number", required: "Suositeltu", description: "Tuotteiden yhteenlaskettu arvo tuotetason alennusten jälkeen. Ei sisällä veroa tai toimitusta." },
      { name: "tax", type: "number", required: "Ei", description: "Tilauksen veron määrä." },
      { name: "shipping", type: "number", required: "Ei", description: "Tilauksen toimituskulut." },
      { name: "coupon", type: "string", required: "Ei", description: "Tilauksen tasoinen alennuskoodi." },
      { name: "items", type: "array", required: "Kyllä", description: "Ostetut tuotteet." },
    ],
    code: ecommercePush("purchase", `    transaction_id: "ORD-20260727-78432",\n    currency: "EUR",\n    value: 164.45,\n    tax: 39.47,\n    shipping: 4.90,\n    coupon: "SUMMER10",\n    items: [\n      ${item().replaceAll("\n", "\n      ")}\n    ]`),
    notes: [
      "transaction_id:n tulee olla sama kaikissa järjestelmissä, mutta se ei saa sisältää henkilötietoa.",
      "Säilytä purchase-data palvelimella tai sivun lähdedatassa niin, ettei tapahtuma katoa maksupalvelusta palaamisen ajoitusvirheeseen.",
      "Testaa tuplien esto samalla transaction_id:llä.",
    ],
    source: ecommerceSources.purchase,
    selected: true,
  },
  {
    id: "refund",
    group: "Tilaus",
    eventName: "refund",
    title: "Palautus",
    purpose: "Lähetetään, kun koko tilaus tai osa tilauksesta on hyvitetty.",
    trigger: "Lähetä palautuksen vahvistumisen jälkeen. Luotettavin toteutus tehdään yleensä palvelinpuolelta tai taustajärjestelmästä, koska palautus ei tavallisesti tapahdu selaimessa.",
    parameters: [
      { name: "transaction_id", type: "string", required: "Kyllä", description: "Sama tunniste kuin alkuperäisessä purchase-tapahtumassa." },
      { name: "currency", type: "string", required: "Jos value", description: "Palautuksen valuutta." },
      { name: "value", type: "number", required: "Ei", description: "Palautettu tuotteiden arvo positiivisena lukuna." },
      { name: "tax", type: "number", required: "Ei", description: "Palautettu vero." },
      { name: "shipping", type: "number", required: "Ei", description: "Palautettu toimituskulu." },
      { name: "items", type: "array", required: "Ei", description: "Palautetut tuotteet. Suositeltu tuotetason palautusraportointia varten." },
    ],
    code: ecommercePush("refund", `    transaction_id: "ORD-20260727-78432",\n    currency: "EUR",\n    value: 89.95,\n    items: [\n      ${item().replaceAll("\n", "\n      ")}\n    ]`),
    notes: [
      "Osittaisessa palautuksessa lähetä palautetut tuotteet ja määrät.",
      "Täydessä palautuksessa pelkkä transaction_id riittää tapahtuman yhdistämiseen, mutta item-tiedot parantavat tuotetason raportointia.",
      "Älä lähetä palautussummaa negatiivisena.",
    ],
    source: ecommerceSources.purchase,
    selected: true,
  },
  {
    id: "view_promotion",
    group: "Markkinointi",
    eventName: "view_promotion",
    title: "Sisäisen kampanjan näkeminen",
    purpose: "Lähetetään, kun käyttäjä näkee sivuston sisäisen kampanjan, kuten kampanjabannerin.",
    trigger: "Lähetä, kun kampanja tulee näkyviin. Estä saman näyttökerran tuplat.",
    parameters: [
      { name: "promotion_id", type: "string", required: "Suositeltu", description: "Kampanjan vakaa tunniste." },
      { name: "promotion_name", type: "string", required: "Suositeltu", description: "Kampanjan nimi." },
      { name: "creative_name", type: "string", required: "Ei", description: "Luovan toteutuksen nimi." },
      { name: "creative_slot", type: "string", required: "Ei", description: "Kampanjan sijainti sivulla." },
      { name: "items", type: "array", required: "Ei", description: "Kampanjaan liittyvät tuotteet." },
    ],
    code: ecommercePush("view_promotion", `    promotion_id: "summer_sale_2026",\n    promotion_name: "Summer Sale",\n    creative_name: "Homepage banner",\n    creative_slot: "homepage_top",\n    items: [\n      ${item().replaceAll("\n", "\n      ")}\n    ]`),
    notes: ["Käytä samoja kampanjatunnisteita view_promotion- ja select_promotion-tapahtumissa."],
    source: ecommerceSources.promotion,
    selected: false,
  },
  {
    id: "select_promotion",
    group: "Markkinointi",
    eventName: "select_promotion",
    title: "Sisäisen kampanjan valitseminen",
    purpose: "Lähetetään, kun käyttäjä valitsee sivuston sisäisen kampanjan.",
    trigger: "Lähetä kampanjan klikkauksesta tai vastaavasta yksiselitteisestä valinnasta.",
    parameters: [
      { name: "promotion_id", type: "string", required: "Suositeltu", description: "Kampanjan vakaa tunniste." },
      { name: "promotion_name", type: "string", required: "Suositeltu", description: "Kampanjan nimi." },
      { name: "creative_name", type: "string", required: "Ei", description: "Luovan toteutuksen nimi." },
      { name: "creative_slot", type: "string", required: "Ei", description: "Kampanjan sijainti sivulla." },
      { name: "items", type: "array", required: "Ei", description: "Valittuun kampanjaan liittyvä tuote." },
    ],
    code: ecommercePush("select_promotion", `    promotion_id: "summer_sale_2026",\n    promotion_name: "Summer Sale",\n    creative_name: "Homepage banner",\n    creative_slot: "homepage_top",\n    items: [\n      ${item().replaceAll("\n", "\n      ")}\n    ]`),
    notes: ["Älä lähetä kampanjaklikkausta select_item-tapahtumana, jos kyse on sisäisestä kampanjasta eikä tuotelistasta."],
    source: ecommerceSources.promotion,
    selected: false,
  },
  {
    id: "sign_up",
    group: "Käyttäjä",
    eventName: "sign_up",
    title: "Tilin luominen",
    purpose: "Lähetetään, kun uusi käyttäjätili on luotu onnistuneesti.",
    trigger: "Lähetä vasta palvelimen vahvistettua tilin luomisen. Monivaiheisessa rekisteröitymisessä tapahtuma kuuluu viimeiseen onnistuneeseen vaiheeseen.",
    parameters: [{ name: "method", type: "string", required: "Ei", description: "Rekisteröitymistapa, esimerkiksi Email, Google tai Apple." }],
    code: `window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "sign_up",
  method: "Email"
});`,
    notes: [
      "Älä lähetä epäonnistuneesta rekisteröitymisestä.",
      "Älä lähetä sähköpostia, nimeä tai käyttäjätunnusta tapahtuman mukana.",
    ],
    source: `${eventsSource}#sign_up`,
    selected: true,
  },
  {
    id: "login",
    group: "Käyttäjä",
    eventName: "login",
    title: "Kirjautuminen",
    purpose: "Lähetetään, kun käyttäjä kirjautuu onnistuneesti tilille.",
    trigger: "Lähetä vasta koko kirjautumisen, mahdollinen 2FA mukaan lukien, onnistuttua. Automaattisesta kirjautumisesta lähetä korkeintaan kerran istunnossa, jos se kuuluu sovittuun mittaussuunnitelmaan.",
    parameters: [{ name: "method", type: "string", required: "Ei", description: "Kirjautumistapa, esimerkiksi Email, Google, Apple tai SSO." }],
    code: `window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "login",
  method: "Google"
});`,
    notes: [
      "Älä lähetä epäonnistuneesta kirjautumisesta.",
      "Älä lähetä sähköpostia, nimeä tai käyttäjätunnusta tapahtuman mukana.",
    ],
    source: `${eventsSource}#login`,
    selected: true,
  },
];

// Establish the shared implementation contract first, then list events by business priority.
const priorityOrder = [
  "implementation",
  "consent",
  "items",
  "purchase",
  "refund",
  "begin_checkout",
  "add_payment_info",
  "add_shipping_info",
  "add_to_cart",
  "view_cart",
  "view_item",
  "select_item",
  "view_item_list",
  "remove_from_cart",
  "add_to_wishlist",
  "select_promotion",
  "view_promotion",
  "sign_up",
  "login",
] as const;

const priorityById = new Map(priorityOrder.map((id, index) => [id, index]));

export const initialSections = [...sectionDefinitions].sort(
  (a, b) => (priorityById.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (priorityById.get(b.id) ?? Number.MAX_SAFE_INTEGER),
);

export const createInitialState = (): DocumentState => ({
  version: 1,
  settings: {
    title: "Verkkokaupan dataLayer-dokumentaatio",
    clientName: "",
    platform: "",
    currency: "EUR",
    documentVersion: "1.0",
    notes: "",
  },
  sections: structuredClone(initialSections),
});

export function parseSavedState(value: string): DocumentState {
  const parsed = JSON.parse(value) as DocumentState;
  if (parsed?.version !== 1 || !parsed.settings || !Array.isArray(parsed.sections)) throw new Error("Tallennettu luonnos ei ole yhteensopiva.");
  const byId = new Map(parsed.sections.map((section) => [section.id, section]));
  const known = initialSections.map((section) => byId.get(section.id) ? { ...structuredClone(section), ...byId.get(section.id) } : structuredClone(section));
  const order = new Map(parsed.sections.map((section, index) => [section.id, index]));
  known.sort((a, b) => (order.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.id) ?? Number.MAX_SAFE_INTEGER));
  return { version: 1, settings: { ...createInitialState().settings, ...parsed.settings }, sections: known };
}

const clean = (value: string) => value.trim();
const escapeTable = (value: string) => clean(value).replaceAll("|", "\\|").replaceAll("\n", " ");

export function selectedSections(state: DocumentState) {
  return state.sections.filter(({ selected }) => selected);
}

export function documentFilename(state: DocumentState, extension: string) {
  const base = state.settings.clientName || "datalayer-dokumentaatio";
  const slug = base.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "datalayer-dokumentaatio";
  return `${slug}-datalayer.${extension}`;
}

export function buildMarkdown(state: DocumentState) {
  const { settings } = state;
  const metadata = [
    settings.clientName && `**Asiakas:** ${clean(settings.clientName)}`,
    settings.platform && `**Verkkokauppa-alusta:** ${clean(settings.platform)}`,
    settings.currency && `**Valuutta:** ${clean(settings.currency)}`,
    settings.documentVersion && `**Versio:** ${clean(settings.documentVersion)}`,
  ].filter(Boolean).join("  \n");
  const intro = settings.notes.trim() ? `\n\n## Projektin lisähuomiot\n\n${clean(settings.notes)}` : "";
  const body = selectedSections(state).map((section) => {
    const parameters = section.parameters.length ? `\n\n### Parametrit\n\n| Parametri | Tyyppi | Pakollinen | Kuvaus |\n| --- | --- | --- | --- |\n${section.parameters.map((parameter) => `| \`${escapeTable(parameter.name)}\` | ${escapeTable(parameter.type)} | ${parameter.required} | ${escapeTable(parameter.description)} |`).join("\n")}` : "";
    const code = section.code.trim() ? `\n\n### Esimerkki\n\n\`\`\`javascript\n${section.code.trim()}\n\`\`\`` : "";
    const notes = section.notes.filter((note) => note.trim()).length ? `\n\n### Erityistapaukset ja tarkistukset\n\n${section.notes.filter((note) => note.trim()).map((note) => `- ${clean(note)}`).join("\n")}` : "";
    const source = section.source.trim() ? `\n\n[Lähde: Google Developers](${section.source.trim()})` : "";
    return `## ${clean(section.title)}${section.eventName ? ` (\`${section.eventName}\`)` : ""}\n\n**Tarkoitus:** ${clean(section.purpose)}\n\n**Laukaisu ja toteutus:** ${clean(section.trigger)}${parameters}${code}${notes}${source}`;
  }).join("\n\n---\n\n");
  return `# ${clean(settings.title) || "Verkkokaupan dataLayer-dokumentaatio"}\n\n${metadata || "*Projektitiedot täydennetään ennen toimitusta.*"}${intro}\n\n${body}\n`;
}

export async function buildDocxBlob(state: DocumentState, logoOverride?: ArrayBuffer) {
  const {
    AlignmentType, Bookmark, BorderStyle, Document, ExternalHyperlink, Footer, Header,
    HeadingLevel, ImageRun, InternalHyperlink, PageNumber, PageOrientation, Packer,
    Paragraph, ShadingType, Table, TableCell, TableLayoutType, TableRow, TextRun,
    VerticalAlign, WidthType,
  } = await import("docx");

  const colors = {
    ink: "24222B",
    muted: "6D6976",
    accent: "5B46B8",
    accentSoft: "EEEAFB",
    line: "DDD9E5",
    code: "F4F3F8",
    note: "FFF7D6",
    pop: "E8C83E",
    white: "FFFFFF",
  };
  const page = {
    size: { width: 11906, height: 16838, orientation: PageOrientation.PORTRAIT },
    margin: { top: 1134, right: 1134, bottom: 1134, left: 1134, header: 600, footer: 600 },
  };
  const contentWidth = 9638;
  const noBorders = {
    top: { style: BorderStyle.NONE, size: 0, color: colors.white },
    bottom: { style: BorderStyle.NONE, size: 0, color: colors.white },
    left: { style: BorderStyle.NONE, size: 0, color: colors.white },
    right: { style: BorderStyle.NONE, size: 0, color: colors.white },
    insideHorizontal: { style: BorderStyle.NONE, size: 0, color: colors.white },
    insideVertical: { style: BorderStyle.NONE, size: 0, color: colors.white },
  };
  const tableBorders = {
    top: { style: BorderStyle.SINGLE, size: 4, color: colors.line },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: colors.line },
    left: { style: BorderStyle.SINGLE, size: 4, color: colors.line },
    right: { style: BorderStyle.SINGLE, size: 4, color: colors.line },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: colors.line },
    insideVertical: { style: BorderStyle.SINGLE, size: 4, color: colors.line },
  };
  const version = state.settings.documentVersion.trim() || "1.0";
  const exportDate = new Intl.DateTimeFormat("fi-FI", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date());

  let logoData = logoOverride;
  if (!logoData && typeof window !== "undefined") {
    try {
      const response = await fetch(new URL("/nk-logo-docx.png", window.location.href));
      if (response.ok) logoData = await response.arrayBuffer();
    } catch {
      // The textual NK fallback below keeps server-side and test exports functional.
    }
  }
  const logo = () => logoData
    ? new ImageRun({ type: "png", data: logoData, transformation: { width: 105, height: 74 } })
    : new TextRun({ text: "NK", font: "Georgia", size: 34, bold: true, color: colors.ink });

  const metadataRow = (label: string, value: string) => new TableRow({
    cantSplit: true,
    children: [
      new TableCell({
        width: { size: 2200, type: WidthType.DXA },
        margins: { top: 100, bottom: 100, left: 0, right: 180 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ children: [new TextRun({ text: label.toUpperCase(), bold: true, color: colors.accent, size: 18, characterSpacing: 18 })] })],
      }),
      new TableCell({
        width: { size: 7438, type: WidthType.DXA },
        margins: { top: 100, bottom: 100, left: 0, right: 0 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ children: [new TextRun({ text: value || "-", color: colors.ink, size: 22 })] })],
      }),
    ],
  });

  const coverChildren = [
    new Paragraph({ children: [logo()], spacing: { after: 980 } }),
    new Paragraph({ children: [new TextRun({ text: "DATALAYER-TOTEUTUSOHJE", bold: true, color: colors.accent, size: 19, characterSpacing: 40 })], spacing: { after: 180 } }),
    new Paragraph({ children: [new TextRun({ text: state.settings.title || "Verkkokaupan dataLayer-dokumentaatio", bold: true, font: "Georgia", size: 58, color: colors.ink })], spacing: { after: 220 }, keepNext: true }),
    new Paragraph({ children: [new TextRun({ text: state.settings.clientName || "Asiakkaan nimi", font: "Arial", size: 28, color: colors.muted })], spacing: { after: 720 } }),
    new Table({
      width: { size: contentWidth, type: WidthType.DXA },
      columnWidths: [2200, 7438],
      layout: TableLayoutType.FIXED,
      borders: noBorders,
      rows: [
        metadataRow("Asiakas", state.settings.clientName),
        metadataRow("Alusta", state.settings.platform),
        metadataRow("Valuutta", state.settings.currency || "EUR"),
        metadataRow("Versio", version),
        metadataRow("Päivämäärä", exportDate),
      ],
    }),
    new Paragraph({ spacing: { before: 900, after: 80 }, children: [new TextRun({ text: "Niko Karppinen", bold: true, size: 22, color: colors.ink })] }),
    new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "Funky Analytics", color: colors.accent, size: 20 })] }),
    new Paragraph({ children: [new TextRun({ text: "nicknoir@gmail.com  ·  karppinen.one", color: colors.muted, size: 18 })] }),
  ];

  const parameterRows = (parameters: DocumentParameter[]) => [
    new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: ["Parametri", "Tyyppi", "Pakollinen", "Kuvaus"].map((text, index) => new TableCell({
        width: { size: [2300, 1150, 1350, 4838][index], type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: colors.accentSoft },
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ children: [new TextRun({ text, bold: true, color: colors.ink, size: 18 })] })],
      })),
    }),
    ...parameters.map((parameter) => new TableRow({
      cantSplit: true,
      children: [parameter.name, parameter.type, parameter.required, parameter.description].map((text, index) => new TableCell({
        width: { size: [2300, 1150, 1350, 4838][index], type: WidthType.DXA },
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ children: [new TextRun({ text, font: index === 0 ? "Courier New" : "Arial", size: 18, bold: index === 0, color: colors.ink })] })],
      })),
    })),
  ];

  const tocEntries = [
    { id: "document-info", title: "Dokumentin tiedot", eventName: "" },
    ...selectedSections(state).map((section) => ({ id: `section-${section.id}`, title: section.title, eventName: section.eventName || "" })),
  ];
  const contentChildren: InstanceType<typeof Paragraph | typeof Table>[] = [
    new Paragraph({ text: "Sisällysluettelo", heading: HeadingLevel.TITLE }),
    new Paragraph({ text: "Valitut osiot vientijärjestyksessä", style: "Subtitle" }),
    ...tocEntries.map((entry, index) => new Paragraph({
      spacing: { after: 100 },
      children: [
        new TextRun({ text: `${String(index + 1).padStart(2, "0")}  `, bold: true, color: colors.accent, size: 18 }),
        new InternalHyperlink({ anchor: entry.id, children: [new TextRun({ text: entry.title, color: colors.ink, size: 21 })] }),
        ...(entry.eventName ? [new TextRun({ text: `  ·  ${entry.eventName}`, font: "Courier New", color: colors.muted, size: 17 })] : []),
      ],
    })),
    new Paragraph({ pageBreakBefore: true, heading: HeadingLevel.HEADING_1, children: [new Bookmark({ id: "document-info", children: [new TextRun("Dokumentin tiedot")] })] }),
    new Table({
      width: { size: contentWidth, type: WidthType.DXA },
      columnWidths: [2200, 7438],
      layout: TableLayoutType.FIXED,
      borders: noBorders,
      rows: [
        metadataRow("Asiakas", state.settings.clientName),
        metadataRow("Alusta", state.settings.platform),
        metadataRow("Valuutta", state.settings.currency || "EUR"),
        metadataRow("Versio", version),
        metadataRow("Päivämäärä", exportDate),
        metadataRow("Tekijä", "Niko Karppinen · Funky Analytics"),
      ],
    }),
  ];

  if (state.settings.notes.trim()) contentChildren.push(
    new Paragraph({ text: "Projektin lisähuomiot", heading: HeadingLevel.HEADING_2 }),
    new Paragraph({ shading: { type: ShadingType.CLEAR, fill: colors.note }, border: { left: { style: BorderStyle.SINGLE, size: 16, color: colors.pop } }, indent: { left: 220, right: 180 }, spacing: { before: 80, after: 180 }, children: [new TextRun(state.settings.notes.trim())] }),
  );

  for (const section of selectedSections(state)) {
    contentChildren.push(
      new Paragraph({ heading: HeadingLevel.HEADING_1, keepNext: true, children: [new Bookmark({ id: `section-${section.id}`, children: [new TextRun(section.title)] })] }),
    );
    if (section.eventName) contentChildren.push(new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text: section.eventName, font: "Courier New", bold: true, color: colors.accent, shading: { type: ShadingType.CLEAR, fill: colors.accentSoft }, size: 19 })] }));
    contentChildren.push(
      new Paragraph({ shading: { type: ShadingType.CLEAR, fill: colors.accentSoft }, border: { left: { style: BorderStyle.SINGLE, size: 16, color: colors.accent } }, indent: { left: 220, right: 180 }, spacing: { before: 40, after: 100 }, children: [new TextRun({ text: "TARKOITUS  ", bold: true, color: colors.accent, size: 17, characterSpacing: 16 }), new TextRun(section.purpose)] }),
      new Paragraph({ shading: { type: ShadingType.CLEAR, fill: "F8F7FA" }, border: { left: { style: BorderStyle.SINGLE, size: 8, color: colors.line } }, indent: { left: 220, right: 180 }, spacing: { before: 0, after: 180 }, children: [new TextRun({ text: "LAUKAISU JA TOTEUTUS  ", bold: true, color: colors.muted, size: 17, characterSpacing: 12 }), new TextRun(section.trigger)] }),
    );
    if (section.parameters.length) contentChildren.push(
      new Paragraph({ text: "Parametrit", heading: HeadingLevel.HEADING_2, keepNext: true }),
      new Table({ width: { size: contentWidth, type: WidthType.DXA }, indent: { size: 0, type: WidthType.DXA }, columnWidths: [2300, 1150, 1350, 4838], layout: TableLayoutType.FIXED, margins: { top: 100, bottom: 100, left: 120, right: 120 }, borders: tableBorders, rows: parameterRows(section.parameters) }),
    );
    if (section.code.trim()) contentChildren.push(
      new Paragraph({ text: "Esimerkki", heading: HeadingLevel.HEADING_2, keepNext: true }),
      ...section.code.trim().split("\n").map((line, index, lines) => new Paragraph({
        shading: { type: ShadingType.CLEAR, fill: colors.code },
        border: { left: { style: BorderStyle.SINGLE, size: 12, color: colors.accent } },
        indent: { left: 220, right: 160 },
        spacing: { before: 0, after: index === lines.length - 1 ? 180 : 0, line: 250 },
        children: [new TextRun({ text: line || " ", font: "Courier New", size: 17, color: colors.ink })],
      })),
    );
    if (section.notes.some((note) => note.trim())) contentChildren.push(
      new Paragraph({ text: "Erityistapaukset ja tarkistukset", heading: HeadingLevel.HEADING_2, keepNext: true }),
      ...section.notes.filter((note) => note.trim()).map((note) => new Paragraph({ text: note.trim(), bullet: { level: 0 }, shading: { type: ShadingType.CLEAR, fill: colors.note }, spacing: { after: 80 }, indent: { right: 140 } })),
    );
    if (section.source.trim()) contentChildren.push(new Paragraph({ spacing: { before: 80, after: 220 }, children: [new ExternalHyperlink({ link: section.source, children: [new TextRun({ text: "Lähde: Google Developers", style: "Hyperlink", size: 18 })] })] }));
  }

  const runningHeader = new Header({ children: [new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: colors.accent, space: 6 } },
    spacing: { after: 80 },
    children: [new TextRun({ text: "NK  ·  DATALAYER-DOKUMENTAATIO", bold: true, color: colors.accent, size: 16, characterSpacing: 20 })],
  })] });
  const runningFooter = new Footer({ children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80 },
    children: [
      new TextRun({
        children: [`Niko Karppinen · Funky Analytics  ·  Versio ${version}  ·  Sivu `, PageNumber.CURRENT],
        color: colors.muted,
        size: 16,
      }),
    ],
  })] });

  const document = new Document({
    creator: "Niko Karppinen",
    title: state.settings.title || "Verkkokaupan dataLayer-dokumentaatio",
    subject: "Verkkokaupan dataLayer-toteutusohje",
    description: "Niko Karppisen Funky Analytics -konseptilla brändätty dataLayer-dokumentaatio verkkosivuston kehittäjälle.",
    features: { updateFields: true },
    styles: {
      default: { document: { run: { font: "Arial", size: 21, color: colors.ink }, paragraph: { spacing: { after: 140, line: 300 } } } },
      paragraphStyles: [
        { id: "Title", name: "Title", basedOn: "Normal", next: "Subtitle", run: { font: "Georgia", size: 50, bold: true, color: colors.ink }, paragraph: { spacing: { before: 0, after: 100 }, keepNext: true } },
        { id: "Subtitle", name: "Subtitle", basedOn: "Normal", next: "Normal", run: { font: "Arial", size: 20, color: colors.muted }, paragraph: { spacing: { before: 0, after: 320 } } },
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: "Georgia", size: 36, bold: true, color: colors.ink }, paragraph: { spacing: { before: 380, after: 160 }, keepNext: true } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: "Arial", size: 24, bold: true, color: colors.accent }, paragraph: { spacing: { before: 260, after: 100 }, keepNext: true } },
      ],
    },
    sections: [
      { properties: { page }, children: coverChildren },
      { properties: { page }, headers: { default: runningHeader }, footers: { default: runningFooter }, children: contentChildren },
    ],
  });
  return Packer.toBlob(document);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
