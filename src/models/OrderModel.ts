import { ICustomer } from './CustomerModel';
import { IUser } from './UserModel';
import { IProduct } from './ProductModel';
import { Schema, model, Document, SchemaTypes } from 'mongoose';
export enum STATUS_ORDER {
  PENDING,
  CANCELLED,
  FINISHED,
}
export interface IOrder extends Document {
  user_id: IUser['_id'];
  status: STATUS_ORDER;
  customer_id: ICustomer['_id'];
  products: Array<IProduct>;
  notes: String;
}

const Order: Schema = new Schema(
  {
    user_id: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    customer_id: {
      type: SchemaTypes.ObjectId,
      ref: 'Customer',
      required: true,
    },
    status: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
    products: [
      {
        product_id: {
          type: SchemaTypes.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },

  { collection: 'orders' }
);

export default model<IOrder>('Order', Order);
