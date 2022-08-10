// commmand to start mongod, before database is ready to accept changes in it
// sudo systemctl start mongod
// command to stop mongod
// sudo systemctl stop mongod
// command to check status
// sudo systemctl status mongod

let mongoose = require("mongoose");

let User = require("./User")

mongoose.connect("mongodb://localhost/testdb", () => console.log("connected"))

// using advanced mongoose techniques
let run = async () => {
    try {
        // using method on query, such as methods like find(), where()
        let queryUser = await User.find().byName("Hoxie")
        console.log(queryUser, 'queryUser')
        // using static method on model schema
        queryUser = await User.findByNameV2("Hoxie")
        console.log(queryUser, 'queryUser')

        // using a static method
        let staticUser = await User.findByNameV1("Hoxie Loxie");
        console.log(staticUser)

        let sampleUser = await User.findOne({name: "Hoxie", email: "tests@s.g"})
        console.log(sampleUser, "before")
        // using method from schema
        sampleUser.sayHi();
        // using virual property from schema model
        console.log(sampleUser.namedEmail)
        // invoking middlewares
        await sampleUser.save()
        console.log(sampleUser, "after")

    } catch (err) {
        console.log(err, err.message)
    }
}

run()


/**
 * 
 * 
 // using queries
let run = async () => {
    try {
        // let sampleUser = await User.where("name").equals("Hoxie Loxie")
        // let sampleUser = await User.where("age").gt(20)

        // let sampleUser = await User.where("age").gt(20).where("name").equals("Hoxie Loxie")
        // let sampleUser = await User.where("age").gt(20).lt(29).where("name").equals("Hoxie Loxie")
        // let sampleUser = await User.where("age").gt(20).lt(29).where("name").equals("Hoxie Loxie").limit(2)
        // let sampleUser = await User.where("age").gt(20).lt(29).where("name").equals("Hoxie Loxie").limit(2).select("age")
        // let sampleUser = await User.where("age").gt(20).lt(29).where("name").equals("Hoxie Loxie").limit(2).select({"age": 1, "name": 1})
        
        // updating record
        // let sampleUser = await User.where("age").gt(20).lt(29).where("name").equals("Hoxie Loxie").limit(1).select({"age": 1, "name": 1})
        // sampleUser[0].bestFriend = "62f3c28085f0a639677309e6"
        // await sampleUser[0].save()

        // using populate, which alows us to join without actually have to do join
        let sampleUser = await User.where("age").gt(20).lt(29).where("name").equals("Hoxie Loxie").limit(1).populate("bestFriend").select({"age": 1, "name": 1})
        console.log(sampleUser)

    } catch (err) {
        console.log(err, err.message)
    }
}
 * 
 * 
 // using validation on methods other than create and save
let run = async () => {
    try {
        // returns an exact match, same as it is in mongoDB
        // let sampleUser = await User.findById("62f3ce2057c5a53209539353")

        // returns an array of matched records, same as it is in mongoDB
        // let sampleUser = await User.find({name: "Hoxie"})

        // returns if this exists, same as it is in mongoDB
        // let sampleUser = await User.exists({name: "Hoxie"})

        // returns first matched record, same as it is in mongoDB
        // let sampleUser = await User.findOne({name: "Hoxie"})

        // returns first matched record, same as it is in mongoDB
        let sampleUser = await User.deleteOne({name: "Hoxie"})
        console.log(sampleUser)
    } catch (err) {
        console.log(err, err.message)
    }
}
 * 
 * 
// with type validation, for create and save method
let run = async () => {
    try {
        // validation either built in or custom, they only work in create or save method not in anyother method
        let sampleUser = await User.create({
            name: "Hoxie",
            age: 22,
            // this will fail due to schema custom validation
            // age: 23,
            // this will fail it doesnt meet given constraints in schema for min and max limit
            // age: -22,
            // age: 27,
            email: "Tests@s.g",
            // this will fail schema validation constraints
            // email: "T@s.g",
            // email: "Ttthhjyjyjyjys@s.g",
            hobbies: ["learning foreign language", "working out"],
            address: { "city": "Dhaka" }
        })
        // trying changing immutable field
        sampleUser.createdAt = 69;
        // createdAt wont be updated, as its immutable in schema definition
        await sampleUser.save();

        console.log(sampleUser)
    } catch (err) {
        console.log(err, err.message)
    }
}
 * 
 * 
 // without error handling
 let run = async () => {
    let sampleUser = await User.create({
        name: "Hoxie",
        age: "sssssddddd",
        hobbies: ["learning foreign language", "working out"],
        address: {"city": "Dhaka"}
    })
    console.log(sampleUser)
}
 * 
 * 
 // update demo
 let run = async () => {
    // updating data in database
    let sampleUser = await User.create({ name: "Hoxie", age: 22 })
    sampleUser.name = "Hoxie Loxie";
    sampleUser.save()

    console.log(sampleUser)
}
 * 
 * 
// begining steps
 let run = async () => {
    // let sampleUser = new User({ name: "Hoxie", age: 22 })
    // await sampleUser.save()

    // equivalent method
    // let sampleUser = await User.create({ name: "Hoxie", age: 22 })

    // updating data in database
    let sampleUser = await User.create({ name: "Hoxie", age: 22 })
    sampleUser.name = "Hoxie Loxie";
    sampleUser.save()

    console.log(sampleUser)
}

run()

// let sampleUser = new User({ name: "Hoxie", age: 22 })

// await sampleUser.save().then(() => console.log("user saved")).catch(e => console.log(e))
 */