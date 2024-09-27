const UserService = require("../services/userService");
const EmailService = require("../services/emailService");

class AuthController {
  static async registerPassenger(req, res) {
    const { name, email, password, contact_number } = req.body;

    if (!name || !email || !password || !contact_number) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const user = await UserService.registerPassenger(
        name,
        email,
        password,
        contact_number
      );
      await EmailService.sendRegistrationEmail(email, name);
      res.status(201).json({ message: "Passenger registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error registering passenger", error });
    }
  }

  static async registerDriver(req, res) {
    const { name, email, password, vehicle_number } = req.body;

    if (!name || !email || !password || !vehicle_number) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const user = await UserService.registerDriver(
        name,
        email,
        password,
        vehicle_number
      );
      await EmailService.sendRegistrationEmail(email, name);
      res.status(201).json({ message: "Driver registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error registering driver", error });
    }
  }
}

module.exports = AuthController;
