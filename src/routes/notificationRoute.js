import express from "express";
import {
  getNotificationsByUserId,
  getUnreadNotifications,
} from "../controllers/notificationController.js";
import { userAuthMiddleware } from "../middlewares/authMiddleware.js";

const notificationRouter = express.Router();

notificationRouter.get("/:id", userAuthMiddleware, getNotificationsByUserId);
notificationRouter.get(
  "/un-read/:id",
  userAuthMiddleware,
  getUnreadNotifications
);

export default notificationRouter;
