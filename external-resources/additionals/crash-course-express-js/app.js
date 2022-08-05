let path = require("path")

let router = require("./routes/apis/members")

let logger = require("./middlewares/logger")

let exphbs = require("express-handlebars");

let express = require("express");
const members = require("./Members");

let app = express();

let PORT = process.env.PORT || 8080;

let publicFolder = path.join(__dirname, "public")

// using middleware
app.use(logger)

// using handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// using handlebars view engine

// homepage view
app.get("/", (req, res) => {
    res.render("index", {title: "All Fancy", members: members})
    // res.render("index")
})

// sending back api responses with router
app.use("/api/members", router)

// sending response with express static folder
app.use(express.static(publicFolder))

// sending response with file
// app.get("/", (req, res) => res.sendFile("index.html", {root: publicFolder}))

// sending response with text
// app.get("/", (req, res) => res.send("Hoi Hoi!!!!"))

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))


/**
 * 
 * 
 // all memebers
app.get("/api/members", (req, res) => {
    console.table(members)
    res.json(members)
})

// single member
app.get("/api/members/:id", (req, res) => {
    let findMember = members.filter(item => item.id === parseInt(req.params.id))
    if(findMember.length) {
        res.json(findMember)
    } else {
        res.status(400).json({msg: `member is not found with an id of ${req.params.id}!!`})
    }    
})
 */