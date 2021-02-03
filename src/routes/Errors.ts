import { Router, Request, Response } from 'express';
import ProductModel, { IProduct } from './../models/ProductModel';

import { ERROR_PRODUCT_ENUMS } from '../controllers/ProductController';

const errorsRouter = Router();
errorsRouter.route('/').get(async (req: Request, res: Response) => {
  res.json(ERROR_PRODUCT_ENUMS);
});

export default errorsRouter;
