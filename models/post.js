const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
    body: {type: Schema.Types.String, required: true},
    created: {type: Schema.Types.Date, required: true},
    userId: {type: Schema.Types.ObjectId, required: true},
    likesCount: Schema.Types.Number,
    loveCount: Schema.Types.Number,
    dislikesCount: Schema.Types.Number,
    shareCount: Schema.Types.Number,
    othersCount: Schema.Types.Number,
    mfBuffer: Schema.Types.Buffer,
    mfUrl: Schema.Types.String,
})

module.exports = mongoose.model("post", Post);