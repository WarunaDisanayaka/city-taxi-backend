// controllers/authController.js
const { registerPassenger } = require("../services/userService");
const { registerDriver } = require("../services/userService"); // Ensure this import exists

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

module.exports = {
  register,
};
