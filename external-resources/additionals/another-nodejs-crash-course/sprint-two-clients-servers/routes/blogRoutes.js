let express = require('express');

let blogController = require('../controllers/blogController')

// let Blog = require('../models/blog');

let blogRoutes = express()

// using controller
blogRoutes.get('/', blogController.blog_index)

blogRoutes.post('/', blogController.blog_create_post)

blogRoutes.get('/create', blogController.blog_create_get)

blogRoutes.get('/:blogId', blogController.blog_details)

blogRoutes.delete('/:blogId', blogController.blog_delete)

module.exports = blogRoutes

/**
 * 
 * 
 // blogRoutes.get('/blogs', (req, res) => {
// transfering logic to controller
blogRoutes.get('/', (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then(result => {
        res.render('index', {title: 'All Blogs', blogs: result})
    }).catch(err => console.log(err))
})

// blogRoutes.post('/blogs', (req, res) => {
blogRoutes.post('/', (req, res) => {
    // console.log(req.body)
    let blog = new Blog(req.body)
    blog.save()
    .then(() => res.redirect('/blogs'))
    .catch(err => console.log(err))
})

// we need to puthis route up in here otherwise route wont be able to serve correct response for it, 
// as it would go to next route which is dealing with differenrt sort of requests
// blogRoutes.get('/blogs/create', (req, res) => {
blogRoutes.get('/create', (req, res) => {
    // res.render('create');

    // serving ejs template with dynamic vlaues
    res.render('create', {title: 'Create a new blog'});
})

// blogRoutes.get('/blogs/:blogId', (req, res) => {
blogRoutes.get('/:blogId', (req, res) => {
    // console.log(req.params.blogId)
    let blogID = req.params.blogId;
    Blog.findById(blogID)
    .then(blog => {
        res.render('details', {title: 'Blog details', blog})
    }).catch(err => console.log(err))
})

// blogRoutes.delete('/blogs/:blogId', (req, res) => {
blogRoutes.delete('/:blogId', (req, res) => {
    let blogID = req.params.blogId;
    Blog.findByIdAndDelete(blogID)
    .then(() => res.json({redirect: '/blogs'})) // sending back this json response back to browser
    .catch(err => console.log(err))
})
 */