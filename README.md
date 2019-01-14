# bpm-people-ui

Run this command and everything should be setup
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

## Running the app

Export this environment variable `BPM_PEOPLE_API_URL` to define the APIs URL.  
If you're running the API with docker-compose this is the URL:
```
export BPM_PEOPLE_API_URL=http://localhost:9081/people-service
```

Then run this command to start the application
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
