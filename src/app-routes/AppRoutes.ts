import express from 'express';
import CurrencyInformationController from './../currency-information/CurrencyInformation.controller';
import DailyExchangeRateController from './../daily-exchange-rates/DailyExchangeRate.controller';

const router = express.Router();

router.route('/exchangerates').get(async(req, res) => {
    let currencyInformationController = new CurrencyInformationController();
    let data = await currencyInformationController.getLatestExchangeRates(req.query.base);
  
    return res.status(200).json({ message: `Successfully retrieved the exchange rates for: ${req.query.base}`, data: data });
});

router.route('/currencyinformation').get(async(req, res) => {
    let currencyInformationController = new CurrencyInformationController();
    let data = await currencyInformationController.getCurrencyInformation();

    return res.status(200).json({ message: `Successfully retrieved currency information`, data: data });
});

export default router;