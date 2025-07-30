import Notification from "../models/Notification.js";


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


export async function createNotification(recipient, type = "event assignment", message = "") {
  const newNotification = new Notification({
    recipient,
    message,
    type,
    isRead: false,
  });
  return await newNotification.save();
}

export const getNotifications = async (req, res) => {
  try {
    const { recipientId } = req.params;

    const notifications = await Notification.find({ recipient: recipientId }).sort({ createdAt: -1 });

    const formatted = notifications.map((notif) => ({
      ...notif.toObject(),
      time: timeAgo(notif.createdAt),
    }));

    res.json(formatted);
  } catch (err) {
    console.error("getNotifications error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;

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
    console.error("updateNotification error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Notification.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.json({ message: "Notification deleted", id });
  } catch (err) {
    console.error("deleteNotification error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
