module.exports=app=>{
    const user=require("../controllers/user.controller.js");
    var router=require("express").Router();

    router.post("/",user.register);
    router.get("/",user.userRegisterDetails);
    router.get("/",user.adminLoginDetailsGet);
    

    app.use('/api/user',router);
}