# bpm-people-ui

In order to set up and run the project, follow these steps:

## Installing the dependencies

```
npm install
```

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

## Configure environment variables
So that the app can connect to the bpm-people-api
```
export REACT_APP_BPM_PEOPLE_API_URL=http://yourURL.example/api
```

When using docker-compose the URL is the following
```
export REACT_APP_BPM_PEOPLE_API_URL=http://localhost:9081/people-service
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
