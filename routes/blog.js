const express =  require("express");
const { createNewBlogPost, newBlogPostForm, showAllBlogPosts, redirectToBlogPosts, updateThisBlogPost } = require("../controllers/blog");
const blogsRoutes = express();

blogsRoutes.get("/", redirectToBlogPosts)
blogsRoutes.get("/all-posts", showAllBlogPosts)

blogsRoutes.get("/create", newBlogPostForm)
blogsRoutes.post("/create", createNewBlogPost)

blogsRoutes.put("/update", updateThisBlogPost)

module.exports = blogsRoutes;