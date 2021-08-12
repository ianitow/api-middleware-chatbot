import { ERROR_USERS_ENUMS, IErrorUser } from './../helpers/UsersErrors';
import { IUser } from './../models/UserModel';
import UserModel from '../models/UserModel';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';

export const listUsers = ({ disabled = false }: { disabled: boolean }) => {
  return new Promise(async (resolve, reject) => {
    let errorMessage: IErrorUser;
    try {
      resolve(await UserModel.find({ disabled }));
    } catch (err) {
      errorMessage = {
        type: err.type || 'UNKNOWN',
        message: err.message,
        status: err.status || 500,
      };
      reject(errorMessage);
    }
  });
};

export const authUser = ({
  email,
  password,
}: {
  email: IUser['email'];
  password: IUser['password'];
}) => {
  return new Promise(async (resolve, reject) => {
    let errorMessage: IErrorUser;
    const isExists: IUser | null = await UserModel.findOne({ email });
    if (!isExists) {
      errorMessage = {
        type: ERROR_USERS_ENUMS.EMAIL_NOT_EXISTS,
        status: 404,
      };
      return reject(errorMessage);
    }

    await compare(password, <string>isExists.password, async (err, same) => {
      if (err) {
        errorMessage = {
          type: ERROR_USERS_ENUMS.UNKNOWN,
          status: 500,
          message: err.message,
        };
        return reject(errorMessage);
      }
      if (!same) {
        errorMessage = {
          type: ERROR_USERS_ENUMS.WRONG_EMAIL_OR_PASSWORD,
          status: 401,
        };
        return reject(errorMessage);
      } else {
        const token = jwt.sign(
          { userId: isExists._id, email: email },
          <string>process.env.SECRET
        );
        resolve(token);
      }
    });
  });
};

export const saveUser = (user: IUser) => {
  return new Promise(async (resolve, reject) => {
    let errorMessage: IErrorUser;
    const isExists: IUser | null = await UserModel.findOne({
      email: user.email,
    });
    if (isExists) {
      errorMessage = {
        type: ERROR_USERS_ENUMS.EMAIL_ALREADY_IN_USE,
        status: 409,
      };
      return reject(errorMessage);
    }
    const UserObject: IUser = new UserModel(user);

    UserObject.save()
      .then(() => {
        UserObject.password = undefined;
        resolve(UserObject);
      })
      .catch((err) => {
        errorMessage = {
          type: ERROR_USERS_ENUMS.UNKNOWN,
          status: 500,
          message: err.message,
        };
        return reject(errorMessage);
      });
  });
};

export const deleteUser = (id: IUser['_id']) => {
  return new Promise(async (resolve, reject) => {
    let errorMessage: IErrorUser;
    if (!Types.ObjectId.isValid(id)) {
      errorMessage = {
        type: ERROR_USERS_ENUMS.DATA_INVALID,
        message: 'Id invalid!',
        status: 400,
      };
      return reject(errorMessage);
    }
    const isExists: IUser | null = await UserModel.findById(id);
    if (!isExists) {
      errorMessage = {
        type: ERROR_USERS_ENUMS.DATA_INVALID,
        message: 'Id not exists!',
        status: 400,
      };
      return reject(errorMessage);
    }
    return resolve(await isExists.updateOne({ disabled: true }));
  });
};

export const editUser = ({ name, email, id, address, number_phone }: any) => {
  return new Promise(async (resolve, reject) => {
    let errorMessage: IErrorUser;
    if (!Types.ObjectId.isValid(id)) {
      errorMessage = {
        type: ERROR_USERS_ENUMS.DATA_INVALID,
        message: 'Id invalid!',
        status: 400,
      };
      return reject(errorMessage);
    }
    const isExists: IUser | null = await UserModel.findById(id);
    if (!isExists) {
      errorMessage = {
        type: ERROR_USERS_ENUMS.DATA_INVALID,
        message: 'Id not exists!',
        status: 400,
      };
      return reject(errorMessage);
    }

    return resolve(
      await UserModel.findByIdAndUpdate(
        id,
        {
          name,
          address,
          number_phone,
          email,
          updated_at: new Date(Date.now()),
        },
        { useFindAndModify: false }
      )
    );
  });
};
