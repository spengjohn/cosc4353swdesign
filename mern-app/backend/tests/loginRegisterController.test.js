import request from 'supertest';
import app from '../index.js';

describe('Login & Register Endpoints', () => {

  it('should login successfully with correct credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@gmail.com',
      password: 'Admin123!'
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should reject invalid login', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@gmail.com',
      password: 'WrongPass'
    });
    expect(res.statusCode).toEqual(401);
  });

  it('should reject login with missing email', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: '',
      password: 'Pass1234'
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toMatch(/Invalid email format/i);
  });

  it('should reject login with invalid email format', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'invalidemailformat',
      password: 'Pass1234'
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toMatch(/Invalid email format/i);
  });

  it('should reject login with missing password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@gmail.com',
      password: ''
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toMatch(/Password must be at least 6 characters/i);
  });

  it('should register a new user successfully', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'newuser@example.com',
      password: 'Pass1234',
      role: 'volunteer'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.user.email).toEqual('newuser@example.com');
  });

  it('should reject duplicate email registration', async () => {
    await request(app).post('/api/auth/register').send({
      email: 'dup@example.com',
      password: 'Pass1234',
      role: 'admin'
    });

    const res = await request(app).post('/api/auth/register').send({
      email: 'dup@example.com',
      password: 'Pass1234',
      role: 'admin'
    });

    expect(res.statusCode).toEqual(409);
    expect(res.body.message).toMatch(/Email already registered/i);
  });

  it('should reject duplicate email registration with different role', async () => {
    await request(app).post('/api/auth/register').send({
      email: 'duplicate@example.com',
      password: 'Pass1234',
      role: 'volunteer'
    });

    const res = await request(app).post('/api/auth/register').send({
      email: 'duplicate@example.com',
      password: 'Pass1234',
      role: 'admin'  // different role, same email
    });

    expect(res.statusCode).toEqual(409);
    expect(res.body.message).toMatch(/Email already registered/i);
  });

  it('should reject short password on register', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'shortpass@example.com',
      password: '123',
      role: 'volunteer'
    });
    expect(res.statusCode).toEqual(400);
  });

  it('should reject register with invalid email format', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'invalidemail',
      password: 'Pass1234',
      role: 'volunteer'
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toMatch(/Invalid email format/i);
  });

  it('should reject register with missing role', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'norole@example.com',
      password: 'Pass1234',
      role: ''
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toMatch(/Role must be admin or volunteer/i);
  });

  it('should reject register with invalid role', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'user@example.com',
      password: 'Pass1234',
      role: 'guest'
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toMatch(/Role must be admin or volunteer/i);
  });

  it('should handle server error during registration', async () => {
    const res = await request(app).post('/api/auth/register').send({
      forceError: true  // <-- triggers forced error in your controller
    });

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toMatch(/Internal Server Error/i);
  });

});
