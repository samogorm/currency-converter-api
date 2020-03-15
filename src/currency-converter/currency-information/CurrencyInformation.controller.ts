import CurrencyInformation from "./CurrencyInformation.model";
import DailyExchangeRate from "../daily-exchange-rates/DailyExchangeRate.model";
import { StaticCurrencyInformation } from "./StaticCurrencyInformation";

class CurrencyInformationController {
  /**
   * Gets all currency information records.
   */
  getCurrencyInformation = async() => {
    const currencyInformation = new CurrencyInformation();

    return await currencyInformation.getAll();
  }

  /**
   * Stores all th currency information into a db table.
   * Uses the static array of data in './StaticCurrencyInformation.ts' to
   * populate the documents.
   * 
   * It is ran only once so that we have info in the database.
   */
  storeCurrencyInformation = () => {
    StaticCurrencyInformation.forEach(data => {
      const currencyInformation = new CurrencyInformation();

      currencyInformation.store(data);
    });
  }

  getLatestExchangeRates = async(code: string) => {
    const currencyInformation: any = new CurrencyInformation();
    const latestCurrencyInformation = await currencyInformation.getByCode(code);

    const dailyExchangeRate = new DailyExchangeRate();
    const latestExchangeRates = await dailyExchangeRate.getByBase(code);
    
    const data = {
      currency_information: latestCurrencyInformation,
      exchange_rates: latestExchangeRates
    };

    return data;
  }
}

export default CurrencyInformationController;
