const express = require("express");
const { postCommentToBlog, commentFormGetRequest, redirectToCommentForm, getCommentsForSpecificBlogPost, deleteComment, updateComemnt } = require("../controllers/comment");
const commentRoutes = express();

commentRoutes.get("/", redirectToCommentForm);

commentRoutes.get("/create", commentFormGetRequest);
commentRoutes.post("/create", postCommentToBlog);

commentRoutes.get("/:blogId/all-comments", getCommentsForSpecificBlogPost)

commentRoutes.delete("/:blogId/:commentId", deleteComment)

commentRoutes.put("/:blogId/:commentId", updateComemnt)

module.exports = commentRoutes;