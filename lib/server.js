"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var AppRoutes_1 = __importDefault(require("./app-routes/AppRoutes"));
var ScheduleJob_util_1 = __importDefault(require("./utils/ScheduleJob.util"));
var DailyExchangeRate_controller_1 = __importDefault(require("./daily-exchange-rates/DailyExchangeRate.controller"));
var app = express_1.default();
/**
 * Logs the requests made to the API in the console.
 *
 * @param request
 * @param response
 * @param next
 */
var logMiddleware = function (request, response, next) {
    console.log('REQUEST: ');
    console.log(request.method + " " + request.path);
    next();
};
/**
 * This will invoke a cron job to be ran every day to
 * grab the latest/daily exchange rates.
 */
var scheduleGetDailyExchangeRates = function () {
    var scheduleJob = new ScheduleJob_util_1.default();
    var dailyExchangeRate = new DailyExchangeRate_controller_1.default();
    var dayInMinutes = 1440;
    scheduleJob.runEvery(dayInMinutes, dailyExchangeRate.storeDailyCurrencyCodes);
};
scheduleGetDailyExchangeRates();
/**
 * This is ran every 3 days. It will remove any exchange rate
 * entries that are less than or equal to yesterday.
 */
var scheduleRemoveDailyExchangeRates = function () {
    var scheduleJob = new ScheduleJob_util_1.default();
    var dailyExchangeRate = new DailyExchangeRate_controller_1.default();
    var dayInMinutes = 4320;
    scheduleJob.runEvery(dayInMinutes, dailyExchangeRate.removeExchangeRates);
};
scheduleRemoveDailyExchangeRates();
app.use(cors_1.default());
app.use(logMiddleware);
app.use(body_parser_1.default.json());
app.use('/api/v1', AppRoutes_1.default);
mongoose_1.default.connect(process.env.MONGO_LOCAL_CONN_URL || '', { useNewUrlParser: true });
var port = process.env.APP_PORT || 5000;
app.listen(port);
console.log("Running API on port: " + port);
