#About
When you install and run the site for the first time you´ll see that the database committed with this project is empty. That´s in order for the user to be able to test the entire flow of loading the home screen, schedule an activity and then see it in the home screen. 

The platform you use to test this, be it Windows or IOs, should not affect your experience. 

###The screens completed are:
- US01
- US02
- US03
- US04
- API json-server


# npm and node version
```
npm -v
6.6.0
node -v
v10.15.0
```

# Install
After you have cloned the repo, `cd` into it and carry out the following commands. If you are curious about the versions or packages that will be installed you can head over to the repo´s [package.json](https://bitbucket.org/Chayemor/nixatractiv/src/master/package.json). 

```
npm install
```

#Start Project
While still in the project, you will need two consoles, one to start the React.js web site, and the other to start the fake server created through *json-server*.

To start the react site:
```
npm start
```

To start the fake server make sure you are at the root of this project, meaning you are at the same level as the file **db.json**. To start the fake server:
```
json-server --watch db.json --port 3004
```

#Access website and server

To access the website go to [http://localhost:3000/](http://localhost:3000/) and to access the server and see a dump of the data go to [http://localhost:3004/db](http://localhost:3004/db)

#Delete database
You can delete the databse by going to your file [db.json](https://bitbucket.org/Chayemor/nixatractiv/src/master/db.json) and leaving only the following:

```
{
  "schedule": []
}
```

#Testing
There were no tests coded for this quick turnaround project. Shameful really. 
