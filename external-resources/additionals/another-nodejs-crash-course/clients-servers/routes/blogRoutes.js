let express = require('express');
let blogController = require('../controllers/blogController')
let blogRoutes = express();

// handling blog create get request route
blogRoutes.get('/create', blogController.blog_create_get);

// handling blog index route
blogRoutes.get('/', blogController.blog_index);

// handling single blog post
blogRoutes.get('/:id', blogController.blog_details)

// handling blog post request
blogRoutes.post('/', blogController.blog_create_post)

// handling a delete request
blogRoutes.delete('/:id', blogController.blog_delete)

module.exports = blogRoutes;

/**
 * 
 * 
 // Phase-I
 // handling blog create get request route
blogRoutes.get('/blogs/create', blogController.blog_create_get);

// handling blog index route
blogRoutes.get('/blogs', blogController.blog_index);

// handling single blog post
blogRoutes.get('/blogs/:id', blogController.blog_details)

// handling blog post request
blogRoutes.post('/blogs', blogController.blog_create_post)

// handling a delete request
blogRoutes.delete('/blogs/:id', blogController.blog_delete)
 * 
 * 
 // phase - 0
 blogRoutes.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});
 
blogRoutes.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});
 
// handling single blog post
blogRoutes.get('/blogs/:id', (req, res) => {
    // extracting parameters from url
    let blogID = req.params.id;
 
    // lets search that blog by id in our database collection
    Blog.findById(blogID)
    .then(result => {
        res.render("details", {blog: result, title: 'details'})
    }).catch(err => console.log(err))
 
})
 
blogRoutes.post('/blogs', (req, res) => {
    // making an instance of Blog so that we can make it db save compatible
    let blog = new Blog(req.body)
    blog.save()
    .then(() => {
        // lets redirect to home page sop that it shows added blog there
        res.redirect('/blogs')
    }).catch(err => console.log(err))
})
 
// handling a delete request
blogRoutes.delete('/blogs/:id', (req, res) => {
    let blogID = req.params.id;
 
    // delete that from database and send back response to browser with a json when succesful
    Blog.findByIdAndDelete(blogID)
    .then(() => {
        res.json({redirect: '/blogs'})
    }).catch(err => console.log(err))
})
 */