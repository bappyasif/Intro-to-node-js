const { body } = require("express-validator");
const CommentSchema =  require("../models/comment");

let redirectToCommentForm = (req, res) => res.redirect("/comment/create")

let commentFormGetRequest = (req, res) => res.send("comment form");

let postCommentToBlog = [
    body(""),
    (req, res, next) => {
        let newComment = new CommentSchema({
            email: req.body.email,
            name: req.body.name,
            body: req.body.body,
            posted: Date.now()
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
    postCommentToBlog
}