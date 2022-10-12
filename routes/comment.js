const express = require("express");
const { postCommentToBlog, commentFormGetRequest, redirectToCommentForm, getCommentsForSpecificBlogPost } = require("../controllers/comment");
const commentRoutes = express();

commentRoutes.get("/", redirectToCommentForm);

commentRoutes.get("/create", commentFormGetRequest);
commentRoutes.post("/create", postCommentToBlog);

commentRoutes.get("/:blogId/all-comments", getCommentsForSpecificBlogPost)

module.exports = commentRoutes;