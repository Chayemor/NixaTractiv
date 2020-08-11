#About
When you build and run the container with the app for the first time you'll see that the database committed with this project is empty. 
That's in order for the user to be able to test the entire flow of loading the home screen, 
schedule an activity and then see it in the home screen. 

The platform you use to test this, be it Windows or IOs, should not affect your experience (thank you Docker!)

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

#Install and run
After you have cloned the repo, `cd` into it and carry out the following commands. If you are curious about the versions or packages that will be installed you can head over to the repo's [package.json](https://bitbucket.org/Chayemor/nixatractiv/src/master/package.json). 

```
docker-compose build
```

Once it has finished building, to the run the container:

```bash
docker-compose up
```

#Run the DB server
To start the fake server make sure you are at the root of this project and inside the container (go to the section Common Docker Commands
to get a refresh on how to log into a contianer), meaning you are at the same level as the file **db.json**. To start the fake server:
```
npm run db
```

#Access website and server

To access the website go to [http://localhost:3000/](http://localhost:3000/) and to access the server and see a dump of the data go to [http://localhost:3004/db](http://localhost:3004/db)

#Delete database
You can delete the database by going to your file [db.json](https://bitbucket.org/Chayemor/nixatractiv/src/master/db.json) and leaving only the following:

```
{
  "schedule": []
}
```

#Testing
TODO

Common Docker commands
============================

## View running containers 

```bash
docker ps
```
```bash 
CONTAINER ID        IMAGE                      COMMAND             CREATED             STATUS              PORTS                                            NAMES
9006b3857c7b        nixatractiv_nixatractive   "npm start"         9 minutes ago       Up 9 minutes        0.0.0.0:3000->3000/tcp, 0.0.0.0:3004->3004/tcp   nixaTractiv
```

You should get something like this. The last column, **NAMES** are the names of the running containers. 
If you ever want to log into one, you need that name. The **nixaTractiv** contains the actual code for the react app, 
while the forwarded port of 3004 is so that the db server is accessible. 

## Log into a docker container

```bash
docker exec -it docker_container_name bash
```

Example: **nixaTractiv**

```bash
docker exec -it nixaTractiv bash
```

Once logged in, if you do a simple ```ls``` you'd see the following:

```bash
root@9006b3857c7b:/app# ls
Dockerfile  README.md  db.json	docker-compose.yml  nixa React challenge.md.v2.pdf  node_modules  package.json	public	src
```

## Start a container without a rebuild
Assuming you are in the same path as the root repo.

```bash
docker-compose up
```

## Force build of a container 
Assuming you are in the same path as the root repo.

```bash
docker-compose build --no-cache
```

## Kill everything
Something has gone awfully wrong and you need to do a mission abort, obliterating all
containers and images. Proceed with caution.

```bash
docker system prune
```

