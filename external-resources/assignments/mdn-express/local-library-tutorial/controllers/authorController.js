let Author = require("../models/author");

// Display list of all authors
// exports.author_list = (req, res) => {
//     res.send('Not implemented: author list')
// }
let author_list = (req, res) => {
    res.send('Not implemented: author list')
}

// Display detail page for a specific Author
let author_detail = (req, res) => {
    res.send('Not implemented: author detail'+ req.params.id)
}

// Display Author create form on GET
let author_create_get = (req, res) => {
    res.send('Not implemented: author create get')
}

// Handle author create on post request
let author_create_post = (req, res) => {
    res.send('Not implemented: author create post')
}

// Display Author delete form on GET
let author_delete_get = (req, res) => {
    res.send('Not implemented: author delete get')
}

// Handle author delete on post request
let author_delete_post = (req, res) => {
    res.send('Not implemented: author delete post')
}

// Display Author update form on GET
let author_update_get = (req, res) => {
    res.send('Not implemented: author update get')
}

// Handle author update on post request
let author_update_post = (req, res) => {
    res.send('Not implemented: author update post')
}

module.exports = {
    author_list,
    author_detail,
    author_create_get,
    author_create_post,
    author_delete_get,
    author_delete_post,
    author_update_get,
    author_update_post
}