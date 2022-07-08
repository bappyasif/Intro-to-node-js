// url parse
var url = require('url');
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2017&month=february'

var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); //returns 'february'

// Create a Node.js file that opens the requested file and returns the content to the client. If anything goes wrong, throw a 404 error:
let http = require('http');
let fs = require('fs');
// let url = require('url')

http.createServer((req, res) => {
    let q = url.parse(req.url, true)
    let filename = '.' + q.pathname
    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404, { 'content-Type': 'text/html' });
            return res.end('404 file not found')
        }
        res.writeHead(200, { 'content-Type': 'text/html' })
        res.write(data)
        return res.end()
    })
}).listen(8080)

// Create a Node.js file that will convert the output "Hello World!" into upper-case letters:
var http2 = require('http');
var uc = require('upper-case');
http2.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(uc.upperCase("Hello World!"));
    res.end();
}).listen(8081);

// node.js events
// var fs = require('fs');
var rs = fs.createReadStream('./mynewfile3.txt');
rs.on('open', function () {
    console.log('The file is open');
});

// to fire an event
let events = require('events');
let eventEmitter = new events.EventEmitter()

// create an event handler
let eventHandler = () => console.log('i hear a scream!!')

// assign event handler to an event
eventEmitter.on('scream', eventHandler)

// fire that 'scream' event
eventEmitter.emit('scream')


// upload file
let http3 = require('http');

// This code will produce an HTML form:
http3.createServer((req, res) => {
    res.writeHead(200, { 'content-Type': 'text/html' });
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
}).listen(8082)

// parse user uploaded file
// file will be uploaded, and placed on a temporary folder
var http4 = require('http');
var formidable = require('formidable');

http4.createServer((req, res) => {
    if (req.url === '/fileupload') {
        let incmForm = new formidable.IncomingForm();
        incmForm.parse(req, (err, fields, files) => {
            // res.write(files)
            res.write('File uploaded')
            res.end()
        })
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8083)

// save file
// Include the fs module, and move the file to the current folder:
let http5 = require('http');
// let formidable = require('formidable');
// let fs = require('fs');
http5.createServer((req, res) => {
    if (req.url === '/fileupload') {
        let incmForm = new formidable.IncomingForm();
        incmForm.parse(req, (err, fields, files) => {
            var oldpath = files.filetoupload.filepath;
            var newpath = './' + files.filetoupload.originalFilename;
            res.write('oldPath:' + oldpath + ' new path: ' + newpath)
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        })

    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8084)


// sending email using nodemailer
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: 'asifuzzamanbappy@gmail.com',
        pass: '******'
    },
    tls: {
        rejectUnauthorized: false
    }
});

var mailOptions = {
    from: 'bappy.asif@protonmail.com',
    to: 'bappy.asif@icloud.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

// Multiple Receivers
// To send an email to more than one receiver, add them to the "to" property of the mailOptions object, separated by commas
var mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com, myotherfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
}

// Send HTML
// To send HTML formatted text in your email, use the "html" property instead of the "text" property:
mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com, myotherfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    html: '<h1>Welcome</h1><p>That was easy!</p>'
  }