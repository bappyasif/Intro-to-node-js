let passport = require("passport");
const User = require("../models/user");
let bcrypt = require("bcryptjs");
let LocalStrategy = require("passport-local").Strategy;

// authentication functions
/**
 * This function is what will be called when we use the passport.authenticate()
 * 
 * Basically, it takes a username and password, tries to find the user in our DB
 * and then makes sure that the user’s password matches the given password
 * 
 * If all of that works out (there’s a user in the DB, and the passwords match) then it authenticates our user and moves on!
 * 
 * We will not be calling this function directly, so you won’t have to supply the done function
 * This function acts a bit like a middleware and will be called for us when we ask passport to do the authentication
 */
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({username: username}, (err, user) => {
            if(err) return done(err);

            if(!user) return done(null, false, {message: "Incorrect Username"})

            bcrypt.compare(password, user.password, (err, res) => {
                if(err) return done(err);

                if(res) {
                    // password matched
                    return done(null, user)
                } else {
                    // password do not match
                    return done(null, false, {message: "Incorrect Password"})
                }
            });
        });
    })
)

/**
 * Functions: Sessions and serialization
 * To make sure our user is logged in, and to allow them to stay logged in as they move around our app
 * passport will use some data to create a cookie which is stored in the user’s browser
 * 
 * reason they require us to define these functions is so that we can make sure that whatever bit of data it’s looking for actually exists in our Database!
 * we aren’t going to be calling these functions on our own, they’re used in the background by passport
 */
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
})

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
let logInPostReq = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
})

module.exports = {logInPostReq}