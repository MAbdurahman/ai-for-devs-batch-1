import { Router } from "express";

const router = Router();

// POST /api/auth/register
router.post("/register", (req, res) => {
  res.json({ message: "Register route working" });
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  res.json({ message: "Login route working" });
});

export default router;
