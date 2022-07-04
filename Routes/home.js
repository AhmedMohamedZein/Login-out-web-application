const Route = require("express").Router();
const { MongoClient } = require("mongodb")
const client = new MongoClient( process.env.URI_CONNECT );
require("dotenv").config();


Route.get('/' , (req,res)=>{

  // here we will return the res.locals.username info from db 
  // Notice that the token of this request in res.locals.token 
  res.status(200).sendFile(process.env.HOME_PAGE_DIR ) ; 

});


module.exports = Route ;