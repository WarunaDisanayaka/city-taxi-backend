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

router.get("/bookings/:passengerId", bookingController.getPassengerBookings);

router.get("/all-bookings", bookingController.getAllBookings);

router.get("/bookings", bookingController.getTotalBookingsCount);

router.get("/pending-bookings", bookingController.getPendingBookingsCount);

router.get("/confirmed-bookings", bookingController.getTotalBookingConfirmed);

router.get("/completed-bookings", bookingController.getTotalBookingCompleted);

module.exports = router;
