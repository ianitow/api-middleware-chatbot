import { ERROR_USERS_ENUMS } from './../helpers/UsersErrors';
import { Router, Request, Response } from 'express';
import { ERROR_PRODUCTS_ENUMS } from '../helpers/ProductsErrors';

const errorsRouter = Router();
errorsRouter.route('/').get(async (req: Request, res: Response) => {
  res.json({ ERROR_PRODUCTS_ENUMS, ERROR_USERS_ENUMS });
});

export default errorsRouter;
