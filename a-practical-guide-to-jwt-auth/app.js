require("dotenv").config();
const express = require("express");

let app = express();

app.get("/", (req, res) => res.send("public route"));

app.get("/api/auth/signin", (req, res, next) => {
    // if user exists the token was sent with the request
  if(req.user){
    //if user exists then go to next middleware
      next();
   }
 // token was not sent with request send error to user
   else{
      res.status(500).json({error:'login is required'});
   }
})

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))