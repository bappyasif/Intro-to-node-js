const express = require("express");
const authRoutes = require("./authenticate");
const schedulesRoutes = require("./schedules");
const appointmentRoutes = require("./appointments");

const routes = express();

routes.use("/auth", authRoutes)

routes.use("/schedules", schedulesRoutes)

routes.use("/appointments", appointmentRoutes)

module.exports = routes