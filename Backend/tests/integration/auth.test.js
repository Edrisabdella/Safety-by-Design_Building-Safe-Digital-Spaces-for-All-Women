import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../server.js';
import User from '../../models/User.js';
import Token from '../../models/Token.js';

describe('Authentication API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Token.deleteMany({});
  });

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        passwordConfirm: 'password123',
        phone: '+251905131051'
      };

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.status).toBe('success');
      expect(response.body.data.user.email).toBe(userData.email);
      expect(response.body.token).toBeDefined();
    });

    it('should not register user with existing email', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        passwordConfirm: 'password123',
        phone: '+251905131051'
      };

      await User.create(userData);

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(409);

      expect(response.body.status).toBe('fail');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login existing user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        phone: '+251905131051'
      };

      await User.create(userData);

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: userData.email,
          password: userData.password
        })
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.user.email).toBe(userData.email);
      expect(response.body.token).toBeDefined();
    });

    it('should not login with wrong password', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        phone: '+251905131051'
      };

      await User.create(userData);

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: userData.email,
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.status).toBe('fail');
    });
  });
});