import { should, expect, assert } from 'chai';
import request from 'supertest';
import app from '../../server.mjs'; 

should();

describe('Course Routes', function() {

  
  let token;
  let courseId;

  before(async function() {
    
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'instructor@example.com',
        password: 'password123'
      });

    token = res.body.data.user.token;
  });

  describe('GET /courses', function() {
    it('should get all courses', function(done) {
      request(app)
        .get('/courses')
        .expect(200)
        .expect((res) => {
          res.body.should.be.an('object');
          res.body.status.should.equal('SUCCESS');
        })
        .end(done);
    });
  });

  describe('GET /courses/:id', function() {
    it('should get a single course by id', function(done) {
      request(app)
        .get(`/courses/${courseId}`)
        .expect(200)
        .expect((res) => {
          res.body.should.be.an('object');
          res.body.status.should.equal('SUCCESS');
          res.body.data.course.should.have.property('_id');
        })
        .end(done);
    });
  });

  describe('POST /courses', function() {
    it('should create a new course', function(done) {
      request(app)
        .post('/courses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'New Course',
          description: 'Course Description'
        })
        .expect(201)
        .expect((res) => {
          res.body.should.be.an('object');
          res.body.status.should.equal('SUCCESS');
          res.body.data.course.should.have.property('_id');
          courseId = res.body.data.course._id; 
        })
        .end(done);
    });
  });

  describe('PUT /courses/:id', function() {
    it('should update an existing course', function(done) {
      request(app)
        .put(`/courses/${courseId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Updated Course Title',
          description: 'Updated Course Description'
        })
        .expect(200)
        .expect((res) => {
          res.body.should.be.an('object');
          res.body.status.should.equal('SUCCESS');
          res.body.data.course.title.should.equal('Updated Course Title');
        })
        .end(done);
    });
  });

  describe('DELETE /courses/:id', function() {
    it('should delete an existing course', function(done) {
      request(app)
        .delete(`/courses/${courseId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          res.body.should.be.an('object');
          res.body.status.should.equal('SUCCESS');
        })
        .end(done);
    });
  });
});
