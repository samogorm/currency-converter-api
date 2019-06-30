import express from 'express';
import CurrencyInformationController from './../currency-information/CurrencyInformation.controller';

const router = express.Router();

router.route('/latestexchangerates').get(async(req, res) => {
    let currencyInformationController = new CurrencyInformationController();
    let data = await currencyInformationController.getLatestExchangeRates('EUR');
    console.log("The data: ", data);
    return res.send(data);
});

export default router;