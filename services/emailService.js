const transporter = require("../config/nodemailer");

class EmailService {
  static async sendRegistrationEmail(email, name) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "City Taxi Registration Successful",
      text: `Hi ${name}, your registration was successful!`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  }
}

module.exports = EmailService;
