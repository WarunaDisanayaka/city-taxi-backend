const db = require("../config/db");
const bcrypt = require("bcrypt"); // Make sure to import bcrypt

const Admin = {
  findByUsername: async (username) => {
    console.log("Searching for admin by username:", username);
    const query = "SELECT * FROM admins WHERE username = ?";
    try {
      const [rows] = await db.execute(query, [username]); // Ensure `username` is passed correctly
      console.log("Admin search results:", rows);
      return rows.length > 0 ? rows[0] : null; // Check if rows exist
    } catch (error) {
      console.error("Error finding admin by username:", error);
      throw new Error("Error finding admin by username: " + error.message);
    }
  },
  validatePassword: (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
  },
};

module.exports = Admin;
