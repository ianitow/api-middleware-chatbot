import ProductModel, { IProduct } from './../models/ProductModel';
import CustomerModel, { ICustomer } from './../models/CustomerModel';
import { IUser } from './../models/UserModel';
import UserModel from '../models/UserModel';
import OrderModel, { IOrder, STATUS_ORDER_ENUM } from './../models/OrderModel';
export const listOrder = ({ status }: { status: STATUS_ORDER_ENUM }) => {
  return new Promise(async (resolve, reject) => {
    const findByStatus = status ? status : {};
    try {
      resolve(
        await OrderModel.find(findByStatus)
          .populate('customer_id', ['name', 'address', 'number_phone'])
          .populate('products.product_id', ['name', 'size'])
          .sort('created_at')
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
      const isExistsUser: IUser | null = await UserModel.findById(user_id);
      if (!isExistsUser) {
        return reject({ status: 404, message: 'Id not exists for user!' });
      }
      const isExistsCustomer: ICustomer | null = await CustomerModel.findById(
        customer_id
      );
      if (!isExistsCustomer) {
        return reject({ status: 404, message: 'Id not exists for customer!' });
      }

      for (const product of products) {
        const isExistsProduct: IProduct | null = await ProductModel.findById(
          product.product_id
        );
        if (!isExistsProduct) {
          return reject({
            status: 404,
            message: `Product ${product.product_id} not exists`,
          });
        }
        let newQuantity = isExistsProduct.quantity - product.quantity;
        if (newQuantity < 0) {
          return reject({
            status: 406,
            message: `Product ${isExistsProduct.name} is enough`,
          });
        }
        await isExistsProduct.updateOne({
          quantity: newQuantity,
        });

        product.price = isExistsProduct.price;
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
          return doc

            .populate('products.product_id', 'name size')
            .populate('customer_id', 'name address number_phone')
            .execPopulate();
        })
      );
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
      const isExistsOrder: IOrder | null = await OrderModel.findById(id);
      if (!isExistsOrder) {
        return reject({ status: 404, message: 'Id not exists!' });
      }
      if (!status || !STATUS_ORDER_ENUM[status]) {
        return reject({
          status: 400,
          message: 'Status not provided or invalid',
        });
      }
      if (
        status == STATUS_ORDER_ENUM.CANCELLED &&
        isExistsOrder.status != STATUS_ORDER_ENUM.CANCELLED
      ) {
        isExistsOrder.products.forEach(async ({ product_id, quantity }) => {
          await ProductModel.findByIdAndUpdate(
            product_id,
            {
              $inc: {
                quantity,
              },
            },
            { new: true }
          );
        });
      }
      return resolve(
        OrderModel.findByIdAndUpdate(id, { status, notes }, { new: true })
      );
    } catch (err) {
      return reject({ status: 500, message: <Error>err.message });
    }
  });
};
export const patchOrder = ({
  id,
  status,
}: {
  id: IOrder['_id'];
  status: IOrder['status'];
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExistsOrder: IOrder | null = await OrderModel.findById(id);
      if (!isExistsOrder) {
        return reject({ status: 404, message: 'Id not exists!' });
      }
      if (!status) {
        return reject({ status: 400, message: 'Status not provided' });
      }
      if (!status || !STATUS_ORDER_ENUM[status]) {
        return reject({
          status: 400,
          message: 'Status not provided or invalid',
        });
      }
      if (
        status == STATUS_ORDER_ENUM.CANCELLED &&
        isExistsOrder.status != STATUS_ORDER_ENUM.CANCELLED
      ) {
        isExistsOrder.products.forEach(async ({ product_id, quantity }) => {
          await ProductModel.findByIdAndUpdate(
            product_id,
            {
              $inc: {
                quantity,
              },
            },
            { new: true }
          );
        });
      }
      return resolve(
        OrderModel.findByIdAndUpdate(
          id,
          { status },
          { useFindAndModify: false, new: true }
        )
      );
    } catch (err) {
      return reject({ status: 500, message: <Error>err.message });
    }
  });
};
