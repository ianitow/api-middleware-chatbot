import { Schema } from 'mongoose';
import ProductModel from './../models/ProductModel';
import CustomerModel, { ICustomer } from './../models/CustomerModel';
import { IUser } from './../models/UserModel';
import UserModel from '../models/UserModel';
import OrderModel, { IOrder, STATUS_ORDER_ENUM } from './../models/OrderModel';
export const listOrder = ({ status = STATUS_ORDER_ENUM.PENDING }) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(
        await OrderModel.find({ status }).populate('products.product_id')
      );
    } catch (err) {
      reject({ error: true, message: <Error>err.message });
    }
  });
};
export const createOrder = ({
  user_id,
  customer_id,
  products,
  notes,
}: {
  user_id: IOrder['user_id'];
  customer_id: IOrder['customer_id'];
  products: IOrder['products'];
  notes: IOrder['notes'];
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExistsUser: IUser = await UserModel.findById(user_id);
      if (!isExistsUser) {
        return reject({ status: 404, message: 'Id not exists for user!' });
      }
      const isExistsCustomer: ICustomer = await CustomerModel.findById(
        customer_id
      );
      if (!isExistsCustomer) {
        return reject({ status: 404, message: 'Id not exists for customer!' });
      }

      for (const iterator of products) {
        const isExistsProduct = await (<IOrder['products']>(
          ProductModel.findById(iterator.product_id)
        ));
        if (!isExistsProduct) {
          return reject({
            status: 404,
            message: `Product ${iterator.product_id} not exists`,
          });
        }

        const orderObject = new OrderModel({
          status: STATUS_ORDER_ENUM.PENDING,
          user_id,
          customer_id,
          products,
          notes,
        });
        return resolve(
          await orderObject.save().then((doc) => {
            return doc.populate('products.product_id').execPopulate();
          })
        );
      }
    } catch (err) {
      return reject({ status: 500, message: <Error>err.message });
    }
  });
};
export const editOrder = ({
  id,
  status,
  notes,
}: {
  id: IOrder['_id'];
  status: IOrder['status'];
  notes: IOrder['notes'];
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExistsOrder: IOrder = await OrderModel.findById(id);
      if (!isExistsOrder) {
        return reject({ status: 404, message: 'Id not exists!' });
      }
      if (!status) {
        return reject({ status: 400, message: 'Status not provided' });
      }
      return resolve(
        OrderModel.findByIdAndUpdate(id, { status, notes }, { new: true })
      );
    } catch (err) {
      return reject({ status: 500, message: <Error>err.message });
    }
  });
};
