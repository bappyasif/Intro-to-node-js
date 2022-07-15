let Blog = require('../models/blog');

let blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('blogs/index', { blogs: result, title: 'All blogs' });
        })
        .catch(err => {
            console.log(err);
        });
}

let blog_details = (req, res) => {
    let blogID = req.params.id;

    // lets search that blog by id in our database collection
    Blog.findById(blogID)
        .then(result => {
            res.render("blogs/details", { blog: result, title: 'details' })
        }).catch(err => {
            // console.log(err)
            res.status(404).render('404', {title: 'Blog is not found'})
        })
}

let blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a new blog' });
}

let blog_create_post = (req, res) => {
    let blog = new Blog(req.body)
    blog.save()
        .then(() => {
            // lets redirect to home page sop that it shows added blog there
            res.redirect('/blogs')
        }).catch(err => console.log(err))
}

let blog_delete = (req, res) => {
    let blogID = req.params.id;

    // delete that from database and send back response to browser with a json when succesful
    Blog.findByIdAndDelete(blogID)
        .then(() => {
            res.json({ redirect: '/blogs' })
        }).catch(err => console.log(err))
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}