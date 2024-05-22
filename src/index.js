import express from "express";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import cors from "cors";
import { handleConnectDB } from "./mongoConfig.js";
import authRouter from "./routes/authRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

handleConnectDB();
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  res.status(200).json("Hello world");
});

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
