const Route = require("express").Router();


Route.get('/' , (req,res)=>{

    res.sendFile( "" ).status(200);

});