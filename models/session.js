const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Session = new Schema({
    userId: Schema.Types.String,
    token: Schema.Types.String
});

module.exports = mongoose.model("session", Session)