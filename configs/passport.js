const passport = require("passport");
const Strategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user");

let strategyOptions = {
    // options for google strategy
    
    // consider callback url is same as initial url "/auth/google", 
    // so that data can be send back to client side without have to redirecting url causing cors issue
    // callbackURL: "/auth/google/",
    callbackURL: "/auth/google/redirect",
    clientID: process.env.GOOGLE_PLUS_CLIENT_ID,
    clientSecret: process.env.GOOGLE_PLUS_CLIENT_SECRET
}

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

let strategyCallback = (accessToken, refreshToken, profileData, done) => {
    // callback function
    // console.log("google strategy callback function", accessToken, refreshToken, profileData)
    // lets create a new user and save it into our database, so that user can be verifed if registered before
    let uId = profileData.id;
    let name = profileData.displayName;
    let email = profileData.emails[0].value

    User.findOne({ profileID: uId })
        .then(currentUser => {
            if (currentUser) {
                // found user in db
                console.log("user is : ", currentUser)
                done(null, currentUser)
            } else {
                // its safe to user into our db
                new User({
                    fullName: name,
                    profileID: uId,
                    email: email,
                    password: "test"
                }).save().then(newUser => {
                    console.log("new user is created", newUser)
                    done(null, newUser)
                })
                    .catch(err => done(err))
            }
        })


    // done()
}

let googleStrategy = new Strategy(strategyOptions, strategyCallback);

passport.use(googleStrategy)