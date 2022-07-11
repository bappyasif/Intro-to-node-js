let EventEmitter = require('events')

let uuid = require('uuid')

console.log(uuid.v4())

// creating class
class SomeLoggerClass extends EventEmitter {
    log(msg) {
        this.emit('msg', {id: uuid.v4(), msg})
    }
}

module.exports = SomeLoggerClass;