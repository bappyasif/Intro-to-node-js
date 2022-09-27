let express = require("express");
let path = require("path");

let session = require("express-session");
let passport = require("passport");

let MongoStore = require("connect-mongo")(session);

const {connectDB, db} = require("./config/database");
const routes = require("./routes");

let app = express();

require("dotenv").config();

// storing session
let sessionStore = new MongoStore({
    mongooseConnection: db,
    collection: "sessions"
})

app.use(session({secret: process.env.SECRET, resave: false, saveUninitialized: true, store: sessionStore, cookie: {maxAge: 1000*60*60*24}}))

// connecting DB
connectDB()

// view folder path setup
app.set("views", path.join(__dirname, "views"));
// view engine library setup
app.set("view engine", "ejs");

app.use(passport.initialize());

app.use(passport.session());

// using middlewares
app.use(express.urlencoded({extended: true}));
app.use(routes);

app.get("/", (req, res, next) => res.send("hoi hoi"))

app.listen(process.env.PORT || 3000, () => console.log("server running on port number "+ (undefined !== process.env.PORT ? process.env.PORT : 3000)))