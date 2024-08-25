require("dotenv").config();
const jwt = require("jsonwebtoken");

function signJwt(payload, options) {
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

function verifyJwt(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      decoded,
      valid: true,
      expired: false,
    };
  } catch (error) {
    return {
      decoded: null,
      valid: false,
      expired: error.message === "jwt expired",
    };
  }
}

module.exports = { signJwt, verifyJwt }