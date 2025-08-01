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
import UserCredentials from "../models/UserCredentials.js";
import UserProfile from "../models/UserProfile.js";


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
    
        // Add a past event
    pastEvent = await EventDetails.create({
      title: "Old Event",
      description: "This is a past event",
      location: "Old Place",
      city: "Austin",
      state: "TX",
      date: new Date("2023-01-01"),
      urgency: "Low",
      skillsRequired: [],
      maxVolunteers: 5,
      assignedVolunteers: [],
    });

    // Add a future event (this one should appear)
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

  afterAll(async () => {
    await mongoose.disconnect();
  });

it("getEvent should properly get an event given a valid Id", async () => {
  const res = await request(app).get(`/api/event/${event._id}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("_id", event._id.toString()); 

  expect(res.body.title).toBe("Beach Cleanup");
  expect(res.body.description).toBe("Clean the beach");
  });

  it("getEvent should return 404 if event not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/event/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Event not found");
  });

  it("getEvent should return 500 if there is an internal server error", async () => {
   const mockPopulate = jest.fn().mockRejectedValue(new Error("Mocked error"));
   const spy = jest.spyOn(EventDetails, "findById").mockReturnValue({ populate: mockPopulate });

   const res = await request(app).get(`/api/event/${event._id}`);

   expect(res.statusCode).toBe(500);
   expect(res.body.error).toBe("Internal Server Error");

   spy.mockRestore();
     });

   it("getCurrentEvents should return proper upcoming events", async () => {

    const res = await request(app).get("/api/event/current");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2); 

    const returnedEvent = res.body[0];
    // expect(returnedEvent.title).toBe("Upcoming Event");
   });
   

  it("getCurrentEvents should return 500 if there is an internal server error", async () => {
   const spy = jest.spyOn(EventDetails, "find").mockRejectedValue(new Error("Mocked error"));

   const res = await request(app).get(`/api/event/current`);

   expect(res.statusCode).toBe(500);
   expect(res.body.error).toBe("Internal server error");

   spy.mockRestore();
     });

    it("getMyNextEvents should return proper upcoming events for a given user iD", async () => {
 const upcomingDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // tomorrow

  await EventDetails.create([
    {
      title: "Assigned Event",
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
    }
  ]);

  // Assume the route accepts a query param ?userId=...
  const res = await request(app).get(`/api/event/mycurrent/${testUser._id}`);

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);

  const eventTitles = res.body.map(e => e.title);
  expect(eventTitles).toContain("Assigned Event");
  expect(eventTitles).not.toContain("Unassigned Event");

  // Optional: expect the correct number
  expect(res.body.length).toBe(1);
   });

   it("getMyNextEvents should return 404 and handle no events properly", async () => {
 const upcomingDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // today

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
    }
  ]);

  // Assume the route accepts a query param ?userId=...
  const res = await request(app).get(`/api/event/mycurrent/${testUser._id}`);

  expect(res.statusCode).toBe(404);
   expect(res.body.message).toBe("No events found");
   });
   
//     it("getCurrentEvents should return 500 if there is an internal server error", async () => {
// const spy = jest.spyOn(EventDetails, "find").mockRejectedValue(new Error("Mocked error"));


// const res = await request(app).get(`/api/event/mycurrent/${testUser._id}`);



// expect(res.statusCode).toBe(500);
// expect(res.body.error).toBe("Internal server error");

// spy.mockRestore();
//      });
   
});
