   
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//const connectionString = process.env.MONGO_CON
const connectionString = 'mongodb+srv://narehaman:Ammaji123@cluster0.cdc1e.mongodb.net/learnMongo?retryWrites=true&w=majority'
mongoose = require('mongoose');
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pancakeRouter = require('./routes/pancake');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var pancake = require("./models/pancake");
var resourceRouter = require("./routes/resource");
//var resourceRouter = require('./routes/resource');


// We can seed the collection if needed on server start async function recreateDB(){
async function recreateDB() {
  // Delete everything 
  await pancake.deleteMany();
  let instance1 = new pancake({ pancake_type: "blueberry", price: 90, quantity: 4 });
  instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved")
  });
  let instance2 = new pancake({ pancake_type: "apple", price: 14, quantity: 4 });
  instance2.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second object saved")
  });
  let instance3 = new pancake({ pancake_type: "chocolate", price: 21, quantity: 6 });
  instance3.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third object saved")
  });
}
let reseed = true;
if (reseed) { recreateDB(); }


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pancake', pancakeRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter);
app.use('/pancake', pancake);
app.use('/pancake', pancake);

app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB Connection Error!'));
db.once("open", function () { console.log("Connected to MongoDB Succeeded.") });