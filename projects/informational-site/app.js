// let http = require('http');
let express = require('express')
let path = require('path');
let app = express();

// app.set('view engine', 'html'); 

let publicFolder = path.join(__dirname, 'views');

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: publicFolder})
    // res.sendFile('/views/index.html', {root: __dirname})
})

app.get('/about', (req, res) => res.sendFile('about.html', {root: publicFolder}))

app.get('/contact', (req, res) => res.sendFile('contact.html', {root: publicFolder}))

app.use((req, res) => res.status(404).sendFile('/views/404.html', {root: __dirname}))

app.listen(8080, () => console.log('server is running on port nummer 8080'))

/**
 * 
 * 
 // let server = http.createServer((req, res) => {
//     let publicFolder = path.join(__dirname, 'views');
//     app.get('/', (req, res) => {
//         res.send('here here', req.params)
        
//         // res.write(path.join(publicFolder, 'index.html'))
//         // res.end()
//     })
// })
 * 
 * 
 app.get('/', (req, res) => {
    // res.send('<h1>starting to use express!!</h1>')
    res.sendFile('/views/index.html', {root: __dirname})
    // res.render('index')
    
    // res.sendFile(path.join(publicFolder, 'index.html'))
    // res.write(path.join(publicFolder, 'index.html'))
    // res.render(path.join(publicFolder, 'index'), (err, content) => {
    //     if(err) console.log(err)
    //     // res.write(content)
    //     // res.end()
    //     res.sendFile('index.html')
    // })
    // res.end()
})
 */