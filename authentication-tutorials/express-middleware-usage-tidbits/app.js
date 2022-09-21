let express = require("express");

let app = express();

// using a middleware globally
let someMiddleware2 = (req, res, next) => {
    console.log("some middleware nummer twee");
    // we can have custom variable assigned to middlewares as well
    // and later on use or mutate down otehr middlewares
    req.customProp = 200;

    next(); // withoit this it doe not go to next function and keeps on loading
}
app.use(someMiddleware2)

let getRequset = (requ, resp, next) => {
    console.log("get request")
    resp.send(`<h1>Hallooooo!! heel mooi ${requ.customProp}</h1>`)
}

let someMiddleware1 = (req, res, next) => {
    console.log("some middleware nummer een", req.customProp);
    // mutating customProp
    req.customProp = 400;
    next(); // withoit this it doe not go to next function and keeps on loading
}
app.use(someMiddleware1);

let someMiddleware3 = (req, res, next) => {
    console.log("some middleware nummer drie", req.customProp);
    // mutating customProp
    req.customProp = 600;
    next(); // withoit this it doe not go to next function and keeps on loading
}

let someMiddleware4 = (req, res, next) => {
    console.log("some middleware nummer vier", req.customProp);
    // let err = new Error(("an error has occured!!"))
    req.customProp = 800;
    next(); // withoit this it doe not go to next function and keeps on loading
}
app.use(someMiddleware4)

// error handling with middleware
let errorHandler = (err, req, res, next) => {
    if(err) {
        res.send("<h1>some error has occured</h1>")
    }
}
// app.use(errorHandler)

// using middleware for a specific route
app.get("/", someMiddleware3, getRequset)

// we should always use error handler midldleware at very bottom so if there is any error in between, we cab catch it and show more friendly useful error message
app.use(errorHandler);

app.listen(3000, () => console.log("app running port 3000"))