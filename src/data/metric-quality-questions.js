export const metricQualityTiers = {
  fi: [
  {
    key: "A",
    tier: "Taso A",
    title: "Yhteys liiketoimintaan",
    questions: [
      {
        id: "q1",
        q: "Onko mittarin yhteys liiketoiminnan tavoitteeseen kuvattu?",
        hint: "Nimeä tavoite ja perustele, miten mittari liittyy siihen.",
        gap: "Kuvaa mittarin yhteys liiketoiminnan tavoitteeseen.",

      },
      {
        id: "q2",
        q: "Tiedetäänkö, millä toimilla mittarin kuvaamaan tulokseen voidaan vaikuttaa?",
        hint: "Nimeä vaikutuskeino tai yhteys tuloksen ajureihin. Erota oletettu yhteys osoitetusta vaikutuksesta.",
        gap: "Kuvaa toimet, joilla tulokseen voidaan vaikuttaa.",

      }
    ]
  },
  {
    key: "B",
    tier: "Taso B",
    title: "Päätökset ja vaikutus",
    questions: [
      {
        id: "q3",
        q: "Onko määritelty, mitä päätöstä mittarin muutos auttaa tekemään?",
        hint: "Nimeä päätös ja jatkotoimi. Myös päätös selvittää muutoksen syy kelpaa.",
        gap: "Määrittele päätös, jota mittarin muutos tukee.",

      },
      {
        id: "q4",
        q: "Onko määritelty, miten mittarin muutosta tulkitaan suhteessa tavoitteeseen?",
        hint: "Kuvaa, mitä kasvu tai lasku kertoo tavoitteesta. Diagnostisen mittarin muutosta voi tulkita yhdessä muiden havaintojen kanssa. Myös rajattuun tavoitteeseen määräajassa kertyvä määrä voi osoittaa edistymistä; rajaamaton kertymä ilman tavoitetta tai vertailukohtaa ei riitä.",
        gap: "Määrittele, miten tulkitset mittarin muutosta suhteessa tavoitteeseen ja mitä muita havaintoja tarvitset.",

      },
      {
        id: "q5",
        q: "Onko mittarin rinnalla laatu- tai vastamittari?",
        hint: "Seuraa esimerkiksi liidimäärän rinnalla liidien muuttumista kaupoiksi, jotta laadun heikkeneminen huomataan.",
        gap: "Valitse rinnalle laatu- tai vastamittari.",

      }
    ]
  },
  {
    key: "C",
    tier: "Taso C",
    title: "Mittarin luotettavuus",
    questions: [
      {
        id: "q6",
        q: "Onko mittarin laskentatapa dokumentoitu niin, että toinen henkilö voi toistaa laskennan?",
        hint: "Kirjaa tietolähde, kaava, aikajakso ja mukaan otettavat havainnot.",
        gap: "Dokumentoi laskentatapa ja tietolähde.",

      },
      {
        id: "q7",
        q: "Voiko mittarin muutosta tarkastella päätöksen kannalta olennaisissa ryhmissä?",
        hint: "Esimerkiksi asiakasryhmä, tuote tai kanava. Mittarin ei tarvitse soveltua kaikkiin ryhmiin.",
        gap: "Mahdollista tarkastelu päätöksen kannalta olennaisissa ryhmissä.",

      },
      {
        id: "q8",
        q: "Onko lähdedatan laatu tarkistettu käyttötarkoitukseen riittäväksi?",
        hint: "Tarkista esimerkiksi puuttuvat havainnot, kaksoiskirjaukset ja bottien vaikutus.",
        gap: "Tarkista lähdedatan laatu ja korjaa käyttöä haittaavat puutteet.",

      },
      {
        id: "q9",
        q: "Voiko mittarin muutosta verrata tarkoituksenmukaiseen vertailukohtaan?",
        hint: "Huomioi vertailujakso, kausivaihtelu, havaintomäärä ja mittaustavan muutokset.",
        gap: "Määrittele vertailukohta ja vertailun rajoitteet.",

      },
      {
        id: "q10",
        q: "Onko tunnistettu, miten mittarin arvo voisi parantua ilman tavoiteltua hyötyä?",
        hint: "Kuvaa harhaanjohtavan parantamisen riski ja miten se huomataan.",
        gap: "Kirjaa harhaanjohtavan parantamisen riski ja sen havaitsemistapa.",

      }
    ]
  }
],
  en: [
  {
    key: "A",
    tier: "Tier A",
    title: "Business relevance",
    questions: [
      {
        id: "q1",
        q: "Is the metric’s connection to a business goal documented?",
        hint: "Name the goal and explain how the metric relates to it.",
        gap: "Document the metric’s connection to a business goal.",

      },
      {
        id: "q2",
        q: "Do you know which actions can influence the outcome the metric describes?",
        hint: "Name an action or a link to outcome drivers. Distinguish an assumed relationship from demonstrated impact.",
        gap: "Describe the actions that can influence the outcome.",

      }
    ]
  },
  {
    key: "B",
    tier: "Tier B",
    title: "Decisions and impact",
    questions: [
      {
        id: "q3",
        q: "Is it defined which decision a change in the metric helps you make?",
        hint: "Name the decision and follow-up action. Deciding to investigate the change also counts.",
        gap: "Define the decision that a change in the metric supports.",

      },
      {
        id: "q4",
        q: "Is it defined how changes in the metric are interpreted in relation to the goal?",
        hint: "Describe what a rise or fall means for the goal. A diagnostic metric can be interpreted alongside other observations. A cumulative count toward a defined goal within a set period can also show progress; an unbounded total without a goal or baseline is not enough.",
        gap: "Define how to interpret changes in relation to the goal and which other observations you need.",

      },
      {
        id: "q5",
        q: "Is the metric paired with a quality or counter metric?",
        hint: "For example, track lead-to-deal conversion alongside lead volume to spot declining quality.",
        gap: "Choose a quality or counter metric to track alongside it.",

      }
    ]
  },
  {
    key: "C",
    tier: "Tier C",
    title: "Metric reliability",
    questions: [
      {
        id: "q6",
        q: "Is the calculation documented so another person can reproduce it?",
        hint: "Record the data source, formula, time period and included observations.",
        gap: "Document the calculation and data source.",

      },
      {
        id: "q7",
        q: "Can changes be examined within groups relevant to the decision?",
        hint: "For example, customer group, product or channel. The metric does not have to work for every group.",
        gap: "Enable analysis within groups relevant to the decision.",

      },
      {
        id: "q8",
        q: "Has source data quality been checked for the intended use?",
        hint: "Check for missing observations, duplicate records and bot activity, for example.",
        gap: "Check source data quality and fix issues that affect its use.",

      },
      {
        id: "q9",
        q: "Can changes be compared against a suitable baseline?",
        hint: "Consider the comparison period, seasonality, sample size and changes in measurement.",
        gap: "Define a baseline and the limits of the comparison.",

      },
      {
        id: "q10",
        q: "Have you identified how the metric could improve without the intended benefit?",
        hint: "Describe the risk of misleading improvement and how you would detect it.",
        gap: "Record the risk of misleading improvement and how to detect it.",

      }
    ]
  }
]
};
