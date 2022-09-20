**What is Session Based Authentication?**
* If we were to create a lineage for these authentication methods, session based authentication would be the oldest of them all, but certainly not obsolete
* Session based authentication is at the root of the passport-local strategy
* This method of authentication is “server-side”, which means our Express application and database work together to keep the current authentication status of each user that visits our application
* To understand the basic tenets of session-based-authentication, you need to understand a few concepts:
  * Basic HTTP Header Protocol
  * What a cookie is
  * What a session is
  * How the session (server) and cookie (browser) interact to authenticate a user

*HTTP Headers*
* There are many ways to make an HTTP request in a browser
* An HTTP client could be a web application, IoT device, command line (curl), or a multitude of others
* Each of these clients connect to the internet and make HTTP requests which either fetch data (GET), or modify data (POST, PUT, DELETE, etc.)

* The request that you (as the client) made will have General and Request headers resembling (but not exact) the following:
  * General Headers
  * Request Headers
* When you typed www.google.com into your address bar and pressed enter, your HTTP request was sent with these headers (and probably a few others)
* Although these headers are relatively self-explanatory, I want to walk through a few to get a better idea of what HTTP Headers are used for
* General headers:
  * can be a mix of both request and response data
  * Clearly, the Request URL and Request Method are part of the request object and they tell the Google Chrome browser where to route your request
  * Status Code is clearly part of the response because it indicates that your GET request was successful and the webpage at www.google.com loaded okay
* Request Headers: 
  * only contain headers included with the request object itself
  * You can think of request headers as “instructions for the server”
  * In this case, my request tells the Google server the following: 
    * Hey Google Server, please send me HTML or text data
    * Hey Google Server, please only send me English words
    * Hey Google Server, please don’t close my connection with you after the request is over
* There are many more request headers that you can set, but these are just a few common ones that you will probably see on all HTTP requests
* So when you searched for www.google.com, you sent your request and the headers to the Google Server (for simplicity, we will just assume it is one big server)
* Google Server accepted your request, read through the “instructions” (headers), and created a response
* Response was comprised of:
  * HTML data (what you see in your Browser)
  * HTTP Headers
* As you might have guessed, the “Response Headers” were those set by the Google Server
* Here are a few that you might see: 
```
Response Headers
  Content-Length: 41485
  Content-Type: text/html; charset=UTF-8
  Set-Cookie: made_up_cookie_name=some value; expires=Thu, 28-Dec-2020 20:44:50 GMT;
```
* These response headers are fairly straightforward with the exception of the Set-Cookie header
* I included the Set-Cookie header because it is exactly what we need to understand in order to learn what Session-based Authentication is all about (and will help us understand other auth methods later in this post)

*How Cookies Work*
* Without Cookies in the browser, we have a problem
* If we have a protected webpage that we want our users to login to access, without cookies, those users would have to login every time they refresh the page!
* That is because the HTTP protocol is by default “stateless”
* Cookies introduce the concept of “persistent state” and allow the browser to “remember” something that the server told it previously
* Google Server can tell my Google Chrome Browser to give me access to a protected page, but the second I refresh the page, my browser will “forget” this and make me authenticate again
* This is where Cookies come in, and explains what the Set-Cookie header is aiming to do
* Here’s how this interaction works:
  * Server: “Hey client! I want you to set a cookie called made_up_cookie_name and set it equal to some value
  * Client: “Hey server, I will set this on the Cookie header of all my requests to this domain until Dec 28, 2020!”
* This cookie will now be set to the Cookie Request Header on all requests made to www.google.com until the expiry date set on the cookie
* An overly simplified process of how this might work would be:
  * Random person from the coffee shop types www.example-site.com/login/ into the browser
  * Random person from the coffee shop fills out a form on this page with a username and password
  * Random person’s Google Chrome Browser submits a POST request with the login data (username, password) to the server running www.example-site.com
  * server running www.example-site.com receives the login info, checks the database for that login info, validates the login info, and if successful, creates a response that has the header Set-Cookie: user_is_authenticated=true; expires=Thu, 1-Jan-2020 20:00:00 GMT
  * random person’s Google Chrome browser receives this response and sets a browser cookie
  * random person now visits www.example-site.com/protected-route/
  * random person’s browser creates an HTTP request with the header Cookie: user_is_authenticated=true; expires=Thu, 1-Jan-2020 20:00:00 GMT attached to the request
  * server receives this request, sees that there is a cookie on the request, “remembers” that it had authenticated this user just a few seconds ago, and allows the user to visit the page
