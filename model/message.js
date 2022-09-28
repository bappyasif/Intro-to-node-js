let mongoose =  require("mongoose");

let Schema = mongoose.Schema;

let MessageSchema = new Schema({
    title: {type: Schema.Types.String, required: true},
    body: {type: Schema.Types.String, required: true},
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    posted: {type: Schema.Types.Date, required: true}
})

module.exports = mongoose.model("Message", MessageSchema)