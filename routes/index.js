const express = require("express");
const userRoute = require("./user");
const postRoute = require("./post");
const commentRoute = require("./comment");
const routes = express();

routes.get("/", (req, res) => res.send("hoi hoi!!"));

routes.use("/users", userRoute)
routes.use("/posts", postRoute)
routes.use("/comments", commentRoute);

module.exports = routes;