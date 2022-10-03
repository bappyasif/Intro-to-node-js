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
