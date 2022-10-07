**Learn using JWT with Passport authentication**

*Introduction*

Almost every web and mobile app nowadays have authentication. Most of them offer different login methods like Facebook, Google or email/password at once

Passport is a Node.js middleware that offers a variety of different request authentication strategies that are easy to implement. By default, it stores the user object in session

JSON Web Tokens is an authentication standard that works by assigning and passing around an encrypted token in requests that helps to identify the logged in user, instead of storing the user in a session on the server and creating a cookie. It has different integrations including a Node.js module (jsonwebtoken)

we'll work through a tutorial about using this two modules together and setting up an authentication on an express based backend. Luckily, Passport allows an option to store the user object in request instead of the session

in this tutorial we will use a simple local (email/password) authentication, but it may as well be used with any other strategy. dependencies `npm install --save passport passport-local passport-jwt jsonwebtoken`

Now here is how everything is going to work:
* When the user logs in, the backend creates a signed token and returns it in response
* client saves the token locally (typically in localStorage ) and sends it back in every subsequent request that needs authentication
* All requests needing authentication pass through a middleware that checks the provided token and allows the request only if the token is verified

So, let’s implement this logic.

*Login*
* Assume we have set up and used the local passport strategy in a separate file next to app.js
* We need to require this file in  app.js.
* Now, in our auth.js route file, we’ll implement the login action, we call the passport authentication function with local strategy, handle the errors and log in the user
* Also, we create and return a signed JSON web token based on the user object to the client. idea is, to store the minimum info that you can use without having to retrieve the user from the database in all the authenticated requests

*Protected requests*

Now, we’ll create a middleware, that allows only requests with valid tokens to access some special routes needing authentication, eg. /user/profile. For this, we will use the passport-jwt strategy. We’ll add it in our passport.js file

Note, that we assume that the client will send the JWT token in Authorization Header as a Bearer TokenPassport JWT Strategy supports many other ways of getting the token from requests. Choose whichever suits your needs

Now, all we need to do is to use this middleware in our app for the protected routes. For this tutorial, we’ll prepare a simple user route like this: And use the passport authentication middleware on user route in app.js

And that’s it! now they’ll be backed with JSON Web Token authorization with Passport