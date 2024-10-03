const {
  getAllPassengers,
  findByEmailOrPhone,
} = require("../models/passengerModel");

// Controller function to handle the retrieval of all passengers
exports.getAllPassengers = async (req, res) => {
  try {
    const passengers = await getAllPassengers();
    res.status(200).json(passengers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving passengers", error });
  }
};

exports.getPassengerByPhone = async (req, res) => {
  const { phone } = req.params; // Get phone number from request parameters
  try {
    const passenger = await findByEmailOrPhone(phone); // Use the existing function
    if (passenger) {
      res.status(200).json(passenger); // Return the passenger data if found
    } else {
      res.status(404).json({ message: "Passenger not found" }); // If no passenger is found
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving passenger by phone", error });
  }
};
