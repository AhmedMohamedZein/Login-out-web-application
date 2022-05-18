const Rout = require('express').Router();
const { MongoClient } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const client = new MongoClient( process.env.URI_CONNECT );


Rout.post ( '/'  , authentication , createToken ,  (req,res)=>{

    if ( res.locals.authenticated == false){
        
         
        res.send (  "The username, password is wrong  or there is a bad connection to DB!!"  );
    }
    else {
    const token = res.locals.token ;
    res.send( token );
    }
});

async function authentication (req , res , next) {

    // Here we will check the db for the user 
    try {
        // connect stabliched
    await client.connect();

    await client.db(    process.env.DB_NAME  )
                        .collection(  process.env.COLLECTION_NAME )
                        .find ( {  'login.username' : req.body.username  ,  'login.password' : req.body.password  } ).toArray((error,result)=>{
                            // this condition will catch both undendify and null
                            if ( result.length === 0) {
                                res.locals.authenticated =  false ;
                                client.close();
                                next();
                            }
                            else {
                             // Array "list"
                                res.locals.authenticated = result ;
                                client.close();
                                next();
                            } 
                        });
    
    }
    catch ( error ) {
        res.locals.authenticated = false ;
        next(); 
    }   
 
}

    // this function exist to create a token IF the authentication == true 
function createToken (req , res , next) {

        // Database didn't find the user data 
    if ( res.locals.authenticated == false ) {
        next();
    }
    else {
            // the "res.locals.authenticated" is a array beacuse the result of the authentication function is an array
        const Object = {
            username : res.locals.authenticated[0].login.username ,
            password : res.locals.authenticated[0].login.password
        }
        res.locals.token = jwt.sign(Object , process.env.SECRET_KEY ); 
        next();        
    } 
}

module.exports = Rout ;