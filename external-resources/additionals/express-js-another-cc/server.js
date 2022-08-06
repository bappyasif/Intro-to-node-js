let express = require("express")
const userRouter = require("./routes/users")
let app = express()

// setting up view engine
app.set("view engine", "ejs")

// using middlewares
// this will make form submitted values accessible to corresponding route code
app.use(express.urlencoded({ extended: true }))
// this will allow us to parse json request from any fetchable resources
app.use(express.json())
// using static files and serve to routes
// static file can be view from browser as it is structured in public folder
app.use(express.static("public"))

// handling errors
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// using routes
app.use("/users", userRouter)

function logger(req, res, next) {
    console.log(req.originalUrl)
    next();
}

app.listen(3001, () => console.log('server running on 3001'))

/**
 * 
 * 
// using middlewares
// logger will only be active in index route and not anywhere else
// we can send other middlewares like this in routes as well
app.get("/", logger, logger, (req, res) => {
    // rendering pages with ejs
    res.render('index', {text1234: "World", text: "World"})
})
 * 
 *
// using middlewares
// as it gets run sequentially from top to bottom, position of it matters which routes uses this middleware and which it doesnt
app.use(logger);

app.get("/", (req, res) => {
    // rendering pages with ejs
    res.render('index', {text1234: "World", text: "World"})
})
 * 
 * 
 app.get("/users", (req, res) => {
    res.send("User List")
})

app.get("/users/new", (req, res) => {
    res.send("User New Form")
})
 * 
 * 
 app.get("/", (req, res) => {

    // we can simply send a direct response t browser
    // res.send("Hello World!!")
    
    // we can also send response to download a file
    res.download('./server.js')

    // we can simply send json response
    // res.json({msg: 'Error!!'})

    // we can chain together statuses along with json response
    // res.status(500).json({msg: 'Error!!'})

    // we can chain together statuses along with messages
    // res.status(500).send("Hello!!")
})
 */