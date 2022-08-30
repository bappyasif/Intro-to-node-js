var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let compression = require("compression");
let helmet = require("helmet");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site
// const db = require('./models/db');

var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
const dev_db_url = 'mongodb+srv://ab:1234@cluster0.vtxykfg.mongodb.net/local_library?retryWrites=true&w=majority';
var mongoDB = process.env.MONGODB_URI || dev_db_url;


mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); // compress all existing routes
app.use(helmet()); // using hemlet to reove any threats
app.use(express.static(path.join(__dirname, 'public')));

// using mongoose
// app.use(db)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/catalog", catalogRouter)

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
  res.render('error');
});

module.exports = app;


/**
 * 
 * 
 Routes primer
 > A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.), a URL path/pattern, and a function that is called to handle that pattern
 > There are several ways to create routes
 > For this tutorial we're going to use the express.Router middleware as it allows us to group the route handlers for a particular part of a site together and access them using a common route-prefix
 > We'll keep all our library-related routes in a "catalog" module, and, if we add routes for handling user accounts or other functions, we can keep them grouped separately
 > using Router is very similar to defining routes directly on the Express application object
 > rest of this section provides an overview of how the Router can be used to define the routes
 */

 /**
  * 
  * 
  * Form design
  * Many of the models in the library are related/dependent—for example, a Book requires an Author, and may also have one or more Genres
  * This raises the question of how we should handle the case where a user wishes to: 
    * Create an object when its related objects do not yet exist (for example, a book where the author object hasn't been defined)
    * Delete an object that is still being used by another object (so for example, deleting a Genre that is still being used by a Book)
  * 
  * For this project we will simplify the implementation by stating that a form can only:
    * Create an object using objects that already exist (so users will have to create any required Author and Genre instances before attempting to create any Book objects)
    * Delete an object if it is not referenced by other objects (so for example, you won't be able to delete a Book until all associated BookInstance objects have been deleted)
  * 
  * A more "robust" implementation might allow you to create the dependent objects when creating a new object, and delete any object at any time (for example, by deleting dependent objects, or by removing references to the deleted object from the database)
  * 
  */

 /**
  * 
  * 
  * Routes
  * In order to implement our form handling code, we will need two routes that have the same URL pattern
  * first (GET) route is used to display a new empty form for creating the object
  * second route (POST) is used for validating data entered by the user, and then saving the information and redirecting to the detail page (if the data is valid) or redisplaying the form with errors (if the data is invalid)
  * We have already created the routes for all our model's create pages in /routes/catalog.js
  */