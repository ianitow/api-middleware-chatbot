import { IProduct } from './../models/ProductModel';
import { Types } from 'mongoose';
import ProductModel from '../models/ProductModel';
export enum ERROR_PRODUCT_ENUMS {
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  PRODUCT_NOT_EXISTS = 'PRODUCT_NOT_EXISTS',
  PRODUCT_DATA_INVALID = 'PRODUCT_DATA_INVALID',
  UNKNOWN = 'UNKNOWN',
}
export interface IErrorProduct {
  type: ERROR_PRODUCT_ENUMS;
  status?: number;
  message?: string;
}

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
      const errorMessage: IErrorProduct = {
        type: ERROR_PRODUCT_ENUMS.UNKNOWN,
        message: err.message,
        status: 500,
      };
      reject(errorMessage);
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
    let errorMessage: IErrorProduct;
    try {
      if (!Types.ObjectId.isValid(id)) {
        errorMessage = {
          type: ERROR_PRODUCT_ENUMS.PRODUCT_DATA_INVALID,
          message: 'Id has invalid format!',
          status: 400,
        };
        return reject(errorMessage);
      }
      const isExists: IProduct = await ProductModel.findById(id);
      if (!isExists) {
        errorMessage = {
          type: ERROR_PRODUCT_ENUMS.PRODUCT_NOT_FOUND,
          status: 404,
        };
        return reject(errorMessage);
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
      errorMessage = {
        type: ERROR_PRODUCT_ENUMS.UNKNOWN,
        status: 500,
        message: err.message,
      };
      return reject(errorMessage);
    }
  });
};

export const deleteProduct = ({ id }: IProduct['_id']) => {
  return new Promise(async (resolve, reject) => {
    let errorMessage: IErrorProduct;
    try {
      if (!Types.ObjectId.isValid(id)) {
        errorMessage = {
          type: ERROR_PRODUCT_ENUMS.PRODUCT_DATA_INVALID,
          message: 'Id has invalid format!',
          status: 400,
        };
        return reject(errorMessage);
      }
      const isExists: IProduct = await ProductModel.findById(id);
      if (!isExists) {
        errorMessage = {
          type: ERROR_PRODUCT_ENUMS.PRODUCT_NOT_EXISTS,

          status: 404,
        };
        return reject(errorMessage);
      }
      return resolve(await isExists.updateOne({ disabled: true }));
    } catch (err) {
      errorMessage = {
        type: ERROR_PRODUCT_ENUMS.PRODUCT_DATA_INVALID,
        message: err.message,
        status: 500,
      };
      return reject(errorMessage);
    }
  });
};
