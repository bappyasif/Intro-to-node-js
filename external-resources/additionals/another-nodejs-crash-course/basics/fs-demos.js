let fs = require('fs');
let path = require('path')
// reading files
fs.readFile(path.join(__dirname, 'docs', 'hello.txt'), 'utf-8', (err, data) => {
    if (err) throw err
    console.log(data)
})

fs.readFile('./docs/hello.txt', (err, data) => {
    if (err) throw err
    console.log(data.toString())
})

console.log('last line!!') // logs first, cause its running in synchronous

// writing files
fs.writeFile(path.join(__dirname, 'docs', 'test.txt'), 'some data', (err, data) => {
    if (err) throw err;
    console.log('data written')
})

fs.writeFile('./docs/test.txt', 'over written', () => console.log('over written'))

// directories
// without fs.existsSync code will throw error when same directory exists in directory
if (!fs.existsSync('./assets')) {
    fs.mkdir(path.join(__dirname, 'test-dir'), (err) => {
        if (err) throw err;
        console.log('directory cretaed')
    })

    fs.mkdir('./assets', err => {
        if (err) console.log(err)
        console.log('directory created')
    })
} else {
    fs.rmdir(path.join(__dirname, 'assets'), err => {
        if(err) throw err
        console.log('folder deleted')
    })

    fs.rmdir('./test-dir', err => {
        if(err) console.log(err)
        console.log('folder deleted')
    })
}

// delete files
// lets check if that file exists first or not
if(fs.existsSync(path.join(__dirname, 'docs', 'test.txt'))) {
    fs.unlink(path.join(__dirname, 'docs', 'test.txt'), err => {
        if(err) throw err
        console.log('file deleted')
    })
}