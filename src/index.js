import express from "express";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

const app = express();

app.use(express.json());

const APP_PORT = 3000;
const APP_HOST = 'localhost';
const GOOGLE_MAIL_CLIENT_ID = "1021588433069-2rkbbedvug661vcvva542ol2ouhpv0ov.apps.googleusercontent.com";
const GOOGLE_MAIL_CLIENT_SECRET = "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";
const GOOGLE_MAILER_REFRESH_TOKEN = "1//04LWTTPSMLHkoCgYIARAAGAQSNwF-L9IralqWFVHw-xi1ZGyhn7XduaWOiDOh9Qs8ug1cMnVszSwimFjIravmrO_o1qx8tonKtj4";
const ADMIN_EMAIL_ADDRESS = "nguyenduyethp.working@gmail.com";

const myOAuth2Client = new OAuth2Client(
    GOOGLE_MAIL_CLIENT_ID,
    GOOGLE_MAIL_CLIENT_SECRET
);

myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: ADMIN_EMAIL_ADDRESS,
        clientId: GOOGLE_MAIL_CLIENT_ID,
        clientSecret: GOOGLE_MAIL_CLIENT_SECRET,
        refreshToken: GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myOAuth2Client.getAccessToken(),
    },
});

app.post('/email/send', async (req, res) => {
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
            subject: 'OTP Verification',
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

app.listen(APP_PORT, () => {
    console.log(`Server is running at http://${APP_HOST}:${APP_PORT}`);
});
