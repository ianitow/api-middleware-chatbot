import { ICustomer } from './CustomerModel';
import { IUser } from './UserModel';
import { IProduct } from './ProductModel';
import { Schema, model, Document, SchemaTypes } from 'mongoose';
export enum STATUS_ORDER_ENUM {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELED',
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  FINISHED = 'FINISHED',
}
export interface IOrder extends Document {
  user_id: IUser['_id'];
  status: STATUS_ORDER_ENUM;
  customer_id: ICustomer['_id'];
  products: Array<{ product_id: IProduct['_id']; quantity: number }>;
  notes: String;
}

const Order: Schema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'WAITING_PAYMENT', 'FINISHED', 'CANCELLED'],
      default: 0,
    },
    products: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    notes: {
      type: String,
    },
  },

  { collection: 'orders' }
);

export default model<IOrder>('Order', Order);
