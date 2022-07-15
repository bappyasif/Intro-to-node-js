let express = require('express');
let morgan = require('morgan');
let mongoose = require('mongoose')
// let path = require('path');
let app = express();
// let Blog = require('./models/blog')
let blogRoutes = require('./routes/blogRoutes')

// mongodb connect
let mdbURI = 'mongodb+srv://ab:1234@vf-mongodb.a4lthzh.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mdbURI)
    .then(result => {
        console.log('database connected')
        app.listen(8081, () => console.log('....server running on port 8081....'))
    })
    .catch(err => console.log(err))

// register ejs view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
// using urlencoded middleware for handling post request data from browser
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
// making routes mvc compatible - phase-I
// app.use(blogRoutes)
// making routes mvc compatible - phase-II
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

/**
 * 
 * 
 // mongoose & mongo tests
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })

  blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('5ea99b49b8531f40c0fde689')
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});
 * 
 * 
 // blog routes
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

// handling single blog post
app.get('/blogs/:id', (req, res) => {
    // extracting parameters from url
    let blogID = req.params.id;

    // lets search that blog by id in our database collection
    Blog.findById(blogID)
    .then(result => {
        res.render("details", {blog: result, title: 'details'})
    }).catch(err => console.log(err))

})

app.post('/blogs', (req, res) => {
    // making an instance of Blog so that we can make it db save compatible
    let blog = new Blog(req.body)
    blog.save()
    .then(() => {
        // lets redirect to home page sop that it shows added blog there
        res.redirect('/blogs')
    }).catch(err => console.log(err))
})

// handling a delete request
app.delete('/blogs/:id', (req, res) => {
    let blogID = req.params.id;

    // delete that from database and send back response to browser with a json when succesful
    Blog.findByIdAndDelete(blogID)
    .then(() => {
        res.json({redirect: '/blogs'})
    }).catch(err => console.log(err))
})
 */