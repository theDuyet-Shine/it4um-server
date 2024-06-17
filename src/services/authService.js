import { comparePassword, hashPassword } from "../utils/passwordUtil.js";
import { createUser, findUserByUsername } from "../repositories/UserRepo.js";
import jwt from "jsonwebtoken";
import { createAdmin, findAdminByUsername } from "../repositories/adminRepo.js";

const signupService = async (userData) => {
  try {
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
