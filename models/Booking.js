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

  // Get total count of all bookings
  getTotalBookingsCount: async () => {
    const sql = `SELECT COUNT(*) AS total FROM bookings`;
    const [results] = await db.query(sql);
    return results[0].total;
  },

  // Get total count of all bookings
  getBookingsPending: async () => {
    const sql = `SELECT COUNT(*) AS total FROM bookings WHERE status="pending"`;
    const [results] = await db.query(sql);
    return results[0].total;
  },

  getBookingsConfirmed: async () => {
    const sql = `SELECT COUNT(*) AS total FROM bookings WHERE status="confirmed"`;
    const [results] = await db.query(sql);
    return results[0].total;
  },

  getBookingsCompleted: async () => {
    const sql = `SELECT COUNT(*) AS total FROM bookings WHERE status="completed"`;
    const [results] = await db.query(sql);
    return results[0].total;
  },

  getAllBookings: async () => {
    const sql = `SELECT * FROM bookings`;
    const [results] = await db.query(sql);
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

  getAllBookingsByPassenger: async (passengerId, page = 1, limit = 10) => {
    try {
      // Calculate offset for pagination
      const offset = (page - 1) * limit;

      console.log(
        `Fetching bookings for passenger ID: ${passengerId}, page: ${page}, limit: ${limit}`
      );

      // SQL query to fetch bookings for the passenger
      const sql = `
        SELECT b.id, b.driver_id, b.from_location, b.to_location, b.distance, 
               b.journey_date, b.journey_time, b.fee, b.status, b.created_at,
               d.username AS driver_name, d.phone_number AS driver_phone
        FROM bookings b
        JOIN drivers d ON b.driver_id = d.id
        WHERE b.passenger_id = ?
        LIMIT ? OFFSET ?
      `;

      // Execute the query with passengerId, limit, and offset
      const [results] = await db.query(sql, [passengerId, limit, offset]);

      if (results.length > 0) {
        return {
          success: true,
          page,
          limit,
          data: results,
        };
      } else {
        return {
          success: false,
          message: "No bookings found for this passenger.",
        };
      }
    } catch (error) {
      console.error("Error fetching bookings for passenger: ", error);
      return {
        success: false,
        message: "Error fetching bookings",
      };
    }
  },
};

module.exports = Booking;
