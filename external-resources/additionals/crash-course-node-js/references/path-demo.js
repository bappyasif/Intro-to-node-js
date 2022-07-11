let path = require('path');

// basefile name
console.log(path.basename.name, path.basename(__filename))

// dir name
console.log(__dirname, path.dirname(__filename))

// file extension
console.log(path.extname(__filename))

// path object
console.log(path.parse(__filename))

// conactenate path
console.log(path.join(__dirname, 'test', 'hello.json'))