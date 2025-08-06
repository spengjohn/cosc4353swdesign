import { jest } from '@jest/globals';
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserCredentials from "../models/UserCredentials.js";
import UserProfile from "../models/UserProfile.js";
import EventDetails from "../models/Event.js";
import { getProfile, updateProfile, verifyUser } from "../controllers/profileController.js";

// test env
dotenv.config({ path: ".env.test" });

jest.setTimeout(15000);

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Profile Controller (Real DB)", () => {
  let user;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await UserCredentials.deleteMany({});
    await UserProfile.deleteMany({});

    user = await UserCredentials.create({
      email: "profiletest@example.com",
      password: "SecretPass1!",
      role: "volunteer",
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  it("updates profile", async () => {
    const req = {
      params: { accountId: user._id },
      body: {
        fullName: "Jane Doe",
        city: "Houston",
        skills: ["Cleaning"],
      },
    };
    const res = mockResponse();
    await updateProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      profile: expect.objectContaining({ fullName: "Jane Doe" })
    }));
  });

  it("retrieves the updated profile", async () => {
    const req = { params: { accountId: user._id } };
    const res = mockResponse();
    await getProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      fullName: "Jane Doe"
    }));
  });

  it("verifies the user", async () => {
    const req = { params: { accountId: user._id } };
    const res = mockResponse();
    await verifyUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "User verified successfully." });
  });

  it("returns null when no profile exists", async () => {
    const newUser = await UserCredentials.create({
      email: "noprofile@example.com",
      password: "Test1234!",
      role: "volunteer",
    });

    const req = { params: { accountId: newUser._id } };
    const res = mockResponse();
    await getProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(null);
  });

  it("returns 404 when updating profile for non-existent user", async () => {
    const req = {
      params: { accountId: new mongoose.Types.ObjectId() },
      body: { city: "Austin" },
    };
    const res = mockResponse();
    await updateProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found." });
  });

  it("returns 404 when verifying non-existent user", async () => {
    const req = {
      params: { accountId: new mongoose.Types.ObjectId() },
    };
    const res = mockResponse();
    await verifyUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found." });
  });

  it("returns 500 if verifyUser throws an error", async () => {
    const req = { params: { accountId: "invalid" } };
    const res = mockResponse();
    await verifyUser(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });  
  

const todayISO = new Date().toISOString().slice(0, 10);
const twoDaysAhead = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

it("rejects update if user is assigned to conflicting future event", async () => {
  // Create event requiring 'Cleaning' in different city and assign user
  const futureEvent = await EventDetails.create({
    title: "Test Conflict Event",
    description: "Should block update",
    location: "123",
    city: "Dallas", // mismatch
    state: "TX", // mismatch
    date: twoDaysAhead,
    urgency: "High",
    skillsRequired: ["Cleaning"], // match
    maxVolunteers: 5,
    assignedVolunteers: [user._id],
  });

  const req = {
    params: { accountId: user._id },
    body: {
      fullName: "Blocked User",
      city: "Houston",  // mismatch
      state: "AL",      // mismatch
      skills: ["Cleaning"], 
      availableDates: [twoDaysAhead]
    },
  };
  const res = mockResponse();
  await updateProfile(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
    error: expect.stringContaining("Cannot update profile")
  }));
});

it("allows update if conflicts only exist with past events", async () => {
  // Create past event with mismatching city/state/skills
  await EventDetails.deleteMany({ assignedVolunteers: user._id, date: { $gte: new Date() } });

  const pastDate = new Date();
pastDate.setDate(pastDate.getDate() - 3); // 3 days ago
pastDate.setHours(0, 0, 0, 0); // Normalize start of day

  await EventDetails.create({
    title: "Old Event",
    description: "Should not block",
    location: "123",
    city: "Austin",
    state: "TX",
    date: pastDate,
    urgency: "Low",
    skillsRequired: ["Welding"],
    maxVolunteers: 5,
    assignedVolunteers: [user._id],
  });

  const req = {
    params: { accountId: user._id },
    body: {
      fullName: "Allowed User",
      city: "Houston",
      state: "AL",
      skills: ["Cleaning"],
      availableDates: [todayISO]
    },
  };
  const res = mockResponse();
  console.log("Today ISO:", todayISO);
console.log("Past date ISO:", pastDate.toISOString());

  await updateProfile(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
    message: "Profile saved",
    profile: expect.objectContaining({ fullName: "Allowed User" })
  }));
});

  
});
