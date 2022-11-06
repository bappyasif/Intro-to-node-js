const passport = require("passport");
const express = require("express");
const { registerUser, loginUser, loginWithOauthProvider, loginOauthProviderCallback, logoutUser } = require("../controllers/auth");

const authRoutes = express();

authRoutes.post("/register", registerUser)
authRoutes.post("/login", loginUser)

// authRoutes.get("/auth/:outlet", loginWithOauthProvider)
// authRoutes.get("/auth/:outlet", passport.authenticate("google", {
//     scope: ["profile", "email"]
// }))
authRoutes.get("/auth/:outlet", passport.authenticate("google", {
    scope: ["profile", "email"]
}), loginOauthProviderCallback)

// authRoutes.get("/auth/:outlet/redirect", loginOauthProviderCallback)
authRoutes.get("/auth/:outlet/redirect", passport.authenticate("google"), loginOauthProviderCallback)

authRoutes.get("/logout", logoutUser)

module.exports = authRoutes