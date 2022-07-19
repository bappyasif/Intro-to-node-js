let http = require('http');
let fs = require('fs');
let path = require('path');

// let express = require('express');
// let app = express();

let server = http.createServer((req, res) => {
    // res.write('server alive')
    // res.end()

    let publicFolder = path.join(__dirname, 'views')

    let contentType = 'text/html';
    res.setHeader('Content-Type', contentType);

    let urlName = req.url
    console.log(urlName, 'urlName')

    let viewName = ''

    switch(urlName) {
        case '/':
            viewName += 'index.html';
            res.statusCode = '200'
            break;
        case '/about':
            viewName += 'about.html';
            res.statusCode = '200'
            break;
        case '/contact':
            viewName += 'contact.html';
            res.statusCode = '200'
            break;
        default:
            res.statusCode = '404'
            viewName += '404.html'
    }


    fs.readFile(path.join(publicFolder, viewName), 'utf-8', (err, data) => {
        if(err) console.log(err)
        res.write(data)
        res.end()
    })

});

server.listen(8080, () => console.log('server is running at port 8080'))

// routes
// app.get('/', (req, res) => {
//     res.render('index')
// })

// let server = http.createServer((req, res) => {
//     // res.write('server alive')
//     // res.end()

//     fs.readFile('./views/index.html', 'utf-8', (err, data) => {
//         if(err) console.log(err)
//         res.write(data)
//         res.end()
//     })

// });