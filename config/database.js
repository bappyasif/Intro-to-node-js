let mongoose = require("mongoose");
const UserSchema = require("../model/user");

require("dotenv").config();

let conn = process.env.DB_STRING;

// let connection = mongoose.createConnection(conn, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
// connection.model("User", UserSchema)
// db.model("User", UserSchema)

db.on("error", console.error.bind(console, "mongo db connection error!!"))



module.exports = db