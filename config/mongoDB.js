const mongoose = require("mongoose");

const dbConnection = process.env.DB_STR

// console.log(dbConnection, "dbConnection")

mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("error", (err) => {
    console.log("database connection has error", err.message)
});

mongoose.connection.on("disconnected", () => {
    console.log("db connection disconnected successfully")
});

process.on("SIGINT", () => {
    mongoose.connection.close().then(() => {
        console.log("db connection is discontinued due to app termination");
        process.exit(0);
    });
});

// mongoose.connection.on("connected", () => {
//     console.log("db is connected successfully")
// });

mongoose.connection.once("connected", () => {
    console.log("db is connected successfully")
});