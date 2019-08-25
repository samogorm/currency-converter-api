import PropertySchema from './property.schema';
import { IProperty } from './property.interface';

class Property {

    /**
     * Stores a property to our database.
     *
     * @param IProperty property The property data to add.
     */
    store = async (property: IProperty) => {
        let propertySchema = new PropertySchema();

        propertySchema = property;

        return propertySchema.save(function (err) {
            if (err) {
                console.log(`ERROR: ${err}`)
                return false;
            }

            return true;
        });
    }

    /**
     * Gets all properties.
     * 
     * If filters are provided it will return the filtered results.
     * 
     * @param {Array} filters the filters to apply.
     */
    getAll = async (filters: any) => {
        let properties: any;
       
        await PropertySchema.find(JSON.parse(filters)).then(data => {
            properties = data;
        });
        return properties;
    }
}

export default Property;