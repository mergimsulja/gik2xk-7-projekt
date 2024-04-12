// utils/authUtils.js
const jwt = require("jsonwebtoken");

const generateJWTToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const options = {
    expiresIn: "2h",
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

module.exports = { generateJWTToken };
