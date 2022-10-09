const { body, check, validationResult } = require("express-validator");
const UserSchema = require("../models/user");


let redirectToLoginForm = (req, res) => res.redirect("/user/login");

let loginFormGetRequest = (req, res) => res.send("login form");

let loginFormPostRequest = [
    body("email", "must be a valid email type")
    .trim().isEmail().escape(),
    body("password", "must be more than or equal two characters")
    .trim().isLength({min: 2}).escape(),

    (req, res, next) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(401).json({msg: "errors occured", errors: errors.array()});
            return;
        }
        // console.log(req.body.email, "check1")
        UserSchema.findOne({email: req.body.email})
            .then(user => {
                if(user) {
                    // res.redirect("/");
                    // console.log(req.body.email, "check3")
                    res.send("logged in");
                } else {
                    // console.log(req.body.email, "check2")
                    res.status(401).json({success: false, msg: "user is not found"})
                }
            }).catch(err => next(err))
    }
];

let registerUserGetRequest = (req, res) => res.send("register form");

let registerUserPostRequest = [
    body("name", "must be more than or equal two characters")
    .trim().isLength({min: 2}).escape(),
    body("email", "must be a valid email type")
    .trim().isEmail().escape(),
    body("password", "must be more than or equal two characters")
    .trim().isLength({min: 2}).escape(),
    body("confirm", "must be more than or equal two characters")
    .trim().isLength({min: 2}).escape(),
    check("confirm", "confirm password should match with password")
    .exists().custom((val, {req}) => val === req.body.password),

    (req, res, next) => {
        let errors = validationResult(req);

        let userObj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        if(!errors.isEmpty()) {
            res.status(401).json({data: userObj, errors: errors.array()})
            return;
        }
        
        let newUser = new UserSchema(userObj)

        newUser.save(user => {
            console.log("user saved")
            res.redirect("http://localhost:3001/")
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