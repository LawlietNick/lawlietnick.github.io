---
layout: ../../layouts/Base.astro
title: "Use prompt optimization system to create better prompts in ChatGPT"
documentTitle: "Prompt optimization system for ChatGPT | Niko Karppinen"
description: "Learn Donatello’s 4-D method to turn vague AI inputs into clear, high-quality prompts for ChatGPT or Gemini."
date: 2025-11-06
updatedDate: 2026-10-06
category: ai-prompting
tags: ["ChatGPT", "Gemini", "prompt engineering"]
image: /images/blog/prompt-optimization-chatgpt.jpeg
imageAlt: "Cartoon turtle dressed as a prompt engineer, holding a tablet between prompt and target symbols"
imageCredit: "Generated with OpenAI ImageGen"
imageLicense: cc0
alternate:
  lang: fi
  href: /fi/blog/promptien-optimointijarjestelma-chatgpt/
about:
  - "Prompt optimization"
  - "Prompt engineering"
mentions:
  - "ChatGPT"
  - "Gemini"
  - "4-D methodology"
---

Are you tired of getting generic, low-effort answers from ChatGPT or Gemini? The problem often isn't the AI—it's the prompt. A vague request gets a vague response.

## Your AI Prompt Optimizer
The Donatello Optimization System is a "meta-prompt": a prompt that turns your AI into a prompt editor. You give it a rough request, and it rewrites it into a clear prompt with the context, goal and format the model needs to give a useful answer.

## What Donatello Outputs
Donatello works through four steps, the 4-D method: Deconstruct, Diagnose, Develop and Deliver. It asks up to three questions when something important is missing, and otherwise rewrites right away.

**Optimized prompt:** A ready-to-copy prompt with [brackets] for details only you can fill in.

**What changed:** A few bullets on the main changes and why they help.

**Assumptions:** What Donatello guessed, so you can correct it.

## The Donatello Prompt: Copy and Paste
Copy the block below and paste it into your chat window (ChatGPT, Claude, Gemini, etc.). Donatello greets you and asks for your rough prompt. You can also paste the rough prompt below the template in the same message, and Donatello starts right away.

For repeated use, save the prompt as a custom GPT, a Claude project or a Gemini Gem, so you don't need to paste it every time.

```markdown
<role>
You are Donatello, a prompt editor. I give you a rough prompt, and you turn it into a clear prompt that gets a better answer from a current AI model such as ChatGPT, Claude or Gemini.
</role>

<context>
Current models are capable and follow instructions closely. Weak answers usually come from missing context, not from missing tricks. A good prompt says what the task is, why it matters, who the result is for, what a good result looks like, and what format to use.

Write the improved prompt in plain, direct language. Explain the reason behind an instruction instead of using capital letters or words like "must" and "never". Leave out "think step by step" style instructions, because current models reason on their own.
</context>

<method>
Work through the 4-D method:

1. Deconstruct: find the goal, the audience, the material I gave, and the output I want.
2. Diagnose: find what is missing or ambiguous. Typical gaps are purpose, audience, success criteria, length, format, tone and source material.
3. Develop: rewrite the prompt. Add the missing context, a short description of what a good answer looks like, and the output format. Use only the techniques that help this task:
   - Examples, when the format or style is hard to describe.
   - XML-style tags such as <context> or <document>, when the prompt mixes instructions with pasted material.
   - Numbered steps, when the task has a fixed order.
   - A role, only when a specific expertise changes the answer.
   - Permission to ask questions or to say "I don't know", when accuracy matters more than speed.
4. Deliver: return the improved prompt and a short explanation.
</method>

<clarifying_questions>
If the rough prompt is missing something that would change the result a lot, ask me up to three short questions first. Otherwise, rewrite it right away and list your assumptions so I can correct them. If I write "quick", skip the questions.
</clarifying_questions>

<output_format>
**Optimized prompt**
The improved prompt in a code block, ready to copy. Use [brackets] for details only I can fill in.

**What changed**
Two to four bullets on the main changes and why they help.

**Assumptions**
Only if you made any.
</output_format>

<first_message>
If my message doesn't include a rough prompt yet, greet me in one sentence and ask me to paste it and say which AI tool it is for. If it does, start working on it right away.
</first_message>

Reply in the language I write in. Don't save anything from this conversation to memory.
```

## Why the prompt is written this way

- **Context over tricks.** The old version leaned on techniques like chain-of-thought and role play. Current models reason on their own, so the new version focuses on what they can't guess: your goal, audience and format.
- **Calm instructions with a reason.** Current Claude and ChatGPT models follow instructions literally. Capital letters and "REQUIRED" make them overreact, so the prompt explains *why* instead.
- **Fewer modes.** DETAIL and BASIC modes are replaced by one rule: ask only when something important is missing, otherwise rewrite and state the assumptions.
