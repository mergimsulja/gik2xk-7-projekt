// services/authService.js
const { generateJWTToken } = require("../utils/authUtils");
const { User } = require("../models");

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !user.validPassword(password)) {
    throw new Error("Invalid email or password");
  }
  return { token: generateJWTToken(user), role: user.role, userId: user.id };
};

const register = async (first_name, last_name, email, password) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email is already registered");
  }
  const newUser = await User.create({ first_name, last_name, email, password });
  return {
    token: generateJWTToken(newUser),
    role: newUser.role,
    userId: newUser.id,
  };
};

module.exports = { login, register };
