# bpm-people-ui

In order to set up and run the project, follow these steps:

## Java needs to be installed on your machine!
You know how do to it... Don't forget to set the JAVA_HOME variable

## Installing the dependencies

Make sure you have installed wget, otherwise install it using the following command:

```
$ brew install wget --with-libressl
```


run this command and everything should be setup
```
npm run setup
```

## Swagger Codegen for API client
The swagger client will be generated with the setup command.  
However to build the client independently run this command:
```
npm run generate-swagger-client
```
You can also specify a URL to a swagger.json, run this command to get help
```
npm run generate-swagger-client -- -h
```

In order to always have the latest api client
we should version the swagger.json created by the bpm-people-api here!

## To run the app locally with docker-compose
You will need a file called `aws.env` inside your root directory containing these environment variables.
```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY
```
 
Then run this command to start the edge-server, the eureka-server and the bpm-people-api
```
docker-compose up
```

## Running the app

```
npm start
```

## Running tests

```
npm test
```


## Docker?

```
$ docker build -t bpm-people-ui .
```


```
$ docker run -p 8080:8080 bpm-people-ui
```
