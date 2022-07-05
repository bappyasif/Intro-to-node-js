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