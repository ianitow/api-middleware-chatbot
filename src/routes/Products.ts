import ProductModel, { IProduct } from './../models/ProductModel';
import {
  createProduct,
  deleteProduct,
  editProduct,
} from './../controllers/ProductController';

import { Router, Request, Response } from 'express';

const productRouter = Router();

productRouter
  .route('/')
  .get(async (req: Request, res: Response) => {
    const showProductsDisabled: any = req.params.disabled || false;
    await ProductModel.find(
      { disabled: showProductsDisabled },
      (err, products) => {
        res.json(products);
      }
    );
  })
  .post(async (req: Request, res: Response) => {
    const { name, size, quantity, price }: IProduct = req.body;
    if (!name || !size || !quantity || !price) {
      return res.status(400).json({ error: true, message: 'Data invalid!' });
    } else {
      createProduct({ name, size, quantity, price })
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
productRouter
  .route('/:id')
  .put(async (req: Request, res: Response) => {
    const { id }: IProduct['_id'] = req.params;
    const { name, size, quantity, price }: IProduct = req.body;
    if (!name || !size || !quantity || !price) {
      return res.status(400).json({ error: true, message: 'Data invalid!' });
    } else {
      editProduct({ id, name, size, quantity, price })
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
    const { id }: IProduct['_id'] = req.params;

    if (!id) {
      return res.status(400).json({ error: true, message: 'Data invalid!' });
    } else {
      deleteProduct({ id })
        .then(() => {
          return res
            .status(204)
            .json({ message: 'Product deleted successfully.' });
        })
        .catch((error) => {
          return res
            .status(error.status)
            .json({ error: true, message: error.message });
        });
    }
  });

export default productRouter;
