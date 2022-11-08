const passport = require("passport");
const express = require("express");
const { registerUser, loginUser, logoutUser, returnAuthenticatedUser, loginWithOauthProvider } = require("../controllers/auth");
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
authRoutes.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent"
}))
authRoutes.get("/auth/google/redirect", passport.authenticate("google", {
    failureMessage: "Login error",
    failureRedirect: "http://localhost:3001/login",
    successRedirect: "http://localhost:3001/login/success"
}))

authRoutes.get("/auth/facebook", passport.authenticate("facebook", { scope : ['email']}))
authRoutes.get("/auth/facebook/redirect", passport.authenticate("facebook", {
    failureMessage: "Login error",
    failureRedirect: "http://localhost:3001/login",
    successRedirect: "http://localhost:3001/login/success"
}))

// this route was matching with "google authenticate route" thats what was causing this "cors" fetching issue
// authRoutes.get("/auth/user", isAuthenticated, returnAuthenticatedUser)

authRoutes.get("/login/success", isAuthenticated, returnAuthenticatedUser)

authRoutes.get("/logout", logoutUser)

module.exports = authRoutes