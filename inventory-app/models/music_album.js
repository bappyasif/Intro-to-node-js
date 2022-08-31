let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let MusicAlbumSchema = new Schema(
    {
        name: {type: Schema.Types.String, required: true},
        released_date: {type: Schema.Types.Date, required: true},
        genre: {type: Schema.Types.ObjectId, ref: "MusicGenre"},
        // genre: {type: Schema.Types.String, ref: "MusicGenre"},
        artist: {type: Schema.Types.ObjectId, ref: "MusicArtist"},
        description: {type: Schema.Types.String, required: true},
        price: {type: Schema.Types.Number}
    }
)

module.exports = mongoose.model("MusicAlbum", MusicAlbumSchema)