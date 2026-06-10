# Auth App — Prompt Engineering Handbook

> **Project Type:** Vanilla JS + Node.js/Express
> **Auth Strategy:** JWT-based (stored in localStorage)
> **Password Hashing:** bcrypt

---

## Prompt 1: Project Structure & Setup

```
You are setting up a Node.js/Express project from scratch.
Do NOT write any application code yet — I only want the project structure.

TASK:

1. Show me the exact folder structure as a tree:
   auth-app/
   ├── server.js
   ├── routes/auth.js
   ├── middleware/auth.js
   ├── utils/jwt.js
   ├── utils/password.js
   ├── public/register.html
   ├── public/login.html
   └── public/dashboard.html

2. Generate package.json with:
   - name: auth-app
   - main: server.js
   - scripts:
       start: node server.js
       dev: nodemon server.js
   - dependencies: express, jsonwebtoken, bcrypt, cors, uuid

3. Generate a one-line terminal command to install all dependencies.

OUTPUT: Only folder tree, package.json, and npm install command.
No explanations. No other files.
```

---

## Prompt 2: Utility Files (jwt.js & password.js)

```
Generate two Node.js utility files. Follow these rules for BOTH:
- CommonJS module pattern (require / module.exports)
- All functions must be async with try/catch
- No console.log anywhere

---

FILE 1: utils/jwt.js
Purpose: JWT sign and verification helper

Constants:
  JWT_SECRET = process.env.JWT_SECRET || "vikas"

Function 1: signToken(payload)
  - Signs payload with JWT_SECRET
  - Expiry: 1 day ('1d')
  - Returns: JWT string
  - Throws: Error on failure

Function 2: verifyToken(token)
  - Verifies token with JWT_SECRET
  - Returns: decoded payload
  - Throws: Error on failure

Export: { signToken, verifyToken }

---

FILE 2: utils/password.js
Purpose: bcrypt password helper

Constants:
  SALT_ROUNDS = 10

Function 1: hashPassword(plainText)
  - Hashes with bcrypt using SALT_ROUNDS
  - Returns: hashed password string
  - Throws: Error on failure

Function 2: comparePassword(plainText, hashedPassword)
  - Compares plain text against hash
  - Returns: boolean (true/false)
  - Throws: Error on failure

Export: { hashPassword, comparePassword }

---

OUTPUT: Only the two files. No explanations.
```

---

## Prompt 3: Auth Middleware

```
Generate middleware/auth.js for an Express app.
This middleware verifies a Bearer JWT from the Authorization header.
It uses verifyToken from '../utils/jwt.js' (already exists — DO NOT rewrite it).

SPEC:
  Function: authenticateToken(req, res, next)
  Export: module.exports = authenticateToken

  Step 1: Read req.headers['authorization']
    - Split on ' ' — token is the second part
    - If missing or not 'Bearer <token>' format:
      → return res.status(401).json({ error: 'No token provided' })

  Step 2: Call verifyToken(token)
    - Success: attach decoded payload to req.user, call next()
    - Error: return res.status(401).json({ error: 'Invalid or expired token' })

RULES:
  - No console.log
  - No TODO comments
  - Use try/catch around verifyToken call
  - CommonJS (require / module.exports)

OUTPUT: Only middleware/auth.js. No explanations.
```

---

## Prompt 4: Auth Routes

