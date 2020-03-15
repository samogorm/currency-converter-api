import DailyExchangeRateSchema from './DailyExchangeRate.schema';

class DailyExchangeRate {
  /**
   * Stores a currency rate to our database.
   *
   * @param String base The base currency.
   */
  store = async(exchangeRate: any) => {
    const dailyExchangeRateSchema = new DailyExchangeRateSchema();

    dailyExchangeRateSchema.date = exchangeRate.date;
    dailyExchangeRateSchema.base_currency = exchangeRate.base;
    dailyExchangeRateSchema.rates = exchangeRate.rates;
    dailyExchangeRateSchema.archivable = false;

    return dailyExchangeRateSchema.save(err => err ? false : true);
  }

  /**
   * Gets exchange rates for the base currency.
   * 
   * @param {String} base the base currency code.
   */
  getByBase = async(base: string) => {
    let exchangeRates: any;
    await DailyExchangeRateSchema.findOne({base_currency: base}).then(data => {
        exchangeRates = data;
    });
    return exchangeRates;
  }

  /**
   * Removes old entries from the database if they are older
   * than yesterday.
   * 
   * If we have only ONE set of data for a specific day, and that 
   * data is 3 days old or older, we will keep that last record set.
   */
  removeOldEntries = async() => {
    const today = new Date();
    const yesterday = new Date().setDate(today.getDate() - 1);
    
    return await DailyExchangeRateSchema
    .find({datetime_retrieved: {$lte: yesterday}})
    .remove(err => err ? false : true);
  }
}

export default DailyExchangeRate;
