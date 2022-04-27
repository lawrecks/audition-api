import { expect } from 'chai';
import request from 'supertest';
import app from '../../app/server';

describe('Phases', () => {
  it('should fetch phases successfully', (done) => {
    request(app)
      .get('/api/v1/phases')
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
    it('should fetch phase successfully', (done) => {
      request(app)
        .get('/api/v1/phases/1')
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
        .get('/api/v1/phases/1a')
        .set('Accept', 'application/json')
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });
  });
});
