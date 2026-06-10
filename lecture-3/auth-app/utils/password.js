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

async function comparePassword(plainText, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainText, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error(`Failed to compare password: ${error.message}`);
  }
}

module.exports = { hashPassword, comparePassword };
