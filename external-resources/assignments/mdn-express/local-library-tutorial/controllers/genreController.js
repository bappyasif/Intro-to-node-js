let Genre = require("../models/genre");

// for genre detail page
let Book = require("../models/book")
let async = require("async")

// for genre create form
let { body, validationResult } = require("express-validator")
/**
 * or alternatively for same imports as above
const validator = require("express-validator");
const body = validator.body;
const validationResult = validator.validationResult;
 */

// Display list of all genre
// exports.genre_list = function(req, res) {
//     res.send('NOT IMPLEMENTED: Genre list');
// };
// let genre_list = function(req, res) {
//     res.send('NOT IMPLEMENTED: Genre list');
// };

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * page should display a list of all genres in the database, 
 * with each genre linked to its associated detail page
 * 
 */
let genre_list = (req, res, next) => {
    Genre.find()
        .sort([['name', 'ascending']])
        .exec((err, list_genres) => {
            if (err) return next(err)
            // success, so begin rendering
            res.render("genre_list", { title: "Genre List", genre_list: list_genres })
        })
}

// Display detail page for a specific genre
// let genre_detail = function(req, res) {
//     res.send('NOT IMPLEMENTED: Genre detail' + req.params.id);
// };
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * page should display the genre name and a list of all books in the genre with links to each book's details page
 * 
 * method uses async.parallel() to query the genre name and its associated books in parallel, with the callback rendering the page when (if) both requests complete successfully
 * ID of the required genre record is encoded at the end of the URL and extracted automatically based on the route definition (/genre/:id)
 * ID is accessed within the controller via the request parameters: req.params.id
 * It is used in Genre.findById() to get the current genre
 * It is also used to get all Book objects that have the genre ID in their genre field: Book.find({ 'genre': req.params.id })
 * 
 * rendered view is genre_detail and it is passed variables for the title, genre and the list of books in this genre (genre_books)
 */
let genre_detail = (req, res, next) => {
    async.parallel(
        {
            genre(cb) {
                Genre.findById(req.params.id).exec(cb)
            },
            genre_books(cb) {
                Book.find({ genre: req.params.id }).exec(cb)
            }
        },
        (err, results) => {
            if (err) return next(err);

            // no results, return error
            if (results.genre == null) {
                let err = new Error("Genre is not found");
                err.status = 404;
                return next(err);
            }

            // success, so commence rendering
            res.render("genre_detail", {
                title: "Genre Detail",
                genre: results.genre,
                genre_books: results.genre_books
            })
        }
    )
};

// Display Genre create form on GET request
// let genre_create_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: Genre create GET');
// };
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * Genre has only one field, its name, and no dependencies
 * Like any other pages, we need to set up routes, controllers, and views
 * 
 * This renders the genre_form.ejs view, passing a title variable
 */
let genre_create_get = (req, res, next) => {
    res.render("genre_form", { title: "Create Genre", genre: '' });
};

// Hnadle Genre create form on POST request
// let genre_create_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: Genre create POST');
// };
/**
 * first thing to note is that instead of being a single middleware function (with arguments (req, res, next)) the controller specifies an array of middleware functions
 * array is passed to the router function and each method is called in order
 * This approach is needed, because the validators are middleware functions.
 * 
 * first method in the array defines a body validator (body()) that validates and sanitizes the field. This uses trim() to remove any trailing/leading whitespace, checks that the name field is not empty, and then uses
 * This uses trim() to remove any trailing/leading whitespace, checks that the name field is not empty, and then uses escape() to remove any dangerous HTML characters)
 * 
 * After specifying the validators we create a middleware function to extract any validation errors
 * If there are then we render the form ag
 * If there are then we render the form again, passing in our sanitized genre object and the array of error messages (errors.array())
 * This same pattern is used in all our post controllers: we run validators (with sanitizers), then check for errors and either re-render the form with error information or save the data
 * 
 * same view is rendered in both the GET and POST controllers/routes when we create a new Genre (and later on it is also used when we update a Genre)
 * In the GET case the form is empty, and we just pass a title variable
 * In the POST case the user has previously entered invalid data—in the genre variable we pass back a sanitized version of the entered data and in the errors variable we pass back an array of error messages
 *      
 */
let genre_create_post = [
    // Validate and sanitize the name field
    body("name", "Genre name is required")
    .trim()
    .isLength({min: 2})
    .escape(),

    // Process request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data
        let genre = new Genre({name: req.body.name})

        // if error, Render the form again with sanitized values/error messages
        if(!errors.array()) {
            res.render("genre_form", {
                title: "Create Genre",
                genre: genre,
                errors: errors.array()
            })

            return;
        } else {
            // Data from form is valid
            // Check if Genre with same name already exists
            Genre.findOne({name:req.body.name}).exec((err, _genre_) => {
                if(err) return next(err);

                // genre found, redirect to detail page
                if(_genre_) {
                    res.redirect(_genre_.url)
                } else {
                    genre.save(err => {
                        if(err) return next(err);

                        // genre saved, redirect to genre detal page
                        res.redirect(genre.url);
                    })
                }               
            })
        }
    }
];

// Display Genre delete form on GET request
let genre_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Hnadle Genre delete form on POST request
let genre_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET request
let genre_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Hnadle Genre update form on POST request
let genre_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};

module.exports = {
    genre_list,
    genre_detail,
    genre_create_get,
    genre_create_post,
    genre_delete_get,
    genre_delete_post,
    genre_update_get,
    genre_update_post
}