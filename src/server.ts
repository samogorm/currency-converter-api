import express from 'express';
import bodyParser from 'body-parser';

/**
 * Logs the requests made to the API in the console.
 * 
 * @param request 
 * @param response 
 * @param next 
 */
const logMiddleware = (request: express.Request, response: express.Response, next: Function) => {
    console.log('REQUEST: ');
    console.log(`${request.method} ${request.path}`);
    console.log('RESPONSE:');
    console.log(`${response.statusCode} ${response.statusMessage === 'undefined' ? 'No message available' : response.statusMessage}`);

    next();
}

const app = express();

app.use(logMiddleware);
app.use(bodyParser.json());

let port = process.env.APP_PORT || 5000;

app.listen(port);
console.log(`Running API on port: ${port}`)