import { IError } from './index';
export enum ERROR_ORDERS_ENUMS {
  ORDER_NOT_EXISTS = 'ORDER_NOT_EXISTS',
  ORDER_DATA_INVALID = 'ORDER_DATA_INVALID',
  UNKNOWN = 'UNKNOWN',
}

export interface IErrorOrder extends IError<ERROR_ORDERS_ENUMS> {}
