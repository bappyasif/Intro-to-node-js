**Stateless Auth with Express, Passport, Jwt**

Sometimes we need to authentication a mobile app or spa(single page application) without sessions. Here I illustrate how I would create an api which can authenticate each http request
* Create Express Server
* Create Login Route to create token
* Configure Passport to Verify Token

*Create Express Server*

```js
....
app.get("/", (req, res) => {
    res.send("hello express server")
})

app.post("/login", (req, res) => {
    let { email, password } = req.body;

});
....
```

*Create Login Route to create token*

This is a barebones express application with a basic get and post. Now let’s update the login route to accept the email and password and return a json web token. We use the jsonwebtoken to generate the token and and we send the token back to the client
```js
app.post("/login", (req, res) => {
    let { email, password } = req.body;
    //This lookup would normally be done using a database
    if (email === "paul@nanosoft.co.za") {
        if (password === "pass") { //the password compare would normally be done using bcrypt.
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
});
```

*Configure Passport to Verify Token*

Let’s now configure passport (a tool used to authenticate). Here we only show how passport is used to authenticate a jwt

```js
....
//passport stuff
const passport = require("passport");
const jwtStrategry  = require("./strategies/jwt")
passport.use(jwtStrategry);
....
app.get("/protected", passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).send("YAY! this is a protected Route")
})
....
```
Here we see the passport-jwt lib is imported so that we can create our custom jwt Strategy. In this example, the passport-jwt lib helps us decode and extract the email from the token and check if this is a valid email address. IF so the request is passed through otherwise authetication will fail