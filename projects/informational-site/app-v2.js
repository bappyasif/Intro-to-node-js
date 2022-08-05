let http = require("http");
let express = require('express')
let app = express()

let publicFolder = "./views/"

app.get("/", (req, res) => {
    res.sendFile("index.html", {root: publicFolder})
})

app.get("/about", (req, res) => {
    res.sendFile("about.html", {root: publicFolder})
})

app.get("/contact", (req, res) => {
    res.sendFile("contact.html", {root: publicFolder})
})

app.use((req, res) => res.sendFile("404.html", {root: publicFolder}))

app.listen(8080, () => console.log('server is running on port nummer 8080'))