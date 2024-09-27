const express = require("express");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.post("/register-passenger", AuthController.registerPassenger);
router.post("/register-driver", AuthController.registerDriver);

module.exports = router;
