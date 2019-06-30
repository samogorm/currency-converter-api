import express from 'express';
import DailyExchangeRateController from './../daily-exchange-rates/DailyExchangeRate.controller';

const router = express.Router();

router.route('/test').get((req, res) => {
    let currencyInformationController = new DailyExchangeRateController();
    currencyInformationController.storeDailyCurrencyCodes();
    return res.send(`Success!`);
});

export default router;