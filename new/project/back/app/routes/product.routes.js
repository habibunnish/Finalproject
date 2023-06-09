const userdata=require('../../helpers/jwt_hepler')
module.exports = (app) => {
  const product = require("../controllers/product.controller.js");
  var router = require("express").Router();
  
  router.post("/post", product.addProductDetails);
  router.get("/get",userdata.verifyAccessToken,product.getProduct);
  router.get("/:id", product.getEdit);
  router.put("/:id", product.putProduct);
  router.delete("/:id", product.deleteProductChennai);
  router.delete("/:id", product.deleteProduct);
  app.use("/api/product", router);
};
