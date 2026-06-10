<!-- project-type-->pure js or vannila js +nodejs/express js
authentication planning->JWT based authentication storing either in local or cookies
password hashing-->bcryptjs -->


1st prompt:
you are setting up a nodejs/express project from scratch

do not write any apllication code yet- i want only want project strucuture.



Task:

1.show me the exact folder structrure to create (as a tree)

auth-app/

server.js

routes/auth.js

middlware/auth.js

utils/jwt.js

utils/password.js

public/register.html

public/login.html

public/dashboard.html



2.generate package.json with

name:auth-app

main:server.js

script:start:node server.js,dev:nodemon server.js

dependency:express,jsonwebtoken,bcrypt,cors,uuid



3. generate a one-line terminal command to install all dependency



output Only: folder tree,package.json,npm install command.

no explanations, no other files




second-
generate two nodejs utils files. jwt.js and password.js. follown some rules for both

-module approach(import and export)

- all async funtion with try catch

- no console.log





file-1 utils/jwt.js

purpose:JWT sign and verification helper function

JWT_Secret:process.env.jwt_secret || "vikas"



function-1 signtoken(payload)

-sign payload with secret

-set expire date:1d

-retrun: the jwt string

-throw:error on failure



function-2 verifyToken(token)

-verify the token  with secret

- retruns:decoded payload

-throw error on failure



export the file or both function



file-2 utils/password.js

purpose:bcrypt password helper

salt round=10



function-1:hashpassowrd(plaintxt)

-hashes with bcrypt, salt round

-return:hashed password string

-throw error on failure




prompt-3
Generate middleware/auth.js for an Express app.

This middleware verifies a Bearer JWT from the Authorization header.
It uses verifyToken from '../utils/jwt.js' (already exists — DO NOT rewrite it).

SPEC:
  Function name: authenticateToken(req, res, next)
  Export: module.exports = authenticateToken

  Step 1: Read req.headers['authorization']
          Split on ' ' — token is the second part
          If missing or not 'Bearer <token>' format:
            return res.status(401).json({ error: 'No token provided' })

  Step 2: Call verifyToken(token)
          If success: attach decoded payload to req.user, call next()
          If error: return res.status(401).json({ error: 'Invalid or expired token' })

  Rules:
  - No console.log
  - No TODO comments
  - Use try/catch around verifyToken call
  - CommonJS (require/module.exports)

Output: only middleware/auth.js. No explanations.


prompt-4
Generate routes/auth.js for an Express app.
This is a Router file — use express.Router().

IMPORTS (use these exact paths — files already exist):
  const { hashPassword, comparePassword } = require('../utils/password');
  const { signToken } = require('../utils/jwt');
  const authenticateToken = require('../middleware/auth');
  const { v4: uuidv4 } = require('uuid');

IN-MEMORY USERS STORE (define at top of file):
  const users = [];
  Each user object: { id, name, email, passwordHash }

ROUTE 1: POST /register
  Body   : { name, email, password }
  Logic  :
    1. If password.length < 8 → 400 'Password must be at least 8 characters'
    2. If email exists in users array → 400 'Email already registered'
    3. hash = await hashPassword(password)
    4. Push { id: uuidv4(), name, email, passwordHash: hash } to users
    5. Return 201 { message: 'Registered', userId: newUser.id }
  Catch  : 500 { error: 'Registration failed' }

ROUTE 2: POST /login
  Body   : { email, password }
  Logic  :
    1. Find user by email in users array
    2. If not found OR comparePassword fails → 401 'Invalid email or password'
    3. token = signToken({ userId: user.id, email: user.email })
    4. Return 200 { token }
  Catch  : 500 { error: 'Login failed' }

ROUTE 3: GET /me
  Middleware: authenticateToken (apply before handler)
  Logic  :
    1. Find user by req.user.userId in users array
    2. If not found → 404 { error: 'User not found' }
    3. Return 200 { userId: user.id, email: user.email, name: user.name }
  NEVER return passwordHash in any response




prompt-5
Generate server.js — the Express app entry point.

IMPORTS (all files already exist — use these exact paths):
  express, cors (npm packages)
  authRoutes from './routes/auth'

SETUP:
  1. Create Express app
  2. Enable CORS for origin: 'http://localhost:5500' (VS Code Live Server)
     methods: GET, POST
     allowedHeaders: Content-Type, Authorization
  3. Enable express.json() body parser
  4. Serve static files from ./public folder (express.static)
  5. Mount authRoutes at '/api'
  6. Add a catch-all 404 handler:
     res.status(404).json({ error: 'Route not found' })
  7. Start server on PORT = process.env.PORT || 3000
     Log: 'Server running on http://localhost:3000'  (only this one log is allowed)

RULES:
  - No other console.log
  - No TODO comments
  - CommonJS (require)

Output: only server.js. No explanation.





6th prompt
Generate public/login.html — a standalone HTML file.
Same styling rules as register.html (centred card, #2E86C1 primary).

FORM FIELDS:
  - Email (type=email, id='email', required)
  - Password (type=password, id='password', required)
  - Submit button: 'Login'
  - Error div: id='errorMsg', hidden by default, red text (#E74C3C)
  - Link at bottom: 'No account? Register here' → register.html

JAVASCRIPT (in <script> block):
  On form submit:
  1. Prevent default
  2. POST to http://localhost:3000/api/login
     body: { email, password }
     headers: { 'Content-Type': 'application/json' }
  3. On 200: save token → localStorage.setItem('auth_token', data.token)
             then redirect to dashboard.html
  4. On error: show response error message in errorMsg div
  5. Wrap in try/catch → show 'Login failed. Try again.' on network error

Output: only login.html, complete and working. No explanation.


dashboard prompt
Generate public/dashboard.html — a standalone HTML file.
No external CSS files. No JavaScript frameworks.
All styles in <style>. All JS in <script>.

ON PAGE LOAD (window.onload or DOMContentLoaded):
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
      onClick: localStorage.removeItem('auth_token'), redirect to login.html
  - A loading state: show 'Loading...' text while fetching

STYLING:
  - Same card style as login/register pages
  - Logout button: red (#E74C3C), white text, full width

Output: only dashboard.html, complete and working. No explanation.


review prompt
Review ALL the files we have generated across these 7 steps:
  utils/jwt.js, utils/password.js, middleware/auth.js,
  routes/auth.js, server.js,
  public/register.html, public/login.html, public/dashboard.html

Check for these integration issues:
1. Does the CORS origin in server.js match the URL used in fetch() calls in HTML?
2. Are all import paths correct (relative paths between files)?
3. Does the Authorization header format in dashboard.html match
   what the auth middleware expects?
4. Is the localStorage key 'auth_token' consistent across login and dashboard?
5. Do the API error message strings in routes/auth.js match
   what the HTML pages display to users?

List any mismatches found. Fix only what is broken.


