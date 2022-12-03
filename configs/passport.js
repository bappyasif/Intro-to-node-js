const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const TwitterStrategy =  require("passport-twitter").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt =  require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const path = require("path");
const fs = require("fs");
const User = require("../models/user");

let findOrCreateuser = (profileName, profileId, userData, done) => {
    // console.log({[profileName]: profileId}, "what?!")
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
    let profilePicture = profileData.photos[0]?.value
    console.log(profileData, "profileData!!")

    let userData = {
        fullName: name,
        profileID: uId,
        email: email,
        password: "test",
        ppUrl: profilePicture,
        created: new Date().toISOString()
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
    // console.log(profileData, "<fb>")
    let uId = profileData.id;
    let name = profileData.displayName || `${profileData.name.givenName} ${profileData.name.familyName}`;
    let email = profileData.emails[0].value || `f@b.com`;
    let profilePicture = profileData.photos ? profileData.photos[0]?.value : null;
    console.log(profileData, "profileData!!")

    let userData = {
        fullName: name,
        facebookID: uId,
        email: email,
        password: "test",
        ppUrl: profilePicture,
        created: new Date().toISOString()
    }

    findOrCreateuser("facebookID", uId, userData, done)
}

let fbStrategy = new FacebookStrategy(fbStrategyOptions, fbStrategyCallback);


// =============================GITHUB STRATEGY================================ //
let githubStrategyOptions = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/redirect",
    // profileFields: ['id', 'emails', 'name']
}

let githubStrategyCallback = (accessToken, refreshToken, profileData, done) => {
    // console.log(profileData, "<github>")
    let uId = profileData.id;
    let name = profileData.displayName || `${profileData.name.givenName} ${profileData.name.familyName}`;
    let email = profileData?.emails?.emails[0]?.value
    let profilePicture = profileData.photos[0]?.value
    console.log(profileData, "profileData!!")

    let userData = {
        fullName: name,
        githubID: uId,
        email: email,
        password: "test",
        ppUrl: profilePicture,
        created: new Date().toISOString()
    }

    findOrCreateuser("githubID", uId, userData, done)
}

let githubStrategy = new GitHubStrategy(githubStrategyOptions, githubStrategyCallback)

// =============================TWITTER STRATEGY================================ //
let twitterStrategyOptions = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    // consumerKey: process.env.TWITTER_CLIENT_ID,
    // consumerSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/redirect",
    // profileFields: ['id', 'emails', 'name']
}

let twitterStrategyCallback = (accessToken, refreshToken, profileData, done) => {
    // console.log(profileData, "<twitter>")
    let uId = profileData.id;
    let name = profileData.displayName || `${profileData.name.givenName} ${profileData.name.familyName}`;
    let email = profileData?.emails?.emails[0]?.value
    let profilePicture = profileData.photos[0]?.value
    console.log(profileData, "profileData!!")

    let userData = {
        fullName: name,
        twitterID: uId,
        email: email,
        password: "test",
        ppUrl: profilePicture,
        created: new Date().toISOString()
    }

    findOrCreateuser("twitterID", uId, userData, done)
}

let twitterStrategy = new TwitterStrategy(twitterStrategyOptions, twitterStrategyCallback)

// =============================JWT STRATEGY================================ //
const pathToJwtPairedPublicKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const JWT_PAIRED_PUBLIC_KEY = fs.readFileSync(pathToJwtPairedPublicKey, "utf-8");

const jwtStrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_PAIRED_PUBLIC_KEY,
    algorithms: ["RS256"]
}

const jwtStrategyCallback = (payload, done) => {
    User.findOne({_id: payload.sub})
        .then(user => {
            if(user) {
                done(null, user)
            } else {
                done(null, false)
            }
        }).catch(err => done(err, false))
}

const jwtStrategy = new JwtStrategy(jwtStrategyOptions, jwtStrategyCallback);

// ==============STRATEGY USES======================= //
passport.use(jwtStrategy);
passport.use(twitterStrategy);
passport.use(githubStrategy);
passport.use(fbStrategy);
passport.use(googleStrategy);