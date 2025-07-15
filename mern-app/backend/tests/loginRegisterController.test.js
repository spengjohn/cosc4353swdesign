import request from 'supertest';
import app from '../index.js';

describe('Login & Register Endpoints', () => {
  it('should login successfully with correct credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@domain.com',
      password: 'Admin123!'
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should reject invalid login', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@domain.com',
      password: 'WrongPass'
    });
    expect(res.statusCode).toEqual(401);
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
  });

  it('should reject short password on register', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'shortpass@example.com',
      password: '123',
      role: 'volunteer'
    });
    expect(res.statusCode).toEqual(400);
  });
});
