const Booking = require("../models/Booking");

// Function to check if driver is already booked
const isDriverBooked = async (driverId, date, time) => {
  try {
    const bookings = await Booking.getDriverBookings(driverId, date, time);
    return bookings.length > 0; // Returns true if there are any bookings
  } catch (error) {
    console.error("Error checking driver bookings:", error);
    throw error; // Rethrow error to handle it in the main function
  }
};

// Function to save booking details
exports.saveBooking = async (req, res) => {
  const { from, to, distance, date, time, driverId, fee, passengerId } =
    req.body;

  // Validate input
  if (
    !from ||
    !to ||
    !distance ||
    !date ||
    !time ||
    !driverId ||
    !fee ||
    !passengerId
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the driver is already booked for this time slot
    const driverBooked = await isDriverBooked(driverId, date, time);
    if (driverBooked) {
      return res
        .status(409)
        .json({ message: "Driver is already booked for this time slot." });
    }

    const result = await Booking.create({
      passengerId,
      from,
      to,
      distance,
      date,
      time,
      driverId,
      fee,
    });
    console.log("Booking saved successfully:", result); // Log result
    res.status(201).json({
      message: "Booking saved successfully",
      bookingId: result.insertId,
    });
  } catch (error) {
    console.error("Error saving booking:", error); // Log error
    res
      .status(500)
      .json({ message: "Failed to save booking", error: error.message });
  }
};

exports.getAllBookingsByDriver = async (req, res) => {
  const { driverId } = req.params;

  try {
    const bookings = await Booking.getAllBookingsByDriver(driverId);
    res.status(200).json({
      message: "Bookings retrieved successfully",
      bookings,
    });
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve bookings", error: error.message });
  }
};

// Function to update booking status and driver status
exports.updateBookingStatus = async (req, res) => {
  const { bookingId, newStatus, driverId } = req.body;

  // Validate input
  if (!bookingId || !newStatus || !driverId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Update booking status
    await Booking.updateStatus(bookingId, newStatus);

    // If the new status is "Confirmed" or "In Progress," update driver status to "busy"
    if (newStatus === "Confirmed" || newStatus === "In Progress") {
      await Booking.updateDriverStatus(driverId, "busy");
    } else if (newStatus === "Completed") {
      await Booking.updateDriverStatus(driverId, "available");
    }

    res
      .status(200)
      .json({ message: "Booking and driver status updated successfully" });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({
      message: "Failed to update booking status",
      error: error.message,
    });
  }
};
