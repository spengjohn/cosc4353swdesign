process.env.NODE_ENV = "test";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import request from "supertest";
import { jest } from "@jest/globals";
import mongoose from "mongoose";
import express from "express";
import {
  createEvent,
  getCurrentEvents,
  getEvent,
  getMyNextEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import EventDetails from "../models/Event.js";
import eventRouter from "../routes/event.js";
import UserCredentials from "../models/UserCredentials.js";
import UserProfile from "../models/UserProfile.js";

dotenv.config({ path: ".env.test" });

// Setup basic app
const app = express();
app.use(express.json());
app.use("/api/event", eventRouter);

describe("Event Routes", () => {
  // Setup DB connection before running any tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  // Cleanup DB after all tests are finished
  afterAll(async () => {
    await mongoose.disconnect();
  });
  let event;

  describe("POST /api/event/create", () => {
    beforeEach(async () => {
      await EventDetails.deleteMany({}); // Clean up before each test
      //testUser for myNext... tests
      testUser = await UserProfile.create({
        credentialId: new mongoose.Types.ObjectId(),
        fullName: "Bravo Delta",
        address1: "982 Lane",
        city: "Houston",
        state: "TX",
        zipcode: "74302",
        skills: ["Baking"],
        preferences: "Nothing outside",
        availableDates: [new Date("2025-08-28")],
      });
    });

    afterEach(async () => {
      await EventDetails.deleteMany({}); // Clean up after each test
    });

    it("creates an event given required information", async () => {
      const createTestEvent = {
        title: "Test Create Event",
        description: "Test event",
        location: "Test Park",
        city: "Test City",
        state: "TX",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        urgency: "Low",
        skillsRequired: ["Testing"],
        maxVolunteers: 4,
        assignedVolunteers: [],
      };
      const res = await request(app)
        .post("/api/event/create")
        .send(createTestEvent);

      // Check that the response status is 201 (Created)
      expect(res.statusCode).toBe(201);

      // Check that the event was created with the correct properties
      expect(res.body).toHaveProperty("event");
      expect(res.body.event).toHaveProperty("_id");
      expect(res.body.event.title).toBe(createTestEvent.title);
      expect(res.body.event.description).toBe(createTestEvent.description);
      expect(res.body.event.location).toBe(createTestEvent.location);
      expect(res.body.event.city).toBe(createTestEvent.city);
      expect(res.body.event.state).toBe(createTestEvent.state);
      expect(res.body.event.date).toBeTruthy();
      expect(res.body.event.urgency).toBe(createTestEvent.urgency);
      expect(res.body.event.skillsRequired).toEqual(
        createTestEvent.skillsRequired
      );
      expect(res.body.event.maxVolunteers).toBe(createTestEvent.maxVolunteers);
      expect(res.body.event.assignedVolunteers).toEqual(
        createTestEvent.assignedVolunteers
      );
    });

    it("returns 500 if there is an internal server error", async () => {
      const spy = jest
        .spyOn(EventDetails, "create")
        .mockRejectedValue(new Error("Mocked error"));

      const createTestEvent = {
        title: "Test Create Event",
        description: "Test event",
        location: "Test Park",
        city: "Test City",
        maxVolunteers: 4,
        assignedVolunteers: [],
      };
      const res = await request(app)
        .post("/api/event/create")
        .send(createTestEvent);

      // Check that the response status code is 500 (Internal Server Error)
      expect(res.statusCode).toBe(500);

      // Check that the response body contains the expected error message
      expect(res.body.error).toBe("Internal Server Error");
      spy.mockRestore();
    });
  });

  describe("GET /api/event/current", () => {
    beforeEach(async () => {
      await EventDetails.deleteMany({}); // Clean up before each test

      // Main test event
      event = await EventDetails.create({
        title: "Park Cleanup",
        description: "Clean the local park",
        location: "346 Drive",
        city: "Dallas",
        state: "TX",
        date: new Date(Date.now()), // Today
        urgency: "Low",
        skillsRequired: ["Cleaning", "Teamwork"],
        maxVolunteers: 14,
        assignedVolunteers: [],
      });

      // Past event for myNext... tests
      pastEvent = await EventDetails.create({
        title: "Old Event",
        description: "This is a past event",
        location: "Old Place",
        city: "Austin",
        state: "TX",
        date: new Date("2023-01-01"), // date in the past
        urgency: "Low",
        skillsRequired: [],
        maxVolunteers: 5,
        assignedVolunteers: [],
      });

      // Future event for myNext... tests
      const futureEvent = await EventDetails.create({
        title: "Upcoming Event",
        description: "Future event",
        location: "Future Park",
        city: "Dallas",
        state: "TX",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        urgency: "High",
        skillsRequired: [],
        maxVolunteers: 10,
        assignedVolunteers: [],
      });

      //testUser for myNext... tests
      testUser = await UserProfile.create({
        credentialId: new mongoose.Types.ObjectId(),
        fullName: "Bravo Delta",
        address1: "982 Lane",
        city: "Houston",
        state: "TX",
        zipcode: "74302",
        skills: ["Baking"],
        preferences: "Nothing outside",
        availableDates: [new Date("2025-08-28")],
      });

      //testUser for myNext... tests
      testUserTwo = await UserProfile.create({
        credentialId: new mongoose.Types.ObjectId(),
        fullName: "Echo Foxtrot",
        address1: "123 Road",
        city: "Dallas",
        state: "TX",
        zipcode: "12345",
        skills: ["Cooking"],
        preferences: "No gardening",
        availableDates: [new Date("2025-08-27")],
      });
    });

    afterEach(async () => {
      await EventDetails.deleteMany({}); // Clean up after each test
    });

    it("returns upcoming events when they exist", async () => {
      const res = await request(app).get("/api/event/current");

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);

      const returnedEvent = res.body[0];
    });

    it("returns 500 if there is an internal server error", async () => {
      const spy = jest
        .spyOn(EventDetails, "find")
        .mockRejectedValue(new Error("Mocked error"));

      const res = await request(app).get(`/api/event/current`);

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Internal server error");

      spy.mockRestore();
    });
  });

  describe("GET /api/event/mycurrent/:accountId", () => {
    beforeEach(async () => {
      await EventDetails.deleteMany({}); // Clean up before each test

      // Main test event
      event = await EventDetails.create({
        title: "Park Cleanup",
        description: "Clean the local park",
        location: "346 Drive",
        city: "Dallas",
        state: "TX",
        date: new Date(Date.now()), // Today
        urgency: "Low",
        skillsRequired: ["Cleaning", "Teamwork"],
        maxVolunteers: 14,
        assignedVolunteers: [],
      });

      // Past event for myNext... tests
      pastEvent = await EventDetails.create({
        title: "Old Event",
        description: "This is a past event",
        location: "Old Place",
        city: "Austin",
        state: "TX",
        date: new Date("2023-01-01"), // date in the past
        urgency: "Low",
        skillsRequired: [],
        maxVolunteers: 5,
        assignedVolunteers: [],
      });

      // Future event for myNext... tests
      const futureEvent = await EventDetails.create({
        title: "Upcoming Event",
        description: "Future event",
        location: "Future Park",
        city: "Dallas",
        state: "TX",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        urgency: "High",
        skillsRequired: [],
        maxVolunteers: 10,
        assignedVolunteers: [],
      });

      //testUser for myNext... tests
      testUser = await UserProfile.create({
        credentialId: new mongoose.Types.ObjectId(),
        fullName: "Bravo Delta",
        address1: "982 Lane",
        city: "Houston",
        state: "TX",
        zipcode: "74302",
        skills: ["Baking"],
        preferences: "Nothing outside",
        availableDates: [new Date("2025-08-28")],
      });

      //testUser for myNext... tests
      testUserTwo = await UserProfile.create({
        credentialId: new mongoose.Types.ObjectId(),
        fullName: "Echo Foxtrot",
        address1: "123 Road",
        city: "Dallas",
        state: "TX",
        zipcode: "12345",
        skills: ["Cooking"],
        preferences: "No gardening",
        availableDates: [new Date("2025-08-27")],
      });
    });

    afterEach(async () => {
      await EventDetails.deleteMany({}); // Clean up after each test
    });

    it("returns upcoming events for a given user iD", async () => {
      const upcomingDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // tomorrow

      await EventDetails.create([
        {
          title: "Assigned Event", // future event assigned to testUser
          description: "User is assigned here",
          date: upcomingDate,
          assignedVolunteers: [testUser._id],
          location: "Park",
          city: "Testville",
          state: "TX",
          urgency: "Low",
          skillsRequired: [],
          maxVolunteers: 5,
        },
        {
          title: "Unassigned Event", // future event not assigned to testUser
          description: "Not for this user",
          date: upcomingDate,
          assignedVolunteers: [],
          location: "Library",
          city: "Testville",
          state: "TX",
          urgency: "Low",
          skillsRequired: [],
          maxVolunteers: 5,
        },
      ]);

      const res = await request(app).get(
        `/api/event/mycurrent/${testUser._id}`
      );

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);

      const eventTitles = res.body.map((e) => e.title);
      expect(eventTitles).toContain("Assigned Event"); // expect to return the assigned event
      expect(eventTitles).not.toContain("Unassigned Event"); // expect to not return the unassigned event

      expect(res.body.length).toBe(1); // Expect to return just the one event assigned to the user
    });

    it("should return 404 and handle no events properly", async () => {
      const upcomingDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // tomorrow

      await EventDetails.create([
        {
          title: "Unassigned Event",
          description: "Not for this user",
          date: upcomingDate,
          assignedVolunteers: [], // not assigned to user
          location: "Library",
          city: "Testville",
          state: "TX",
          urgency: "Low",
          skillsRequired: [],
          maxVolunteers: 5,
        },
      ]);

      const res = await request(app).get(
        `/api/event/mycurrent/${testUserTwo._id}`
      );

      expect(res.statusCode).toBe(404); // expect it to fall to the no events case
      expect(res.body.message).toBe("No events found");
    });

    it("returns 500 if there is an internal server error", async () => {
      const spy = jest.spyOn(EventDetails, "find").mockReturnValue({
        sort: () => ({
          limit: () => Promise.reject(new Error("Mocked error")),
        }),
      });

      const res = await request(app).get(
        `/api/event/mycurrent/${testUser._id}`
      );

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Internal server error");

      spy.mockRestore();
    });
  });

  describe("POST /api/event/delete/:eventId", () => {
    beforeEach(async () => {
      await EventDetails.deleteMany({}); // Clean up before each test

      // Main test event
      event = await EventDetails.create({
        title: "Current Event",
        description: "Current Event Test",
        location: "Current Drive",
        city: "Current Dallas",
        state: "TX",
        date: new Date(Date.now()), // Today
        urgency: "Low",
        skillsRequired: ["Cleaning", "Teamwork"],
        maxVolunteers: 14,
        assignedVolunteers: [],
      });

      // Past event for myNext... tests
      pastEvent = await EventDetails.create({
        title: "Past Event",
        description: "This is a past event",
        location: "Past",
        city: "Past Austin",
        state: "TX",
        date: new Date("2023-01-01"), // Old date
        urgency: "Low",
        skillsRequired: [],
        maxVolunteers: 5,
        assignedVolunteers: [],
      });

      // Future event for myNext... tests
      const futureEvent = await EventDetails.create({
        title: "Future Event",
        description: "This is a future event",
        location: "Future",
        city: "Future Austin",
        state: "TX",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        urgency: "High",
        skillsRequired: [],
        maxVolunteers: 10,
        assignedVolunteers: [],
      });

      //testUser for myNext... tests
      testUser = await UserProfile.create({
        credentialId: new mongoose.Types.ObjectId(),
        fullName: "Bravo Delta",
        address1: "982 Lane",
        city: "Houston",
        state: "TX",
        zipcode: "74302",
        skills: ["Baking"],
        preferences: "Nothing outside",
        availableDates: [new Date("2025-08-28")],
      });

      //testUser for myNext... tests
      testUserTwo = await UserProfile.create({
        credentialId: new mongoose.Types.ObjectId(),
        fullName: "Echo Foxtrot",
        address1: "123 Road",
        city: "Dallas",
        state: "TX",
        zipcode: "12345",
        skills: ["Cooking"],
        preferences: "No gardening",
        availableDates: [new Date("2025-08-27")],
      });
    });

    afterEach(async () => {
      await EventDetails.deleteMany({}); // Clean up after each test
    });

    it("deletes an event with no volunteers successfully and returns 200", async () => {
      const res = await request(app).post(`/api/event/delete/${event._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Event deleted successfully");

      // Confirm event is deleted
      const deletedEvent = await EventDetails.findById(event._id);
      expect(deletedEvent).toBeNull();
    });

    it("deletes an event with volunteers successfully and returns 200", async () => {
      const attendeeEvent = await EventDetails.create({
        title: "Attendee Event",
        description: "Attendee event",
        location: "Attendee Park",
        city: "Attendee Village",
        state: "TX",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        urgency: "High",
        skillsRequired: [],
        maxVolunteers: 10,
        assignedVolunteers: [testUser._id],
      });
      const res = await request(app).post(
        `/api/event/delete/${attendeeEvent._id}`
      );

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Event deleted successfully");

      // Confirm event is deleted
      const deletedEvent = await EventDetails.findById(attendeeEvent._id);
      expect(deletedEvent).toBeNull();
    });

    it("returns 404 if event is not found", async () => {
      const nonexistentEventId = new mongoose.Types.ObjectId().toString();
      const res = await request(app).post(
        `/api/event/delete/${nonexistentEventId}`
      ); // ID that should not correspond to an existing event sent

      expect(res.statusCode).toBe(404); // expect to fall into the nonexistent event case
      expect(res.body.message).toBe("Event not found");
    });

    it("returns 404 if event deletion fails", async () => {
      jest.spyOn(EventDetails, "findByIdAndDelete").mockResolvedValue(null);

      const res = await request(app).post(`/api/event/delete/${event._id}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Event not found");
    });

    it("returns 500 if there is an internal server error", async () => {
      const eventId = new mongoose.Types.ObjectId().toString(); // Generate a valid but nonexistent event ID

      jest
        .spyOn(EventDetails, "findByIdAndDelete")
        .mockRejectedValue(new Error("Internal server error"));

      const res = await request(app).post(
        `/api/event/delete/${eventId}invalid`
      ); // sending a completely invalid event ID to cause an error

      expect(res.statusCode).toBe(500); // Expect to fall into the proper error case
      expect(res.body.error).toBe("Internal Server Error");

      jest.restoreAllMocks();
    });
  });

  describe("GET /api/event/:eventId", () => {
    beforeEach(async () => {
      await EventDetails.deleteMany({}); // Clean up before each test

      // Main test event
      event = await EventDetails.create({
        title: "Park Cleanup",
        description: "Clean the local park",
        location: "346 Drive",
        city: "Dallas",
        state: "TX",
        date: new Date(Date.now()), // Today
        urgency: "Low",
        skillsRequired: ["Cleaning", "Teamwork"],
        maxVolunteers: 14,
        assignedVolunteers: [],
      });
    });

    afterEach(async () => {
      await EventDetails.deleteMany({}); // Clean up after each test
    });

    it("gets an event given a valid Id", async () => {
      const res = await request(app).get(`/api/event/${event._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("_id", event._id.toString());

      expect(res.body.title).toBe("Park Cleanup");
      expect(res.body.description).toBe("Clean the local park");
    });

    it("returns 404 if event not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/event/${fakeId}`);
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Event not found");
    });

    it("returns 500 if there is an internal server error", async () => {
      const mockPopulate = jest
        .fn()
        .mockRejectedValue(new Error("Mocked error"));
      const spy = jest
        .spyOn(EventDetails, "findById")
        .mockReturnValue({ populate: mockPopulate });

      const res = await request(app).get(`/api/event/${event._id}`);

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Internal Server Error");

      spy.mockRestore();
    });
  });

  describe("POST /api/event/:eventId", () => {
    beforeEach(async () => {
      await EventDetails.deleteMany({}); // Clean up before each test

      // Main test event
      event = await EventDetails.create({
        title: "Local park cleanup",
        description: "Clean the local park to make it shine for the summer",
        location: "123 Rd",
        city: "Sugar Land",
        state: "TX",
        date: new Date(Date.now()), // Today
        urgency: "Low",
        skillsRequired: ["Cleaning", "Teamwork"],
        maxVolunteers: 14,
        assignedVolunteers: [],
      });

      //testUser for myNext... tests
      testUser = await UserProfile.create({
        credentialId: new mongoose.Types.ObjectId(),
        fullName: "Bravo Delta",
        address1: "982 Lane",
        city: "Houston",
        state: "TX",
        zipcode: "74302",
        skills: ["Baking"],
        preferences: "Nothing outside",
        availableDates: [new Date("2025-08-28")],
      });

      //testUser for myNext... tests
      testUserTwo = await UserProfile.create({
        credentialId: new mongoose.Types.ObjectId(),
        fullName: "Echo Foxtrot",
        address1: "123 Road",
        city: "Dallas",
        state: "TX",
        zipcode: "12345",
        skills: ["Cooking"],
        preferences: "No gardening",
        availableDates: [new Date("2025-08-27")],
      });
    });

    afterEach(async () => {
      await EventDetails.deleteMany({}); // Clean up after each test
    });

    it("updates an event (attendee added) given a valid Id", async () => {
      const updatedData = {
        assignedVolunteers: [testUser._id],
      };

      // Send the request to update the event
      const res = await request(app)
        .post(`/api/event/${event._id}`)
        .send(updatedData);

      // Convert both the response and updated data to string arrays
      const updatedVolunteersStr = updatedData.assignedVolunteers.map((id) =>
        id.toString()
      );
      const responseVolunteersStr = res.body.event.assignedVolunteers.map(
        (id) => id.toString()
      );

      // Assertions
      expect(res.statusCode).toBe(200);
      expect(responseVolunteersStr).toEqual(updatedVolunteersStr); // Compare as strings
    });

    it("updates an event (attendee removed) given a valid Id", async () => {
      // User event for updateEvent test
      const attendeeEvent = await EventDetails.create({
        title: "Attendee Event",
        description: "Attendee event",
        location: "Attendee Park",
        city: "Attendee Village",
        state: "TX",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        urgency: "High",
        skillsRequired: [],
        maxVolunteers: 10,
        assignedVolunteers: [testUser._id],
      });

      const updatedData = {
        assignedVolunteers: [],
      };

      // Send the request to update the event
      const res = await request(app)
        .post(`/api/event/${attendeeEvent._id}`)
        .send(updatedData);

      // Convert both the response and updated data to string arrays
      const updatedVolunteersStr = updatedData.assignedVolunteers.map((id) =>
        id.toString()
      );
      const responseVolunteersStr = res.body.event.assignedVolunteers.map(
        (id) => id.toString()
      );

      // Assertions
      expect(res.statusCode).toBe(200);
      expect(responseVolunteersStr).toEqual(updatedVolunteersStr); // Compare as strings

      expect(responseVolunteersStr.length).toBe(0); // Ensure the event's volunteers are removed (empty array)
    });

    it("updates an event (attendees added and removed) given a valid Id", async () => {
      // User event for updateEvent test
      const attendeeEvent = await EventDetails.create({
        title: "Attendee Event",
        description: "Attendee event",
        location: "Attendee Park",
        city: "Attendee Village",
        state: "TX",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        urgency: "High",
        skillsRequired: [],
        maxVolunteers: 10,
        assignedVolunteers: [testUser._id],
      });
      const updatedData = {
        assignedVolunteers: [testUserTwo._id],
      };

      // Send the request to update the event
      const res = await request(app)
        .post(`/api/event/${attendeeEvent._id}`)
        .send(updatedData);

      // Convert both the response and updated data to string arrays
      const updatedVolunteersStr = updatedData.assignedVolunteers.map((id) =>
        id.toString()
      );
      const responseVolunteersStr = res.body.event.assignedVolunteers.map(
        (id) => id.toString()
      );

      // Assertions
      expect(res.statusCode).toBe(200);
      expect(responseVolunteersStr).toEqual(updatedVolunteersStr); // Compare as strings
      expect(res.body.event.assignedVolunteers).toHaveLength(1); // Ensure only 1 volunteer in the array after update
      expect(res.body.event.assignedVolunteers[0].toString()).toBe(
        testUserTwo._id.toString()
      ); // Ensure it matches the updated volunteer
    });

    it("updates an event (detail change) given a valid Id", async () => {
      const updatedData = {
        title: "Updated event",
        description: "This is a test update.",
        date: "2025-10-01T10:00:00Z",
        location: "Main Street",
        assignedVolunteers: [testUserTwo._id],
      };

      // Send the request to update the event
      const res = await request(app)
        .post(`/api/event/${event._id}`)
        .send(updatedData);

      // Ensure the response status code is 200 (OK)
      expect(res.statusCode).toBe(200);

      // Comparing dates
      const receivedDate = new Date(res.body.event.date)
        .toISOString()
        .split("T")[0];
      const expectedDate = new Date(updatedData.date)
        .toISOString()
        .split("T")[0];

      expect(receivedDate).toBe(expectedDate);

      expect(res.body.event).toHaveProperty("_id", event._id.toString());
      expect(res.body.event.title).toBe(updatedData.title);
      expect(res.body.event.description).toBe(updatedData.description);
      expect(res.body.event.location).toBe(updatedData.location);
    });

    it("returns 404 if event not found", async () => {
      const updatedData = {
        assignedVolunteers: [testUser._id],
      };
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .post(`/api/event/${fakeId}`)
        .send(updatedData);
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Event not found");
    });

    it("returns 500 if there is an internal server error", async () => {
      const mockPopulate = jest
        .fn()
        .mockRejectedValue(new Error("Mocked error"));
      const spy = jest
        .spyOn(EventDetails, "findById")
        .mockRejectedValue(new Error("Mocked error"));

      const updatedData = {
        assignedVolunteers: [testUser._id],
      };
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .post(`/api/event/${fakeId}`)
        .send(updatedData);

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Internal Server Error");

      spy.mockRestore();
    });
  });
});
