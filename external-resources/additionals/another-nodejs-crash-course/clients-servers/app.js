let express = require('express');

let app = express()

// register ejs view engine
app.set('view engine', 'ejs')
// app.set('views', 'chganged-views') // nthis is useful when views path has been changed  than it was previously

// listen for amy requests
app.listen(8080, ()=>console.log('....server running on port 8080....'))

// get request
app.get('/', (req, res) => {
    // res.send('<h1>starting to use express!!</h1>')
    // res.sendFile('./views/index.html', {root: __dirname})
    res.render('index')
})

app.get('/about', (req, res) => {
    // res.send('<h1>about us using express!!</h1>')
    // res.sendFile('./views/about.html', {root: __dirname})
    res.render('about')
})

app.get('/blogs/create', (req, res) => res.render('create'))

// redirect route
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

// 404 response
// this is more like a catch all route, if nothing matches from defined ruotes then this wil get run
// app.use((req, res) => res.sendFile('./views/404.html', {root: __dirname}))
// we also need to define status code, express cant tell that its a 404 response
// app.use((req, res) => res.status(404).sendFile('./views/404.html', {root: __dirname}))
app.use((req, res) => res.status(404).render('404'))