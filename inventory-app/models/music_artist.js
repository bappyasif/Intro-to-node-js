let mongoose = require("mongoose");

let luxon = require("luxon");
const { DateTime } = require("luxon");

let Schema = mongoose.Schema;

let MusicArtistSchema = new Schema(
    {
        first_name: {type: Schema.Types.String, maxLength: 99, required: true},
        last_name: {type: Schema.Types.String, maxLength: 99, required: true},
        d_o_b: {type: Schema.Types.Date, required: true},
        d_o_d: {type: Schema.Types.Date}
    }
)

MusicArtistSchema.virtual("full_name")
.get(function() {
    return this.first_name + " " + this.last_name;
})

MusicArtistSchema.virtual("dob_format")
.get(function() {
    return `${DateTime.fromJSDate(this.d_o_b).toLocaleString(DateTime.DATE_MED)}`
})

MusicArtistSchema.virtual("dod_format")
.get(function() {
    return this.d_o_d ? `${DateTime.fromJSDate(this.d_o_d).toLocaleString(DateTime.DATE_MED)}` : '--'
})

MusicArtistSchema.virtual("url")
.get(function() {
    return "/catalog/artist/"+this._id
})

module.exports = mongoose.model("MusicArtist", MusicArtistSchema);