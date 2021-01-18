import { IProduct } from './../models/ProductModel';
import ProductModel from '../models/ProductModel';
import { Types } from 'mongoose';
export const createProduct = ({
  name,
  size,
  quantity,
  price,
}: {
  name: IProduct['name'];
  size: IProduct['size'];
  quantity: IProduct['size'];
  price: IProduct['price'];
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productObject = new ProductModel({ name, size, quantity, price });
      await productObject.save();
      resolve(productObject);
    } catch (err) {
      reject(err);
    }
  });
};
export const editProduct = ({
  id,
  name,
  size,
  quantity,
  price,
}: {
  id: IProduct['_id'];
  name: IProduct['name'];
  size: IProduct['size'];
  quantity: IProduct['size'];
  price: IProduct['price'];
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return reject({ status: 400, message: 'Id has invalid format!' });
      }
      const isExists: IProduct = await ProductModel.findById(id);
      if (!isExists) {
        return reject({ status: 404, message: 'Id not exists!' });
      }

      return resolve(
        ProductModel.findByIdAndUpdate(
          id,
          {
            name,
            size,
            quantity,
            price,
            updated_at: Date.now(),
          },
          { new: true }
        )
      );
    } catch (err) {
      return reject({ status: 500, message: <Error>err.message });
    }
  });
};

export const deleteProduct = ({ id }: IProduct['_id']) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return reject({ status: 400, message: 'Id has invalid format!' });
      }
      const isExists: IProduct = await ProductModel.findById(id);
      if (!isExists) {
        return reject({ status: 404, message: 'Id not exists!' });
      }
      return resolve(await isExists.updateOne({ disabled: true }));
    } catch (err) {
      return reject({ status: 500, message: <Error>err.message });
    }
  });
};
