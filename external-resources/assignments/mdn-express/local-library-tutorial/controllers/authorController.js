let Author = require("../models/author");

// Display list of all authors
// exports.author_list = (req, res) => {
//     res.send('Not implemented: author list')
// }
// let author_list = (req, res) => {
//     res.send('Not implemented: author list')
// }

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * author list controller function needs to get a list of all Author instances, 
 * and then pass these to the template for rendering
 * author list page needs to display a list of all authors in the database, 
 * with each author name linked to its associated author detail page
 * 
 * method uses the model's find(), sort() and exec() functions to return all Author objects sorted by family_name in alphabetic order
 * callback passed to the exec() method is called with any errors (or null) as the first parameter, or a list of all authors on success
 * If there is an error it calls the next middleware function with the error value, 
 * and if not it renders the author_list(.ejs) template, passing the page title and the list of authors (author_list)
 */
let author_list = (req, res, next) => {
    Author.find()
    .sort([['family_name', 'ascending']])
    .exec((err, list_authors) => {
        if(err) return next(err)
        // success thus commencing render
        res.render('author_list', {title: "Author List", author_list: list_authors})
    })
}

// Display detail page for a specific Author
let author_detail = (req, res) => {
    res.send('Not implemented: author detail' + req.params.id)
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