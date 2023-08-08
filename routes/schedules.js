const express = require("express");
const { getAllDeansFreeSlots, getSpecificDeanFreeSlots } = require("../controllers/schedules");
const { checkIfTokenValidForStudent } = require("../middlewares");

const schedulesRoutes = express();

schedulesRoutes.get("/allDean", checkIfTokenValidForStudent, getAllDeansFreeSlots)

schedulesRoutes.get("/dean/:deanId", checkIfTokenValidForStudent, getSpecificDeanFreeSlots)

module.exports = schedulesRoutes