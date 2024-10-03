// routes/bookingRoutes.js
const express = require("express");
const { getPassengerByPhone } = require("../controllers/passengerController");
const router = express.Router();

// Route to save booking
router.get("/passengers/phone/:phone", getPassengerByPhone);

module.exports = router;
