import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DailyCurrencyRateSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    base_currency: String,
    currency_data: Object,
    archivable: Boolean
});

export default DailyCurrencyRateSchema;