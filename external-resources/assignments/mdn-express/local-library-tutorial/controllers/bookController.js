let async = require("async");
let Book = require("../models/book");
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookInstance');

// imports for create book
let {body, validationResult} = require("express-validator")


/**
 * 
 * @param {*} req 
 * @param {*} res 
 > index controller function needs to fetch information about how many Book, BookInstance, 
   available BookInstance, Author, and Genre records we have in the database, render this data 
   in a template to create an HTML page, and then return it in an HTTP response
 > We use the countDocuments() method to get the number of instances of each model
   > This is called on a model, with an optional set of conditions to match against in the first argument, 
     and a callback in the second argument (as discussed in Using a Database (with Mongoose), 
     and you can also return a Query and then execute it with a callback later)
 > callback will be invoked when the database returns the count, 
   with an error value as the first parameter (or null) 
   and the count of documents as the second parameter (or null if there was an error)
   
   SomeModel.countDocuments({ a_model_field: 'match_value' }, (err, count) => {
    // Do something if there is an err
    // Do something with the count if there was no error
   });

 > async.parallel() method is passed an object with functions for getting the counts for each of our models
 > These functions are all started at the same time
 > When all of them have completed the final callback is invoked with the counts in the results parameter (or an error)
 > On success the callback function calls res.render(), specifying a view (template) named 'index' and an object containing the data 
   that is to be inserted into it (this includes the results object that contains our model counts)
 > data is supplied as key-value pairs, and can be accessed in the template using the key
 > async.parallel() used is a little unusual in that we render the page whether or not there was an error (normally you might use a separate execution path for handling the display of errors)
 */

let index = (req, res) => {
    async.parallel({
        book_count(cb) {
            // Pass an empty object as match condition to find all documents of this collection
            Book.countDocuments({}, cb)
        },
        book_instance_count(cb) {
            BookInstance.countDocuments({}, cb)
        },
        book_instance_available_count(cb) {
            BookInstance.countDocuments({status: "Available"}, cb)
        },
        author_count(cb) {
            Author.countDocuments({}, cb)
        },
        genre_count(cb) {
            Genre.countDocuments({}, cb)
        }
    },
    (err, results) => {
        res.render("index", {title: "Local Library Home Page", error: err, data: results})
    });
}

// exports.index = function(req, res) {
//     res.send('NOT IMPLEMENTED: Site Home Page');
// };
// let index = function(req, res) {
//     res.send('NOT IMPLEMENTED: Site Home Page');
// };

// Display list of all books
// let book_list = (req, res) => {
//     res.send('NOT IMPLEMENTED: Book list');
// }
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * This page needs to display a list of all books in the database along with their author, 
 * with each book title being a hyperlink to its associated book detail page
 * book list controller function needs to get a list of all Book objects in the database, 
 * sort them, and then pass these to the template for rendering
 * 
 * method uses the model's find() function to return all Book objects, 
 * selecting to return only the title and author as we don't need the other fields (it will also return the _id and virtual fields), 
 * and then sorts the results by the title alphabetically using the sort() method
 * 
 * On success, the callback passed to the query renders the book_list(.ejs) template, 
 * passing the title and book_list (list of books with authors) as variables
 */
let book_list = (req, res, next) => {
    Book.find({}, "title author")
    .sort({title: 1})
    .populate('author')
    .exec((err, list_books) => {
        if(err) return next(err)
        // successfull, so commence rendering
        res.render('book_list', {title: "Book List", book_list: list_books})
    })
}

// Display a specefic book detail page
// let book_detail = (req, res) => {
//     res.send('NOT IMPLEMENTED: Book detail ' + req.params.id);
// }
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * Book detail page needs to display the information for a specific Book (identified using its automatically generated _id field value), along with information about each associated copy in the library (BookInstance)
 * Wherever we display an author, genre, or book instance, these should be linked to the associated detail page for that item
 * 
 * method uses async.parallel() to find the Book and its associated copies (BookInstances) in parallel
 * Since the key 'title' is used to give name to the webpage (as defined in the header in 'head.ejs'), this time we are passing results.book.title while rendering the webpage
 * 
 */
