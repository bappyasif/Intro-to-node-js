let async = require("async");
let Book = require("../models/book");
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookInstance');


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
 * Book detail page needs to display the information for a specific Book 
    * (identified using its automatically generated _id field value)
    * along with information about each associated copy in the library (BookInstance)
 * Wherever we display an author, genre, or book instance, these should be linked to the associated detail page for that item
 * 
 * method uses async.parallel() to find the Book and its associated copies (BookInstances) in parallel
 * approach is exactly the same as described for the Genre detail page
 * Since the key 'title' is used to give name to the webpage (as defined in the header )
    * this time we are passing results.book.title while rendering the webpage
 */
let book_detail = (req, res, next) => {
    async.parallel({
        book: function(callback) {

            Book.findById(req.params.id)
              .populate('author')
              .populate('genre')
              .exec(callback);
        },
        book_instance: function(callback) {

          BookInstance.find({ 'book': req.params.id })
          .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.book==null) { // No results.
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('book_detail', { title: results.book.title, book: results.book, book_instances: results.book_instance } );
    });
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