const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
