let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let MusicTrackSchema = new Schema (
    {
        name: {type: Schema.Types.String, required: true},
        // name: {type: Schema.Types.String},
        genre: {type: Schema.Types.ObjectId, ref: "MusicGenre", required: true},
        album: {type: Schema.Types.ObjectId, ref: "MusicAlbum", required: true},
        status: {type: Schema.Types.String, required: true, enum: ["Free", "Preview", "Play", "Download"]},
    }
)

MusicTrackSchema.virtual("album_name")
.get(function() {
    // console.log(this.album.name, "?>>?>", this.album, this.genre)
    return this.album.name
})

MusicTrackSchema.virtual("url")
.get(function() {
    return "/catalog/track/"+this._id
})

MusicTrackSchema.virtual("album_url")
.get(function() {
    return "/catalog/album/"+this.album._id
})

module.exports = mongoose.model("MusicTrack", MusicTrackSchema);