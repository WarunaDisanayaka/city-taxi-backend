const mysql = require("mysql2/promise"); // Import the promise-based version
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Limit connections (adjust based on your needs)
  queueLimit: 0,
});

// No need to manually call connect, pool manages connections automatically

module.exports = db;
