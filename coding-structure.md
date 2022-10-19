# Coding Processes

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