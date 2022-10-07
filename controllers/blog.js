let redirectToBlogPosts = (req, res) => res.redirect("/blog/all");

let showAllBlogPosts = (req, res) => res.send("list of blog posts");

let newBlogPostForm = (req, res) => res.send("getting input for a new post");

let createNewBlogPost = (req, res) => res.send("creating a new post")

module.exports = {
    redirectToBlogPosts,
    showAllBlogPosts,
    newBlogPostForm,
    createNewBlogPost
}