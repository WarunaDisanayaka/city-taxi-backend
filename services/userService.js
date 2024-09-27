const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Passenger = require("../models/passengerModel");
const Driver = require("../models/driverModel");

class UserService {
  static async registerPassenger(name, email, password, contact_number) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create(name, email, hashedPassword, "PASSENGER");
    await Passenger.create(user.insertId, contact_number);
    return user;
  }

  static async registerDriver(name, email, password, vehicle_number) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create(name, email, hashedPassword, "DRIVER");
    await Driver.create(user.insertId, vehicle_number);
    return user;
  }
}

module.exports = UserService;
