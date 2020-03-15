import mongoose, {Schema} from 'mongoose';
import { ICurrencyInformation } from './ICurrencyInformation.interface';

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

export default mongoose.model<ICurrencyInformation>('CurrencyInformation', CurrencyInformationSchema);
