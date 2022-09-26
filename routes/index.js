let express = require("express");
const { registerFormGetReq, registerFormPostReq } = require("../controllers/register");

let routes = express();

routes.get("/register", registerFormGetReq);

routes.post("/register", registerFormPostReq);

module.exports = routes