**How to create a REST API with Express.js in Node.js**

An Express application is most often used as a backend application in a client-server architecture whereas the client could be written in React.js or another popular frontend solution and the server could be written in Express

Both entities result in a client-server architecture (frontend and backend relationship) whereas the backend would be needed for (A) business logic that shouldn't be exposed as source code to the frontend application -- otherwise it would be accessible in the browser -- or for (B) establishing connections to third-party data sources (e.g. database(s))

However, don't mistake client application always for frontend and server application always for backend here. These terms cannot be exchanged that easily. Whereas a frontend application is usually something seen in the browser, a backend usually performs business logic that shouldn't be exposed in a browser and often connects to a database as well
> Frontend -> Backend -> Database

But, in contrast, the terms client and server are a matter of perspective. A backend application (Backend 1) which consumes another backend application (Backend 2) becomes a client application (Backend 1) for the server application (Backend 2). However, the same backend application (Backend 1) is still the server for another client application which is the frontend application (Frontend)
> Frontend -> Backend 1 -> Backend 2 -> Database
> 
> // Frontend: Client of Backend 1
> 
> // Backend 1: Server for Frontend, also Client of Backend 2
> 
> // Backend 2: Server for Backend 1

If you want to answer the client-server question if someone asks you what role an entity plays in a client-server architecture, always ask yourself who (server) is serving whom (client) and who (client) consumes whom's (backend) functionalities?

That's the theory behind client-server architectures and how to relate to them. How do client and server applications communicate with each other? Over the years, there existed a few popular communication interfaces (APIs) between both entities. However, the most popular one is called REST defined in 2000 by Roy Fielding. It's an architecture that leverages the HTTP protocol to enable communication between a client and a server application

A server application that offers a REST API is also called a RESTful server. Servers that don't follow the REST architecture a 100% are rather called RESTish than RESTful. In the following, we are going to implement such REST API for our Express server application, but first let's get to know the tooling that enables us to interact with a REST API

**CURL FOR REST APIS**

cURL [...] is a computer software project providing a library and command-line tool for transferring data using various protocols. Since REST is an architecture that uses HTTP, a server that exposes a RESTful API can be consumed with cURL, because HTTP is one of the various protocols.

setup a basic express app, and then install "curl" and then start server, and then open up another terminal and execute command `curl http://localhost:3000`, it will show basic response from server as it was detup in app, usually it should return somethign like "hello world!!"

if it happens to be so then, Congratulations, you just have consumed your Express server as a client with something else than a browser
> Browser (Client) -> Express Server
> 
> cURL (Client) -> Express Server

Whether you access your Express application on http://localhost:3000 in the browser or via the command line with cURL, you should see the same result. Both tools act as clients whereas the Express application is your server

**EXPRESS ROUTES: HTTP METHODS ARE REST OPERATIONS**

Express is a perfect choice for a server when it comes to creating and exposing APIs (e.g. REST API) to communicate as a client with your server application. Previously you have already implemented one Express route, which sends a "Hello World!", that you have accessed via the browser and cURL

Let's set up more routes to accommodate a RESTful API for your Express application eventually. Add the following routes to your Express application whereas the URI itself doesn't change, but the method used from your Express instance: GET / POST / PUT / DELETE

Every Express instance's method maps to a HTTP method. By default cURL will use a HTTP GET method. However, you can specify the HTTP method with the -X flag (or --request flag). Depending on the HTTP method you are choosing, you will access different routes of your Express application

That's one of the key aspects of REST: It uses HTTP methods to perform operations on URI(s). Often these operations are referred to as CRUD operations for create, read, update, and delete operations

**EXPRESS ROUTES: URIS ARE REST RESOURCES**

Another important aspect of REST is that every URI acts as a resource. So far, you have only operated on the root URI with your CRUD operations, which doesn't really represent a resource in REST. In contrast, a resource could be a user resource, for example. Change your previously introduced routes to the following: from "/" to "/users"

