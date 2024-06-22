import { findUserById, updateUserById } from "../repositories/UserRepo.js";
import { hashPassword } from "../utils/passwordUtil.js";

const getUserByIdService = async (id) => {
  try {
    const user = await findUserBy;
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUserByIdService = async (id, userData) => {
  try {
    const user = await findUserById(id);
    if (!user) throw new Error("User not found!");
    const updatedUser = await updateUserById(id, userData);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};
const changePasswordService = async (userId, newPassword) => {
  try {
    // Lấy thông tin người dùng
    const user = await findUserById(userId);
    if (!user) throw new Error("User not found");

    // Hash mật khẩu mới
    const hashedNewPassword = await hashPassword(newPassword);

    // Cập nhật mật khẩu mới
    const updatedUser = await updateUserById(userId, {
      password: hashedNewPassword,
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export { getUserByIdService, changePasswordService, updateUserByIdService };
