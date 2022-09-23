let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstname: {type: Schema.Types.String, required: true},
    lastname: {type: Schema.Types.String, required: true},
    username: {type: Schema.Types.String, required: true},
    password: {type: Schema.Types.String, required: true},
    membership_status: {type: Schema.Types.Boolean},
    messages: {type: Schema.Types.Array}
})

module.exports = mongoose.model("User", UserSchema);