let express = require("express");
let router = express.Router();

// by doing this we can make every users route will use this logger middleware
router.use(logger)

router.get("/", (req, res) => {
    let extractParam = req.query.name
    console.log(extractParam, 'param!!')
    res.send("User List")
})

router.post("/", (req, res) => {
    let isValid = true;
    if (isValid) {
        users.push({ firstName: req.body.firstName })
        res.redirect(`/users/${users.length - 1}`)
    } else {
        console.log("Error!!")
        // also passing along already user submitted value for it, cause it's a good practice to do so
        res.render("/users/new", { firstName: req.body.firstName })
    }

    res.send(`Hello ${req.body.firstName}`)
})

// always put static route above dynamic routes
router.get("/new", (req, res) => {
    res.render("users/new", { firstName: "test" })
})

// using route to modularize it even further
// so that it gets matched with desired method types from that route
router.route("/:id").get((req, res) => {
    console.log(req.user)
    res.send(`get user with id of ${req.params.id}`)
}).put((req, res) => {
    res.send(`update user with id of ${req.params.id}`)
}).delete((req, res) => {
    res.send(`delete user with id of ${req.params.id}`)
})

// demo users
let users = [{ name: 'Kylee' }, { name: "Sally" }];

// this is a form of middleware
// we can use param to funnel and point to our desired request and thus reduce much of code duplication in each route code block
router.param("id", (req, res, next, id) => {
    console.log(id)
    // we are passing an "user" property to rest of our route logfc top have access t this property to and do whatever they want with it
    req.user = users[id]
    next()
})

function logger(req, res, next) {
    console.log(req.originalUrl)
    console.log("Request IP: " + req.ip);
    console.log("Request Method: " + req.method);
    console.log("Request date: " + new Date());

    next(); // THIS IS IMPORTANT!
}

module.exports = router;

/**
 * 
 * 
router.post("/", (req, res) => {
    console.log(req.body.firstName)
    res.send(`Hello ${req.body.firstName}`)
})
 * 
 * 
router.post("/", (req, res) => {
    res.send("create user")
})
 * 
 * 
// always put static route above dynamic routes
router.get("/new", (req, res) => {
    res.send("User New Form")
})
 * 
 * 
 router.get("/:id", (req, res) => {
    res.send(`get user with id of ${req.params.id}`)
})

router.put("/:id", (req, res) => {
    res.send(`update user with id of ${req.params.id}`)
})

router.delete("/:id", (req, res) => {
    res.send(`delete user with id of ${req.params.id}`)
})
 */