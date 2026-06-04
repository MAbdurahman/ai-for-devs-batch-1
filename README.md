# AI Tools for Developers

Welcome to the AI Tools for Developers course.

This is a hands-on, project-based course designed to teach you how to use modern AI tools effectively in your day-to-day development workflow. You will not just learn about these tools — you will build real things with them.

By the end of this course, you will be able to:

- Choose the right AI tool for the right task
- Write prompts that produce reliable, production-quality code
- Build AI-powered applications using RAG, agents, and structured workflows
- Deploy full-stack projects end to end with AI assistance

This course is for developers who want to work smarter, not harder. Whether you are a beginner or experienced, these skills will change how you write software.

---

## Who Is This Course For

- Developers who want to integrate AI into their daily workflow
- Students learning to build modern applications
- Anyone curious about how LLMs, agents, and AI coding tools actually work in practice

No prior AI/ML experience is required. You should be comfortable writing basic code in JavaScript or Python.

---

## What You Will Need

- A computer with VS Code (or any modern code editor)
- Node.js and Python installed
- GitHub account
- API keys for Claude, OpenAI, or Google (free tiers available)
- Willingness to experiment and break things

See the Setup Handbook in lecture-1-tool-mindmap/setuphandbook.md for detailed installation instructions.

---

## Course Syllabus

### Session 1 — The AI Toolkit and Developer Setup

- Map of AI tools: LLMs, code assistants, AI search, agents
- Tool categories: chat models, IDE copilots, CLI agents
- Evaluation framework: accuracy, context window, cost, latency
- When AI helps vs. when it hurts: real limitations
- Setting up an AI-powered dev environment in 30 minutes
- Live experiment: solving the same problem with multiple tools

---

### Session 2 — Prompt Engineering and Vibe Coding

- Vibe coding: natural language to code (fast prototyping)
- Anatomy of a developer prompt: role, context, task, constraints
- Zero-shot to few-shot escalation strategy
- Chain-of-thought prompting for better reasoning
- Iterative prompting and fixing hallucinations

---

### Session 3 — Spec-Driven Development with AI

- Transition from prompts to structured specifications
- Writing clear technical specs before code generation
- Few-shot prompting with real codebase patterns
- Generating reliable code aligned with requirements
- Reducing ambiguity and improving determinism

---

### Session 4 — RAG Systems and Context-Aware AI

- Retrieval-Augmented Generation (RAG) fundamentals
- Embeddings, vector databases, semantic search
- Connecting AI to codebases, docs, and internal data
- Building developer assistants using RAG
- Limitations and failure modes of RAG systems

---

### Session 5 — AI Agents, MCPs and Skills

- Tool-using agents: APIs, databases, CLIs
- Introduction to MCPs (Model Context Protocols): standardizing how AI accesses tools and context
- Designing "skills" for agents: reusable capabilities (code analysis, API calling, DB querying)
- Agent workflows: planner, executor, reviewer patterns
- Multi-agent systems: task decomposition and collaboration
- Frameworks like CrewAI and similar ecosystems
- Guardrails: controlling agent behavior, permissions, and failures

---

### Session 6 — Build and Learn: Project 1 (Text to SQL)

This is a full build session. You will go from problem statement to deployed application.

**Step 1: Problem Understanding**
- Review FRD and PRD documents
- Refine requirements
- Design solution flow using Mermaid MCP

**Step 2: Synthetic Data Generation**
- Create realistic datasets using Mockaroo and AI prompts
- Output formats: CSV and JSON

**Step 3: Prompt Engineering**
- Build and optimize Text-to-SQL prompts
- Use PromptLayer for prompt versioning and tracking

**Step 4: Database Setup**
- Deploy PostgreSQL via Docker
- Connect using MCP for natural language queries

**Step 5: MERN Stack Development**
- Generate full-stack app (MongoDB, Express, React, Node)
- Use tools like Bolt.new or v0.dev for rapid generation
- Integrate database layer

**Step 6: CI/CD and Deployment**
- Automate deployment with GitHub Actions
- Deploy to Vercel or Railway
- Manage logs and environment variables

---

## Folder Structure

```
ai-tools/
    README.md                   (this file)
    lecture-1-tool-mindmap/
        notes.md                (session 1 lecture notes)
        setuphandbook.md        (environment setup guide)
        demo-1/                 (demo code for session 1)
    lecture-2/
    lecture-3/
    lecture-4/
    lecture-5/
    lecture-6/
    projects/
    .env                        (your API keys - never commit this)
    .gitignore
```

---

## Important Rules for This Course

1. Never commit API keys or secrets to GitHub. Use .env files and add them to .gitignore.
2. Always understand what AI-generated code does before using it. Do not blindly copy-paste.
3. Experiment freely. Break things. That is how you learn.
4. AI is a tool, not a replacement for thinking. Use it to amplify your skills, not skip learning.

---

## Getting Started

1. Clone or download this repository
2. Follow the setup instructions in lecture-1-tool-mindmap/setuphandbook.md
3. Read the Session 1 notes in lecture-1-tool-mindmap/notes.md
4. Show up to each session with your environment ready and your curiosity turned on

Let's build things.
