let eventEmitter = require('events');

// create class
class SomeEmitter extends eventEmitter {}

// initialize object
let smEmitter = new SomeEmitter();

// event listener
smEmitter.on('customEvent', () => console.log('event fired'))

// event emit
smEmitter.emit('customEvent')