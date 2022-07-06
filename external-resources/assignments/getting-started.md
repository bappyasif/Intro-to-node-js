*** Run Node.js scripts from the command line ***
>> usual way to run a Node.js program is to run the globally available node command (once you install Node.js) and pass the name of the file you want to execute
>> If your main Node.js application file is app.js, you can call it by typing: node app.js
    >> Above, you are explicitly telling the shell to run your script with node
    >> You can also embed this information into your JavaScript file with a "shebang" line
    >> "shebang" is the first line in the file, and tells the OS which interpreter to use for running the script
>> Below is the first line of JavaScript: #!/usr/bin/node
    >> Above, we are explicitly giving the absolute path of interpreter
>> Not all operating systems have node in the bin folder, but all should have env
    >> You can tell the OS to run env with node as parameter: #!/usr/bin/env node // your code
>> To use a shebang, your file should have executable permission
    >> You can give app.js the executable permission by running: chmod u+x app.js
    >> While running the command, make sure you are in the same directory which contains the app.js file
** Restart the application automatically **
>> node command has to be re-executed in bash whenever there is a change in the application, to restart the application automatically, nodemon module is used
>> Install the nodemon module globally to system path: npm i -g nodemon
>> You can also install nodemon as a development-dependency: npm i --save-dev nodemon
    >> This local installation of nodemon can be run by calling it from within npm script such as npm start or using npx nodemon
>> Run the application using nodemon followed by application file name: nodemon app.js

*** How to exit from a Node.js program ***
>> There are various ways to terminate a Node.js application
>> When running a program in the console you can close it with ctrl-C, but what we want to discuss here is programmatically exiting
>> Let's start with the most drastic one, and see why you're better off not using it
>> process core module provides a handy method that allows you to programmatically exit from a Node.js program: process.exit()
    >> When Node.js runs this line, the process is immediately forced to terminate
    >> This means that any callback that's pending, any network request still being sent, any filesystem access, or processes writing to stdout or stderr - all is going to be ungracefully terminated right away
>> If this is fine for you, you can pass an integer that signals the operating system the exit code: process.exit(1);
    >> By default the exit code is 0, which means success
    >> Different exit codes have different meaning, which you might want to use in your own system to have the program communicate to other programs
>> You can also set the process.exitCode property: process.exitCode = 1;
    >> and when the program ends, Node.js will return that exit code
>> A program will gracefully exit when all the processing is done
>> Many times with Node.js we start servers, like this HTTP server:
```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hi!');
});

app.listen(3000, () => console.log('Server ready'));
```
> Express is a framework that uses the http module under the hood, app.listen() returns an instance of http
> You would use https.createServer if you needed to serve your app using HTTPS, as app.listen only uses the http module
>> This above program is never going to end
>> If you call process.exit(), any currently pending or running request is going to be aborted, which is not nice
>> It is better to allow running request to complete before terminating
>> In this case you need to send the command a SIGTERM signal, and handle that with the process signal handler:
```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hi!');
});

const server = app.listen(3000, () => console.log('Server ready'));

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});
```
> process does not require a "require", it's automatically available
> Signals are a POSIX intercommunication system: a notification sent to a process in order to notify it of an event that occurred
>> SIGKILL is the signal that tells a process to immediately terminate, and would ideally act like process.exit()
>> SIGTERM is the signal that tells a process to gracefully terminate
    >> It is the signal that's sent from process managers like upstart or supervisord and many others
>> You can send this signal from inside the program, in another function: process.kill(process.pid, 'SIGTERM');
>> Or from another Node.js running program, or any other app running in your system that knows the PID of the process you want to terminate

