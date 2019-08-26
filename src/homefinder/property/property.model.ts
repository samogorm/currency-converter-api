import PropertySchema from './property.schema';
import { IProperty } from './property.interface';

import { algoliaSearch } from './../../utils/Algolia';

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
     * Search the algolia indices for the given term.
     * 
     * @var {string} term The term to find.
     * 
     * @return {Array} properties An array of property data.
     */
    search = async(term: any) => {
        let properties: any;
        properties = await algoliaSearch(term).then(results => properties = results);

        return properties;
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
       
        await PropertySchema.find({
            $text: {
                $search: filters,
                $caseSensitive: false,
                $diacriticSensitive: false
            }
        }).then(data => properties = data);
        return properties;
    }
}

export default Property;