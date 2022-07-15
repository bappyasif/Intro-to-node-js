let express = require('express');

let morgan = require('morgan');

let mongoose = require('mongoose');

// let Blog = require('./models/blog');
let blogRoutes = require('./routes/blogRoutes')

let app = express();

// connecting mangodb with mongoose
let mdbURI = 'mongodb+srv://ab:1234@vf-mongodb.a4lthzh.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(mdbURI)
.then(() => {
    console.log('db connected');

    // we want our server to listen for request only when our databse connection is made not before that
    app.listen(3000, () => console.log('server running on 3000'))
})
.catch(err => console.log(err));


// register ejs view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews'); // when you have a different views folder than default settings

// moving it our db connection scope, so that it gets active ly only when our databse ready and connected
// app.listen(3000, () => console.log('server running on 3000'))

// using middlewares
app.use((req, res, next) => {
    console.log('new request is made')
    console.log('host: ', req.hostname)
    console.log('path: ', req.path)
    console.log('method: ', req.method)
    // without telling server to move on to next, its going to hang on browser
    next()
})

app.use((req, res, next) => {
    console.log('moving into next middleware');
    next()
})

app.use(morgan('dev'))

// middleware & static files
app.use(express.static('public'))

// middleware tio access post request data from browser and parse it for usage
app.use(express.urlencoded({extended: true}))

// mongoose and mongo db sandbox routes
app.get('/add-blog', (req, res) => {
    let blog = new Blog({
        title: 'new blog 02',
        snippet: 'about this new blog',
        body: 'some more info about this blog'
    })

    // save this instance on mongo db
    blog.save()
    .then(result => {
        res.send(result)
    }).catch(err => console.log(err))
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then(result => {
        res.send(result)
    }).catch(err => console.log(err))
})

app.get('/single-blog', (req, res) => {
    Blog.findById('62d172f04de99378c6557f0d')
    .then(result => {
        res.send(result)
    }).catch(err => console.log(err))
})

// get requests
// basic routes
app.get('/', (req, res) => {
    // res.send('<p>home page</p>')
    // serving a page instead
    // res.sendFile('./views/index.html', {root: __dirname})
    // serving ejs template instead
    // res.render('index')

    // serving ejs template with dynamic vlaues
    // res.render('index', {title: 'Home'})

    // demo of accessing dynamic values which is send to index.ejs for rendering
    // let blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    // ]

    // // serving ejs template with dynamic vlaues
    // res.render('index', {title: 'Home', blogs})

    // as we have our database is wired up with this app, we'll now retrieve those from database and render them instead
    // and we are doing that in '/blogs' route, so we'll recirect them
    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>')
    // res.sendFile('./views/about.html', {root: __dirname})
    // serving ejs template instead
    // res.render('about')

    // serving ejs template with dynamic vlaues
    res.render('about', {title: 'About'})
})

// blog routes
// app.use(blogRoutes);
app.use('/blogs', blogRoutes); // making it more modular

// app.get('/blogs', (req, res) => {
//     Blog.find().sort({createdAt: -1})
//     .then(result => {
//         res.render('index', {title: 'All Blogs', blogs: result})
//     }).catch(err => console.log(err))
// })

// app.post('/blogs', (req, res) => {
//     // console.log(req.body)
//     let blog = new Blog(req.body)
//     blog.save()
//     .then(() => res.redirect('/blogs'))
//     .catch(err => console.log(err))
// })

// app.get('/blogs/:blogId', (req, res) => {
//     // console.log(req.params.blogId)
//     let blogID = req.params.blogId;
//     Blog.findById(blogID)
//     .then(blog => {
//         res.render('details', {title: 'Blog details', blog})
//     }).catch(err => console.log(err))
// })

// app.delete('/blogs/:blogId', (req, res) => {
//     let blogID = req.params.blogId;
//     Blog.findByIdAndDelete(blogID)
//     .then(() => res.json({redirect: '/blogs'})) // sending back this json response back to browser
//     .catch(err => console.log(err))
// })

app.get('/blogs/create', (req, res) => {
    // res.render('create');

    // serving ejs template with dynamic vlaues
    res.render('create', {title: 'Create a new blog'});
})

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

// 404 page
app.use((req, res) => {
    // res.statusCode(404).sendFile('./views/404.html', {root: __dirname})

    // serving ejs template instead
    // res.render('404')

    // serving ejs template with dynamic vlaues
    res.render('404', {title: '404'})
})