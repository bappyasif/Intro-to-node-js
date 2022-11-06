require("./configs/database");
const cors = require("cors");
const express = require("express");
const routes = require("./routes")
const app = express();
const User = require("./models/user");
// require("./utils/fakeSeeds");
// require("./configs/twitter")
require("./configs/passport")
const cookieSession = require("cookie-session");
const passport = require("passport");

// settingup cookie
app.use(cookieSession({
    maxAge: 24*60*60*1000, // cookie time in millis
    keys: [process.env.PASSPOSRT_KEY]
}))

// initilize passport
app.use(passport.initialize())
app.use(passport.session())

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))