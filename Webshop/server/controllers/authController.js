// controllers/authController.js
const authService = require("../services/authService");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    return res.json(token);
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const token = await authService.register(
      first_name,
      last_name,
      email,
      password
    );

    return res.status(201).json(token);
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Error registering user" });
  }
};

module.exports = { loginUser, registerUser };
