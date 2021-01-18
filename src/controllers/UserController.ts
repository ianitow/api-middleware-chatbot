import { IUser, UserProperties } from './../models/UserModel';
import UserModel from '../models/UserModel';
import { ObjectId, Types, Query, SchemaTypes } from 'mongoose';
import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';

export const authUser = ({
  email,
  password,
}: {
  email: IUser['email'];
  password: IUser['password'];
}) => {
  return new Promise(async (resolve, reject) => {
    const isExists: IUser = await UserModel.findOne({ email });
    if (!isExists) {
      return reject({ status: 404, message: 'Email not exists' });
    }
    await compare(password, <string>isExists.password, (err) => {
      if (err) {
        return reject({
          status: 401,
          message: 'Email or password is incorrect',
        });
      }
    });
    // const token = jwt.sign(
    //   { userId: _id, email: email },
    //   <string>process.env.SECRET
    // );

    resolve({});
  });
};

export const saveUser = (user: IUser) => {
  return new Promise(async (resolve, reject) => {
    const isExists: IUser = await UserModel.findOne({ email: user.email });
    if (isExists) {
      return reject({ status: 409, message: 'Email already in use!' });
    }
    const UserObject: IUser = new UserModel(user);
    console.log(UserObject);
    UserObject.save()
      .then(() => {
        UserObject.password = undefined;
        resolve(UserObject);
      })
      .catch((err) => {
        reject({ status: 500, message: err });
      });
  });
};

export const deleteUser = (id: IUser['_id']) => {
  return new Promise(async (resolve, reject) => {
    if (!Types.ObjectId.isValid(id)) {
      return reject({ status: 400, message: 'Id has invalid format!' });
    }
    const isExists: IUser = await UserModel.findById(id);
    if (!isExists) {
      return reject({ status: 404, message: 'Id not exists!' });
    }
    return resolve(await isExists.updateOne({ disabled: true }));
  });
};

export const editUser = ({ name, email, id, address, number_phone }: any) => {
  return new Promise(async (resolve, reject) => {
    if (!Types.ObjectId.isValid(id)) {
      return reject({ status: 400, message: 'Id has invalid format!' });
    }
    const isExists: IUser = await UserModel.findById(id);
    if (!isExists) {
      return reject({ status: 404, message: 'Id not exists!' });
    }

    return resolve(
      await UserModel.findByIdAndUpdate(id, {
        name,
        address,
        number_phone,
        email,
        updated_at: new Date(Date.now()),
      })
    );
  });
};
