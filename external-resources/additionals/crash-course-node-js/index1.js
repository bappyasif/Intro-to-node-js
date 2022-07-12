// let person = require('./person');
let Person = require('./person');
// import {Person} from './person' // node hasnt implemented this yet, needs babel to transpile it
let persoonEen = new Person.pCls('john doe', 31)

// console.log('hallo van node js', person, person.name)
console.log('hallo van node js', Person.pObj, Person.pObj.name)
persoonEen.greeting();

// accessing Logger
let SomeLoggerClass = require('./crash-course-node-js/logger');

// instantiating objhect
let logger = new SomeLoggerClass();

// setting up logger event
logger.on('msg', data => console.log(`called Listener: `, data))
// logger.on('msg', data => console.log(`called Listener: ${data}`))

// calling on logger event
logger.log('hello world')
logger.log('helloooo world')
logger.log('hello world!!!!')
logger.log('hallo werld')