let express = require("express");
const db = require("./config/database");

let app = express();

require("dotenv").config();

app.get("/", (req, res, next) => res.send("hoi hoi"))

app.listen(process.env.PORT || 3000, () => console.log("server running on port number "+ (undefined !== process.env.PORT ? process.env.PORT : 3000)))