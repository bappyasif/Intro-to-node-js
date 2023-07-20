const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Schedule = new Schema({
    deanId: Schema.Types.String,
    studentId: Schema.Types.String,
    day: Schema.Types.String,
    slot: Schema.Types.Array
});

module.exports = mongoose.model("schedule", Schedule)