let BookInstance = require("../models/bookInstance");

// imports for bookInstance form
let { body, validationResult } = require("express-validator")
let Book = require("../models/book")
let async = require("async")

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
            if (err) return next(err)
            // successfull so commencing render
            // console.log(list_bookinstances, 'list_bookinstances')
            res.render('bookinstance_list', { title: "Book Instance List", bookinstance_list: list_bookinstances })
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
            if (err) return next(err)

            // no results, return err
            if (bookinstance == null) {
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
        if (err) return next(err);

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
    body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
    body("imprint", "Imprint must be specified").trim().isLength({ min: 1 }).escape(),
    body("status").escape(),
    body("due_back", "Invalid Date").optional({ checkFalsy: true }).isISO8601().toDate(),

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
        if (!errors.isEmpty()) {
            // There are errors, so render form again with sanitized values and error messages
            Book.find({}, "title").exec((err, books) => {
                if (err) return next(err);
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
            if (err) return next(err);

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
            if (err) return next(err)

            // if empty, throw error
            if (book_instance === null) {
                let err = new Error("No book instance found");
                err.status = 404;
                return next(err)
            }

            // success, so pass onto rendering
            res.render("book_instance_delete_form", {
                title: book_instance.book.title,
                author: book_instance.book.author,
                book: book_instance.book,
                bookinstanceID: book_instance._id
            })
        })
}

// Handle BookInstance delete form on POST
// let bookinstance_delete_post = (req, res) => {
//     res.send('NOT IMPLEMENTED: BookInstance delete POST');
// }
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * handling bookinstance delete POST request
 * find and delete that book instance from list of book instances
 * and after successful deletion we'll redirect page to bookinstance_list page
 */
let bookinstance_delete_post = (req, res, next) => {
    // res.send(req.body.bookinstanceid)
    BookInstance.findByIdAndRemove(req.body.bookinstanceid)
        .then((r) => console.log("deleted", r))
        .catch(err => next(err))
        .finally(() => res.redirect("/catalog/bookinstances"))
}

// display BookInstance update form on GET
// let bookinstance_update_get = (req, res) => {
//     res.send('NOT IMPLEMENTED: BookInstance update GET');
// }
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * first we'll look for bookinstance
 * and once we have that we'll als get 'book id' from that and fetch that piece of data as well
 * when we have both of these data then we'll render book form with "Update Mechanism in place"
 */
 let bookinstance_update_get = (req, res, next) => {
    BookInstance.findById(req.params.id)
    .exec((err, result) => {
        if(err) return next(err)

        Book.findById(result.book)
        .exec((err, sb) => {
            if(err) return next(err)
            // console.log(result, "update", sb);
            // res.send(result)
            // let dstr = ''
            // let fd = result.due_back;
            // dstr += fd.getFullYear()+"/"
            // dstr += "0"+fd.getMonth()+"/"
            // dstr += fd.getDate();
            // console.log(result, "update", result.due_back, new Date(fd), dstr, dstr.toString());
            
            res.render("bookinstance_form", {
                title: "Update BookInstance",
                bookinstance: result,
                book_list: [sb],
                selected_book: sb._id,
                errors: ""
            })
        })
    })
}

// Handle BookInstance update form on POST
// let bookinstance_update_post = (req, res) => {
//     res.send('NOT IMPLEMENTED: BookInstance update POST');
// }
/**
 * we'll sanitize and validate date before updating
 * once validation is done, we'll process request for updating, and collect and gaher user chnages in update form
 * if there is any error found, we will re gather all those bookinstance form require, by fetching Bokinstance and Book data
 * once we're in clear we are safe to update user changes in bookinstance records
 */
let bookinstance_update_post = [
    // validating and sanitizing data
    body("book", "Book Must Be Specified").trim().isLength({min: 1}),
    body("imprint", "Imprint must be specified").trim().isLength({min: 1}),
    body("status").escape(),
    body("due_back", "Invalid Date").optional({checkFalsy: true}).isISO8601().toDate(),

    // process request after validation and sanitization
    (req, res, next) => {
        let errors = validationResult(req);

        let bookinstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back,
            _id: req.params.id
        })

        // if errors are found
        if(!errors.isEmpty()) {
            BookInstance.findById(req.body._id)
            .exec((err, result) => {
                if(err) return next(err);

                Book.find({book: result.book})
                .exec((err, sb) => {
                    if(err) return next(err);

                    res.render("bookinstance_form", {
                        title: "Update BookInstance",
                        bookinstance: bookinstance,
                        book_list: [sb],
                        selected_book: sb._id,
                        errors: ""
                    })
                })
            })
            return
        }

        // Data from form is valid so update record
        BookInstance.findByIdAndUpdate(req.params.id, bookinstance, {}, (err, bookinst) => {
            if(err) return next(err);

            // successfull, so redirect to bookinstance detail page
            res.redirect("/catalog/bookinstance/"+bookinst._id) // we could have used virtual method just as we have used for "book.url"
            // res.redirect("/catalog/bookinstance/"+req.params.id)
        })
    }

]

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