**Keep it secret, keep it safe**

_Essentially, in addition to using encryption to secure user passwords we need to make sure that important sensitive information such as our Express sessions secret, our MongoDB url (especially if it includes your username and password!) and any API keys that you might be using stay hidden

_Details such as these should never get committed to a git repo or otherwise published

_Hiding secrets is easily accomplished and there are a handful of ways to do it

_One of the most common is using an npm package called dotenv

_Its usage is simple. Simply create a file called .env in your project directory and fill it with variables that represent things you need to keep secret using the syntax [key]=[value], for example, SECRET_KEY="something hard to guess"

_Important note: you need to add this file to your gitignore so that it does not get committed to git!

_A more robust option is the package nconf

_It can be used in place of or alongside of dotenv

_Basically, it allows you to define configuration files in multiple ways for ultimate flexibility

_For example, you could have a config.js file that kept all of your secrets, but also add the ability to override one of those secrets with a command-line argument

_Digging into this package can be useful when creating bigger projects where app configuration needs to be a little more involved

_This package makes it easy to configure things such as separate production and development databases, logging and debugging options, or anything else