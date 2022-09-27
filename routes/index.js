let express = require("express");
const { joinClubGetReq, joinClubPostReq } = require("../controllers/join-club");
const { loginFormGetReq, loginFormPostReq } = require("../controllers/login");
const { messageBoardGetReq, logOutGetReq, messageBoardCreateNewGetReq, messageBoardCreateNewPostReq } = require("../controllers/message-board");
const { registerFormGetReq, registerFormPostReq } = require("../controllers/register");
const { isAuth, isMember } = require("./authChecks");

let routes = express();

routes.get("/register", registerFormGetReq);

routes.post("/register", registerFormPostReq);

routes.get("/join-club", joinClubGetReq);

routes.post("/join-club", joinClubPostReq);

routes.get("/login", loginFormGetReq);

routes.post("/login", loginFormPostReq);

routes.get("/message-board", isAuth, messageBoardGetReq)

// routes.get("/message-board", isMember, messageBoardGetReqForCreatingNewMessage)

routes.get("/message-board/create-new", messageBoardCreateNewGetReq)

routes.post("/message-board/create-new", isAuth, messageBoardCreateNewPostReq)

routes.get("/logout", logOutGetReq)

module.exports = routes