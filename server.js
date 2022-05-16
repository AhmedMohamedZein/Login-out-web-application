const express = require('express');
const cors = require("cors");
const loginRout  = require('./Routes/login/login-interface.js');
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000 ;

app.use(  cors()  );

app.use ( express.static( process.env.FILE_PATH_LOGIN_PAGE ) );
// TO Conver the comming requsts-body to json 
app.use (  express.json() );

// End-points Routs 

app.use ('/login' , loginRout );

// This end-point return the LoginPage to the user
app.get ( '/' , (req,res)=>{

    res.status(200).sendFile( __dirname + process.env.LOGIN_STATIC_PATH);

});


app.listen ( PORT , ()=>{
    console.log(`The server is live on port ${PORT}`);
});