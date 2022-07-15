let Blog = require('../models/blog');

let blog_index = (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then(result => {
        res.render('blogs/index', {title: 'All Blogs', blogs: result})
    }).catch(err => console.log(err))
}

let blog_details = (req, res) => {
    let blogID = req.params.blogId;
    Blog.findById(blogID)
    .then(blog => {
        res.render('blogs/details', {title: 'Blog details', blog})
    }).catch(err => {
        // console.log(err)
        res.status(404).render('404', {title: 'Blog is not found'})
    })
}

let blog_create_get = (req, res) => {
    res.render('blogs/create', {title: 'Create a new blog'});
}

let blog_create_post = (req, res) => {
    let blog = new Blog(req.body)
    blog.save()
    .then(() => res.redirect('/blogs'))
    .catch(err => console.log(err))
}

let blog_delete = (req, res) => {
    let blogID = req.params.blogId;
    Blog.findByIdAndDelete(blogID)
    .then(() => res.json({redirect: '/blogs'})) // sending back this json response back to browser
    .catch(err => console.log(err))
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_delete,
    blog_create_post
}