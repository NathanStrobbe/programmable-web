var assert = require('assert');
let User = require('../src/users/userModel');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/indexTest.js');
let should = chai.should();

chai.use(chaiHttp);

describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
     chai.request(server)
            .post('/api/user')
            .send({"username":"Marion",
            "password":"marion",
            "email":"marion@marion.fr"})
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
    });
  });
});


describe('User', function() {
  describe('#save()', function() {
    it('should save with error', function(done) {
     chai.request(server)
            .post('/api/user')
            .send({"name":"Marion",
            "password":"marion",
            "email":"marion@marion.fr"})
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
    });
  });
});