//
// so, there is an end-point here that's recives a reqests to check the cond.
const Rout = require('express').Router();
const { MongoClient } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const client = new MongoClient( process.env.URI_CONNECT );


Rout.post ( '/'  , authentication , createToken ,  (req,res)=>{

    const token = res.locals.token ;
 
    res.send( token );
});

async function authentication (req , res , next) {

    // Here we will check the db for the user 
    try {
        // connect stabliched
    await client.connect();

    await client.db(    process.env.DB_NAME  )
                        .collection(  process.env.COLLECTION_NAME )
                        .find ( {  'login.username' : req.body.username  ,  'login.password' : req.body.password  } ).toArray((error,result)=>{
                            res.locals.userDocument = result ;
                            next(); 
                        });
    
    }
    catch ( error ) {
        res.locals.userDocument = null ;
        next(); 
    }   
 
}

async function createToken (req , res , next) {

    if ( res.locals.userDocument == null ) return false;

    const Object = {
            username : res.locals.userDocument[0].login.username ,
            password : res.locals.userDocument[0].login.password
    }
     res.locals.token = jwt.sign(Object , process.env.SECRET_KEY ); 

    next();
}

module.exports = Rout ;