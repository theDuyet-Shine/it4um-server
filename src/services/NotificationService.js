import { notificationRepo } from "../repositories/NotificationRepo.js";

const getUnreadNotificationService = async (userId) => {
  try {
    const unreadCount = await notificationRepo.getUnreadNotifications(userId);
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
    const notifications = await notificationRepo.getNotificationsByUserId(
      userId,
      page,
      perPage
    );

    if (notifications.length > 0) {
      const notificationIds = notifications.map(
        (notification) => notification._id
      );

      await Promise.all(
        notificationIds.map(async (id) => {
          await notificationRepo.updateNotificationStatus(id, "read");
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
