let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let MusicGenreSchema = new Schema(
    {
        name: {type: Schema.Types.String, minLength: 3, maxLength: 99}
    }
)

module.exports = mongoose.model("MusicGenre", MusicGenreSchema)