import express from "express";
import {
  login,
  sendOtp,
  signup,
  validateOtp,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/sendOtp", sendOtp);
authRouter.post("/validate-otp", validateOtp);
authRouter.post("/login", login);

export default authRouter;
