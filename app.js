let express = require("express");
let path = require("path");
const connectDB = require("./config/database");
const routes = require("./routes");

let app = express();

require("dotenv").config();

// connecting DB
connectDB()

// view folder path setup
app.set("views", path.join(__dirname, "views"));
// view engine library setup
app.set("view engine", "ejs");

// using middlewares
app.use(express.urlencoded({extended: true}));
app.use(routes);

app.get("/", (req, res, next) => res.send("hoi hoi"))

app.listen(process.env.PORT || 3000, () => console.log("server running on port number "+ (undefined !== process.env.PORT ? process.env.PORT : 3000)))