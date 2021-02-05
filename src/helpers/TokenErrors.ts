import { IError } from './index';
export enum ERROR_TOKENS_ENUMS {
  TOKEN_NOT_PROVIDED = 'TOKEN_NOT_PROVIDED',
  TOKEN_INVALID = 'TOKEN_INVALID',
  TOKEN_BAD_FORMAT = 'TOKEN_BAD_FORMAT',
  UNKNOWN = 'UNKNOWN',
}

export interface IErrorToken extends IError<ERROR_TOKENS_ENUMS> {}
