const passport = require("passport");
const Strategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user");

let strategyOptions = {
    // options for google strategy
    callbackURL: "/auth/google/redirect",
    clientID: process.env.GOOGLE_PLUS_CLIENT_ID,
    clientSecret: process.env.GOOGLE_PLUS_CLIENT_SECRET
}

let strategyCallback = (accessToken, refreshToken, profileData, done) => {
    // callback function
    console.log("google strategy callback function", accessToken, refreshToken, profileData)
    // lets create a new user and save it into our database, so that user can be verifed if registered before
    let uId = profileData.id;
    let name = profileData.displayName;
    let email = profileData.emails[0].value

    User.findOne({ profileID: uId })
        .then(currentUser => {
            if (currentUser) {
                // found user in db
                console.log("user is : ", currentUser)
            } else {
                // its safe to user into our db
                new User({
                    fullName: name,
                    profileID: uId,
                    email: email,
                    password: "test"
                }).save().then(newUser => console.log("new user is created", newUser))
                    .catch(err => done(err))
            }
        })


    // done()
}

let googleStrategy = new Strategy(strategyOptions, strategyCallback);

passport.use(googleStrategy)