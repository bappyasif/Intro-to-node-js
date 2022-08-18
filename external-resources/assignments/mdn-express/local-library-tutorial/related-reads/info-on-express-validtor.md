**writing a basic route to create a user in the database**
```js
let express = require(express);
let app = express();

app.use(express.json());
app.post("/user", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    }).then(user => res.json(user))
})
```
*Then, you'll want to make sure that you validate the input and report any errors before creating the user*
```js
let {body, validationResult} = require("express-validator")
app.post(
    "/user",
    // username must be email
    body("username).isEmail(),
    // password must be at least 6 chars long
    body("password").isLength({min: 6}),
    // callback function
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        // success, so create a user
        User.create({
            username: req.body.username,
            password: req.body.password
        }).then(user => res.json(user))
    }
)
```

**Schema Validation**
* Schemas are a special, object-based way of defining validations or sanitizations on requests
* At the root-level, you specify field paths as keys, and objects as values
  * which define the error messages, locations and validations/sanitizations

```js
let {checkSchema} = require("express-validator");
app.put(
    "/user/:id/password",
    checkSchema({
        id: {
            // The location of the field, can be one or more of body, cookies, headers, params or query.
            // If omitted, all request locations will be checked
            in: ["params", "query"],
            errorMessage: "ID is wrong",
            isInt: true,
            // Sanitizers can go here as well
            toInt: true
        },
        myCustomField: {
            // Custom validators
            custom: {
                options: (value, {req, loc, path}) => {
                    return value + req.body.foo + loc + path;
                }
            },
            // and sanitizers
            customSanitizer: {
                options: (value, {req, loc, path}) => {
                    let sanitizedValue;

                    if (req.body.foo && location && path) {
                        sanitizedValue = parseInt(value);
                    } else {
                        sanitizedValue = 0;
                    }

                    return sanitizedValue;
                }
            }
        },
        password: {
            isLength: {
                errorMessage: 'Password should be at least 7 chars long',
                // Multiple options would be expressed as an array
                options: { min: 7 }
            }
        },
        firstName: {
            isUpperCase: {
                // To negate a validator
                negated: true
            },
            rtrim: {
                // Options as an array
                options: [[' ', '-']]
            }
        },
        // Support bail functionality in schemas
        email: {
            isEmail: {
                bail: true
            }
        },
        // Support if functionality in schemas
        someField: {
            isInt: {
                if: val => val != ""
            }
        },
        // Wildcards/dots for nested fields work as well
        "address.*postalCode": {
            // Make this field optional when undefined or null
            optional: {options: nullable: true},
            isPostalCode: {
                option: "US" // set postalCode locale here
            }
        }
    }),
    // callback function
    (req, res, next) => {
        // handle the request as usual
    }
)
```

**Custom validators/sanitizers**
* Although express-validator offers plenty of handy validators and sanitizers through its underlying dependency validator.js, it doesn't always suffice when building your application
* For these cases, you may consider writing a custom validator or a custom sanitizer

*Custom validator*
* A custom validator may be implemented by using the chain method .custom()
  * It takes a validator function
* Custom validators may return Promises to indicate an async validation (which will be awaited upon), or throw any value/reject a promise to use a custom error message
  * if your custom validator returns a promise, it must reject to indicate that the field is invalid

*Example: checking if e-mail is in use*
```js
let {body} = require("express-validator");

app.post(
    "/user",
    body("email").custom(value => {
        return User.findUserByEmail(value).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        })
    }),
    // callback function
    (req, res) => {
        // Handle request
    }
)
```
* In the example above, validation might fail even due to issues with fetching User information
* implications of accessing the data layer during validation should be carefully considered

*Example: checking if password confirmation matches password*
```js
let {body} = require("express-validator");

app.post(
    "/user",
    body(password).isLength({min: 6}),
    body(passwordConfirmation).custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }

        // Indicates the success of this synchronous custom validator
        return true;
    }),
    // callback function
    (req, res) => {
        // handle request
    }
)
```

**Custom sanitizers**
* Custom sanitizers can be implemented by using the method .customSanitizer(), no matter if the validation chain one or the sanitization chain one
* Just like with the validators, you specify the sanitizer function, which must be synchronous at the moment

