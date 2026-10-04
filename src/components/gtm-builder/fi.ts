// Finnish display copy for the GTM builder. The engine and the exported container
// stay English (tag, trigger and variable names are identical in both languages);
// these maps only translate what the UI shows. Unknown keys fall back to English.

export const FI_DESCRIPTIONS: Record<string, string> = {
  page_view: "Pakollinen Google-tagi, joka lähettää sivun katselun jokaiselta sivulta.",
  supported_ecommerce_events: "Lähettää kaikki 13 tuettua verkkokaupan tapahtumaa yhden yhteisen tagin kautta.",
  view_item_list: "Tuotelista tulee näkyviin.",
  select_item: "Kävijä valitsee tuotteen listalta.",
  view_item: "Tuotesivu näytetään.",
  add_to_wishlist: "Tuote tallennetaan toivelistalle.",
  add_to_cart: "Tuote lisätään ostoskoriin.",
  remove_from_cart: "Tuote poistetaan ostoskorista.",
  view_cart: "Ostoskorin sisältöä katsotaan.",
  begin_checkout: "Kävijä siirtyy kassalle.",
  add_shipping_info: "Toimitustiedot lähetetään.",
  add_payment_info: "Maksutiedot lähetetään.",
  purchase: "Tilaus valmistuu.",
  view_promotion: "Sisäistä kampanjaa katsotaan.",
  select_promotion: "Sisäinen kampanja valitaan.",
};

export const FI_GROUPS: Record<string, string> = {
  "Page views": "Sivun katselut",
  Ecommerce: "Verkkokauppa",
  Browse: "Selaus",
  Cart: "Ostoskori",
  Checkout: "Kassa",
  Promotions: "Kampanjat",
};

export const FI_NECESSITY: Record<string, string> = {
  required: "Pakollinen",
  essential: "Keskeinen",
  recommended: "Suositeltu",
  optional: "Valinnainen",
};

// validateBuilder() messages, keyed by the English text it returns.
export const FI_MESSAGES: Record<string, string> = {
  "Choose at least one tag.": "Valitse vähintään yksi tagi.",
  "The GA4 page view tag is required.": "GA4:n sivun katselun tagi on pakollinen.",
  "GA4 measurement ID must start with G- and use uppercase letters or numbers.": "GA4-mittaustunnuksen pitää alkaa merkeillä G- ja sisältää vain isoja kirjaimia tai numeroita.",
  "Company suffix is required.": "Yrityksen tunniste on pakollinen.",
  "Default currency must be a three-letter uppercase code.": "Oletusvaluutan pitää olla kolmikirjaiminen koodi isoilla kirjaimilla.",
  "Container name is required.": "Säiliön nimi on pakollinen.",
  "Output filename must end with .json.": "Tiedostonimen päätteen pitää olla .json.",
  "This is a small selection. Confirm that it covers the full customer journey you measure.": "Valinta on suppea. Varmista, että se kattaa koko mittaamasi asiakaspolun.",
};
