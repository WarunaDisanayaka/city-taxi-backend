// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Route to save booking
router.post("/bookings", bookingController.saveBooking);

module.exports = router;
