import APIRequestUtil from './../utils/APIRequest.util';
import DailyExchangeRateModel from './IDailyExchangeRate.model';
import {StaticCurrencyInformation} from './../currency-information/StaticCurrencyInformation';

class DailyExchangeRateController {
    currencyInformation = StaticCurrencyInformation;

    /**
     * This will iterate over the available currency information
     * and then query each currency code to get the latest exchange
     * rates each day.
     */
    storeDailyCurrencyCodes = async() => {
        await this.currencyInformation.forEach(async currency => {
            let exchangeRates = await this.getExchangeRatesFromAPI(currency.code);
            await this.storeExchangeRates(exchangeRates);
        });
    }

    /**
    * Gets all currency rates for the provided currency.
    * 
    * @param String base The base currency.
    */
    getExchangeRatesFromAPI = async(baseCurrency: string) => {
        let url = `${process.env.APP_EXCHANGE_RATE_API_URL}`;
        let params = { base: baseCurrency }

        let apiRequest = new APIRequestUtil();

        let data = await apiRequest.get(url, params).then((data: any) => {
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
}

export default DailyExchangeRateController;