# CONTROL PANEL

Control panel for a home automation system, version 1.

## How to build

You can build separately backend and frontend:

- Build locally running `mvn clean package`. This will compile and build the frontend artifacts too.
- If you want to build just the frontend, go inside the `/webapp` folder and run `npm run build:local`. This will generate
  the .js files inside the `/static` folder.

### FE development only

If you want to just see the UI, go inside the webapp folder and launch `npm start`. This will use webpack to launch a
web server and put inside your js code. MirageJs is used to mock rest calls.

### FE pointing to BE

- Build for development: inside the webapp application, run `npm run start:local`: this will generate the js executables inside
  the resources/static folder. Then launch the application using IDEA. Actually, the npm command just produces the minified
  js that will be imported in the .html file.. So there is no need to keep it active after compilation.
- Build for production (not useful for development, is something the pipeline will take care of) run `mvn clean package`
  and then launch the jar inside the webapp/target folder

IMPORTANT: at the moment, `mvn clean package` bundles the FE application to run in "production" environment only. So,
if you run it and then try to run the application locally, you will see the application pointing to prod environment
(taken from the /target folder built before using maven).


### CI/CD

Linked to this project there is a CI/CD integration (both using Jenkins and Github actions) that is triggered
on every master push. This will push automatically the docker image on the dockerhub registry,
ready for the deployment.

## Run the entire application

Run using `./run.sh` command inside the `deploy` directory.
This will download from dockerhub the images and run everything using docker compose.\
You can stop shut everything down running the script `./stop.sh`.

### Raspberry PI

This application was successfully deployed in a Raspberry PI 4 Model B, with the only fix that mongo db must be 
version 4.4.18 or earlier, for some incompatibilities between latest mongo db versions and ARM architecture. To run on
Raspberry, just enter the deploy folder and run the `./run.sh` script. Everything should run smoothly.

## Local testing

If you want to test the app locally, first run the script `./run-local-environment.sh`. This starts a 
mongodb instance and a mongo express interface reachable at `localhost:8081`. 
Then run the application.
