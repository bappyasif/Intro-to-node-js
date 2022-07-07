*** Introduction to Node.js ***
>> Node.js is an open-source and cross-platform JavaScript runtime environment
>> Node.js runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser
>> This allows Node.js to be very performant
>> A Node.js app runs in a single process, without creating a new thread for every request
>> Node.js provides a set of asynchronous I/O primitives in its standard library that prevent JavaScript code from blocking and generally, libraries in Node.js are written using non-blocking paradigms, making blocking behavior the exception rather than the norm
>> When Node.js performs an I/O operation, like reading from the network, accessing a database or the filesystem, instead of blocking the thread and wasting CPU cycles waiting, Node.js will resume the operations when the response comes back
>> This allows Node.js to handle thousands of concurrent connections with a single server without introducing the burden of managing thread concurrency, which could be a significant source of bugs
>> Node.js has a unique advantage because millions of frontend developers that write JavaScript for the browser are now able to write the server-side code in addition to the client-side code without the need to learn a completely different language
>> In Node.js the new ECMAScript standards can be used without problems, as you don't have to wait for all your users to update their browsers - you are in charge of deciding which ECMAScript version to use by changing the Node.js version, and you can also enable specific experimental features by running Node.js with flags

** A Vast Number of Libraries **
>> npm with its simple structure helped the ecosystem of Node.js proliferate, and now the npm registry hosts over 1,000,000 open source packages you can freely use

** An Example Node.js Application **

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
* This code first includes the Node.js http module
* Node.js has a fantastic standard library, including first-class support for networking
* createServer() method of http creates a new HTTP server and returns it
* server is set to listen on the specified port and host name, When the server is ready, the callback function is called, in this case informing us that the server is running
* Whenever a new request is received, the request event is called, providing two objects: 
  * a request (an http.IncomingMessage object) 
  * and a response (an http.ServerResponse object)
* Those 2 objects are essential to handle the HTTP call
* first provides the request details, In this simple example, this is not used, but you could access the request headers and request data
* second is used to return data to the caller, In this case with: res.statusCode = 200;
* we set the statusCode property to 200, to indicate a successful response
* We set the Content-Type header: res.setHeader('Content-Type', 'text/plain');
* and we close the response, adding the content as an argument to end(): res.end('Hello World\n');

** Node.js Frameworks and Tools **
>> Node.js is a low-level platform, In order to make things easy and exciting for developers, thousands of libraries were built upon Node.js by the community
>> Many of those established over time as popular options, Here is a non-comprehensive list of the ones worth learning:
* AdonisJS, Egg.js, Express, Fastify, FeatherJS, Gatsby, hapi, koa, Loopback.io, Meteor, Micro, NestJS, Next.js, Nx, Remix, Sapper, Socket.io, Strapi

> nvm is a popular way to run Node.js, It allows you to easily switch the Node.js version, and install new versions to try and easily rollback if something breaks
> It is also very useful to test your code with old Node.js versions
> In any case, when Node.js is installed you'll have access to the node executable program in the command line

** How much JavaScript do you need to know to use Node.js? **
>> As a beginner, it's hard to get to a point where you are confident enough in your programming abilities
>> While learning to code, you might also be confused at where does JavaScript end, and where Node.js begins, and vice versa
>> recommended main JavaScript concepts before diving into Node.js: 
* Lexical Structure
* Expressions
* Types
* Classes
* Variables
* Functions
* this
* Arrow Functions
* Loops
* Scopes
* Arrays
* Template Literals
* Semicolons
* Strict Mode
* ECMAScript 6, 2016, 2017

>> With those concepts in mind, you are well on your road to become a proficient JavaScript developer, in both the browser and in Node.js
>> The following concepts are also key to understand asynchronous programming, which is one of the fundamental parts of Node.js: 
* Asynchronous programming and callbacks
* Timers
* Promises
* Async and Await
* Closures
* The Event Loop

