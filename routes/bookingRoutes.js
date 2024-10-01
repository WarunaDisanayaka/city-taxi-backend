// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Route to save booking
router.post("/bookings", bookingController.saveBooking);

router.get(
  "/bookings/driver/:driverId",
  bookingController.getAllBookingsByDriver
);

router.put("/bookings/update-status", bookingController.updateBookingStatus);

module.exports = router;
