const nodemailer = require("nodemailer");

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "warunadesigns@gmail.com",
    pass: "gxnu znaq luof auom",
  },
});

// Function to send registration email
const sendRegistrationEmail = (email, username, password) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Registration Successful",
    text: `Hello ${username},\n\nThank you for registering! Your username is :- "${username}" and your password is :- "${password}".\n\nBest regards,\nCity Taxi Team`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendRegistrationEmail,
};
