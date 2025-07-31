process.env.NODE_ENV = "test";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import request from "supertest";
import {jest} from "@jest/globals"
import mongoose from "mongoose";
import express from "express";
import { createEvent, getCurrentEvents, getEvent, getMyNextEvents, updateEvent, deleteEvent} from "../controllers/eventController.js";
import EventDetails from "../models/Event.js";
import eventRouter from "../routes/event.js"


dotenv.config({ path: ".env.test" });

// Setup basic app
const app = express();
app.use(express.json());
app.use('/api/event', eventRouter);

describe("GET /api/event/:eventId", () => {
  let event;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await EventDetails.deleteMany({});
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
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

it("should properly get an event given a valid Id", async () => {
 
  const res = await request(app).get(`/api/event/${event._id}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("_id", event._id.toString()); 

  expect(res.body.title).toBe("Beach Cleanup");
  expect(res.body.description).toBe("Clean the beach");
  });

  it("should return 404 if event not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/event/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Event not found");
  });

  it("should return 500 if there is an internal server error", async () => {
   const mockPopulate = jest.fn().mockRejectedValue(new Error("Mocked error"));
   const spy = jest.spyOn(EventDetails, "findById").mockReturnValue({ populate: mockPopulate });

   const res = await request(app).get(`/api/event/${event._id}`);

   expect(res.statusCode).toBe(500);
   expect(res.body.error).toBe("Internal Server Error");

   spy.mockRestore();
     });
});
