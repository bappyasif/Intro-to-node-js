const indexRoute = require("../routes");

const request = require("supertest");
const express = require("express");
const initializeMongoDbServer = require("./mongoDbConfigTesting");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", indexRoute);

test("index route is functioning", done => {
    request(app)
        .get("/")
        .expect("Content-Type, /json/")
        .expect({ name: "hoxieloxie" })
        .expect(200, done)
});

test("test route is functioning", done => {
    request(app)
        .post("/test")
        .type("form")
        .send({ item: "hey hoe" })
        .then(() => {
            request(app)
                .get("/test")
                .expect({ array: ["hey hoe"] }, done)
        });
});

// test("mongodb connection is on", done => {
//     request(initializeMongoDbServer)
// })