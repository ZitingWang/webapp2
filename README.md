# Assignment 2 Automated development process(about a online forum)

### Name: ZitingWang<br>
### StudentID: 20082254<br>
## Overview ##

**My goal is to make it an online forum. There are now 4 models, which are informations, message, Posts and users. In addition to the initial index.js and users.js in routes, there are three other ones I added, namely informations, Posts, message and user.There are methods for adding, modifying, and searching in each js. For example, in Posts, you can find a post, you can also find all posts; you can add posts or delete posts; you can also fuzzy queries and continuous table queries.**<br>

## API endpoints ##

**+ GET /Posts - Show all Posts information.**<br>
**+ GET /Posts/:_id - Find a Post information by objectId.**<br>
**+ GET /Posts/f/:key - Find a post information by keyword(fuzzy search).**<br>
**+ GET /Posts/s/find - Find the total likenumber of a post.**<br>
**+ GET /Post/t/table - Get informations of posts in different tables.**<br>
**+ POST/Post - Add a new post.**<br>
**+ PUT /Post/:writer/uplike - Increase the likenumber of a post.**<br>
**+ PUT /Post/:writer - Update the informations of a post.**<br>
**+ DELETE/:writer - Delete a post by writer name, if there are more than one posts of a writer,it will delete the first one.**<br>
**+ DELETE /Post - Delete all of the posts.**<br>
<br>
<br>
**+ GET /informations - Show all the informations of user.**<br>
**+ GET /informations/:id - Find a user's information by objectId.**<br>
**+ GET /informations/f/:key - Find a user's information by keyword(fuzzy search).**<br>
**+ GET /informations/t/table - Get informations of users in different tables.**<br>
**+ GET /informations/a/aom - Find the total number of messages of a user.**<br>
**+ POST /informations',Add new informations of a user.**<br>
**+ PUT /informations/:username - Increase the number of messages of a user.**<br>
**+ DELETE /informations/:username - Delete the informations of a user by username, if there are more than one user with the same name,it will delete the first one.**<br>
**+ DELETE /informations - Delete all the informations.**<br>
<br>
<br>
**+ GET /user - Show all the of user(the username and password).**<br>
**+ GET /user/:id - Find a user by objectId.**<br>
**+ GET /user/f/:key - Find a user by keyword.**<br>
**+ POST /user - Add a user.**<br>
**+ DELETE /user/:username - Delete a user by username.**<br>
**+ DELETE /user - Delete all of the users.**<br>
<br>
<br>
**+ GET /message - Show all of the messages.**<br>
**+ GET /message/:id - Find a message by objectId.**<br>
**+ GET /message/f/:key - Find a message by keyword.**<br>
**+ POST /message - Add a message.**<br>
**+ DELETE /message/:sender - Delete a message by sender.**<br>
**+ DELETE /message - Delete all of the messages.**<br>
<br>
<br>
[Travis Build Page](https://travis-ci.org/ZitingWang/webapp2)<br><br>
[Results of test coverage on Coveralls](https://coveralls.io/github/ZitingWang/webapp2)<br><br>
### [Github Link of my project](https://github.com/ZitingWang/webapp2)<br><br>
```
  Posts
    GET /Post
Successfully Connected to [ heroku_45x9jh4d ] on mlab.com
Successfully Connected to [ heroku_45x9jh4d ] on mlab.com
Successfully Connected to [ heroku_45x9jh4d ] on mlab.com
Successfully Connected to [ heroku_45x9jh4d ] on mlab.com
GET /Post 200 706.719 ms - 871
      ✓ should return all the posts in an array (724ms)
    POST /Post
POST /Post 200 131.849 ms - 143
      ✓ should return confirmation message and update datastore (135ms)
GET /Post 200 107.215 ms - 1016
    PUT /Post/:writer/uplike
PUT /Post/test/uplike 200 215.973 ms - 145
      ✓ should return a message and the information amountofmessage by 1 (218ms)
    PUT /Post/:writer
PUT /Post/test 200 212.495 ms - 147
      ✓ should return a message and the information amountofmessage by 1 (214ms)
    DELETE /Post/:username
(node:4733) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
DELETE /Post/test 200 107.850 ms - 40
      ✓ should return Post Successfully Deleted! (109ms)
  Informations
    GET /informations
GET /informations 200 106.707 ms - 333
      ✓ should return all the informations in an array (109ms)
GET /informations/5c0d5eb63c234784e0d8245b 200 106.478 ms - 167
      ✓ should return one of the informations in an array (109ms)
    POST /informations
POST /informations 200 107.622 ms - 148
      ✓ should return confirmation message and update datastore (112ms)
GET /informations 200 106.269 ms - 501
    PUT /informations/:username
PUT /informations/test 200 212.040 ms - 152
      ✓ should return a message and the information amountofmessage by 1 (214ms)
    GET /informations/a/aom
GET /informations/a/aom 200 107.462 ms - 19
      ✓ should return the total amount of messages (109ms)
    DELETE /informations/username
DELETE /informations/test 200 106.005 ms - 47
      ✓ should return Information Successfully Deleted! (107ms)
  Message
    GET /message
GET /message 200 106.779 ms - 532
      ✓ should return all the messages in an array (109ms)
GET /message/5bd304a01cfbbb49085ee606 200 106.061 ms - 122
      ✓ should return one of the messages in an array (108ms)
    POST /message
POST /message 200 106.582 ms - 128
      ✓ should return confirmation message and update datastore (108ms)
GET /message 200 106.316 ms - 647
    DELETE /message/:sender
      DELETE /message/:sender
DELETE /message/test 200 105.893 ms - 43
        ✓ should return Information Successfully Deleted! (108ms)
GET /message/f/123 200 106.046 ms - 2
      DELETE /message/:sender
DELETE /message/tt 200 105.167 ms - 43
        ✓ should return message Deleted err! (107ms)
  User
    GET /user
GET /user 200 106.859 ms - 122
      ✓ should return all the users in an array (108ms)
GET /user/5c0e91a56f3b1029743e53c5 200 106.076 ms - 122
      ✓ should return one of the users in an array (108ms)
    POST /user
POST /user 200 106.494 ms - 119
      ✓ should return confirmation message and update datastore (109ms)
GET /user 200 106.232 ms - 244
    DELETE /user/:username
      DELETE /user/:username
DELETE /user/test 200 116.004 ms - 40
        ✓ should return User Successfully Deleted! (118ms)
GET /user 200 105.659 ms - 122
      DELETE /user/:username
DELETE /user/jj 200 105.783 ms - 40
        ✓ should return User Deleted err! (108ms)
  21 passing (4s)
```
<br><br><br>
## Extra features<br><br>
### Build automation, deploying in heroku, NPM scripts, Travis CI, Platform-independence, watching, and others that have been mentioned in the lab class.