---
layout: ../../layouts/Base.astro
title: Create McKinsey-style presentation using ChatGPT or Gemini
documentTitle: "McKinsey-style presentations with ChatGPT | Niko Karppinen"
description: Learn how to create McKinsey-style presentations using ChatGPT or Gemini with the SCQR and Pyramid Principle. Step-by-step guide for business professionals.
date: 2025-11-03
updatedDate: 2026-10-04
category: ai-prompting
tags: ["ChatGPT", "Gemini", "presentations", "Pyramid Principle"]
image: /images/blog/mckinsey-style-presentation-chatgpt-gemini.jpeg
imageAlt: "Turtle in a business suit presenting a pyramid-structured slide and charts on a whiteboard"
imageCredit: "Generated with OpenAI ImageGen"
alternate:
  lang: fi
  href: /fi/blog/mckinsey-tyylinen-esitys-chatgpt-gemini/
about:
  - "Presentation structure"
  - "Prompt engineering"
mentions:
  - "ChatGPT"
  - "Gemini"
  - "Claude"
  - "Pyramid Principle"
  - "MECE"
  - "SCQR"
  - "McKinsey & Company"
---

Most professionals can produce data. Few can turn that data into a story that convinces decision-makers to act.
That’s why consultants at McKinsey, BCG, and Bain rely on a strict logic framework called the SCQR and Pyramid Principle to structure every presentation. It turns messy findings into a clear narrative that moves from insight to action.

The good news is that you don’t need a strategy background to use it. With one AI prompt, ChatGPT, Gemini or Claude interviews you, builds the storyline with you and then turns it into finished slides. Here’s how.

## 1. Start with the Framework: How consultants structure their story

At McKinsey and similar strategy firms, every presentation follows two connected frameworks:
**The SCQR Model** and **The Pyramid Principle**.
Together, they make your argument both *logical* and *action-oriented.*

---

### The SCQR model: The storyline

The SCQR (Situation–Complication–Question–Resolution) structure is the foundation of a compelling executive narrative.
It moves the audience from shared context to a decision point.

| Element | Purpose | Example (Website Performance Audit) |
|---|---|---|
| Situation | Establish what everyone already knows. | “Website speed directly affects conversions and SEO visibility.” |
| Complication | Introduce the tension or challenge. | “The audit showed pages over 6 seconds to load and total size of 10 MB.” |
| Question | Frame the key decision. | “How can we improve performance without rebuilding the entire site?” |
| Resolution | Deliver the clear, data-backed answer. | “Optimize media loading now, and restructure URLs next.” |

This storyline ensures your audience understands *why the topic matters* before they see your recommendations.

### The Pyramid principle: The structure

Once you have your storyline, the **Pyramid Principle** organizes your logic into a top-down argument.

Each layer supports the one above it:

1. **Level 1 – Key message:** The main answer to the Question (your Resolution).

1. **Level 2 – Supporting pillars:** Two to four (often three) clear themes or recommendations that support your main point.

1. **Level 3 – Evidence:** Data, metrics, or insights that prove each supporting point.

This structure ensures clarity: every detail has a reason to exist, and all points roll up into one message.

### Action titles: The headline carries the message

Consultants don’t title a slide “Page speed”. They write the conclusion as a full sentence: “Mobile pages load in 6 seconds, twice the recommended limit”. Read only the titles in order and you get the whole argument. The slide body exists to prove its title.

Before building any slides, consultants write this title list first. It’s called a *ghost deck*, and it’s the cheapest place to fix a weak argument.


## 2. Apply the framework with AI

The prompt below works in three rounds. The AI first interviews you and reads your material, then builds the storyline and ghost deck with you, and only then makes the slides. You stay in control of the argument; the AI does the drafting and the layout.

### Step 1 – Gather your core material

Collect the report, audit, spreadsheet or notes you want to present. You can attach files directly to ChatGPT, Gemini or Claude, so you don’t need to retype numbers. A few bullet points also work.

