import { should, expect, assert } from 'chai';
import request from 'supertest';
import app from '../../server.mjs';

describe('Auth Routes', function() {

  describe('POST /api/auth/register', function() {
    it('should register a new user', function(done) {
      request(app)
        .post('/api/auth/register')
        .send({
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          confirmPassword: 'password123',
          role: 'STUDENT'
        })
        .expect(201)
        .expect((res) => {
          res.body.status.should.equal('SUCCESS');
          res.body.data.user.should.have.property('token');
        })
        .end(done);
    });
  });

  describe('POST /api/auth/login', function() {
    it('should log in an existing user', function(done) {
      request(app)
        .post('/api/auth/login')
        .send({
          email: 'john.doe@example.com',
          password: 'password123'
        })
        .expect(200)
        .expect((res) => {
          res.body.status.should.equal('SUCCESS');
          res.body.data.user.should.have.property('token');
        })
        .end(done);
    });
  });

  describe('GET /api/auth/logout', function() {
    it('should log out a user', function(done) {
      request(app)
        .get('/auth/logout') 
        .expect('Location', '/') 
        .end(done);
    });
  });
});
