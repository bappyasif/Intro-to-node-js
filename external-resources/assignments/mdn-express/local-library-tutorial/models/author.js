// schema defines an author as having String SchemaTypes for the first and family names (required, with a maximum of 100 characters), and Date fields for the dates of birth and death
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: { type: String, required: true, maxLength: 100 },
        family_name: { type: String, required: true, maxLength: 100 },
        date_of_birth: { type: Date },
        date_of_death: { type: Date },
    }
);

// Virtual for author's full name
AuthorSchema
    .virtual("name")
    .get(function () {
        // To avoid errors in cases where an author does not have either a family name or first name
        // We want to make sure we handle the exception by returning an empty string for that case
        var fullname = '';
        if (this.first_name && this.family_name) {
            fullname = this.family_name + ', ' + this.first_name
        }
        if (!this.first_name || !this.family_name) {
            fullname = '';
        }
        return fullname;
    });

// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(function () {
    var lifetime_string = '';
    if (this.date_of_birth) {
        lifetime_string = this.date_of_birth.getYear().toString();
    }
    lifetime_string += ' - ';
    if (this.date_of_death) {
        lifetime_string += this.date_of_death.getYear()
    }
    return lifetime_string;
});

// Virtual for author's URL
AuthorSchema.virtual("utl")
    .get(function () {
        return '/catalog/author/' + this._id;
    });

// We've also declared a virtual for the AuthorSchema named "url" that returns the absolute URL required to get a particular instance of the model — we'll use the property in our templates whenever we need to get a link to a particular author
// Declaring our URLs as a virtual in the schema is a good idea because then the URL for an item only ever needs to be changed in one place

//Export model
module.exports = mongoose.model('Author', AuthorSchema)