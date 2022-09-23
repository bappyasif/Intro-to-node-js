let express =  require("express");
let session = require("express-session");
let passport = require("passport");
let mongoose = require("mongoose");
const route = require("./routes");

require("dotenv").config()
// console.log(process.env.DB_STRING, "<><>")
let mongoDb = process.env.DB_STRING;

mongoose.connect(mongoDb, {useUnifiedTopology: true, useNewUrlParser: true});

let db = mongoose.connection;

db.on("error", console.error.bind(console, "mongo db connection error"));

let app = express();
app.set("views", __dirname+"/views");
app.set("view engine", "ejs");

app.use(session({secret: "cats", resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: true}));

/**
 * A quick tip
 * In express, you can set and access various local variables throughout your entire app (even in views) with the locals object
 * We can use this knowledge to write ourselves a custom middleware that will simplify how we access our current user in our views
 * Middleware functions are simply functions that take the req and res objects, manipulate them, and pass them on through the rest of the app
 * 
 * If you insert this code somewhere between where you instantiate the passport middleware and before you render your views
 * you will have access to the currentUser variable in all of your views, and you won’t have to manually pass it into all of the controllers in which you need it
 */
 app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

// app routes
// app.get("/", (req, res) => res.render("index"));
// all we need to do is check for req.user to change our view depending on whether or not a user is logged in.
app.get("/", (req, res) => res.render("index", {user: req.user}));  

// using route to modularize all routes
app.use(route)

/**
 * passport middleware checks to see if there is a user logged in (by checking the cookies that come in with the req object) 
 * and if there is, it adds that user to the request object for us
 * So, all we need to do is check for req.user to change our view depending on whether or not a user is logged in
 * Conveniently, the passport middleware adds a logout function to the req object, so logging out is as easy as this:
 */
app.get("/log-out", (req, res, next) => {
    req.logOut(err => {
        if(err) return next(err);

        // successfull, redirect to home pagee
        res.redirect("/")
    })
})

/**
 * Securing passwords with bcrypt
 * Now, let’s go back and learn how to securely store user passwords so that if anything ever goes wrong, or if someone gains access to our database, our user passwords will be safe
 * This is insanely important, even for the simplest apps, but luckily it’s also really simple to set up
 * First npm install bcryptjs
 * Once it’s installed you need to require it at the top of your app.js and then we are going to put it to use where we save our passwords to the DB, and where we compare them inside the LocalStrategy
 * 
 * Storing hashed passwords:
 * Password hashes are the result of passing the user’s password through a one-way hash function
 * which maps variable sized inputs to fixed size pseudo-random outputs
 * Edit your app.post("/sign-up") to use the bcrypt.hash function which works like this:
 * 
 * Comparing hashed passwords:
 * We will use the bcrypt.compare() function to validate the password input
 * function compares the plain-text password in the request object to the hashed password
 * Inside your LocalStrategy function we need to replace the user.password !== password expression with the bcrypt.compare() function
 * Unfortunately, users that were saved BEFORE you added bcrypt will no longer work, but that’s a small price to pay for security! 
 * (and a good reason to include bcrypt from the start on your next project)
 */

app.listen(3000, () => console.log("app listening on port 3000!"));