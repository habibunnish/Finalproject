const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
chai.should();

describe("Admin API", () => {
  describe("POST /adminRegister", () => {
    it("should register a new admin", (done) => {
      const adminData = {
        email: "admin@example.com",
        password: "admin123",
      };

      chai.request(app)
        .post("/adminRegister")
        .send(adminData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
         done();
        });
    });
  });

  describe("GET /adminLoginDetailsGet", () => {
    it("should retrieve all admin login details", (done) => {
      chai.request(app)
        .get("/adminLoginDetailsGet")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
         done();
        });
    });
  });
});