```
Generate routes/auth.js for an Express app.
This is a Router file — use express.Router().

IMPORTS (use these exact paths — files already exist):
  const { hashPassword, comparePassword } = require('../utils/password');
  const { signToken } = require('../utils/jwt');
  const authenticateToken = require('../middleware/auth');
  const { v4: uuidv4 } = require('uuid');

IN-MEMORY USERS STORE (define at top of file):
  const users = [];
  Each user object shape: { id, name, email, passwordHash }

---

ROUTE 1: POST /register
  Body: { name, email, password }
  Logic:
    1. If password.length < 8 → 400 { error: 'Password must be at least 8 characters' }
    2. If email already exists in users → 400 { error: 'Email already registered' }
    3. hash = await hashPassword(password)
    4. Push { id: uuidv4(), name, email, passwordHash: hash } to users
    5. Return 201 { message: 'Registered', userId: newUser.id }
  Catch: 500 { error: 'Registration failed' }

ROUTE 2: POST /login
  Body: { email, password }
  Logic:
    1. Find user by email in users array
    2. If not found OR comparePassword fails → 401 { error: 'Invalid email or password' }
    3. token = await signToken({ userId: user.id, email: user.email })
    4. Return 200 { token }
  Catch: 500 { error: 'Login failed' }

ROUTE 3: GET /me
  Middleware: authenticateToken (apply before handler)
  Logic:
    1. Find user by req.user.userId in users array
    2. If not found → 404 { error: 'User not found' }
    3. Return 200 { userId: user.id, email: user.email, name: user.name }
  NEVER return passwordHash in any response.

---

RULES:
  - CommonJS (require / module.exports)
  - All route handlers with DB calls must be async
  - No console.log, no TODO comments

OUTPUT: Only routes/auth.js. No explanations.
```

---

## Prompt 5: Server Entry Point

```
Generate server.js — the Express app entry point.

IMPORTS (all files already exist — use these exact paths):
  express, cors, path, http (npm/core packages)
  authRoutes from './routes/auth'

SETUP:
  1. Create Express app
  2. Create HTTP server using http.createServer(app)
  3. Enable CORS:
     - origin: ['http://localhost:5500', 'http://localhost:5501',
                'http://127.0.0.1:5500', 'http://127.0.0.1:5501']
     - methods: ['GET', 'POST']
     - allowedHeaders: ['Content-Type', 'Authorization']
  4. Enable express.json() body parser
  5. Serve static files from ./public folder (express.static)
  6. Add root route: GET '/' → redirect to /register.html
  7. Mount authRoutes at '/api'
  8. Add catch-all 404 handler:
     res.status(404).json({ error: 'Route not found' })
  9. Add error handler middleware (err, req, res, next):
     res.status(err.status || 500).json({ error: err.message || 'Internal server error' })
  10. Start server on PORT = process.env.PORT || 3000
      Log: 'Server running on http://localhost:3000'

RULES:
  - Only ONE console.log (the startup message)
  - No TODO comments
  - CommonJS (require)
  - Use http.createServer for Express 5 compatibility

OUTPUT: Only server.js. No explanations.
```

---

## Prompt 6: Frontend — Register Page

```
Generate public/register.html — a standalone HTML file.
No external CSS files. No JavaScript frameworks.
All styles in a <style> block. All JS in a <script> block.

FORM FIELDS:
  - Full Name (type=text, id='name', required)
  - Email (type=email, id='email', required)
  - Password (type=password, id='password', required, minlength=8)
  - Confirm Password (type=password, id='confirmPassword', required)
  - Submit button: 'Create Account'
  - Error div: id='errorMsg', hidden by default, red text (#E74C3C)
  - Link at bottom: 'Already have an account? Login' → login.html

JAVASCRIPT:
  On form submit:
  1. Prevent default
  2. If password !== confirmPassword → show 'Passwords do not match'
  3. If password.length < 8 → show 'Password must be at least 8 characters'
  4. POST to http://localhost:3000/api/register
     body: { name, email, password }
     headers: { 'Content-Type': 'application/json' }
  5. On 201 → redirect to login.html
  6. On error → show response error message in errorMsg div
  7. Wrap in try/catch → show 'Something went wrong. Try again.'

STYLING:
  - Centred card (max-width: 400px, margin: auto, padding: 2rem)
  - Primary colour: #2E86C1 (button + headings)
  - Button: full width, hover darkens to #1A5276
  - Font: system-ui, Arial, sans-serif
  - Input focus: blue border with subtle box-shadow

OUTPUT: Only register.html, complete and working. No explanations.
```

