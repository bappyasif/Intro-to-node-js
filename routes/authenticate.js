const express = require("express");
const { authenticateStudent, authenticateDean } = require("../controllers/authentications");
const { authValidation, throwErrorWhenValidationHasFailed } = require("../middlewares");
const authRoutes = express();

authRoutes.post("/student", authValidation, throwErrorWhenValidationHasFailed, authenticateStudent)

authRoutes.post("/dean", authValidation, throwErrorWhenValidationHasFailed, authenticateDean)

module.exports = authRoutes