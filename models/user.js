const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
    fullName: {type: Schema.Types.String, required: true},
    email: {type: Schema.Types.String, required: true},
    password: {type: Schema.Types.String, required: true},
    salt: {type: Schema.Types.String},
    hash: {type: Schema.Types.String},
    friends: Schema.Types.Array,
    frSent: Schema.Types.Array,
    frRecieved: Schema.Types.Array,
    ppBuffer: Schema.Types.Buffer,
    ppUrl: Schema.Types.String,
    cpBuffer: Schema.Types.Buffer,
    cpUrl: Schema.Types.String,
    bio: Schema.Types.String,
    webLink: Schema.Types.String,
    created: Schema.Types.Date,
    albums: Schema.Types.Array
})

module.exports = mongoose.model("user", User);