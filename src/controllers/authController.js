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

const signup = async (req, res) => {
  try {
    const newUser = await signupService(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Thiếu email trong yêu cầu" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    storeOtp(email, otp);
    await sendMail(email, otp);
    res.status(200).json({ message: "OTP đã được gửi thành công" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const validateOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res
        .status(400)
        .json({ error: "Thiếu email hoặc OTP trong yêu cầu" });
    }

    const storedOtp = getOtp(email);
    console.log(storedOtp);
    if (!storedOtp) {
      return res
        .status(400)
        .json({ error: "OTP không tồn tại hoặc đã hết hạn" });
    }

    if (storedOtp.otp.toString() !== otp.toString()) {
      return res.status(400).json({ error: "OTP không hợp lệ" });
    }

    validateOtpInStore(email);
    deleteOtp(email);
    res.status(200).json({ message: "OTP đã được xác thực thành công" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Thiếu tên đăng nhập hoặc mật khẩu!" });
    }
    const { token, user } = await loginService(username, password);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const adminSignupController = async (req, res) => {
  try {
    const newAdmin = await adminSignup(req.body);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const adminloginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Thiếu tên đăng nhập hoặc mật khẩu!" });
    }
    const { token, admin } = await adminLogin(username, password);
    res.status(200).json({ token, admin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  signup,
  login,
  sendOtp,
  validateOtp,
  adminloginController,
  adminSignupController,
};
