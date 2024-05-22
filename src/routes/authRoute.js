import express from "express";
import { sendOtp, signup, validateOtp } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/sendOtp", sendOtp);
authRouter.post("/validate-otp", validateOtp);

export default authRouter;
