const express = require("express");
const routes = require("./routes");
require("./config/mongodb");
let app = express();

app.use(express.urlencoded({extended: true}));
app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port number ${PORT}`))