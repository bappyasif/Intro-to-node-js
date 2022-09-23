let mongoose = require("mongoose");

require("dotenv").config();

/**
 * -------------- DATABASE ----------------
 */
/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */
// let conn = process.env.DB_STRING;
let conn = "mongodb://localhost:27017/tutorial_db"

let connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: Boolean
});

const User = connection.model("User", UserSchema);

// Expose connection to use
module.exports = connection;