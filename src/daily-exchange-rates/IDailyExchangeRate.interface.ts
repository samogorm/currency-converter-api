import { Document } from 'mongoose';

export interface IDailyExchangeRate extends Document {
    date: string;
    base_currency: string;
    rates: object;
    datetime_retrieved?: string;
    archivable: boolean;
}