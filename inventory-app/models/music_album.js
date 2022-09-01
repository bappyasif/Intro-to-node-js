let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let MusicAlbumSchema = new Schema(
    {
        name: {type: Schema.Types.String, required: true},
        released_date: {type: Schema.Types.Date, required: true},
        genre: [{type: Schema.Types.ObjectId, ref: "MusicGenre"}],
        // genre: {type: Schema.Types.ObjectId, ref: "MusicGenre"},
        // genre: {type: Schema.Types.String, ref: "MusicGenre"},
        artist: {type: Schema.Types.ObjectId, ref: "MusicArtist"},
        description: {type: Schema.Types.String, required: true},
        price: {type: Schema.Types.Number}
    }
)

MusicAlbumSchema.virtual("artistName")
.get(function() {
    let fullName = "";
    fullName += this.artist.first_name + " " + this.artist.last_name
    // console.log(fullName, "<<fullname>>")
    return fullName;
})

MusicAlbumSchema.virtual("url")
.get(function() {
    return "/catalog/album/"+this._id
})

module.exports = mongoose.model("MusicAlbum", MusicAlbumSchema)