import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "vikas";

async function signToken(payload) {
  try {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    return token;
  } catch (error) {
    throw new Error(`Failed to sign token: ${error.message}`);
  }
}

async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error(`Failed to verify token: ${error.message}`);
  }
}

export { signToken, verifyToken };
