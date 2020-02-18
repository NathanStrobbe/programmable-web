var assert = require('assert');
let User = require('../src/users/userModel');
const Category = require('../src/plugins/categoryModel');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/indexTest.js');
let should = chai.should();
let server;

chai.use(chaiHttp);

before(done => {
  server = app.listen(3001, done);
  
});
 
describe('Save User', function() {
  it('should save without error', function(done) {
    chai.request(server)
    .get('/api/user/delete')
    .then( result =>{
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

describe('Connect User', function() {
  it('should save without error', function(done) {
    chai.request(server)
        .post('/api/user/connect')
        .send({"password":"marion",
        "email":"marion@marion.fr"})
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
          done();
    });
  });

  it('should save with error, bad password', function(done) {
    chai.request(server)
        .post('/api/user/connect')
        .send({"password":"marion1",
        "email":"marion@marion.fr"})
        .end((err, res) => {
              res.should.have.status(401);
          done();
    });
  });
});


describe('Save category', function() {
  it('should save without error', function(done) {
     chai.request(server)
    .get('/api/categories/delete')
    .then( result =>{
      chai.request(server)
        .post('/api/categories')
        .send({"name":"guitare"})
        .end((err, res) => {
              res.should.have.status(200);
          done();
      });
    });
  });   
});


describe('Get categories', function() {
  it('should get with error', function(done) {
    chai.request(server)
      .get('/api/categories')
      .end((err, res) => {
            res.should.have.status(200);
            assert(res.body.length == 1);
        done();
    });
  });   
});


after(()=>{
  server.close()
});