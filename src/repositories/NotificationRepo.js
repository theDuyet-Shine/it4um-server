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

const getNotificationsByUserId = async (userId, page, perPage) => {
  const skip = (page - 1) * perPage;

  const notificationsPromise = notificationModel
    .find({ user_id: userId })
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(perPage)
    .populate("commenter_id", "profile_image")
    .exec();

  const totalNotificationsPromise = notificationModel
    .countDocuments({ user_id: userId })
    .exec();

  const [notifications, totalNotifications] = await Promise.all([
    notificationsPromise,
    totalNotificationsPromise,
  ]);

  return { notifications, totalNotifications };
};

const updateNotificationStatus = async (id, status) => {
  try {
    const result = await notificationModel
      .updateOne({ _id: id }, { $set: { status: status } })
      .exec();
    console.log(result); // Kiểm tra kết quả trả về từ cơ sở dữ liệu
    return result;
  } catch (error) {
    console.log(`Lỗi khi cập nhật thông báo: ${error.message}`);
    throw error; // Ném lỗi để hàm gọi có thể bắt và xử lý
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

export {
  createNotification,
  getNotificationById,
  getNotificationsByUserId,
  updateNotificationStatus,
  getUnreadNotifications,
};
