# bpm-people-ui

In order to set up and run the project, follow these steps:

## Installing the dependencies
run this command and everything should be setup
```
npm run setup
```
You will be asked for a url to the swagger.json file. For now you can use this link:
```
https://www.oemel09.de/downloads/Swagger/swagger.json
```
Later on this link should point to the swagger file in production.
Something like:
`
HOST:PORT/people-service/v2/api-docs
`

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
