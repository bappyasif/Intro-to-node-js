const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/user");

let findOrCreateuser = (profileName, profileId, userData, done) => {
    console.log({[profileName]: profileId}, "what?!")
    User.findOne({ [profileName]: profileId })
        .then(currentUser => {
            if (currentUser) {
                // found user in db
                console.log("user is : ", currentUser)
                done(null, currentUser)
            } else {
                // its safe to user into our db
                new User(userData).save().then(newUser => {
                    console.log("new user is created", newUser)
                    done(null, newUser)
                })
                    .catch(err => done(err))
            }
        })
}

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

// =============================GOOGLE STRATEGY================================ //

let strategyOptions = {
    // options for google strategy

    // consider callback url is same as initial url "/auth/google", 
    // so that data can be send back to client side without have to redirecting url causing cors issue
    // callbackURL: "/auth/google/",
    callbackURL: "/auth/google/redirect",
    clientID: process.env.GOOGLE_PLUS_CLIENT_ID,
    clientSecret: process.env.GOOGLE_PLUS_CLIENT_SECRET
}

let strategyCallback = (accessToken, refreshToken, profileData, done) => {
    // callback function
    // console.log("google strategy callback function", accessToken, refreshToken, profileData)
    // lets create a new user and save it into our database, so that user can be verifed if registered before
    let uId = profileData.id;
    let name = profileData.displayName;
    let email = profileData.emails[0].value

    let userData = {
        fullName: name,
        profileID: uId,
        email: email,
        password: "test"
    }

    findOrCreateuser("profileID", uId, userData, done)
}

let googleStrategy = new GoogleStrategy(strategyOptions, strategyCallback);

// =============================FACEBOOK STRATEGY================================ //
let fbStrategyOptions = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/redirect",
    profileFields: ['id', 'emails', 'name']
}

let fbStrategyCallback = (accessToken, refreshToken, profileData, done) => {
    console.log(profileData, "<fb>")
    let uId = profileData.id;
    let name = profileData.displayName || `${profileData.name.givenName} ${profileData.name.familyName}`;
    let email = profileData?.emails[0]?.value || `f@b.com`

    let userData = {
        fullName: name,
        facebookID: uId,
        email: email,
        password: "test"
    }

    findOrCreateuser("facebookID", uId, userData, done)
}

let fbStrategy = new FacebookStrategy(fbStrategyOptions, fbStrategyCallback);


// ==============STRATEGY USES======================= //
passport.use(fbStrategy);
passport.use(googleStrategy);