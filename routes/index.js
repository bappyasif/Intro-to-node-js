let express = require("express");
let routes = express();

let array = [];

routes.get("/", (req, res) => res.json({name: "hoxieloxie"}));
routes.get("/users", (req, res) => res.status(200).json({name: "ab", email: "a@b.cd"}))
routes.get("/test", (req, res) => res.json({array}))
routes.post("/test", (req, res) => {
    array.push(req.body.item)
    res.send("veel success!!")
});

module.exports = routes;