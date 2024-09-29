const bcrypt = require("bcrypt");
const { sendRegistrationEmail } = require("./emailService");
const Driver = require("../models/driverModel");
const Passenger = require("../models/passengerModel");

// Function to handle passenger registration
const registerPassenger = async (username, email, phone, password) => {
  // Check if the email or phone already exists using the updated methods
  const emailExistsCheck = await Passenger.emailExists(email);
  if (emailExistsCheck) {
    throw new Error("Email is already registered.");
  }

  const phoneExistsCheck = await Passenger.phoneExists(phone);
  if (phoneExistsCheck) {
    throw new Error("Phone number is already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // Use the `createPassenger` method
    await Passenger.createPassenger(username, email, phone, hashedPassword);
    await sendRegistrationEmail(email, username, password);
    return {
      message: "Passenger registration successful, confirmation email sent.",
    };
  } catch (error) {
    throw new Error("Passenger registration failed: " + error.message);
  }
};

module.exports = {
  registerPassenger,
};

// Function to handle driver registration
const registerDriver = async (
  username,
  email,
  phoneNumber,
  vehicleType,
  vehicleNumber,
  password
) => {
  const existingDriver = await Driver.findByEmail(email);
  if (existingDriver) {
    throw new Error("Email is already registered.");
  }

  const existingPhone = await Driver.findByPhoneNumber(phoneNumber);
  if (existingPhone) {
    throw new Error("Phone number is already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await Driver.create({
      username,
      email,
      phoneNumber,
      vehicleType,
      vehicleNumber,
      password: hashedPassword,
      status: "available",
    });
    await sendRegistrationEmail(email, username, password);
    return { message: "Registration successful, confirmation email sent." };
  } catch (error) {
    throw new Error("Registration failed: " + error.message);
  }
};

module.exports = {
  registerPassenger,
  registerDriver,
};
