import {
  getNotificationsByRecipient,
  createNotification,
  markNotificationAsRead,
} from "../controllers/notificationsController.js"; // adjust path
import { mockNotifications } from "../mocks/mockNotifications.js";
import { jest } from "@jest/globals";

// Utility to mock Express res object
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Notifications Controller", () => {
describe("getNotificationsByRecipient", () => {
  it("returns notifications for a valid recipient", async () => {
    const recipientId = mockNotifications[0].recipient;
    const req = { params: { recipientId } };
    const res = mockResponse();

    await getNotificationsByRecipient(req, res);

    const expectedNotifications = mockNotifications
      .filter((n) => n.recipient === recipientId)
      .sort((a, b) => b.createdAt - a.createdAt);

    // Check only core fields per notification, ignore 'time'
    expectedNotifications.forEach((expected, index) => {
      expect(res.json.mock.calls[0][0][index]).toEqual(
        expect.objectContaining({
          id: expected.id,
          recipient: expected.recipient,
          title: expected.title,
          body: expected.body,
          type: expected.type,
          isRead: expected.isRead,
          createdAt: expected.createdAt,
        })
      );
    });
  });

  it("returns empty array if no notifications for recipient", async () => {
    const req = { params: { recipientId: "nonexistent" } };
    const res = mockResponse();

    await getNotificationsByRecipient(req, res);

    expect(res.json).toHaveBeenCalledWith([]);
  });
});

describe("createNotification", () => {
  it("creates a new notification and returns it", async () => {
    const reqBody = {
      recipient: "Test User",
      title: "Test Title",
      body: "Test message body",
      type: "alert",
    };
    const req = { body: reqBody };
    const res = mockResponse();

    const initialCount = mockNotifications.length;

    await createNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        recipient: reqBody.recipient,
        title: reqBody.title,
        body: reqBody.body,
        type: reqBody.type,
        isRead: false,
        id: expect.any(String),
        createdAt: expect.any(Date),
      })
    );
    expect(mockNotifications.length).toBe(initialCount + 1);
  });
});


  describe("markNotificationAsRead", () => {
    it("marks an existing notification as read", async () => {
      // Pick one notification to mark as read
      const notification = mockNotifications.find((n) => !n.isRead);
      const req = { params: { id: notification.id } };
      const res = mockResponse();

      await markNotificationAsRead(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: notification.id,
          isRead: true,
        })
      );
      expect(notification.isRead).toBe(true);
    });

    it("returns 404 if notification not found", async () => {
      const req = { params: { id: "invalid-id" } };
      const res = mockResponse();

      await markNotificationAsRead(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Notification not found",
      });
    });
  });
});
