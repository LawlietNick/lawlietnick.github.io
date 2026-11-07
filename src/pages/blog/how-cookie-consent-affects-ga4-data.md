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

A website adds a cookie banner, and its user count in GA4 drops. Is tracking broken? Has traffic fallen? Can the missing data be recovered?

A GA4 report alone cannot answer those questions. First, establish what changed in measurement.

The same questions apply to Cookiebot and other consent management platforms, or CMPs. The effect depends on the visitor's choice, tag loading rules, and how analytics processes the information collected.

## What does a banner change in measurement?

If GA4 previously ran on every page load but now starts only after analytics consent, the amount of reported data may fall. Some visitors reject analytics cookies. Others leave without making a choice.

Consent management involves asking visitors to choose, communicating that choice to the services used, and making tags behave accordingly. The visible banner is one part of that implementation. [Google's description of consent management](https://developers.google.com/tag-platform/security/concepts/consent-mode)

If reported users fall on the day the banner launches, investigate both traffic and measurement changes before drawing conclusions about marketing performance.

## Monitor the analytics cookie acceptance rate

The acceptance rate helps explain changes in GA4 numbers. If a smaller share of visitors accepts analytics cookies, consent-based measurement may capture fewer users even when actual website traffic stays the same. In a Basic implementation, this directly limits whose data GA4 can collect. When interpreting reports from an Advanced implementation, account for any modeling too.

For GA4, monitor acceptance of analytics cookies specifically. The share of visitors clicking “Accept all” is not enough: a visitor can allow analytics while rejecting marketing cookies.

Check which population your CMP uses to calculate the acceptance rate. Does it include everyone shown the banner or only those who made a choice? How does it handle visitors who leave without choosing and previously saved consent? Record the calculation method so you compare the same thing across periods. The acceptance rate among people who respond to the banner does not, on its own, tell you what share of all visitors accepted analytics.

Cookiebot's Consent Analytics shows acceptances and rejections over time. According to its documentation, however, category-level counts only include individual category selections: “Accept all” and “Deny all” are excluded. You therefore need those choices too when establishing the overall share accepting analytics. [Cookiebot's Consent Analytics documentation](https://support.cookiebot.com/hc/en-us/articles/31161341107100-Consent-Analytics-Overview)

Compare acceptance rates and GA4 trends over the same periods. Mark the dates of changes to the banner, CMP and tags. A falling acceptance rate is a reason to check measurement coverage, but it does not establish the cause of the entire traffic change.

Do not use the acceptance rate as a direct correction factor for GA4 numbers. That calculation would assume, for example, that consenting and rejecting visitors behave alike and that the CMP's comparison population matches the GA4 metric being adjusted. Those assumptions would need justification. Google's behavioral modeling estimates missing behavior based on similar consenting users in the same GA4 property. [Google's description of behavioral modeling](https://support.google.com/analytics/answer/11161109?hl=en)

## Basic and Advanced determine what is sent to Google

Google Consent Mode controls Google tag behavior based on consent. There are two implementation methods.

### Basic: measurement starts after consent

In a Basic implementation, Google tags remain blocked until the necessary consent has been obtained. Without consent, the GA4 tag sends no measurement data to Google.

<figure data-image-modal="/images/blog/consent-mode-basic-en.jpeg" data-image-caption="Basic Consent Mode">

![Illustration of Basic Consent Mode: no transfer before a choice or after rejecting optional cookies; accepting permits measurement by GA4, Meta Pixel and other services.](@assets/blog/consent-mode-basic-en.jpeg)

<figcaption>For Google, this shows Basic Consent Mode. For other tags, it shows consent-based blocking. Each tag needs consent appropriate to its purpose. Generated with OpenAI ImageGen.</figcaption>
</figure>

### Advanced: limited signals without analytics cookies

In an Advanced implementation, Google tags load before the visitor makes a choice. When the analytics default is `denied`, they can send limited measurements without analytics cookies. Accepting analytics consent permits analytics cookies to be used. [Google's Basic and Advanced comparison](https://developers.google.com/tag-platform/security/concepts/consent-mode#basic_versus_advanced_consent_mode)

<figure data-image-modal="/images/blog/consent-mode-advanced-en.jpeg" data-image-caption="Advanced Consent Mode">

![Illustration of Advanced Consent Mode: limited blue measurement signals reach GA4 before a choice and after analytics is rejected. A green path shows measurement with analytics cookies after acceptance.](@assets/blog/consent-mode-advanced-en.jpeg)

<figcaption>This shows the technical behavior of Google Advanced Consent Mode. Other services depend on their own implementation. The illustration does not establish that sending data without consent is lawful in a particular situation. Generated with OpenAI ImageGen.</figcaption>
</figure>

A Consent Mode setting in a CMP does not, on its own, tell you which implementation is running on your website. Check tag loading rules too.

## Why does a sent event not equal a reported visit?

In an Advanced implementation, a browser may send a measurement request to GA4 even after a visitor rejects analytics cookies. That does not mean the visitor appears in reports in the same way as a consenting user.

Without a persistent identifier, GA4 cannot directly connect events to the same user. Multiple page views could belong to one person or several people. [Google's explanation of observed and modeled data](https://support.google.com/analytics/answer/11161109?hl=en)

When testing the implementation, check both what the browser sends and how the data appears in the report you use.

## Can modeling fill the gaps?

GA4 behavioral modeling estimates behavior that cannot be observed because consent is missing. It uses data collected from consenting users in the same GA4 property.

Requirements include an Advanced implementation and sufficient data:

- At least 1,000 events a day with `analytics_storage='denied'` for at least seven days.
- At least 1,000 daily users sending events with `analytics_storage='granted'` on at least seven of the previous 28 days.

Meeting these conditions does not guarantee modeling eligibility. A small website may fall below the thresholds. Check availability and use in your own GA4 property. Behavioral modeling included in reports is also not included in BigQuery exports. [Google's modeling requirements and limitations](https://support.google.com/analytics/answer/11161109?hl=en)

## Can cookieless measurements be sent without consent?

The absence of cookies does not settle whether consent is needed. Access to information on a user's device and any processing of personal data must be assessed separately.

The European Data Protection Board's final Guidelines 2/2023 examine the technical scope of Article 5(3) of the ePrivacy Directive. Protection of the device covers information regardless of whether it is personal data. Storage and access are separate operations to assess. The guidelines discuss pixel tracking and sending locally generated information to a third party, among other techniques. [Final EDPB guidelines, especially paragraphs 6–10 and 47–55](https://www.edpb.europa.eu/system/files/documents/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf)

The guidelines do not name Google Advanced Consent Mode or decide consent exemptions. My conclusion from these sources is that the absence of cookies or persistent user identifiers does not establish that measurement requests may be sent without consent.

### What do Finnish authorities say?

Traficom's cookie guidance also covers network-request-based tracking pixels, web beacons and tags. It describes requests that may transmit an IP address, timestamp and browser type, for example. Any claim that analytics is necessary must be justified for the particular service. [Traficom guidance, pages 3 and 7, in Finnish](https://www.traficom.fi/files/media/file/Ev%C3%A4steohjeistus_palveluntarjoajille.pdf)

In its decision concerning Foreca dated 12 June 2024, Traficom states that merely asserting that users are not identified is insufficient to demonstrate privacy protection. Users cannot be considered to have requested tracking simply because it helps improve a service. The decision mentions Consent Mode as a technical option, but does not separately assess Advanced cookieless requests. [Foreca decision, page 26, in Finnish](https://www.kyberturvallisuuskeskus.fi/files/media/file/Foreca%20Oy.pdf)

In the Finnish authority publications reviewed for this article on 22 October 2026, I did not find an explicit decision approving or prohibiting Google's Advanced cookieless requests as such. This is the result of that source search. The Consent Mode reference in the Foreca decision should not be presented as approval of Advanced mode.

In Finland, Traficom supervises rules on the use of information on terminal equipment, while the Data Protection Ombudsman supervises personal data processing. [Traficom guidance, page 2](https://www.traficom.fi/files/media/file/Ev%C3%A4steohjeistus_palveluntarjoajille.pdf)

### Why do national guidelines differ?

Published guidance differs on what limited analytics may operate without consent. The following positions concern general conditions. They are not product approvals for Google Advanced Consent Mode.

**France – CNIL.** Limited audience measurement may be exempt from consent. It must serve only the publisher's own measurement needs and produce anonymous statistics. Combining data, cross-site tracking and sharing non-anonymous data are restricted. The exemption does not automatically cover GA4 or Advanced requests. [CNIL, 4 July 2025](https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience)

**Netherlands – ACM.** Analytics cookies with little impact on privacy may be exempt from consent. Privacy-sensitive analytics cookies and comparable tracking technologies require consent. Calling a service analytics or cookieless does not automatically put it within the exemption. [ACM guidance](https://www.acm.nl/nl/verkoop-aan-consumenten/reclame-en-verleiden/online-beinvloeden/cookies-plaatsen)

**Belgium – GBA/APD.** The FAQ provides no general consent exemption for audience measurement cookies, including first-party cookies. Counting visitors is generally not strictly necessary to deliver the service the visitor requested. An answer about cookies is not a prohibition on every cookieless implementation. [GBA/APD, 17 November 2023](https://www.gegevensbeschermingsautoriteit.be/burger/faq/test)

**Germany – Baden-Württemberg data protection authority.** An older FAQ describes the possibility of relying on legitimate interests for limited server-side analytics when no cookies are used and usage data is fully anonymized before disclosure to a third party. This does not approve Advanced requests sent directly from a browser to Google or represent a nationwide German position. [Authority FAQ](https://www.baden-wuerttemberg.datenschutz.de/faq-zu-cookies-und-tracking-2/)

For example, whether the French exemption applies must be established for the service and its actual settings. CNIL also says that meeting the exemption criteria must not be presented as CNIL certification or validation. [CNIL guidance](https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience)

### What should you establish about your implementation?

Ask the implementer to describe what the browser reads and sends before a choice, after rejection and after acceptance. Establish the recipients, purposes and stage at which any anonymization takes place.

Any consent requirement for access to device information must be assessed separately from the lawful basis for personal data processing. A possible legitimate interest does not, by itself, override a consent requirement for using device information. [The distinction in Baden-Württemberg's guidance](https://www.baden-wuerttemberg.datenschutz.de/faq-zu-cookies-und-tracking-2/)

## What can a marketing lead do?

Start by checking implementation and reporting. Consider changing the CMP once the cause of the current problem is understood.

1. Record when measurement changed and what changed. Was a banner added, were tag loading rules changed, or was the CMP replaced?
2. Have all three states tested: before a choice, after acceptance and after rejection. Establish the basis for any transfer without consent too.
3. Check acceptance rates and modeling status. Has the share accepting analytics changed? Does the report use modeled data, and is it available?
4. Compare business records such as store orders or enquiries recorded in a CRM. Establish the limitations of those sources too.
5. Mark the measurement change in reporting. Numbers collected before and after the change may not be directly comparable.

When GA4 user counts fall after a banner change, first establish what the website sent to Google before the change and what it sends now.

For Cookiebot setup scripts and testing instructions, see the [Cookiebot guide](/templates/cookiebot-guide/).