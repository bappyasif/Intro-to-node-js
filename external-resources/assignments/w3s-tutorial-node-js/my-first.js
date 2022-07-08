let http = require('http')
let date = require('./first-module')

http.createServer((req, res) => {
    res.writeHead(200, { 'content-Type': 'tedt/html' });
    // including custom made modules
    res.write('date and time are currently as follows: ' + date.myDateTime())
    res.end('Hellooo Wooorld')
}).listen(8080);

// sample server
var http1 = require('http');

//create a server object:
http1.createServer(function (req, res) {
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
}).listen(8081); //the server object listens on port 8080

// read query
var http2 = require('http');
http2.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('req.url');
    res.write(req.url);
    res.end();
}).listen(8082);

// split query
var http3 = require('http');
var url = require('url');

http3.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.end(txt);
}).listen(8083);

// read file
var http4 = require('http');
var fs = require('fs');
http4.createServer(function (req, res) {
    fs.readFile('./demofile1.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(8084);

// append content
// var fs = require('fs');
let http5 = require('http');
http5.createServer((req, res) => {
    fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    fs.readFile('mynewfile1.txt', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    })
}).listen(8085)

let http6 = require('http')
http6.createServer((req, res) => {
    //create an empty file named mynewfile2.txt:
    fs.open('mynewfile2.txt', 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
        // res.write('file');
        // res.write(file);
        // return res.end();
    });
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('file');
    return res.end();
}).listen(8086)

// write file
// var fs = require('fs');

fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});

// update file with append
// var fs = require('fs');

fs.appendFile('mynewfile1.txt', ' This is my text.', function (err) {
  if (err) throw err;
  console.log('Updated!');
});

// update file with write
// var fs = require('fs');

fs.writeFile('mynewfile3.txt', 'This is my text', function (err) {
  if (err) throw err;
  console.log('Replaced!');
});

// delete files
// var fs = require('fs');

fs.unlink('mynewfile2.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});

// rename file
// var fs = require('fs');

fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
  if (err) throw err;
  console.log('File Renamed!');
});