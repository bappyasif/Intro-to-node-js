let fs = require('fs');
let path = require('path');

// create folder, async version
// fs.mkdir(path.join(__dirname, 'test'), {}, err => {
//     if(err) throw err;
//     console.log('folder created....')
// })

// create file, async version
// fs.writeFile(path.join(__dirname, 'test2', 'hello.text'), 'file content: Hello World!!', err => {
//     if(err) throw err;
//     console.log('file created....')
// })

// create file, async version, make sure directory is already there, otherwise it'll throw error
// fs.writeFile(path.join(__dirname, 'test', 'hello.txt'), 'Hello World!!', err => {
//     if (err) throw err;
//     console.log('file created....')
// })

// overwritten content
// fs.writeFile(path.join(__dirname, 'test', 'hello.txt'), 'I love node js', err => {
//     if (err) throw err;
//     console.log('file overwritten....')
// })

// append file
// fs.appendFile(path.join(__dirname, 'test', 'hello.txt'), 'and appended', err => {
//     if (err) throw err;
//     console.log(' file appended from outside of cb....')
// })

// together overwritten and append
// fs.writeFile(path.join(__dirname, 'test', 'hello.text'), 'Hello World!!', err => {
//     if (err) throw err;
//     console.log('file created....')
    
//     // append file
//     fs.appendFile(path.join(__dirname, 'test', 'hello.txt'), ' file appended from inside of cb....', err => {
//         if (err) throw err;
//         console.log(' file appended from inside of cb....')
//     })
// })

// read file
fs.readFile(path.join(__dirname, 'test', 'hello.txt'), 'utf-8', (err, data) => {
    if(err) throw err;
    console.log('reading data: '+ data)
})

// rename file
fs.rename(path.join(__dirname, 'test', 'hello.txt'), path.join(__dirname, 'test', 'hellow-world.txt'), (err) => {
    if(err) throw err;
    console.log('file renamed')
})