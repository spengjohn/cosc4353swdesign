import express from "express";
import Notification from "../models/Notification.js";

const router = express.Router();

// GET: All notifications for a user
router.get("/:recipientId", async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.params.recipientId })
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST: Create a new notification
router.post("/", async (req, res) => {
  const { recipient, message, type } = req.body;

  try {
    const newNotification = new Notification({ recipient, message, type });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PATCH: Mark a notification as read
router.patch("/:id/read", async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
