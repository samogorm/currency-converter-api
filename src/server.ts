require('dotenv').config();
import express from 'express';
import cors from 'cors';
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
    let scheduleJob = new ScheduleJobUtil();
    let dailyExchangeRate = new DailyExchangeRateController();
    let dayInMinutes = 1440;

    scheduleJob.runEvery(dayInMinutes, dailyExchangeRate.storeDailyCurrencyCodes);
}
scheduleGetDailyExchangeRates();

/**
 * This is ran every 3 days. It will remove any exchange rate
 * entries that are less than or equal to yesterday.
 */
const scheduleRemoveDailyExchangeRates = () => {
    let scheduleJob = new ScheduleJobUtil();
    let dailyExchangeRate = new DailyExchangeRateController();
    let nDaysInMins = 1440 * 3;

    scheduleJob.runEvery(nDaysInMins, dailyExchangeRate.removeExchangeRates);
}
scheduleRemoveDailyExchangeRates();

app.use(cors());
app.use(logMiddleware);
app.use(bodyParser.json());
app.use('/api/v1', routes);

mongoose.connect(process.env.MONGO_LOCAL_CONN_URL || '', { useNewUrlParser: true });

let port = process.env.APP_PORT || 5000;

app.listen(port);
console.log(`Running API on port: ${port}`)