*Example: converting to MongoDB's ObjectID*
```js
let {param} = require("express-validator");
app.post(
    "/object/:id",
    param(id).customSanitizer(value => ObjectId(value)),
    // callback function
    (req, res) => {
        // handle request
    }
)
```
 
 * There are many functions available, allowing you to check and sanitize data from request parameters, body, headers, cookies, etc., or all of them at once
 * For this tutorial, we'll primarily be using body and validationResult
 * functions are defined as below: 
    * body([fields, message]): Specifies a set of fields in the request body (a POST parameter) to validate and/or sanitize along with an optional error message that can be displayed if it fails the tests
    * validation and sanitize criteria are daisy-chained to the body() method
    * For example, the line below first defines that we're checking the "name" field and that a validation error will set an error message "Empty name"
    * We then call the sanitization method trim() to remove whitespace from the start and end of the string, and then isLength() to check the resulting string isn't empty
    * Finally, we call escape() to remove HTML characters from the variable that might be used in JavaScript cross-site scripting attacks
    * [
        // …
        body('name', 'Empty name')
            .trim()
            .isLength({ min: 1 })
            .escape(),
        // …
      ];
    
    * This test checks that the age field is a valid date and uses optional() to specify that null and empty strings will not fail validation
    * [
        // …
        body('age', 'Invalid age')
            .optional({ checkFalsy: true })
            .isISO8601()
            .toDate(),
        // …
      ];

    * You can also daisy chain different validators, and add messages that are displayed if the preceding validators are true
    * [
        // …
        body('name')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Name empty.')
            .isAlpha()
            .withMessage('Name must be alphabet letters.'),
        // …
      ];
 * 
 * validationResult(req): Runs the validation, making errors available in the form of a validation result object
 * This is invoked in a separate callback, as shown below: 
    * (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            // Error messages can be returned in an array using `errors.array()`.
        } else {
            // Data from form is valid.
        }
    }
    * We use the validation result's isEmpty() method to check if there were errors, and its array() method to get the set of error messages

<!-- 
    * validation and sanitization chains are middleware that should be passed to the Express route handler (we do this indirectly, via the controller)
    * When the middleware runs, each validator/sanitizer is run in the order specified
 -->

**validationResult()**
* These methods are all available via require('express-validator')
* validationResult(req):
  * req: the express request object, 
  * Returns: a Result object
* Extracts the validation errors from a request and makes them available in a Result object
* Each error returned by .array() and .mapped() methods has the following format by default:
* 
```js{
  "msg": "The error message",
  "param": "param.name.with.index[0]",
  "value": "param value",
  // Location of the param that generated this error.
  // It's either body, query, params, cookies or headers.
  "location": "body",

  // nestedErrors only exist when using the oneOf function
  "nestedErrors": [{ ... }]
}
```

* .withDefaults(options): 
  * options (optional): an object of options. Defaults to { formatter: error => error }
  * Returns: a new validationResult function, using the provided options
* Creates a new validationResult()-like function with default options passed to the generated Result instance
  * Below is an example which sets a default error formatter:
  ```js
    const { validationResult } = require('express-validator');

    const myValidationResult = validationResult.withDefaults({
        formatter: error => {
            return {
                myLocation: error.location,
            };
        },
    });

    app.post('/create-user', yourValidationChains, (req, res) => {
        // errors will be like [{ myLocation: 'body' }, { myLocation: 'query' }], etc
        const errors = myValidationResult(req).array();
    });
  ```

*Result*
* An object that holds the current state of validation errors in a request and allows access to it in a variety of ways
* .isEmpty(): 
  * Returns: a boolean indicating whether this result object contains no errors at all 
  ```js
    app.post('/create-user', yourValidationChains, (req, res) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
        // do something if hasErrors is true
    });
  ```
* .formatWith(formatter): 
  * formatter(error): the function to use to format when returning errors
  * error argument is an object in the format of { location, msg, param, value, nestedErrors }, as described above
  * Returns: a new Result instance
  ```js
    const { validationResult } = require('express-validator');
    app.post('/create-user', yourValidationChains, (req, res, next) => {
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        return `${location}[${param}]: ${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
        // Response will contain something like
        // { errors: [ "body[password]: must be at least 10 chars long" ] }
        return res.json({ errors: result.array() });
    }

    // Handle your request as if no errors happened
    });
  ```
* .array([options]): 
  * options (optional): an object of options. Defaults to { onlyFirstError: false }
  * Returns: an array of validation errors
* Gets all validation errors contained in this result object
* If the option `onlyFirstError` is set to true, then only the first error for each field will be included

* mapped(): 
  * Returns: an object where the keys are the field names, and the values are the validation errors
  * Gets the first validation error of each failed field in the form of an object

* .throw(): 
  * If this result object has errors, then this method will throw an exception decorated with the same validation result API
  ```js
    try {
        validationResult(req).throw();
        // Oh look at ma' success! All validations passed!
    } catch (err) {
        console.log(err.mapped()); // Oh noes!
    }
  ```
