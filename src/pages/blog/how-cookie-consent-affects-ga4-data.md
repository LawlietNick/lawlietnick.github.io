---
title: How does a cookie banner affect GA4 data?
description: Why do GA4 numbers change after a cookie banner launch? Basic and Advanced Consent Mode, modeling and regulatory guidance from Finland and the EU.
date: '2026-10-23'
tags:
  - GA4
  - Consent Mode
  - CMP
  - cookies
  - analytics
category: privacy
image: /images/blog/cookie-consent-and-analytics-visibility.jpeg
imageAlt: "A turtle with purple glasses peers behind a translucent analytics panel. A cookie consent panel sits in front, while faint event symbols appear behind the glass."
imageCredit: "Generated with OpenAI ImageGen"
layout: ../../layouts/Base.astro
alternate:
  lang: fi
  href: /fi/blog/evastebannerin-vaikutus-ga4-dataan/
about:
  - Cookie consent
  - Google Consent Mode
  - Analytics reporting
mentions:
  - Google Analytics 4
  - Traficom
  - EDPB
  - Cookiebot
---

A cookie banner was added to the website. The user count in analytics dropped dramatically. Is tracking broken? Is traffic really down, or is Elvis playing a gig tonight? Can the missing data be recovered somehow?

The answers will certainly not be found in the report. First, establish what changed in measurement. The banner is usually Cookiebot or another consent management platform, or CMP, and the logic is almost the same for all of them.

## What does a banner change in measurement?

