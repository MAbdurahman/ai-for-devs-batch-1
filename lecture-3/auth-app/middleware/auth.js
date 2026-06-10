const { verifyToken } = require("../utils/jwt.js");

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const parts = authHeader ? authHeader.split(" ") : [];

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = parts[1];

  try {
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = authenticateToken;
