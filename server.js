const express = require('express');
const cors = require("cors");
const loginRoute  = require('./Routes/login/login-interface');
const authorization = require('./Routes/authorization');
const home = require("./Routes/home") ;
const signUP = require ("./Routes/signUp");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000 ;

app.use(  cors()  );

app.use ( express.static( process.env.FILE_PATH_LOGIN_PAGE ) );
app.use ( express.static( process.env.FILE_PATH_HOME_PAGE ) );
app.use ( express.static( process.env.FILE_PATH_SING_UP_PAGE ) );

// TO Conver the comming requsts-body to json 
app.use (  express.json() );

// End-points Routs 
    // check the authorization each time a request mades on the server  
    // statless http
    app.use ( authorization );
    // the login end-point
    app.use ('/login' , loginRoute );
    // home end-point 
    app.use('/home' , home);
    // sign up end-point handler
    app.use('/signup' , signUP) ;
// This end-point returns the Login-Page to the user
app.get ( '/' , (req,res)=>{

    res.status(200).sendFile( __dirname + process.env.LOGIN_STATIC_PATH);
    
});

app.listen ( PORT , ()=>{
    console.log(`The server is live on port ${PORT}`);
});