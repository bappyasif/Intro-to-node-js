*** Web servers and HTTP (a primer) ***
> Web browsers communicate with web servers using the HyperText Transfer Protocol (HTTP)
> When you click a link on a web page, submit a form, or run a search, the browser sends an HTTP Request to the server
> this requests includes: 
* A URL identifying the target server and resource (e.g. an HTML file, a particular data point on the server, or a tool to run)
* A method that defines the required action (for example, to get a file or to save or update some data)
* different methods/verbs and their associated actions are listed below:
  * GET: 
    > Get a specific resource (e.g. an HTML file containing information about a product, or a list of products)
  * POST: 
    > Create a new resource (e.g. add a new article to a wiki, add a new contact to a database)
  * HEAD: 
    > Get the metadata information about a specific resource without getting the body like GET would
    > You might for example use a HEAD request to find out the last time a resource was updated, and then only use the (more "expensive") GET request to download the resource if it has changed
  * PUT: 
    > Update an existing resource (or create a new one if it doesn't exist)
  * DELETE: 
    > Delete the specified resource
  * TRACE, OPTIONS, CONNECT, PATCH: These verbs are for less common/advanced tasks
* Additional information can be encoded with the request (for example, HTML form data)
* Information can be encoded as: 
  * URL parameters: 
    > GET requests encode data in the URL sent to the server by adding name/value pairs onto the end of it — for example http://example.com?name=Fred&age=11
    > You always have a question mark (?) separating the rest of the URL from the URL parameters, an equals sign (=) separating each name from its associated value, and an ampersand (&) separating each pair
    > URL parameters are inherently "insecure" as they can be changed by users and then resubmitted
    > As a result URL parameters/GET requests are not used for requests that update data on the server
  * POST data : POST requests add new resources, the data for which is encoded within the request body
  * Client-side cookies: Cookies contain session data about the client, including keys that the server can use to determine their login status and permissions/accesses to resources

> Web servers wait for client request messages, process them when they arrive, and reply to the web browser with an HTTP Response message
> response contains an HTTP Response status code indicating whether or not the request succeeded (e.g. "200 OK" for success, "404 Not Found" if the resource cannot be found, "403 Forbidden" if the user isn't authorized to see the resource, etc)
> body of a successful response to a GET request would contain the requested resource
> When an HTML page is returned it is rendered by the web browser
    > As part of processing the browser may discover links to other resources (e.g. an HTML page usually references JavaScript and CSS pages), and will send separate HTTP Requests to download these files
> Both static and dynamic websites use exactly the same communication protocol/patterns

** GET request/response example **
> You can make a simple GET request by clicking on a link or searching on a site (like a search engine homepage)

** request **
> Each line of the request contains information about it
> first part is called the header, and contains useful information about the request, in the same way that an HTML head contains useful information about an HTML document (but not the actual content itself, which is in the body)
> first and second lines contain most of the information we talked about above: 
* The type of request (GET)
* target resource URL (/en-US/search)
* URL parameters (q=client%2Bserver%2Boverview&topic=apps&topic=html&topic=css&topic=js&topic=api&topic=webdev)
* target/host website (developer.mozilla.org)
* end of the first line also includes a short string identifying the specific protocol version (HTTP/1.1)
* final line contains information about the client-side cookies — you can see in this case the cookie includes an id for managing sessions (Cookie: sessionid=6ynxs23n521lu21b1t136rhbv7ezngie; ...)
* remaining lines contain information about the browser used and the sort of responses it can handle
  * For example, you can see here that:
  * browser (User-Agent) is Mozilla Firefox (Mozilla/5.0)
  * It can accept gzip compressed information (Accept-Encoding: gzip)
  * It can accept the specified set of characters (Accept-Charset: ISO-8859-1,UTF-8;q=0.7,*;q=0.7) and languages (Accept-Language: en-US,en;q=0.8,es;q=0.6)
  * Referer line indicates the address of the web page that contained the link to this resource (i.e. the origin of the request, https://developer.mozilla.org/en-US/)

> HTTP requests can also have a body, but it is empty in this case

** response **
> header contains information like the following: 
* first line includes the response code 200 OK, which tells us that the request succeeded
* We can see that the response is text/html formatted (Content-Type)
* We can also see that it uses the UTF-8 character set (Content-Type: text/html; charset=utf-8)
* head also tells us how big it is (Content-Length: 41823)

> At the end of the message we see the body content — which contains the actual HTML returned by the request
> remainder of the response header includes information about the response (e.g. when it was generated), the server, and how it expects the browser to handle the page (e.g. the X-Frame-Options: DENY line tells the browser not to allow this page to be embedded in an <iframe> in another site)

** POST request/response example **
> An HTTP POST is made when you submit a form containing information to be saved on the server

>> request
> format of the request is almost the same as the GET request example shown previously, though the first line identifies this request as a POST
> main difference is that the URL doesn't have any parameters

>> response
> status code of "302 Found" tells the browser that the post succeeded, and that it must issue a second HTTP request to load the page specified in the Location field
> information is otherwise similar to that for the response to a GET request

*** Static sites ***
> A static site is one that returns the same hard coded content from the server whenever a particular resource is requested
> Static sites are excellent when you have a small number of pages and you want to send the same content to every user
> However they can have a significant cost to maintain as the number of pages becomes larger
> When a user wants to navigate to a page, the browser sends an HTTP GET request specifying the URL of its HTML page
> server retrieves the requested document from its file system and returns an HTTP response containing the document and an HTTP Response status code of "200 OK" (indicating success)
> server might return a different status code, for example "404 Not Found" if the file is not present on the server, or "301 Moved Permanently" if the file exists but has been redirected to a different location
> server for a static site will only ever need to process GET requests, because the server doesn't store any modifiable data
> It also doesn't change its responses based on HTTP Request data (e.g. URL parameters or cookies)
> Understanding how static sites work is nevertheless useful when learning server-side programming, because dynamic sites handle requests for static files (CSS, JavaScript, static images, etc.) in exactly the same way

*** Dynamic sites ***
> A dynamic site is one that can generate and return content based on the specific request URL and data (rather than always returning the same hard-coded file for a particular URL)
> Using the example of a product site, the server would store product "data" in a database rather than individual HTML files
> When receiving an HTTP GET Request for a product, the server determines the product ID, fetches the data from the database, and then constructs the HTML page for the response by inserting the data into an HTML template
> This has major advantages over a static site: Using a database allows the product information to be stored efficiently in an easily extensible, modifiable, and searchable way
> Using HTML templates makes it very easy to change the HTML structure, because this only needs to be done in one place, in a single template, and not across potentially thousands of static pages

** Anatomy of a dynamic request **
> parts of the site that make it dynamic are the Web Application (this is how we will refer to the server-side code that processes HTTP requests and returns HTTP responses), the Database, which contains information about players, teams, coaches and their relationships, and the HTML Templates
> main elements of the "team coach" website, along with numbered labels for the sequence of operations when the coach accesses their "best team" list
> After the coach submits the form with the team name and number of players, the sequence of operations is:
* web browser creates an HTTP GET request to the server using the base URL for the resource (/best) and encoding the team and player number either as URL parameters (e.g. /best?team=my_team_name&show=11) or as part of the URL pattern (e.g. /best/my_team_name/11/), A GET request is used because the request is only fetching data (not modifying data)
* Web Server detects that the request is "dynamic" and forwards it to the Web Application for processing (the web server determines how to handle different URLs based on pattern matching rules defined in its configuration)
* Web Application identifies that the intention of the request is to get the "best team list" based on the URL (/best/) and finds out the required team name and number of players from the URL
  * Web Application then gets the required information from the database (using additional "internal" parameters to define which players are "best", and possibly also getting the identity of the logged in coach from a client-side cookie
* Web Application dynamically creates an HTML page by putting the data (from the Database) into placeholders inside an HTML template
* Web Application returns the generated HTML to the web browser (via the Web Server), along with an HTTP status code of 200 ("success")
  * If anything prevents the HTML from being returned then the Web Application will return another code — for example "404" to indicate that the team does not exist
* Web Browser will then start to process the returned HTML, sending separate requests to get any other CSS or JavaScript files that it references
* Web Server loads static files from the file system and returns them to the browser directly (again, correct file handling is based on configuration rules and URL pattern matching)
> An operation to update a record in the database would be handled similarly, except that like any database update, the HTTP request from the browser should be encoded as a POST request

** Doing other work **
> A Web Application's job is to receive HTTP requests and return HTTP responses
> While interacting with a database to get or update information are very common tasks, the code may do other things at the same time, or not interact with a database at all
> A good example of an additional task that a Web Application might perform would be sending an email to users to confirm their registration with the site
> site might also perform logging or other operations

** Returning something other than HTML **
> Server-side website code does not have to return HTML snippets/files in the response
> It can instead dynamically create and return other types of files (text, PDF, CSV, etc.) or even data (JSON, XML, etc.)
> idea of returning data to a web browser so that it can dynamically update its own content (AJAX) has been around for quite a while
> More recently "Single-page apps" have become popular, where the whole website is written with a single HTML file that is dynamically updated when needed
> Websites created using this style of application push a lot of computational cost from the server to the web browser, and can result in websites that appear to behave a lot more like native apps (highly responsive, etc.)

*** Web frameworks simplify server-side web programming ***
> Server-side web frameworks make writing code to handle the operations described above much easier
> One of the most important operations they perform is providing simple mechanisms to map URLs for different resources/pages to specific handler functions
> This makes it easier to keep the code associated with each type of resource separate
> It also has benefits in terms of maintenance, because you can change the URL used to deliver a particular feature in one place, without having to change the handler function
> We can also control the order and the number of results returned