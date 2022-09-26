let express = require("express");
const { joinClubGetReq, joinClubPostReq } = require("../controllers/join-club");
const { registerFormGetReq, registerFormPostReq } = require("../controllers/register");

let routes = express();

routes.get("/register", registerFormGetReq);

routes.post("/register", registerFormPostReq);

routes.get("/join-club", joinClubGetReq)

routes.post("/join-club", joinClubPostReq)

module.exports = routes