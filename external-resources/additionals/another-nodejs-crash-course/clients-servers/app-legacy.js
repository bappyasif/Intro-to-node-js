let express = require('express');
let morgan = require('morgan');
let mongoose = require('mongoose')
let path = require('path');
let app = express();
let Blog = require('./models/blog')

// mongodb connect
let mdbURI = 'mongodb+srv://ab:1234@vf-mongodb.a4lthzh.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mdbURI)
.then(result => {
    console.log('database connected')
    app.listen(8081, ()=>console.log('....server running on port 8081....'))
})
.catch(err => console.log(err))

// register ejs view engine
app.set('view engine', 'ejs')
// app.set('views', 'chganged-views') // nthis is useful when views path has been changed  than it was previously

// listen for amy requests
// as we now have a database connected in this app, we shall start listening to it once we're connected to that 
// app.listen(8081, ()=>console.log('....server running on port 8080....'))

// using a logger middleware
app.use((req, res, next) => {
    console.log('new request is made')
    console.log('host: ', req.hostname)
    console.log('path: ', req.path)
    console.log('method: ', req.method)
    // without telling server to move on to next, its going to hang on browser
    next()
})

// adding another supplimental middleware
app.use((req, res, next) => {
    console.log('into next available middleware....')
    next()
})

// adding a third-party middleware
app.use(morgan('dev'));

// using static files midleware
// app.use(express.static('./external-resources/additionals/another-nodejs-crash-course/clients-servers/public'))
app.use(express.static(path.join(__dirname, 'public')))

// using urlencoded middleware for handling post request data from browser
app.use(express.urlencoded({extended: true}))

// mongoose & mongodb sandbox routes
app.get('/add-blog', (req, res) => {
    // instantiating blog
    let blog = new Blog({
        title: 'some blog02',
        snippet: 'some words about blog',
        body: 'smoe more wrods about this blog'
    })

    // saving to blog collection
    blog.save()
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

// reading all blogs from mongodb atlas
// sandbox mode
app.get('/all-blogs', (req, res) => {
    // when we are finding any record or records, we have to use it on Model(i.e. Blog)
    Blog.find()
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

// reading a solo record from mongodb records
app.get('/single-blog', (req, res) => {
    Blog.findById('62cf099a83e645efee729a04')
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

// routes

// get request
app.get('/', (req, res) => {
    // res.send('<h1>starting to use express!!</h1>')
    // res.sendFile('./views/index.html', {root: __dirname})
    // res.render('index')
    // we can pass in any variables to our ejs view from our render method
   
    // let blogs = [
    //     {title: 'some article', snippet: 'some snippet about this'},
    //     {title: 'another article', snippet: 'some snippet about this'}
    // ]
    // // res.render('index', {title: 'Home'})
    // res.render('index', {title: 'Home', blogs})

    // now redirect this to new home page route
    res.redirect('/blogs');
})

// making a new route for home page
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then(result => res.render('index', {title: 'All Blogs', blogs: result}))
    .catch(err => console.log(err))
})

// handling a POST request
app.post('/blogs', (req, res) => {
    // console.log(req.body)

    // making an instance of Blog so tha we can make it db save compatible
    let blog = new Blog(req.body)
    blog.save()
    .then(result => {
        // lets redirect to home page sop that it shows added blog there
        res.redirect('/blogs')
    }).catch(err => console.log(err))
})

// handling single blog post
app.get('/blogs/:id', (req, res) => {
    // extracting parameters from url
    let blogID = req.params.id;
    // console.log(blogID)

    // lets search that blog by id in our database collection
    Blog.findById(blogID)
    .then(result => {
        // render a details page showing this blog specifically
        // res.render('details', {blog: result, title: 'Blog details'})
        res.render("details", {blog: result, title: 'details'})
    }).catch(err => console.log(err))

})


// handling a delete request
app.delete('/blogs/:id', (req, res) => {
    let blogID = req.params.id;

    // delete that from database and send back response to browser with a json when succesful
    Blog.findByIdAndDelete(blogID)
    .then(result => {
        res.json({redirect: '/blogs'})
    }).catch(err => console.log(err))
})

app.get('/about', (req, res) => {
    // res.send('<h1>about us using express!!</h1>')
    // res.sendFile('./views/about.html', {root: __dirname})
    res.render('about', {title: 'About'})
})

// app.get('/blogs/create', (req, res) => res.render('create', {title: 'Create a new blog'}))
app.get('/blogs/create', (req, res) => res.render('create'))
// app.get('/blogs/create', (req, res) => {
//     // res.render('create');

//     // serving ejs template with dynamic vlaues
//     res.render('create', {title: 'Create a new blog'});
// })


// redirect route
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

// 404 response
// this is more like a catch all route, if nothing matches from defined ruotes then this wil get run
// app.use((req, res) => res.sendFile('./views/404.html', {root: __dirname}))
// we also need to define status code, express cant tell that its a 404 response
// app.use((req, res) => res.status(404).sendFile('./views/404.html', {root: __dirname}))
app.use((req, res) => res.status(404).render('404', {title: '404'}))