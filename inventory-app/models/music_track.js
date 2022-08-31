let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let MusicTrackSchema = new Schema (
    {
        name: {type: Schema.Types.String, required: true},
        // name: {type: Schema.Types.String},
        genre: {type: Schema.Types.ObjectId, ref: "MusicGenre"},
        status: {type: Schema.Types.String, required: true, enum: ["Free", "Preview", "Play", "Download"]},
    }
)

module.exports = mongoose.model("MusicTrack", MusicTrackSchema);