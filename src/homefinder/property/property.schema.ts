import mongoose, { Schema } from 'mongoose';
import { IProperty } from './property.interface';

const DailyExchangeRateSchema: Schema = new Schema({
    date: {
        type: String,
        required: true
    },
    base_currency: {
        type: String,
        required: true
    },
    rates: {
        type: Object,
        required: true
    },
    datetime_retrieved: {
        type: Date,
        default: Date.now
    },
    archivable: {
        type: Boolean,
        default: false,
        required: true
    }
});

export default mongoose.model<IProperty>('DailyExchangeRate', DailyExchangeRateSchema);