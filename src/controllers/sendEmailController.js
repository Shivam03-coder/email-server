import nodemailer from "nodemailer";
import { appconfig } from "../configs/appconfig.js";

export const sendEmailController = async (req, res) => {
  try {
    const { firstName, lastName, email, contactNumber, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !contactNumber || !message) {
      console.error("One or more required fields are missing in the request");
      return res.status(400).json({ error: "All fields are required" });
    }

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: appconfig.EMAILJS_USER_ID, 
        pass: appconfig.EMAILJS_USER_SECRET, 
      },
      tls: {
        rejectUnauthorized: false, 
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: " aishnasingh01@gmail.com",
      subject: `Message from ${firstName} ${lastName}`,
      text: `
        Message from ${firstName} ${lastName} :
        -------------------
        Name: ${firstName} ${lastName}
        Email: ${email}
        Contact Number: ${contactNumber}

        Message Content:
        ${message}
      `,
    };

    // Send the email
    const response = await transporter.sendMail(mailOptions);

    res.status(200).json({ success: "Email sent successfully", response });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
};