const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Dean = new Schema({
    id: Schema.Types.String,
    password: Schema.Types.String,
    slots: Schema.Types.Array
})

module.exports = mongoose.model("dean", Dean)