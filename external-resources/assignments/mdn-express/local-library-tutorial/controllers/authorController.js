let Author = require("../models/author");

<<<<<<< HEAD
// imports for author detail
=======
// imports for Author detail
>>>>>>> prev-mb
let Book = require("../models/book");
let async = require("async");

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
// let author_detail = (req, res) => {
//     res.send('Not implemented: author detail' + req.params.id)
// }
/**
 * 
 * @param {*} req 
 * @param {*} res 
<<<<<<< HEAD
 * author detail page needs to display the information about the specified Author, 
    * identified using their (automatically generated) _id field value, 
    * along with a list of all the Book objects associated with that Author
 * method uses async.parallel() to query the Author and their associated Book instances in parallel
 * with the callback rendering the page when (if) both requests complete successfully
 * approach is exactly the same as described for the Genre detail page
=======
 * @param {*} next 
 * author detail page needs to display the information about the specified Author, identified using their (automatically generated) _id field value, along with a list of all the Book objects associated with that Author
 * 
 * method uses async.parallel() to query the Author and their associated Book instances in parallel, with the callback rendering the page when (if) both requests complete successfully
>>>>>>> prev-mb
 */
let author_detail = (req, res, next) => {
    async.parallel(
        {
            author(cb) {
                Author.findById(req.params.id).exec(cb)
            },

            authors_books(cb) {
<<<<<<< HEAD
                Book.find({author: req.params.id}, "title summary").exec(cb)
=======
                Book.find({author: req.params.id}, "title summary")
                .exec(cb)
>>>>>>> prev-mb
            }
        },

        (err, results) => {
            if(err) return next(err)

<<<<<<< HEAD
            // empty list of results
=======
            // if empty retyrn error
>>>>>>> prev-mb
            if(results.author == null) {
                let err = new Error("Author is not found")
                err.status = 404;
                return next(err)
            }

            // success, so commence rendering
            res.render("author_detail", {
                title: "Author Detail",
                author: results.author,
<<<<<<< HEAD
                authors_books: results.authors_books
=======
                author_books: results.authors_books
>>>>>>> prev-mb
            })
        }
    )
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