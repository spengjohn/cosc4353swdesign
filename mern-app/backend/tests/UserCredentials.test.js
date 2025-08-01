import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import UserCredentials from "../models/UserCredentials.js";
import { jest } from '@jest/globals';
import dotenv from 'dotenv';

dotenv.config({ path: ".env.test" });

describe("UserCredentials Model (Real DB)", () => {
  beforeAll(async () => {
    jest.setTimeout(20000);
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await UserCredentials.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  it("should hash the password before saving", async () => {
    const user = new UserCredentials({
      email: "hash@example.com",
      password: "Secret123!",
      role: "admin",
    });

    const savedUser = await user.save();
    expect(savedUser.password).not.toBe("Secret123!");
    const isMatch = await bcrypt.compare("Secret123!", savedUser.password);
    expect(isMatch).toBe(true);
  });

  it("should correctly match a valid password using matchPassword method", async () => {
    const user = new UserCredentials({
      email: "match@example.com",
      password: "MyPass456!",
      role: "volunteer",
    });
    await user.save();

    const found = await UserCredentials.findOne({ email: "match@example.com" });
    const result = await found.matchPassword("MyPass456!");
    expect(result).toBe(true);
  });

  it("should not match an incorrect password", async () => {
    const user = new UserCredentials({
      email: "failmatch@example.com",
      password: "CorrectPass1!",
      role: "volunteer",
    });
    await user.save();

    const found = await UserCredentials.findOne({ email: "failmatch@example.com" });
    const result = await found.matchPassword("WrongPass");
    expect(result).toBe(false);
  });

  it("should throw validation error when email is missing", async () => {
    let error;
    try {
      await new UserCredentials({ password: "Pass123!", role: "admin" }).save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.errors.email).toBeDefined();
  });

  it("should throw validation error for invalid email format", async () => {
    let error;
    try {
      await new UserCredentials({ email: "bademail", password: "Pass123!", role: "admin" }).save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.errors.email).toBeDefined();
  });

  it("should throw validation error when password is missing", async () => {
    let error;
    try {
      await new UserCredentials({ email: "nopass@example.com", role: "admin" }).save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.errors.password).toBeDefined();
  });

  it("should default isVerified and isProfileComplete to false", async () => {
    const user = new UserCredentials({
      email: "defaults@example.com",
      password: "DefaultPass123!",
      role: "admin",
    });
    const savedUser = await user.save();
    expect(savedUser.isVerified).toBe(false);
    expect(savedUser.isProfileComplete).toBe(false);
  });

  it("should throw validation error when role is missing", async () => {
    let error;
    try {
      await new UserCredentials({ email: "norole@example.com", password: "Pass123!" }).save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.errors.role).toBeDefined();
  });

  it("should throw validation error for invalid role", async () => {
    let error;
    try {
      await new UserCredentials({ email: "invalidrole@example.com", password: "Pass123!", role: "guest" }).save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.errors.role).toBeDefined();
  });

  it("should skip password hashing if password is not modified", async () => {
    const user = new UserCredentials({
      email: "unmodified@example.com",
      password: "SamePassword1!",
      role: "admin",
    });
    await user.save();
  
    user.role = "admin"; 
    const originalHash = user.password;
    await user.save(); 
  
    expect(user.password).toBe(originalHash);
  });
  
});
