const express = require("express");
const { postCommentToBlog, commentFormGetRequest, redirectToCommentForm } = require("../controllers/comment");
const commentRoutes = express();

commentRoutes.get("/", redirectToCommentForm);

commentRoutes.get("/create", commentFormGetRequest);
commentRoutes.post("/create", postCommentToBlog);

module.exports = commentRoutes;