// controllers/authController.js
const { registerPassenger } = require("../services/userService");
const { registerDriver } = require("../services/userService");
const { loginPassenger, loginDriver } = require("../services/userService");
const Admin = require("../models/Admin"); // Adjust the path as necessary

// Function to handle registration request
const register = async (req, res) => {
  const {
    userType,
    username,
    email,
    phone,
    password,
    vehicleType,
    vehicleNumber,
  } = req.body;

  try {
    let response;

    if (userType === "passenger") {
      response = await registerPassenger(username, email, phone, password);
    } else if (userType === "driver") {
      response = await registerDriver(
        username,
        email,
        phone,
        vehicleType,
        vehicleNumber,
        password
      );
    } else {
      return res.status(400).json({ message: "Invalid user type." });
    }

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Function to handle login request
const login = async (req, res) => {
  const { userType, emailOrPhone, password } = req.body;

  try {
    let response;

    if (userType === "passenger") {
      response = await loginPassenger(emailOrPhone, password);
    } else if (userType === "driver") {
      response = await loginDriver(emailOrPhone, password);
    } else {
      return res.status(400).json({ message: "Invalid user type." });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Function to handle admin login
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find admin by username
    const admin = await Admin.findByUsername(username);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Validate password
    const isValidPassword = Admin.validatePassword(admin.password, password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If username and password are valid
    return res
      .status(200)
      .json({ message: "Login successful", adminId: admin.id });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  loginAdmin,
};
