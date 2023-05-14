const chai = require('chai');
const express = require('express');
const app = express();
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);



describe('User API', () => {
  describe('POST /register', () => {
    it('should register a new user and return the saved user details', (done) => {
      const userData = {
        firstname: 'John',
        lastname: 'Doe',
        street: '123 Street',
        city: 'City',
        state: 'State',
        zipcode: '12345',
        email: 'john@example.com',
        password: 'password',
      };

      chai.request(app)
        .post('/register')
        .send(userData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          const savedUser = res.body;
          done();
        });
    });
  });

  describe('GET /userRegisterDetails', () => {
    it('should retrieve all user details', (done) => {
      chai.request(app)
        .get('/userRegisterDetails')
        .end((err, res) => {
          expect(res).to.have.status(200);
          const userDetails = res.body;
          done();
        });
    });
  });

  describe('GET /adminLoginDetailsGet', function () {
    it('should retrieve all admin login details', function (done) {
      this.timeout(10000); // Increase the timeout to 10 seconds
  
      chai.request(server)
        .get('/adminLoginDetailsGet')
        .end((err, res) => {
          expect(res).to.have.status(200);
          const adminDetails = res.body;
          // Add additional assertions to validate the retrieved admin login details if needed
          done();
        });
    });
  });
  
});
