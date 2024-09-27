const db = require("../config/db");

// Function to check if email already exists
const emailExists = (email) => {
  const query = "SELECT * FROM passengers WHERE email = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [email], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results.length > 0); // Returns true if email exists
    });
  });
};

// Function to check if phone number already exists
const phoneExists = (phone) => {
  const query = "SELECT * FROM passengers WHERE phone = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [phone], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results.length > 0); // Returns true if phone number exists
    });
  });
};

// Function to create a new passenger in the database
const createPassenger = (username, email, phone, password) => {
  const query =
    "INSERT INTO passengers (username, email, phone, password) VALUES (?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(query, [username, email, phone, password], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

module.exports = {
  createPassenger,
  emailExists,
  phoneExists,
};
