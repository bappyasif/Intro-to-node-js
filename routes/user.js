const express = require("express");
const { getAllUsers, getAnUser, registerUser, loginUser, updateUser, deleteUser } = require("../controllers/user");
const userRoutes = express();

userRoutes.get("/", getAllUsers)
userRoutes.get("/:userId", getAnUser)

userRoutes.post("/register", registerUser)
userRoutes.post("/login", loginUser)

userRoutes.put("/:userId", updateUser)
userRoutes.delete("/:userId", deleteUser)

module.exports = userRoutes;