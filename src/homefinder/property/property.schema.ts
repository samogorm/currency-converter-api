import mongoose, { Schema } from 'mongoose';
import { IProperty } from './property.interface';

const PropterySchema: Schema = new Schema({
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

export default mongoose.model<IProperty>('Property', PropterySchema);