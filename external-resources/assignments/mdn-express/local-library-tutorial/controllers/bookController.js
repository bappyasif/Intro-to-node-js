let Book = require("../models/book");

// exports.index = function(req, res) {
//     res.send('NOT IMPLEMENTED: Site Home Page');
// };
let index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all books
let book_list = (req, res) => {
    res.send('NOT IMPLEMENTED: Book list');
}

// Display a specefic book detail page
let book_detail = (req, res) => {
    res.send('NOT IMPLEMENTED: Book detail '+ req.params.id);
}

// Display book create form on GET
let book_create_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Book create GET');
}

// Handle book create form on POST
let book_create_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Book create POST');
}

// Display book delete form on GET
let book_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Book delete GET');
}

// Handle book delete form on POST
let book_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Book delete POST');
}

// Display book update form on GET
let book_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Book update GET');
}

// Handle book update form on POST
let book_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Book update POST');
}

module.exports = {
    index,
    book_list,
    book_detail,
    book_create_get,
    book_create_post,
    book_delete_get,
    book_delete_post,
    book_update_get,
    book_update_post
}