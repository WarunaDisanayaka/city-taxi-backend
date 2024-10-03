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

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.getAllBookings();
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
    if (newStatus === "confirmed" || newStatus === "In Progress") {
      await Booking.updateDriverStatus(driverId, "busy");
    } else if (newStatus === "completed") {
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

// Fetch passenger bookings
exports.getPassengerBookings = async (req, res) => {
  const { passengerId } = req.params;
  console.log("Passenger ID: ", passengerId);
  try {
    const bookings = await Booking.getAllBookingsByPassenger(passengerId);

    // Check if bookings were fetched successfully
    if (bookings.success) {
      res.status(200).json({
        bookings: bookings.data,
        page: bookings.page,
        limit: bookings.limit,
      });
    } else {
      res.status(404).json({ message: bookings.message });
    }
  } catch (error) {
    console.error("Error fetching passenger bookings: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching bookings." });
  }
};

// Function to get the total number of bookings
exports.getTotalBookingsCount = async (req, res) => {
  try {
    const totalBookings = await Booking.getTotalBookingsCount();
    res.status(200).json({
      totalBookings,
    });
  } catch (error) {
    console.error("Error retrieving total bookings count:", error);
    res.status(500).json({
      message: "Failed to retrieve total bookings count",
      error: error.message,
    });
  }
};

// Function to get the total number of bookings
exports.getPendingBookingsCount = async (req, res) => {
  try {
    const totalPendingBookings = await Booking.getBookingsPending();
    res.status(200).json({
      totalPendingBookings,
    });
  } catch (error) {
    console.error("Error retrieving total bookings count:", error);
    res.status(500).json({
      message: "Failed to retrieve total bookings count",
      error: error.message,
    });
  }
};

exports.getTotalBookingConfirmed = async (req, res) => {
  try {
    const totalConfirmedBookings = await Booking.getBookingsConfirmed();
    res.status(200).json({
      totalConfirmedBookings,
    });
  } catch (error) {
    console.error("Error retrieving total bookings count:", error);
    res.status(500).json({
      message: "Failed to retrieve total bookings count",
      error: error.message,
    });
  }
};

exports.getTotalBookingCompleted = async (req, res) => {
  try {
    const totalCompletedBookings = await Booking.getBookingsCompleted();
    res.status(200).json({
      totalCompletedBookings,
    });
  } catch (error) {
    console.error("Error retrieving total bookings count:", error);
    res.status(500).json({
      message: "Failed to retrieve total bookings count",
      error: error.message,
    });
  }
};

// Get total count of all bookings by driver_id
exports.getTotalBookingsCountByDriver = async (req, res) => {
  const driverId = req.params.driverId; // Get driverId from request parameters
  try {
    const totalBookings = await Booking.getTotalBookingsCountByDriver(driverId); // Pass driverId to service method
    res.status(200).json({ totalBookings });
  } catch (error) {
    console.error("Error retrieving total bookings count by driver:", error);
    res.status(500).json({
      message: "Failed to retrieve total bookings count",
      error: error.message,
    });
  }
};

// Get total count of pending bookings by driver_id
exports.getPendingBookingsCountByDriver = async (req, res) => {
  const driverId = req.params.driverId; // Get driverId from request parameters
  try {
    const totalPendingBookings = await Booking.getBookingsPendingByDriver(
      driverId
    ); // Pass driverId to service method
    res.status(200).json({ totalPendingBookings });
  } catch (error) {
    console.error("Error retrieving pending bookings count by driver:", error);
    res.status(500).json({
      message: "Failed to retrieve pending bookings count",
      error: error.message,
    });
  }
};

// Get total count of confirmed bookings by driver_id
exports.getTotalBookingConfirmedByDriver = async (req, res) => {
  const driverId = req.params.driverId; // Get driverId from request parameters
  try {
    const totalConfirmedBookings = await Booking.getBookingsConfirmedByDriver(
      driverId
    ); // Pass driverId to service method
    res.status(200).json({ totalConfirmedBookings });
  } catch (error) {
    console.error(
      "Error retrieving confirmed bookings count by driver:",
      error
    );
    res.status(500).json({
      message: "Failed to retrieve confirmed bookings count",
      error: error.message,
    });
  }
};

// Get total count of completed bookings by driver_id
exports.getTotalBookingCompletedByDriver = async (req, res) => {
  const driverId = req.params.driverId; // Get driverId from request parameters
  try {
    const totalCompletedBookings = await Booking.getBookingsCompletedByDriver(
      driverId
    ); // Pass driverId to service method
    res.status(200).json({ totalCompletedBookings });
  } catch (error) {
    console.error(
      "Error retrieving completed bookings count by driver:",
      error
    );
    res.status(500).json({
      message: "Failed to retrieve completed bookings count",
      error: error.message,
    });
  }
};
