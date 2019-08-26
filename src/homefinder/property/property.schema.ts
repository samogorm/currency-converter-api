import mongoose, { Schema } from 'mongoose';
import { IProperty } from './property.interface';

const PropertySchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    details: {
        type: Object,
        required: true
    },
    media: {
        type: Array
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});

PropertySchema.index({ '$**': 'text' });

export default mongoose.model<IProperty>('Properties', PropertySchema);