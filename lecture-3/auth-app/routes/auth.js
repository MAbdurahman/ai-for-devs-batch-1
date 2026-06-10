const { Router } = require("express");
const { hashPassword, comparePassword } = require("../utils/password");
const { signToken } = require("../utils/jwt");
const authenticateToken = require("../middleware/auth");
const { v4: uuidv4 } = require("uuid");

const router = Router();
const users = [];

// POST /register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hash = await hashPassword(password);
    const newUser = { id: uuidv4(), name, email, passwordHash: hash };
    users.push(newUser);

    return res.status(201).json({ message: "Registered", userId: newUser.id });
  } catch (error) {
    return res.status(500).json({ error: "Registration failed" });
  }
});

// POST /login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = await signToken({ userId: user.id, email: user.email });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Login failed" });
  }
});

// GET /me
router.get("/me", authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res
    .status(200)
    .json({ userId: user.id, email: user.email, name: user.name });
});

module.exports = router;
