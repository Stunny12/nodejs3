const express = require('express');
const cors = require('cors');
const { trusted } = require('mongoose');
const app = express();

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];
var corsOptionsDelegate = (req,callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) == -1) {
        corsOptions = { origin:false };
        callback(new Error());
    }
    else {
        corsOptions = { origin:true };
        callback(null, corsOptions);
    }
    console.log(corsOptions);
   
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);