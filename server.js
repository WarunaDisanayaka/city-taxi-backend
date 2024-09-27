const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const db = require("./config/db");

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