---

## Prompt 7: Frontend — Login Page

```
Generate public/login.html — a standalone HTML file.
Same styling rules as register.html (centred card, #2E86C1 primary).

FORM FIELDS:
  - Email (type=email, id='email', required)
  - Password (type=password, id='password', required)
  - Submit button: 'Login'
  - Error div: id='errorMsg', hidden by default, red text (#E74C3C)
  - Link at bottom: 'No account? Register here' → register.html

JAVASCRIPT:
  On form submit:
  1. Prevent default
  2. POST to http://localhost:3000/api/login
     body: { email, password }
     headers: { 'Content-Type': 'application/json' }
  3. On 200 → localStorage.setItem('auth_token', data.token)
              then redirect to dashboard.html
  4. On error → show response error message in errorMsg div
  5. Wrap in try/catch → show 'Login failed. Try again.'

OUTPUT: Only login.html, complete and working. No explanations.
```

---

## Prompt 8: Frontend — Dashboard Page

```
Generate public/dashboard.html — a standalone HTML file.
No external CSS files. No JavaScript frameworks.
All styles in <style>. All JS in <script>.

ON PAGE LOAD (DOMContentLoaded):
  1. Read localStorage.getItem('auth_token')
  2. If null/undefined → immediately redirect to login.html
  3. Call GET http://localhost:3000/api/me
     Header: Authorization: Bearer <token>
  4. If response.status === 401 →
       localStorage.removeItem('auth_token')
       redirect to login.html
  5. On success → populate UI with user data

UI ELEMENTS:
  - Heading: 'Welcome, <user.name>!' (id='welcomeMsg')
  - Paragraph: 'Email: <user.email>' (id='userEmail')
  - Logout button (id='logoutBtn'):
      onClick → localStorage.removeItem('auth_token'), redirect to login.html
  - Loading state: show 'Loading...' text while fetch is in progress

STYLING:
  - Same card style as login/register pages
  - Logout button: background #E74C3C, white text, full width

OUTPUT: Only dashboard.html, complete and working. No explanations.
```

---

## Prompt 9: Integration Review

```
Review ALL files generated across the previous prompts:
  utils/jwt.js, utils/password.js, middleware/auth.js,
  routes/auth.js, server.js,
  public/register.html, public/login.html, public/dashboard.html

Check for these integration issues:

1. Does the CORS origin in server.js match the URL used in fetch() calls in HTML files?
2. Are all require/import paths correct (relative paths between files)?
3. Does the Authorization header format in dashboard.html match
   what the auth middleware expects?
4. Is the localStorage key ('auth_token') consistent across login.html and dashboard.html?
5. Do the API error message strings in routes/auth.js match
   what the HTML pages display to users?
6. Is the module system consistent? (all CommonJS or all ESM — no mixing)
7. Does Express 5 require http.createServer for the server to stay alive?

List any mismatches found. Fix only what is broken.
Do NOT rewrite files that are working correctly.
```

---

## Quick Reference — API Endpoints

| Method | Endpoint      | Auth Required | Purpose          |
| ------ | ------------- | ------------- | ---------------- |
| POST   | /api/register | No            | Create account   |
| POST   | /api/login    | No            | Get JWT token    |
| GET    | /api/me       | Yes (Bearer)  | Get user profile |

---

## Quick Reference — Run Commands

```bash
# Install dependencies
npm install express jsonwebtoken bcrypt cors uuid dotenv nodemon

# Start server
npm start

# Start with auto-reload
npm run dev

# Test URLs
# http://localhost:3000/              → redirects to register
# http://localhost:3000/register.html → registration form
# http://localhost:3000/login.html    → login form
# http://localhost:3000/dashboard.html→ protected dashboard
```