*** How to read environment variables from Node.js ***
>> process core module of Node.js provides the env property which hosts all the environment variables that were set at the moment the process was started
>> below code runs app.js and set USER_ID and USER_KEY: USER_ID=239482 USER_KEY=foobar node app.js
>> That will pass the user USER_ID as 239482 and the USER_KEY as foobar
>> This is suitable for testing, however for production, you will probably be configuring some bash scripts to export variables
>> Here is an example that accesses the USER_ID and USER_KEY environment variables, which we set in above code: 
```js
process.env.USER_ID; // "239482"
process.env.USER_KEY; // "foobar"
```
>> In the same way you can access any custom environment variable you set
>> If you have multiple environment variables in your node project, you can also create an .env file in the root directory of your project, and then use the dotenv package to load them during runtime
`
# .env file
USER_ID="239482"
USER_KEY="foobar"
NODE_ENV="development"
`
```js
require('dotenv').config();

process.env.USER_ID; // "239482"
process.env.USER_KEY; // "foobar"
process.env.NODE_ENV; // "development"
```
> You can also run your js file with node -r dotenv/config index.js command if you don't want to import the package in your code

*** Build an HTTP Server ***
>> Here is a sample Hello World HTTP web server: 
```js
const http = require('http')

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<h1>Hello, World!</h1>')
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
```
>> Let's analyze it briefly
    >> We include the http module
    >> We use the module to create an HTTP server
    >> server is set to listen on the specified port, 3000
    >> When the server is ready, the listen callback function is called
    >> callback function we pass is the one that's going to be executed upon every request that comes in
    >> Whenever a new request is received, the request event is called, providing two objects: a request (an http.IncomingMessage object) and a response (an http.ServerResponse object)
    >> request provides the request details, Through it, we access the request headers and request data
    >> response is used to populate the data we're going to return to the client
    >> In this case with: res.statusCode = 200;
    >> we set the statusCode property to 200, to indicate a successful response
    >> We also set the Content-Type header: res.setHeader('Content-Type', 'text/html');
    >> and we end close the response, adding the content as an argument to end(): res.end('<h1>Hello, World!</h1>');


*** Making HTTP requests with Node.js ***

** Perform a GET Request **
>> There are many ways to perform an HTTP GET request in Node.js, depending on the abstraction level you want to use
>> The simplest way to perform an HTTP request using Node.js is to use the Axios library: 
```js
const axios = require('axios');

axios
  .get('https://example.com/todos')
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });
```
> However, Axios requires the use of a 3rd party library
>> A GET request is possible just using the Node.js standard modules, although it's more verbose than the option above: 
```js
const https = require('https');

const options = {
  hostname: 'example.com',
  port: 443,
  path: '/todos',
  method: 'GET',
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();
```
** Perform a POST Request **
>> Similar to making an HTTP GET request, you can use the Axios library to perform a POST request: 
```js
const axios = require('axios');

axios
  .post('https://whatever.com/todos', {
    todo: 'Buy the milk',
  })
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });
```
>> or alternatively using node.js standard modules: 
```js
const https = require('https');

const data = JSON.stringify({
  todo: 'Buy the milk',
});

const options = {
  hostname: 'whatever.com',
  port: 443,
  path: '/todos',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
```

** PUT and DELETE **
>> PUT and DELETE requests use the same POST request format - you just need to change the options.method value to the appropriate method: method: 'PUT' and 'DELETE' respectively