Remove anything confidential your company doesn’t allow in AI tools before you upload it.

### Step 2 – Paste this prompt into ChatGPT, Gemini or Claude

Copy the prompt and attach your material in the same message. The AI will read it and ask only for what’s still missing.

```
You are helping me build an executive presentation using the methods strategy consultants use: the SCQR storyline (Situation, Complication, Question, Resolution), the Pyramid Principle and action titles.

Work in three rounds. Stop at the end of each round and wait for my reply.

ROUND 1: INTERVIEW
Read any material I have attached. Then ask me only what is still unclear, one question at a time, at most five questions. You need to know:
- The decision or action I want from the audience
- Who the audience is and what they already know
- The key findings and numbers (from my material if attached)
- My recommendation, if I have one (if not, propose one based on the material)
- Presentation language, length in minutes and any must-include content
Summarize what you understood in five bullets and ask me to confirm.

ROUND 2: STORYLINE AND GHOST DECK
1. Write the governing thought: one sentence that answers the Question and states the recommendation.
2. Write the SCQR, one sentence each.
3. Give 2–4 supporting pillars. They must be MECE (no overlap, nothing important missing) and each must directly support the governing thought.
4. Build a ghost deck as a table with the columns: # | Action title | Evidence on the slide | Visual | Source.
   - The action title is a full sentence of at most 15 words that states the conclusion, not the topic. ("Mobile pages load in 6 s, twice the limit", not "Page speed".)
   - One message per slide. Plan about one slide per two minutes, plus an appendix for detail.
   - The final slide states the single decision or next step I need from the audience.
5. Run two checks and report the problems you find:
   - Read only the titles in order. Do they tell the full argument on their own?
   - Does every slide's evidence actually prove its title?
Ask me what to change. Repeat until I say the storyline is approved.

ROUND 3: SLIDES
When I approve, build the presentation slide by slide:
- The action title as the headline
- 3–5 short bullets or one chart that proves the title (state the chart type and the data behind it)
- The source in small print at the bottom
- Speaker notes of 2–4 sentences
Use a clean, consistent consulting style: white background, one accent color, no stock-photo clutter. If you can create files or use a canvas, produce the actual slides (Google Slides or .pptx). If you can't, give me the slide content ready to paste.

RULES FOR THE WHOLE TASK
- Never invent numbers, sources or quotes. If evidence is missing, write [DATA NEEDED: what] and tell me.
- Separate facts from my material and your own assumptions, and label the assumptions.
- If my recommendation is not supported by the data, say so directly and suggest a stronger one.
- Plain language. No buzzwords, no filler.
```

### Step 3 – Answer the questions

The AI asks only for what it couldn’t find in your material. For a website performance audit, the answers could look like this:

- **Decision wanted:** Approve a two-sprint performance fix before the spring campaign
- **Audience:** Marketing director and CTO, not deeply technical
- **Key findings:** Mobile pages take 6.2 s to load (LCP), average page size is 10 MB, 70% of traffic is mobile
- **Recommendation:** Optimize images and third-party scripts first, rebuild page templates next quarter
- **Format:** English, 15 minutes

### Step 4 – Fix the storyline before the slides

This is the most valuable step. Read the ghost deck titles in order as if you were the CEO. If the argument doesn’t hold on titles alone, ask the AI to fix it now. Changing one row in a table is much easier than reworking ten finished slides.

Also check every `[DATA NEEDED]` marker. Either give the number or remove the claim.

### Step 5 – Build the slides

Once you approve the storyline, the AI builds the slides:

- **Gemini:** Turn on Canvas before you start. It can export the finished presentation to Google Slides.
- **ChatGPT:** Ask for a downloadable .pptx file at the end of round 3.
- **Claude:** Ask for a PowerPoint file at the end of round 3. Claude creates it as a downloadable .pptx.

Whichever tool you use, check every number against your source before presenting. Then add your brand template and swap in any real charts. The result: a deck with consulting-style logic, without starting from a blank slide.
