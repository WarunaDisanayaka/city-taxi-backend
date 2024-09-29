const db = require("../config/db");

const Driver = {
  create: async (driverData) => {
    const {
      username,
      email,
      phoneNumber,
      vehicleType,
      vehicleNumber,
      password,
      status = "avialable",
    } = driverData;
    const query =
      "INSERT INTO drivers (username, email, phone_number, vehicle_type, vehicle_number, password, status) VALUES (?, ?, ?, ?, ?, ?, ?)";

    try {
      const result = await db.execute(query, [
        username,
        email,
        phoneNumber,
        vehicleType,
        vehicleNumber,
        password,
        status,
      ]);
      return result;
    } catch (error) {
      throw new Error("Error inserting driver: " + error.message);
    }
  },

  findByEmail: async (email) => {
    console.log("Searching for driver by email:", email);
    const query = "SELECT * FROM drivers WHERE email = ?";
    try {
      const [rows] = await db.execute(query, [email]); // Destructure to get rows directly
      console.log("Driver search results:", rows);
      return rows.length > 0 ? rows[0] : null; // Check if rows exist
    } catch (error) {
      console.error("Error finding driver by email:", error);
      throw new Error("Error finding driver by email: " + error.message);
    }
  },
  findByPhoneNumber: async (phoneNumber) => {
    if (phoneNumber === undefined) {
      throw new Error("Phone number cannot be undefined."); // Prevent undefined values
    }

    const query = "SELECT * FROM drivers WHERE phone_number = ?";
    try {
      const [rows] = await db.execute(query, [phoneNumber]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error("Error finding driver by phone number: " + error.message);
    }
  },

  updateStatus: async (driverId, newStatus) => {
    const query = "UPDATE drivers SET status = ? WHERE id = ?";
    try {
      const result = await db.execute(query, [newStatus, driverId]);
      return result;
    } catch (error) {
      throw new Error("Error updating driver status: " + error.message);
    }
  },

  findAvailableDrivers: async () => {
    const query = "SELECT * FROM drivers WHERE status = 'available'";
    try {
      const [rows] = await db.execute(query);
      console.log("Query Result:", rows);
      if (!rows || rows.length === 0) {
        return [];
      }
      return rows;
    } catch (error) {
      throw new Error("Error fetching available drivers: " + error.message);
    }
  },
};

module.exports = Driver;
