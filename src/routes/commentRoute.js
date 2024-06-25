import express from "express";
import {
  createCommentController,
  getCommentsController,
} from "../controllers/commentController.js";
import { userAuthMiddleware } from "../middlewares/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.post("/", userAuthMiddleware, createCommentController);
commentRouter.get("/", getCommentsController);

export default commentRouter;
