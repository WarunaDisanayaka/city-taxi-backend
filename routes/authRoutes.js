const express = require("express");
const { register } = require("../controllers/authController");
const { login } = require("../controllers/authController");

const router = express.Router();

// Register route
router.post("/register", register);

router.post("/login", login);

module.exports = router;
