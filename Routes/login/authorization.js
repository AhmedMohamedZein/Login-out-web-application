const Route = require("express").Router();
const jwt = require("jsonwebtoken");


// Here, we will verify all the requests  

function verifyToken ( req , res , next  ) {

    // first check if the request have a token 
    const authenticationHeader = req.headers["authorization"] ;
    // if authenticationHeader is null or Nan or empty or false .... 
    // return that the user of this request is not loggedin 
    if ( !authenticationHeader) {
        console.log ( "Please login first !" );
        next();
    }
    else {
        const tokenBear = authenticationHeader.split(" ") ;
        const token = tokenBear[1];
        try {
        const tokenData =   jwt.verify(token ,  process.env.SECRET_KEY );
        res.locals.username = tokenData.username ;
        console.log ( res.locals.username );
        }catch(error) {
            res.status(403).send( error );
        }
        next();
    }
}


module.exports = verifyToken;