import mongoose from "mongoose";
import { userModel } from "../models/User.js";
import { notificationModel } from "../models/Notification.js";
import { postModel } from "../models/Post.js";
import { commentModel } from "../models/Comment.js";

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
    const user = await userModel.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

const findUserByUsername = async (username) => {
  try {
    const user = await userModel.findOne({ username });
    return user;
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await userModel.findOne({ email });
    return user;
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
    await notificationModel.deleteMany({ user_id: id });
    await notificationModel.deleteMany({ commenter_id: id });
    await postModel.deleteMany({ author: id });
    await commentModel.deleteMany({ commenter_id: id });
    const deletedUser = await userModel.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    throw error;
  }
};

const checkDuplicate = async (query) => {
  try {
    const existingUser = await userModel.findOne(query);
    return existingUser; // Trả về user nếu đã tồn tại, hoặc null nếu không tồn tại
  } catch (error) {
    throw error;
  }
};

export {
  createUser,
  findUserById,
  updateUserById,
  deleteUserById,
  findUserByUsername,
  checkDuplicate,
  findUserByEmail,
};
