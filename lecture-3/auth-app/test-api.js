const http = require("http");

function makeRequest(method, path, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: "localhost",
      port: 3000,
      path: path,
      method: method,
      headers: { "Content-Type": "application/json", ...headers },
    };

    if (data) {
      options.headers["Content-Length"] = Buffer.byteLength(data);
    }

    const req = http.request(options, (res) => {
      let responseData = "";
      res.on("data", (chunk) => {
        responseData += chunk;
      });
      res.on("end", () => {
        let parsed;
        try {
          parsed = JSON.parse(responseData);
        } catch (e) {
          parsed = { raw: responseData.substring(0, 200) };
        }
        resolve({ status: res.statusCode, body: parsed });
      });
    });

    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

async function runTests() {
  console.log("========================================");
  console.log("       AUTH API TEST RESULTS");
  console.log("========================================\n");

  // Test 1: Register - short password (expect 400)
  console.log("TEST 1: POST /api/register - short password");
  const t1 = await makeRequest("POST", "/api/register", {
    name: "Vikas",
    email: "vikas@test.com",
    password: "123",
  });
  console.log(`  Status: ${t1.status} | Expected: 400`);
  console.log(`  Response: ${JSON.stringify(t1.body)}`);
  console.log(`  Result: ${t1.status === 400 ? "PASS" : "FAIL"}\n`);

  // Test 2: Register - success (expect 201)
  console.log("TEST 2: POST /api/register - valid registration");
  const t2 = await makeRequest("POST", "/api/register", {
    name: "Vikas",
    email: "vikas@test.com",
    password: "password123",
  });
  console.log(`  Status: ${t2.status} | Expected: 201`);
  console.log(`  Response: ${JSON.stringify(t2.body)}`);
  console.log(`  Result: ${t2.status === 201 ? "PASS" : "FAIL"}\n`);

  // Test 3: Register - duplicate email (expect 400)
  console.log("TEST 3: POST /api/register - duplicate email");
  const t3 = await makeRequest("POST", "/api/register", {
    name: "Vikas2",
    email: "vikas@test.com",
    password: "password456",
  });
  console.log(`  Status: ${t3.status} | Expected: 400`);
  console.log(`  Response: ${JSON.stringify(t3.body)}`);
  console.log(`  Result: ${t3.status === 400 ? "PASS" : "FAIL"}\n`);

  // Test 4: Login - wrong email (expect 401)
  console.log("TEST 4: POST /api/login - wrong email");
  const t4 = await makeRequest("POST", "/api/login", {
    email: "wrong@test.com",
    password: "password123",
  });
  console.log(`  Status: ${t4.status} | Expected: 401`);
  console.log(`  Response: ${JSON.stringify(t4.body)}`);
  console.log(`  Result: ${t4.status === 401 ? "PASS" : "FAIL"}\n`);

  // Test 5: Login - wrong password (expect 401)
  console.log("TEST 5: POST /api/login - wrong password");
  const t5 = await makeRequest("POST", "/api/login", {
    email: "vikas@test.com",
    password: "wrongpass123",
  });
  console.log(`  Status: ${t5.status} | Expected: 401`);
  console.log(`  Response: ${JSON.stringify(t5.body)}`);
  console.log(`  Result: ${t5.status === 401 ? "PASS" : "FAIL"}\n`);

  // Test 6: Login - success (expect 200 + token)
  console.log("TEST 6: POST /api/login - correct credentials");
  const t6 = await makeRequest("POST", "/api/login", {
    email: "vikas@test.com",
    password: "password123",
  });
  console.log(`  Status: ${t6.status} | Expected: 200`);
  console.log(`  Response: ${JSON.stringify(t6.body)}`);
  console.log(`  Has token: ${!!t6.body.token}`);
  console.log(
    `  Result: ${t6.status === 200 && t6.body.token ? "PASS" : "FAIL"}\n`,
  );

  // Test 7: GET /me with valid token (expect 200)
  if (t6.body.token) {
    console.log("TEST 7: GET /api/me - with valid token");
    const t7 = await makeRequest("GET", "/api/me", null, {
      Authorization: `Bearer ${t6.body.token}`,
    });
    console.log(`  Status: ${t7.status} | Expected: 200`);
    console.log(`  Response: ${JSON.stringify(t7.body)}`);
    console.log(
      `  Result: ${t7.status === 200 && !t7.body.passwordHash ? "PASS" : "FAIL"}\n`,
    );
  }

  // Test 8: GET /me without token (expect 401)
  console.log("TEST 8: GET /api/me - no token");
  const t8 = await makeRequest("GET", "/api/me", null);
  console.log(`  Status: ${t8.status} | Expected: 401`);
  console.log(`  Response: ${JSON.stringify(t8.body)}`);
  console.log(`  Result: ${t8.status === 401 ? "PASS" : "FAIL"}\n`);

  console.log("========================================");
  console.log("       ALL TESTS COMPLETE");
  console.log("========================================");
}

runTests().catch((err) => console.error("Test runner error:", err.message));
