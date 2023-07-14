const express = require("express");
const noteRouter = express.Router();


noteRouter.post("/",(req,res)=>{
    res.send("note post request");
});

module.exports=noteRouter;