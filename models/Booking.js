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
};

module.exports = Booking;
