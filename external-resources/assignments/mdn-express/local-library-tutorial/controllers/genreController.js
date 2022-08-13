let Genre = require("../models/genre");

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
let genre_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre detail' + req.params.id);
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