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

router.get("/bookings/total", bookingController.getTotalBookings);
router.get("/bookings/confirmed", bookingController.getConfirmedTrips);
router.get("/bookings/ongoing", bookingController.getOngoingTrips);
router.get("/bookings/completed", bookingController.getCompletedTrips);

module.exports = router;
