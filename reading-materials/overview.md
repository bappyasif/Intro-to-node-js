**Overview**

Securing your API is an important step. When we were using Express to serve view templates we used PassportJS along with a username and password to authenticate users, but that is not the only way to secure an Express app, and in the context of an API it often makes sense to use a different strategy. username and password session pattern that we learned previously will still work of course, though it is made a little more complicated by the fact that we’ve separated our front-end code from the back-end

Another strategy is to generate and pass a secure token between our back-end and front-end code. Doing so will make sure that our user’s username and password are not compromised and will also give us the ability to expire our user’s session for added security. basic idea is that when a user signs in to our app, a secure token is created, and then for all subsequent requests that token is passed in the header of our request object. In the end, the process is pretty simple since you should already be pretty comfortable with using passport to authenticate users

This strategy, while particularly useful with APIs can be used with a traditional view-template project as well. main difference here is that instead of setting and checking a cookie, we’re passing a special token in the header of our request. 

In our previous Authentication Tutorial, the Passport middleware checked the cookie that was sent and then either authenticated or denied our user. In this case, we’re going to do something very similar, but instead of using cookies, we’re going to pass the token1