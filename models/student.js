const mongoose = require("mongoose");

const Schema = mongoose.Schema

const StudentSchema = new Schema({
    id: Schema.Types.String,
    password: Schema.Types.String,
    token: Schema.Types.String,
})

module.exports = mongoose.model("student", StudentSchema)