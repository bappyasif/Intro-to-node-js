let mongoose = require("mongoose");

let Schema = mongoose.Schema;

// using schema for nested object values
let addressSchema = new Schema({
    street: String,
    city: String
})

// with more than just type validation
let UserSchema = new Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 26,
        // custom validation
        validate: {
            validator: v => v % 2 === 0,
            message: props => `${props.value} is not an even number`
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 8,
        maxLength: 11
    },
    createdAt: {
        type: Date,
        immutable: true,
        // this gives us a dynamic date each time
        default: () => new Date()
        // doing this gives us a static value
        // default: new Date()
    },
    updatedAt: {
        type: Date,
        // this gives us a dynamic date each time
        default: () => new Date()
    },
    bestFriend: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    hobbies: [String],
    address: addressSchema
})

// this function can nto be arrow function, as we'll be using "this" keyword in it
UserSchema.methods.sayHi = function() {
    console.log(`Hello name is ${this.name}`)
}

// static methods that is only applicable on schema model itself
UserSchema.statics.findByNameV1 = function(name) {
    return this.where({name: new RegExp(name, "i")})
}

// static methods that is only applicable on schema model itself, and will only return a single matchged record
UserSchema.statics.findByNameV2 = function(name) {
    return this.findOne({name: new RegExp(name, "i")})
}

// using method on specifically to query, and can be chainable by query
UserSchema.query.byName = function(name) {
    return this.where({name: new RegExp(name, "i")})
}

// using virtual property on model schema, this is available to an individual user
// alsop it doesnt get saved into database, rather just in codebase, and be used as helper utility
UserSchema.virtual("namedEmail").get(function() {
    return `${this.name} : ${this.email}`
})

// using middleware in mongoose
// for each and every action this middleware gets to run, depending on pre/post of that action, suchg as save(), update() and etc
UserSchema.pre("save", function(next) {
    this.updatedAt = Date.now()
    // throw new Error('Failed save')
    next();
})

// passing in doc that is being saved as an argument instead of "this"
UserSchema.post("save", function(doc, next) {
    doc.sayHi()
    next();
})


let userModel = mongoose.model("User", UserSchema);

module.exports = userModel

/**
 * 
 * 
 // with only type validation
 let UserSchema = new Schema({
    name: String,
    age: Number,
    email: String,
    createdAt: Date,
    updatedAt: Date,
    bestFriend: mongoose.Types.ObjectId,
    hobbies: [String],
    address: {
        street: String,
        city: String
    }
})
 * 
 *
 // basic schema 
 let UserSchema = new Schema({
    name: String,
    age: Number
})
 */