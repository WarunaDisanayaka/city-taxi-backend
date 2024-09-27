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

const mailOptions = {
  from: process.env.SMTP_USER,
  to: "warunahello@gmail.com", // Replace with your email for testing
  subject: "Test Email",
  text: "This is a test email to verify SMTP configuration.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error("Error sending email:", error);
  }
  console.log("Email sent:", info.response);
});
