const Route = require("express").Router();
const jwt = require("jsonwebtoken");


// Here, we will verify all the requests
// then we will add the id of the user from the token into res.locals.<data>
// res.locals.<data> will be used inside other function 
function verifyToken ( req , res , next  ) {

    // first check if the request have a token 
    const authorizationHeader = req.headers["authorization"] ;
    // if authorizationHeader is null or Nan or empty or false .... 
    // return that the user of this request is not loggedin 
    if ( !authorizationHeader) {
        // you can add a feature later 
        // to restrict the un-authorized users
        next() ; // this will get the requested end point Either way
    }
    else {
        const tokenBearer = authorizationHeader.split(" ") ;
        // tokenBear =  | Bearer | |<token>|
        const token = tokenBearer[1];
        try {
        const tokenData =   jwt.verify(token ,  process.env.SECRET_KEY );
        res.locals.username = tokenData.username ;
        console.log ( res.locals.username , "An authoriz loged in");
        }catch(error) {
                // what will happen if the token is invalid
                // you can add whatever you want here 
            res.status(403).send( error );
        }
        //  User has been verified, go to the next middleWare 
        next();
    }
}

// exposing this middleware function
module.exports = verifyToken;