import {
  getNotificationsByUserIdService,
  getUnreadNotificationService,
} from "../services/notificationService.js";

const getUnreadNotifications = async (req, res) => {
  const { id } = req.params;

  try {
    const unreadCount = await getUnreadNotificationService(id);
    res.status(200).json({ unreadCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNotificationsByUserId = async (req, res) => {
  const { id } = req.params;
  const { page, perPage } = req.query;

  try {
    const notifications = await getNotificationsByUserIdService(
      id,
      parseInt(page) || 1,
      parseInt(perPage) || 5
    );
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getNotificationsByUserId, getUnreadNotifications };
