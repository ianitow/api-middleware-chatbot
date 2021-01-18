import { IUser } from './../models/UserModel';
import { SchemaTypes } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
interface userJWT {
  userId: IUser['_id'];
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns Novo token a cada request
 *
 */

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers['authorization']) {
    return res.status(400).send({ error: true, message: 'Token not provided' });
  }
  let jwtPayload: userJWT;
  const token = <string[]>(
    req.headers['authorization'].toString().split('Bearer ')
  );
  if (token.length != 2) {
    return res.status(400).send({ error: true, message: 'Token mal-formed' });
  }

  if (!token)
    return res.status(400).json({ error: true, message: 'No token provided.' });

  jwtPayload = <any>jwt.verify(
    token[1],
    <string>process.env.SECRET,
    function (err, decoded) {
      if (err)
        return res
          .status(401)
          .json({ auth: false, message: 'Failed to authenticate token.' });

      const { userId } = jwtPayload;
      const newToken = jwt.sign({ userId }, <string>process.env.SECRET, {
        expiresIn: '1h',
      });
      res.setHeader('authorization', `Bearer ${newToken}`);
      next();
    }
  );
};
