import express from "express";
import {
  createPostController,
  getPostByIdController,
  updatePostController,
  deletePostController,
  filterPostController,
} from "../controllers/postController.js";
import {
  userAuthMiddleware,
  adminAuthMiddleware,
  combinedMiddleware,
} from "../middlewares/authMiddleware.js";

const postRouter = express.Router();

postRouter.post("/", userAuthMiddleware, createPostController);

postRouter.get("/:id", getPostByIdController);

postRouter.put("/:id", userAuthMiddleware, updatePostController);

postRouter.delete("/:id", combinedMiddleware, deletePostController);

postRouter.get("/", filterPostController);

export default postRouter;
