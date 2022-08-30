**HTML Forms**
```html
<form action="/team_name_url/" method="post">
    <label for="team_name">Enter name: </label>
    <input id="team_name" type="text" name="name_field" value="Default name for team.">
    <input type="submit" value="OK">
</form>
```
* a form may contain any number of other input elements and their associated labels
* field's type attribute defines what sort of widget will be displayed
* name and id of the field are used to identify the field in JavaScript/CSS/HTML, while value defines the initial value for the field when it is first displayed
* submit input will be displayed as a button (by default)—this can be pressed by the user to upload the data contained by the other input elements to the server
* form attributes define the HTTP method used to send the data and the destination of the data on the server (action):
  * action: 
    * resource/URL where data is to be sent for processing when the form is submitted
    * If this is not set (or set to an empty string), then the form will be submitted back to the current page URL
  * method:
    * HTTP method used to send the data: POST or GET
    * POST method should always be used if the data is going to result in a change to the server's database, because this can be made more resistant to cross-site forgery request attacks
    * GET method should only be used for forms that don't change user data (e.g. a search form)

**Form handling process**
* Form handling uses all of the same techniques that we learned for displaying information about our models: 
  * https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms/web_server_form_handling.png
  * route sends our request to a controller function which performs any database actions required, including reading data from the models, then generates and returns an HTML page
* What makes things more complicated is that the server also needs to be able to process the data provided by the user, and redisplay the form with error information if there are any problems
* main things that form handling code needs to do are: 
  * Display the default form the first time it is requested by the user
  * Receive data submitted by the user, usually in an HTTP POST request
  * Validate and sanitize the data
  * If any data is invalid, re-display the form—this time with any user populated values and error messages for the problem fields
  * If all data is valid, perform required actions (e.g. save the data in the database, send a notification email, return the result of a search, upload a file, etc.)
  * Once all actions are complete, redirect the user to another page

* Often form handling code is implemented using a GET route for the initial display of the form and a POST route to the same path for handling validation and processing of form data
* Express itself doesn't provide any specific support for form handling operations, but it can use middleware to process POST and GET parameters from the form, and to validate/sanitize their values

**Validation and sanitization**
* Before the data from a form is stored it must be validated and sanitized: 
  * Validation checks that entered values are appropriate for each field (are in the right range, format, etc.) and that values have been supplied for all required fields
  * Sanitization removes/replaces characters in the data that might potentially be used to send malicious content to the server
* we'll be using the popular express-validator module to perform both validation and sanitization of our form data