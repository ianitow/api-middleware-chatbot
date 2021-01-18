import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
export interface UserProperties {
  name: string;
  email: string;
  password: string | undefined;
  number_phone: string;
  address: string;
  created_at: Date;
  updated_at: Date;
  disabled: Boolean;
}
export interface IUser extends UserProperties, Document {}

const User: Schema = new Schema(
  {
    name: {
      type: String,
      validate: {
        validator: (value: string) => {
          return value.length >= 4;
        },
        message: 'Name must have at least 4 characters',
      },
      required: [true, 'Name is required!'],
    },

    email: {
      type: String,
      index: {
        unique: true,
      },
      validate: {
        validator: (value: string) => {
          const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value);
        },
        message: '{VALUE} is not a valid email',
      },
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      validate: {
        validator: (value: string) => {
          return value.length >= 6;
        },
        message: 'Password must have at least 6 characters',
      },
      required: [true, 'Password is required'],
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
    number_phone: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  { collection: 'users' }
);
User.pre<IUser>('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
User.methods.toJSON = function () {
  let obj = <IUser>this.toObject();
  delete obj.password;
  return obj;
};
export default model<IUser>('User', User);
