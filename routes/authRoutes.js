const express = require("express");
const { register } = require("../controllers/authController");
const { login } = require("../controllers/authController");
const { getAllPassengers } = require("../controllers/passengerController");

const router = express.Router();

// Register route
router.post("/register", register);

router.post("/login", login);

router.get("/get-all-passenger", getAllPassengers);

module.exports = router;
