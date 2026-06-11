# Session 3 — Spec-Driven Development with AI

## 1. Transition from Prompts to Structured Specifications

### The Problem with Raw Prompts

When you just type "make me a login page" — the AI guesses everything. Which framework? What styling? Where does it POST? What errors does it show? You get random results every time.

### What is a Spec?

A spec is a **precise blueprint** that removes guessing. Instead of asking _what_ you want, you tell the AI _exactly_ how to build it.

### Student-Friendly Example

**❌ Bad Prompt (vague):**

```
Make me a login route in Express
```

AI might give you: session-based auth, passport.js, MongoDB, TypeScript — who knows.

**✅ Spec-Driven Prompt (precise):**

```
Generate POST /login route for Express.

IMPORTS: Use these exact paths (files exist):
  const { comparePassword } = require('../utils/password');
  const { signToken } = require('../utils/jwt');

BODY: { email, password }

LOGIC:
  1. Find user by email in users array
  2. If not found → 401 { error: 'Invalid email or password' }
  3. If comparePassword fails → 401 { error: 'Invalid email or password' }
  4. token = await signToken({ userId: user.id, email: user.email })
  5. Return 200 { token }

CATCH: 500 { error: 'Login failed' }

RULES: CommonJS, async/await, no console.log
```

**Key difference:** The spec tells AI the _shape_ of the output — imports, status codes, error messages, module system. No room for interpretation.

### Think of it Like Ordering Food

| Approach      | Example                                                                                 |
| ------------- | --------------------------------------------------------------------------------------- |
| Vague prompt  | "Get me something to eat"                                                               |
| Better prompt | "Get me a burger"                                                                       |
| Spec-driven   | "Get me a chicken burger, no onions, extra cheese, toasted bun, with fries on the side" |

The more specific your order, the closer the result matches what you actually wanted.

---

## 2. Writing Clear Technical Specs Before Code Generation

### The Spec Template

Every good spec has these 5 sections:

```
1. PURPOSE   — What does this file do? (one line)
2. INTERFACE — What are the inputs and outputs?
3. LOGIC     — Step-by-step behavior
4. ERRORS    — What happens when things go wrong?
5. RULES     — Constraints (module system, style, what NOT to do)
```

### Real Example — Specifying a JWT Utility

```
FILE: utils/jwt.js
PURPOSE: JWT sign and verification helper

CONSTANTS:
  JWT_SECRET = process.env.JWT_SECRET || "vikas"

FUNCTION 1: signToken(payload)
  Input: payload (object)
  Output: JWT string
  Behavior: Signs payload with secret, expires in 1 day
  Error: Throws with message "Failed to sign token: <reason>"

FUNCTION 2: verifyToken(token)
  Input: token (string)
  Output: decoded payload object
  Behavior: Verifies token against secret
  Error: Throws with message "Failed to verify token: <reason>"

EXPORT: { signToken, verifyToken }

RULES:
  - CommonJS (require/module.exports)
  - All functions async with try/catch
  - No console.log
  - No TODO comments
```

### Why Write Specs First?

1. **You think before you build** — catches design flaws early
2. **AI has no ambiguity** — produces exactly what you described
3. **You can review before code exists** — "Wait, should login return the user object too?"
4. **Teammates can read it** — specs are documentation that writes code

---

## 3. Few-Shot Prompting with Real Codebase Patterns

### What is Few-Shot Prompting?

"Few-shot" means giving the AI 1-3 examples of the pattern you want, then asking it to follow that same pattern for new code.

### Why it Works

AI is a pattern-matching machine. If you show it _your_ project's coding style, it mirrors it perfectly.

### Student-Friendly Example

Say your project already has `utils/password.js`:

```javascript
// EXISTING FILE — utils/password.js
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

async function hashPassword(plainText) {
  try {
    const hashedPassword = await bcrypt.hash(plainText, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Failed to hash password: ${error.message}`);
  }
}

module.exports = { hashPassword, comparePassword };
```

Now you want a new utility. Instead of describing the style, you SHOW it:

```
Here is an existing utility file in my project (utils/password.js):
<paste the code above>

Generate utils/jwt.js following the SAME patterns:
- Same module system (CommonJS)
- Same async/try/catch structure
- Same error message format ("Failed to X: <reason>")
- Same export style

