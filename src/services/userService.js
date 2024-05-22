import { findUserById, updateUserById } from "../repositories/UserRepo.js";

export const getUserByIdService = async (id) => {
  try {
    const user = await findUserById(id);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUserByIdService = async (id, userData) => {
  try {
    const user = await findUserById(id);
    if (!user) throw new Error("User not found!");
    const updatedUser = await updateUserById(id, userData);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};
