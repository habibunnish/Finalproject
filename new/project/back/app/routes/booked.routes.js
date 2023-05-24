const data=require('../../helpers/jwt_hepler');
module.exports=app=>{
    const booked=require("../controllers/booked.controller.js");
    var router=require("express").Router();

    router.post("/",booked.userBookedData)
    router.get("/get",data.verifyAccessToken,booked.getBookedData)
    app.use("/api/booked",router);
}