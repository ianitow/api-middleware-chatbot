import { ICustomer } from './CustomerModel';
import { IUser } from './UserModel';
import { IProduct } from './ProductModel';
import { Schema, model, Document } from 'mongoose';
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
  products: Array<{
    product_id: IProduct['_id'];
    quantity: number;
    price: number;
  }>;
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
      default: STATUS_ORDER_ENUM.PENDING,
    },
    products: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    notes: {
      type: String,
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

  {
    collection: 'orders',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
Order.virtual('total_price').get(function (this: {
  products: IOrder['products'];
}) {
  const totalPrice = <number>(
    this.products
      .map((product) => product.price * product.quantity)
      .reduce((acumulator, current) => acumulator + current)
  );
  return totalPrice.toFixed(2);
});

export default model<IOrder>('Order', Order);
