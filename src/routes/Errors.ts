import { ERROR_USERS_ENUMS } from './../helpers/UsersErrors';
import { ERROR_TOKENS_ENUMS } from '../helpers/TokenErrors';
import { Router, Request, Response } from 'express';
import { ERROR_PRODUCTS_ENUMS } from '../helpers/ProductsErrors';

const errorsRouter = Router();
errorsRouter.route('/').get(async (req: Request, res: Response) => {
  res.json({ ERROR_PRODUCTS_ENUMS, ERROR_USERS_ENUMS, ERROR_TOKENS_ENUMS });
});

export default errorsRouter;
