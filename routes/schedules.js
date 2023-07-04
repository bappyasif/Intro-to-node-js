const express = require("express");
const { getAllDeansFreeSlots, getSpecificDeanFreeSlots } = require("../controllers/schedules");
const { checkToken } = require("../middlewares");

const schedulesRoutes = express();

schedulesRoutes.get("/allDean", checkToken, getAllDeansFreeSlots)

schedulesRoutes.get("/dean/:deanId", checkToken, getSpecificDeanFreeSlots)

module.exports = schedulesRoutes