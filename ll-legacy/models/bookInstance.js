// BookInstance represents a specific copy of a book that someone might borrow and includes information about whether the copy is available, on what date it is expected back, and "imprint" (or version) details
let {DateTime} = require("luxon");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let BookInstanceSchema = new Schema(
    {
        book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
        imprint: { type: String, required: true },
        status: { type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance' },
        due_back: { type: Date, default: Date.now }
    }
)

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url")
    .get(function () {
        return '/catalog/bookinstance/' + this._id;
    });

// Virtual for bookinstance's date format
BookInstanceSchema.virtual("due_back_formatted")
.get(function() {
    return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED)
})

// virtual for bookinstance form
BookInstanceSchema.virtual("date_format")
.get(function() {
    // date needed to be formatted as yyyy-mm-dd, which ISODate() does provide
    return DateTime.fromJSDate(this.due_back).toISODate()
})

/**
 * 
 * 
 * Luxon can import strings in many formats and export to both predefined and free-form formats
 * In this case we use fromJSDate() to import a JavaScript date string and toLocaleString() to output the date in DATE_MED format in English: Oct 6th, 2020
 */

/**
 * 
 > new things we show here are the field options:
    > enum:
        > This allows us to set the allowed values of a string
        > In this case, we use it to specify the availability status of our books (using an enum means that we can prevent mis-spellings and arbitrary values for our status)
    > default: 
        > We use default to set the default status for newly created bookinstances to maintenance and the default due_back date to now (note how you can call the Date function when setting the date!)
 */
module.exports = mongoose.model("BookInstance", BookInstanceSchema)