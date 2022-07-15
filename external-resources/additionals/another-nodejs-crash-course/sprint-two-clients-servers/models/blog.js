let mongoose = require('mongoose');

let Schema = mongoose.Schema;

// document structure
let blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true}); // timestamps will auto assign timestamp for any document creation or update process on db

// creating model for schema
let Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;