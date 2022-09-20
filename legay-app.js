let express =  require("express");
let path = require("path");
let session = require("express-session");
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let bcrypt = require("bcryptjs")

let mongoDb = 'mongodb+srv://ab:1234@authbasiccluster.ajmdkxv.mongodb.net/auth-lb?retryWrites=true&w=majority';

mongoose.connect(mongoDb, {useUnifiedTopology: true, useNewUrlParser: true});

let db = mongoose.connection;

db.on("error", console.error.bind(console, "mongo db connection error"));

let User = mongoose.model(
    "User",
    new Schema({
        username: {type: String, required: true},
        password: {type: String, required: true}
    })
);

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

// authentication functions
/**
 * This function is what will be called when we use the passport.authenticate()
 * Basically, it takes a username and password, tries to find the user in our DB
 * and then makes sure that the user’s password matches the given password
 * If all of that works out (there’s a user in the DB, and the passwords match) then it authenticates our user and moves on!
 * We will not be calling this function directly, so you won’t have to supply the done function
 * This function acts a bit like a middleware and will be called for us when we ask passport to do the authentication
 */
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({username: username}, (err, user) => {
            if(err) return done(err);

            if(!user) return done(null, false, {message: "Incorrect username"});

            // with using password hashing
            bcrypt.compare(password, user.password, (err, res) => {
                if(err) return done(err)

                if(res) {
                    // password matched
                    return done(null, user)
                } else {
                    // password do not matched
                    return done(null, false, {message: "Incorrect password"})
                }
            });

            // without using password hasing
            // if(user.password !== password) return done(null, false, {message: "Incorrect password"})

            // return done(null, user);
        });
    })
);

/**
 * Functions: Sessions and serialization
 * To make sure our user is logged in, and to allow them to stay logged in as they move around our app
 * passport will use some data to create a cookie which is stored in the user’s browser
 * reason they require us to define these functions is so that we can make sure that whatever bit of data it’s looking for actually exists in our Database!
 * we aren’t going to be calling these functions on our own, they’re used in the background by passport
 */
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
})

// app routes
// app.get("/", (req, res) => res.render("index"));
// all we need to do is check for req.user to change our view depending on whether or not a user is logged in.
app.get("/", (req, res) => res.render("index", {user: req.user}));    

app.get("/sign-up", (req, res) => res.render("sign-up-form"));

// with bcrypt.js password hashing
/**
 * second argument is the length of the “salt” to use in the hashing function
 * salting a password means adding extra random characters to it
 * password plus the the extra random characters are then fed into the hashing function
 * Salting is used to make a password hash output unique, even for users who use the same password, 
 * and to protect against rainbow table and dictionary attacks
 * Usually, the salt gets stored in the database in the clear next to the hashed value
 * but in our case, there is no need to do so because the hashing algorithm that bcryptjs uses includes the salt automatically with the hash
 * hash function is somewhat slow, so all of the DB storage stuff needs to go inside the callback
 */
app.post("/sign-up", (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if(err) return next(err);

        let user = new User({
            username: req.body.username,
            password: hashedPassword
        });
    
        user.save(err => {
            if(err) return next(err);
    
            // succesfull, redirect to home page
            res.redirect("/")
        })
    })
})

// without using password hashing
// app.post("/sign-up", (req, res, next) => {
//     let user = new User({
//         username: req.body.username,
//         password: req.body.password
//     });

//     user.save(err => {
//         if(err) return next(err);

//         // succesfull, redirect to home page
//         res.redirect("/")
//     })
// })

/**
 * As you can see, all we have to do is call passport.authenticate()
 * This middleware performs numerous functions behind the scenes
 * Among other things, it looks at the request body for parameters named username and password 
 * then runs the LocalStrategy function that we defined earlier to see if the username and password are in the database
 * It then creates a session cookie that gets stored in the user’s browser, 
 * and that we can access in all future requests to see whether or not that user is logged in
 * It can also redirect you to different routes based on whether the login is a success or a failure
 * If we had a separate login page we might want to go back to that if the login failed, 
 * or we might want to take the user to their user dashboard if the login is successful
 */
app.post("/log-in", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
}))

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