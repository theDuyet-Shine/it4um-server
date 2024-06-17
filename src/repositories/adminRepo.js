import { adminModel } from "../models/Admin.js";

const createAdmin = async (userData) => {
  try {
    const newAdmin = new adminModel(userData);
    return await newAdmin.save();
  } catch (error) {
    throw error;
  }
};

const findAdminByUsername = async (username) => {
  try {
    const admin = await adminModel.findOne({ username });
    return admin;
  } catch (error) {
    throw error;
  }
};

export { createAdmin, findAdminByUsername };
