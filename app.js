const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => res.send("you're here!!"))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))