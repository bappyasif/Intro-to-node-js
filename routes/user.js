const express = require("express");
const { getAllUsers, getAnUser, updateUser, deleteUser } = require("../controllers/user");
const userRoutes = express();

userRoutes.get("/", getAllUsers)
userRoutes.get("/:userId", getAnUser)

userRoutes.put("/:userId", updateUser)
userRoutes.delete("/:userId", deleteUser)

module.exports = userRoutes;