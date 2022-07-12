let name1 = 'hoxieloxie';

console.log(name1)

let greet = name => console.log(`hello ${name}`)

greet('hoxie')
greet('loxie')

// global object
// console.log(global);
global.setTimeout(() => console.log('timed out!!'), 2000)

setTimeout(() => {
    console.log('timed out!!')
    clearInterval(sint)
}, 2000)

let sint = setInterval(() => console.log('in interval'), 400)

console.log(__dirname, __filename)

// modules imports or exports
let xyz = require('./people');
let {people, ages} = require('./people'); // using destructuring, names has to be same as exported property

// console.log(xyz) // {} ecause thats not exported from people module

console.log(xyz);

console.log(xyz.people, xyz.ages);

console.log(people, ages)

// os module
let os = require('os')

console.log(os.platform(), os.homedir())