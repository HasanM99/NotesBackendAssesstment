import request from 'supertest';
import app from '../app.js'; 
import User from '../models/user.js';
import * as chai from 'chai';
import mongoose from 'mongoose'; // Import mongoose

const expect = chai.expect;
import http from 'http';
const server = http.createServer(app);

describe('Authentication Endpoints', () => {
  let testUser;
  before(async () => {
    // Connect to the database
    await mongoose.connect('mongodb://localhost:27017/Notes', { useNewUrlParser: true, useUnifiedTopology: true });

    // Create a test user for testing login
    testUser = new User({ username: 'testuser', password: 'testpassword' });
    try {
      await testUser.save();
      console.log('Test user saved successfully');
    } catch (err) {
      console.error('Error saving test user:', err);
    }
  });
  after(async () => {
    // Cleanup the test user after testing
    try {
      await User.deleteOne({ _id: testUser._id });
      console.log('Test user deleted successfully');
    } catch (err) {
      console.error('Error deleting test user:', err);
    }
    // Close the server
    server.close();
  });

  it('should sign up a new user', async () => {
    const res = await request(server)
      .post('/api/auth/signup')
      .send({ username: 'newuser', password: 'newpassword' });

    expect(res.statusCode).to.equal(201);
    expect(res.body.message).to.equal('User created successfully');
  });

  it('should reject signup with an existing username', async () => {
    const res = await request(server)
      .post('/api/auth/signup')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(res.statusCode).to.equal(400);
    expect(res.body.message).to.equal('Username already exists');
  });

  it('should log in an existing user', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('should reject login with an incorrect password', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'wrongpassword' });

    expect(res.statusCode).to.equal(401);
    expect(res.body.message).to.equal('Invalid username or password');
  });

  it('should reject login with a non-existing username', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'nonexistentuser', password: 'password' });

    expect(res.statusCode).to.equal(401);
    expect(res.body.message).to.equal('Invalid username or password');
  });
});
