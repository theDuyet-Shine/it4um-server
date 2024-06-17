import express from "express";
import {
  createTagController,
  getAllTagController,
} from "../controllers/tagController.js";
import { adminAuthMiddleware } from "../middlewares/authMiddleware.js";
const tagRouter = express.Router();

tagRouter.post("/", adminAuthMiddleware, createTagController);
tagRouter.get("/", getAllTagController);

export default tagRouter;
