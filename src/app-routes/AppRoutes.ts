import express from 'express';
import CurrencyInformationController from '../currency-converter/currency-information/CurrencyInformation.controller';

const router = express.Router();

const APPS = {
  currencyConverter: 'currency_converter',
  homefinder: 'homefinder'
};

router.route(`/${APPS.currencyConverter}/exchangerates`).get(async(req, res) => {
  const currencyInformationController = new CurrencyInformationController();
  const data = await currencyInformationController.getLatestExchangeRates(req.query.base);

  return res.status(200)
    .json({ message: `Successfully retrieved the exchange rates for: ${req.query.base}`, data: data });
});

router.route(`/${APPS.currencyConverter}/currencyinformation`).get(async(req, res) => {
  const currencyInformationController = new CurrencyInformationController();
  const data = await currencyInformationController.getCurrencyInformation();

  return res.status(200)
    .json({ message: `Successfully retrieved currency information`, data: data });
});

export default router;
