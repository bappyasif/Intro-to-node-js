let mongoose = require("mongoose")

let Schema = mongoose.Schema;

let BookGenreSchema = new Schema(
    {
        name: {type: Schema.Types.String, minLength: 3, maxLength: 100}
    }
)

// virtual for genre's url
BookGenreSchema.virtual('url')
<<<<<<< HEAD
.get(function() {
=======
.get(function () {
>>>>>>> prev-mb
    return "/catalog/genre/"+ this._id
})

// exporting model
module.exports = mongoose.model("Genre", BookGenreSchema)