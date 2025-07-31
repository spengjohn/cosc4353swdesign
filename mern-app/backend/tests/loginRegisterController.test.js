import request from 'supertest';
import app from '../index.js';
import { jest } from '@jest/globals';

import UserCredentials from '../models/UserCredentials.js';

beforeAll(async () => {
  await UserCredentials.deleteMany({});
});

describe('Login & Register Endpoints', () => {
  // LOGIN
  it('should login successfully with correct credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@gmail.com',
      password: 'Admin123!'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should reject login with wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@gmail.com',
      password: 'WrongPass'
    });
    expect(res.statusCode).toBe(401);
  });

  it('should reject login with missing email', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: '',
      password: 'Pass1234'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Invalid email format/i);
  });

  it('should reject login with invalid email format', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'invalidemailformat',
      password: 'Pass1234'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Invalid email format/i);
  });

  it('should reject login with missing password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@gmail.com',
      password: ''
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Password must be at least 6 characters/i);
  });   

  it('should reject login with completely missing fields', async () => {
    const res = await request(app).post('/api/auth/login').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Invalid email format/i);
  });

  // REGISTER
  it('should register a new user successfully', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'freshuser@example.com',
      password: 'Pass1234',
      role: 'volunteer'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe('freshuser@example.com');
  });

  it('should reject duplicate registration', async () => {
    const email = 'duptest@example.com';

    await request(app).post('/api/auth/register').send({
      email,
      password: 'Pass1234',
      role: 'admin'
    });

    const res = await request(app).post('/api/auth/register').send({
      email,
      password: 'Pass1234',
      role: 'admin'
    });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/Email already registered/i);
  });

  it('should reject duplicate registration even with different role', async () => {
    const email = 'mixedrole@example.com';

    await request(app).post('/api/auth/register').send({
      email,
      password: 'Pass1234',
      role: 'volunteer'
    });

    const res = await request(app).post('/api/auth/register').send({
      email,
      password: 'Pass1234',
      role: 'admin'
    });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/Email already registered/i);
  });

  it('should reject short password', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'shortpass@example.com',
      password: '123',
      role: 'volunteer'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Password must be at least 6 characters/i);
  });

  it('should reject invalid email format during register', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'notanemail',
      password: 'Pass1234',
      role: 'volunteer'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Invalid email format/i);
  });

  it('should reject registration with empty role', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'norole@example.com',
      password: 'Pass1234',
      role: ''
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Role must be admin or volunteer/i);
  });

  it('should reject registration with missing role field', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'norole2@example.com',
      password: 'Pass1234'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Role must be admin or volunteer/i);
  });

  it('should reject invalid role', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'badrole@example.com',
      password: 'Pass1234',
      role: 'guest'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Role must be admin or volunteer/i);
  });

  it('should handle internal server error', async () => {
    const res = await request(app).post('/api/auth/register').send({
      forceError: true
    });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toMatch(/Internal Server Error/i);
  });

  it('should log register error to console', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await request(app).post('/api/auth/register').send({
      forceError: true
    });
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Register error/), expect.any(Error));
    spy.mockRestore();
  });

  it('should handle internal server error during login', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const res = await request(app).post('/api/auth/login').send({
      forceError: true,
      email: 'failcase@example.com',
      password: 'errorpass'
    });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toMatch(/Internal Server Error/i);
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Login error/), expect.any(Error));

    spy.mockRestore();
  });

  it('should handle runtime error during register', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const res = await request(app).post('/api/auth/register').send({
      forceError: true,
      email: 'crashme@example.com',
      password: 'CrashPass123',
      role: 'volunteer'
    });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toMatch(/Internal Server Error/i);

    spy.mockRestore();
  });

  it('should allow login after successful register', async () => {
    const email = 'chainuser@example.com';
    const password = 'ChainPass123';

    await request(app).post('/api/auth/register').send({
      email,
      password,
      role: 'volunteer'
    });

    const res = await request(app).post('/api/auth/login').send({ email, password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.email).toBe(email);
  });  
});
