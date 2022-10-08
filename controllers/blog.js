const { body } = require("express-validator");
const { DateTime } = require("luxon");
const PostSchema = require("../models/post");

let redirectToBlogPosts = (req, res) => res.redirect("/blog/all-posts");

let showAllBlogPosts = (req, res, next) => {
    PostSchema.find()
        .then(posts => {
            // console.log("serve blogs")
            res.status(200).json({ success: true, posts: posts });
        }).catch(err => next(err))
};

let newBlogPostForm = (req, res) => res.send("getting inputs for a new post");

let createNewBlogPost = [
    body(""),
    (req, res, next) => {
        let newBlog = new PostSchema({
            title: req.body.title,
            body: req.body.body,
            posted: Date.now(),
            published: true
        })

        newBlog.save(post => {
            console.log("new post is saved", post);
            res.send("created a new post")
        })
    }
]

module.exports = {
    redirectToBlogPosts,
    showAllBlogPosts,
    newBlogPostForm,
    createNewBlogPost
}