Functions needed: signToken(payload), verifyToken(token)
```

### The Formula

```
Few-shot prompt = Example from your codebase + "Follow same pattern" + New requirement
```

### When to Use Few-Shot

| Situation                                   | Use Few-Shot?                      |
| ------------------------------------------- | ---------------------------------- |
| First file in a new project                 | No — write a detailed spec instead |
| Second file that should match the first     | Yes — show the first as an example |
| New route that should match existing routes | Yes — paste an existing route      |
| Completely different feature                | No — write a fresh spec            |

---

## 4. Generating Reliable Code Aligned with Requirements

### The "Alignment Checklist"

Before accepting AI-generated code, check:

| Check          | Question                                     | Fix                                  |
| -------------- | -------------------------------------------- | ------------------------------------ |
| Imports        | Do paths match my file structure?            | Specify exact paths in prompt        |
| Module system  | Is it CommonJS or ESM consistently?          | State "CommonJS" or "ESM" explicitly |
| Status codes   | Do they match my API contract?               | List every status code in spec       |
| Error messages | Are they consistent across frontend/backend? | Define exact strings                 |
| Variable names | Do they match what other files expect?       | Specify names like `req.user.userId` |

### Real Example — Catching Misalignment

Our auth-app had this potential bug:

- `routes/auth.js` stores `{ userId: user.id }` in the token
- `middleware/auth.js` attaches decoded token to `req.user`
- `routes/auth.js` GET /me reads `req.user.userId`

If `signToken` used `{ id: user.id }` instead of `{ userId: user.id }`, the `/me` route breaks silently. The spec prevents this by being explicit:

```
token = await signToken({ userId: user.id, email: user.email })
                          ^^^^^^
                          This key name MUST match what GET /me reads
```

### Integration Review Prompt

After generating all files, always run a review:

```
Review ALL files for integration issues:
1. Do CORS origins match fetch() URLs?
2. Are all require paths correct?
3. Is the Authorization header format consistent?
4. Are localStorage keys identical across pages?
5. Do error message strings match between API and frontend?
6. Is the module system consistent (all CJS or all ESM)?

List mismatches. Fix only what is broken.
```

---

## 5. Reducing Ambiguity and Improving Determinism

### What is Determinism?

**Determinism** = same prompt → same output every time.

AI is probabilistic (slightly random). But we can push it toward deterministic behavior by removing every possible decision it could make differently.

### The Ambiguity Scale

```
Most Ambiguous (unpredictable):
  "Make a user authentication system"

Less Ambiguous:
  "Make JWT auth with Express, bcrypt, in-memory storage"

Least Ambiguous (deterministic):
  Full spec with function names, status codes, error strings,
  module system, file paths, and exact response shapes
```

### 7 Techniques to Kill Ambiguity

| #   | Technique                   | Example                                                    |
| --- | --------------------------- | ---------------------------------------------------------- |
| 1   | Name every function         | `Function: authenticateToken(req, res, next)`              |
| 2   | Specify the module system   | `CommonJS (require/module.exports)`                        |
| 3   | Define exact error messages | `401 { error: 'No token provided' }`                       |
| 4   | List what NOT to do         | `No console.log, no TODO, no external CSS`                 |
| 5   | Constrain the output        | `Output: only server.js. No explanations.`                 |
| 6   | Provide exact import paths  | `require('../utils/jwt.js')`                               |
| 7   | State the response shape    | `Return 201 { message: 'Registered', userId: newUser.id }` |

### Student Exercise — Spot the Ambiguity

Which prompt will give more predictable results?

**Prompt A:**

```
Create a middleware that checks if the user is logged in
```

**Prompt B:**

```
Generate middleware/auth.js
Function: authenticateToken(req, res, next)
- Read Authorization header
- Split on ' ', token = parts[1]
- If missing: return 401 { error: 'No token provided' }
- Call verifyToken(token) from '../utils/jwt.js'
- Success: req.user = decoded, call next()
- Failure: return 401 { error: 'Invalid or expired token' }
- Export: module.exports = authenticateToken
```

**Answer:** Prompt B. It specifies the function name, error messages, import path, behavior on success/failure, and export format. AI has zero decisions to make on its own.

---

## Summary — The Spec-Driven Workflow

```
Step 1: Design your file structure (tree)
Step 2: Write specs for each file (purpose, interface, logic, errors, rules)
Step 3: Generate one file at a time (small, focused prompts)
Step 4: Use few-shot for files that should match existing patterns
Step 5: Run an integration review across all files
Step 6: Test the actual running application
```

### Key Takeaway

> **The quality of AI-generated code is directly proportional to the quality of your specification.**

Garbage spec → garbage code.
Precise spec → production-ready code on the first try.

---

## Homework Challenge

Take any small feature you want to build. Before writing a single prompt:

1. Draw the folder structure
2. Write a spec for each file using the 5-section template
3. Only THEN start prompting the AI

Compare the results with your previous "just ask and hope" approach. Notice the difference.
