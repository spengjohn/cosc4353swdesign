// supertest.test.js
import request from "supertest";
import express from "express";
import volunteerMatchRoutes from "../routes/volunteerMatching.js"; // adjust if your route is named differently
//import { mockProfiles } from "../mocks/mockProfiles.js";
import { mockEvents } from "../mocks/mockEvents.js";

const app = express();
app.use(express.json());
app.use("/api/volmatch", volunteerMatchRoutes); // mount the matching route

describe("GET /api/volmatch/:eventId", () => {
  it("should return matching volunteers for Event 1 (Community Cooking)", async () => {
    const response = await request(app).get("/api/volmatch/1");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    const names = response.body.map((v) => v.fullName);
    expect(names).toContain("Alice");
    expect(names).toContain("Iggy");
    expect(names).not.toContain("Diana");
    expect(names).not.toContain("Gio");
  });

  it("should return no matches if no volunteers meet the criteria", async () => {
    const event = { ...mockEvents[1], skillsRequired: ["Unicorn Wrangling"] };
    mockEvents[1] = event; // override to simulate edge case

    const response = await request(app).get("/api/volmatch/1");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it("should return 404 for invalid event ID", async () => {
    const response = await request(app).get("/api/volmatch/9999");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Event not found");
  });
});
