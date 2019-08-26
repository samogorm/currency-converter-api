import Property from './property.model';

class PropertyController {
    /**
    * Gets all properties.
    * 
    * @param String base The base currency.
    */
    getProperties = async (filters: any) => {
        let propertyModel = new Property();

        return await propertyModel.search(filters);
    }

    /**
     * Stores the property in our database schema.
     * 
     * @param any The property data.
     * @param any The API response.
     */
    store = async (property: any) => {
        const propertyModel = new Property();
        return await propertyModel.store(property);
    }

}

export default PropertyController;