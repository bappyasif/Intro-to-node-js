let http = require('http')
let fs = require('fs')
let path = require('path')
let _ = require('lodash')
// http.createServer((req, res) => {
//     res.end('hello nodejs!!')
// }).listen(8080, () => console.log('....server running....'))

// let server = http.createServer((req, res) => {
//     console.log('request made'); // wont show on browser, as its not running on browser rather on server
//     console.log(req.url, req.method)
//     res.end('hello nodejs!!')
// })

// let server = http.createServer((req, res) => {
//     console.log('request made'); // wont show on browser, as its not running on browser rather on server
//     console.log(req.url, req.method)
//     // set header content type
//     // res.setHeader('Content-Type', 'text/plain')
//     res.setHeader('Content-Type', 'text/html')
    
//     // addeding a stylesheet here
//     res.write('<head><link rel="stylesheet" href="#" /></head>')

//     // writing response to browser
//     res.write('hello nodejs!!')

//     res.write('<h1>hello nodejs!!</h1>')
//     // ending response, and sending response back to browser
//     res.end()
// })

// let server = http.createServer((req, res) => {
//     console.log('request made'); // wont show on browser, as its not running on browser rather on server
//     console.log(req.url, req.method)
//     // set header content type
//     // res.setHeader('Content-Type', 'text/plain')
//     res.setHeader('Content-Type', 'text/html')

//     // send an html file
//     fs.readFile(path.join(__dirname, 'views', 'index.html'), (err, content) => {
//         if(err) throw err;

//         // writing content to browser
//         res.write(content)

//         // ending response
//         res.end()
//     })
    
// })

let server = http.createServer((req, res) => {
    // using lodash utility library
    let rNum = _.random(0, 20)
    console.log(rNum)

    // run once
    let greet = _.once(() => console.log('hallo'))
    greet() // will show hallo in console
    greet() // it wouldnt run, will be ignored

    console.log('request made'); // wont show on browser, as its not running on browser rather on server
    console.log(req.url, req.method)
    // set header content type
    res.setHeader('Content-Type', 'text/html')

    let pathName = './views/'

    switch(req.url) {
        case '/':
            pathName += 'index.html'
            res.statusCode = '200'
            break;
        case '/about':
            pathName += 'about.html'
            res.statusCode = 200
            break;
        case '/about-*':
            // route redirect
            res.statusCode = 301
            res.setHeader("Location", "/about")
            res.end()
            break;
        default:
            res.statusCode = 404
            pathName += '404.html'
    }

    // send an html file
    fs.readFile(pathName, (err, content) => {
        if(err) throw err;

        // writing content to browser
        res.write(content)

        // setting a response code
        // res.statusCode = 200; //  it will get same status code for all responses which is not right, rather do this on swith block for more precise status code

        // ending response
        res.end()
    })
    
})

server.listen(8080, 'localhost', () => console.log('....server running on port 8080....'))