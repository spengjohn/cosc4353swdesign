import express from "express";
import {
  getNotifications,
  deleteAllNotification,
  updateAllNotification
} from "../controllers/notificationsController.js";

const router = express.Router();

router.patch("/update/all/:accountId", updateAllNotification);
router.delete("/delete/all/:accountId", deleteAllNotification);

router.get("/:recipientId", getNotifications);

export default router;
