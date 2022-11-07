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
// const { createProxyMiddleware } = require('http-proxy-middleware');

// app.use(
//     '/api',
//     createProxyMiddleware({
//         target: 'http://localhost:3001',
//         changeOrigin: true,
//     })
// );

// settingup cookie
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // cookie time in millis
    keys: [process.env.PASSPORT_KEY]
}))

// app.use(cors({ origin: "http://localhost:3001", credentials: true, preflightContinue: true }));

// initilize passport
app.use(passport.initialize())
app.use(passport.session())

// app.options(routes, cors())
// app.use(cors());
// app.use(cors({origin: "http://localhost:3001", credentials: true, preflightContinue: true}));
// app.use(cors({
//     'allowedHeaders': ['Content-Type'], // headers that React is sending to the API
//     'exposedHeaders': ['Content-Type'], // headers that you are sending back to React
//     'origin': 'http://localhost:3001',
//     'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     'preflightContinue': false
// }));

app.use(cors({
    // "Access-Control-Allow-Origin": "http://localhost:3001",
    "origin": "http://localhost:3001",
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
}))

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))