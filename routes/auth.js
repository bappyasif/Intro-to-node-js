const passport = require("passport");
const express = require("express");
const { registerUser, loginUser, loginWithOauthProvider, loginOauthProviderCallback, logoutUser, returnAuthenticatedUser } = require("../controllers/auth");

const authRoutes = express();

let isAuthenticated = (req, res, next) => {
    if (req.user) {
        console.log("user authenticated!!")
        next()
    } else {
        console.log("authentication error")
        res.status(401).json({success: false, data: [], msg: "not authenticated"})
    }
}

authRoutes.post("/register", registerUser)
authRoutes.post("/login", loginUser)

// authRoutes.get("/auth/:outlet", loginWithOauthProvider)
authRoutes.get("/auth/:outlet", passport.authenticate("google", {
    scope: ["profile", "email"]
}))

authRoutes.get("/auth/:outlet/redirect", passport.authenticate("google", {
    failureMessage: "Login error",
    failureRedirect: "http://localhost:3001/login",
    successRedirect: "http://localhost:3001/login/success"
}))

authRoutes.get("/auth/user", isAuthenticated, returnAuthenticatedUser)

authRoutes.get("/login/success", isAuthenticated, returnAuthenticatedUser)

authRoutes.get("/logout", logoutUser)

module.exports = authRoutes


/**
 * 
 * 
 // authRoutes.get("/auth/:outlet", passport.authenticate("google", {
//     scope: ["profile", "email"]
// }), loginOauthProviderCallback)

// authRoutes.get("/auth/:outlet/redirect", loginOauthProviderCallback)
// authRoutes.get("/auth/:outlet/redirect", passport.authenticate("google"), loginOauthProviderCallback)
// authRoutes.get("/auth/:outlet/redirect", passport.authenticate("google", {
//     // scope: ["profile", "email"],
//     failureMessage: "Login error",
//     failureRedirect: "http://localhost:3001/login",
//     successRedirect: "http://localhost:3001/login/success"
// }), loginOauthProviderCallback)
 * 
 * 
 let isAuthenticated = (req, res, next) => {
    if (req.user) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


        // res.header('Access-Control-Allow-Origin', "http://localhost:3001");
        // res.header("Origin", "http://localhost:3001");
        // res.header('Access-Control-Allow-Origin', "http://localhost:3001")
        // res.header('Access-Control-Allow-Headers', "http://localhost:3001");
        // res.header('Access-Control-Allow-Credentials', true);
        // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        // res.header("HTTP/1.1 200 OK");
        // req.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,POST,DELETE,OPTIONS")
        // req.header("Access-Control-Allow-Headers", "Content-Type")
        next()
    } else {
        console.log("error authentication")
        res.status(401)
    }
}
 */