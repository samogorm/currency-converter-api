import { Document } from 'mongoose';

export interface ICurrencyInformation extends Document {
    country: string;
    currency: string;
    code: string;
    number: string;
    archived: boolean;
    created_at: Date;
}