// controllers/driverController.js
const Driver = require("../models/driverModel");

const getAvailableDrivers = async (req, res) => {
  try {
    const availableDrivers = await Driver.findAvailableDrivers();
    res.status(200).json(availableDrivers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching available drivers: " + error.message });
  }
};

module.exports = {
  getAvailableDrivers,
};
