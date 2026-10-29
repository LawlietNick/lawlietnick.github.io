// Finnish copy for the referral exclusions tool. An English version is payment-referrals.en.js with the same keys.
// Strings with {name} are filled in by the tool's script; strings ending in Html may hold markup.
export const fi = {
  groups: {
    banks: "Pankit ja tunnistautuminen",
    payments: "Maksupalvelut",
    cards: "Korttitunnistus (3D Secure)",
    international: "Kansainväliset palvelut",
  },
  matchLabels: {
    regex: "regex (matches RegEx)",
    contains: "sisältää (contains)",
  },
  own: {
    title: "Omat domainisi",
    hintHtml:
      "Jos sama GA4-tunnus on käytössä useammalla domainilla, lisää ne kaikki. Muuten GA4 voi laskea siirtymän domainilta toiselle uudeksi viittaukseksi ja katkaista istunnon. Listaa kaikki domainit ja niiden alidomainit (esimerkiksi <code>yritys.fi</code>, <code>www.yritys.fi</code>, <code>blog.yritys.fi</code>), ei alasivuja.",
    label: "Domainit, yksi per rivi tai pilkulla erotettuna",
    placeholder: "yritys.fi\nwww.yritys.fi\nblog.yritys.fi\nyritys.com",
    mergeHintHtml:
      "Sama nimi eri päätteillä ja alidomaineilla yhdistetään yhdeksi riviksi, esimerkiksi <code>(?:(www|blog)\\.)?yritys\\.(fi|com)</code>. Rivit tulevat listan alkuun.",
    example: "yritys.fi\nwww.yritys.fi\nblog.yritys.fi",
    tag: "Oma domain",
    exampleTag: "Esimerkki, korvaa omalla domainillasi ylhäällä",
    skipped: "Ei tunnistettu domainiksi: {list}",
  },
  use: {
    title: "Mitä käytät?",
    hint: "Kaikki on valittuna. Poista valinta palveluilta, joita et käytä, niin listalta poistuvat niiden rivit. Rivit ilman palvelua näkyvät aina.",
    legend: "Käytössä olevat palvelut",
    own: "Omat domainit",
  },
  list: {
    title: "Lista",
    hintHtml:
      "Valitse GA4:ssä <em>Referral domain</em> ja rivin ehto. Kopioi arvo napilla ja liitä se arvokenttään. GA4 sallii enintään 50 riviä per tietovirta. Ryhmän otsikosta voit yhdistää ryhmän rivit yhdeksi regexiksi. Rivin voi raahata kahvasta (<span aria-hidden=\"true\">⋮⋮</span>) toiseen tai uuteen ryhmään tai siirtää rivin ryhmävalikosta. Ryhmäjako muistetaan tässä selaimessa.",
    mergeAll: "Yhdistä kaikki ryhmät",
    unmergeAll: "Pura kaikki ryhmät",
    colDone: "Lisätty",
    colMatch: "Ehto",
    colValue: "Arvo",
    colCopy: "Kopioi",
    handleTitle: "Raahaa toiseen ryhmään",
    doneAria: "Merkitse lisätyksi: {value}",
    groupLabel: "Ryhmä",
    moveAria: "Siirrä ryhmään: {value}",
    copy: "Kopioi",
    copyAria: "Kopioi arvo {value}",
    newGroup: "+ Uusi ryhmä",
    newGroupHint: "(pudota rivi tähän tai paina)",
    groupNameAria: "Ryhmän nimi",
    merge: "Yhdistä yhdeksi regexiksi",
    removeGroup: "Poista ryhmä",
    mergedDoneAria: "Merkitse lisätyksi: yhdistetty regex",
    mergedCopyAria: "Kopioi yhdistetty regex",
    emptyGroup: "Ei rivejä. Raahaa rivi tähän tai valitse rivin ryhmävalikosta tämä ryhmä.",
  },
  big: {
    title: "Yksi iso regex",
    hintHtml:
      "Vaihtoehto riveille: kaikki listan näkyvät rivit yhtenä regexinä, riippumatta ryhmien yhdistämisestä. Omat domainisi pysyvät listassa omilla riveillään, eikä niitä tule tähän. Sisältää-ehtoiset rivit muutetaan muotoon <code>.*domain.*</code>, joten tulos toimii samoin riippumatta siitä, vertaako GA4 koko domainia vai osaa siitä.",
    maxLabel: "Enimmäispituus merkkeinä (valinnainen)",
    maxPlaceholder: "Ei rajaa",
    limitHint:
      "GA4 sallii enintään 50 riviä per tietovirta, ja yksi iso regex mahtuu siihen yhtenä rivinä. Jos asetat pituusrajan, regex jaetaan useampaan osaan rivirajoilla ja jokainen osa on oma GA4-rivinsä. GA4:n regexin pituusrajaa en ole varmistanut, joten kokeile sitä GA4:ssä.",
  },
  steps: {
    title: "Näin lisäät ne GA4:ään",
    itemsHtml: [
      "Avaa ylläpito (Admin) → tietovirrat (Data streams) → verkkovirta → <em>Configure tag settings</em> → <em>Show all</em> → <em>Luettele ei-toivotut viittaukset</em> (<em>List unwanted referrals</em>, eli viittausten poissulkeminen).",
      "Valitse <em>Referral domain</em> ja ehto taulukosta. Kopioi arvo rivin napilla ja liitä se arvokenttään.",
      "Lisää seuraava rivi napilla <em>Add condition</em> ja toista.",
      "Tallenna ja tee testiosto. Tarkista DebugView-työkalusta, ettei maksupalvelu näy uutena lähteenä.",
    ],
    rule: "Regex täsmää koko domainiin, eikä sen alku- tai loppuosaa tarvitse merkitä erikseen. GA4 lukee regexit RE2-syntaksilla.",
  },
  // Used by the script
  script: {
    rowOne: "1 rivi",
    rowMany: "{n} riviä",
    customGroup: "Oma ryhmä {n}",
    groupFallback: "Ryhmä",
    mergedTag: "Ryhmä {group}: {n} riviä yhdessä, {chars} merkkiä",
    mergeAll: "Yhdistä kaikki ryhmät",
    unmergeAll: "Pura kaikki ryhmät",
    status: "{ga} GA4-riviä (omia {own}, listasta {list}, listan rivejä ennen yhdistämistä {before}), {added} merkitty lisätyksi",
    limitWarning:
      "Huomio: GA4-rivejä tulisi {ga}, ja GA4 sallii enintään {limit} per tietovirta. Yhdistä ryhmiä yhdeksi regexiksi (ryhmän otsikossa) tai käytä yhtä isoa regexiä alempana.",
    bigStatus:
      "{rows} riviä yhdistetty {chunks} regexiksi, yhteensä {chars} merkkiä. GA4-rivejä omat domainit mukaan lukien {ga} / {limit}{over}.",
    bigOver: ". Huomio: yli rajan, kasvata pituusrajaa",
    bigEmpty: "Ei rivejä. Valitse ainakin yksi palvelu.",
    bigLength: "{n} merkkiä",
    bigLengthOver: ", ylittää rajan (yksi rivi ei jakaudu)",
    bigCopyAria: "Kopioi regex, {n} merkkiä",
    copy: "Kopioi",
    copyAria: "Kopioi arvo {value}",
    doneAria: "Merkitse lisätyksi: {value}",
    copiedRegex: "Regex kopioitu, {n} merkkiä.",
    copied: "Kopioitu: {value}",
    copyFailed: "Kopiointi ei onnistunut. Valitse teksti ja kopioi käsin.",
  },
};
