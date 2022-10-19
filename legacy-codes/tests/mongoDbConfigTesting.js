const mongoose = require("mongoose");
const {MongoMemoryServer} = require("mongodb-memory-server");

async function initializeMongoDbServer() {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    mongoose.connect(mongoUri);

    mongoose.connection.on("error", event => {
        if(event.message.code === "ETIMEDOUT") {
            console.log(event);
            mongoose.connect(mongoUri);
        }
        console.log(event);
    })

    mongoose.connection.once("open", () => {
        console.log(`mongoDB successfully connected to ${mongoUri}`);
    });
}

module.exports = initializeMongoDbServer;