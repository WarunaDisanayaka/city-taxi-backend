const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d", // Example expiration time
  });
  return token;
};

module.exports = {
  generateToken,
};
