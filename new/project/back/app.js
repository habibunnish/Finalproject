const express = require("express");
const createError = require("http-errors");
const cors = require("cors");
require("dotenv").config();
const app = express();
const AuthRoute = require("./Routes/Auth.route");
const morgan = require("morgan");
app.use(morgan("dev"));
require("./helpers/init_mongodb");

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hi welcome");
});


require("./app/routes/product.routes")(app);
require("./app/routes/main.routes")(app);
require("./app/routes/city.routes")(app);
require("./app/routes/cart.routes")(app);
require("./app/routes/booked.routes")(app);



app.use("/auth", AuthRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound("ROUTE NOT FOUND"));
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 808;
app.listen(PORT, () => {
  console.log(`server lisyening on port http://localhost:${PORT}`);
});
