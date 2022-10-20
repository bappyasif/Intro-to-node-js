const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth");

const authRoutes = express();

authRoutes.post("/register", registerUser)
authRoutes.post("/login", loginUser)

module.exports = authRoutes