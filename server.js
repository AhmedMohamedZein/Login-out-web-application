const express = require('express');
const cors = require("cors");
const loginRoute  = require('./Routes/login/login-interface.js');
const authorization = require('./Routes/login/authorization.js');
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000 ;

app.use(  cors()  );

app.use ( express.static( process.env.FILE_PATH_LOGIN_PAGE ) );
// TO Conver the comming requsts-body to json 
app.use (  express.json() );

// End-points Routs 
    // check the authorization each time a request mades on the server  
    app.use ( authorization );
    // the login end-point
    app.use ('/login' , loginRoute );

// This end-point returns the Login-Page to the user
app.get ( '/' , (req,res)=>{

    res.statusCode(200).sendFile( __dirname + process.env.LOGIN_STATIC_PATH);
    
});

app.listen ( PORT , ()=>{
    console.log(`The server is live on port ${PORT}`);
});