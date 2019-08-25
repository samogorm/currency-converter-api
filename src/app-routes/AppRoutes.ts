import express from 'express';
import CurrencyInformationController from '../currency-converter/currency-information/CurrencyInformation.controller';
import DailyExchangeRateController from '../currency-converter/daily-exchange-rates/DailyExchangeRate.controller';
import PropertyController from '../homefinder/property/property.controller';

const router = express.Router();

const APPS = {
    currencyConverter: 'currency-converter',
    homefinder: 'homefinder'
};

/** Currency Coverter Routes */
router.route(`/${APPS.currencyConverter}/exchangerates`).get(async(req, res) => {
    let currencyInformationController = new CurrencyInformationController();
    let data = await currencyInformationController.getLatestExchangeRates(req.query.base);
  
    return res.status(200).json({ message: `Successfully retrieved the exchange rates for: ${req.query.base}`, data: data });
});

router.route(`/${APPS.currencyConverter}/currencyinformation`).get(async(req, res) => {
    let currencyInformationController = new CurrencyInformationController();
    let data = await currencyInformationController.getCurrencyInformation();

    return res.status(200).json({ message: `Successfully retrieved currency information`, data: data });
});

/** Homefinder Routes */
router.route(`/${APPS.homefinder}/properties`).get(async(req, res) => {
    let propertyController = new PropertyController();
    let data = await propertyController.getProperties(req.query.filters);

    return res.status(200).json({ message: `Sucessfully retrieved properties`, data: data});
})

export default router;