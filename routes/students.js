const express = require("express");
const { getAllDeansFreeSlots, getSpecificDeanFreeSlots } = require("../controllers/students");

const studentRoutes = express();

studentRoutes.get("/allDean", getAllDeansFreeSlots)

studentRoutes.get("/soloDean", getSpecificDeanFreeSlots)

module.exports = studentRoutes