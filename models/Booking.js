const db = require("../config/db"); // Adjust the path based on your project structure

const Booking = {
  create: async ({
    passengerId,
    from,
    to,
    distance,
    date,
    time,
    driverId,
    fee,
  }) => {
    const sql = `INSERT INTO bookings (passenger_id, from_location, to_location, distance, journey_date, journey_time, driver_id, fee, status) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`;

    console.log("Executing SQL:", sql, "with values:", [
      passengerId,
      from,
      to,
      distance,
      date,
      time,
      driverId,
      fee,
    ]);

    const [results] = await db.query(sql, [
      passengerId,
      from,
      to,
      distance,
      date,
      time,
      driverId,
      fee,
    ]);
    return results;
  },

  getDriverBookings: async (driverId, date, time) => {
    const sql = `SELECT * FROM bookings 
                     WHERE driver_id = ? 
                     AND journey_date = ? 
                     AND journey_time = ?`;

    const [results] = await db.query(sql, [driverId, date, time]);
    return results;
  },

  getAllBookingsByDriver: async (driverId) => {
    const sql = `
    SELECT b.id, b.passenger_id, b.driver_id, b.from_location, b.to_location, 
           b.distance, b.journey_date, b.journey_time, b.fee, b.status, 
           b.created_at, p.username AS passenger_name, p.phone 
    FROM bookings b
    JOIN passengers p ON b.passenger_id = p.id
    WHERE b.driver_id = ?`;

    const [results] = await db.query(sql, [driverId]);
    return results;
  },

  // Method to update booking status
  updateStatus: async (bookingId, newStatus) => {
    const sql = `UPDATE bookings SET status = ? WHERE id = ?`;
    const [results] = await db.query(sql, [newStatus, bookingId]);
    return results;
  },

  // Method to update driver status
  updateDriverStatus: async (driverId, status) => {
    const sql = `UPDATE drivers SET status = ? WHERE id = ?`;
    const [results] = await db.query(sql, [status, driverId]);
    return results;
  },
};

module.exports = Booking;
