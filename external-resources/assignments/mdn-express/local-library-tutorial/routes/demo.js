/**
 * 
 * 
 Defining and using separate route modules
 > code below provides a concrete example of how we can create a route module and then use it in an Express application
 > First we create routes for a wiki in a module named demo.js
 > code first imports the Express application object, uses it to get a Router object and then adds a couple of routes to it using the get() method
 > Last of all the module exports the Router object
*/

// wiki.js - Wiki route module.

var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function (req, res) {
  res.send('Wiki home page');
})

// About page route.
router.get('/about', function (req, res) {
  res.send('About this wiki');
})

/**
 * 
 * 
 > To use the router module in our main app file we first require() the route module (demo.js)
 > We then call use() on the Express application to add the Router to the middleware handling path, specifying a URL path of 'wiki'
    var wiki = require('./demo.js');
    // …
    app.use('/wiki', wiki);
 > two routes defined in our wiki route module are then accessible from /wiki/ and /wiki/about/
 */

/**
 * 
 * 
    Route functions: 
    > "about" route (reproduced below) is defined using the Router.get() method, which responds only to HTTP GET requests
    > first argument to this method is the URL path while the second is a callback function that will be invoked if an HTTP GET request with the path is received
    router.get('/about', function (req, res) {
    res.send('About this wiki');
    })
    > callback takes three arguments (usually named as shown: req, res, next), that will contain the HTTP Request object, HTTP response, and the next function in the middleware chain
    > Router functions are Express middleware, which means that they must either complete (respond to) the request or call the next function in the chain
    > In the case above we complete the request using send(), so the next argument is not used (and we choose not to specify it)
    > router function above takes a single callback, but you can specify as many callback arguments as you want, or an array of callback functions
    > Each function is part of the middleware chain, and will be called in the order it is added to the chain (unless a preceding function completes the request)
    > callback function here calls send() on the response to return the string "About this wiki" when we receive a GET request with the path ('/about')
    > There are a number of other response methods for ending the request/response cycle: .json(), .sendFile()
    > response method that we'll be using most often as we build up the library is render(), which creates and returns HTML files using templates and data

    HTTP verbs: 
    > example routes above use the Router.get() method to respond to HTTP GET requests with a certain path
    > Router also provides route methods for all the other HTTP verbs, that are mostly used in exactly the same way: post(), put(), delete(), options(), trace(), copy(), lock(), mkcol(), move(), 
        purge(), propfind(), proppatch(), unlock(), report(), mkactivity(), checkout(), 
        merge(), m-search(), notify(), subscribe(), unsubscribe(), patch(), search(), and connect()
    > For example, the code below behaves just like the previous /about route, but only responds to HTTP POST requests
    router.post('/about', function (req, res) {
    res.send('About this wiki');
    })

    Route paths:
    > route paths define the endpoints at which requests can be made
    > examples we've seen so far have just been strings, and are used exactly as written: '/', '/about', '/book', '/any-random.path'
    > Route paths can also be string patterns
    > String patterns use a form of regular expression syntax to define patterns of endpoints that will be matched
    > syntax is listed below (note that the hyphen (-) and the dot (.) are interpreted literally by string-based paths):
        > ? : Endpoint must have 0 or 1 of the preceding character (or group), e.g. a route path of '/ab?cd' will match endpoints acd or abcd
        > + : Endpoint must have 1 or more of the preceding character (or group), e.g. a route path of '/ab+cd' will match endpoints abcd, abbcd, abbbcd, and so on
        > * : Endpoint may have an arbitrary string where the * character is placed. E.g. a route path of '/ab*cd' will match endpoints abcd, abXcd, abSOMErandomTEXTcd, and so on    
        > () : Grouping match on a set of characters to perform another operation on, e.g. '/ab(cd)?e' will perform a ?-match on the group (cd)—it will match abe and abcde
    > route paths can also be JavaScript regular expressions
    > For example, the route path below will match catfish and dogfish, but not catflap, catfishhead, and so on
    > Note that the path for a regular expression uses regular expression syntax (it is not a quoted string as in the previous cases)
    app.get(/.*fish$/, function (req, res) {
        // …
    })
    > Most of our routes for the LocalLibrary will use strings and not regular expressions


    Route parameters: 
    > Route parameters are named URL segments used to capture values at specific positions in the URL
    > named segments are prefixed with a colon and then the name (e.g. /:your_parameter_name/
    > captured values are stored in the req.params object using the parameter names as keys (e.g. req.params.your_parameter_name)
    > So for example, consider a URL encoded to contain information about users and books: http://localhost:3000/users/34/books/8989
    > We can extract this information as shown below, with the userId and bookId path parameters: 
    app.get('/users/:userId/books/:bookId', function (req, res) {
        // Access userId via: req.params.userId
        // Access bookId via: req.params.bookId
        res.send(req.params);
    })
    > names of route parameters must be made up of "word characters" (A-Z, a-z, 0-9, and _)
    > URL /book/create will be matched by a route like /book/:bookId (which will extract a "bookId" value of 'create')
    > first route that matches an incoming URL will be used, so if you want to process /book/create URLs separately, their route handler must be defined before your /book/:bookId route

 */
 
module.exports = router;