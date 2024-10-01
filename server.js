const express = require("express");
const authRoutes = require("./routes/authRoutes");
const driverRoutes = require("./routes/driverRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const cors = require("cors"); // Import cors

require("dotenv").config();

const app = express();
app.use(express.json()); // To parse JSON request bodies
app.use(cors());

// Use the auth routes
app.use("/api/auth", authRoutes);
app.use("/api", driverRoutes);
app.use("/api", bookingRoutes);

// Start the server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