You will see a similar output as before, but this time you are operating on a user resource. Obviously we don't transfer any information for creating a user yet, however, the API endpoint for creating a user would be available now. One piece is missing to make the PUT HTTP method (update operation) and DELETE HTTP method (delete operation) RESTful from a URI's point of view: use of `/users/:userId'` this variable can be accessed through `req.params.userId`

In order to delete or update a user resource, you would need to know the exact user. That's where unique identifiers are used. In our Express routes, we can assign unique identifiers with parameters in the URI. Then the callback function holds the URI's parameter in the request object's properties


**MAKING SENSE OF REST WITH EXPRESS**

You may be still wondering: What value brings the combination of URIs and HTTP methods -- which make up the majority of the REST philosophy -- to my application?

Let's imagine we wouldn't just return a result, as we do at the moment, but would act properly on the received operation instead. For instance, the Express server could be connected to a database that stores user entities in a user table. 

Now, when consuming the REST API as a client (e.g. cURL, browser, or also a React.js application), you could retrieve all users from the database with a HTTP GET method on the /users URI or, on the same resource, create a new user with a HTTP POST method

```
// making sense of the naming

Express Route's Method <=> HTTP Method <=> REST Operation
Express Route's Path <=> URI <=> REST Resource
```
Suddenly you would be able to read and write data from and to a database from a client application. Everything that makes it possible is a backend application which enables you to write a interface (e.g. REST API) for CRUD operations: 
> Client -> REST API -> Server -> Database

Whereas it's important to notice that the REST API belongs to the server application:
> Client -> (REST API -> Server) -> Database

You can take this always one step further by having multiple server applications offering REST APIs. Often they come with the name microservices or web services whereas each server application offers a well-encapsulated functionality. servers even don't have to use the same programming language, because they are communicating over a programming language agnostic interface (HTTP with REST). Although the interfaces (APIs) don't have to be necessary REST APIs
```
       -> (GraphQL API -> Server) -> Database
Client
       -> (REST API -> Server) -> Database
```
Let's take everything we learned in theory, so far, one step further towards a real application by sending real data across the wire. data will be sample data, which will not come from a database yet, but will be hardcoded in the source code instead:

Next to the user entities, we will have message entities too. Both entities are related to each other by providing the necessary information as identifiers (e.g. a message has a message creator). That's how a message is associated with a user and how you would retrieve the data from a database, too, whereas each entity (user, message) has a dedicated database table. Both are represented as objects that can be accessed by identifiers. Let's start by providing two routes for reading the whole list of users and a single user by identifier:GET requests for `/users` and `/users/userId`

Whereas we pick a user from the object by identifier for the single users route, we transform the user object to a list of users for the all users route. same should be possible for the message resource: 

**APPLICATION-LEVEL EXPRESS MIDDLEWARE**

Before we jump into Express middleware again, let's see how a scenario for creating a message could be implemented in our Express application

Since we are creating a message without a database ourselves, we need a helper library to generate unique identifiers for us. Install this helper library on the command line: `npm install uuid` Next import it `import { v4 as uuidv4 } from 'uuid';` Now lets, create a message with a new route that uses a HTTP POST method:

We generate a unique identifier for the message with the new library, use it as property in a message object with a shorthand object property initialization, assign the message by identifier in the messages object -- which is our pseudo database --, and return the new message after it has been created.

However, something is missing for the message. In order to create a message, a client has to provide the text string for the message. Fortunately a HTTP POST method makes it possible to send data as payload in a body. That's why we can use the incoming request (req) to extract a payload from it:

Accessing the payload of an HTTP POST request is provided within Express with its built-in middleware which is based on body-parser. It enables us to transform body types from our request object (e.g. json, urlencoded)

This extracts the entire body portion of an incoming request stream and makes it accessible on req.body. Now the body with the message's text is accessible in the request whether it is send by a regular POST request or a POST request from a HTML form. Both options should work, because all data should be received and send as JSON payload now

