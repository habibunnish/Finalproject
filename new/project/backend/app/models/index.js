const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.product = require("../../../back/app/models/product.models.js")(mongoose);
db.user = require("../../../back/app/models/user.models.js")(mongoose);
db.cart = require("../../../back/app/models/cart.models.js")(mongoose);
db.main = require("../../../back/app/models/main.models.js")(mongoose);
db.city = require("../../../back/app/models/city.models.js")(mongoose);
db.admin = require("../../../back/app/models/admin.models.js")(mongoose);
db.booked = require("../../../back/app/models/booked.models.js")(mongoose);

module.exports = db;
