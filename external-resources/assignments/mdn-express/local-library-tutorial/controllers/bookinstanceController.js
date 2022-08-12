let BookInstance = require("../models/bookInstance");

// Display list of all BookInstances.
// exports.bookinstance_list = function(req, res) {
//     res.send('NOT IMPLEMENTED: BookInstance list');
// };
let bookinstance_list = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance list');
};

// display detail page for a specific BookInstance
let bookinstance_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance detail'+ req.params.id);
};

// display BookInstance create form on GET
let bookinstance_create_get = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance create GET');
}

// Handle BookInstance create form on POST
let bookinstance_create_post = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance create POST');
}

// display BookInstance delete form on GET
let bookinstance_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
}

// Handle BookInstance delete form on POST
let bookinstance_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance delete POST');
}

// display BookInstance update form on GET
let bookinstance_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance update GET');
}

// Handle BookInstance update form on POST
let bookinstance_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance update POST');
}

module.exports = {
    bookinstance_list,
    bookinstance_detail,
    bookinstance_create_get,
    bookinstance_create_post,
    bookinstance_delete_get,
    bookinstance_delete_post,
    bookinstance_update_get,
    bookinstance_update_post
}