*** Node.js fs module ***
>> fs module provides a lot of very useful functionality to access and interact with the file system
>> There is no need to install it
>> Being part of the Node.js core, it can be used by simply requiring it: const fs = require('fs');
>> Once you do so, you have access to all its methods, which include: 
* fs.access(): check if the file exists and Node.js can access it with its permissions
* fs.appendFile(): append data to a file. If the file does not exist, it's created
* fs.chmod(): change the permissions of a file specified by the filename passed. Related: fs.lchmod(), fs.fchmod()
* fs.chown(): change the owner and group of a file specified by the filename passed. Related: fs.fchown(), fs.lchown()
* fs.close(): close a file descriptor
* fs.copyFile(): copies a file
* fs.createReadStream(): create a readable file stream
* fs.createWriteStream(): create a writable file stream
* fs.link(): create a new hard link to a file
* fs.mkdir(): create a new folder
* fs.mkdtemp(): create a temporary directory
* fs.open(): opens the file and returns a file descriptor to allow file manipulation
* fs.readdir(): read the contents of a directory
* fs.readFile(): read the content of a file. Related: fs.read()
* fs.readlink(): read the value of a symbolic link
* fs.realpath(): resolve relative file path pointers (., ..) to the full path
* fs.rename(): rename a file or folder
* fs.rmdir(): remove a folder
* fs.stat(): returns the status of the file identified by the filename passed. Related: fs.fstat(), fs.lstat()
* fs.symlink(): create a new symbolic link to a file
* fs.truncate(): truncate to the specified length the file identified by the filename passed. Related: fs.ftruncate()
* fs.unlink(): remove a file or a symbolic link
* fs.unwatchFile(): stop watching for changes on a file
* fs.utimes(): change the timestamp of the file identified by the filename passed. Related: fs.futimes()
* fs.watchFile(): start watching for changes on a file. Related: fs.watch()
* fs.writeFile(): write data to a file. Related: fs.write()
>> One peculiar thing about the fs module is that all the methods are asynchronous by default, but they can also work synchronously by appending Sync
>> For example:
* fs.rename()
* fs.renameSync()
* fs.write()
*  fs.writeSync()
>> This makes a huge difference in your application flow
> Node.js 10 includes experimental support for a promise based API
>> For example let's examine the fs.rename() method, asynchronous API is used with a callback: 
```js
const fs = require('fs');

fs.rename('before.json', 'after.json', err => {
  if (err) {
    return console.error(err);
  }

  // done
});
```
>> A synchronous API can be used like this, with a try/catch block to handle errors: 
```js
const fs = require('fs');

try {
  fs.renameSync('before.json', 'after.json');
  // done
} catch (err) {
  console.error(err);
}
```
>> key difference here is that the execution of your script will block in the second example, until the file operation succeeded
>> You can use promise-based API provided by fs/promises module to avoid using callback-based API, which may cause callback hell. Here is an example: 
```js
// Example: Read a file and change its content and read
// it again using callback-based API.
const fs = require('fs');

const fileName = '/Users/joe/test.txt';
fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
  const content = 'Some content!';
  fs.writeFile(fileName, content, err2 => {
    if (err2) {
      console.log(err2);
      return;
    }
    console.log('Wrote some content!');
    fs.readFile(fileName, 'utf8', (err3, data3) => {
      if (err3) {
        console.log(err3);
        return;
      }
      console.log(data3);
    });
  });
});
```
> callback-based API may rises callback hell when there are too many nested callbacks
>> We can simply use promise-based API to avoid it: 
```js
// Example: Read a file and change its content and read
// it again using promise-based API.
const fs = require('fs/promises');

async function example() {
  const fileName = '/Users/joe/test.txt';
  try {
    const data = await fs.readFile(fileName, 'utf8');
    console.log(data);
    const content = 'Some content!';
    await fs.writeFile(fileName, content);
    console.log('Wrote some content!');
    const newData = await fs.readFile(fileName, 'utf8');
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
}
example();
```

*** Writing files with Node.js ***
>> easiest way to write to files in Node.js is to use the fs.writeFile() API
```js
const fs = require('fs');

const content = 'Some content!';

fs.writeFile('/Users/joe/test.txt', content, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});
```
>> Alternatively, you can use the synchronous version fs.writeFileSync(): 
```js
const fs = require('fs');

const content = 'Some content!';

try {
  fs.writeFileSync('/Users/joe/test.txt', content);
  // file written successfully
} catch (err) {
  console.error(err);
}
```
>> You can also use the promise-based fsPromises.writeFile() method offered by the fs/promises module: 
```js
const fs = require('fs/promises');

async function example() {
  try {
    const content = 'Some content!';
    await fs.writeFile('/Users/joe/test.txt', content);
  } catch (err) {
    console.log(err);
  }
}
example();
```
>> By default, this API will replace the contents of the file if it does already exist
>> You can modify the default by specifying a flag: fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, err => {});
>> flags you'll likely use are: 
* r+ open the file for reading and writing
* w+ open the file for reading and writing, positioning the stream at the beginning of the file, and file is created if it does not exist
* a open the file for writing, positioning the stream at the end of the file, and file is created if it does not exist\
* a+ open the file for reading and writing, positioning the stream at the end of the file, and file is created if it does not exist

