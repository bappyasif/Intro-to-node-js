const express =  require("express");
const { createNewBlogPost, newBlogPostForm, showAllBlogPosts, redirectToBlogPosts } = require("../controllers/blog");
const blogsRoutes = express();

blogsRoutes.get("/", redirectToBlogPosts)
blogsRoutes.get("/all-posts", showAllBlogPosts)

blogsRoutes.get("/create", newBlogPostForm)
blogsRoutes.post("/create", createNewBlogPost)

module.exports = blogsRoutes;