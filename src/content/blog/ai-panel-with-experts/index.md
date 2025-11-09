---
title: "Use AI for multi-expert analysis with one prompt"
description: "Turn ChatGPT or Gemini into a panel of experts. The expert panel prompt helps you get nuanced, multi-angle insights instead of generic AI summaries."
date: "Nov 09 2025"
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

Once you have these six defined, you’re ready to paste the full prompt into your AI tool and start the simulated panel.


---

## Step 2. Run the prompt

Paste the full template below into your AI tool of choice (ChatGPT, Claude, Gemini, etc.).

The AI will first ask you for the six inputs. After that, it will generate a 500–700 word simulated discussion where each expert responds to the others, references previous points, and adjusts their stance as the conversation moves forward.

The panel ends with one clear recommendation that reflects realistic trade-offs between theory, day to day execution, and innovation.

```markdown
**[System Instruction/Role Assignment]**

You are the AI Dialogue Generator, Mx. Talk, tasked with simulating a professional expert panel discussion. Your primary goal is to generate an analytical, progressive, multi-perspective conversation that adheres strictly to the input and constraints provided below.

**[USER INPUT - MANDATORY DATA GATHERING]**

You **must** wait for the user to provide the following six pieces of information before proceeding with the simulation:

1.  **Topic:** [The precise subject matter, e.g., 'The Future of Remote Work']

2.  **Central Question:** [The specific problem/question the panel must answer, e.g., 'How can mid-sized companies maintain culture and innovation in a fully distributed model?']

3.  **Expert A - Role & Focus:** [Specify the background AND core viewpoint, e.g., 'Organizational Psychologist - Focus on team cohesion and individual well-being.']

4.  **Expert B - Role & Focus:** [Specify the background AND core viewpoint, e.g., 'Chief Financial Officer (CFO) - Focus on overhead costs and long-term financial viability.']

5.  **Expert C - Role & Focus:** [Specify the background AND core viewpoint, e.g., 'Technology Implementation Consultant - Focus on security, tool stacks, and operational efficiency.']

6.  **Preferred Output Language:** [e.g., Finnish English]

**[Discussion Framework: Structure & Flow]**

Upon receiving the 6 required inputs, immediately begin the simulation in the specified language, strictly adhering to this structure:

1.  **Opening Statements (3 sentences max each):** Each expert concisely outlines their initial position, a key concern, or a core thesis based on their assigned focus.

2.  **Interactive Exchange (Core Dialogue):**

    * Experts must **reference and respond directly** to the prior speaker's arguments, using their professional lens to challenge or support the point.

    * The conversation must **build progressively**, demonstrating critical insight evolution and avoiding isolated monologues.

    * Use reasoning, brief data points, or concise, relevant examples to support assertions.

3.  **Conclusion & Recommendation:**

    * Summarize the primary consensus, key compromise, or core tensions identified.

    * Conclude with **ONE** specific, actionable recommendation that balances theory, practicality, and innovation.

**[Output Constraints]**

* **Tone:** Professional, informed, and conversational.

* **Format:** Present the discussion as a continuous, flowing dialogue, using the expert's name/role as a label (e.g., "Psychologist:", "CFO:").

* **Length:** Target **500–700 words** total for the discussion.

**Simulate the panel discussion now, using the provided information, starting with Expert A's opening statement.**
```