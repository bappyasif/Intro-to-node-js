const express = require("express");
const { getAllUsers, getAnUser, updateUser, deleteUser, acceptUserFriendRequest, rejectUserFriendRequest } = require("../controllers/user");
const userRoutes = express();

userRoutes.get("/", getAllUsers)
userRoutes.get("/:userId", getAnUser)

userRoutes.put("/:userId", updateUser)
userRoutes.delete("/:userId", deleteUser)

userRoutes.put("/:userId/accept", acceptUserFriendRequest)
userRoutes.put("/:userId/reject", rejectUserFriendRequest)

module.exports = userRoutes;