import { Schema, model, Document } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  number_phone: string;
  address: string;
  created_at: Date;
  updated_at: Date;
  disabled: Boolean;
}

const Customer: Schema = new Schema(
  {
    name: {
      type: String,
      validate: {
        validator: (value: string) => {
          return value.length >= 4;
        },
        message: 'Name must have at least 4 characters',
      },
      required: [true, 'Name is required!'],
    },

    created_at: {
      type: Date,
      default: Date.now,
      select: false,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    number_phone: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  { collection: 'customers' }
);

export default model<ICustomer>('Customer', Customer);
