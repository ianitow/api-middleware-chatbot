import { verifyJWT } from './../middlewares/checkJwt';
import { IUser, UserProperties } from './../models/UserModel';
import {
  deleteUser,
  saveUser,
  editUser,
  authUser,
  listUsers,
} from './../controllers/UserController';

import { Router, Request, Response, response } from 'express';
import UserModel from '../models/UserModel';
import { ObjectId, Types, SchemaTypes } from 'mongoose';

const userRouter = Router();

userRouter
  .route('/')
  .get(async (req: Request, res: Response) => {
    let disabled = <Boolean>(<unknown>req.query.disabled);

    listUsers({ disabled })
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        return res.status(500).json({ error: true, message: err.message });
      });
  })
  .post(async (req: Request, res: Response) => {
    const { name, password, email }: IUser = req.body;
    if (!name || !password || !email) {
      return res.status(400).json({ error: true, message: 'Data invalid!' });
    } else {
      saveUser(req.body)
        .then((user) => {
          return res.status(201).json(user);
        })
        .catch((error) => {
          return res
            .status(error.status)
            .json({ error: true, message: error.message });
        });
    }
  });

userRouter.route('/token').post(async (req: Request, res: Response) => {
  const { password, email }: UserProperties = req.body;
  authUser({ email, password })
    .then((token) => {
      res.json({ authorization: token });
    })
    .catch((error) => {
      return res
        .status(error.status)
        .json({ error: true, message: error.message });
    });
});
userRouter
  .route('/:id')
  .put(async (req: Request, res: Response) => {
    const { id }: IUser['_id'] = req.params;
    const { name, password, address, number_phone, email }: IUser = req.body;
    if (!id) {
      return res.status(400).json({ error: true, message: 'Data invalid!' });
    } else {
      editUser({ id, name, password, address, number_phone, email })
        .then((user) => {
          return res.status(200).json(user);
        })
        .catch((error) => {
          return res
            .status(error.status)
            .json({ error: true, message: error.message });
        });
    }
  })
  .delete(async (req: Request, res: Response) => {
    const { id }: IUser['_id'] = req.params;

    if (!id) {
      return res.status(400).json({ error: true, message: 'Data invalid!' });
    } else {
      deleteUser(id)
        .then(() => {
          return res
            .status(204)
            .json({ message: 'User deleted successfully.' });
        })
        .catch((error) => {
          return res
            .status(error.status)
            .json({ error: true, message: error.message });
        });
    }
  });

export default userRouter;
