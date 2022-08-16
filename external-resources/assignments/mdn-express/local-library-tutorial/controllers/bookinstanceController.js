let BookInstance = require("../models/bookInstance");

// Display list of all BookInstances.
// exports.bookinstance_list = function(req, res) {
//     res.send('NOT IMPLEMENTED: BookInstance list');
// };
// let bookinstance_list = function(req, res) {
//     res.send('NOT IMPLEMENTED: BookInstance list');
// };
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * BookInstance list controller function needs to get a list of all book instances, 
 * populate the associated book information, and then pass the list to the template for rendering
 * method uses the model's find() function to return all BookInstance objects
 * It then daisy-chains a call to populate() with the book field —this will replace the book id stored for each BookInstance with a full Book document
 * On success, the callback passed to the query renders the bookinstance_list(.ejs) template, passing the title and bookinstance_list as variables
 */
let bookinstance_list = (req, res, next) => {
    BookInstance.find()
    .populate("book")
    .exec((err, list_bookinstances) => {
        if(err) return next(err)
        // successfull so commencing render
        res.render('bookinstance_list', {title: "Book Instance List", bookinstance_list: list_bookinstances})
    })
}

// display detail page for a specific BookInstance
// let bookinstance_detail = function(req, res) {
//     res.send('NOT IMPLEMENTED: BookInstance detail'+ req.params.id);
// };
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * BookInstance detail page needs to display the information for each BookInstance
 * identified using its (automatically generated) _id field value
 * This will include the Book name (as a link to the Book detail page) along with other information in the record
 * 
 * method calls BookInstance.findById() with the ID of a specific book instance extracted from the URL (using the route)
 * and accessed within the controller via the request parameters: req.params.id)
 * It then calls populate() to get the details of the associated Book
 */
let bookinstance_detail = (req, res, next) => {
    BookInstance.findById(req.params.id)
    .populate("book")
    .exec((err, bookinstance) => {
        if(err) return next(err)
        // if empty return err
        if(bookinstance == null) {
            let err = new Error("Book copy not found")
            err.status = 404;
            return next(err)
        }
        // success, so commence rendering
        res.render("bookinstance_detail", {
            title: `Copy: ${bookinstance.book.title}`,
            bookinstance: bookinstance
        })
    })
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