const mongoose = require("mongoose");

mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true});

let db = mongoose.connection;

db.on("error", console.error.bind(console, "mongo db connection error"))