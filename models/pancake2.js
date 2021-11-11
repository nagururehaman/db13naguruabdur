var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pancakeRouter = require('./routes/pancake');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var pancake = require("./models/pancake");


// We can seed the collection if needed on server start async function recreateDB(){
async function recreateDB() {
  // Delete everything 
  await pancake.deleteMany();
  let instance1 = new pancake({ pancake_type: "Choclate Pancake", price: 15, quantity: 5 });
  instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved")
  });
  let instance2 = new pancake({ pancake_type: "Strawberry Pancake", price: 21, quantity: 2 });
  instance2.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second object saved")
  });
  let instance3 = new pancake({ pancake_type: "Blueberry Pancake", price: 16, quantity: 5 });
  instance3.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third object saved")
  });
}


let instance1 = new 
Costume({costume_type:"ghost",  size:'large', 
cost:25.4}); 
  instance1.save( function(err,doc) { 
      if(err) return console.error(err); 
      console.log("First object saved") 
  });
 
let reseed = true; 
if (reseed) { recreateDB();} 