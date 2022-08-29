* main things to think about when publishing your website are web security and performance
* At the bare minimum, you will want to remove the stack traces that are included on error pages during development, tidy up your logging, and set the appropriate headers to avoid many common security threats

**Set NODE_ENV to 'production'**
* We can remove stack traces in error pages by setting the NODE_ENV environment variable to production (it is set to 'development' by default)
* In addition to generating less-verbose error messages, setting the variable to production caches view templates and CSS files generated from CSS extensions
* Tests indicate that setting NODE_ENV to production can improve app performance by a factor of three
* This change can be made either by using export, an environment file, or the OS initialization system

**Log appropriately**
* Logging calls can have an impact on a high-traffic website
* In a production environment, you may need to log website activity (e.g. tracking traffic or logging API calls) but you should attempt to minimize the amount of logging added for debugging purposes
* One way to minimize "debug" logging in production is to use a module like debug that allows you to control what logging is performed by setting an environment variable
* You can then enable a particular set of logs by specifying them as a comma-separated list in the DEBUG environment variable
* wildcards are also supported
```js
#Windows
set DEBUG=author,book

#Linux
export DEBUG="author,book"
```
* Calls to debug can replace logging you might previously have done using console.log() or console.error()
* Replace any console.log() calls in your code with logging via the debug module
* Turn the logging on and off in your development environment by setting the DEBUG variable and observe the impact this has on logging
* If you need to log website activity you can use a logging library like Winston or Bunyan

**Use gzip/deflate compression for responses**
* Web servers can often compress the HTTP response sent back to a client, significantly reducing the time required for the client to get and load the page
* The compression method used will depend on the decompression methods the client says it supports in the request
* response will be sent uncompressed if no compression methods are supported
* Usr this to your site, compression middleware

**Use Helmet to protect against well known vulnerabilities**
* Helmet is a middleware package
* It can set appropriate HTTP headers that help protect your app from well-known web vulnerabilities

**Example: Installing LocalLibrary on Heroku**
*Why Heroku?*
* Heroku is one of the longest-running and popular cloud-based PaaS services
* It originally supported only Ruby apps, but now can be used to host apps from many programming environments, including Node (and hence Express)
* choosing to use Heroku for several reasons: 
  * Heroku has a free tier that is really free (albeit with some limitations)
  * As a PaaS, Heroku takes care of a lot of the web infrastructure for us
  * we don't have to worry about servers, load balancers, reverse proxies, restarting your website on a crash, or any of the other web infrastructure that Heroku provides
* While it does have limitations, they will not affect this particular application. For example:
  * Heroku's free-tier only provides short-lived storage, User-uploaded files are not safely stored on Heroku itself
  * free tier will sleep an inactive web app if there are no requests within a half-hour period, site may take several seconds to respond if the dyno is asleep
  * free tier limits your site to a certain amount of hours of runtime each month (time "asleep" is not used in the calculation, is fine for a low use or demonstration site but not suitable if 100% uptime is required
* Scaling your app on Heroku is very easy
* While Heroku is perfect for hosting this demonstration it may not be perfect for your real website
* Heroku makes things easy to set up and scale
* If you need more speed or uptime or add-on features, expect to pay for them