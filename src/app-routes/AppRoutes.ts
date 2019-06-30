import express from 'express';
import DailyExchangeRateController from './../currency-information/CurrencyInformation.controller';

const router = express.Router();

router.route('/test').get((req, res) => {
    let currencyInformationController = new DailyExchangeRateController();
    currencyInformationController.getLatestExchangeRates('USD');
    return res.send(`Success!`);
});

export default router;