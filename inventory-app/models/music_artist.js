let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let MusicArtistSchema = new Schema(
    {
        first_name: {type: Schema.Types.String, maxLength: 99, required: true},
        last_name: {type: Schema.Types.String, maxLength: 99, required: true},
        d_o_b: {type: Schema.Types.Date, required: true},
        d_o_d: {type: Schema.Types.Date}
    }
)

module.exports = mongoose.model("MusicArtist", MusicArtistSchema);