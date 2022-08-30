//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

/**
 * 
 Defining and creating models
 > Models are defined using the Schema interface
 > Schema allows you to define the fields stored in each document along with their validation requirements and default values
 > Schemas are then "compiled" into models using the mongoose.model() method
 > Once you have a model you can use it to find, create, update, and delete objects of the given type
 > Each model maps to a collection of documents in the MongoDB database
 > documents will contain the fields/schema types defined in the model Schema

 Defining schemas
 > code fragment below shows how you might define a simple schema
 > First you require() mongoose, then use the Schema constructor to create a new schema instance, defining the various fields inside it in the constructor's object parameter
 //Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date
});

Creating a model
> Models are created from schemas using the mongoose.model() method:

// Compile model from schema
var SomeModel = mongoose.model('SomeModel', SomeModelSchema);

> first argument is the singular name of the collection that will be created for your model (Mongoose will create the database collection for the above model SomeModel above), and the second argument is the schema you want to use in creating the model
> Once you've defined your model classes you can use them to create, update, or delete records, and run queries to get all records or particular subsets of records

Schema types (fields)
> A schema can have an arbitrary number of fields — each one represents a field in the documents stored in MongoDB
> An example schema showing many of the common field types and how they are declared is shown below
var schema = new Schema(
{
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now() },
  age: { type: Number, min: 18, max: 65, required: true },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array: [],
  ofString: [String], // You can also have an array of each of the other types too.
  nested: { stuff: { type: String, lowercase: true, trim: true } }
})

> Most of the SchemaTypes (the descriptors after "type:" or after field names) are self-explanatory
> exceptions are:
    > ObjectId:
        > Represents specific instances of a model in the database
        > For example, a book might use this to represent its author object
        > This will actually contain the unique ID (_id) for the specified object
        > We can use the populate() method to pull in the associated information when needed
    > Mixed:
        > An arbitrary schema type
    > []: 
        > An array of items
        > You can perform JavaScript array operations on these models (push, pop, unshift, etc.)

> code also shows both ways of declaring a field: 
    > Field name and type as a key-value pair (i.e. as done with fields name, binary and living)
    > Field name followed by an object defining the type, and any other options for the field: 
        > default values
        > built-in validators (e.g. max/min values) and custom validation functions
        > Whether the field is required
        > Whether String fields should automatically be set to lowercase, uppercase, or trimmed (e.g. { type: String, lowercase: true, trim: true })

Validation

> Mongoose provides built-in and custom validators, and synchronous and asynchronous validators
> It allows you to specify both the acceptable range of values and the error message for validation failure in all cases
> built-in validators include: 
    > All SchemaTypes have the built-in required validator
        > This is used to specify whether the field must be supplied in order to save a document
    > Numbers have min and max validators
    > Strings have: 
        > enum: specifies the set of allowed values for the field
        > match: specifies a regular expression that the string must match
        > maxLength and minLength for the string

> example below (slightly modified from the Mongoose documents) shows how you can specify some of the validator types and error messages:
var breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, 'Too few eggs'],
    max: 12,
    required: [true, 'Why no eggs?']
  },
  drink: {
    type: String,
    enum: ['Coffee', 'Tea', 'Water',]
  }
});

Virtual properties

> Virtual properties are document properties that you can get and set but that do not get persisted to MongoDB
> getters are useful for formatting or combining fields, while setters are useful for de-composing a single value into multiple values for storage

Methods and query helpers

> A schema can also have instance methods, static methods, and query helpers
> instance and static methods are similar, but with the obvious difference that an instance method is associated with a particular record and has access to the current object
> Query helpers allow you to extend mongoose's chainable query builder API (for example, allowing you to add a query "byName" in addition to the find(), findOne() and findById() methods)

Using models

> Once you've created a schema you can use it to create models
> model represents a collection of documents in the database that you can search, while the model's instances represent individual documents that you can save and retrieve

Creating and modifying documents: 

> To create a record you can define an instance of the model and then call save()
> examples below assume SomeModel is a model (with a single field "name") that we have created from our schema
// Create an instance of model SomeModel
var awesome_instance = new SomeModel({ name: 'awesome' });

// Save the new model instance, passing a callback
awesome_instance.save(function (err) {
  if (err) return handleError(err);
  // saved!
});
> Creation of records (along with updates, deletes, and queries) are asynchronous operations — you supply a callback that is called when the operation completes
> API uses the error-first argument convention, so the first argument for the callback will always be an error value (or null)
> If the API returns some result, this will be provided as the second argument
> You can also use create() to define the model instance at the same time as you save it
> callback will return an error for the first argument and the newly-created model instance for the second argument
SomeModel.create({ name: 'also_awesome' }, function (err, awesome_instance) {
  if (err) return handleError(err);
  // saved!
});
> Every model has an associated connection (this will be the default connection when you use mongoose.model())
> You create a new connection and call .model() on it to create the documents on a different database

> You can access the fields in this new record using the dot syntax, and change the values
> You have to call save() or update() to store modified values back to the database
// Access model field values using dot notation
console.log(awesome_instance.name); //should log 'also_awesome'

// Change record by modifying the fields, then calling save().
awesome_instance.name="New cool name";
awesome_instance.save(function (err) {
  if (err) return handleError(err); // saved!
});

Searching for records

> You can search for records using query methods, specifying the query conditions as a JSON document
> code fragment below shows how you might find all athletes in a database that play tennis, returning just the fields for athlete name and age
> Here we just specify one matching field (sport) but you can add more criteria, specify regular expression criteria, or remove the conditions altogether to return all athletes
var Athlete = mongoose.model('Athlete', yourSchema);

// find all athletes who play tennis, selecting the 'name' and 'age' fields
Athlete.find({ 'sport': 'Tennis' }, 'name age', function (err, athletes) {
  if (err) return handleError(err);
  // 'athletes' contains the list of athletes that match the criteria.
})
> If you specify a callback, as shown above, the query will execute immediately
> callback will be invoked when the search completes
> All callbacks in Mongoose use the pattern callback(error, result)
> If an error occurs executing the query, the error parameter will contain an error document and result will be null
> If the query is successful, the error parameter will be null, and the result will be populated with the results of the query
> It is important to remember that not finding any results is not an error for a search —but it may be a fail-case in the context of your application
> If your application expects a search to find a value you can either check the result in the callback (results==null) or daisy chain the orFail() method on the query
> If you don't specify a callback then the API will return a variable of type Query
> You can use this query object to build up your query and then execute it (with a callback) later using the exec() method
// find all athletes that play tennis
var query = Athlete.find({ 'sport': 'Tennis' });

// selecting the 'name' and 'age' fields
query.select('name age');

// limit our results to 5 items
query.limit(5);

// sort by age
query.sort({ age: -1 });

// execute the query at a later time
query.exec(function (err, athletes) {
  if (err) return handleError(err);
  // athletes contains an ordered list of 5 athletes who play Tennis
})
> Above we've defined the query conditions in the find() method
> We can also do this using a where() function, and we can chain all the parts of our query together using the dot operator (.) rather than adding them separately
> code fragment below is the same as our query above, with an additional condition for the age
Athlete.
  find().
  where('sport').equals('Tennis').
  where('age').gt(17).lt(50).  //Additional where query
  limit(5).
  sort({ age: -1 }).
  select('name age').
  exec(callback); // where callback is the name of our callback function.
> find() method gets all matching records, but often you just want to get one match
> following methods query for a single record: 
    > findById(): 
        > Finds the document with the specified id (every document has a unique id)
    > findOne(): 
        > Finds a single document that matches the specified criteria
    > findByIdAndRemove(), findByIdAndUpdate(), findOneAndRemove(), findOneAndUpdate():
        > Finds a single document by id or criteria and either updates or removes it
        > These are useful convenience functions for updating and removing records
> There is also a count() method that you can use to get the number of items that match conditions
    > This is useful if you want to perform a count without actually fetching the records

Working with related documents — population
> You can create references from one document/model instance to another using the ObjectId schema field, or from one document to many using an array of ObjectIds
> field stores the id of the related model
> If you need the actual content of the associated document, you can use the populate() method in a query to replace the id with the actual data
> For example, the following schema defines authors and stories
> Each author can have multiple stories, which we represent as an array of ObjectId
> Each story can have a single author
> ref property tells the schema which model can be assigned to this field
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var authorSchema = Schema({
  name    : String,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  author : { type: Schema.Types.ObjectId, ref: 'Author' },
  title    : String
});

var Story  = mongoose.model('Story', storySchema);
var Author = mongoose.model('Author', authorSchema);

> We can save our references to the related document by assigning the _id value
> Below we create an author, then a story, and assign the author id to our story's author field
var bob = new Author({ name: 'Bob Smith' });

bob.save(function (err) {
  if (err) return handleError(err);

  //Bob now exists, so lets create a story
  var story = new Story({
    title: "Bob goes sledding",
    author: bob._id    // assign the _id from our author Bob. This ID is created by default!
  });

  story.save(function (err) {
    if (err) return handleError(err);
    // Bob now has his story
  });
});
> Our story document now has an author referenced by the author document's ID
> In order to get the author information in the story results we use populate(), as shown below
Story
.findOne({ title: 'Bob goes sledding' })
.populate('author') //This populates the author id with actual author information!
.exec(function (err, story) {
  if (err) return handleError(err);
  console.log('The author is %s', story.author.name);
  // prints "The author is Bob Smith"
});
> if you've noticed, we added an author to our story, but we didn't do anything to add our story to our author's stories array
> One way would be to add our story to the stories array, but this would result in us having two places where the information relating authors and stories needs to be maintained
> A better way is to get the _id of our author, then use find() to search for this in the author field across all stories
Story
.find({ author : bob._id })
.exec(function (err, stories) {
  if (err) return handleError(err);
  // returns all stories that have Bob's id as their author.
});

One schema/model per file

> While you can create schemas and models using any file structure you like, we highly recommend defining each model schema in its own module (file), then exporting the method to create the model
// File: ./models/somemodel.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date,
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('SomeModel', SomeModelSchema);

> You can then require and use the model immediately in other files
> Below we show how you might use it to get all instances of the model
//Create a SomeModel model just by requiring the module
var SomeModel = require('../models/somemodel')

// Use the SomeModel object (model) to find all SomeModel records
SomeModel.find(callback_function);


 */

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db
// module.exports = mongoose.model('someModel', db)


let testConnect = "mongodb+srv://ab:1234@cluster0.vtxykfg.mongodb.net/local_library?retryWrites=true&w=majority"