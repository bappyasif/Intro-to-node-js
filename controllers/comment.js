let redirectToCommentForm = (req, res) => res.redirect("/comment/create")

let commentFormGetRequest = (req, res) => res.send("comment form");

let postCommentToBlog = (req, res) => res.send("posting comment");

module.exports = {
    redirectToCommentForm,
    commentFormGetRequest,
    postCommentToBlog
}