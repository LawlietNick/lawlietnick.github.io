---
title: "Create McKinsey-style presentation using ChatGPT or Gemini"
description: "Learn how to create McKinsey-style presentations using ChatGPT or Gemini with the SCQR and Pyramid Principle. Step-by-step guide for business professionals."
date: "Nov 03 2025"
---

Most professionals can produce data. Few can turn that data into a story that convinces decision-makers to act.
That’s why consultants at McKinsey, BCG, and Bain rely on a strict logic framework called the SCQR and Pyramid Principle to structure every presentation. It turns messy findings into a clear narrative that moves from insight to action.

The good news is that you don’t need a strategy background to use it. With one AI prompt, you can create a complete executive-ready presentation outline using ChatGPT or Gemini. Here’s how.

### 1. Start with the Framework: How consultants structure their story

At McKinsey and similar strategy firms, every presentation follows two connected frameworks:
**The SCQR Model** and **The Pyramid Principle**.
Together, they make your argument both *logical* and *action-oriented.*

---

#### The SCQR model: The storyline

The SCQR (Situation–Complication–Question–Resolution) structure is the foundation of a compelling executive narrative.
It moves the audience from shared context to a decision point.

| Element          | Purpose                                | Example (Website Performance Audit)                                      |
| ---------------- | -------------------------------------- | ------------------------------------------------------------------------ |
| **Situation**    | Establish what everyone already knows. | “Website speed directly affects conversions and SEO visibility.”         |
| **Complication** | Introduce the tension or challenge.    | “The audit showed pages over 6 seconds to load and total size of 10 MB.” |
| **Question**     | Frame the key decision.                | “How can we improve performance without rebuilding the entire site?”     |
| **Resolution**   | Deliver the clear, data-backed answer. | “Optimize media loading now, and restructure URLs next.”                 |

This storyline ensures your audience understands *why the topic matters* before they see your recommendations.

#### The Pyramid principle: The structure

Once you have your storyline, the **Pyramid Principle** organizes your logic into a top-down argument.

Each layer supports the one above it:

1. **Level 1 – Key message:** The main answer to the Question (your Resolution).
2. **Level 2 – Supporting pillars:** Three clear themes or recommendations that support your main point.
3. **Level 3 – Evidence:** Data, metrics, or insights that prove each supporting point.

This structure ensures clarity: every detail has a reason to exist, and all points roll up into one message.

### 2. Apply the framework with AI

Now that you understand the logic behind the presentation, you can let AI handle the formatting and structure for you.
You only need to feed it a few key details about your topic.

Here’s how:

### Step 1 – Gather your core material

Before you start, collect the main data points, findings, or audit insights you want to communicate.
You don’t need slides yet, just a few bullet points with results or actions.

### Step 2 – Paste this prompt into ChatGPT or Gemini

Copy and paste the following text exactly.
The AI will then ask you six short questions to generate a **complete McKinsey-style SCQR + Pyramid Principle presentation outline**.

