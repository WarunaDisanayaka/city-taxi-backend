const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "warunadesigns@gmail.com",
    pass: "gxnu znaq luof auom",
  },
});

// Test the transporter to check if credentials are correct
transporter.verify((error, success) => {
  if (error) {
    console.error("Nodemailer configuration error:", error);
  } else {
    console.log("Nodemailer is ready to send emails:", success);
  }
});

module.exports = transporter;
