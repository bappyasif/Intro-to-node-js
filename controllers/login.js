// let passport = require("passport");

// let User = require("../model/user");

// let bcrypt = require("bcryptjs");

// let LocalStrategy = require("passport-local").Strategy;

const { body, validationResult } = require("express-validator")

let passport = require("../config/passport");

let loginFormGetReq = (req, res) => res.render("login-form", {title: "Login Form", errors: null})

let loginFormPostReq = [
    body("username", "login address can not be empty")
    .trim().isLength({min: 1}).escape(),
    body("password", "user password can not be empty")
    .trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.render("login-form", {title: "Login Form", errors: null})
            return;
        }
        passport.authenticate("local", {
            successRedirect: "/"
        })
    }
]

module.exports = {
    loginFormGetReq,
    loginFormPostReq
}