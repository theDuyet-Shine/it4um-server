import mongoose from "mongoose";
import { userModel } from "../models/User.js";

const createUser = async (userData) => {
  try {
    const newUser = new userModel(userData);
    return await newUser.save();
  } catch (error) {
    throw error;
  }
};

const findUserById = async (id) => {
  try {
    return await userModel.findById(id);
  } catch (error) {
    throw error;
  }
};

const updateUserById = async (id, updateData) => {
  try {
    return await userModel.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw error;
  }
};

const deleteUserById = async (id) => {
  try {
    return await userModel.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

export { createUser, findUserById, updateUserById, deleteUserById };
