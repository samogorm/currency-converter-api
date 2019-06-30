import express from 'express';
import CurrencyInformationController from './../currency-information/CurrencyInformation.controller';

const router = express.Router();

router.route('/exchangerates').get(async(req, res) => {
    let currencyInformationController = new CurrencyInformationController();
    let data = await currencyInformationController.getLatestExchangeRates(req.query.base);
  
    return res.send(data);
});

export default router;