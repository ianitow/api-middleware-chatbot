import { ICustomer } from './../models/CustomerModel';
import CustomerModel from '../models/CustomerModel';
import { Types } from 'mongoose';
export const createCustomer = ({
  name,
  number_phone,
  address,
}: {
  name: ICustomer['name'];
  number_phone: ICustomer['number_phone'];
  address: ICustomer['address'];
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const customerModel = new CustomerModel({ name, number_phone, address });
      await customerModel.save();
      resolve(customerModel);
    } catch (err) {
      reject(err);
    }
  });
};
export const editCustomer = ({
  id,
  name,
  number_phone,
  address,
}: {
  id: ICustomer['_id'];
  name: ICustomer['name'];
  number_phone: ICustomer['number_phone'];
  address: ICustomer['address'];
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return reject({ status: 400, message: 'Id has invalid format!' });
      }
      const isExists: ICustomer = await CustomerModel.findById(id);
      if (!isExists) {
        return reject({ status: 404, message: 'Id not exists!' });
      }

      return resolve(
        CustomerModel.findByIdAndUpdate(
          id,
          {
            name,
            number_phone,
            address,
          },
          { new: true }
        )
      );
    } catch (err) {
      return reject({ status: 500, message: <Error>err.message });
    }
  });
};

export const deleteCostumer = ({ id }: ICustomer['_id']) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return reject({ status: 400, message: 'Id has invalid format!' });
      }
      const isExists: ICustomer = await CustomerModel.findById(id);
      if (!isExists) {
        return reject({ status: 404, message: 'Id not exists!' });
      }
      return resolve(await isExists.updateOne({ disabled: true }));
    } catch (err) {
      return reject({ status: 500, message: <Error>err.message });
    }
  });
};
