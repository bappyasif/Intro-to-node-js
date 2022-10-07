const { body } = require("express-validator");
const UserSchema = require("../models/user");


let redirectToLoginForm = (req, res) => res.redirect("/user/login");

let loginFormGetRequest = (req, res) => res.send("login form");

let loginFormPostRequest = [
    body(""),
    (req, res, next) => {
        UserSchema.findOne({email: req.body.email})
            .then(user => {
                if(user) {
                    // res.redirect("/");
                    res.send("logged in");
                } else {
                    res.json({success: false, msg: "user is not found"})
                }
            }).catch(err => next(err))
    }
];

let registerUserGetRequest = (req, res) => res.send("register form");

let registerUserPostRequest = [
    body(""),
    (req, res, next) => {
        let newUser = new UserSchema({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        newUser.save(user => {
            console.log("user saved")
            res.redirect("/")
        })
    }
];

module.exports = {
    redirectToLoginForm,
    loginFormGetRequest,
    loginFormPostRequest,
    registerUserGetRequest,
    registerUserPostRequest
}