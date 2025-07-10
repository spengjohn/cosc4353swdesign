import request from "supertest";
import app from "../index.js"; // Adjust path if needed

describe("User API Mocked Routes", () => {
  it("GET /api/users/:id should return mock user", async () => {
    const res = await request(app).get("/api/users/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.fullName).toBe("Jane Doe");
    expect(res.body.city).toBe("Houston");
    expect(res.body.skills).toContain("Cooking");
  });

  it("POST /api/users/:id should return updated data", async () => {
    const updated = {
      fullName: "Updated Name",
      city: "Austin",
      availableDates: ["2025-08-01", "2025-08-02"],
      role: "volunteer",
      isProfileComplete: true
    };

    const res = await request(app)
      .post("/api/users/1")
      .send(updated);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User profile updated");
    expect(res.body.user.fullName).toBe("Updated Name");
    expect(res.body.user.city).toBe("Austin");
  });

  it("POST /api/users/:id with invalid body should still succeed for now", async () => {
    const res = await request(app)
      .post("/api/users/1")
      .send({ badField: "bad" });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.badField).toBe("bad");
  });
});
