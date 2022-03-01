var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb+srv://amansky:amanjot11@cluster0.06niu.mongodb.net/Students?retryWrites=true&w=majority";


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
  console.log(`Database successfully connected`);
  app.listen(3001, console.log("Running on 3001"));
}).catch((e) => {
  console.log(`not connected`);
})


module.exports = app;
