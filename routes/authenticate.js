const express = require("express");
const { authenticateStudent, authenticateDean, authenticateUser } = require("../controllers/authentications");
const authRoutes = express();

authRoutes.get("/student", authenticateStudent)

authRoutes.get("/dean", authenticateDean)

authRoutes.get("/user", authenticateUser)

module.exports = authRoutes