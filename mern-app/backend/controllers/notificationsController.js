import Notification from "../models/Notification.js";

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

// GET: All notifications for a user (from MongoDB)
export const getNotificationsByRecipient = async (req, res) => {
  try {
    const { recipientId } = req.params;
    console.log("GET /api/notifications/:recipientId");
    console.log("recipientId:", recipientId);

    const notifications = await Notification.find({ recipient: recipientId }).sort({ createdAt: -1 });

    const formatted = notifications.map((notif) => ({
      ...notif.toObject(),
      time: timeAgo(notif.createdAt),
    }));

    res.json(formatted);
  } catch (err) {
    console.error("getNotificationsByRecipient error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// POST: Create a new notification (in MongoDB)
export const createNotification = async (req, res) => {
  try {
    const { recipient, message, type } = req.body;

    const newNotification = new Notification({
      recipient,
      message,
      type: type || "event assignment",
    });

    const saved = await newNotification.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error("createNotification error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// PATCH: Mark a notification as read (in MongoDB)
export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("PATCH /api/notifications/:id/read");

    const updated = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("markNotificationAsRead error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
