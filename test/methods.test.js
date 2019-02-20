// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

const { checkParameters } = require('../controllers/api/addScore');
const { rateLimiter } = require('../redis/RateLimiter');

chai.config.includeStack = true;
const second = new Date().getSeconds();

// Test missing parameters
describe('Test methods', () => {
  describe('test checkParameters', () => {
    it('', (done) => {
      let req = {};
      let res = {};
      req.params = {};
      req.body = {};
      req.params.playerName = "player";
      req.body.score = 124;

      const ret = checkParameters(res, req);
      ret.should.have.property('name').equal('player');
      ret.should.have.property('score').equal(124);
      done();
    });
  });

  describe('test rateLimiter', (done) => {
    it('rate limiter say ok', (done) => {
      rateLimiter(`alex:${second}`, (ret) => {
        expect(ret).to.equal(true);
        done();
      });
    });

    it('rate limiter say ok', (done) => {
      rateLimiter(`alex:${second}`, (ret) => {
        expect(ret).to.equal(true);
        done();
      });
    });

    it('rate limiter say ok', (done) => {
      rateLimiter(`alex:${second}`, (ret) => {
        expect(ret).to.equal(true);
        done();
      });
    });

    it('rate limiter say ok', (done) => {
      rateLimiter(`alex:${second}`, (ret) => {
        expect(ret).to.equal(true);
        done();
      });
    });

    it('rate limiter say ok', (done) => {
      rateLimiter(`alex:${second}`, (ret) => {
        expect(ret).to.equal(true);
        done();
      });
    });

    it('rate limiter say nop', (done) => {
      rateLimiter(`alex:${second}`, (ret) => {
        expect(ret).to.equal(false);
        done();
      });
    });
  });
});

