const { body, validationResult } = require("express-validator");
const CommentSchema =  require("../models/comment");

let redirectToCommentForm = (req, res) => res.redirect("/comment/create")

let commentFormGetRequest = (req, res) => res.send("comment form");

let getCommentsForSpecificBlogPost = (req, res) => {
    console.log("begionjs", req.params.blogId)
    CommentSchema.find({blogPost: req.params.blogId})
    .then(result => res.status(200).json({success: true, data: result}))
    .catch(err => {
        console.error(err);
        res.status(402).json({success: false, msg: "no comments are found"})
    })
}

let postCommentToBlog = [
    body("email", "value must be of email type")
    .trim().isEmail().escape(),
    body("name", "filed can not be left empty")
    .trim().isLength({min: 1}).escape(),
    body("body", "filed can not be left empty")
    .trim().isLength({min: 1}).escape(),
    body("blogPost", "filed can not be left empty")
    .trim().isLength({min: 1}).escape(),
    (req, res, next) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(402).json({success: false, errors: errors.array()})
            return
        }
        let newComment = new CommentSchema({
            email: req.body.email,
            name: req.body.name,
            body: req.body.body,
            blogPost: req.body.blogPost,
            posted: new Date().toISOString()
        })

        newComment.save(() => {
            console.log("comment posted")
            res.send("/blog")
        })
    }
];

module.exports = {
    redirectToCommentForm,
    commentFormGetRequest,
    postCommentToBlog,
    getCommentsForSpecificBlogPost
}