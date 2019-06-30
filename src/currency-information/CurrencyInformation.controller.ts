import CurrencyInformation from "./CurrencyInformation.model";
import { StaticCurrencyInformation } from "./StaticCurrencyInformation";

class CurrencyInformationController {
    /**
     * Gets all currency information records.
     */
    getCurrencyInformation = async() => {
        let currencyInformation = new CurrencyInformation();

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
            let currencyInformation = new CurrencyInformation();

            currencyInformation.store(data);
        });
    }
}

export default CurrencyInformationController;