```markdown
**Role:** Act as a Master Business Communication Consultant specializing in the **McKinsey & Company SCQR (Situation-Complication-Question-Resolution) and Pyramid Principle** frameworks. Your expertise is in converting complex analysis (audits, strategies) into clear, client-facing, action-oriented presentations.

**Objective:** Generate a complete presentation outline that strictly adheres to the specified framework. The final output must serve one of two high-stakes goals: 1) **Secure Project Approval** or 2) **Present Critical Audit Findings.**

**Input variables (User must provide):**
1. **[OUTPUT_LANGUAGE]:** (e.g., Default Finnish, then English)
2. **[TOPIC_TITLE]:** (e.g., Strategy for 15% Reduction in Q2 Operational Costs)
3. **[PRESENTATION_GOAL]:** (Select one: Secure Project Approval OR Present Critical Audit Findings)
4. **[AUDIENCE]:** (e.g., C-Suite Executives, Senior VPs of Operations, Technical Review Committee)
5. **[CORE_DATA_POINTS]:** (Crucial numbers needed for the presentation, e.g., "Current failure rate is 22%", "Projected cost of solution is $4M", "Audit found three critical security gaps.")
6. **[KEY_RESOLUTION/RECOMMENDATION]:** (The single, most important action/answer/recommended next steps, e.g., "We must adopt a centralized cloud architecture by Q3.")

**Output constraints & structure:**
* **Length:** The outline must span **8-12 logically grouped slides/sections** suitable for a 15-30 minute presentation.
* **Tone:** Highly **professional, data-driven, confident, and action-oriented.**
* **Format:** Deliver the outline using the structure below. All content must be in the specified **[OUTPUT_LANGUAGE]**.

---
## **PRESENTATION OUTLINE: [TOPIC\_TITLE]**

### **I. Introduction (SCQR - The Hook)**

*   **Slide 1: Title & Situation (S)**
    *   **Title:** [TOPIC\_TITLE]
    *   **Subtitle:** [Presenter Name / Date / Context]
    *   **S (Situation):** [Draft 1-2 sentences of agreed-upon, relevant context for the audience. This is the "status quo."]

*   **Slide 2: The Complication (C)**
    *   **Title:** The Core Challenge
    *   **C (Complication):** [Draft 1-2 compelling sentences stating the core challenge, risk, or urgency.]
    *   **Key Data:** [Feature the **[CORE\_DATA\_POINTS]** number prominently on this slide. This is the "hook."]

*   **Slide 3: The Guiding Question (Q)**
    *   **Title:** The Path Forward
    *   **Q (Question):** [Draft the single, simple question that the presentation will answer. This question directly addresses the Complication.]

*   **Slide 4: Our Resolution (The Thesis)**
    *   **R (Resolution/Level 1 Message):** [State the clear, concise **[KEY\_RESOLUTION/RECOMMENDATION]** as the direct answer to 'Q'.]
    *   **Roadmap:** We will review the **Three (3) Pillars** supporting this resolution: [List the three Level 2 section titles below.]

### **II. Body (Pyramid Principle - MECE Pillars)**

*(Each Level 2 point must be Mutually Exclusive, Collectively Exhaustive (MECE) and directly support the Resolution 'R'.)*

*   **Slide 5: Pillar 1: [Concise, actionable Title 1]**
    *   **Level 2 Point:** [Main finding/recommendation of this pillar.]
    *   **Level 3 Support (Rationale & Evidence):** [Detail the *why* and *what* with a specific **[CORE\_DATA\_POINTS]** reference.]
    *   **Client Impact:** [Explain the benefit to the **[AUDIENCE]**]

*   **Slide 6-7: Pillar 2: [Concise, actionable Title 2]**
    *   **Level 2 Point:** [Main finding/recommendation of this pillar.]
    *   **Level 3 Support (Rationale & Evidence):** [Detail the *why* and *what* with specific examples or hypothetical data.]
    *   **Required Action:** [The specific step the client must take related to this pillar.]

*   **Slide 8-9: Pillar 3: [Concise, actionable Title 3]**
    *   **Level 2 Point:** [Main finding/recommendation of this pillar.]
    *   **Level 3 Support (Rationale & Evidence):** [Detail the *why* and *what* with cost/benefit analysis or risk mitigation details.]
    *   **Next Steps for this Pillar:** [Specific deliverable or outcome.]

### **III. Synthesis & Action (The Close)**

*   **Slide 10: Financial Summary / Risk Mitigation (If necessary)**
    *   [Summarize the ROI/Cost of inaction or the severity of the Audit finding.]

*   **Slide 11: Conclusion & Call to Action**
    *   **In Summary:** The path forward is clear: **[Reiterate Level 1 Message (R)]**.
    *   **Key Pillars Recap:** [Briefly list the three Level 2 points.]
    *   **Call to Action (Decision Required):** Based on the **[PRESENTATION\_GOAL]**, we require [State the single, explicit ask—e.g., "Immediate approval of the $4M budget," or "Executive sponsorship to implement the three remediation steps."].
```

### Step 3 – Provide your inputs

After you paste the prompt, the AI will ask you the six questions above.
Answer them clearly. Each response gives the AI the raw material it needs to build your story.

For example:

* **OUTPUT_LANGUAGE:** Finnish
* **TOPIC_TITLE:** Website Performance Optimization
* **PRESENTATION_GOAL:** Present Critical Audit Findings
* **AUDIENCE:** Operations Team
* **CORE_DATA_POINTS:** Largest contentful Paint cut in half, total page size reduced from 10MB to 5MB
* **KEY_RESOLUTION/RECOMMENDATION:** Optimize content for AI Overview


### Step 4 – Review, polish, and present

The AI will return a **slide-by-slide outline** that you can:

* Convert into PowerPoint or Google Slides
* Fill with visuals, graphs, and brand styling
* Present to decision-makers as a clear, structured recommendation deck

The result: a presentation built like a McKinsey consultant’s — without starting from a blank slide.