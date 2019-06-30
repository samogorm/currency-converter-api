import DailyExchangeRateSchema from './DailyExchangeRate.schema';
import { IDailyExchangeRate } from './IDailyExchangeRate.interface'

class DailyExchangeRate {
    getById = () => {

    }

    /**
     * Stores a currency rate to our database.
     *
     * @param String base The base currency.
     */
    store = async(exchangeRate: any) => {
        let dailyExchangeRateSchema = new DailyExchangeRateSchema();

        dailyExchangeRateSchema.date = exchangeRate.date;
        dailyExchangeRateSchema.base_currency = exchangeRate.base;
        dailyExchangeRateSchema.rates = exchangeRate.rates;
        dailyExchangeRateSchema.archivable = false;

        return dailyExchangeRateSchema.save(function (err) {
            if (err) {
                console.log(`ERROR: ${err}`)
                return false;
            }
        
            return true;
        });
    }

    archive = (currencyRate: any) => {
        // get currency rate by id
    }

}

export default DailyExchangeRate;