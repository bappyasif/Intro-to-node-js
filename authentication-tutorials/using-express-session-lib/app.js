let express = require("express");
let mongoose = require("mongoose");
let session = require("express-session");

let MongoStore = require("connect-mongo")(session);

// creating application
let app = express();
let dbString = "mongodb://localhost:27017/tutorial_db";
let dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
let connection = mongoose.createConnection(dbString, dbOptions);

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// session
let sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: "sessions"
})

app.use(session({
    secret: 'test secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {maxAge: 1000*60*60*24}
}))

app.get("/", (req, res) => {
    console.log(req.session, "!!")
    if(req.session.viewCount) {
        req.session.viewCount++
    } else {
        req.session.viewCount = 1
    }
    res.send(`<h1>Hello World!!Using Session, you've visited this page ${req.session.viewCount} many times</h1>`)
})

app.listen(3000, () => console.log('app is running on port 3000'))