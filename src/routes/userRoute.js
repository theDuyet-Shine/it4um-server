import express from "express";
import {
  getUserByIdController,
  updateUserByIdController,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/:id", getUserByIdController);
userRouter.put("/:id", updateUserByIdController);

export default userRouter;
