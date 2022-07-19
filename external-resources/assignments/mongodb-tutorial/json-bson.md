**What is JSON?**
> JavaScript objects are simple associative containers, wherein a string key is mapped to a value (which can be a number, string, function, or even another object)
>  This simple language trait allowed JavaScript objects to be represented remarkably simply in text
> JSON quickly overtook XML, which is more difficult for a human to read, significantly more verbose, and less ideally suited to representing object structures used in modern programming languages

**MongoDB JSON Connection**
> MongoDB was designed from its inception to be the ultimate data platform for modern application development
> JSON’s ubiquity made it the obvious choice for representing data structures in MongoDB’s innovative document data model
> However, there are several issues that make JSON less than ideal for usage inside of a database: 
    > JSON is a text-based format, and text parsing is very slow
    > JSON’s readable format is far from space-efficient, another database concern
    > JSON only supports a limited number of basic data types
> In order to make MongoDB JSON-first, but still high-performance and general-purpose, BSON was invented to bridge the gap: a binary representation to store data in JSON format, optimized for speed, space, and flexibility
> It’s not dissimilar from other interchange formats like protocol buffers, or thrift, in terms of approach

**What is BSON?**
> BSON simply stands for “Binary JSON,” and that’s exactly what it was invented to be
> BSON’s binary structure encodes type and length information, which allows it to be parsed much more quickly
> Since its initial formulation, BSON has been extended to add some optional non-JSON-native data types, like dates and binary data, without which MongoDB would have been missing some valuable support
> Languages that support any kind of complex mathematics typically have different sized integers (ints vs longs) or various levels of decimal precision (float, double, decimal128, etc.)
> Not only is it helpful to be able to represent those distinctions in data stored in MongoDB, it also allows for comparisons and calculations to happen directly on data in ways that simplify consuming application code

**Does MongoDB use BSON, or JSON?**
> MongoDB stores data in BSON format both internally, and over the network, but that doesn’t mean you can’t think of MongoDB as a JSON database
> Anything you can represent in JSON can be natively stored in MongoDB, and retrieved just as easily in JSON
> When using a MongoDB driver in your language of choice, it’s still important to know that you’re accessing BSON data through the abstractions available in that language
> When using a MongoDB driver in your language of choice, it’s still important to know that you’re accessing BSON data through the abstractions available in that language
> Second, each programming language has its own object semantics. JSON objects have ordered keys, for instance, while Python dictionaries (the closest native data structure that’s analogous to JavaScript Objects) are unordered, while differences in numeric and string data types can also come into play
> Third, BSON supports a variety of numeric types that are not native to JSON, and each language will represent these differently

**JSON vs BSON**
> Data Support: 
    > json: String, Boolean, Number, Array
    > bson: String, Boolean, Number (Integer, Float, Long, Decimal128...), Array, Date, Raw Binary
> Readability: 
    > json: Human and Machine
    > bson: Machine Only
> JSON and BSON are indeed close cousins by design
> BSON is designed as a binary representation of JSON data, with specific extensions for broader applications, and optimized for data storage and retrieval
> One particular way in which BSON differs from JSON is in its support for some more advanced types of data
> JavaScript does not, for instance, differentiate between integers (which are round numbers), and floating-point numbers (which have decimal precision to various degrees)
> Most server-side programming languages have more sophisticated numeric types (standards include integer, regular precision floating point number aka “float”, double-precision floating point aka “double”, and boolean values), each with its own optimal usage for efficient mathematical operations

**Schema Flexibility and Data Governance**
> One of the big attractions for developers using databases with JSON and BSON data models is the dynamic and flexible schema they provide when compared to the rigid, tabular data models used by relational databases
> Firstly, JSON documents are polymorphic – fields can vary from document to document within a single collection (analogous to table in a relational database)
    > Documents make modeling diverse record attributes easy for developers, elegantly handling data of any structure
> Secondly, there is no need to declare the structure of documents to the database – documents are self-describing. 
    > Developers can start writing code and persist objects as they are created
> Thirdly, if a new field needs to be added to a document, it can be created without affecting all other documents in the collection, without updating a central system catalog and without taking the database offline
> Through these advantages, the flexibility of the document data model is well suited to the demands of modern application development practices
> While a flexible schema is a powerful feature, there are situations where you might want more control over the data structure and content of your documents
> Most document databases push enforcement of these controls back to the developer to implement in application code