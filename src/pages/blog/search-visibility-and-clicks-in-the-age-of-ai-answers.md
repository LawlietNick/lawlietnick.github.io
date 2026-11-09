---
layout: ../../layouts/Base.astro
title: "Google’s AI answers are changing how we measure search visibility"
description: "AI visibility can grow without more organic clicks. How to interpret Google Search Console data and measure SEO results as search behaviour changes."
date: 2026-11-09
category: seo
image: /images/blog/search-visibility-and-clicks-in-the-age-of-ai-answers.jpeg
imageAlt: "A turtle studies a map and compass in the desert, with an observatory, a winding path and a glowing monolith in the distance."
imageCredit: "Generated with OpenAI ImageGen"
tags: ["SEO", "Search Console", "AI Overviews", "GEO", "reporting"]
alternate:
  lang: fi
  href: /fi/blog/hakunakyvyys-ja-klikit-ai-vastausten-aikana/
citations:
  - name: "Search Console Help: Generative AI performance report"
    url: "https://support.google.com/webmasters/answer/16984139"
  - name: "Agarwal and Sen: The Impact of Google AI Overviews on Publisher Traffic and User Experience (SSRN paper)"
    url: "https://ssrn.com/abstract=6513059"
  - name: "Pew Research Center: Google users are less likely to click on links when an AI summary appears in the results"
    url: "https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/"
---

Google Search is changing, and so is the way we should measure SEO success.

In the Search Console data I analysed across several websites, impressions in Google’s AI features grew by 79% from September to October. Over the same period, organic clicks fell by 9%.

These figures do not prove that AI answers caused the decline in clicks. They do show why search visibility and website traffic need to be examined separately.

Research also suggests that people click search results less often when Google displays an AI summary.

For SEO reporting, this raises a question: how do we assess SEO success if visibility grows but traffic does not?

Below I go through Search Console data from several websites, two studies, and how I would measure search visibility now that AI answers are part of search.

## AI visibility grew by 79%, but organic clicks fell by 9%

I compared monthly impressions from the AI report with clicks from the standard Performance report (Search type: Web) across several Finnish websites.

```chart
{
  "type": "bar",
  "wide": true,
  "title": "Monthly AI impressions, June–October",
  "desc": "June 30,000, July 39,000, August 44,000, September 47,000, October 84,000. October is 79% higher than September.",
  "caption": "Monthly AI impressions, thousands (k). Up 79% from September to October.",
  "data": [
    {
      "label": "Jun",
      "value": 30000,
      "text": "30k"
    },
    {
      "label": "Jul",
      "value": 39000,
      "text": "39k",
      "note": "+30%"
    },
    {
      "label": "Aug",
      "value": 44000,
      "text": "44k",
      "note": "+13%"
    },
    {
      "label": "Sep",
      "value": 47000,
      "text": "47k",
      "note": "+7%"
    },
    {
      "label": "Oct",
      "value": 84000,
      "text": "84k"
    }
  ],
  "badge": {
    "text": "+79%",
    "label": "October compared with September"
  }
}
```

| Month | AI impressions | Change | Clicks | Change |
| --- | --- | --- | --- | --- |
| June | 30,000 | | 28,000 | |
| July | 39,000 | +30% | 31,000 | +11% |
| August | 44,000 | +13% | 43,000 | +39% |
| September | 47,000 | +7% | 43,000 | 0% |
| October | 84,000 | +79% | 39,000 | −9% |

The figures are based on Google Search Console data. Data in the AI report is available from May onwards.

From August to October, AI impressions grew by 91% and clicks fell by 9%. From September to October, the changes were +79% and −9%.

```chart
{
  "type": "line",
  "wide": true,
  "title": "AI impressions and clicks, indexed to August = 100",
  "desc": "AI impressions: June 68, July 89, August 100, September 107, October 191. Clicks: June 65, July 72, August 100, September 100, October 91.",
  "caption": "AI impressions and clicks, indexed to August = 100. The gap widens from September to October.",
  "categories": [
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct"
  ],
  "baseline": 100,
  "series": [
    {
      "name": "Clicks",
      "values": [
        65,
        72,
        100,
        100,
        91
      ],
      "raw": [
        28000,
        31000,
        43000,
        43000,
        39000
      ],
      "endText": "−9%"
    },
    {
      "name": "AI impressions",
      "values": [
        68,
        89,
        100,
        107,
        191
      ],
      "raw": [
        30000,
        39000,
        44000,
        47000,
        84000
      ],
      "accent": true,
      "endText": "+91%"
    }
  ]
}
```

