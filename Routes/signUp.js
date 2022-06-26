const Route = require ("express").Router() ;
require("dotenv").config();


Route.get ('/'  , (req,res) =>{

    res.status(200).sendFile (process.env.SING_UP_PAGE) ;

});


module.exports = Route ;