const express = require("express");
const authRoutes = require("./authenticate");
const studentRoutes = require("./students");

const routes = express();

routes.get("/", (req, res) => res.status(200).json({msg: "server alive"}))

// routes.use(authRoutes)
routes.use("/auth", authRoutes)

routes.use("/student", studentRoutes)

module.exports = routes