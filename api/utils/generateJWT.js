const jwt = require("jsonwebtoken");

const generateJWT = (payload) => {
  return jwt.sign(payload, "SECRET", { expiresIn: "7d" });
};

module.exports = generateJWT;
