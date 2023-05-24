const dbConfig=require("dotenv").config();
const mongoose=require("mongoose");
mongoose.Promise=global.Promise;

const db={};
db.mongoose=mongoose;
db.url=dbConfig.url
db.product=require("./product.models.js")(mongoose);
db.main=require("./main.models.js")(mongoose);
db.city=require("./city.models.js")(mongoose);
db.booked=require("./booked.models.js")(mongoose);
db.cart=require("./cart.models.js")(mongoose);

module.exports=db;