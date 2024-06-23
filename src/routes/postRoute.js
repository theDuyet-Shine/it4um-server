import express from "express";
import {
  createPostController,
  getPostByIdController,
  updatePostController,
  deletePostController,
  filterPostController,
  likePostController,
  unlikePostController,
  getPostsByAuthorIdController,
} from "../controllers/postController.js";
import {
  userAuthMiddleware,
  combinedMiddleware,
} from "../middlewares/authMiddleware.js";

const postRouter = express.Router();

postRouter.post("/", userAuthMiddleware, createPostController);

postRouter.get("/:id", getPostByIdController);

postRouter.put("/:id", userAuthMiddleware, updatePostController);

postRouter.delete("/:id", combinedMiddleware, deletePostController);

postRouter.get("/", filterPostController);

postRouter.get(
  "/user-post/:authorId",
  userAuthMiddleware,
  getPostsByAuthorIdController
);

postRouter.post("/like", userAuthMiddleware, likePostController);

postRouter.post("/unlike", userAuthMiddleware, unlikePostController);

export default postRouter;
