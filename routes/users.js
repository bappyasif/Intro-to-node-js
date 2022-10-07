const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

router.get('/protected', passport.authenticate("jwt", {session: false}), (req, res, next) => {
    // in client side we are going to check and see if there's a token and expires kay va,ue pair is available or not
    //  if not then consider user to be logged out otherwise logged in
    // let expiredAt = localStorage.getItem("expires");
    // if(expiredAt > new Date().now()) {
    //     console.log("logged out")
    // } else {
    //     console.log("logged in")
    // }
    
    // this will run passport verify method using JWT Strategy and retuns us with a valid user after verification
    res.status(200).json({success: true, msg: "you are authorized here!!"})
});

router.post('/login', function(req, res, next){
    User.findOne({username: req.body.username})
        .then(user => {
            if(!user) {
                res.status(401).json({success: false, msg: "could not find user"})
            } 

            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

            if(isValid) {
                const tokenObject = utils.issueJWT(user);

                // save it in localstorage, from client side
                // localStorage.setItem("token", tokenObject.token)
                // localStorage.setItem("expires", tokenObject.expires)

                res.status(200).json({success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires})
            } else {
                res.status(401).json({success: false, msg: "wrong username or password"})
            }
        }).catch(err => next(err))
});

router.post('/register', function(req, res, next){
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        hash,
        salt
    });

    newUser.save(user => {
        // issuing jwt token with our private key, so that out verfication with public key remains valid
        let jwt = utils.issueJWT(user);

        // setting token and expiration in local storage
        // save it in localstorage, from client side
        // localStorage.setItem("token", jwt.token)
        // localStorage.setItem("expires", jwt.expires)

        res.json({success: true, user: user, token: jwt.token, expiresIn: jwt.expires})

    }).catch(err => next(err))
});

router.post("/logout", (req, res, next) =>{
    // remove it from localstorage, from client side
    // localStorage.removeItem("token")
    // localStorage.removeItem("expires")
    res.send("logged out")
})

module.exports = router;