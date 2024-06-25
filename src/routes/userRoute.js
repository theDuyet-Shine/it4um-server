import express from "express";
import {
  changePasswordController,
  findUserByEmailController,
  getUserByIdController,
  updateUserByIdController,
} from "../controllers/userController.js";
import { userAuthMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/:id", getUserByIdController);
userRouter.get("/:email", findUserByEmailController);
userRouter.put("/:id", userAuthMiddleware, updateUserByIdController);
userRouter.put(
  "/change-password/:id",
  userAuthMiddleware,
  changePasswordController
);

export default userRouter;
