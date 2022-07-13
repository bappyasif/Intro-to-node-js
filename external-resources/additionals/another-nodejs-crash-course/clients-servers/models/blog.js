let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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
}, {timestamps: true})

// storing model for this specified schema
Blog = mongoose.model('Blog', blogSchema);

// exporting this model for accessibility from our app.js
module.exports = Blog;