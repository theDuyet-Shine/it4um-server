import express from "express";
import {
  changePasswordController,
  findUserByEmailController,
  forgotPasswordController,
  getUserByIdController,
  updateUserByIdController,
} from "../controllers/userController.js";
import { userAuthMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/:id", getUserByIdController);
userRouter.get("/", findUserByEmailController);
userRouter.put("/:id", userAuthMiddleware, updateUserByIdController);
userRouter.put(
  "/change-password/:id",
  userAuthMiddleware,
  changePasswordController
);

userRouter.put("/forgot-password/:id", forgotPasswordController);

export default userRouter;
