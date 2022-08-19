let Author = require("../models/author");

// imports for Author detail
let Book = require("../models/book");
let async = require("async");

// imports for create author form route
let {body, validationResult} = require("express-validator")

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
 * @param {*} next 
 * author detail page needs to display the information about the specified Author, identified using their (automatically generated) _id field value, along with a list of all the Book objects associated with that Author
 * 
 * method uses async.parallel() to query the Author and their associated Book instances in parallel, with the callback rendering the page when (if) both requests complete successfully
 */
let author_detail = (req, res, next) => {
    async.parallel(
        {
            author(cb) {
                Author.findById(req.params.id).exec(cb)
            },

            authors_books(cb) {
                Book.find({author: req.params.id}, "title summary")
                .exec(cb)
            }
        },

        (err, results) => {
            if(err) return next(err)

            // if empty retyrn error
            if(results.author == null) {
                let err = new Error("Author is not found")
                err.status = 404;
                return next(err)
            }

            // success, so commence rendering
            res.render("author_detail", {
                title: "Author Detail",
                author: results.author,
                author_books: results.authors_books
            })
        }
    )
}

// Display Author create form on GET
// let author_create_get = (req, res) => {
//     res.send('Not implemented: author create get')
// }
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * This renders the author_form.pug view, passing a title variable
 * also possibly "errors" and "author" as a dummy variable to view file
 */
let author_create_get = (req, res, next) => {
    res.render("author_form", {title: "Create Author", author: '', errors: ''})
}

// Handle author create on post request
// let author_create_post = (req, res) => {
//     res.send('Not implemented: author create post')
// }
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * First we validate and sanitize the data
 * If the data is invalid then we re-display the form along with the data that was originally entered by the user and a list of error messages
 * If the data is valid then we save the new author record and redirect the user to the author detail page
 * Unlike with the Genre post handler, we don't check whether the Author object already exists before saving it
    * Arguably we should, though as it is now we can have multiple authors with the same name
 * 
 * validation code demonstrates several new features: 
    * We can daisy chain validators, using withMessage() to specify the error message to display if the previous validation method fails
    * This makes it very easy to provide specific error messages without lots of code duplication
    * We can use the optional() function to run a subsequent validation only if a field has been entered (this allows us to validate optional fields)
        * checkFalsy flag means that we'll accept either an empty string or null as an empty value
    * We can use toDate() (or toBoolean()) to cast these to the proper JavaScript types, as they are initially recieved as "string"
 */
let author_create_post = [
    // Validate and sanitize fields
    body("first_name")
    .trim()
    .isLength({min: 2})
    .escape()
    .withMessage("First name must be specified")
    .isAlphanumeric()
    .withMessage("First name had non alphanumeric characters"),
    body("family_name")
    .trim()
    .isLength({min: 2})
    .escape()
    .withMessage("Family name must be specified")
    .isAlphanumeric()
    .withMessage("Family name had non alphanumeric characters"),
    body("date_of_birth", "invalid date of birth")
    .optional({checkFalsy: true})
    .isISO8601()
    .toDate(),
    body("date_of_death", "invalid date of death")
    .optional({checkFalsy: true})
    .isISO8601()
    .toDate(),
    // Process request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request
        let errors = validationResult(req)

        if(!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages
            res.render("author_form", {
                title: "Create Author",
                author: req.body,
                errors: errors.array()
            });

            return
        }

        // Data from form is valid

        // Create an Author object with escaped and trimmed data
        let author = new Author({
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death,
        })

        // saving author or failing that throwing error
        author.save((err) => {
            if(err) return next(err)

            // success, now redirect to new author record / detail page
            res.redirect(author.url)
        })
    }
]

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