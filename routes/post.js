const express = require("express");
const { getAllPosts, getSoloPost, createNewPost, updateSoloPost, deleteSoloPost } = require("../controllers/post");
const postRoutes = express();

postRoutes.get("/", getAllPosts)
postRoutes.get("/:postId", getSoloPost);
postRoutes.post("/post/create/:userId", createNewPost);
postRoutes.put("/:postId", updateSoloPost);
postRoutes.delete(":postId", deleteSoloPost);

module.exports = postRoutes;