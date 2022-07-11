// module wrapper funtion
// (function(exports, require, module, __filename, __dirname){})
console.log(__dirname, __filename, 'this is actually wrap around every module that we create and run by node')

let person = {
    name: 'ab',
    age: '99'
}

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greeting () {
        console.log(`this is ${this.name} and im ${this.age}`)
    }
}

module.exports = {
    pObj: person,
    pCls: Person
}

// module.exports = person;