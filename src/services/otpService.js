import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

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

export const sendMail = async (email, otp) => {
  const mailOptions = {
    from: ADMIN_EMAIL_ADDRESS,
    to: email,
    subject: "OTP Verification",
    text: `Your OTP (One Time Password) for verification is: ${otp}`,
  };

  // Send email
  await transporter.sendMail(mailOptions);
};
