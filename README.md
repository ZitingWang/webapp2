Name: ZitingWang
StudentID: 20082254

My project file is called "mine". My goal is to make it an online forum. There are now 3 models, which are information, message, and users. In addition to the initial index.js and users.js in routes, there are three other ones I added, namely information, message and user.

I envision that this web should need a user. The user needs a username and password and basic information. After entering the web, I can send a message. These are the basic functions.


There are many functions(require) in each file:

//routes/informations.js

app.get('/informations', informations.findAll);  //get all the data

app.get('/informations/:id', informations.findOne);  //get one by _id

app.get('/informations/f/:key', informations.fuzzy);  //fuzzy search

app.get('/informations/t/table', informations.findfromtables);  //connection with other two tables

app.get('/informations/a/aom', informations.findTotalaom);  //get the total number of the messages

app.post('/informations',informations.addInformation);  //Insert data

app.put('/informations/:username', informations.incrementaom);  //Let the amountofmessage attribute in the informations add 1 from the original value

app.delete('/informations/:username', informations.deleteInformation);  //delete one by username

app.delete('/informations', informations.deleteAll);  //delete all the data in informations

//routes/user.js

app.get('/user', user.findAll); //get all the data

app.get('/user/:id', user.findOne); //get one by _id

app.get('/user/f/:key', user.fuzzy);  //fuzzy search

app.post('/user',user.addUser);  //Insert data

app.delete('/user/:id', user.deleteUser);  //delete one by username

app.delete('/user', user.deleteAll);  //delete all

//routes/message.js

app.get('/message', message.findAll);  //get all the data

app.get('/message/:id', message.findOne); //get one by _id

app.get('/message/f/:key', message.fuzzy);  //fuzzy search

app.get('/message/s/find', message.findaoms);  //find the amount of information for each person

app.post('/message',message.addMessage);  //Insert data

app.delete('/message/:sender', message.deleteMessage);  //delete one by sender

app.delete('/message', message.deleteAll);  //delete all 

This project has been successfully deployed on bitbucket and heroku.

bitbucket: https://ZitingWang@bitbucket.org/ZitingWang/webapp.git

heroku: https://webapp-ziting.herokuapp.com/


Youtube link to video of Server Testing :   https://youtu.be/rNcbpgXdYZw


Reference:

https://www.jianshu.com

http://www.cnblogs.com

https://blog.csdn.net
(I have learned a lot of knowledge on the Internet and these three sites have helped me the most.)