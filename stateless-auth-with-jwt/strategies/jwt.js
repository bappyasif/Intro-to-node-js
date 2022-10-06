const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET_KEY'; //normally store this in process.env.secret

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload, "<><>")
    if (jwt_payload.email === "a@b.cd") {
        return done(null, true)
    }
    return done(null, false)
})

module.exports = {opts}