import { ERROR_USER_ENUMS } from './../helpers/UsersErrors';
import { Router, Request, Response } from 'express';
import ProductModel, { IProduct } from './../models/ProductModel';

import { ERROR_PRODUCT_ENUMS } from '../helpers/ProductErrors';

const errorsRouter = Router();
errorsRouter.route('/').get(async (req: Request, res: Response) => {
  res.json({ ERROR_PRODUCT_ENUMS, ERROR_USER_ENUMS });
});

export default errorsRouter;