** Append to a file **
>> A handy method to append content to the end of a file is fs.appendFile() (and its fs.appendFileSync() counterpart): 
```js
const content = 'Some content!';

fs.appendFile('file.log', content, err => {
  if (err) {
    console.error(err);
  }
  // done!
});
```
>> Here is a fsPromises.appendFile() example: 
```js
const fs = require('fs/promises');

async function example() {
  try {
    const content = 'Some content!';
    await fs.appendFile('/Users/joe/test.txt', content);
  } catch (err) {
    console.log(err);
  }
}
example();
```
** Using streams **
>> All those methods write the full content to the file before returning the control back to your program (in the async version, this means executing the callback)
>> In this case, a better option is to write the file content using streams

*** Reading files with Node.js ***
>> simplest way to read a file in Node.js is to use the fs.readFile() method, passing it the file path, encoding and a callback function that will be called with the file data (and the error): 
```js
const fs = require('fs');

fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```
>> Alternatively, you can use the synchronous version fs.readFileSync(): 
```js
const fs = require('fs');

try {
  const data = fs.readFileSync('/Users/joe/test.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}
```
>> You can also use the promise-based fsPromises.readFile() method offered by the fs/promises module: 
```js
const fs = require('fs/promises');

async function example() {
  try {
    const data = await fs.readFile('/Users/joe/test.txt', { encoding: 'utf8' });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
example();
```
>> All three of fs.readFile(), fs.readFileSync() and fsPromises.readFile() read the full content of the file in memory before returning the data
>> This means that big files are going to have a major impact on your memory consumption and speed of execution of the program
>> In this case, a better option is to read the file content using streams

*** Node.js Streams ***
** What are streams **
>> Streams are one of the fundamental concepts that power Node.js applications
>> They are a way to handle reading/writing files, network communications, or any kind of end-to-end information exchange in an efficient way
>> Streams are not a concept unique to Node.js
  >> They were introduced in the Unix operating system decades ago, and programs can interact with each other passing streams through the pipe operator (|)
>> For example, in the traditional way, when you tell the program to read a file, the file is read into memory, from start to finish, and then you process it
>> Using streams you read it piece by piece, processing its content without keeping it all in memory
>> Node.js `stream` module provides the foundation upon which all streaming APIs are built
>> All streams are instances of `EventEmitter`

** Why streams **
>> Streams basically provide two major advantages over using other data handling methods: 
* Memory efficiency: you don't need to load large amounts of data in memory before you are able to process it
* Time efficiency: it takes way less time to start processing data, since you can start processing as soon as you have it, rather than waiting till the whole data payload is available

** An example of a stream **
>> A typical example is reading files from a disk 
>> Using the Node.js fs module, you can read a file, and serve it over HTTP when a new connection is established to your HTTP server:
```js
const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {
  fs.readFile(`${__dirname}/data.txt`, (err, data) => {
    res.end(data);
  });
});
server.listen(3000);
```
* readFile() reads the full contents of the file, and invokes the callback function when it's done
* res.end(data) in the callback will return the file contents to the HTTP client
>> If the file is big, the operation will take quite a bit of time
>> Here is the same thing written using streams: 
```js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream(`${__dirname}/data.txt`);
  stream.pipe(res);
});
server.listen(3000);
```
>> Instead of waiting until the file is fully read, we start streaming it to the HTTP client as soon as we have a chunk of data ready to be sent

** pipe() **
>> above example uses the line stream.pipe(res): the pipe() method is called on the file stream
>> What does this code do? It takes the source, and pipes it into a destination
>> You call it on the source stream, so in this case, the file stream is piped to the HTTP response
>> return value of the pipe() method is the destination stream, which is a very convenient thing that lets us chain multiple pipe() calls, like this: `src.pipe(dest1).pipe(dest2);`
>> This construct is the same as doing: `src.pipe(dest1); dest1.pipe(dest2);`

