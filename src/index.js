import express from "express";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const APP_PORT = process.env.APP_PORT
const APP_HOST = process.env.APP_HOST
const GOOGLE_MAIL_CLIENT_ID = process.env.GOOGLE_MAIL_CLIENT_ID;
const GOOGLE_MAIL_CLIENT_SECRET = process.env.GOOGLE_MAIL_CLIENT_SECRET;
const GOOGLE_MAILER_REFRESH_TOKEN = process.env.GOOGLE_MAILER_REFRESH_TOKEN;
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS;


const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAIL_CLIENT_ID,
  GOOGLE_MAIL_CLIENT_SECRET
);

myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: ADMIN_EMAIL_ADDRESS,
    clientId: GOOGLE_MAIL_CLIENT_ID,
    clientSecret: GOOGLE_MAIL_CLIENT_SECRET,
    refreshToken: GOOGLE_MAILER_REFRESH_TOKEN,
    accessToken: myOAuth2Client.getAccessToken(),
  },
});

app.post("/email/send", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Missing email in request body" });
    }

    // Generate OTP (One Time Password)
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

    // Setup email data
    const mailOptions = {
      from: ADMIN_EMAIL_ADDRESS,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP (One Time Password) for verification is: ${otp}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://${APP_HOST}:${APP_PORT}`);
});
