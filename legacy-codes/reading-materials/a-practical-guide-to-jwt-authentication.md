**A Practical Guide for JWT Authentication Using Node.js and Express**

**Let’s build a stateless solution for authentication**

*Introduction*

Traditional authentication strategy makes use of sessions and cookies, but scaling these solutions is very difficult — as some kind of state is maintained by the server. JWT, on the other hand, provides a stateless solution for authentication, and stateless applications are pretty easy to scale.

*Advantages of JWT*
* Provides a stateless authentication solution
* Very popular and used by many OAuth service providers, like Google and Facebook
* It’s very easy to verify a JWT token
* More trustworthy than cookies and sessions
* Authentication can be outsourced, or an authentication service can be used
* Have many applications other than authentication — for instance, it can be used for claims

*Content*
* JWT structure and overview
* JWT authentication mechanism
* Using JWT authentication with Node.js

***What’s JWT?***

A JSON Web Token (JWT) is a JSON object that’s defined in RFC 7519 as a safe way to represent a set of information between two parties. token is composed of a header, a payload, and a signature

JWT is used for authentication, and they can also be used for sharing information. Most JWT are signed using a public key and a private key; therefore, it’s very difficult to tamper with these tokens. JWT has three parts: head, body and signature, each separated by “.”

*Head*

head is a base64Url-encoded, stringified JS object that contains information about the token. head contains the type of token, the content type of the token, and an algorithm used to sign that token. type is specified by the field type and the algorithm used to sign the token
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
object is then converted to a string and encoded to Base64Url. following code shows how to change the encoding using the buffer module in Node.js
```js
Buffer.from(JSON.stringify({
"alg": "HS256",
"typ": "JWT"
})).toString('base64')
.replace(/=/g, "")                               
.replace(/\+/g, "-")                               
.replace(/\//g, "_");
```
Base64 and Base64URL are the same; however, + is converted to -, and / is converted to _

This is done to ensure there’s no collision between the query string and the token since + has a special meaning in the query string (the same goes for /)

*Body*

body is the as the head, but it contains the claim or data that’s transferred. body may contain special attributes like iss , sub , aud, exp, iat, jti, etc. These attributes have a standard implementation and are accepted by most OAuth services. Some interesting ones are exp and iat. exp specifies the time after which the token will become invalid, and iat specifies the time when the token was created
```json
{
  "sub": "90129920",
  "uuid": "sfgdsrfg434fdt535fg",
  "iat": 1516239022,
  "exp": 1545926973,
}
```
time is used in seconds, following the 1 January 1970 format. body is also converted to Base64URL using the same code as used in the head

*Signature*

This is the most important part of the token because it’s used to verify if the token is valid and authentic. Let’s see how the signature is created `signature=sha256(base64URL(head)+"."+base64URL(body))` token consists of the body and the head encrypted using any hashing algorithm — for example, SHA-256

algorithm can be symmetrical or asymmetrical. It depends upon the needs of the application. example below shows how we can create a signature for JWT
```js
const crypto=require('crypto');
const private_key="dfhghhghgdoghoghg";
const sign = crypto.createHmac('SHA256', private_key)
.update(head + '.' + body)
.digest('base64')
.replace(/=/g, "")                      
.replace(/\+/g, "-")                               
.replace(/\//g, "_")
```
First, we create a stream from crypto.createHmac. We push the base64url-encoded head and body (separated by “.”) to the created stream. Then, we convert the buffer to the base64-encoded string and then to the base64url-encoded string

*Verification*

When the server verifies the token, it creates the hash using the private key. If the hash matches the signature on the token, then the token is authentic. If the token is tempered with, the hash of the token should change. But the hacker can’t create the new hash because the key is saved with the server. Therefore, the token is verified, and the client can also be verified using the data in the body `token=base64url(head)+"."+baser64url(body)+"."+signature`

***How Does Authentication With JWT Work?***

token with user_id is given to the client, and the client sends the token back to the server every time the client makes an HTTP request to the server `body={ user_id:"123nfdwf283", }`

client must store the token in the browser. token can be saved in local storage or session storage. Using local storage will keep the user signed in until the token expires, and session storage will keep the user logged in until the browser tab is closed. token is sent to the server in the authorization header as Bearer {token}

***Using JWT With Node.js***

If you don't want to write your own custom JWT solution, you can always use an npm module for it. We’d first install Express and the JSON Web Tokens library `npm i express jsonwebtoken mongoose body-parser bcrypt`

directory structure of the project
```
root
   -app.js
   -user.js
   -key.js
```
key.js contains the private key, but it’s not a good practice. You should always use an .env variable for such sensitive data `module.exports={tokenKey:"djghhhhuuwiwuewieuwieuriwu"}`

user schema consists of a presave hook. When we create a new user, the password is converted to hash and salt using bcryptjs. A static method is also added to the schema for comparing passwords using hash and salt

Passwords are never saved in the database. passwords are converted to a hash using any hashing algorithm, with the help of salt

salt acts as the private key for the creating the hash. When the user provides a password for login, the password and salt are used to create a hash. created hash is then matched with the stored one. If both hashes match, then the password is matched

Let’s create a simple Express server

route /api/auth/signin first matches the password and then issues a token to the user. token is sent by the user to the server every time in the request header, and the token is parsed by the app.use middleware every time.

middleware also adds user details to the req as req.user. server listens on the port 3001 .We can also write a middleware for protecting routes
```js
function proctectRoute(req,res,next){
  // if user exists the token was sent with the request
  if(req.user){
   //if user exists then go to next middleware
     next();
  }
// token was not sent with request send error to user
  else{
     res.status(500).json({error:'login is required'});
  }
}
```
We can use different options with the JSON Web Tokens library. We can set the expiration time, subject, time of issue, etc
```js
// we can change algorithm used
jwt.sign({ foo: 'bar' }, cert, 
{ algorithm:'RS256'},function(err,token) {
    console.log(token);
});

// we can set expiration time using sync
const token =jwt.sign({data: 'foobar'}, 'secret',
 { expiresIn: 60 * 60 });
```

**Conclusion**

JSON Web Tokens are great for authentications and very easy to use. tutorial shows us how we can use JWT for authentication using Node.js and Express

JWT can also be used for different purposes, which includes any type of claim. JWT used in the tutorial are signed using a symmetrical algorithm, but you can easily use asymmetrical algorithms also. In the asymmetrical algorithm, the private key is used to sign the token, and a public key is used for verifying the tokens