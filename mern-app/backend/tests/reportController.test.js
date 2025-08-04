// tests/reportRoutes.test.js
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import request from "supertest";
import {jest } from "@jest/globals";

import app from "../index.js";
import UserProfile from "../models/UserProfile.js";
import UserCredentials from "../models/UserCredentials.js";
import VolunteerHistory from "../models/VolunteerHistory.js";
import Event from "../models/Event.js";

describe("GET /api/reports/volunteers/csv", () => {
  const OUTPUT_PATH = path.join("reports", "volunteer_report.csv");

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
    try {
      await fs.unlink(OUTPUT_PATH);
    } catch (err) {}
  });

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
  }),
  it("should return 500 if there is a server error", async () => {
    // Temporarily mock the Mongoose model method to throw an error
    const originalFind = VolunteerHistory.find;
    VolunteerHistory.find = jest.fn().mockImplementation(() => {
        throw new Error("Mocked server error");
    });

    const res = await request(app).get("/api/reports/volunteers/csv");

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("error", "Failed to generate volunteer report");

    // Restore original method to avoid affecting other tests
    VolunteerHistory.find = originalFind;
    });
});
