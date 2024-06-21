import express from "express";
import {
  changePasswordController,
  getUserByIdController,
  updateUserByIdController,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/:id", getUserByIdController);
userRouter.put("/:id", updateUserByIdController);
userRouter.put("/change-password/:id", changePasswordController);

export default userRouter;
