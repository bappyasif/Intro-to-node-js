const { body, validationResult } = require("express-validator");
const User = require("../models/user");

const registerUser = [
    body("fullname", "fullname can not be left empty")
    .trim().isLength({min: 1}).escape(),
    body("email", "email can not be left empty")
    .trim().isLength({min: 1}).escape(),
    body("email", "email needs to be of email type")
    .trim().isEmail().escape(),
    body("password", "password can not be left empty")
    .trim().isLength({min: 1}).escape(),
    body("password", "password needs to be more than or equal to 4 characters")
    .trim().isLength({min: 4}).escape(),
    body("confirm", "confirm password needs to be more than or equal to 4 characters")
    .trim().isLength({min: 4}).escape(),
    body("confirm", "password and confirm password needs to be same")
    .exists().custom((val, {req}) => val === req.body.password),

    (req, res, next) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(402).json({success: false, errors: errors.array()})
        }
        
        // data sanitized and validated
        let newUser = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            created: new Date().toISOString()
        })

        // let's check if this same email address is already been used or not
        User.find({email: req.body.email})
            .then((result) => {
                if(result) {
                    // that email id already exists in database, lets response back user with this error message to try some other email address
                    return res.status(403).json({success: false, msg: "email id already exists"})
                }
            }).catch(err => next(err))

        // email id is not found in databse and safe to complete user registration process with this email address
        newUser.save((err, user) => {
            if(err) return next(err);

            // user is saved successfully, returning a response so that authentication token can be passed on to client browser
            res.status(200).json({success: true, user: user})
        })
    }
]

const loginUser = [
    body("email", "email can not be left empty")
    .trim().isLength({min: 1}).escape(),
    body("email", "email needs to be of email type")
    .trim().isEmail().escape(),
    body("password", "password can not be left empty")
    .trim().isLength({min: 1}).escape(),
    body("password", "password needs to be at least 4 characters long")
    .trim().isLength({min: 4}).escape(),

    (req, res, next) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(402).json({success: false, errors: errors.array()})
        }
        
        // lets check if that user actually exists with this given email id
        User.find({email: req.body.email})
            .then(user => {
                if(user) {
                    // user is found with this email address, lets begin boarding user into our website with authentication and whole bits
                    // first let us check if given password matches (to do)
                    
                    // successfully verified and commencing user authentication with json web token
                    res.status(200).json({success: true, user: user})

                    // otherwise goiven password doesn not match so will throwback an error saying that to user

                } else {
                    return res.status(402).json({success: false, msg: "user is not found with this email address"})
                }
            }).catch(err => next(err))
    }
]

module.exports = {
    loginUser,
    registerUser
}