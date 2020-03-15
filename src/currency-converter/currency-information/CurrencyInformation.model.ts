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
    const currencyInformationSchema = new CurrencyInformationSchema();

    currencyInformationSchema.country = data.country;
    currencyInformationSchema.currency = data.currency;
    currencyInformationSchema.code = data.code;
    currencyInformationSchema.number = data.number;
    currencyInformationSchema.archived = data.archived;

    return currencyInformationSchema.save(err => err ? false : true);
  }

  /**
   * Gets all the currency information from the database.
   */
  getAll = async() => {
    let currencyInformation: any = [];
    await CurrencyInformationSchema.find()
      .then(data => currencyInformation = data);
    
    return currencyInformation;
  }

  /**
   * Gets the currency information by the code.
   * 
   * @param {string} code the currency code.
   */
  getByCode = async(code: string) => {
    let currencyInformation: any;
    await CurrencyInformationSchema.findOne({code: code})
      .then(data => currencyInformation = data);

    return currencyInformation;
  }
}

export default CurrencyInformation;
