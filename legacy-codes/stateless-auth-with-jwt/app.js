require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser");
//jwt stuff
const jwt = require("jsonwebtoken");
// let opts = require("./strategies/jwt")
let opts = {}

//passport stuff
// const passport = require("passport");
// const jwtStrategy  = require("./strategies/jwt")
// passport.use(jwtStrategy);

let app = express();

// passport.use(jwtStrategy);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.get("/", (req, res) => res.send("public and landing route"))
app.post("/", (req, res) => res.send(req.body))
app.post("/login", (req, res, next) => {
    let {email, password} = req.body
    console.log(email, password, "<<>>", req.body, req.body.email)
    //This lookup would normally be done using a database
    if (email == "a@b.cd") {
        if (password == "pass") { //the password compare would normally be done using bcrypt.
            opts.expiresIn = 120;  //token expires in 2min
            const secret = "SECRET_KEY" //normally stored in process.env.secret
            const token = jwt.sign({ email }, secret, opts);
            return res.status(200).json({
                message: "Auth Passed",
                token
            })
        }
    }
    return res.status(401).json({ message: "Auth Failed" })
    // res.send(req.body)
})

// app.get("/protected", passport.authenticate('jwt', jwtStrategy, { session: false }), (req, res) => {
//     return res.status(200).send("YAY! this is a protected Route")
// })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))