import { comparePassword, hashPassword } from "../utils/passwordUtil.js";
import {
  checkDuplicate,
  createUser,
  findUserByUsername,
} from "../repositories/UserRepo.js";
import jwt from "jsonwebtoken";
import { createAdmin, findAdminByUsername } from "../repositories/adminRepo.js";
import { emailBanListModel } from "../models/EmailBanList.js";

const signupService = async (userData) => {
  try {
    // Kiểm tra xem email có trong emailBanList không
    const emailBanned = await emailBanListModel.findOne({
      email: userData.email,
    });
    if (emailBanned) {
      throw new Error("Email đã bị cấm sử dụng");
    }

    // Kiểm tra xem tên tài khoản đã tồn tại chưa
    const existingUsername = await checkDuplicate({
      username: userData.username,
    });
    if (existingUsername) {
      throw new Error("Tên tài khoản đã tồn tại");
    }

    // Kiểm tra xem email đã tồn tại chưa
    const existingEmail = await checkDuplicate({ email: userData.email });
    if (existingEmail) {
      throw new Error("Email đã được sử dụng");
    }

    userData.password = await hashPassword(userData.password);
    const newUser = await createUser(userData);
    return newUser;
  } catch (error) {
    throw error;
  }
};

const loginService = async (username, password) => {
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      throw new Error("User not found!");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password!");
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return { token, user };
  } catch (error) {
    throw error;
  }
};

const adminSignup = async (adminData) => {
  try {
    adminData.password = await hashPassword(adminData.password);
    const newAdmin = await createAdmin(adminData);
    return newAdmin;
  } catch (error) {
    throw error;
  }
};

const adminLogin = async (username, password) => {
  try {
    const admin = await findAdminByUsername(username);
    if (!admin) {
      throw new Error("Admin not found!");
    }

    const isPasswordValid = await comparePassword(password, admin.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password!");
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "7d", algorithm: "HS256" }
    );
    return { token, admin };
  } catch (error) {
    throw error;
  }
};

export { signupService, loginService, adminSignup, adminLogin };
