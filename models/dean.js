const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Dean = new Schema({
    id: Schema.Types.String,
    password: Schema.Types.String,
    freeSlots: Schema.Types.Array
})

module.exports = mongoose.model("dean", Dean)