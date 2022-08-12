var createError = require('http-errors');
var express = require('express');
var path = require('path');
require("dotenv").config()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const apiRouter = require("./routes/api");

const mongoose = require("mongoose");
const url = process.env.MONGOURI;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const connect = mongoose.connection;
connect.then((db) => {
    console.log("Connected correctly to the server");
}, (err) => {
    console.log(err);
});
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'client', 'public'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")))

app.use("/", apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', err);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;