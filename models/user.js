const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema ({
    id: Schema.Types.String,
    password: Schema.Types.String,
    isDean: Schema.Types.Boolean,
    token: Schema.Types.String,
    slots: Schema.Types.Array
    // slots: {
    //     type: Schema.Types.Array,
    //     required: false
    // }
})

module.exports = mongoose.model("user", User)