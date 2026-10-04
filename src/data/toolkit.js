// toolkit entries — single source for the Toolkit mega menu and the /[slug]/ pages.
// add an entry here and the nav + page appear in both languages.
// navDesc = short line for the menus; desc = the longer page copy.
export const toolkit = [
  {
    slug: "tools",
    fiSlug: "tyokalut",
    en: {
      label: "Tools",
      // documentTitle overrides the SERP title only; the nav + h1 keep the short label
      documentTitle: "Analytics & SEO Toolkit | Niko Karppinen",
      navDesc: "GTM builder, GA4 annotations, form names and metric scoring.",
      desc: "Free tools for analytics, SEO and web work: build GTM containers, write GA4 annotations, name forms consistently and score metric quality.",
    },
    fi: {
      label: "Työkalut",
      documentTitle: "Analytiikan ja SEO:n työkalupakki | Niko Karppinen",
      navDesc: "GTM-rakentaja, dataLayer-dokumentaatio, GA4-annotaatiot ja lomakkeiden nimet.",
      desc: "Ilmaisia analytiikkatyökaluja: rakenna GTM-säiliö, luo dataLayer-dokumentaatio, kirjoita GA4-annotaatiot, nimeä lomakkeet ja pisteytä mittarit.",
    },
  },
  {
    slug: "templates",
    fiSlug: "toteutusmallit",
    en: {
      label: "Implementation Templates",
      navDesc: "Ready-made GTM, schema and tracking setups to copy.",
      desc: "Copy-ready templates for GTM implementations, schema markup, tracking and technical configuration.",
    },
    fi: {
      label: "Toteutusmallit",
      navDesc: "Valmiita GTM-, schema- ja seurantamalleja kopioitavaksi.",
      desc: "Kopioitavia malleja GTM-toteutuksiin, schema-rakenteisiin, seurantaan ja teknisiin määrityksiin.",
    },
  },
];
