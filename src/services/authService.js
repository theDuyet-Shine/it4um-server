import { hashPassword } from "../utils/passwordUtil.js";
import { createUser } from "../repositories/UserRepo.js";

const signupService = async (userData) => {
  try {
    userData.password = await hashPassword(userData.password);
    const newUser = await createUser(userData);
    return newUser;
  } catch (error) {
    throw error;
  }
};

export { signupService };
