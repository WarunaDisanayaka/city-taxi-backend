const bcrypt = require("bcrypt");
const { sendRegistrationEmail } = require("./emailService");
const Driver = require("../models/driverModel");
const Passenger = require("../models/passengerModel");
const { generateToken } = require("./authService"); // Assume you have a function to generate JWT

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

const loginPassenger = async (emailOrPhone, password) => {
  // Check if the email or phone exists
  const passenger = await Passenger.findByEmailOrPhone(emailOrPhone);
  if (!passenger) {
    throw new Error("Invalid email/phone or password.");
  }

  // Compare the provided password with the hashed password
  const passwordMatch = await bcrypt.compare(password, passenger.password);
  if (!passwordMatch) {
    throw new Error("Invalid email/phone or password.");
  }

  // Generate token (assuming JWT)
  const token = generateToken({ id: passenger.id, role: "passenger" });

  return {
    message: "Login successful",
    token,
    passenger: {
      id: passenger.id,
      username: passenger.username,
      email: passenger.email,
      phone: passenger.phone,
    },
  };
};

const loginDriver = async (emailOrPhone, password) => {
  // Check if the email or phone exists
  const driver = await Driver.findByEmail(emailOrPhone);
  if (!driver) {
    throw new Error("Invalid email/phone or password.");
  }

  // Compare the provided password with the hashed password
  const passwordMatch = await bcrypt.compare(password, driver.password);
  if (!passwordMatch) {
    throw new Error("Invalid email/phone or password.");
  }

  // Generate token (assuming JWT)
  const token = generateToken({ id: driver.id, role: "driver" });

  return {
    message: "Login successful",
    token,
    driver: {
      id: driver.id,
      username: driver.username,
      email: driver.email,
      phone: driver.phone,
    },
  };
};

module.exports = {
  loginPassenger,
  registerPassenger,
  registerDriver,
  loginDriver,
};
