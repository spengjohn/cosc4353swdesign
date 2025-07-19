import express from "express";
import {
  getNotificationsByRecipient,
  createNotification,
  markNotificationAsRead,
} from "../controllers/notificationsController.js";

const router = express.Router();

router.get("/:recipientId", getNotificationsByRecipient);

router.post("/", createNotification);

router.patch("/:id/read", markNotificationAsRead);

export default router;
