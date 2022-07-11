let http = require('http')
let fs = require('fs')
let path = require('path')

let server = http.createServer((req, res) => {
    let publicFolder = "/external-resources/additionals/crash-course-node-js/public"
    let filePath = path.join(__dirname, publicFolder, req.url === '/' ? 'home.html' : req.url)
    // res.end(filePath)

    // exension name
    let extName = path.extname(filePath)

    // initialize contentType
    let contentType = 'text/html';

    // check and set contentType
    switch (extName) {
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.css':
            contentType = 'text/css'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.jpg':
            contentType = 'image/png'
            break;
    }

    // Check if contentType is text/html but no .html file extension
    if (contentType == "text/html" && extName == "") filePath += ".html";

    // log the filePath
    console.log(filePath);

    // read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            console.log('here here!!', err.code)
            if (err.code === "ENOENT") {
                console.log('here here!!')
                fs.readFile(path.join(__dirname, publicFolder, '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(content, 'utf-8')
                })
            } else {
                res.writeHead(500)
                res.end(`Server error: ${err.code}`)
            }
        } else {
            res.writeHead(200)
            res.end(content, 'utf-8')
        }
    })
})

const PORT = process.env.PORT || 8081;

server.listen(PORT, () => console.log(`server running on port: ${PORT}`))


// let server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         fs.readFile(path.join(__dirname, '/external-resources/additionals/crash-course-node-js/public', 'home.html'), (err, content) => {
//             if (err) throw err;
//             res.writeHead(200, { 'Content-Type': 'text/html' })
//             res.end(content)
//         })
//     } else if (req.url === '/about') {
//         fs.readFile(path.join(__dirname, '/external-resources/additionals/crash-course-node-js/public', 'about.html'), (err, content) => {
//             if (err) throw err;
//             res.writeHead(200, { 'Content-Type': 'text/html' })
//             res.end(content)
//         })
//     } else if (req.url === '/api/users') {
//         let users = [
//             { name: 'hoxie', age: 23 },
//             { name: 'rooby', age: 24 }
//         ]
//         res.writeHead(200, { 'Content-Type': 'application/json' })
//         res.end(JSON.stringify(users))
//     }
// })


// let server = http.createServer((req, res) => {
//     fs.readFile(path.join(__dirname, '/external-resources/additionals/crash-course-node-js/public', 'home.html'), (err, content) => {
//         if (err) throw err;
//         res.writeHead(200, { 'Content-Type': 'text/html' })
//         if (req.url === '/') res.end(content)
//     })
// })

// let server = http.createServer((req, res) => {
//     console.log(req.url)
//     res.writeHead(200, {'Content-Type': 'text/html'})
//     if(req.url === '/') res.end('<h1>Home Page</h1>')
// })