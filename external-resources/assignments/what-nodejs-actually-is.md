> Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient
> Node.js® is a JavaScript runtime built on Chrome’s V8 JavaScript engine
> Node.js’ package ecosystem, npm, is the largest ecosystem of open source libraries in the world

** Blocking I/O **
>> In the blocking method, user2's data request is not initiated until user1's data is printed to the screen
>> If this was a web server, we would have to start a new thread for every new user
>> But JavaScript is single-threaded (not really, but it has a single-threaded event loop, which we’ll discuss a bit later)
>> So this would make JavaScript not very well suited for multi-threaded tasks
>> That’s where the non-blocking part comes in

** Non-blocking I/O **
>> On the other hand, using a non-blocking request, you can initiate a data request for user2 without waiting for the response to the request for user1
>> You can initiate both requests in parallel
>> This non-blocking I/O eliminates the need for multi-threading since the server can handle multiple requests at the same time

** JavaScript event loop **
```js
        console.log('starting app');

        setTimeout(() => console.log('inside callback'), 2000)

        setTimeout(() => console.log('second callback'), 0)

        console.log('finishing app');
```
* Push main() onto the call stack.
* Push console.log() onto the call stack, This then runs right away and gets popped
* Push setTimeout(2000) onto the stack, setTimeout(2000) is a Node API, When we call it, we register the event-callback pair, event will wait 2000 milliseconds, then callback is the function
* After registering it in the APIs, setTimeout(2000) gets popped from the call stack
* Now the second setTimeout(0) gets registered in the same way, We now have two Node APIs waiting to execute
* After waiting for 0 seconds, setTimeout(0) gets moved to the callback queue, and the same thing happens with setTimeout(2000)
* In the callback queue, the functions wait for the call stack to be empty, because only one statement can execute a time
* This is taken care of by the event loop
* last console.log() runs, and the main() gets popped from the call stack
* event loop sees that the call stack is empty and the callback queue is not empty
* So it moves the callbacks (in a first-in-first-out order) to the call stack for execution

** npm **
>> These are libraries built by the awesome community which will solve most of your generic problems
>> npm (Node package manager) has packages you can use in your apps to make your development faster and efficient

** require **
>> Require does three things:
* It loads modules that come bundled with Node.js like file system and HTTP from the Node.js API
* It loads third-party libraries like Express and Mongoose that you install from npm
* It lets you require your own files and modularize the project
* Require is a function, and it accepts a parameter “path” and returns module.exports

** Node Modules **
>> A Node module is a reusable block of code whose existence does not accidentally impact other code
>> You can write your own modules and use it in various application
>> Node.js has a set of built-in modules which you can use without any further installation

** V8 turbo-charges JavaScript by leveraging C++ **
>> V8 is an open source runtime engine written in C++
>> JavaScript -> V8(C++) -> Machine Code
>> V8 implements a script called ECMAScript as specified in ECMA-262
>> V8 can run standalone or can be embedded into any C++ application, It has hooks that allow you to write your own C++ code that you can make available to JavaScript
>> This essentially lets you add features to JavaScript by embedding V8 into your C++ code so that your C++ code understands more than what the ECMAScript standard otherwise specifies

** Events **
>> Something that has happened in our app that we can respond to
>> There are two types of events in Node: 
* System Events: C++ core from a library called libuv. (For example, finished reading a file)
* Custom Events: JavaScript core



*** Seven Awesome Things You Can Build with Node.js ***
>> Node.js is not just for making simple websites, but awesome, dynamic, real-time experiences
>> Here are 7 Awesome Things you Can build with Node.js

* GIF Chat Room: 
  * Node.js is built for making chat applications
  * Chrome and Firefox have an API to access a computer’s camera
  * Images from the camera get processed around the submission of a chat message and a GIF is sent to the room
* Build your Own Zoom: 
  * With the rise of working from home and modern Web APIs like WebRTC being supported by more and more browsers, Zoom & Google Hangout-like applications are going to get more common
  * Talky.io is one of those.
* Job Search App: 
  * Node’s capabilities to communicate with APIs make it ideal for building full stack applications
  * for example, using the Adzuna jobs API, vanilla JS, and Node to create a job searching app and add custom features you’d like to see in your favorite app
* Covid-19 Tracker: 
  * Node.js is a powerful tool for writing server side JavaScript and allows you to interact with APIs and pass data to the front end
  * You can use Node.js in combination with React and chart.js to create a COVID tracking app
  * by pulling data from the CDC so you can stay up to date with stats
* Command Line Interface: 
  * Building things in Node.js doesn’t always have to be for recreation, there’s utility in it too
  * you can build a command line interface that has CRUD capabilities
* Collaborative Drawing Tool: 
  * learn how to build a simple drawing application in jQuery in the course jQuery Basics
  * functionality has been extended with Node.js so that multiple people can draw on the same canvas
* RSS Reader: 
  * With Node.js you could build cross-platform applications to run on your desktop, such as a RSS reader