*** Differences between Node.js and the Browser ***
>> Both the browser and Node.js use JavaScript as their programming language
>> Building apps that run in the browser is a completely different thing than building a Node.js application
>> Despite the fact that it's always JavaScript, there are some key differences that make the experience radically different
>> From the perspective of a frontend developer who extensively uses JavaScript, Node.js apps bring with them a huge advantage: the comfort of programming everything - the frontend and the backend - in a single language
>> You have a huge opportunity because we know how hard it is to fully, deeply learn a programming language, and by using the same language to perform all your work on the web - both on the client and on the server, you're in a unique position of advantage
>> What changes is the ecosystem
    >> In the browser, most of the time what you are doing is interacting with the DOM, or other Web Platform APIs like Cookies
    >> Those do not exist in Node.js, of course. You don't have the document, window and all the other objects that are provided by the browser
    >> And in the browser, we don't have all the nice APIs that Node.js provides through its modules, like the filesystem access functionality
    >> Another big difference is that in Node.js you control the environment
        >> Unless you are building an open source application that anyone can deploy anywhere, you know which version of Node.js you will run the application on
        >> Compared to the browser environment, where you don't get the luxury to choose what browser your visitors will use, this is very convenient
        >> This means that you can write all the modern ES6-7-8-9 JavaScript that your Node.js version supports
    >> Since JavaScript moves so fast, but browsers can be a bit slow to upgrade, sometimes on the web you are stuck with using older JavaScript / ECMAScript releases
    >> You can use Babel to transform your code to be ES5-compatible before shipping it to the browser, but in Node.js, you won't need that
    >> Another difference is that Node.js supports both the CommonJS and ES module systems (since Node.js v12), while in the browser we are starting to see the ES Modules standard being implemented
    >> In practice, this means that you can use both require() and import in Node.js, while you are limited to import in the browser

*** Node.js Event emitter ***

If you worked with JavaScript in the browser, you know how much of the interaction of the user is handled through events: mouse clicks, keyboard button presses, reacting to mouse movements, and so on

On the backend side, Node.js offers us the option to build a similar system using the `events` module

This module, in particular, offers the `EventEmitter` class, which we'll use to handle our events

You initialize that using: 
```js
  const EventEmitter = require('events');

  const eventEmitter = new EventEmitter();
```
This object exposes, among many others, the on and emit methods
* emit is used to trigger an event
* on is used to add a callback function that's going to be executed when the event is triggered

For example, let's create a start event, and as a matter of providing a sample, we react to that by just logging to the console:
```js
eventEmitter.on('start', () => {
  console.log('started');
});

// When we run
eventEmitter.emit('start');
// event handler function is triggered, and we get the console log
```
You can pass arguments to the event handler by passing them as additional arguments to emit():
```js
eventEmitter.on('start', number => {
  console.log(`started ${number}`);
});

eventEmitter.emit('start', 23);

// multiple arguments
eventEmitter.on('start', (start, end) => {
  console.log(`started from ${start} to ${end}`);
});

eventEmitter.emit('start', 1, 100);
```
EventEmitter object also exposes several other methods to interact with events, like
* `once()`: add a one-time listener
* `removeListener()` / `off()`: remove an event listener from an event
* `removeAllListeners()`: remove all listeners for an event


*** Node.js events module ***

`events` module provides us the EventEmitter class, which is key to working with events in Node.js

```js
const EventEmitter = require('events');

const door = new EventEmitter();
```
event listener has these in-built events: 
* `newListener` when a listener is added
* `removeListener` when a listener is removed

Here's a detailed description of the most useful methods: 
**emitter.addListener()**

Alias for emitter.on()

**emitter.emit()**

Emits an event. It synchronously calls every event listener in the order they were registered: `door.emit('slam'); // emitting the event "slam"`

**emitter.eventNames()**

Return an array of strings that represent the events registered on the current EventEmitter object: `door.eventNames();`

**emitter.getMaxListeners()**

Get the maximum amount of listeners one can add to an EventEmitter object, which defaults to 10 but can be increased or lowered by using setMaxListeners(): `door.getMaxListeners();`

**emitter.listenerCount()**

Get the count of listeners of the event passed as parameter: `door.listenerCount('open');`

**emitter.listeners()**

Gets an array of listeners of the event passed as parameter: `door.listeners('open');`

**emitter.off()**

Alias for emitter.removeListener() added in Node.js 10

**emitter.on()**

Adds a callback function that's called when an event is emitted
```js
door.on('open', () => {
  console.log('Door was opened');
});
```
**emitter.once()**

Adds a callback function that's called when an event is emitted for the first time after registering this. This callback is only going to be called once, never again
```js
const EventEmitter = require('events');

const ee = new EventEmitter();

ee.once('my-event', () => {
  // call callback function once
});
```

**emitter.prependListener()**

When you add a listener using on or addListener, it's added last in the queue of listeners, and called last. Using prependListener it's added, and called, before other listeners

**emitter.prependOnceListener()**

When you add a listener using `once`, it's added last in the queue of listeners, and called last. Using `prependOnceListener` it's added, and called, before other listeners

**emitter.removeAllListeners()**

Removes all listeners of an EventEmitter object listening to a specific event: `door.removeAllListeners('open');`

**emitter.removeListener()**

Remove a specific listener. You can do this by saving the callback function to a variable, when added, so you can reference it later:
```js
const doSomething = () => {};
door.on('open', doSomething);
door.removeListener('open', doSomething);
```
**emitter.setMaxListeners()**

Sets the maximum amount of listeners one can add to an EventEmitter object, which defaults to 10 but can be increased or lowered: i.e. `door.setMaxListeners(50);`