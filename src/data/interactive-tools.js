// Interactive Toolkit tools — .astro pages (not markdown), listed on the hub
// alongside content tools. `category` matches a toolkit.js slug. Add a `fi`
// block once a Finnish version of the tool page exists. `draft: true` keeps the
// tool out of hubs, sitemap and llms.txt and out of the production build.
export const allInteractiveTools = [
  {
    category: "tools",
    slug: "ga4-annotations",
    icon: "GA4",
    order: 7,
    en: {
      title: "GA4 annotation builder",
      summary: "Write consistent GA4 annotations with event templates and description suggestions.",
    },
    fi: {
      slug: "ga4-annotaatiot",
      title: "GA4-annotaatiotyökalu",
      summary: "Luo yhtenäiset GA4-merkinnät tapahtumapohjilla ja kirjoittamista tukevilla tekstiehdotuksilla.",
    },
  },
  {
    category: "tools",
    slug: "cookie-banner-styler",
    icon: "◧",
    order: 1,
    en: {
      title: "Cookiebot banner styler",
      summary: "Pick colours and alignment for a Cookiebot banner and copy ready CSS, HTML and JS.",
    },
    fi: {
      slug: "cookiebot-bannerin-muotoilija",
      title: "Cookiebot-bannerin muotoilija",
      summary: "Valitse Cookiebot-bannerin värit ja tasaus ja kopioi valmis CSS, HTML ja JS.",
    },
  },
  {
    category: "tools",
    slug: "metric-quality-checker",
    icon: "✓",
    order: 2,
    en: {
      title: "Metric quality checker",
      summary: "Score a metric against eight questions and see how useful it is for managing the business.",
    },
    fi: {
      slug: "mittarin-laatutarkistus",
      title: "Mittarin laatutarkistus",
      summary: "Pisteytä mittari kahdeksalla kysymyksellä ja arvioi, kuinka hyödyllinen se on liiketoiminnan johtamisessa.",
    },
  },
  {
    category: "tools",
    slug: "gtm-container-builder",
    icon: "{}",
    order: 3,
    en: {
      title: "GTM container builder",
      summary: "Customize a complete ecommerce GTM container, check its dependencies, and export import-ready JSON.",
    },
    fi: {
      slug: "gtm-sailion-rakentaja",
      title: "GTM-säiliön rakentaja",
      summary: "Muokkaa kokonainen verkkokaupan GTM-säiliö, tarkista sen riippuvuudet ja vie tuontivalmis JSON.",
    },
  },
  {
    category: "tools",
    slug: "ga4-report-builder",
    draft: true,
    icon: "▥",
    order: 4,
    en: {
      title: "GA4 report builder",
      summary: "Customize a GA4 detail report or apply a ready-made template, then open it directly in your property.",
    },
  },
  {
    category: "tools",
    slug: "datalayer-documentation-generator",
    icon: "¶",
    order: 5,
    fi: {
      slug: "datalayer-dokumentaatiogeneraattori",
      title: "dataLayer-dokumentaatiogeneraattori",
      summary: "Valitse GA4-tapahtumat, muokkaa kehittäjäohje suoraan dokumentissa ja vie valmis tiedosto.",
    },
  },
  {
    category: "tools",
    slug: "form-name-builder",
    icon: "\u25a4",
    order: 6,
    en: {
      title: "Form name builder",
      summary: "Pick a form type from a controlled taxonomy and copy the exact value to track.",
    },
    fi: {
      slug: "lomakkeiden-nimeamistyokalu",
      title: "Lomakkeiden nimeämistyökalu",
      summary: "Valitse lomaketyyppi rajatusta taksonomiasta ja kopioi tarkka arvo seurantaan.",
    },
  },
];

export const interactiveTools = allInteractiveTools.filter((t) => !t.draft);
