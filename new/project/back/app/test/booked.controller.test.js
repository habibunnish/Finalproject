const { expect } = require("chai");
const sinon = require("sinon");
const supertest = require("supertest");
const db = require("../models");
const Booked = db.booked;
const express = require('express');
const app = express();
const {before}=require("mocha");

describe('Booked API', () => {
  let server;
  let request;

  before(async () => {
    server = await app.listen(8080);
    request = supertest(server);
  });

  after(async () => {
    await server.close();
  });

  beforeEach((done) => {
    sinon.stub(Booked, 'find').resolves([{ title: 'Test Booked' }]);
    done();
  });

  afterEach((done) => {
    Booked.find.restore();
    done();
  });

  describe('POST /booked', () => {
    it('should add new booked data to the database', async () => {
      const response = await request
        .post('/booked')
        .send({
          tittle: 'Test Booked',
          area: 'Test Area',
          image: 'Test Image',
          location: 'Test Location',
          quantity: 1,
          subtotal: 10,
          total: 15,
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('tittle', 'Test Booked');
    });
  });


  describe('GET /booked', () => {
    it('should return an array of booked data', async () => {
      const response = await request.get('/booked');

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body[0]).to.have.property('tittle', 'Test Booked');
    });
  });
});


// const { expect } = require("chai");
// const sinon = require("sinon");
// const mocha = require('mocha');
// const { before, it } = mocha;
// const superTest = require("supertest");
// // const app = require("../../app");
// const db = require("../models");
// const Booked = db.booked;
// const express = require('express');
// const app = express();

// describe('Booked API', () => {
//   let server;
//   let request;

//   before(async () => {
//     server = await app.listen(8080);
//     request = supertest(server);
//   });

//   after(async () => {
//     await server.close();
//   });

//   beforeEach((done) => {
//     sinon.stub(Booked, 'find').resolves([{ title: 'Test Booked' }]);
//     done();
//   });

//   afterEach((done) => {
//     Booked.find.restore();
//     done();
//   });

//   describe('POST /booked', () => {
//     it('should add new booked data to the database', async () => {
//       const response = await request
//         .post('/booked')
//         .send({
//           title: 'Test Booked',
//           area: 'Test Area',
//           image: 'Test Image',
//           location: 'Test Location',
//           quantity: 1,
//           subtotal: 10,
//           total: 15,
//         });

//       expect(response.status).to.equal(200);
//       expect(response.body).to.have.property('title', 'Test Booked');
//     });
//   });


//   describe('GET /booked', () => {
//     it('should return an array of booked data', async () => {
//       const response = await request.get('/booked');

//       expect(response.status).to.equal(200);
//       expect(response.body).to.be.an('array');
//       expect(response.body[0]).to.have.property('title', 'Test Booked');
//     });
//   });
// })


