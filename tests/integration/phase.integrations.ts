import { expect } from 'chai';
import request from 'supertest';
import app from '../../app/server';

describe('Phases', () => {
  it('should fetch phases successfully', (done) => {
    request(app)
      .get('/api/v1/phase')
      .set('Accept', 'application/json')
      .end((req, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.code).to.be.equal(200);
        expect(res.body.status).to.be.equal('success');
        expect(res.body.message).to.be.equal('Phases fetched successfully');
        expect(res.body).to.have.property('data');
        done();
      });
  });

  describe('Fetch single phase', () => {
    it('should fetch a phase successfully', (done) => {
      request(app)
        .get('/api/v1/phase/1')
        .set('Accept', 'application/json')
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.code).to.be.equal(200);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.message).to.be.equal('Phase fetched successfully');
          expect(res.body).to.have.property('data');
          done();
        });
    });

    it('should throw error for invalid params type', (done) => {
      request(app)
        .get('/api/v1/phase/1a')
        .set('Accept', 'application/json')
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });

    it('should throw error if phase is not found', (done) => {
      request(app)
        .get('/api/v1/phase/100')
        .set('Accept', 'application/json')
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(404);
          expect(res.body.code).to.be.equal(404);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.message).to.be.equal('Phase not found');
          done();
        });
    });
  });

  describe('Create phase', () => {
    it('should create a phase successfully', (done) => {
      request(app)
        .post('/api/v1/phase')
        .set('Accept', 'application/json')
        .send({
          name: 'Shipping',
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(201);
          expect(res.body.code).to.be.equal(201);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.message).to.be.equal('Phase created successfully');
          expect(res.body).to.have.property('data');
          done();
        });
    });

    it('should throw error for missing fields', (done) => {
      request(app)
        .post('/api/v1/phase')
        .set('Accept', 'application/json')
        .send({
          nam: 'Shipping',
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });
  });

  describe('Add task to phase', () => {
    it('should add task to phase successfully', (done) => {
      request(app)
        .post('/api/v1/phase/task')
        .set('Accept', 'application/json')
        .send({
          name: 'Ship the product',
          phaseId: 2
        })
        .end((req, res) => {          
          expect(res.statusCode).to.be.equal(201);
          expect(res.body.code).to.be.equal(201);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.message).to.be.equal('Task added to phase successfully');
          expect(res.body).to.have.property('data');
          done();
        });
    });

    it('should throw error for missing fields', (done) => {
      request(app)
        .post('/api/v1/phase')
        .set('Accept', 'application/json')
        .send({
          name: 'Ship the product',
          phaeId: 2
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });
  });

  describe('Get phase task', () => {
    it('should get a phase task successfully', (done) => {
      request(app)
        .get('/api/v1/phase/task/1/2')
        .set('Accept', 'application/json')
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.code).to.be.equal(200);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.message).to.be.equal('Task fetched successfully');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('taskId');
          expect(res.body.data).to.have.property('taskName');
          expect(res.body.data).to.have.property('isComplete');
          done();
        });
    });

    it('should return error if task is not found', (done) => {
      request(app)
        .get('/api/v1/phase/task/1/200')
        .set('Accept', 'application/json')
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(404);
          expect(res.body.code).to.be.equal(404);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.message).to.be.equal('Task not found');
          done();
        });
    });
  })

  describe('Update task status', () => {
    it('should update a phase task successfully', (done) => {
      request(app)
        .patch('/api/v1/phase/task/2/2')
        .set('Accept', 'application/json')
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.code).to.be.equal(200);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.message).to.be.equal('Task updated successfully');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('taskId');
          expect(res.body.data).to.have.property('taskName');
          expect(res.body.data).to.have.property('isComplete');
          done();
        });
    });
  })
});
