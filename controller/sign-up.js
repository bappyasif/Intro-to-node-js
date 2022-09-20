let bcrypt = require("bcryptjs");

let {body, validationResult} = require("express-validator");

let User = require("../models/user");

let signupFormGetRequest = (req, res) => res.render("sign-up-form", {username: null, password: null, errors: null})

// with bcrypt.js password hashing
/**
 * second argument is the length of the “salt” to use in the hashing function
 * salting a password means adding extra random characters to it
 * password plus the the extra random characters are then fed into the hashing function
 * Salting is used to make a password hash output unique, even for users who use the same password, 
 * and to protect against rainbow table and dictionary attacks
 * Usually, the salt gets stored in the database in the clear next to the hashed value
 * but in our case, there is no need to do so because the hashing algorithm that bcryptjs uses includes the salt automatically with the hash
 * hash function is somewhat slow, so all of the DB storage stuff needs to go inside the callback
 */
let signupFormPostRequest = [
    body("username", "Username can not be left empty")
    .trim().isLength({min: 1}).escape(),
    body("password", "Password can not be left empty")
    .trim().isLength({min: 1}).escape(),
    (req, res, next) => {
        let errors = validationResult(req);

        let username = req.body.username;
        let password = req.body.password;

        if(!errors.isEmpty()) {
            res.render("sign-up-form", {
                username: username, 
                password: password, 
                errors: errors.array()
            })
            return
        } else {
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if(err) return next(err);

                let user = new User({
                    username: username,
                    password: hashedPassword
                })
        
                user.save((err, _) => {
                    if(err) return next(err);
        
                    // successfull, now redirecting to home page
                    res.redirect("/")
                })
            })
        }
    }
]

module.exports = {
    signupFormGetRequest,
    signupFormPostRequest
}