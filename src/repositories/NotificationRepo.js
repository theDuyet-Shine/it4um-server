import { notificationModel } from "../models/Notification.js";

const createNotification = async (notificationData) => {
  try {
    const notification = new notificationModel(notificationData);
    return await notification.save();
  } catch (error) {
    throw new Error(`Error creating notification: ${error.message}`);
  }
};

const getNotificationById = async (id) => {
  try {
    return await notificationModel
      .findById(id)
      .populate("user_id commenter_id post_id")
      .exec();
  } catch (error) {
    throw new Error(`Error retrieving notification: ${error.message}`);
  }
};

const getNotificationsByUserId = async (userId, page = 1, perPage = 5) => {
  try {
    return await notificationModel
      .find({ user_id: userId })
      .sort({ created_at: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
  } catch (error) {
    throw new Error(`Error retrieving notifications: ${error.message}`);
  }
};

const updateNotificationStatus = async (notificationId, newStatus) => {
  try {
    const updatedNotification = await notificationModel
      .findByIdAndUpdate(notificationId, { status: newStatus }, { new: true })
      .exec();
    return updatedNotification;
  } catch (error) {
    throw new Error(`Error updating notification status: ${error.message}`);
  }
};

const getUnreadNotifications = async (userId) => {
  try {
    const unreadCount = await notificationModel
      .countDocuments({ user_id: userId, status: "unread" })
      .exec();
    return unreadCount;
  } catch (error) {
    throw new Error(`Error retrieving unread notifications: ${error.message}`);
  }
};

export const notificationRepo = {
  createNotification,
  getNotificationById,
  getNotificationsByUserId,
  updateNotificationStatus,
  getUnreadNotifications,
};
