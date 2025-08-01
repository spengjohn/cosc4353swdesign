import request from "supertest";
import app from "../index.js";
import UserCredentials from "../models/UserCredentials.js";

beforeAll(async () => {
  await UserCredentials.deleteMany({});
});

afterAll(async () => {
  await UserCredentials.deleteMany({});
});

describe("Login & Register Controller", () => {
  const email = "testuser@example.com";
  const password = "TestPass123!";
  const role = "volunteer";

  it("registers a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({ email, password, role });
    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe(email);
  });

  it("fails to register duplicate user", async () => {
    const res = await request(app).post("/api/auth/register").send({ email, password, role });
    expect(res.statusCode).toBe(409);
  });

  it("rejects invalid email format during register", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "bademail",
      password,
      role,
    });
    expect(res.statusCode).toBe(400);
  });

  it("rejects short password during register", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "short@example.com",
      password: "123",
      role,
    });
    expect(res.statusCode).toBe(400);
  });

  it("rejects invalid role during register", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "rolefail@example.com",
      password,
      role: "guest",
    });
    expect(res.statusCode).toBe(400);
  });

  it("handles forced register error", async () => {
    const res = await request(app).post("/api/auth/register").send({
      forceError: true,
      email: "force@example.com",
      password,
      role,
    });
    expect(res.statusCode).toBe(500);
  });

  it("logs in successfully", async () => {
    const res = await request(app).post("/api/auth/login").send({ email, password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("rejects login with missing email", async () => {
    const res = await request(app).post("/api/auth/login").send({ password });
    expect(res.statusCode).toBe(400);
  });

  it("rejects login when password is too short", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "shortpass@example.com", // never registered
      password: "123",               
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/at least 6 characters/i);
  });  

  it("rejects login with incorrect password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email,
      password: "WrongPass123!",
    });
    expect(res.statusCode).toBe(401);
  });

  it("handles forced login error", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email,
      password,
      forceError: true,
    });
    expect(res.statusCode).toBe(500);
  });

  it("rejects login with short password using a registered user", async () => {
    const newEmail = "shortlogin@example.com";
    const validPassword = "ValidPass123!";
    await request(app).post("/api/auth/register").send({
      email: newEmail,
      password: validPassword,
      role: "volunteer",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: newEmail,
      password: "123", // triggers password length check
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/at least 6 characters/i);
  });

  it("triggers line 18: rejects short password before user check", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "fakeuser@example.com", // not in DB
      password: "123",               // < 6 chars triggers line 18
    });
  
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/at least 6 characters/i);
  });  

  it("updates isVerified and isProfileComplete", async () => {
    const user = await UserCredentials.findOne({ email });

    const res = await request(app).patch("/api/auth/update").send({
      userId: user._id,
      isVerified: true,
      isProfileComplete: true,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.isVerified).toBe(true);
    expect(res.body.user.isProfileComplete).toBe(true);
  });

  it("updates only isVerified", async () => {
    const user = await UserCredentials.findOne({ email });

    const res = await request(app).patch("/api/auth/update").send({
      userId: user._id,
      isVerified: false,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.isVerified).toBe(false);
  });

  it("updates only isProfileComplete", async () => {
    const user = await UserCredentials.findOne({ email });

    const res = await request(app).patch("/api/auth/update").send({
      userId: user._id,
      isProfileComplete: false,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.isProfileComplete).toBe(false);
  });

  it("ignores update when no fields provided", async () => {
    const user = await UserCredentials.findOne({ email });

    const res = await request(app).patch("/api/auth/update").send({
      userId: user._id,
    });

    expect(res.statusCode).toBe(200);
  });

  it("rejects update when userId is missing", async () => {
    const res = await request(app).patch("/api/auth/update").send({
      isVerified: true,
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns 404 for valid but non-existing userId", async () => {
    const res = await request(app).patch("/api/auth/update").send({
      userId: "64d15b8c65cc8a6dd6efffff",
      isVerified: true,
    });

    expect(res.statusCode).toBe(404);
  });

  it("returns 500 for invalid userId format", async () => {
    const res = await request(app).patch("/api/auth/update").send({
      userId: "not-a-valid-id",
      isVerified: true,
    });

    expect(res.statusCode).toBe(500);
  });
});
