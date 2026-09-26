// toolkit entries — single source for the Toolkit mega menu and the /[slug]/ pages.
// add an entry here and the nav + page appear in both languages.
export const toolkit = [
  {
    slug: "tools",
    fiSlug: "tyokalut",
    en: {
      label: "Tools",
      // documentTitle overrides the SERP title only; the nav + h1 keep the short label
      documentTitle: "Analytics & SEO Toolkit | Niko Karppinen",
      desc: "Free tools for analytics work: build GTM containers, generate dataLayer documentation, score metric quality and style Cookiebot consent banners.",
    },
    fi: {
      label: "Työkalut",
      documentTitle: "Analytiikan ja SEO:n työkalupakki | Niko Karppinen",
      desc: "Ilmaisia työkaluja analytiikkatyöhön: rakenna GTM-säiliöitä, generoi dataLayer-dokumentaatio, pisteytä mittareita ja muotoile Cookiebot-banneri.",
    },
  },
  {
    slug: "templates",
    fiSlug: "toteutusmallit",
    en: {
      label: "Implementation Templates",
      desc: "Reusable GTM containers, schema examples, tracking setups and technical implementation patterns.",
    },
    fi: {
      label: "Toteutusmallit",
      desc: "Kopioitavia malleja GTM-toteutuksiin, schema-rakenteisiin, seurantaan ja teknisiin määrityksiin.",
    },
  },
];
