const {expect}=require("chai");
const sinon=require("sinon");
const request=require("supertest");
const db=require("../models");
const Product=db.product;
const express=require("express");
const app=express();
const {before}=require("mocha");

describe('Product API', () => {
    describe('POST /addProductDetails', () => {
      it('should add product details and return the saved product', (done) => {
        const productData = {
          tittle: 'Product Title',
          area: 'Product Area',
          price: 9.99,
          image: 'product-image.jpg',
          location: 'Product Location',
          locations: ['Location 1', 'Location 2'],
          quantity: 10,
          base64String: 'base64-encoded-string',
        };
  
        request(app)
          .post('/addProductDetails')
          .send(productData)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            const savedProduct = res.body;
            expect(savedProduct).to.have.property('_id');
            expect(savedProduct.tittle).to.equal(productData.tittle);
            done();
          });
      });
  
      it('should return an error if product details are invalid', (done) => {
        const invalidProductData = {
          tittle: '',
          area: '',
          price: 9.99,
          image: '',
          location: '',
          locations: '',
          quantity: 10,
          base64String: '',
        };
  
        request(app)
          .post('/addProductDetails')
          .send(invalidProductData)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.have.property('message');
            done();
          });
      });
    });
  
    describe('GET /getProduct', () => {
      it('should retrieve all products', (done) => {
        request(app)
          .get('/getProduct')
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            const products = res.body;
            expect(products).to.be.an('array');
           done();
          });
      });
    });

describe('Product API', () => {
  let productId;
  before((done) => {
    const productData = {
      title: 'Test Product',
      area: 'Test Area',
      price: 9.99,
      image: 'test-image.jpg',
      location: 'Test Location',
      locations: ['Location 1', 'Location 2'],
      quantity: 5,
      base64String: 'test-base64string',
    };

    chai.request(server)
      .post('/addProductDetails')
      .send(productData)
      .end((err, res) => {
        productId = res.body._id;
        done();
      });
  });

  describe('GET /getEdit/:id', () => {
    it('should retrieve product details with the given ID', (done) => {
      request(app)
        .get(`/getEdit/${productId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          const product = res.body;
          console.log(product)
         done();
        });
    });
  });

  describe('PUT /putProduct/:id', () => {
    it('should update product details with the given ID', (done) => {
      const updatedProductData = {
        title: 'Updated Product',
        area: 'Updated Area',
        price: 19.99,
        image: 'updated-image.jpg',
        location: 'Updated Location',
        locations: ['Updated Location 1', 'Updated Location 2'],
        quantity: 10,
        base64String: 'updated-base64string',
      };

      request(app)
        .put(`/putProduct/${productId}`)
        .send(updatedProductData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('product was updated successfully');
          done();
        });
    });
  });

  describe('DELETE /deleteProductChennai/:id', () => {
    it('should delete a product with the given ID', (done) => {
      request(app)
        .delete(`/deleteProductChennai/${productId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('product was deleted successfully');
          done();
        });
    });
  });

  describe('DELETE /deleteProduct/:id', () => {
    it('should delete a product with the given ID', (done) => {
      request(app)
        .delete(`/deleteProduct/${productId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('product was deleted successfully');
          done();
        });
    });
  });
});
  });
  