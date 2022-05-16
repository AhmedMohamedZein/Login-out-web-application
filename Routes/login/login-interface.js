
//

// so, there is an end-point here that's recives a reqests to check the cond.

const Rout = require('express').Router();
const mongodb = require('mongodb');


Rout.post ( '/'  , authentication , createToken , (req,res)=>{

    



});

async function authentication (req , res , next) {




}

async function createToken (req , res , next) {




}

module.exports = Rout ;