const indexRoute = require("../routes");

const request = require("supertest");
const express = require("express");
const initializeMongoDbServer = require("./mongoDbConfigTesting");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", indexRoute);

describe("root route is functioning", () => {
    test("index route is functioning", done => {
        request(app)
            .get("/")
            // .expect("content-type, json")
            .expect('Content-Type', /json/)
            .expect({ name: "hoxieloxie" })
            .expect(200, done)
    });
})

describe("post route is functioning", () => {
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
})

describe('GET /users', function () {
    it('responds with json', async function () {
        const response = await request(app)
            .get('/users')
            .set('Accept', 'application/json')
        // expect(response.headers["Content-Type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body.email).toEqual('a@b.cd');
    });
});

// test("test route is functioning", done => {
//     request(app)
//         .post("/test")
//         .type("form")
//         .send({ item: "hey hoe" })
//         .then(() => {
//             request(app)
//                 .get("/test")
//                 .expect({ array: ["hey hoe"] }, done)
//         });
// });

// test("mongodb connection is on", done => {
//     request(initializeMongoDbServer)
// })