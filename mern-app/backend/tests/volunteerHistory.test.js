import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {jest } from "@jest/globals"
import { getHistory } from "../controllers/volunteerHistoryController.js";
import VolunteerHistory from "../models/VolunteerHistory.js";

dotenv.config({ path: ".env.test" });

const app = express();
app.use(express.json());
app.get("/api/history/:accountId", getHistory);

describe("GET /api/history/:accountId", () => {
  let testAccountId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await VolunteerHistory.deleteMany({});

    testAccountId = new mongoose.Types.ObjectId();

    await VolunteerHistory.create({
      credentialId: testAccountId,
      eventHistory: [
        { event: new mongoose.Types.ObjectId(), attended: true },
        { event: new mongoose.Types.ObjectId(), attended: false },
      ],
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should return volunteer history for a valid accountId", async () => {
    const res = await request(app).get(`/api/history/${testAccountId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("credentialId");
    expect(res.body.eventHistory).toBeInstanceOf(Array);
    expect(res.body.eventHistory.length).toBe(2);
  });

  it("should return 404 if volunteer history not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/history/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Volunteer History not found.");
  });

  it("should return 500 if there is a server error", async () => {
    const original = VolunteerHistory.findOne;
    VolunteerHistory.findOne = jest.fn().mockRejectedValue(new Error("Mocked failure"));

    const res = await request(app).get(`/api/history/${testAccountId}`);
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Internal Server Error");

    VolunteerHistory.findOne = original;
  });
});
