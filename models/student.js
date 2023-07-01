const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Student = new Schema({
    id: Schema.Types.String,
    password: Schema.Types.String,
    slotBooked: Schema.Types.Boolean
})

module.exports = mongoose.model("student", Student);