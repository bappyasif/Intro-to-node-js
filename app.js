require("./configs/database");
const cors = require("cors");
const express = require("express");
const routes = require("./routes")
const app = express();
const User = require("./models/user");
// require("./utils/fakeSeeds");
// require("./configs/twitter")
require("./configs/passport")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))