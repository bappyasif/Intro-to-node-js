const express = require("express");
const { getAllPosts, getSoloPost, createNewPost, updateSoloPost, deleteSoloPost, updateSoloPostWithUserEngagements, getAllPostsWithPublicPrivacy } = require("../controllers/post");
const postRoutes = express();

postRoutes.get("/", getAllPostsWithPublicPrivacy)
postRoutes.get("/:userId", getAllPosts)
postRoutes.get("/:postId", getSoloPost);
postRoutes.post("/post/create/:userId", createNewPost);
postRoutes.put("/:postId", updateSoloPost);
postRoutes.put("/:postId/:interactingUserId", updateSoloPostWithUserEngagements);
postRoutes.delete(":postId", deleteSoloPost);

module.exports = postRoutes;