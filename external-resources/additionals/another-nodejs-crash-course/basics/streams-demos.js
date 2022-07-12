let fs = require('fs');
let path = require('path');

let readStream = fs.createReadStream(path.join(__dirname, 'docs', 'readme.txt'), 'utf-8');
// readStream = fs.createReadStream(path.join(__dirname, 'docs', 'readme.txt'), {encoding: 'utf-8'});
readStream = fs.createReadStream(path.join(__dirname, 'docs', 'readme.txt'));

let writeStream = fs.createWriteStream(path.join(__dirname, 'docs', 'readme2.txt'))

// readStream.on('data', chunk => {
//     console.log('....new chunk....')
//     console.log(chunk)
//     writeStream.write('\n....new chunk....\n')
//     writeStream.write(chunk)
// })

// using piping
// same thing will happen as above snippet
readStream.pipe(writeStream)