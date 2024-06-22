import {
  getNotificationsByUserId,
  getUnreadNotifications,
  updateNotificationStatus,
} from "../repositories/NotificationRepo.js";

const getUnreadNotificationService = async (userId) => {
  try {
    const unreadCount = await getUnreadNotifications(userId);
    return unreadCount;
  } catch (error) {
    throw new Error(
      `Lỗi khi lấy số lượng thông báo chưa đọc: ${error.message}`
    );
  }
};

const getNotificationsByUserIdService = async (
  userId,
  page = 1,
  perPage = 5
) => {
  try {
    const notifications = await getNotificationsByUserId(userId, page, perPage);
    console.log(notifications);
    if (notifications.notifications.length > 0) {
      const notificationIds = notifications.notifications.map(
        (notification) => notification._id
      );
      await Promise.all(
        notificationIds.map(async (id) => {
          await updateNotificationStatus(id, "read");
        })
      );
    }

    return notifications;
  } catch (error) {
    throw new Error(
      `Lỗi khi lấy và cập nhật thông báo theo userId: ${error.message}`
    );
  }
};

export { getUnreadNotificationService, getNotificationsByUserIdService };
