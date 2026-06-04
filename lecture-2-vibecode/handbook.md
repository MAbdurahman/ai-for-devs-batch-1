## 1. Vibe Coding

### What Is It

Vibe coding is when you describe what you want in plain English and let AI write the code. You do not plan every detail upfront. You just talk to AI like you would explain something to a colleague, and it gives you working code.

The name comes from the idea that you are coding by "vibes" — you have a rough sense of what you want, and you let AI figure out the details.

### When to Use It

- You want a quick prototype to test an idea
- You are building a throwaway script or one-time tool
- You are exploring an unfamiliar library or framework
- You need something fast and do not care about perfection yet

### When NOT to Use It

- Production code that needs to be maintainable
- Security-critical features (authentication, payments)
- When you need precise control over architecture
- When you do not understand the output at all (dangerous)

### Vibe Coding Example

What you say to AI:

```
Build me a simple Express server with three routes:
- GET /users that returns a list of users from an array
- POST /users that adds a new user
- DELETE /users/:id that removes a user by id

Keep it simple, use an in-memory array, no database needed.
```

That is it. You described what you wanted, AI writes the code. You review it, tweak what you do not like, and move on.

### The Vibe Coding Workflow

1. Describe what you want (be clear but do not overthink it)
2. Get the code back from AI
3. Read through it — does it make sense?
4. Run it — does it work?
5. If not, tell AI what is wrong and ask it to fix it
6. Once it works, clean it up if you plan to keep it

---

## 2. Anatomy of a Developer Prompt

### The Framework: RCTC

Every good developer prompt has four parts:

- R — Role (who is the AI in this conversation)
- C — Context (what does it need to know about your project)
- T — Task (what exactly should it do)
- C — Constraints (what are the boundaries and rules)

### Bad Prompt vs. Good Prompt

Bad prompt:

```
write a function to send emails
```

What is wrong: No language specified. No context about what kind of emails. No constraints. AI will guess everything, and it will probably guess wrong.

Good prompt:

```
Role: You are a backend developer working with Node.js and TypeScript.

Context: I have an Express app that uses Nodemailer to send transactional emails. 
The SMTP credentials are stored in environment variables (SMTP_HOST, SMTP_PORT, 
SMTP_USER, SMTP_PASS). I already have Nodemailer installed.

Task: Write a reusable function called sendEmail that accepts to, subject, and 
htmlBody as parameters and sends an email using Nodemailer.

Constraints:
- Use TypeScript with proper type annotations
- Add error handling with try-catch
- Return a boolean (true if sent, false if failed)
- Log errors to console but do not throw them
- Keep it under 40 lines
```

The difference in output quality between these two prompts is massive.

### More Prompt Examples Using RCTC

Example — Asking for a database query:

```
Role: You are a PostgreSQL expert.

Context: I have a table called "orders" with columns: id, user_id, amount, 
status (pending/completed/cancelled), created_at. The table has about 2 million rows.

Task: Write a query that gives me the total revenue per month for the last 12 months, 
only counting completed orders.

Constraints:
- Optimize for performance on a large table
- Use date_trunc for month grouping
- Order results from oldest to newest
- Format the output with month name and total amount
```

Example — Asking for a React component:

```
Role: You are a frontend developer who writes clean React with TypeScript.

Context: I am building a task management app. I use React 18, TypeScript, and 
Tailwind CSS for styling. The app already has a Task type defined as 
{ id: string, title: string, completed: boolean, dueDate: string }.

Task: Create a TaskCard component that displays a single task with its title, 
due date, and a checkbox to mark it complete. When the checkbox is clicked, 
call an onToggle callback.

Constraints:
- Use functional component with proper TypeScript props interface
- Use Tailwind for styling, no custom CSS
- Show overdue tasks with a red border (compare dueDate to today)
- Keep the component in a single file
- Make it accessible (proper labels, keyboard navigation)
```

---

## 3. Zero-Shot to Few-Shot Escalation

### The Idea

