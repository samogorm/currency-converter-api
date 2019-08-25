import { Document } from 'mongoose';
import {IAddress} from './interfaces/address.interface';
import {IDetails} from './interfaces/details.interface';

export interface IProperty extends Document {
    name: string;
    address: IAddress;
    details: IDetails;
    media: Array<string>;
    date_added: string;
}