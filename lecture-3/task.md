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
