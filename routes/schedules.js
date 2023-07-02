const express = require("express");
const { getAllDeansFreeSlots, getSpecificDeanFreeSlots } = require("../controllers/schedules");

const schedulesRoutes = express();

schedulesRoutes.get("/allDean", getAllDeansFreeSlots)

schedulesRoutes.get("/dean/:deanId", getSpecificDeanFreeSlots)

module.exports = schedulesRoutes