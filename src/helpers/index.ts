import { ERROR_PRODUCTS_ENUMS } from './ProductsErrors';
export interface IError<EnumErrors> {
  type: EnumErrors;
  status?: number;
  message?: string;
}
