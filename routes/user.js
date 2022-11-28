const express = require("express");
const { getAllUsers, getAnUser, updateUser, deleteUser, acceptUserFriendRequest, rejectUserFriendRequest, removeUserFromFriendList } = require("../controllers/user");
const userRoutes = express();

userRoutes.get("/", getAllUsers)
userRoutes.get("/:userId", getAnUser)

userRoutes.put("/:userId", updateUser)
userRoutes.delete("/:userId", deleteUser)

userRoutes.put("/:userId/accept", acceptUserFriendRequest)
userRoutes.put("/:userId/reject", rejectUserFriendRequest)

userRoutes.put("/:userId/remove", removeUserFromFriendList)

module.exports = userRoutes;