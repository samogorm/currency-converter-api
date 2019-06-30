require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './app-routes/AppRoutes';
import ScheduleJobUtil from './utils/ScheduleJob.util';
import DailyExchangeRateController from './daily-exchange-rates/DailyExchangeRate.controller';

const app = express();

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

    next();
}

/**
 * This will invoke a cron job to be ran every day to 
 * grab the latest/daily exchange rates.
 */
const scheduleGetDailyExchangeRates = () => {
    let sheduleJob = new ScheduleJobUtil();
    let dailyExchangeRate = new DailyExchangeRateController();
    let dayInMinutes = 1440;

    sheduleJob.runEvery(dayInMinutes, dailyExchangeRate.storeDailyCurrencyCodes);
}
scheduleGetDailyExchangeRates();

app.use(logMiddleware);
app.use(bodyParser.json());
app.use('/api/v1', routes);

mongoose.connect(process.env.MONGO_LOCAL_CONN_URL || '', { useNewUrlParser: true });

let port = process.env.APP_PORT || 5000;

app.listen(port);
console.log(`Running API on port: ${port}`)