import CurrencyInformationSchema from './CurrencyInformation.schema';

class CurrencyInformation {

    /**
     * This will store one record into the currency information db table.
     * 
     * @param {any} data the array of data to be stored.
     * 
     * @return {Boolean}
     */
    store = (data: any) => {
        let currencyInformationSchema = new CurrencyInformationSchema();

        currencyInformationSchema.country = data.country;
        currencyInformationSchema.currency = data.currency;
        currencyInformationSchema.code = data.code;
        currencyInformationSchema.number = data.number;
        currencyInformationSchema.archived = data.archived;

        return currencyInformationSchema.save(function (err) {
            if (err) {
                console.log(`ERROR: ${err}`)
                return false;
            }

            return true;
        });

    }

    /**
     * Gets all the currency information from the database.
     */
    getAll = async() => {
        let currencyInformation: any = [];
        await CurrencyInformationSchema.find()
            .then(data => {
                currencyInformation = data;
            });
        
        return currencyInformation;
    }
}

export default CurrencyInformation;