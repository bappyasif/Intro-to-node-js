let Genre = require("../models/genre");

// for genre detail page
let Book = require("../models/book")
let async = require("async")

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
        if(err) return next(err)
        // success, so begin rendering
        res.render("genre_list", {title: "Genre List", genre_list: list_genres})
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
                Book.find({genre: req.params.id}).exec(cb)
            }
        },
        (err, results) => {
            if(err) return next(err);

            // no results, return error
            if(results.genre == null) {
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
let genre_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create GET');
};

// Hnadle Genre create form on POST request
let genre_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create POST');
};

// Display Genre delete form on GET request
let genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Hnadle Genre delete form on POST request
let genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET request
let genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Hnadle Genre update form on POST request
let genre_update_post = function(req, res) {
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