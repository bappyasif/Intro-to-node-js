const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeanSchema = new Schema({
    id: Schema.Types.String,
    password: Schema.Types.String,
    token: Schema.Types.String,
    slots: Schema.Types.Array
})

module.exports = mongoose.model("dean", DeanSchema)