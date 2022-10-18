# User authentication

- json web token for authentication
    - after authentications store it in local storage
- allow sign in with facebook/google
    - after authentication store it in local storage

# User Interactions

## register route

- will give user options to register using one of these options:
    - with email
    - with facebook
    - with gmail

## login route

- will give user option to login from timeline or landing page

## friend route

- user will have to visit a route to find new friends
- when user in users index page they can send requests to others
- users will be shown as card deck view such as it is in pinterests
- those card deck will show user picture, if any, limited bio, and two buttons for “send” friend request or “undo” already sent friend request

## post route

- user will be presented by a post component to facilitate user post sharing capability
- user view on left
- post modal view on right
- that post route will have several option to  set:
    - choose various media type file to include in post
    - can also choose gif and sticker and emojis
    - can also choose privacy setting, to determine who can interact with this post
- post modal right view will have a post button triggering saving it on database which will in turn be shown on timeline

## timeline route

- user’s posts and user friends post will be shown here
- also any public privacy policy posts will also be shown here as well
- timeline will facilitate for each posts to be involved in user interactions such as, like, dislikes, love, comment, share and so on

## profile route

- user will be able to edit their profile information
- friend lists
- when visiting another user profile, also should show any mutual friends if any

## comment route

- brings up similar post modal to facilitate comment with text and media file
- upon submitting to post  comment will be listed on post, where user info along with comment just posted will be listed there