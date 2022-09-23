let router = require("express").Router();
let passport = require("passport");
let passwordUtils = require("../utils/password");
let connection = require("../config/database");
const { isAuth, isAdmin } = require("./authMIddleware");
let User = connection.models.User;

/**
 * -------------- POST ROUTES ----------------
 */

// TODO
router.post("/login", passport.authenticate("local", {failureRedirect:"/login-failure", successRedirect: "/login-success"}))

// TODO
router.post("/register", (req, res, next) => {
    // let saltHash = passwordUtils.genPassword(req.body.pw);
    let saltHash = passwordUtils.genPassword(req.body.password);

    let salt = saltHash.salt;
    let hash = saltHash.hash;

    let newUser = new User({
        // username: req.body.uname,
        username: req.body.username,
        salt,
        hash,
        // adding a new property for schema
        admin: true
    })

    newUser.save()
    .then(user => console.log(user))
    .catch(err => next(err))

    res.redirect("/login")
})

 /**
 * -------------- GET ROUTES ----------------
 */
router.get("/", (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>')
})

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get("/login", (req, res, next) => {
    let form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get("/register", (req, res, next) => {
    let form = '<h1>Register Page</h1><form method="post" action="register">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
});

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 * 
 * Also, look up what behaviour express session has without a maxage set
 */
// router.get("/protected-route", (req, res, next) => {
//     // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
//     if(req.isAuthenticated()) {
//         res.send('<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>');
//     } else {
//         res.send('<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>');
//     }
// });
router.get("/protected-route", isAuth, (req, res, next) => {
    // will be using our custom iAuth middleware for this check
    res.send("you made it to Protected route!!")
});

router.get("/admin-route", isAuth, isAdmin, (req, res, next) => {
    // will be using our custom iAuth middleware for this check
    res.send("you made it to Admin route!!")
});

// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
    req.logOut();
    res.redirect("/protected-route");
});

router.get("/login-success", (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get("/login-failure", (req, res, next) => {
    res.send('You have entered the wrong password.')
})

module.exports = router;