const { registerPassenger } = require("../services/userService");

// Function to handle registration request
const register = async (req, res) => {
  const { username, email, phone, password } = req.body;
  try {
    const response = await registerPassenger(username, email, phone, password);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
};
