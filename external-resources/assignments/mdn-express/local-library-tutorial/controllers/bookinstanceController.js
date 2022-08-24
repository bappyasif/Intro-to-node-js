let BookInstance = require("../models/bookInstance");

// imports for bookInstance form
let {body, validationResult} = require("express-validator")
let Book = require("../models/book")

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
        console.log(list_bookinstances, 'list_bookinstances')
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
 * @param {*} next
 * BookInstance detail page needs to display the information for each BookInstance, identified using its (automatically generated) _id field value
 * This will include the Book name (as a link to the Book detail page) along with other information in the record
 * 
 * method calls BookInstance.findById() with the ID of a specific book instance extracted from the URL (using the route), and accessed within the controller via the request parameters: req.params.id)
 * It then calls populate() to get the details of the associated Book
 */
let bookinstance_detail = (req, res, next) => {
    BookInstance.findById(req.params.id)
    .populate("book")
    .exec((err, bookinstance) => {
        if(err) return next(err)

        // no results, return err
        if(bookinstance == null) {
            let err = new Error("Book copy not found")
            err.staus = 404;
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
// let bookinstance_create_get = (req, res) => {
//     res.send('NOT IMPLEMENTED: BookInstance create GET');
// }
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * controller gets a list of all books (book_list) and passes it to the view along with title
 */
let bookinstance_create_get = (req, res, next) => {
    Book.find({}, "title").exec((err, books) => {
        if(err) return next(err);

        // successful, so lets render
        res.render("bookinstance_form", {
            title: "Create BookInstance",
            book_list: books,
            selected_book: '',
            bookinstance: '',
            errors: ''
        })
    })
}

// Handle BookInstance create form on POST
// let bookinstance_create_post = (req, res) => {
//     res.send('NOT IMPLEMENTED: BookInstance create POST');
// }
// Handle BookInstance create on POST
/**
 * 
 * First we validate and sanitize the data
 * If the data is invalid, we then re-display the form along with the data that was originally entered by the user and a list of error messages
 * If the data is valid, we save the new BookInstance record and redirect the user to the detail page
 */
let bookinstance_create_post = [
    // Validate and sanitize fields
    body("book", "Book must be specified").trim().isLength({min: 1}).escape(),
    body("imprint", "Imprint must be specified").trim().isLength({min: 1}).escape(),
    body("status").escape(),
    body("due_back", "Invalid Date").optional({checkFalsy: true}).isISO8601().toDate(),

    // Process request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request
        let errors = validationResult(req);

        // Create a BookInstance object with escaped and trimmed data
        let bookInstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back_formatted
        });

        // when submission contains errors
        if(!errors.isEmpty()) {
            // There are errors, so render form again with sanitized values and error messages
            Book.find({}, "title").exec((err, books) => {
                if(err) return next(err);
                // console.log(bookInstance, bookInstance.url)
                // sucessful, so lets render
                res.render("bookinstance_form", {
                    title: "Create BookInstance",
                    book_list: books,
                    selected_book: bookInstance.book._id,
                    errors: errors.array(),
                    bookinstance: bookInstance
                })
            })
            return
        }

        // Data from form is valid
        bookInstance.save(err => {
            if(err) return next(err);

            // successful, lets redirect to new record
            console.log(bookInstance, bookInstance.url)
            res.redirect(bookInstance.url)
        })
    }
]

// display BookInstance delete form on GET
// let bookinstance_delete_get = (req, res) => {
//     res.send('NOT IMPLEMENTED: BookInstance delete GET');
// }
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * there are no dependent objects
 * just find the associated record and render it
 */
let bookinstance_delete_get = (req, res, next) => {
    BookInstance.findById(req.params.id)
    .populate("book")
    .exec((err, book_instance) => {
        if(err) return next(err)

        // if empty, throw error
        if(book_instance === null) {
            let err = new Error("No book instance found");
            err.status = 404;
            return next(err)
        }

        // success, so pass onto rendering
        console.log(book_instance, "book_instance")
        // res.send(book_instance)
        res.redirect(`/catalog/bookinstance/${book_instance._id}`)
    })
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