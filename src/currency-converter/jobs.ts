import ScheduleJobUtil from './../utils/ScheduleJob.util';
import DailyExchangeRateController from './../currency-converter/daily-exchange-rates/DailyExchangeRate.controller';

const ONE_DAY_IN_MINS = 1440;

/**
 * This will invoke a cron job to be ran every day to 
 * grab the latest/daily exchange rates.
 */
export const scheduleGetDailyExchangeRates = () => {
    let scheduleJob = new ScheduleJobUtil();
    let dailyExchangeRate = new DailyExchangeRateController();
    let dayInMinutes = ONE_DAY_IN_MINS;

    scheduleJob.runEvery(dayInMinutes, dailyExchangeRate.storeDailyCurrencyCodes);
}

/**
 * This is ran every 3 days. It will remove any exchange rate
 * entries that are less than or equal to yesterday.
 */
export const scheduleRemoveDailyExchangeRates = () => {
    let scheduleJob = new ScheduleJobUtil();
    let dailyExchangeRate = new DailyExchangeRateController();
    let nDaysInMins = ONE_DAY_IN_MINS * 3;

    scheduleJob.runEvery(nDaysInMins, dailyExchangeRate.removeExchangeRates);
}