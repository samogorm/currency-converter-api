require('dotenv').config();
import algoliasearch from 'algoliasearch';

const client = algoliasearch('V497N2ZO25', '09e4389dd5b11cc6dba38bb55b2e55cc');
const index = client.initIndex('properties');

export const algoliaSearch = async(term: string) => {
    let results: any;

    let searchParams = {
        query: term,
        hitsPerPage: 50,
    }; 

    await index.search(searchParams)
    .then(response => results = response)
    .catch(err => console.log('Error: ', err));

    return results;
}