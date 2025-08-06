// tests/reportRoutes.test.js
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import request from "supertest";
import { jest } from "@jest/globals";

import app from "../index.js";
import UserProfile from "../models/UserProfile.js";
import UserCredentials from "../models/UserCredentials.js";
import VolunteerHistory from "../models/VolunteerHistory.js";
import Event from "../models/Event.js";

describe("Report Routes", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await UserProfile.deleteMany({});
    await UserCredentials.deleteMany({});
    await VolunteerHistory.deleteMany({});
    await Event.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  describe("GET /api/reports/volunteers/csv", () => {
    it("should return CSV file as download", async () => {
      const userCred = await UserCredentials.create({
        email: "routeuser@example.com",
        password: "Password123",
        role: "volunteer",
      });

      await UserProfile.create({
        credentialId: userCred._id,
        fullName: "Route User",
        address1: "456 Main St",
        city: "Austin",
        state: "TX",
        zipcode: "73301",
        skills: ["Food Prep"],
        availableDates: [new Date()],
      });

      const event = await Event.create({
        title: "Soup Kitchen",
        description: "Help cook meals",
        location: "Community Hall",
        city: "Austin",
        state: "TX",
        date: new Date(),
        urgency: "Medium",
        skillsRequired: ["Food Prep"],
        maxVolunteers: 5,
      });

      await VolunteerHistory.create({
        credentialId: userCred._id,
        eventHistory: [{ event: event._id, attended: false }],
      });

      const res = await request(app).get("/api/reports/volunteers/csv");

      expect(res.status).toBe(200);
      expect(res.header["content-type"]).toBe("text/csv; charset=utf-8");
      expect(res.header["content-disposition"]).toContain("attachment");
      expect(res.text).toContain("Route User");
      expect(res.text).toContain("Soup Kitchen");
      expect(res.text).toContain("No-Show");
    });

    it("should handle multiple volunteer histories", async () => {
      const user1 = await UserCredentials.create({ email: "a@example.com", password: "Password123", role: "volunteer" });
      const user2 = await UserCredentials.create({ email: "b@example.com", password: "Password123", role: "volunteer" });

      await UserProfile.create([
        {
          credentialId: user1._id,
          fullName: "Alice",
          address1: "123 Main St",
          city: "Austin",
          state: "TX",
          zipcode: "73301",
        },
        {
          credentialId: user2._id,
          fullName: "Bob",
          address1: "456 Oak St",
          city: "Austin",
          state: "TX",
          zipcode: "73301",
        },
      ]);

      const event1 = await Event.create({
        title: "Clean Park",
        description: "Park cleaning event",
        location: "Downtown Park",
        city: "Austin",
        state: "TX",
        date: new Date(),
        urgency: "Low",
        skillsRequired: [],
        maxVolunteers: 5
      });

      const event2 = await Event.create({
        title: "Food Drive",
        description: "Distribute food items",
        location: "Food Bank",
        city: "Austin",
        state: "TX",
        date: new Date(),
        urgency: "Medium",
        skillsRequired: [],
        maxVolunteers: 5
      });


      await VolunteerHistory.create([
        { credentialId: user1._id, eventHistory: [{ event: event1._id, attended: true }] },
        { credentialId: user2._id, eventHistory: [{ event: event2._id, attended: false }] },
      ]);

      const res = await request(app).get("/api/reports/volunteers/csv");

      expect(res.statusCode).toBe(200);
      expect(res.text).toContain("Alice");
      expect(res.text).toContain("Clean Park");
      expect(res.text).toContain("Attended");
      expect(res.text).toContain("Bob");
      expect(res.text).toContain("Food Drive");
      expect(res.text).toContain("No-Show");
    });

    it("should return 200 with empty CSV when no data exists", async () => {
      const res = await request(app).get("/api/reports/volunteers/csv");
      expect(res.statusCode).toBe(200);
      expect(res.text).toContain("Volunteer Name");
    });

    it("should return 500 if there is a server error", async () => {
      const originalFind = VolunteerHistory.find;
      VolunteerHistory.find = jest.fn().mockImplementation(() => {
        throw new Error("Mocked server error");
      });

      const res = await request(app).get("/api/reports/volunteers/csv");

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to generate volunteer report");
      VolunteerHistory.find = originalFind;
    });
  });

  describe("GET /api/reports/volunteers/json", () => {
    it("should return a JSON file with volunteer history", async () => {
      const user = await UserCredentials.create({ email: "json@example.com", password: "Password123", role: "volunteer" });
      await UserProfile.create({
        credentialId: user._id,
        fullName: "Json User",
        address1: "789 Elm St",
        city: "Austin",
        state: "TX",
        zipcode: "73301",
      });
      const event = await Event.create({
        title: "Beach Cleanup",
        description: "Clean the beach area",
        location: "Santa Monica Beach",
        city: "LA",
        state: "CA",
        date: new Date(),
        urgency: "High",
        skillsRequired: [],
        maxVolunteers: 3
      });

      await VolunteerHistory.create({ credentialId: user._id, eventHistory: [{ event: event._id, attended: true }] });

      const res = await request(app).get("/api/reports/volunteers/json");

      expect(res.statusCode).toBe(200);
      expect(res.header["content-type"]).toContain("application/json");
      expect(res.header["content-disposition"]).toContain("attachment");
      expect(res.text).toContain("Json User");
      expect(res.text).toContain("Beach Cleanup");
    });

    it("should return 500 on error", async () => {
      const spy = jest.spyOn(VolunteerHistory, 'find').mockImplementation(() => ({
        populate: () => ({
          populate: () => {
            throw new Error("Mocked error");
          }
        })
      }));

      const res = await request(app).get("/api/reports/volunteers/json");
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to generate volunteer JSON report");

      spy.mockRestore();
    });

  });

  describe("GET /api/reports/events/csv", () => {
    it("should generate event report CSV with volunteer details", async () => {
      const user = await UserCredentials.create({ email: "event@example.com", password: "Password123", role: "volunteer" });
      await UserProfile.create({
        credentialId: user._id,
        fullName: "Event Volunteer",
        address1: "101 Pine St",
        city: "Austin",
        state: "TX",
        zipcode: "73301",
      });

      await Event.create({
        title: "Toy Drive",
        description: "Bring toys",
        location: "Rec Center",
        city: "Austin",
        state: "TX",
        date: new Date(),
        urgency: "High",
        skillsRequired: ["Organizing"],
        maxVolunteers: 10,
        assignedVolunteers: [user._id],
      });

      const res = await request(app).get("/api/reports/events/csv");
      expect(res.statusCode).toBe(200);
      expect(res.text).toContain("Toy Drive");
      expect(res.text).toContain("Event Volunteer");
    });

    it("should return 500 on failure", async () => {
      const spy = jest.spyOn(Event, 'find').mockImplementation(() => ({
        populate: () => ({
          lean: () => {
            throw new Error("Fail");
          }
        })
      }));

      const res = await request(app).get("/api/reports/events/csv");
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to generate event CSV report");

      spy.mockRestore();
    });

  });

  describe("GET /api/reports/events/json", () => {
    it("should return a JSON event report with assigned volunteers", async () => {
      const user = await UserCredentials.create({ email: "jsonvol@example.com", password: "Password123", role: "volunteer" });
      await UserProfile.create({
        credentialId: user._id,
        fullName: "Json Vol",
        address1: "456 Cedar St",
        city: "Austin",
        state: "TX",
        zipcode: "73301",
      });

      await Event.create({
        title: "Charity Run",
        description: "Run to raise funds",
        location: "Park",
        city: "Dallas",
        state: "TX",
        date: new Date(),
        urgency: "Low",
        skillsRequired: ["Running"],
        maxVolunteers: 20,
        assignedVolunteers: [user._id],
      });

      const res = await request(app).get("/api/reports/events/json");
      expect(res.statusCode).toBe(200);
      expect(res.text).toContain("Charity Run");
      expect(res.text).toContain("Json Vol");
    });
  });
});