When your prompt does not give the right output, most people make the prompt longer and more complicated. That often makes things worse.

Instead, try showing AI what you mean by giving examples. This is the escalation ladder:

### Level 1 — Zero-Shot (No Examples)

You just describe what you want.

```
Write a function that converts a date string like "2025-06-04" into 
a human-readable format like "4 June 2025".
```

If the output is what you expected, great. You are done. If not, escalate.

### Level 2 — One-Shot (One Example)

Give one clear example of input and expected output.

```
Write a function that converts date strings into human-readable format.

Example:
Input: "2025-06-04"
Output: "4 June 2025"
```

### Level 3 — Few-Shot (Multiple Examples)

Give 2-3 examples so the AI sees the pattern clearly.

```
Write a function that converts date strings into human-readable format.

Examples:
Input: "2025-06-04" -> Output: "4 June 2025"
Input: "2023-01-15" -> Output: "15 January 2023"
Input: "2024-12-31" -> Output: "31 December 2024"
```

### When to Escalate

- Zero-shot gave wrong format? Add one example.
- AI is not following a specific naming convention? Show it 2-3 examples.
- The pattern is non-obvious or custom to your project? Always use few-shot.
- AI keeps misunderstanding what you want? Examples beat longer explanations.

### Real-World Few-Shot Example

Say you want AI to generate API error responses in a specific format:

```
Generate error response objects for my API. Follow this exact format:

Example 1:
Situation: User not found
Response: { "success": false, "error": { "code": "USER_NOT_FOUND", "message": "No user exists with the provided ID", "status": 404 } }

Example 2:
Situation: Invalid email format
Response: { "success": false, "error": { "code": "INVALID_EMAIL", "message": "The email address provided is not in a valid format", "status": 400 } }

Now generate responses for:
- Expired authentication token
- Insufficient permissions
- Rate limit exceeded
```

AI will follow your exact format because you showed it the pattern instead of describing it.

---

## 4. Chain-of-Thought Prompting

### What Is It

Chain-of-thought (CoT) prompting means asking AI to think through the problem step by step before giving a final answer. Instead of jumping to a solution, it reasons through the logic first.

### Why It Works

AI models are better at complex reasoning when they "show their work." It is the same reason teachers ask you to show your steps in math — the process helps you get the right answer.

### When to Use It

- Debugging complex code
- Algorithm design
- Architecture decisions
- Any problem that requires multiple logical steps
- When AI gives you a wrong answer and you want it to try harder

### When NOT to Use It

- Simple code generation (boilerplate, CRUD, straightforward functions)
- Formatting or styling tasks
- When you just need a quick answer and do not care about reasoning

### How to Trigger Chain-of-Thought

Simple version — just add "think step by step":

```
I have a function that is supposed to find the longest palindrome in a string, 
but it returns wrong results for inputs with spaces. 

Think step by step about what could be going wrong, then provide a fix.
```

Structured version — break it down explicitly:

```
I need to design a caching strategy for my API.

Context: Express app, PostgreSQL database, ~5000 requests/minute, 
data changes every few minutes.

Before giving me the solution, I want you to:
1. List the options available (Redis, in-memory, CDN, etc.)
2. Evaluate pros and cons of each for my use case
3. Recommend one approach with reasoning
4. Then write the implementation code
```

### Chain-of-Thought for Debugging

Without CoT:

```
Fix this function, it is not working:
[paste broken code]
```

AI might give you a fix that addresses the wrong problem.

With CoT:

```
This function is supposed to sort users by their last login date, 
most recent first. But some users with null lastLogin values are 
appearing at the top instead of the bottom.

Before fixing it, I want you to:
1. Read through the code and identify where the null handling happens
2. Explain why nulls are ending up at the top
3. Suggest the fix
4. Then give me the corrected code

[paste broken code]
```

Much better output because AI actually analyzes the problem before jumping to a solution.

---

## 5. Iterative Prompting and Fixing Hallucinations