Note that all data that comes with the request object's body tag isn't typed yet. Everything comes as a JSON string. In the case of the message's text, we are doing fine with just keeping it as a string. However, for other types you would have to convert the JSON string:
```
const date = Date.parse(req.body.date);
const count = Number(req.body.count);
```
In this last step, we have used a built-in Express middleware and made it available on an application-level -- which means that each request that arrives at one of our Express routes goes through the middleware. Therefore, all data send by a client to our server is available in the incoming request's body. In a cURL request you can specify HTTP headers with the -H flag -- that's how we are saying we want to transfer JSON -- and data as payload with the -d flag: `curl -X POST -H "Content-Type:application/json" http://localhost:3000/messages -d '{"text":"Hi again, World"}'`

You should see the created messaged returned to you on the command line. You can double check whether the message was really created in your messages object (aka pseudo database) by performing another cURL requests on the command line: "/message"

There you should see the new message which has been created for you. In addition, you should also be able to request your new message by identifier. Perform the following cURL request to get a single message entity, but use your actual message identifier for it, because my identifier is different from yours: `curl http://localhost:3000/messages/849d9407-d7c6-4712-8c91-1a99f7b22ef5`

That's it. You have created your first resource (message) via your REST API and requested the same resource (message(s)) from your REST API. On top of that, you have used a built-in Express middleware to make the data available in the request's body object

So far, we have only imported third-party Express middleware (CORS) or used a built-in Express middleware (body parser) -- both on an application-level. Now, let's build a custom Express middleware ourselves, which will be used on an application-level too. blueprint for a middleware is similar to the Express functions we have seen before:
```
app.use((req, res, next) => {
  // do something
  next();
});
```
A middleware is just a JavaScript function which has access to three arguments: req, res, next. You already know req and res -- they are our request and response objects. In addition, the next function should be called to signalize that the middleware has finished its job. In between of the middleware function you can do anything now. We could simply console.log() the time or do something with the request (req) or response (res) objects

In our particular case, when creating a message on the message resource, we need to know who is creating the message to assign a userId to it. Let's do a simple version of a middleware that determines a pseudo authenticated user that is sending the request. In the following case, the authenticated user is the user with the identifier 1 which gets assigned as me property to the request object:
```js
app.use((req, res, next) => {
  req.me = users[1];
  next();
});
```
Afterward, you can get the authenticated user from the request object and append it as message creator to the message: Afterward, you can get the authenticated user from the request object and append it as message creator to the message: `userId: req.me.id` in message POST request

You can imagine how such middleware could be used later to intercept each incoming request to determine from the incoming HTTP headers whether the request comes from an authenticated user or not. If the request comes from an authenticated user, the user is propagated to every Express route to be used there. That's how the Express server can be stateless while a client always sends over the information of the currently authenticated user

Being a stateless is another characteristic of RESTful services. After all, it should be possible to create multiple server instances to balance the incoming traffic evenly between the servers. If you heard about the term load balancing before, that's exactly what's used when having multiple servers at your hands. That's why a server shouldn't keep the state (e.g. authenticated user) -- except for in a database -- and the client always has to send this information along with each request. Then a server can have a middleware which takes care of the authentication on an application-level and provides the session state (e.g. authenticated user) to every route in your Express application

Now, that you have learned the essentials about application-level middleware in Express, let's implement the last routes to complete our application's routes. What about the operation to delete a message: Here we used a dynamic object property to exclude the message we want to delete from the rest of the messages object. You can try to verify the functionality with the following cURL command: `curl -X DELETE http://localhost:3000/messages/1` also implemented "PUT" method as well for messages resource

Last, since you have already the pseudo authenticated user at your hands due to the application-wide middleware, you can offer a dedicated route for this resource too:
```
app.get('/session', (req, res) => {
  return res.send(users[req.me.id]);
});
```
It's the first time you break the rules of being entirely RESTful, because you offer an API endpoint for a very specific feature. It will not be the first time you break the laws of REST, because most often REST is not fully implemented RESTful but rather RESTish