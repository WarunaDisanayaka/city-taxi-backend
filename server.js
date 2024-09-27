const express = require("express");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(express.json()); // To parse JSON request bodies

// Use the auth routes
app.use("/api/auth", authRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
