# Session 1 - The AI Toolkit & Developer Setup

## History of AI: The 1960 to 2025 Journey

Before we jump into tools, let's understand how we got here. AI is not new — it has been around for decades. Here's the short version of the story:

| Year(s) | What Happened |
|---------|---------------|
| 1950 | Alan Turing asks "Can machines think?" and proposes the Turing Test |
| 1956 | The term "Artificial Intelligence" is officially coined at the Dartmouth Conference |
| 1960s | Early chatbots like ELIZA (1966), rule-based systems, symbolic AI research begins |
| 1970s | First "AI Winter" — people overpromised what AI could do, funding dried up |
| 1980s | Expert systems become popular in businesses (MYCIN for medicine, XCON for computers) |
| 1987-93 | Second AI Winter — expert systems couldn't scale, interest fades again |
| 1997 | IBM's Deep Blue beats world chess champion Garry Kasparov |
| 2006 | Geoffrey Hinton revives neural networks — deep learning is born |
| 2011 | IBM Watson wins Jeopardy!, Apple launches Siri |
| 2012 | AlexNet wins the ImageNet competition — deep learning proves it works at scale |
| 2014 | GANs (Generative Adversarial Networks) invented — AI can now generate images |
| 2016 | Google DeepMind's AlphaGo defeats Go champion Lee Sedol |
| 2017 | The "Attention Is All You Need" paper introduces Transformers — this changes everything |
| 2018 | BERT and GPT-1 released — pre-trained language models emerge |
| 2020 | GPT-3 launches with 175 billion parameters — few-shot learning amazes everyone |
| 2021 | GitHub Copilot preview — AI enters the developer's code editor for the first time |
| 2022 | ChatGPT launches in November — AI becomes a household name overnight |
| 2023 | GPT-4, Claude 2, Llama 2 — multimodal models arrive, open-source AI race begins |
| 2024 | Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 — AI coding tools explode, million-token context windows |
| 2025 | AI agents go autonomous, AI-native IDEs (Kiro, Cursor), reasoning models become the standard |

### What You Should Remember from This Timeline

- AI has gone through multiple boom-and-bust cycles (called "AI Winters")
- The Transformer architecture (2017) is the backbone of every AI tool you use today
- It took only 4 years (2020-2024) to go from research papers to everyday developer tools
- We are now in the "AI as a co-developer" era — AI does not replace developers, it makes them faster

---

## Map of AI Tools

Think of AI tools in four main buckets:

### 1. LLMs (Large Language Models) — The Chat Tools

Examples: ChatGPT, Claude, Gemini, Llama

These are general-purpose AI models you can talk to. You type a question or instruction, and they respond with text.

What they are good at:
- Brainstorming ideas
- Explaining concepts in simple language
- Drafting content, emails, documentation
- Answering coding questions

How they differ from each other: context window size (how much text they can read at once), reasoning ability, speed, and cost.

### 2. Code Assistants — The IDE Copilots

Examples: GitHub Copilot, Kiro, Cursor, Codeium, Tabnine

These live inside your code editor. As you type code, they suggest completions in real time.

What they are good at:
- Autocompleting code as you write
- Generating entire functions from comments
- Understanding your project's context and suggesting relevant code
- Helping you refactor and fix bugs inline

### 3. AI Search — Smarter Google

Examples: Perplexity, Google AI Overviews, Phind

Instead of giving you a list of links, these tools read multiple sources and give you a direct answer with citations.

What they are good at:
- Technical research ("how does JWT authentication work?")
- Finding documentation quickly
- Troubleshooting error messages

### 4. Agents — Autonomous Coding Assistants

Examples: Claude Code, Aider, OpenHands

These are CLI (command-line) tools that can read your code, write new files, run commands, and make changes across your entire project — all on their own.

What they are good at:
- Multi-step tasks ("add authentication to this API")
- Making changes across multiple files
- Tasks with clear instructions and acceptance criteria

---

## Tool Categories (Quick Reference Table)

| Category | Examples | Best For |
|----------|----------|----------|
| Chat Models | ChatGPT, Claude, Gemini | Exploring ideas, learning, design discussions |
| IDE Copilots | Copilot, Kiro, Cursor | Real-time code completion, inline help |
| CLI Agents | Claude Code, Aider | Autonomous task execution, big changes |
| AI Search | Perplexity, Phind | Research, documentation, troubleshooting |

---

## How to Evaluate and Choose an AI Tool

When deciding which tool to use, ask yourself these four questions:

1. Accuracy — How correct are the outputs? Does it hallucinate (make things up)?
2. Context Window — How much of my code can it read at once? (Bigger = better for large projects)
3. Cost — Is there a free tier? What are the limits? How much does the paid plan cost?
4. Latency — How fast does it respond? (Critical for inline code suggestions)

No single tool wins on all four. That is why you will end up using multiple tools together.

---

## When AI Helps vs. When It Hurts

### When AI Actually Helps You

- Writing boilerplate code (repetitive stuff you have written 100 times)
- Explaining unfamiliar code or concepts
- Generating tests, documentation, and commit messages
- Quick prototyping — getting a rough version working fast
- Writing regex, SQL queries, and config files (things that are hard to memorize)
- Translating code between languages or frameworks

### When AI Hurts You (Real Limitations — Be Aware)

- Making big architecture decisions — AI does not know your full system
- Security-critical code — never trust AI output without reviewing it yourself
- Blindly accepting suggestions — if you do not understand what it wrote, do not use it
- Novel algorithms — if it has never seen it in training data, it will guess (badly)
- Over-reliance — if you always let AI write your code, your own skills will fade
- Hallucinations — AI confidently invents APIs, libraries, and methods that do not exist

The rule of thumb: Use AI as a first draft, but always review and understand the output.

---

## Setting Up an AI-Powered Dev Environment in 30 Minutes

Here is the quick version. For detailed step-by-step instructions, see the Setup Handbook.

1. IDE Setup — Install VS Code, Kiro, or Cursor (your AI-powered editor)
2. Chat Model Access — Create accounts for Claude and/or ChatGPT
3. CLI Tools — Install a CLI agent like Claude Code or Gemini CLI
4. AI Search — Bookmark Perplexity or Phind for quick research
5. API Keys — Get API keys from providers for programmatic access
6. Project Context — Set up steering files or rules to guide AI behavior in your project

---

## Live Experiment: Solving the Same Problem with Multiple Tools

The idea: Take one coding problem and solve it using different AI tools. Then compare:

- Speed — Which tool gets to a working solution fastest?
- Quality — Which produces the cleanest, most maintainable code?
- Context — Which understands the problem best with minimal prompting?
- Iteration — Which is easiest to refine when you want changes?

The takeaway: Different tools are better at different stages. The smart move is combining them — use chat models for thinking, copilots for writing, and agents for executing.
