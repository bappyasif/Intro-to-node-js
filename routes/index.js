let express = require("express");
let routes = express();

let array = [];

routes.get("/", (req, res) => res.json({name: "hoxieloxie"}));
routes.get("/test", (req, res) => res.json({array}))
routes.post("/test", (req, res) => {
    array.push(req.body.item)
    res.send("veel success!!")
});

module.exports = routes;