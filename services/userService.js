const bcrypt = require("bcrypt");
const { sendRegistrationEmail } = require("./emailService");
const {
  createPassenger,
  emailExists,
  phoneExists,
} = require("../models/passengerModel");

// Function to handle passenger registration
const registerPassenger = async (username, email, phone, password) => {
  // Check if the email or phone already exists
  const emailExistsCheck = await emailExists(email);
  if (emailExistsCheck) {
    throw new Error("Email is already registered.");
  }

  const phoneExistsCheck = await phoneExists(phone);
  if (phoneExistsCheck) {
    throw new Error("Phone number is already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await createPassenger(username, email, phone, hashedPassword);
    await sendRegistrationEmail(email, username, password);
    return { message: "Registration successful, confirmation email sent." };
  } catch (error) {
    throw new Error("Registration failed: " + error.message);
  }
};

module.exports = {
  registerPassenger,
};