* Reality of this Situation:
  * Obviously, what I have just described would be a highly insecure way to authenticate a user
  * In reality, the server would create some sort of hash from the password the user provided, and validate that hash with some crypto library on the server
  * That said, the high-level concept is valid, and it allows us to understand the value of cookies when talking about authentication

*Sessions*
* Sessions and cookies are actually quite similar and can get confused because they can actually be used together quite seamlessly
* main difference between the two is the location of their storage
* In other words, a Cookie is set by the server, but stored in the Browser
* If the server wants to use this Cookie to store data about a user’s “state”, it would have to come up with an elaborate scheme to constantly keep track of what the cookie in the browser looks like
* It might go something like this:
  * Server: Hey browser, I just authenticated this user, so you should store a cookie to remind me (Set-Cookie: user_auth=true; expires=Thu, 1-Jan-2020 20:00:00 GMT) next time you request something from me
  * Browser: Thanks, server! I will attach this cookie to my Cookie request header
  * Browser: Hey server, can I see the contents at www.domain.com/protected? Here is the cookie you sent me on the last request
  * Server: 
    * Sure, I can do that. Here is the page data
    * I have also included another Set-Cookie header (Set-Cookie: marketing_page_visit_count=1; user_ip=192.1.234.21) because the company that owns me likes to track how many people have visited this specific page and from which computer for marketing purposes
  * Browser: Okay, I’ll add that cookie to my Cookie request header
  * Browser: Hey Server, can you send me the contents at www.domain.com/protected/special-offer? Here are all the cookies that you have set on me so far. (Cookie: user_auth=true; expires=Thu, 1-Jan-2020 20:00:00 GMT; marketing_page_visit_count=1; user_ip=192.1.234.21)
* As you can see, the more pages the browser visits, the more cookies the Server sets, and the more cookies the Browser must attach in each request Header
* Server might have some function that parses through all the cookies attached to a request and perform certain actions based on the presence or absence of a specific cookie
* To me, this naturally begs the question… Why doesn’t the server just keep a record of this information in a database and use a single “session ID” to identify events that a user is taking?
* This is exactly what a session is for
* A session is stored in some Data Store (a fancy term for a database) while a Cookie is stored in the Browser
* Since the session is stored on the server, it can store sensitive information
* Storing sensitive information in a cookie would be highly insecure
* Since Cookies are the method in which the client and server communicate metadata (among other HTTP Headers), a session must still utilize cookies
* easiest way to see this interaction is by actually building out a simple authentication application in Node + Express + MongoDB

* Here is a brief overview of what the Express Session Middleware is doing:
  * When a route is loaded, the middleware checks to see if there is a session established in the Session Store (MongoDB database in our case since we are using the connect-mongo custom Session Store)
  * If there is a session, the middleware validates it cryptographically and then tells the Browser whether the session is valid or not. If it is valid, the Browser automatically attaches the connect.sid Cookie to the HTTP request
  * If there is no session, the middleware creates a new session, takes a cryptographic hash of the session, and stores that value in a Cookie called connect.sid. It then attaches the Set-Cookie HTTP header to the res object with the hashed value (Set-Cookie: connect.sid=hashed value)

* When a new session is created, the following properties are added to the req object:
  * req.sessionID - A randomly generated UUID. You can define a custom function to generate this ID by setting the genid option. If you do not set this option, the default is to use the uid-safe module
  ```app.use(session({
        genid: function (req) {
            // Put your UUID implementation here
        }
    }));
    ```
* req.session - The Session object. This contains information about the session and is available for setting custom properties to use. For example, maybe you want to track how many times a particular page is loaded in a single session:
```app.get('/tracking-route', (req, res, next) => {
  if (req.session.viewCount) {
    req.session.viewCount = req.session.viewCount + 1;
  } else {
    req.session.viewCount = 1;
  }
  res.send("<p>View count is: " + req.session.viewCount + "</p>");
});
```
* req.session.cookie - The Cookie object. This defines the behavior of the cookie that stores the hashed session ID in the browser. Remember, once the cookie has been set, the browser will attach it to every HTTP request automatically until it expires
* 
