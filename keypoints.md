# Overview

## Problem statement

**Create a functioning social media website, likes of facebook and google+**

## Proposed work

an interactive platform where users can register, login and share their stories with their friends and world. and respectively others can comment and interact in various ways, such as , “like / +1”, “unlinke / -1”, emojis and share to their profile for everyone to see

# Success criteria

The criteria that must be met in order to consider this project a success. 

- user can register
- user can login
- authenticated user must remain authenticated until their auth cookie expires
- user can send friend request to others
- user can accept friend requests from others, when accepted they become friends
- user can create posts
- users can like posts
- users can comment on any posts (which are public or from friends)
- users post will always show its content and other interaction that it got from other users i it at all times on news feeds
- user will have a “timeline” alike post feed index page, which will show posts from them and others, who are friends or public
- user can create a profile with a photo or can be included via “facebook/google” login via passportJS sign in
- user detail page contains their profile information, photo and posts
- there should be a “users” index page, where all authenticated users will be indexed
- users index page should allow other users to send “friend request” from there directly, (who are not already friends or havent sent them a friend request already previously)
- make posts that can have media files in them, wither via url or direct file upload
- allow users to update their profile info with profile pic of their own choosing
- create a guest sign in for any potential user to see all its functionality for convenience

# User stories

How the product should work for various user types.

## **User type 1**

- authenticated users can send other users friend requests
- unauthenticated users can still see timeline feeds from users which are public

## **User type 2**

- authenticated users will have full access to their profile
- authenticated users can choose to delete its profile

# Scope

## Requirements

Current project requirements.

- users register process should include a check to see if attempted “email id” is available in database or not before allowing registration process
- authenticated cookie should remain in localStorage

## Future work

Future requirements.

- quote any user posts in their timeline
- re-share from another user in their profile

## Non-requirements

List anything that is out of scope.

- super flashy front end
- but can not be any less of a nice presentation for this website

# Designs

Include designs here or add directly to the Requirements or User Stories sections. 

[https://www.figma.com/file/FT2hAmqcFRP4nBkUcqUp7a/odin-book?node-id=0%3A1](https://www.figma.com/file/FT2hAmqcFRP4nBkUcqUp7a/odin-book?node-id=0%3A1)

# Alternatives considered

List any alternatives you considered to this approach. Explain why they weren't used.

# Related documents

Include links to other pages as necessary (e.g. technical design doc, project proposal, etc.)[https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e62c6a2c-5965-4539-8a14-27f184a346fe](data models)