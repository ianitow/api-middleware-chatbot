import { ERROR_TOKENS_ENUMS } from './../helpers/TokenErrors';
import { IUser } from './../models/UserModel';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IErrorToken } from '../helpers/TokenErrors';
interface userJWT {
  userId: IUser['_id'];
}

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
  let errorMessage: IErrorToken;
  let jwtPayload;
  if (!req.headers['authorization']) {
    errorMessage = {
      type: ERROR_TOKENS_ENUMS.TOKEN_NOT_PROVIDED,
      message: 'Token not provided in header request!',
      status: 400,
    };
    return res.status(<number>errorMessage.status).send(errorMessage);
  }
  const token = <string[]>(
    req.headers['authorization'].toString().split('Bearer ')
  );
  if (token.length != 2) {
    errorMessage = {
      type: ERROR_TOKENS_ENUMS.TOKEN_BAD_FORMAT,
      status: 400,
    };
    return res.status(<number>errorMessage.status).send(errorMessage);
  }

  if (!token) {
    errorMessage = {
      type: ERROR_TOKENS_ENUMS.TOKEN_NOT_PROVIDED,
      status: 400,
    };
    return res.status(<number>errorMessage.status).send(errorMessage);
  }

  jwtPayload = jwt.verify(
    token[1],
    <string>process.env.SECRET,
    function (err, decoded) {
      if (err) {
        errorMessage = {
          type: ERROR_TOKENS_ENUMS.UNKNOWN,
          status: 400,
          message: err.message,
        };
        return res.status(<number>errorMessage.status).send(errorMessage);
      }

      const { userId } = <userJWT>decoded;
      const newToken = jwt.sign({ userId }, <string>process.env.SECRET, {
        expiresIn: '1h',
      });
      res.setHeader('authorization', `Bearer ${newToken}`);
      next();
    }
  );
};
