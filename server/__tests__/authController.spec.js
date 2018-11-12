const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');

const app = require('../server');

describe('GET /auth', () => {
  it('should return proper msg', done => {
    request(app)
      .get('/auth')
      .expect(200)
      .expect(res => {
        expect(res.body.msg).to.equal('test');
      })
      .end(err => {
        if(err)
          return done(err);
        done();
      })
  });
});
