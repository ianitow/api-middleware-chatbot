import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  size: number;
  quantity: number;
  price: number;
  disabled: boolean;
}

const Product: Schema = new Schema(
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
    size: {
      type: Number,

      required: [true, 'size is required!'],
    },
    quantity: {
      type: Number,

      required: [true, 'quantity is required!'],
    },
    price: {
      type: Number,

      required: [true, 'price is required!'],
    },
    disabled: {
      type: Boolean,
      default: false,
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
  },
  { collection: 'products' }
);

export default model<IProduct>('Product', Product);
