const Route = require("express").Router();
const { MongoClient } = require("mongodb")
const client = new MongoClient( process.env.URI_CONNECT );

Route.get('/' , (req,res)=>{

  // here we will return the res.locals.username info from db 

  const username = res.locals.username ;

  res.status(200).send ( { username } );

});



module.exports = Route ;