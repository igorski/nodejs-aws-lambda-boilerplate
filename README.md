# AWS Lambda boilerplate

Bare project outline to create a Node.js based microservice that can
run as an AWS Lambda.

The project can be run locally using Express.

## Application configuration

When running the application locally using Express:

    ./bin/www
   
Contains the server configuration (e.g. ports to expose, service and
application entry point setup).

The Lambda configuration is stored in:

    ./bin/lambda
 
and follows basic AWS setup.

There are two entry points to consider when adding your code, one
for the Express and one for the Lambda based environment:

    ./src/index.express.js
    ./src/index.lambda.js
    
These provide boilerplate code to process an incoming request and
return a result. It is likely that you don't need to make any changes
to all files mentioned above as your actual unique API code starts in:

    ./src/services/main.js
    
where the _process()_ method should return a payload Object on
success, or an Error on error. You are free to determine the payload
structure as you see fit (see API below).

### Run application locally

Simply resolve all dependencies using npm and run:

    npm start
    
The application is now available at http://127.0.0.1:8080

You can use a tool (such as Postman) to make requests against your
service-under-development.

### API

#### Request

The API accepts POST requests with the following headers:

    Content-Type: application/json

And a JSON payload which can be defined as you see fit:

    {
        // valid JSON here
    }

#### Response

Response payload has _Content-Type_ "application/json":

    {
        "error": string|undefined,
        "result": Object
    }
    
If operations could not complete successfully, the service will return
status code 500 and property _error_ will state what went wrong. If the
API could complete its operations successfully, status code 200 is
returned and field _result_ will contain a JSON payload.
    
### Unit tests

Should be located in the _./test/-folder. All unit test files share the name
with the source they are testing, but with a _.test.js_-suffix.

Test are run via mocha by running:

    npm test

### Create an AWS Lambda deployment package

Simply run:

    npm run deploy
    
After which the _./dist_-directory will contain _dist.zip_ which can
be deployed using the AWS Lambda console.
