# Session 2 — Prompt Engineering and Vibe Coding

## What This Session Is About

Last session, we set up our tools. Now we learn how to actually talk to them.

The truth is, most people get bad results from AI because they give bad instructions. This session fixes that. You will learn how to write prompts that get you useful, working code — and what to do when AI gives you something wrong.

Think of it like this: AI is a very fast, very eager junior developer. It will do exactly what you ask. The problem is, most of us are terrible at explaining what we actually want. Today we fix that.

---

## What We Will Cover

### Part 1: Vibe Coding — Natural Language to Code

Let's start with the fun part.

Vibe coding means you describe what you want in plain English, and AI writes the code for you. No pseudocode, no diagrams — just "hey, build me a login page" and seeing what comes back.

What we will do:
- Understand what vibe coding is and why it has become so popular
- See where it shines — quick prototypes, throwaway scripts, exploring ideas fast
- See where it breaks — complex logic, specific libraries, anything that needs precision
- Live demo: we will build a small feature together using nothing but natural language

Tools we will use: ChatGPT, Claude, Copilot Chat

The big takeaway: Vibe coding is about speed, not perfection. Get something working fast, then clean it up.

---

### Part 2: Anatomy of a Developer Prompt

Now let's get structured about this.

Every good prompt has four parts. Once you know this framework, your AI interactions will immediately improve.

The four parts:
- Role — Tell the AI who it is. ("You are a senior backend developer who writes clean Python.")
- Context — Give it the background. ("I have a FastAPI app with JWT authentication and a PostgreSQL database.")
- Task — Say exactly what you need. ("Write a middleware that checks if the user's token is expired.")
- Constraints — Set boundaries. ("Use Python 3.11, no external libraries, keep it under 50 lines, add comments.")

What we will do:
- Look at bad prompts and see why they produce bad output
- Rewrite those same prompts using the four-part structure
- Compare the results side by side
- Practice together: you will rewrite vague prompts into structured ones

The big takeaway: The quality of what AI gives you is directly tied to the quality of what you ask for. Be specific. Be clear. Set boundaries.

---

### Part 3: Zero-Shot to Few-Shot Escalation Strategy

Sometimes your first prompt does not work. Most people react by rewriting the entire prompt from scratch. That is the wrong move.

Instead, try adding examples.

Here is the escalation ladder:
- Zero-shot: You just ask for what you want, no examples. ("Write a function to validate Indian phone numbers.")
- One-shot: You give one example of the expected input and output.
- Few-shot: You give 2-3 examples so the AI understands the exact pattern you want.

What we will do:
- Try the same problem at each level and compare what comes back
- Learn when to escalate (if zero-shot output is wrong, add examples before adding more words)
- Practice recognizing when examples would help more than longer instructions

The big takeaway: Start simple. If the output is off, show the AI what you mean instead of telling it harder.

---

### Part 4: Chain-of-Thought Prompting for Better Reasoning

Here is something interesting. If you ask AI to "think step by step" before answering, it gives significantly better answers on hard problems.

This is called chain-of-thought prompting. It works because instead of jumping to an answer, the AI walks through the logic first — kind of like how you would solve a problem on paper before writing code.

What we will do:
- Understand why chain-of-thought works (and the research behind it)
- See which types of problems benefit from it (algorithms, debugging, architecture decisions)
- See where it is overkill (simple tasks, boilerplate, formatting)
- Live demo: we will debug a tricky function with and without chain-of-thought and compare

The big takeaway: For anything that requires actual thinking (not just pattern matching), ask AI to show its work. You will be surprised how much better the output gets.

---

### Part 5: Iterative Prompting and Fixing Hallucinations

Let's talk about the elephant in the room: AI makes stuff up. Confidently. With a straight face.

It will invent API methods that do not exist. It will reference libraries that were never published. It will write code that looks perfect but calls functions with the wrong arguments. This is called hallucination, and it happens to everyone.

What we will do:
- Learn what hallucinations look like in practice (with real examples)
- Develop a habit of verifying AI output before trusting it
- Learn iterative prompting — fixing output through follow-up messages instead of starting over
- Techniques that work: "That method does not exist, use X instead", "Add error handling for edge cases", "Now make this production-ready"
- Know when to stop iterating and just write the code yourself

The big takeaway: AI will sometimes be confidently wrong. That is fine. Your job is not to blindly trust it — your job is to verify, catch mistakes, and guide it toward the right answer one prompt at a time.

---

## Quick Reference

| Part | What You Will Learn |
|------|---------------------|
| 1 | Rapid prototyping with natural language (vibe coding) |
| 2 | Writing structured prompts that get better results |
| 3 | Using examples to guide AI when instructions alone are not enough |
| 4 | Getting AI to reason through hard problems step by step |
| 5 | Spotting AI mistakes and fixing them through conversation |

---

## After This Session, You Will Be Able To

- Write a clear, structured prompt using role, context, task, and constraints
- Prototype small features fast using vibe coding
- Know when to use zero-shot vs. few-shot prompting
- Use chain-of-thought to get better answers on complex problems
- Spot hallucinations in AI-generated code
- Fix AI mistakes through iterative follow-up prompts instead of starting from scratch

---

## Come Prepared With

- Your dev environment from Session 1 (everything installed and working)
- Access to at least one chat model (Claude, ChatGPT, or Gemini)
- A code editor with Copilot or similar extension
- An open mind — some of what you see today will feel like magic, and some will feel frustrating. Both reactions are normal.
