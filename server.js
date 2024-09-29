const express = require("express");
const authRoutes = require("./routes/authRoutes");
const driverRoutes = require("./routes/driverRoutes");
const cors = require("cors"); // Import cors

require("dotenv").config();

const app = express();
app.use(express.json()); // To parse JSON request bodies
app.use(cors());

// Use the auth routes
app.use("/api/auth", authRoutes);
app.use("/api", driverRoutes);

// Start the server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