let book_detail = (req, res, next) => {
    async.parallel(
        {
            book(cb) {
                Book.findById(req.params.id)
                .populate("author")
                .populate("genre")
                .exec(cb)
            },

            book_instance(cb) {
                BookInstance.find({book: req.params.id}).exec(cb)
            }
        },

        (err, results) => {
            if(err) return next(err)

            // if results are empty
            if(results.book == null) {
                let err = new Error("Book is not found")
                err.status = 404;
                return next(err)
            }

            // success, so commence rendering
            res.render("book_detail", {
                title: results.book.title,
                book: results.book,
                book_instances: results.book_instance
            })
        }
    )
}

// Display book create form on GET
// let book_create_get = (req, res) => {
//     res.send('NOT IMPLEMENTED: Book create GET');
// }
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * Display book create form on GET.
 * This uses the async module to get all Author and Genre objects
 * These are then passed to the view book_form.ejs as variables named authors and genres (along with the page title)
 */
let book_create_get = (req, res, next) => {
    // Get all authors and genres, which we can use for adding to our book
    async.parallel(
        {
            authors(cb) {
                Author.find(cb)
            },

            genres(cb) {
                Genre.find(cb)
            }
        },
        
        // callback function
        (err, results) => {
            if(err) return next(err)

            // success, so render book form
            res.render("book_form", {
                title: "Create Book",
                authors: results.authors,
                genres: results.genres,
                book: '',
                errors: ''
            })
        }
    )
}

// Handle book create form on POST
// let book_create_post = (req, res) => {
//     res.send('NOT IMPLEMENTED: Book create POST');
// }
// Handle book create on POST
/**
 * structure and behavior of this code is almost exactly the same as for creating a Genre or Author object
 * First we validate and sanitize the data
 * If the data is invalid then we re-display the form along with the data that was originally entered by the user and a list of error messages
 * If the data is valid, we then save the new Book record and redirect the user to the book detail page
 * 
 * main difference with respect to the other form handling code is how we sanitize the genre information
 * form returns an array of Genre items (while for other fields it returns a string)
 * In order to validate the information we first convert the request to an array (required for the next step)
 * We then use a wildcard (*) in the sanitizer to individually validate each of the genre array entries
 * final difference with respect to the other form handling code is that we need to pass in all existing genres and authors to the form
 * In order to mark the genres that were checked by the user we iterate through all the genres and add the checked='true' parameter to those that were in our post data
 */
let book_create_post = [
    // Convert the genre to an array
    (req, res, next) => {
        if(!Array.isArray(req.body.genre)) {
            req.body.genre = typeof req.body.genre === undefined ? [] : [req.body.genre]
        }
        next()
    },

    // validate and sanitize fields
    body("title", "Title field must not be empty")
    .trim()
    .isLength({min: 1})
    .escape(),
    body("author", "Author field must not be empty")
    .trim()
    .isLength({min: 1})
    .escape(),
    body("summary", "Summary field must not be empty")
    .trim()
    .isLength({min: 1})
    .escape(),
    body("isbn", "ISBN field must not be empty")
    .trim()
    .isLength({min: 1})
    .escape(),
    body("genre.*").escape(), // using wildcard to sanitize every item below key genre

    // Process request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request
        let errors = validationResult(req);

        // Extract the validation errors from a request
        let book = new Book({
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: req.body.genre,

        });

        console.log(req.body.genre, typeof req.body.genre, 'req.body.genre', req.body.author )

        if(!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            
            // Get all authors and genres for form
            async.parallel(
                {
                    authors(cb) {
                        Author.find(cb)
                    },

                    genres(cb) {
                        Genre.find(cb)
                    }
                },
                
                // callback handler
                (err, results) => {
                    if(err) return next(err)

                    // Mark our selected genres as checked
                    for(let genre of results.genres) {
                        if(book.genre.includes(genre._id)) {
                            // Current genre is selected. Set "checked" flag
                            genre.checked = true
                        }
                    }

                    // render form with previously form values
                    res.render("book_form", {
                        title: "Create Book",
                        authors: results.authors,
                        genres: results.genres,
                        book: book,
                        errors: errors.array()

                    })
                }
            )
            return;
        }

        // Data from form is valid. Save book
        book.save(err => {
            if(err) return next(err)

            // Successful: redirect to new book record
            console.log(book.genre, "genre!!")
            res.redirect(book.url)
        })
    }
]

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