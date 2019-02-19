// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const chai = require('chai');
const server = require('../server');
const chaiHttp = require('chai-http');
const should = chai.should();
const { Player } = require('../models');

chai.config.includeStack = true;
chai.use(chaiHttp);

// Test missing parameters
describe('Test missing parameters', () => {
  describe('/GET rank', () => {
    it ('it should have a 404 error: no user', (done) => {
      chai.request(server)
        .get('/leaderboard/rank/')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it ('it should have a 404 error: user not found', (done) => {
      chai.request(server)
        .get('/leaderboard/rank/nobody')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('/POST score', () => {
    it ('it should have a 500 error: no score', (done) => {
      chai.request(server)
        .post('/leaderboard/add/Alex')
        .send({ })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });

    it ('it should have a 404 error: no user', (done) => {
      chai.request(server)
        .post('/leaderboard/add/')
        .send({ score: 135 })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });


    it ('it should have a 404 error: no user & no score', (done) => {
      chai.request(server)
        .post('/leaderboard/add/')
        .send({ })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

// Check empty database
describe('Test empty database', () => {
  beforeEach((done) => {
    Player.destroy({
      where: {},
      truncate: true
    }).then((err, res) => {
      done();
    });
  });

  describe('/GET top', () => {
    it ('it should GET top 3 empty', (done) => {
      chai.request(server)
        .get('/leaderboard/top')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/GET rank', () => {
    it ('it should get an empty array', (done) => {
      chai.request(server)
        .get('/leaderboard/rank/nobody')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('/POST score', () => {
    it ('it should post a score using the Alex playerName', (done) => {
      chai.request(server)
        .post('/leaderboard/add/Alex')
        .send({ score: 135 })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});

describe('/POST score rate limiter', () => {
  it ('it should post a score using the Alex playerName 1', (done) => {
    chai.request(server)
      .post('/leaderboard/add/Alex')
      .send({ score: 135 })
      .end((err, res) => {
        res.should.have.status(200);
        done();
    });
  });
  it ('it should post a score using the Alex playerName 2', (done) => {
    chai.request(server)
      .post('/leaderboard/add/Alex')
      .send({ score: 135 })
      .end((err, res) => {
        res.should.have.status(200);
        done();
    });
  });
  it ('it should post a score using the Alex playerName 3', (done) => {
    chai.request(server)
      .post('/leaderboard/add/Alex')
      .send({ score: 135 })
      .end((err, res) => {
        res.should.have.status(200);
        done();
    });
  });
  it ('it should post a score using the Alex playerName 4', (done) => {
    chai.request(server)
      .post('/leaderboard/add/Alex')
      .send({ score: 135 })
      .end((err, res) => {
        res.should.have.status(200);
        done();
    });
  });
  it ('it should post a score using the Alex playerName 5', (done) => {
    chai.request(server)
      .post('/leaderboard/add/Alex')
      .send({ score: 135 })
      .end((err, res) => {
        res.should.have.status(500);
        done();
    });
  });
});
