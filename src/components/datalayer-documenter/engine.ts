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
  { name: "value", type: "number", required: "Suositeltu", description: "Tapahtumaan liittyvien tuotteiden arvo. Ei sisällä toimituskuluja eikä veroja." },
  { name: "items", type: "array", required: "Kyllä", description: "Tapahtumaan liittyvät tuotteet." },
];

const sectionDefinitions: DocumentSection[] = [
  {
    id: "implementation",
    group: "Perusta",
    title: "Toteutuksen periaatteet",
    purpose: "Dokumentti määrittelee selaimen dataLayeriin lähetettävät GA4-tapahtumat. Sivuston toteutus vastaa oikeasta lähetyshetkestä ja tapahtuman tiedoista; Google Tag Manager lukee datan ja välittää sen sovittuihin kohteisiin.",
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
    purpose: "Consent Mode ohjaa Google-tagien toimintaa käyttäjän suostumusvalintojen perusteella. Erota dataLayer-tapahtumien lähettäminen ja suostumustilan hallinta toisistaan.",
    trigger: "Aseta suostumuksen oletustila ennen mittaustietoja lähettäviä komentoja. Päivitä tila heti samalla sivulla, kun käyttäjä muuttaa valintaansa. Jos CMP latautuu asynkronisesti, määritä oletuskomennossa tarpeeseen sopiva wait_for_update-arvo.",
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
      "Verkkokauppatapahtumia ei yleisesti tarvitse viivästää odottamaan käyttäjän hyväksyntää. Google-tagien tulee toimia kulloisenkin suostumustilan mukaisesti.",
      "Käytä GTM:n suostumuksenhallinnan mallipohjassa setDefaultConsentState- ja updateConsentState-rajapintoja.",
      "Testaa suostumuksen oletustila, päivitys ja tapahtumien lähetys GTM:n esikatselutilassa ennen julkaisua.",
    ],
    source: consentSource,
    selected: true,
  },
  {
    id: "items",
    group: "Perusta",
    title: "Items-taulukon yhteinen rakenne",
    purpose: "items-taulukko kuvaa tapahtumaan liittyvät tuotteet tai palvelut. Käytä samaa item_id-arvoa jokaisessa tapahtumassa, jotta saman tuotteen eri tapahtumat voidaan yhdistää raportoinnissa.",
    trigger: "Muodosta jokainen tuote samalla tietomallilla. Lähetä kaikki saatavilla olevat suositellut parametrit ja enintään 27 omaa parametria tuotetta kohti.",
    parameters: [
      { name: "item_id", type: "string", required: "Jompikumpi", description: "Tuotteen pysyvä tunniste, esimerkiksi SKU. Anna vähintään toinen parametreista: item_id tai item_name." },
      { name: "item_name", type: "string", required: "Jompikumpi", description: "Tuotteen nimi. Anna vähintään toinen parametreista: item_id tai item_name." },
      { name: "price", type: "number", required: "Suositeltu", description: "Yksikköhinta tuotetason alennuksen jälkeen." },
      { name: "discount", type: "number", required: "Ei", description: "Tuotekohtainen alennus yksikköä kohti. Ei prosenttiosuus." },
      { name: "quantity", type: "number", required: "Suositeltu", description: "Tuotteiden määrä. Oletusarvo GA4:ssa on 1." },
      { name: "item_brand", type: "string", required: "Ei", description: "Tuotteen brändi." },
      { name: "item_category...item_category5", type: "string", required: "Ei", description: "Tuotekategorian tasot yhdestä viiteen." },
      { name: "item_variant", type: "string", required: "Ei", description: "Variantti, kuten väri ja koko." },
      { name: "item_list_id / item_list_name", type: "string", required: "Ei", description: "Lista, jossa tuote näytettiin tai valittiin." },
      { name: "index", type: "number", required: "Ei", description: "Tuotteen järjestysnumero listalla. Numerointi alkaa nollasta." },
      { name: "coupon", type: "string", required: "Ei", description: "Tuotetason kuponki tai alennuskoodi." },
      { name: "affiliation", type: "string", required: "Ei", description: "Kauppa tai kumppani, jonka kautta tapahtuma syntyi." },
    ],
    code: item(),
    notes: [
      "Yhdessä items-taulukossa voi olla enintään 200 tuotetta.",
      "price ja discount ovat erillisiä arvoja. price on alennettu yksikköhinta ja discount alennuksen määrä yksikköä kohti.",
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
    purpose: "Tapahtuma kertoo, mitä tuotteita käyttäjälle näytetään esimerkiksi kategoriassa, hakutuloksissa, suosituksissa tai kokoelmassa.",
    trigger: "Lähetä tapahtuma tuotteiden tiedoilla, kun tuotteet tulevat näkyviin. Jos tuotteita ladataan lisää vierityksen aikana, lähetä vain uudet näkyviin tulleet tuotteet.",
    parameters: [
      { name: "item_list_id", type: "string", required: "Suositeltu", description: "Listan vakaa tunniste." },
      { name: "item_list_name", type: "string", required: "Suositeltu", description: "Listan käyttäjälle ymmärrettävä nimi." },
      { name: "items", type: "array", required: "Kyllä", description: "Näkyville tulleet tuotteet listajärjestyksessä." },
    ],
    code: ecommercePush("view_item_list", `    item_list_id: "category_shoes",\n    item_list_name: "Shoes",\n    items: [\n      ${item(',\n  index: 0,\n  item_list_id: "category_shoes",\n  item_list_name: "Shoes"').replaceAll("\n", "\n      ")}\n    ]`),
    notes: [
      "Estä saman tuotelistan näyttökertaan liittyvät päällekkäiset tapahtumat esimerkiksi IntersectionObserverin avulla ja tallentamalla tieto tapahtuman lähettämisestä.",
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
    purpose: "Tapahtuma kertoo, minkä tuotteen käyttäjä valitsee listalta.",
    trigger: "Lähetä tapahtuma klikkauksen tai muun yksiselitteisen valinnan yhteydessä. Säilytä listan tunniste, nimi ja tuotteen index samana kuin view_item_list-tapahtumassa.",
    parameters: [
      { name: "item_list_id", type: "string", required: "Suositeltu", description: "Lista, josta tuote valittiin." },
      { name: "item_list_name", type: "string", required: "Suositeltu", description: "Listan nimi." },
      { name: "items", type: "array", required: "Kyllä", description: "Valittu tuote. Lähetä vain valittu tuote." },
    ],
    code: ecommercePush("select_item", `    item_list_id: "category_shoes",\n    item_list_name: "Shoes",\n    items: [\n      ${item(',\n  index: 0,\n  item_list_id: "category_shoes",\n  item_list_name: "Shoes"').replaceAll("\n", "\n      ")}\n    ]`),
    notes: ["Älä lähetä select_item-tapahtumaa pelkästään siksi, että osoitin viedään tuotteen päälle tai lista näytetään käyttäjälle."],
    source: ecommerceSources.itemList,
    selected: false,
  },
  {
    id: "view_item",
    group: "Selaus",
    eventName: "view_item",
    title: "Tuotetietojen katsominen",
    purpose: "Tapahtuma kertoo, minkä tuotteen yksityiskohtaisia tietoja käyttäjä katsoo.",
    trigger: "Lähetä tapahtuma, kun tuotteen yksityiskohtaiset tiedot on näytetty käyttäjälle. Lähetä tapahtuma uudelleen, jos käyttäjän valitsema variantti vaihtaa seurattavaa tuotetta tai hintaa.",
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
    purpose: "Tapahtuma kertoo, mitä tuotteita käyttäjä lisää toivelistalle.",
    trigger: "Lähetä add_to_wishlist-tapahtuma vasta, kun tuotteet on lisätty toivelistalle onnistuneesti.",
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
    purpose: "Tapahtuma kertoo, mitä tuotteita käyttäjä lisää ostoskoriin ja kuinka monta.",
    trigger: "Lähetä add_to_cart-tapahtuma vasta, kun tuotteet on lisätty ostoskoriin onnistuneesti.",
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
    purpose: "Tapahtuma kertoo, mitä tuotteita käyttäjä poistaa ostoskorista ja kuinka monta.",
    trigger: "Lähetä remove_from_cart-tapahtuma vasta, kun ostoskori on päivittynyt onnistuneesti.",
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
    purpose: "Tapahtuma kertoo, mitä tuotteita ostoskorissa on, kun käyttäjä katsoo sen sisältöä.",
    trigger: "Lähetä tapahtuma ostoskorisivun latauduttua tai varsinaisen ostoskoripaneelin avauduttua. Älä lähetä tapahtumaa esikatselusta, joka avautuu, kun osoitin viedään ostoskorin kuvakkeen päälle.",
    parameters: moneyParameters,
    code: ecommercePush("view_cart", `    currency: "EUR",\n    value: 164.45,\n    items: [\n      ${item().replaceAll("\n", "\n      ")}\n    ]`),
    notes: [
      "Tyhjästä ostoskorista voidaan lähettää value: 0 ja tyhjä items-taulukko.",
      "Jos avoimen ostoskorin sisältö muuttuu, lähetä uusi view_cart vain, jos uusi näkymä vastaa toteutuksen määriteltyä näyttökertaa. Estä näkymän päivityksistä aiheutuvat päällekkäiset tapahtumat.",
    ],
    source: ecommerceSources.cart,
    selected: true,
  },
  {
    id: "begin_checkout",
    group: "Kassa",
    eventName: "begin_checkout",
    title: "Kassaprosessin aloittaminen",
    purpose: "Tapahtuma kertoo, että käyttäjä aloittaa kassaprosessin.",
    trigger: "Lähetä tapahtuma, kun käyttäjä siirtyy ostoskorista kassalle tai aloittaa kassaprosessin Osta nyt -toiminnolla. Älä lähetä tapahtumaa pelkästä kassasivun päivityksestä, jos uutta kassaprosessia ei synny.",
    parameters: [
      ...moneyParameters,
      { name: "coupon", type: "string", required: "Ei", description: "Koko tilaukseen sovellettava alennuskoodi." },
    ],
    code: ecommercePush("begin_checkout", `    currency: "EUR",\n    value: 164.45,\n    coupon: "SUMMER10",\n    items: [\n      ${item().replaceAll("\n", "\n      ")}\n    ]`),
    notes: [
      "Jos käyttäjä palaa ostoskoriin ja aloittaa kassaprosessin uudelleen, kyseessä voi olla uusi begin_checkout.",
      "Osta nyt -toiminnossa lähetä add_to_cart vain, jos tuote todella lisätään ostoskoriin, ja begin_checkout kassaprosessin alkaessa.",
    ],
    source: ecommerceSources.checkout,
    selected: true,
  },
  {
    id: "add_shipping_info",
    group: "Kassa",
    eventName: "add_shipping_info",
    title: "Toimitustietojen lisääminen",
    purpose: "Tapahtuma kertoo, että käyttäjä on antanut tai vahvistanut toimitustiedot ja edennyt kassalla.",
    trigger: "Lähetä tapahtuma onnistuneen toimitusvaiheen jälkeen, ei pelkästä kentän muutoksesta.",
    parameters: [
      ...moneyParameters,
      { name: "shipping_tier", type: "string", required: "Ei", description: "Valittu toimitustapa, esimerkiksi Standard tai Express." },
      { name: "coupon", type: "string", required: "Ei", description: "Koko tilaukseen sovellettava alennuskoodi." },
    ],
    code: ecommercePush("add_shipping_info", `    currency: "EUR",\n    value: 164.45,\n    shipping_tier: "Standard",\n    items: [\n      ${item().replaceAll("\n", "\n      ")}\n    ]`),
    notes: [
      "value kuvaa tuotteiden arvoa, eikä siihen lasketa mukaan toimituskuluja tai veroja.",
      "Estä SPA-toteutuksessa kassavaiheen automaattisista näkymän päivityksistä aiheutuvat päällekkäiset tapahtumat.",
    ],
    source: ecommerceSources.checkout,
    selected: true,
  },
  {
    id: "add_payment_info",
    group: "Kassa",
    eventName: "add_payment_info",
    title: "Maksutietojen lisääminen",
    purpose: "Tapahtuma kertoo, että käyttäjä on antanut tai vahvistanut maksutavan ja edennyt kassalla.",
    trigger: "Lähetä tapahtuma onnistuneen maksuvaiheen jälkeen. Älä lähetä tapahtumaa pelkästään siksi, että maksutapa näytetään käyttäjälle.",
    parameters: [
      ...moneyParameters,
      { name: "payment_type", type: "string", required: "Ei", description: "Valittu maksutapa, esimerkiksi Credit Card, PayPal tai Apple Pay." },
      { name: "coupon", type: "string", required: "Ei", description: "Koko tilaukseen sovellettava alennuskoodi." },
    ],
    code: ecommercePush("add_payment_info", `    currency: "EUR",\n    value: 164.45,\n    payment_type: "Credit Card",\n    items: [\n      ${item().replaceAll("\n", "\n      ")}\n    ]`),
    notes: [
      "Lähetä tapahtuma maksutavan vaihdosta uudelleen vain, jos käyttäjä vahvistaa uuden valinnan osana kassavaihetta.",
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
    purpose: "Tapahtuma kertoo valmistuneesta tilauksesta, jolle palvelin on antanut yksilöllisen tilaustunnisteen.",
    trigger: "Lähetä tapahtuma tilausvahvistussivulla tai sen jälkeen, kun palvelin on vahvistanut tilauksen valmistumisen. Älä lähetä tapahtumaa Osta-painikkeen klikkauksesta. Estä saman transaction_id:n lähettäminen uudelleen sivun päivityksessä.",
    parameters: [
      { name: "transaction_id", type: "string", required: "Kyllä", description: "Palvelimen luoma yksilöllinen tilaustunniste." },
      { name: "currency", type: "string", required: "Jos value", description: "Valuutan ISO 4217 -koodi." },
      { name: "value", type: "number", required: "Suositeltu", description: "Tuotteiden yhteenlaskettu arvo tuotetason alennusten jälkeen. Ei sisällä toimituskuluja eikä veroja." },
      { name: "tax", type: "number", required: "Ei", description: "Tilauksen veron määrä." },
      { name: "shipping", type: "number", required: "Ei", description: "Tilauksen toimituskulut." },
      { name: "coupon", type: "string", required: "Ei", description: "Koko tilaukseen sovellettava alennuskoodi." },
      { name: "items", type: "array", required: "Kyllä", description: "Ostetut tuotteet." },
    ],
    code: ecommercePush("purchase", `    transaction_id: "ORD-20260727-78432",\n    currency: "EUR",\n    value: 164.45,\n    tax: 39.47,\n    shipping: 4.90,\n    coupon: "SUMMER10",\n    items: [\n      ${item().replaceAll("\n", "\n      ")}\n    ]`),
    notes: [
      "transaction_id:n tulee olla sama kaikissa järjestelmissä, mutta se ei saa sisältää henkilötietoa.",
      "Säilytä purchase-tapahtuman tiedot palvelimella tai sivun lähdedatassa niin, ettei tapahtuma katoa maksupalvelusta palaamisen ajoitusvirheeseen.",
      "Testaa päällekkäisten tapahtumien estäminen samalla transaction_id:llä.",
    ],
    source: ecommerceSources.purchase,
    selected: true,
  },
  {
    id: "refund",
    group: "Tilaus",
    eventName: "refund",
    title: "Palautus",
    purpose: "Tapahtuma kertoo koko tilauksen tai sen osan hyvityksestä.",
    trigger: "Lähetä tapahtuma palautuksen vahvistumisen jälkeen. Luotettavin toteutus tehdään yleensä palvelinpuolelta tai taustajärjestelmästä, koska palautus ei tavallisesti tapahdu selaimessa.",
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
      "Täydessä palautuksessa pelkkä transaction_id riittää tapahtuman yhdistämiseen, mutta tuotetiedot parantavat tuotetason raportointia.",
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
    purpose: "Tapahtuma kertoo, minkä sivuston sisäisen kampanjan käyttäjä näkee esimerkiksi kampanjabannerissa.",
    trigger: "Lähetä tapahtuma, kun kampanja tulee näkyviin. Estä samaan näyttökertaan liittyvät päällekkäiset tapahtumat.",
    parameters: [
      { name: "promotion_id", type: "string", required: "Suositeltu", description: "Kampanjan vakaa tunniste." },
      { name: "promotion_name", type: "string", required: "Suositeltu", description: "Kampanjan nimi." },
      { name: "creative_name", type: "string", required: "Ei", description: "Kampanjamateriaalin nimi." },
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
    purpose: "Tapahtuma kertoo, minkä sivuston sisäisen kampanjan käyttäjä valitsee.",
    trigger: "Lähetä tapahtuma kampanjan klikkauksesta tai vastaavasta yksiselitteisestä valinnasta.",
    parameters: [
      { name: "promotion_id", type: "string", required: "Suositeltu", description: "Kampanjan vakaa tunniste." },
      { name: "promotion_name", type: "string", required: "Suositeltu", description: "Kampanjan nimi." },
      { name: "creative_name", type: "string", required: "Ei", description: "Kampanjamateriaalin nimi." },
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
    purpose: "Tapahtuma kertoo uuden käyttäjätilin onnistuneesta luomisesta.",
    trigger: "Lähetä tapahtuma vasta palvelimen vahvistettua tilin luomisen. Monivaiheisessa rekisteröitymisessä tapahtuma kuuluu viimeiseen onnistuneeseen vaiheeseen.",
    parameters: [{ name: "method", type: "string", required: "Ei", description: "Rekisteröitymistapa, esimerkiksi Email, Google tai Apple." }],
    code: `window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "sign_up",
  method: "Email"
});`,
    notes: [
      "Älä lähetä tapahtumaa epäonnistuneesta rekisteröitymisestä.",
      "Älä lähetä sähköpostiosoitetta, nimeä tai käyttäjätunnusta tapahtuman mukana.",
    ],
    source: `${eventsSource}#sign_up`,
    selected: true,
  },
  {
    id: "login",
    group: "Käyttäjä",
    eventName: "login",
    title: "Kirjautuminen",
    purpose: "Tapahtuma kertoo onnistuneesta kirjautumisesta käyttäjätilille.",
    trigger: "Lähetä tapahtuma vasta, kun kirjautuminen ja mahdollinen kaksivaiheinen tunnistautuminen ovat onnistuneet. Lähetä automaattisesta kirjautumisesta tapahtuma korkeintaan kerran istunnossa, jos se kuuluu sovittuun mittaussuunnitelmaan.",
    parameters: [{ name: "method", type: "string", required: "Ei", description: "Kirjautumistapa, esimerkiksi Email, Google, Apple tai SSO." }],
    code: `window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "login",
  method: "Google"
});`,
    notes: [
      "Älä lähetä tapahtumaa epäonnistuneesta kirjautumisesta.",
      "Älä lähetä sähköpostiosoitetta, nimeä tai käyttäjätunnusta tapahtuman mukana.",
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
    const parameters = section.parameters.length ? `\n\n### Parametrit\n\n| Parametri | Tyyppi | Pakollinen | Kuvaus |\n| --- | --- | --- | --- |\n${section.parameters.map((parameter) => `| \`${escapeTable(parameter.name)}\` | ${escapeTable(parameter.type)} | ${parameter.required === "Jos value" ? "Jos value annetaan" : parameter.required} | ${escapeTable(parameter.description)} |`).join("\n")}` : "";
    const code = section.code.trim() ? `\n\n### Esimerkki\n\n\`\`\`javascript\n${section.code.trim()}\n\`\`\`` : "";
    const notes = section.notes.filter((note) => note.trim()).length ? `\n\n### Erityistapaukset ja tarkistukset\n\n${section.notes.filter((note) => note.trim()).map((note) => `- ${clean(note)}`).join("\n")}` : "";
    const source = section.source.trim() ? `\n\n[Lähde: Google Developers](${section.source.trim()})` : "";
    return `## ${clean(section.title)}${section.eventName ? ` (\`${section.eventName}\`)` : ""}\n\n**Tarkoitus:** ${clean(section.purpose)}\n\n**Lähetyshetki ja toteutus:** ${clean(section.trigger)}${parameters}${code}${notes}${source}`;
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
  // Word ignores "\n" inside a run, so each typed line becomes its own run with a line break.
  const textRuns = (text: string, options: Omit<ConstructorParameters<typeof TextRun>[0] & object, "text" | "break"> = {}) =>
    text.split("\n").map((line, index) => new TextRun({ ...options, text: line, break: index ? 1 : 0 }));
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
      children: [parameter.name, parameter.type, parameter.required === "Jos value" ? "Jos value annetaan" : parameter.required, parameter.description].map((text, index) => new TableCell({
        width: { size: [2300, 1150, 1350, 4838][index], type: WidthType.DXA },
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ children: textRuns(text, { font: index === 0 ? "Courier New" : "Arial", size: 18, bold: index === 0, color: colors.ink }) })],
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
        metadataRow("Tekijä", "Niko Karppinen"),
      ],
    }),
  ];

  if (state.settings.notes.trim()) contentChildren.push(
    new Paragraph({ text: "Projektin lisähuomiot", heading: HeadingLevel.HEADING_2 }),
    new Paragraph({ shading: { type: ShadingType.CLEAR, fill: colors.note }, border: { left: { style: BorderStyle.SINGLE, size: 16, color: colors.pop } }, indent: { left: 220, right: 180 }, spacing: { before: 80, after: 180 }, children: textRuns(state.settings.notes.trim()) }),
  );

  for (const section of selectedSections(state)) {
    contentChildren.push(
      new Paragraph({ heading: HeadingLevel.HEADING_1, keepNext: true, children: [new Bookmark({ id: `section-${section.id}`, children: [new TextRun(section.title)] })] }),
    );
    if (section.eventName) contentChildren.push(new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text: section.eventName, font: "Courier New", bold: true, color: colors.accent, shading: { type: ShadingType.CLEAR, fill: colors.accentSoft }, size: 19 })] }));
    contentChildren.push(
      new Paragraph({ shading: { type: ShadingType.CLEAR, fill: colors.accentSoft }, border: { left: { style: BorderStyle.SINGLE, size: 16, color: colors.accent } }, indent: { left: 220, right: 180 }, spacing: { before: 40, after: 100 }, children: [new TextRun({ text: "TARKOITUS  ", bold: true, color: colors.accent, size: 17, characterSpacing: 16 }), ...textRuns(section.purpose.trim())] }),
      new Paragraph({ shading: { type: ShadingType.CLEAR, fill: "F8F7FA" }, border: { left: { style: BorderStyle.SINGLE, size: 8, color: colors.line } }, indent: { left: 220, right: 180 }, spacing: { before: 0, after: 180 }, children: [new TextRun({ text: "LÄHETYSHETKI JA TOTEUTUS  ", bold: true, color: colors.muted, size: 17, characterSpacing: 12 }), ...textRuns(section.trigger.trim())] }),
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
      ...section.notes.filter((note) => note.trim()).map((note) => new Paragraph({ children: textRuns(note.trim()), bullet: { level: 0 }, shading: { type: ShadingType.CLEAR, fill: colors.note }, spacing: { after: 80 }, indent: { right: 140 } })),
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
        children: [`Niko Karppinen  ·  Versio ${version}  ·  Sivu `, PageNumber.CURRENT],
        color: colors.muted,
        size: 16,
      }),
    ],
  })] });

  const document = new Document({
    creator: "Niko Karppinen",
    title: state.settings.title || "Verkkokaupan dataLayer-dokumentaatio",
    subject: "Verkkokaupan dataLayer-toteutusohje",
    description: "Niko Karppisen dataLayer-dokumentaatio verkkosivuston kehittäjälle.",
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