I chose August as the comparison month. June is a seasonal low for many websites. Using it as the baseline would make clicks appear to have grown by 39%, which would give a misleading picture.

This is an observation, not an experiment. I do not know why clicks fell. The cause could be AI answers, seasonality or another change.

## Google’s AI answers change clicking behaviour

My data does not explain the pattern, but two studies help interpret it. They are worth reading together because they use different methods.

The first is a randomised experiment. Saharsh Agarwal and Ananya Sen randomly assigned 1,065 US Chrome users to different groups. AI Overviews were hidden in one group and left visible in the control group. The experiment ran for two weeks in January and February 2026. For searches that would have shown an AI Overview, there were 0.37 outbound organic clicks per search when the overview was visible, compared with 0.62 when it was hidden. AI Overviews reduced clicks by 39.8%. Searches with no clicks accounted for 73% of searches when the overview was visible and 54% when it was hidden. Users’ perceptions of search result quality did not change measurably ([SSRN paper](https://ssrn.com/abstract=6513059)).

```chart
{
  "type": "hbar",
  "title": "Outbound organic clicks per search in the experiment",
  "desc": "With AI Overviews hidden, there were 0.62 clicks per search. With AI Overviews visible, there were 0.37. The difference is 39.8%.",
  "caption": "Organic clicks per search in the experiment with AI Overviews hidden and visible. Source: Agarwal and Sen, SSRN paper, not peer-reviewed.",
  "data": [
    {
      "label": "AI Overview hidden",
      "value": 0.62,
      "text": "0.62"
    },
    {
      "label": "AI Overview visible",
      "value": 0.37,
      "text": "0.37"
    }
  ],
  "delta": "−39.8%"
}
```

The study has not yet been peer-reviewed. Its data covers two weeks of activity by US desktop Chrome users. It did not examine publisher revenue.

The second is a Pew Research study. It tracked the browsing activity of 900 US adults in March 2025. Users clicked a traditional result in 8% of visits when an AI summary appeared, compared with 15% when it did not. A link within the summary itself received a click in 1% of visits ([Pew Research Center](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)). This is observational data. It shows an association but does not establish a cause.

The experiment provides stronger evidence of causation, and Pew adds a broader view of behaviour. Neither study measures Finnish searches. They cannot explain my figures, but they give us reason to question the assumption that more visibility leads to more clicks.

## Search Console shows AI visibility, but not its full impact

Search Console has a Generative AI features report. According to Google’s documentation, it counts how often links to a website appeared in AI Overviews or AI Mode answers ([Search Console Help](https://support.google.com/webmasters/answer/16984139)). The report has been available to all websites since 31 August 2026.

The report has three limits:

- It shows impressions, not clicks.
- Multiple links to the same website in a single search count as one impression.
- Search Labs experiments are excluded.

The report does not show brand mentions either. It helps to separate three things: link impressions in AI answers, brand mentions in the answer text and traffic arriving on the website. Of these, this Search Console report measures only the first.

## SEO reporting needs three separate perspectives

<figure style="width:100%">
<svg viewBox="0 0 620 230" role="img" aria-labelledby="f4t f4d" style="width:100%;height:auto;font-family:var(--font-body);font-variant-numeric:tabular-nums"><title id="f4t">Three perspectives on search visibility</title><desc id="f4d">Visibility: is the site found? Traffic: do people click? AI visibility: is the brand or site mentioned in an AI answer?</desc>
<rect x="0.0" y="10" width="192" height="210" rx="14" style="fill:var(--color-surface);stroke:var(--line);stroke-width:2"/>
<path d="M62.0 76 C76.0 46 116.0 46 130.0 76 C116.0 106 76.0 106 62.0 76 Z" style="fill:none;stroke:var(--ink);stroke-width:4;stroke-linejoin:round"/><circle cx="96.0" cy="76" r="11" style="fill:none;stroke:var(--ink);stroke-width:4"/><circle cx="96.0" cy="76" r="3.5" style="fill:var(--ink)"/>
<text x="96.0" y="158" text-anchor="middle" style="fill:var(--ink);font-size:28px;font-weight:700;">Visibility</text>
<text x="96.0" y="194" text-anchor="middle" style="fill:var(--muted);font-size:22px;font-weight:400;">Found?</text>
<rect x="214.0" y="10" width="192" height="210" rx="14" style="fill:var(--color-surface);stroke:var(--line);stroke-width:2"/>
<path d="M296.0 52 L296.0 100 L308.0 90 L316.0 110 L325.0 106 L317.0 87 L332.0 87 Z" style="fill:none;stroke:var(--ink);stroke-width:4;stroke-linejoin:round"/>
<text x="310.0" y="158" text-anchor="middle" style="fill:var(--ink);font-size:28px;font-weight:700;">Traffic</text>
<text x="310.0" y="194" text-anchor="middle" style="fill:var(--muted);font-size:22px;font-weight:400;">Clicked?</text>
<rect x="428.0" y="10" width="192" height="210" rx="14" style="fill:var(--color-surface);stroke:var(--line);stroke-width:2"/>
<path d="M524.0 46 C524.0 70 542.0 82 564.0 82 C542.0 82 524.0 94 524.0 118 C524.0 94 506.0 82 484.0 82 C506.0 82 524.0 70 524.0 46 Z" style="fill:var(--accent)"/>
<text x="524.0" y="158" text-anchor="middle" style="fill:var(--ink);font-size:28px;font-weight:700;">AI</text>
<text x="524.0" y="194" text-anchor="middle" style="fill:var(--muted);font-size:22px;font-weight:400;">Mentioned?</text>
</svg>
<figcaption>Three separate perspectives for SEO reporting: search visibility, traffic and AI visibility.</figcaption>
</figure>

Each perspective answers a different question:

| Perspective | What do we measure? | What does it tell us? |
| --- | --- | --- |
| Search visibility | Impressions, number of search queries, rankings | How widely does the website appear in traditional search? |
| Traffic | Clicks, CTR, organic sessions | How much website traffic does search visibility generate? |
| AI visibility | AI link impressions, separately measured brand mentions | How often do the website’s links or brand appear in AI answers? |

Traditional SEO metrics are familiar: organic traffic, rankings and conversions. AI answers complicate the picture because a website can appear without receiving a click. Alongside traffic, we need metrics that capture visibility beyond clicks: link impressions in AI answers and mentions in the answer text. Separating branded searches from other searches also helps identify where changes in visibility and traffic come from.

Reporting also needs a business perspective, such as qualified leads and purchases from organic traffic. This measures what visibility and traffic produce for the business, rather than adding a fourth category of search visibility.

Do not combine visibility, traffic and AI visibility into one number. The datasets are not independent of each other. Combining them would require a defensible calculation model, which I do not have.

## How I interpret the change in practice

1. **Bring the figures into one table.** Aggregate the AI report and Performance report data by month so you can see whether they move together.
2. **Choose the comparison month deliberately.** Avoid a seasonal low and state which month you chose.
3. **Read the changes separately.** If AI impressions grow but clicks do not, examine which pages are losing clicks.
4. **Check against business results.** Look at whether leads and purchases from organic traffic change along with clicks.
5. **Do not infer a cause from parallel trends alone.** Establishing causation requires an experiment or, at a minimum, a more focused comparison.

The metrics answer different questions. Impressions tell us whether a website appears. Clicks tell us whether that visibility brings visitors. AI impressions tell us whether the site appears in AI answers. None of these metrics alone explains why a figure changed or whether the change was good or bad for the business.

## SEO success cannot be reduced to a single number

Organic traffic remains an important part of measuring SEO. If the website’s goal is to attract new customers, what matters is how many potential customers arrive from search engines and what they do on the site.

Google’s AI answers add another dimension to search visibility. A website can appear in search results without the user visiting it.

I would track search visibility, organic traffic and AI visibility side by side. I would also examine how the business results from organic traffic develop.

No single metric settles whether SEO is working. Growth in AI impressions does not automatically mean better results, and a decline in clicks alone does not mean SEO has failed.

SEO reporting should help distinguish where visibility is growing, where traffic is changing and what those changes mean for the business.
