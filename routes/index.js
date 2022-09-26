let express = require("express");
const { joinClubGetReq, joinClubPostReq } = require("../controllers/join-club");
const { loginFormGetReq, loginFormPostReq } = require("../controllers/login");
const { registerFormGetReq, registerFormPostReq } = require("../controllers/register");

let routes = express();

routes.get("/register", registerFormGetReq);

routes.post("/register", registerFormPostReq);

routes.get("/join-club", joinClubGetReq);

routes.post("/join-club", joinClubPostReq);

routes.get("/login", loginFormGetReq);

routes.post("/login", loginFormPostReq);

module.exports = routes