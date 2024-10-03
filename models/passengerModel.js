const db = require("../config/db");

// Function to check if email already exists
const emailExists = async (email) => {
  const query = "SELECT * FROM passengers WHERE email = ?";
  try {
    const [results] = await db.query(query, [email]);
    return results.length > 0; // Return true if email exists, false otherwise
  } catch (error) {
    throw new Error(`Error checking email existence: ${error.message}`);
  }
};

// Function to check if phone number already exists
const phoneExists = async (phone) => {
  const query = "SELECT * FROM passengers WHERE phone = ?";
  try {
    const [results] = await db.query(query, [phone]);
    return results.length > 0; // Return true if phone exists, false otherwise
  } catch (error) {
    throw new Error(`Error checking phone existence: ${error.message}`);
  }
};

// Function to create a new passenger in the database
const createPassenger = async (username, email, phone, password) => {
  const query =
    "INSERT INTO passengers (username, email, phone, password) VALUES (?, ?, ?, ?)";
  try {
    const [results] = await db.query(query, [username, email, phone, password]);
    return results; // Return the result of the insertion (e.g., the inserted ID)
  } catch (error) {
    throw new Error(`Error creating passenger: ${error.message}`);
  }
};

const findByEmailOrPhone = async (emailOrPhone) => {
  const query = `
    SELECT * FROM passengers 
    WHERE email = ? OR phone = ?
  `;
  try {
    const [results] = await db.query(query, [emailOrPhone, emailOrPhone]);
    return results.length > 0 ? results[0] : null; // Return the passenger object if found, else null
  } catch (error) {
    throw new Error(
      `Error finding passenger by email or phone: ${error.message}`
    );
  }
};

const getAllPassengers = async () => {
  const query = "SELECT id,username,email,phone FROM passengers";
  try {
    const [results] = await db.query(query);
    return results; // Return all passengers
  } catch (error) {
    throw new Error(`Error retrieving all passengers: ${error.message}`);
  }
};

module.exports = {
  createPassenger,
  emailExists,
  phoneExists,
  findByEmailOrPhone,
  getAllPassengers,
};
