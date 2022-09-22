let passport = require("passport");
const { validatePassword } = require("../utils/password");
let LocalStrategy = require("passport-local").Strategy;
let connection = require("./database");
let User = connection.models.User;

let customFields = {
    usernameField: "uname",
    passwordField: "pw"
}

let verifyCallback = (username, password, done) => {
    User.findOne({username: username})
    .then(user => {
        if(!user) {
            return done(null, false)
        }
        
        // validate password
        let isValid = validatePassword(password, user.hash, user.salt)

        if(isValid) {
            return done(null, user)
        } else{
            return done(null, false)
        }
    }).catch(err => done(err))
}

// let strategy = new LocalStrategy(customFields, verifyCallback)
let strategy = new LocalStrategy(verifyCallback)

passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((userId, done) => {
    User.findById(userId)
    .then(user => done(null, user))
    .catch(err => done(err))
})