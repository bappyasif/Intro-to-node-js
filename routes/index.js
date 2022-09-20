let express = require("express");

const { logInPostReq } = require("../controller/log-in");

const { signupFormGetRequest, signupFormPostRequest } = require("../controller/sign-up");

let route = express();

route.get("/sign-up", signupFormGetRequest);

route.post("/sign-up", signupFormPostRequest);

route.post("/log-in", logInPostReq)

module.exports = route