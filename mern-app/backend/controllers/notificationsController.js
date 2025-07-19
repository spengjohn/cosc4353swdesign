import { mockNotifications } from "../mocks/mockNotifications.js";

// Utility to get human-readable time ago string
function timeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

// GET: All notifications for a user
export const getNotificationsByRecipient = async (req, res) => {
  try {
    const { recipientId } = req.params;
    console.log("GET /api/notifications/:recipientId");
    console.log("recipientId:", recipientId);

    const userNotifications = mockNotifications
      .filter((n) => n.recipient === recipientId)
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((notif) => ({
        ...notif,
        time: timeAgo(new Date(notif.createdAt)),
      }));

    console.log("Returning notifications:", userNotifications);
    res.json(userNotifications);
  } catch (err) {
    console.error("getNotificationsByRecipient error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// POST: Create a new notification
export const createNotification = async (req, res) => {
  try {
    const { recipient, title, body, message, type } = req.body;

    const newNotification = {
      id: String(Date.now()),
      recipient,
      title: title || "Notification",
      body: body || message || "",
      type: type || "event assignment",
      isRead: false,
      createdAt: new Date(),
    };

    mockNotifications.push(newNotification);

    console.log("POST /api/notifications");
    console.log("Created:", newNotification);

    res.status(201).json(newNotification);
  } catch (err) {
    console.error("createNotification error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// PATCH: Mark a notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("PATCH /api/notifications/:id/read");
    console.log("Notification ID:", id);

    const notification = mockNotifications.find((n) => n.id === id);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    notification.isRead = true;

    console.log("Updated:", notification);
    res.json(notification);
  } catch (err) {
    console.error("markNotificationAsRead error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
