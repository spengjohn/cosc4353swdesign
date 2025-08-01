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
    });

    // Create test notification
    testNotification = await Notification.create({
      recipient: testUser._id,
      message: "Test notification message",
      type: "Test Type",
      isRead: false,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /api/notification/:recipientId", () => {
    it("should get all notifications for a user with time formatting", async () => {
      // Create a second notification for the same user
      await Notification.create({
        recipient: testUser._id,
        message: "Second notification",
        type: "Another Type",
        isRead: false,
      });

      const res = await request(app).get(`/api/notification/${testUser._id}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);

      // Check time formatting exists
      expect(res.body[0]).toHaveProperty("time");
      expect(res.body[1]).toHaveProperty("time");

      // Check notifications are sorted by createdAt descending
      const firstDate = new Date(res.body[0].createdAt);
      const secondDate = new Date(res.body[1].createdAt);
      expect(firstDate.getTime()).toBeGreaterThanOrEqual(secondDate.getTime());
    });

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

      const res = await request(app).get(`/api/notification/${testUser._id}`);

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Internal Server Error");

      spy.mockRestore();
    });
  });

  describe("PUT /api/notification/markallasread/:accountId", () => {
    it("should mark all notifications as read for a user", async () => {
      // Create a second unread notification
      await Notification.create({
        recipient: testUser._id,
        message: "Unread notification",
        type: "Test Type",
        isRead: false,
      });

      const res = await request(app).put(`/api/notification/markallasread/${testUser._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("All notifications marked as read");
      expect(res.body.modifiedCount).toBe(2); // Both notifications should be updated

      // Verify notifications were actually updated
      const updatedNotifications = await Notification.find({ recipient: testUser._id });
      updatedNotifications.forEach(notif => {
        expect(notif.isRead).toBe(true);
      });
    });

    it("should return modifiedCount 0 if no notifications to update", async () => {
      const newUserId = new mongoose.Types.ObjectId();
      const res = await request(app).put(`/api/notification/markallasread/${newUserId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.modifiedCount).toBe(0);
    });

    it("should return 500 if there's a server error", async () => {
      const spy = jest.spyOn(Notification, "updateMany").mockImplementation(() => {
        throw new Error("Mocked error");
      });

      const res = await request(app).put(`/api/notification/markallasread/${testUser._id}`);

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Internal Server Error");

      spy.mockRestore();
    });
  });

  describe("DELETE /api/notification/deleteall/:accountId", () => {
    it("should delete all notifications for a user", async () => {
      // Create a second notification
      await Notification.create({
        recipient: testUser._id,
        message: "Second notification to delete",
        type: "Test Type",
        isRead: false,
      });

      const res = await request(app).delete(`/api/notification/deleteall/${testUser._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("All notifications deleted");
      expect(res.body.deletedCount).toBe(2);

      // Verify notifications were actually deleted
      const remainingNotifications = await Notification.find({ recipient: testUser._id });
      expect(remainingNotifications.length).toBe(0);
    });

    it("should return deletedCount 0 if no notifications to delete", async () => {
      const newUserId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/api/notification/deleteall/${newUserId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.deletedCount).toBe(0);
    });

    it("should return 500 if there's a server error", async () => {
      const spy = jest.spyOn(Notification, "deleteMany").mockImplementation(() => {
        throw new Error("Mocked error");
      });

      const res = await request(app).delete(`/api/notification/deleteall/${testUser._id}`);

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Internal Server Error");

      spy.mockRestore();
    });
  });

  describe("createNotification helper function", () => {
    it("should create a new notification with default values", async () => {
      const notification = await createNotification(testUser._id);
      
      expect(notification).toBeDefined();
      expect(notification.recipient.toString()).toBe(testUser._id.toString());
      expect(notification.type).toBe("Event Assignment");
      expect(notification.message).toBe("");
      expect(notification.isRead).toBe(false);
    });

    it("should create a new notification with custom values", async () => {
      const customType = "Custom Type";
      const customMessage = "Custom message";
      
      const notification = await createNotification(
        testUser._id,
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