import express from "express";
import { adminDeletePostController } from "../controllers/adminController.js";
import { adminAuthMiddleware } from "../middlewares/authMiddleware.js";

const adminRouter = express.Router();

adminRouter.post(
  "/delete-post",
  adminAuthMiddleware,
  adminDeletePostController
);

export default adminRouter;
