const express = require("express");
const { getAvailableDrivers } = require("../controllers/driverController");
const router = express.Router();

// Define the route to get available drivers
router.get("/drivers/available", getAvailableDrivers);

module.exports = router;
