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

