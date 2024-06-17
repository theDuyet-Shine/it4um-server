import express from "express";
import {
  adminSignupController,
  adminloginController,
  login,
  sendOtp,
  signup,
  validateOtp,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/validate-otp", validateOtp);
authRouter.post("/login", login);
authRouter.post("/admin-signup", adminSignupController);
authRouter.post("/admin-login", adminloginController);

export default authRouter;
