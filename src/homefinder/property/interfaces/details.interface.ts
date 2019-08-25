import {ISize} from './size.interface';
import {IPrice} from './price.interface';

export interface IDetails {
    bedrooms: number;
    bathrooms: number;
    size: ISize;
    price: IPrice;
    available: boolean;
}