### What Are Hallucinations

Hallucinations happen when AI generates something that looks correct but is actually made up. Common hallucinations in coding:

- Inventing methods that do not exist on a library (e.g., "use axios.retry()" — this is not a real method)
- Using wrong function signatures (right method name, wrong parameters)
- Referencing packages that were never published to npm or pip
- Mixing up syntax between different versions of a language
- Confidently explaining code behavior that is completely wrong

### How to Spot Them

- If a method name looks unfamiliar, look it up in the official docs
- If AI suggests a package you have never heard of, search for it on npm/pip
- If the logic feels too clean for a hard problem, test it with edge cases
- If AI says "this built-in function does X" and you are not sure, verify it

### Iterative Prompting — The Fix Loop

Instead of writing a new prompt from scratch, fix the current output through follow-ups:

Round 1 — Your initial prompt:

```
Write a Node.js function that retries a failed HTTP request up to 3 times 
with exponential backoff.
```

AI gives you code that uses a made-up method.

Round 2 — Correct the hallucination:

```
The method you used does not exist. Use the standard fetch API with a 
manual retry loop and setTimeout wrapped in a Promise for the delay.
```

Round 3 — Refine further:

```
Good. Now add these improvements:
- Add a maximum timeout of 30 seconds total across all retries
- If all retries fail, throw a custom RetryExhaustedError with the last error as cause
- Add console.log statements showing which retry attempt is happening
```

Round 4 — Make it production-ready:

```
Now make this production-ready:
- Replace console.log with a logger parameter that defaults to console
- Add TypeScript types
- Handle the case where the server returns a 429 (rate limited) and use 
  the Retry-After header for the delay instead of exponential backoff
```

### Useful Phrases for Iterative Prompting

- "That method does not exist. Use [correct approach] instead."
- "This is close but [specific thing] is wrong. Fix only that part."
- "Now add error handling for [specific edge case]."
- "Simplify this. Remove [unnecessary thing] and keep it focused."
- "Make this production-ready — add proper types, error handling, and logging."
- "This works for the happy path. Now handle the case where [failure scenario]."

### When to Stop Iterating

Stop iterating and write it yourself when:
- You have gone back and forth more than 4-5 times and it is still not right
- You understand the solution clearly enough to write it faster yourself
- AI keeps making the same mistake even after correction
- The problem requires deep knowledge of your specific codebase that AI cannot have

---

## Cheat Sheet — Prompt Patterns You Can Copy

### Pattern 1: Quick Feature

```
Build a [thing] that does [behavior]. Use [technology]. Keep it simple.
```

### Pattern 2: Structured RCTC

```
Role: You are a [type] developer.
Context: [Your project details]
Task: [Exactly what you need]
Constraints: [Rules and limits]
```

### Pattern 3: Few-Shot

```
Do [task]. Follow this format:

Example 1: [input] -> [output]
Example 2: [input] -> [output]

Now do it for: [your actual inputs]
```

### Pattern 4: Chain-of-Thought Debug

```
This code is supposed to [expected behavior] but instead it [actual behavior].

Before fixing, explain:
1. What the code currently does step by step
2. Where it goes wrong
3. Why it goes wrong
4. The fix

[paste code]
```

### Pattern 5: Iterative Refinement

```
[Start with a simple prompt]
-> [Get output]
-> "Good, now also add [feature]"
-> "Fix [specific issue]"
-> "Make it production-ready"
```

---

## Key Takeaways to Remember

1. Vibe coding is for speed. Use it to prototype fast, not to ship production code blindly.
2. Every good prompt has Role, Context, Task, and Constraints. Missing any one of these drops output quality.
3. When AI misunderstands you, show it examples instead of writing longer explanations.
4. For hard problems, ask AI to think step by step. It produces dramatically better results.
5. AI will hallucinate. That is normal. Your job is to verify, catch it, and correct it through follow-up prompts.
6. Know when to stop prompting and start coding yourself. AI is a tool, not a crutch.
