# Coding Processes

## general overview: 
- server side will only response back with json responses through rest api for crud operations
- server will send back responses for any successful or failed requests to help user or client 
- server will validate and sanitize any data that might be coming from user to be stored in server
- when data is not met given constraints then a response back with errors list will be sent out to browsers to display them co stand corrected
- user authentication process will be in place to identify and give access to users with json web token
- client side will be responsible for ui and user interactions
- ui should reflect some what acceptable that is
- might consider using matrial ui  for overall ui look
- will use fontawesome for icons and svg resources
- will use tinymce for user “comment and post”
- for client side considering “reusable” html elements in all coding scenarios instead of writing same html elements individually for them (this is going to be something new, psyched about it 🙂)

# coding structure

## client side:
- framework: react
- api call will be made for data manipulation from server ideally hosted in cloud for posteruty
- folder structure:
  - components
    - forms-controls
      - legend-element
      - fieldset-element
      - input-type-text-element
      - input-type-number-element
      - input-type-email-element
      - input-type-password-element
      - input-type-button-element
      - input-type-date-element
      - input-type-checkbox-element
      - input-type-radio-element
      - select-type-dropdown-element
      - button-type-submit-element
      - form-post-method-element
    - general-elements
      - h1-element
      - h2-element
      - h3-element
      - h4-element
      - p-element
      - div-element
      - span-element
      - anchor-element
      - button-element
    - routes
      - register
      - login(could be intergrated on header nav element)
      - landing page
      - timeline page
      - profile page
      - edit profile
    - utils
      - all api calls logics
      - any auth related local storage persistence logics
  - roots


## server side
- framework: expressJS
- authentication framework: passportJS - json-web-token
- folder structure:
    - configs
        - database setup
        - passportJS setup
    - models
        - user
        - post
        - comment
    - controllers
        - user
        - post
        - comment
    - routes
        - user
        - post
        - comment
    - utils
        - authentication specific code logic
    - roots