var path = require('path');
var express = require('express');
var app = express();
const PORT = 8000

// 404 page
app.use(function ( req, res, next) {
    res.send('This page does not exist!')
});

app.listen(PORT, function () {
    console.log('Listening on http://localhost:'+PORT+'/');
});
// database stuff
// Connection URL - you should set this with a configuration 
//   file that doesn't go in GitHub, though
const MONGODB_URI = "mongodb://127.0.0.1:27017";
const mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect(MONGODB_URI, { dbName: "users" })
mongoose.connection.on('error', err => {
  throw new Error(`unable to connect to database: ${MONGOURI}`)
})

await mongoose.connect('mongodb://127.0.0.1/my_database');
const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: process.env.MONGODB_URI ||
              process.env.MONGO_HOST ||
              'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017')+'/mydb/'
  }
  
module.exports = config; // This is the not-ES6 notation
//export default config; // This is the ES6 notation – use this after next section
