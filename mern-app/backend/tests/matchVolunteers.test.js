import request from "supertest";
import {jest} from "@jest/globals"
import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import { getMatches } from "../controllers/volunteerMatchingController.js";
import EventDetails from "../models/Event.js";
import UserProfile from "../models/UserProfile.js";

dotenv.config({ path: ".env.test" });

// Setup basic app
const app = express();
app.use(express.json());
app.get("/api/match/:eventId", getMatches);

describe("GET /api/match/:eventId", () => {
  let event;
  let matchingUser;
  let nonMatchingUser;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await EventDetails.deleteMany({});
    await UserProfile.deleteMany({});

    // Create event
    event = await EventDetails.create({
      title: "Beach Cleanup",
      description: "Clean the beach",
      location: "Beach Park",
      city: "Houston",
      state: "TX",
      date: new Date("2025-08-15"),
      urgency: "High",
      skillsRequired: ["Lifting", "Teamwork"],
      maxVolunteers: 10,
      assignedVolunteers: [],
    });

    // Matching user
    matchingUser = await UserProfile.create({
      credentialId: new mongoose.Types.ObjectId(),
      fullName: "Alice Match",
      address1: "123 Ocean Dr",
      city: "Houston",
      state: "TX",
      zipcode: "77001",
      skills: ["Lifting", "Teamwork"],
      preferences: "Morning",
      availableDates: [new Date("2025-08-15")],
    });

    // Non-matching user (wrong state)
    nonMatchingUser = await UserProfile.create({
      credentialId: new mongoose.Types.ObjectId(),
      fullName: "Bob NoMatch",
      address1: "456 Mountain Rd",
      city: "Dallas",
      state: "CA",
      zipcode: "90210",
      skills: ["Lifting"],
      preferences: "Afternoon",
      availableDates: [new Date("2025-08-15")],
    });
    // city mismatch
    matchingUser2 = await UserProfile.create({
      credentialId: new mongoose.Types.ObjectId(),
      fullName: "City Mismatch",
      address1: "456",
      city: "Dallas",
      state: "TX",
      zipcode: "75001",
      skills: ["Lifting", "Teamwork"],
      availableDates: [event.date],
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should return only matching users for the event", async () => {
    const res = await request(app).get(`/api/match/${event._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].fullName).toBe("Alice Match");
  });

  it("should return 404 if event not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/match/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Event not found");
  });

  

  it("should return 500 if an error occurs during matching", async () => {
    // Temporarily mock EventDetails.findById to throw
    const original = EventDetails.findById;
    EventDetails.findById = jest.fn().mockRejectedValue(new Error("Mocked error"));

    const res = await request(app).get(`/api/match/${event._id}`);
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Internal server error");

    // Restore
    EventDetails.findById = original;
  });

  it("should sort matching users by city match (event.city)", async () => {
  
    const res = await request(app).get(`/api/match/${event._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);

    // City match should come first
    expect(res.body[0].city).toBe("Houston");
  });

  it("should return an empty array if no users match the event criteria", async () => {
    // Remove matching skills from the only matching user
    await UserProfile.findByIdAndUpdate(matchingUser._id, {
      skills: ["Cooking"],
    });
    await UserProfile.findByIdAndUpdate(matchingUser2._id, {
      skills: ["Cooking"],
    });
    const res = await request(app).get(`/api/match/${event._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]); // No matches
  });
});
