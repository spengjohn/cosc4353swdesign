process.env.NODE_ENV = "test";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import request from "supertest";
import { jest } from "@jest/globals";
import mongoose from "mongoose";
import express from "express";
import {
  createNotification,
  getNotifications,
  updateAllNotification,
  deleteAllNotification,
} from "../controllers/notificationsController.js";
import Notification from "../models/Notification.js";
import notificationRouter from "../routes/notification.js";
import UserProfile from "../models/UserProfile.js";

dotenv.config({ path: ".env.test" });

// Setup basic app
const app = express();
app.use(express.json());
app.use('/api/notification', notificationRouter);

describe("Notification Controller Tests", () => {
  let testUser;
  let testNotification;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await Notification.deleteMany({});
    await UserProfile.deleteMany({});

    // Create test user
    testUser = await UserProfile.create({
      credentialId: new mongoose.Types.ObjectId(),
      fullName: "Test User",
      address1: "123 Test St",
      city: "Testville",
      state: "TX",
      zipcode: "12345",
      skills: ["First-Aid"],
      availableDates: [new Date],
    });

    // Create test notification
    testNotification = await Notification.create({
      recipient: testUser.credentialId,
      message: "Test notification message",
      type: "Reminder",
      isRead: false,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /api/notification/:recipientId", () => {
    it("should return empty array if user has no notifications", async () => {
      const newUserId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/notification/${newUserId}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });

    it("should return 500 if there's a server error", async () => {
      const spy = jest.spyOn(Notification, "find").mockImplementation(() => {
        throw new Error("Mocked error");
      });

      const res = await request(app).get(`/api/notification/${testUser.credentialId}`);

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Internal Server Error");

      spy.mockRestore();
    });
  });

  describe("PUT /api/notification/update/all/:accountId", () => {
    it("should mark all notifications as read for a user", async () => {
      // Create a second unread notification
      await createNotification(
        testUser.credentialId,
        "Event Assignment",
        "Unread notification"
      );

      const res = await request(app).patch(`/api/notification/update/all/${testUser.credentialId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("All notifications marked as read");
      expect(res.body.modifiedCount).toBe(2); // Both notifications should be updated

      // Verify notifications were actually updated
      const updatedNotifications = await Notification.find({ recipient: testUser.credentialId });
      updatedNotifications.forEach(notif => {
        expect(notif.isRead).toBe(true);
      });
    });

    it("should return modifiedCount 0 if no notifications to update", async () => {
      const newUserId = new mongoose.Types.ObjectId();
      const res = await request(app).patch(`/api/notification/update/all/${newUserId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.modifiedCount).toBe(0);
    });

    it("should return 500 if there's a server error", async () => {
      const spy = jest.spyOn(Notification, "updateMany").mockImplementation(() => {
        throw new Error("Mocked error");
      });

      const res = await request(app).patch(`/api/notification/update/all/${testUser.credentialId}`);

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Internal Server Error");

      spy.mockRestore();
    });
  });

  describe("DELETE /api/notification/delete/all/:accountId", () => {
    it("should delete all notifications for a user", async () => {
      // Create a second notification
      await createNotification(testUser.credentialId,"Update","Second notification to delete");

      const res = await request(app).delete(`/api/notification/delete/all/${testUser.credentialId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("All notifications deleted");
      expect(res.body.deletedCount).toBe(2);

      // Verify notifications were actually deleted
      const remainingNotifications = await Notification.find({ recipient: testUser.credentialId });
      expect(remainingNotifications.length).toBe(0);
    });

    it("should return deletedCount 0 if no notifications to delete", async () => {
      const newUserId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/api/notification/delete/all/${newUserId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.deletedCount).toBe(0);
    });

    it("should return 500 if there's a server error", async () => {
      const spy = jest.spyOn(Notification, "deleteMany").mockImplementation(() => {
        throw new Error("Mocked error");
      });

      const res = await request(app).delete(`/api/notification/delete/all/${testUser.credentialId}`);

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Internal Server Error");

      spy.mockRestore();
    });
  });

  describe("createNotification helper function", () => {
    it("should create a new notification with default values", async () => {
      const notification = await createNotification(testUser.credentialId);
      
      expect(notification).toBeDefined();
      expect(notification.recipient.toString()).toBe(testUser.credentialId.toString());
      expect(notification.type).toBe("Event Assignment");
      expect(notification.message).toBe("");
      expect(notification.isRead).toBe(false);
    });

    it("should create a new notification with custom values", async () => {
      const customType = "Update";
      const customMessage = "Custom message";
      
      const notification = await createNotification(
        testUser.credentialId,
        customType,
        customMessage
      );
      
      expect(notification.type).toBe(customType);
      expect(notification.message).toBe(customMessage);
    });

    it("should throw error if recipient is missing", async () => {
      await expect(createNotification()).rejects.toThrow();
    });
  });
});