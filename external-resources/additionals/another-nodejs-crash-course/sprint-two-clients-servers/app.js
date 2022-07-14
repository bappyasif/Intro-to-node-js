let express = require('express');

let morgan = require('morgan');

let app = express();

// register ejs view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews'); // when you have a different views folder than default settings

app.listen(3000, () => console.log('server running on 3000'))

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

// get requests
app.get('/', (req, res) => {
    // res.send('<p>home page</p>')
    // serving a page instead
    // res.sendFile('./views/index.html', {root: __dirname})
    // serving ejs template instead
    // res.render('index')

    // serving ejs template with dynamic vlaues
    // res.render('index', {title: 'Home'})

    let blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ]

    // serving ejs template with dynamic vlaues
    res.render('index', {title: 'Home', blogs})
})

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>')
    // res.sendFile('./views/about.html', {root: __dirname})
    // serving ejs template instead
    // res.render('about')

    // serving ejs template with dynamic vlaues
    res.render('about', {title: 'About'})
})

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