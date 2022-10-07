require("dotenv").config();

const express = require("express");

const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
    res.json({
        message: "welcome to this api"
    });
});

// app.post("/api/posts", (req, res) => {
//     res.json({
//         message: "post created...."
//     })
// })

app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkeygoeshere", (err, authData) => {
        if(err) {
            // res.sendStatus(403)
            res.json({msg: req.token, 
                check: req.token === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwidXNlcm5hbWUiOiJhYiIsImVtYWlsIjoiYUBiLmNvbSJ9LCJpYXQiOjE2NjQ5ODc0NzQsImV4cCI6MTY2NDk4NzUwM30.4uz7ff6XM7_ayb1ufppy4n4EuxMdnU2olSHd1KC3R9E"
            }).status(403)
        } else {
            res.json({
                message: "post created....",
                authData
            })
        }
    })    
})

app.post("/api/login", (req, res, next) => {
    // mock user
    let user = {
        id: 11,
        username: "ab",
        email: "a@b.com"
    }

    jwt.sign({user}, "secretkeygoeshere", {expiresIn: "30s"}, (err, token) => {
        if(err) return next(err);

        res.json({
            token: token
        })
    });
});

// token's fromat
// Authorization: Bearer <access_token>

function verifyToken (req, res, next) {
    // get auth header value
    const bearerHeader = req.headers["authorization"]

    // check if bearer undefined
    if(typeof bearerHeader !== "undefined") {
        // split header
        let bearer = bearerHeader.split(" ");
        // extract token
        let bearerToken = bearer[1];
        // set token
        req.token = bearerToken;
        // move to next middleware
        next();
    } else {
        // res.sendStatus(403);
        res.json({
            message: "FORBIDDEN"
        }).status(403)
    }
}

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))