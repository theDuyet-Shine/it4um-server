import {
  adminLogin,
  adminSignup,
  loginService,
  signupService,
} from "../services/authService.js";
import { sendMail } from "../services/otpService.js";
import {
  getOtp,
  storeOtp,
  validateOtpInStore,
  deleteOtp,
} from "../utils/otpStore.js";

export const signup = async (req, res) => {
  try {
    const newUser = await signupService(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Missing email in request body" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    storeOtp(email, otp);
    await sendMail(email, otp);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const validateOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res
        .status(400)
        .json({ error: "Missing email or OTP in request body" });
    }

    const storedOtp = getOtp(email);
    console.log(storedOtp);
    if (!storedOtp) {
      return res.status(400).json({ error: "OTP not found or expired" });
    }

    if (storedOtp.otp.toString() !== otp.toString()) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    validateOtpInStore(email);
    deleteOtp(email);
    res.status(200).json({ message: "OTP validated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Missing username or password!" });
    }
    const { token, user } = await loginService(username, password);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const adminSignupController = async (req, res) => {
  try {
    const newAdmin = await adminSignup(req.body);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const adminloginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Missing username or password!" });
    }
    const { token, admin } = await adminLogin(username, password);
    res.status(200).json({ token, admin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
