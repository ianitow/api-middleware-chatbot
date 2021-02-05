import { ERROR_PRODUCT_ENUMS } from './ProductErrors';
export interface IError<EnumErrors> {
  type: EnumErrors;
  status?: number;
  message?: string;
}
