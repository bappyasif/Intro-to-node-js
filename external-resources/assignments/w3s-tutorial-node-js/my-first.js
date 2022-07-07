let http = require('http')

http.createServer((req, res) => {
    res.writeHead(200, {'content-Type': 'tedt/html'});
    res.end('Hellooo Wooorld')
}, 2000).listen(8080);