Before the banner, GA4 ran on every page load. Now it starts only after the visitor has accepted analytics. Some visitors reject cookies. Others leave without choosing anything. The reported data shrinks even if traffic has not changed. [Google's description of consent management](https://developers.google.com/tag-platform/security/concepts/consent-mode)

If users drop on the day the banner launches, don't blame marketing right away. First establish what happened in measurement.

Sometimes the banner also loads too slowly. Or the consent update event arrives late. The analytics ping then does not go out early enough. The visitor moves on to the next page before the event is captured.

## Monitor the analytics cookie acceptance rate

The acceptance rate often explains a large part of the change. Monitor analytics cookies specifically. The share of visitors clicking “Accept all” is not enough, because a visitor can allow analytics and reject marketing.

Check which population your CMP uses to calculate the rate. Does it include everyone shown the banner or only those who made a choice? What about visitors who leave without choosing and previously saved consent? Record the calculation method so you compare the same thing across periods.

Cookiebot's Consent Analytics shows category-level counts only for individual selections. “Accept all” and “Deny all” are excluded, so you need to look those up separately. [Cookiebot's Consent Analytics documentation](https://support.cookiebot.com/hc/en-us/articles/31161341107100-Consent-Analytics-Overview)

Mark the dates of changes to the banner, CMP and tags on the chart. A falling acceptance rate tells you to check measurement coverage. It does not, on its own, explain the whole traffic change.

Do not turn the acceptance rate into a correction factor for GA4 numbers. You would be assuming that consenting and rejecting visitors behave alike. That assumption is hard to justify. Google's behavioral modeling estimates missing behavior based on similar consenting users in the same GA4 property. [Google's description of behavioral modeling](https://support.google.com/analytics/answer/11161109?hl=en)

## Basic or Advanced?

Google Consent Mode controls Google tag behavior based on consent. There are two implementation methods.

### Basic: measurement starts after consent

Google tags remain blocked until consent has been given. Without consent, GA4 sends nothing to Google.

<figure data-image-modal="/images/blog/consent-mode-basic-en.jpeg" data-image-caption="Basic Consent Mode">

![Illustration of Basic Consent Mode: no transfer before a choice or after rejecting optional cookies; accepting permits measurement by GA4, Meta Pixel and other services.](@assets/blog/consent-mode-basic-en.jpeg)

<figcaption>For Google, this shows Basic Consent Mode. For other tags, it shows consent-based blocking. Each tag needs consent appropriate to its purpose. Generated with OpenAI ImageGen.</figcaption>
</figure>

### Advanced: limited signals without cookies

Google tags load before the visitor makes a choice. When the analytics default is `denied`, they can send limited measurements without analytics cookies. Acceptance permits the use of cookies. [Google's Basic and Advanced comparison](https://developers.google.com/tag-platform/security/concepts/consent-mode#basic_versus_advanced_consent_mode)

<figure data-image-modal="/images/blog/consent-mode-advanced-en.jpeg" data-image-caption="Advanced Consent Mode">

![Illustration of Advanced Consent Mode: limited blue measurement signals reach GA4 before a choice and after analytics is rejected. A green path shows measurement with analytics cookies after acceptance.](@assets/blog/consent-mode-advanced-en.jpeg)

<figcaption>This shows the technical behavior of Google Advanced Consent Mode. Other services depend on their own implementation. The illustration does not establish that sending data without consent is lawful in a particular situation. Generated with OpenAI ImageGen.</figcaption>
</figure>

A Consent Mode setting in a CMP does not tell you which implementation is running on your website. Check the tag loading rules too.

## Why is a sent event not a reported visit?

In an Advanced implementation, a browser sends a measurement request even after a visitor rejects analytics cookies. In reports, that visitor still does not appear the same way as a consenting user. Without a persistent identifier, GA4 cannot connect events to the same user. [Google's explanation of observed and modeled data](https://support.google.com/analytics/answer/11161109?hl=en)

So test two things: whether the request goes out, and whether it shows up in the report you use.

## Can modeling fill the gaps?

GA4 can estimate behavior that goes unobserved when consent is missing. It uses consenting users in the same property as its basis. Modeling requires an Advanced implementation and sufficient data:

- At least 1,000 events a day with `analytics_storage='denied'` for at least seven days.
- At least 1,000 daily users sending events with `analytics_storage='granted'` on at least seven of the previous 28 days.

Meeting these conditions does not guarantee that modeling is on. A small website easily falls below the thresholds, so check the situation in your own GA4 property. Modeled data is also not included in BigQuery exports. [Google's modeling requirements and limitations](https://support.google.com/analytics/answer/11161109?hl=en)

## Can cookieless measurements be sent without consent?

Not necessarily. The absence of cookies does not settle whether consent is needed. Access to information on a user's device and the processing of personal data are assessed separately.

The European Data Protection Board's final Guidelines 2/2023 concern Article 5(3) of the ePrivacy Directive. Protection of the device covers information regardless of whether it is personal data. The guidelines discuss pixel tracking, among other techniques. [Final EDPB guidelines, especially paragraphs 6–10 and 47–55](https://www.edpb.europa.eu/system/files/documents/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf)

The guidelines do not name Google Advanced Consent Mode or decide consent exemptions. My conclusion from these sources is that the absence of cookies or a persistent identifier does not establish that requests may be sent without consent.

### What do Finnish authorities say?

Traficom's cookie guidance also covers network-request-based tracking pixels, web beacons and tags. Any claim that analytics is necessary must be justified for the particular service. [Traficom guidance, pages 3 and 7, in Finnish](https://www.traficom.fi/files/media/file/Ev%C3%A4steohjeistus_palveluntarjoajille.pdf)

In its decision concerning Foreca dated 12 June 2024, Traficom stated that merely asserting that users are not identified is insufficient. The decision mentions Consent Mode as a technical option, but does not assess Advanced cookieless requests. [Foreca decision, page 26, in Finnish](https://www.kyberturvallisuuskeskus.fi/files/media/file/Foreca%20Oy.pdf)

I checked the Finnish authority publications on 22 October 2026. I did not find an explicit decision on Google Advanced Consent Mode. This is the result of a source search, so do not read the Foreca decision's mention as approval. In Finland, Traficom supervises the use of information on terminal equipment, and the Data Protection Ombudsman supervises personal data processing. [Traficom guidance, page 2](https://www.traficom.fi/files/media/file/Ev%C3%A4steohjeistus_palveluntarjoajille.pdf)

### Why do national guidelines differ?

Authorities differ on what limited analytics may operate without consent. None of the following is an approval of Google Advanced mode.

- **France, CNIL.** Limited audience measurement may be exempt from consent if it serves only the publisher's own need and produces anonymous statistics. The exemption does not automatically cover GA4. CNIL also forbids presenting the criteria as met by authority approval. [CNIL, 4 July 2025](https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience)
- **Netherlands, ACM.** Analytics cookies with little impact on privacy may be exempt from consent. Merely calling a service “cookieless analytics” is not enough for the exemption. [ACM guidance](https://www.acm.nl/nl/verkoop-aan-consumenten/reclame-en-verleiden/online-beinvloeden/cookies-plaatsen)
- **Belgium, GBA/APD.** According to the FAQ, there is no general exemption for analytics cookies, even first-party ones. The answer concerns cookies, not all cookieless implementations. [GBA/APD, 17 November 2023](https://www.gegevensbeschermingsautoriteit.be/burger/faq/test)
- **Germany, Baden-Württemberg.** An older FAQ describes legitimate interest in limited server-side analytics when no cookies are used and data is anonymized before disclosure. It does not cover Advanced requests sent directly from a browser to Google. Legitimate interest also does not override the consent requirement for device information. [Authority FAQ](https://www.baden-wuerttemberg.datenschutz.de/faq-zu-cookies-und-tracking-2/)

## What can a marketing lead do?

Start by checking implementation and reporting. Consider changing the CMP only once the cause of the current problem is known.

1. Record when measurement changed and what changed. Was a banner added, were tag loading rules changed, or was the CMP replaced?
2. Ask the implementer to test three states: before a choice, after acceptance and after rejection. Also ask for a description of what the browser reads and sends, to whom and for what purpose.
3. Check the acceptance rate and modeling status. Has the share accepting analytics changed? Is modeled data in use?
4. Compare business records such as store orders or enquiries in a CRM. Remember that those have their own limitations.
5. Mark the measurement change in reporting. Numbers collected before and after the change may not be directly comparable.

When GA4 user counts fall after a banner change, ask first: what did the website send to Google before the change, and what does it send now?

For Cookiebot setup scripts and testing instructions, see the [Cookiebot guide](/templates/cookiebot-guide/).
