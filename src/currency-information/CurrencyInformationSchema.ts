import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CurrencyInformationSchema = new Schema({
    country: String,
    currency: String,
    code: String,
    number: String,
    archived: Boolean,
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default CurrencyInformationSchema;