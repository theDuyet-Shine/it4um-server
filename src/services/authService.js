import { comparePassword, hashPassword } from "../utils/passwordUtil.js";
import { createUser, findUserByUsername } from "../repositories/UserRepo.js";
import jwt from "jsonwebtoken";

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
      process.env.JWT_SECRET
    );
    return { token, user };
  } catch (error) {
    throw error;
  }
};

export { signupService, loginService };
