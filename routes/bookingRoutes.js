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

router.get(
  "/driver-bookings/:driverId",
  bookingController.getTotalBookingsCountByDriver
);

router.get(
  "/pending-bookings/:driverId",
  bookingController.getPendingBookingsCountByDriver
);

router.get(
  "/confirmed-bookings/:driverId",
  bookingController.getTotalBookingConfirmedByDriver
);

router.get(
  "/completed-bookings/:driverId",
  bookingController.getTotalBookingCompletedByDriver
);

module.exports = router;
