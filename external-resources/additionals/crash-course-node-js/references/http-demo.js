let http = require('http');

http.createServer((req, res) => {
    res.write('hallo wereld')
    res.end()
}).listen(8080, () => console.log('server running....'))