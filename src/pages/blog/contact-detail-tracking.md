---
layout: ../../layouts/Base.astro
title: "What does contact detail tracking leave out?"
documentTitle: "Contact detail tracking: what link clicks miss"
description: "Tracking email and phone link clicks alone can give an incomplete picture of contact detail use. Check what your reports actually measure."
date: 2026-10-08
category: analytics
tags: ["GA4", "contact detail tracking", "marketing measurement"]
image: /images/blog/contact-detail-clicks-and-copy-tracking.jpeg
imageAlt: "A green turtle character examines a contact detail report through a magnifying glass, revealing email address and phone number copy events alongside link clicks."
imageCredit: "Generated with OpenAI ImageGen"
imageLicense: cc0
alternate:
  lang: fi
  href: /fi/blog/yhteystietojen-seuranta/
about:
  - "Contact detail tracking"
  - "Web analytics"
  - "User interaction measurement"
mentions:
  - "Email link"
  - "Phone link"
  - "Copy event"
  - "Analytics event tracking"
---

An email link received five clicks. The same report recorded 46 email address copy events.

Looking at clicks alone, contact detail use would appear low. If you change your website or marketing on that basis, you leave some visitor activity out of the decision.

Tracking contact detail copies can provide a fuller picture of how email addresses and phone numbers are used. It still cannot tell you how many people ultimately sent a message or made a call.

## An email link can open the wrong application

Clicking an email address should make sending a message easier. It can open a different email application from the one the visitor uses.

A visitor may use webmail, while the link opens an email application installed on their computer. They may face an account setup screen when all they wanted was to send one message.

Copying the address and pasting it into their own email service is a natural way to continue. Some visitors copy the address straight away without trying the link.

Analytics can record a click even if the visitor closes the application without sending anything. An email link click alone does not tell you whether they went on to compose a message.

## Phone numbers are also used without clicks

On a phone, a telephone link can open the calling application. On a computer, the result depends on the applications available and the device settings.

A visitor can also copy the number for later or type it into their phone while reading it on a computer screen. Neither action requires clicking the telephone link.

A low click count therefore does not tell you, on its own, how much a phone number is used.

## One event can describe different ways of using contact details

Instead of creating separate events for email link clicks, phone link clicks and copies, you can collect them under a single event name.

For example, you could use `contact_detail_interaction` with a `contact_detail_type` parameter that describes what the user did:

| Event | contact_detail_type |
|---|---|
| `contact_detail_interaction` | `Phone Number Link Click` |
| `contact_detail_interaction` | `Email Link Click` |
| `contact_detail_interaction` | `Phone Number Copied` |
| `contact_detail_interaction` | `Email Copied` |

Use the total `contact_detail_interaction` count to see all tracked contact detail interactions together. To separate the actions, break the report down by `contact_detail_type`.

## What does copy tracking add to a report?

The example report recorded these events:

| Contact detail interaction | Events |
|---|---:|
| Email Link Click | 5 |
| Email Copied | 46 |
| Phone Number Link Click | 1 |
| Phone Number Copied | 30 |
| **Total** | **82** |

With link clicks alone, the report would show six contact detail interactions. Including copies brings the total to 82 events: 82 recorded uses of an email address or phone number.

These counts do not confirm how many people contacted the business.

## The same visitor can generate several events

Event counts are not counts of different people.

For example, the same visitor can click an email link, notice that the wrong email application opens, close it and then copy the email address.

One visitor can then generate two `contact_detail_interaction` events:

- `Email Link Click`
- `Email Copied`

The visitor took two separate actions, so recording both is not necessarily a tracking error. The event count does not equal the number of users or enquiries.

## What information can marketing use?

If your website has several email addresses or phone numbers, you can examine their use separately for sales, customer service and appointment booking.

Use of a customer service phone number does not automatically indicate interest from new customers. Use of a sales email address may be a more relevant signal for marketing.

You can add a `contact_detail_category` parameter to identify which contact detail the event relates to, with values such as:

- `Sales`
- `Customer Service`
- `Booking`

A report could then show `contact_detail_interaction` events where `contact_detail_type = Email Copied` and `contact_detail_category = Sales`. You can see both how the contact detail was used and what it is for.

## A general business contact detail is different from a user's personal information

This tracking examines how people use contact details published on the business's own website.

The tracked value could be `info@company.com` or the business's general phone number. These are contact details published by the business. A visitor's own email address or phone number is outside the scope of this tracking and should not be collected by it.

For reporting, the actual email address or phone number does not necessarily need to be used as a parameter. Classifying contact details as sales or customer service, for example, often makes the report easier to interpret too.

## Copying does not mean making contact

A copy event only tells you that an email address or phone number was copied.

After that, the user may:

- paste the email address into their own email service
- save the number on their phone
- send the contact detail to someone else
- use it later
- do nothing

Link clicks have the same limit: an email link click does not confirm that an email was sent, and a phone link click does not confirm that a call was made. Use `contact_detail_interaction` to measure contact detail use. You need evidence of the next action to count enquiries or leads.

## When is copy tracking worth adding?

Copy tracking is useful when email and phone are key ways to contact the business through its website.

If a report shows only a few email or phone link clicks, you may assume visitors are not using the contact details. Tracking copies can reveal use that the click report misses. It still cannot tell you how many people contacted the business.

If your main question is where actual enquiries come from, you need information closer to the outcome, such as form submissions, calls or enquiries recorded in your CRM.

## Act on the findings

1. **Check what the current report measures.** If contact events only mean email and phone link clicks, name them accordingly.

2. **Add copy tracking if it answers an open question.** One `contact_detail_interaction` event and the `contact_detail_type` parameter keep the structure simple.

3. **Look at all tracked contact detail interactions together.** The total event count shows how often people interact with contact details.

4. **Separate the actions when needed.** `contact_detail_type` shows whether an event was an email link click, a phone link click or a contact detail copy.

5. **Do not treat an event as a completed enquiry.** Clicks and copies are user actions. They do not confirm that an email was sent or a call was made.

At your next reporting meeting, check whether your contact detail report includes copies as well as link clicks.
