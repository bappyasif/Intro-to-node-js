> A template is a text file defining the structure or layout of an output file, with placeholders used to represent where data will be inserted when the template is rendered (in Express, templates are referred to as views)
> Different template languages use different approaches for defining layout and marking placeholders for data—some use HTML to define the layout while others use different markup formats that can be transpiled to HTML
> result is a page definition that translates directly to HTML, but is more concise and arguably easier to read
> Once you have your templates in place, however, they are very easy to read and maintain

Template configuration
> settings tell us that we're using template as the view engine, and that Express should search for templates in the /views subdirectory

```js
// View engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```
> If you look in the views directory you will see the .pug/template engines files for the project's default views
> These include the view for the home page (index.pug) and base template (layout.pug) that we will need to replace with our own content

```
/express-locallibrary-tutorial  //the project root
  /views
    error.pug
    index.pug
    layout.pug
```