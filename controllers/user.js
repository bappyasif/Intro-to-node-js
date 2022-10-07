
let redirectToLoginForm = (req, res) => res.redirect("/user/login");

let loginFormGetRequest = (req, res) => res.send("login form");

let loginFormPostRequest = (req, res) => res.send("login verify");

let registerUserGetRequest = (req, res) => res.send("register form");

let registerUserPostRequest = (req, res) => res.send("user registeration");

module.exports = {
    redirectToLoginForm,
    loginFormGetRequest,
    loginFormPostRequest,
    registerUserGetRequest,
    registerUserPostRequest
}