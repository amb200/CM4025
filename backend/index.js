import path from 'path';
import express from 'express';
import userRoutes from './userRoutes.js'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';

var app = express();

import config from './config.js';
const PORT = config.port;
const MONGOURI = config.mongoUri;

await mongoose.connect('mongodb://127.0.0.1/my_database');


// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', userRoutes)

// 404 page
app.use(function ( req, res, next) {
    res.send('This page does not exist!')
});

app.listen(PORT, function () {
    console.log('Listening on http://localhost:'+PORT+'/');
});

