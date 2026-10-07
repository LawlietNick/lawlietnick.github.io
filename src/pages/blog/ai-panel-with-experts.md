---
layout: ../../layouts/Base.astro
title: "Use AI for multi-expert analysis with one prompt"
documentTitle: "Use AI for multi-expert analysis with one prompt"
description: "Turn ChatGPT or Gemini into a panel of experts. The expert panel prompt helps you get nuanced, multi-angle insights instead of generic AI summaries."
date: 2025-11-09
updatedDate: 2026-10-06
category: ai-prompting
tags: ["ChatGPT", "Gemini", "prompt engineering", "AI workflows"]
image: /images/blog/ai-panel-with-experts.jpeg
imageAlt: "Animal expert panel around a meeting table: an owl, a robot, a turtle, a fox and a bear, each with a specialty speech bubble"
imageCredit: "Generated with OpenAI ImageGen"
imageLicense: cc0
alternate:
  lang: fi
  href: /fi/blog/asiantuntijapaneeli-yhdella-promptilla/
about:
  - "Prompt engineering"
  - "Multi-expert AI analysis"
mentions:
  - "ChatGPT"
  - "Gemini"
---

Most AI tools are fine for quick summaries. You ask a complex question, and you get a polite middle position. Useful for recaps. Not great when you need a clear recommendation.

The “Expert Panel” prompt fixes that. It turns your AI into a small roundtable of three professionals with different incentives who argue, push back, and refine ideas until they reach a practical conclusion. The output feels closer to a real strategy session than a neutral Wikipedia-style overview.

## How it works

You act as the director. The AI plays three experts. The value comes from the tension between them.

---

## Step 1. Define your six inputs

Before you run the prompt, set up six short pieces of context. This is where most of the quality comes from.

1. **Topic**  
   Define the broader subject area. Keep it focused enough that three experts could reasonably have strong opinions.  
   *Example: “The Future of Remote Work.”*

2. **Central Question**  
   Frame the key decision or challenge the panel must resolve.  
   *Example: “How can mid-sized companies maintain culture and innovation in a fully distributed model?”*

3. **Expert A – Role & Focus**  
   Give a title and a specific lens.  
   *Example: Organizational Psychologist (focus on team cohesion and well-being).*

4. **Expert B – Role & Focus**  
   Use a contrasting or complementary perspective.  
   *Example: Chief Financial Officer (focus on overhead costs and financial viability).*

5. **Expert C – Role & Focus**  
   Add a third angle that pushes the debate forward.  
   *Example: Technology Consultant (focus on tools, data security, and efficiency).*

6. **Output Language**  
   Tell the model which language to write the discussion in.  
   *Example: English, Finnish, or bilingual output.*

Once you have these six defined, you’re ready to fill them into the prompt.


---

## Step 2. Run the prompt

Copy the template below, fill in the six fields at the top, and paste it into your AI tool of choice (ChatGPT, Claude, Gemini, etc.). If you leave a field empty, the AI asks for it before starting.

The AI then writes a 500–700 word discussion where the experts respond to each other by name, push back on weak points, and change their view when someone makes a better argument.

The panel ends with a moderator summary and one concrete recommendation, including the condition under which it would be the wrong call.

```markdown
<inputs>
Topic:
Central question:
Expert A (role and focus):
Expert B (role and focus):
Expert C (role and focus):
Output language:
</inputs>

<task>
Simulate a panel discussion between the three experts above. I will use it to decide the central question, so I need the real trade-offs, not a balanced summary. Each expert argues from their own incentives and priorities. The value of the panel comes from where they disagree.

If any field in <inputs> is empty, ask me for the missing fields in one short message and wait for my answer. Otherwise, start right away.
</task>

<structure>
1. Opening: each expert states their position and their biggest concern in two or three sentences.
2. Exchange: the experts respond to each other by name, challenge weak points, and concede when another expert makes a better argument. Every turn adds something new: an argument, a risk, a counterexample, or a concession.
3. Close: a moderator sums up where the panel agreed, what they traded off, and what is still unresolved. Then the moderator gives one specific recommendation with a concrete first step, and names the main condition under which it would be the wrong call.
</structure>

<guidelines>
- Keep the disagreement real. Don't let the experts drift into polite consensus before the close.
- Support claims with reasoning and concrete examples. Don't invent statistics or sources. If a number matters, say what would need to be checked.
- Write the turns as people would speak in a room, not as bullet lists.
</guidelines>

<format>
Write the whole discussion in the output language. Label each turn with the speaker's role in bold, for example **CFO:**, and use **Moderator:** for the close. Aim for 500–700 words.
</format>
```

## Why the prompt is written this way

- **Plain instructions with a reason.** Current Claude and ChatGPT models follow instructions literally. Explaining *why* (you need trade-offs for a decision) works better than capital letters and words like "must" and "strictly".
- **Tagged sections.** The XML-style tags keep your inputs separate from the instructions. Both Claude and ChatGPT read them reliably.
- **No made-up data.** The old version asked for "brief data points", which invites invented numbers. Now the panel flags what needs checking instead.
