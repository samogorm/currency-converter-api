require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './app-routes/AppRoutes';

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
app.use('/api/v1', routes);

mongoose.connect(process.env.MONGO_LOCAL_CONN_URL || '', { useNewUrlParser: true });

let port = process.env.APP_PORT || 5000;

app.listen(port);
console.log(`Running API on port: ${port}`)