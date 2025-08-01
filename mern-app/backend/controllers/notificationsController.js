import Notification from "../models/Notification.js";

export async function createNotification(recipient, type = "Event Assignment", message = "") {
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

    res.json(notifications);
  } catch (err) {
    console.error("getNotifications error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateAllNotification = async (req, res) => {
  try {
    const { accountId } = req.params;

    const updated = await Notification.updateMany(
      { recipient: accountId },              // find all notifications for this user
      { $set: { isRead: true } }  // set all to read
    );

    res.json({ message: "All notifications marked as read", modifiedCount: updated.modifiedCount });
  } catch (err) {
    console.error("updateAllNotification error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const deleteAllNotification = async (req, res) => {
  try {
    const { accountId } = req.params;

    const result = await Notification.deleteMany({ recipient: accountId });

    res.json({ message: "All notifications deleted", deletedCount: result.deletedCount });
  } catch (err) {
    console.error("deleteAllNotification error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};