** Streams-powered Node.js APIs **
>> Due to their advantages, many Node.js core modules provide native stream handling capabilities, most notably: 
* `process.stdin` returns a stream connected to stdin
* `process.stdout` returns a stream connected to stdout
* `process.stderr` returns a stream connected to stderr
* `fs.createReadStream()` creates a readable stream to a file
* `fs.createWriteStream()` creates a writable stream to a file
* `net.connect()` initiates a stream-based connection
* `http.request()` returns an instance of the http.ClientRequest class, which is a writable stream
* `zlib.createGzip()` compress data using gzip (a compression algorithm) into a stream
* `zlib.createGunzip()` decompress a gzip stream
* `zlib.createDeflate()` compress data using deflate (a compression algorithm) into a stream
* `zlib.createInflate()` decompress a deflate stream

** Different types of streams **
>> There are four classes of streams: 
* Readable: 
  * a stream you can pipe from, but not pipe into (you can receive data, but not send data to it)
  * When you push data into a readable stream, it is buffered, until a consumer starts to read the data
* Writable: 
  *  a stream you can pipe into, but not pipe from (you can send data, but not receive from it)
* Duplex: 
  * a stream you can both pipe into and pipe from, basically a combination of a Readable and Writable stream
* Transform: 
  * a Transform stream is similar to a Duplex, but the output is a transform of its input

** How to create a readable stream **
>> We get the Readable stream from the stream module, and we initialize it and implement the readable._read() method
>> First create a stream object: 
```js
const Stream = require('stream');

const readableStream = new Stream.Readable();
```
>> then implement _read: `readableStream._read = () => {};`
>> You can also implement _read using the read option: 
```js
const readableStream = new Stream.Readable({
  read() {},
});
```
>> Now that the stream is initialized, we can send data to it: 
```js
readableStream.push('hi!');
readableStream.push('ho!');
```

** How to create a writable stream **
>> To create a writable stream we extend the base Writable object, and we implement its _write() method
>> First create a stream object: 
```js
const Stream = require('stream');

const writableStream = new Stream.Writable();
```
>> then implement _write: 
```js
writableStream._write = (chunk, encoding, next) => {
  console.log(chunk.toString());
  next();
};
```
>> You can now pipe a readable stream in: `process.stdin.pipe(writableStream);`

** How to get data from a readable stream **
>> How do we read data from a readable stream? Using a writable stream: 
```js
const Stream = require('stream');

const readableStream = new Stream.Readable({
  read() {},
});
const writableStream = new Stream.Writable();

writableStream._write = (chunk, encoding, next) => {
  console.log(chunk.toString());
  next();
};

readableStream.pipe(writableStream);

readableStream.push('hi!');
readableStream.push('ho!');
```
>> You can also consume a readable stream directly, using the readable event: 
```js
readableStream.on('readable', () => {
  console.log(readableStream.read());
});
```

** How to send data to a writable stream **
>> Using the stream write() method: 
```js
writableStream.write('hey!\n');
```

** Signaling a writable stream that you ended writing **
>> Use the end() method: 
```js
const Stream = require('stream');

const readableStream = new Stream.Readable({
  read() {},
});
const writableStream = new Stream.Writable();

writableStream._write = (chunk, encoding, next) => {
  console.log(chunk.toString());
  next();
};

readableStream.pipe(writableStream);

readableStream.push('hi!');
readableStream.push('ho!');

readableStream.on('close', () => writableStream.end());
writableStream.on('close', () => console.log('ended'));

readableStream.destroy();
```
>> In the above example, end() is called within a listener to the close event on the readable stream to ensure it is not called before all write events have passed through the pipe, as doing so would cause an error event to be emitted
>> Calling destroy() on the readable stream causes the close event to be emitted
>> listener to the close event on the writable stream demonstrates the completion of the process as it is emitted after the call to end()

** How to create a transform stream **
>> We get the Transform stream from the stream module, and we initialize it and implement the transform._transform() method
>> First create a transform stream object: 
```js
const { Transform } = require('stream');

const transformStream = new Transform();
```
>> then implement _transform: 
```js
transformStream._transform = (chunk, encoding, callback) => {
  transformStream.push(chunk.toString().toUpperCase());
  callback();
};
```
>> Pipe readable stream: 
```js
process.stdin.pipe(transformStream).pipe(process.stdout);
`
