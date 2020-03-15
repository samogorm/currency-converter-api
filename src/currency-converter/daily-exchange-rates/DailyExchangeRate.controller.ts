import APIRequestUtil from '../../utils/APIRequest.util';
import DailyExchangeRateModel from './DailyExchangeRate.model';
import CurrencyInformationController from '../currency-information/CurrencyInformation.controller';

class DailyExchangeRateController {
  currencyInformation = new CurrencyInformationController();

  /**
   * This will iterate over the available currency information
   * and then query each currency code to get the latest exchange
   * rates each day.
   */
  storeDailyCurrencyCodes = async() => {
    await Promise.resolve(this.currencyInformation.getCurrencyInformation()).then(values => {
      values.map(async(value: any) => {
        let exchangeRates = await this.getExchangeRatesFromAPI(value.code);
        await this.storeExchangeRates(exchangeRates);
      });
    });
  }

  /**
  * Gets all currency rates for the provided currency.
  * 
  * @param String base The base currency.
  */
  getExchangeRatesFromAPI = async(baseCurrency: string) => {
    const url = `${process.env.APP_EXCHANGE_RATE_API_URL}`;
    const params = { base: baseCurrency }

    const apiRequest = new APIRequestUtil();

    const data = await apiRequest.get(url, params).then((data: any) => {
      return data;
    });

    return await data;
  }

  /**
   * Stores the exchange rate in our database schema.
   * 
   * @param any The exchange rate data.
   * @param any The API response.
   */
  storeExchangeRates = async(exchangeRates: any) => {
    const dailyExchangeRate = new DailyExchangeRateModel();
    return await dailyExchangeRate.store(exchangeRates);
  }

  /**
   * Removed old/stale exhange rate entries to save storage on the db.
   * 
   * @param {Number} days the number of days in minutes.
   */
  removeExchangeRates = async() => {
    const dailyExchangeRate = new DailyExchangeRateModel();
    return await dailyExchangeRate.removeOldEntries();
  }
}

export default DailyExchangeRateController;
