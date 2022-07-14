let http = require('http');
let fs = require('fs');
let path = require('path');
let _ = require('lodash')

let server = http.createServer((req, res) => {
    console.log('a request is made from browser', req.url, req.method)

    // print a random number
    let rn = _.random(0, 20);
    console.log(rn);
    
    // set header content type
    res.setHeader('Content-Type', 'text/html')

    // a basic dynamic routing
    let pathname = path.join(__dirname, 'views');
    switch(req.url) {
        case '/':
            pathname += '/index.html'
            res.statusCode = 200;
            break;
        case '/about':
            pathname += '/about.html'
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            res.end()
            break;
        default:
            pathname += '/404.html'
            res.statusCode = 404;
    }

    // write content on to browser from a file
    fs.readFile(pathname, (err, data) => {
        if(err) console.log(err);
        res.write(data)
        res.end()
    })
});

server.listen('3000', 'localhost', () => {
    console.log('server actively listening to port 3000')
})

/**
 * 
 * 
 let server = http.createServer((req, res) => {
    console.log('a request is made from browser', req.url, req.method)

    // set header content type
    res.setHeader('Content-Type', 'text/html')

    // write content on to browser from a file
    fs.readFile(path.join(__dirname, 'views', 'index.html'), (err, data) => {
        if(err) console.log(err);
        res.write(data)
        res.end()
    })
});
 * 
 * 
 let server = http.createServer((req, res) => {
    console.log('a request is made from browser', req.url, req.method)

    // set header content type
    // res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Content-Type', 'text/html')

    // write on to browser
    // res.write('hallo, how gaat het')
    res.write('<head><link rel="stylesheet" href="#" /></head>')
    res.write('<p>hallo allemaal</p>')
    res.write('<p>how gaat het</p>')

    // ending response
    res.end();
});
 */