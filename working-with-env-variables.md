**Working With Environment Variables in Node.js**

*basics of environment variables in Node.js*

First things first, we need to ensure that we have a Node.js environment

*Explicity loading varibles from .env files*

You can access environment variables in Node.js right out of the box

When your Node.js process boots up, it’ll automatically provide access to all existing environment variables by creating an env object within the process global object

If you want to take a peek at the object, run the the Node.js REPL with “node” in your command line and type: `console.log(process.env);`

This code should output all environment variables that this Node.js process can pick up

To access one specific variable, access it like you would any property of an object: `console.log('The value of PORT is:', process.env.PORT);`

Here, you’ll notice that the value of PORT is undefined on your computer, you can determine the port to listen to by checking the PORT first and giving it a default value after:
```js
const app = require('http').createServer((req, res) => res.send('Ahoy!'));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
```

Since process.env is a normal object, we can set/override the values very easily:`process.env.MY_VARIABLE = 'ahoy';`

However, keep in mind that this value is only set during the execution of this Node.js process and only available in child processes spawned by this process

Overall, you should avoid overriding environment variables as much as possible and just initialize a configuration variable

A great way to achieve project-specific configuration is by using .env files. These files allow you to specify a variety of different environment variables and associated values

Typically, you don’t want to check these files into source control. So when you create one, just add .env to your .gitignore file

Simply install the module via npm: `npm install dotenv --save`

Afterward, add the following line to the very top of your entry file:`require('dotenv').config();`

This code will automatically load the .env file in the root of your project and initialize the values, skipping any variables already preset

Be careful not to use .env files in your production environment, though

Instead, set the values directly on the respective host

So you might want to wrap your load statement in an if statement:
```js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
```
With this code, we’ll only load the .env file if the server isn’t already in production mode


*An alternative way to load .env files*

There’s also an alternative module based on dotenv to make loading environment variables more convenient

result is node-env-run or nodenv. This command-line tool will load a .env file, initialize the values using dotenv, and then execute your script

You can install it globally, but this is recommended only for development purposes and locally to the project. Install it by running: `npm install node-env-run --save-dev`

we don’t need to require anything here because it’s just the application logic

To try running it, use node: `value for FOO is: undefined`

Now try using node-env-run by running: `node_modules/.bin/nodenv nodenv-example.js`
The result should be “The value for FOO is: bar” since it loaded the .env file

*Environment variables & npm scripts*

There are also scenarios where it’s useful to check the value of an environment variable before entering the Node.js application in npm scripts

For example, if you want to use node-env-run when you’re in a development environment but use node when you’re in production mode

A tool that makes this very easy is if-env. Install it by running: `npm install if-env --save`

Make sure to not install it as a “dev dependency” since we'll require this in production as well

Now simply modify your npm scripts in your package.json:
```json
  "scripts": {
    "start": "if-env NODE_ENV=production ?? npm run start:prod || npm run start:dev",
    "start:dev": "nodenv -f .",
    "start:prod": "node ."
  }
```
This script will now execute npm run start:prod and subsequently node

If NODE_ENV has the value production, it will then be able to execute npm run start:dev and subsequently nodenv -f

*Debugging in Node.js*

One strategy that helped me out a lot is using the DEBUG environment variable to receive more verbose logs for numerous modules

And start it up with the DEBUG variable set to *

magic behind it is a lightweight module called debug, and its usage is super easy

When you want to use it, all you have to do is initialize it with a namespace

Afterward, you can log it to that namespace

If someone wants to see the output, all they have to do is enable the namespace in the DEBUG variable

In this case, express uses a bunch of sub-namespaces

So if you would want everything from the express router, all you have to do is set the DEBUG with the appropriate wild card: `DEBUG=express:router* node server.js`

If you want to use debug in your own module, first you have to install it

Afterward, it can be applied in the following way:
```js
const debug = require('debug')('myApp:someComponent');

debug('Here is a pretty object %o', { someObject: true });
```
