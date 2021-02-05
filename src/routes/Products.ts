import { ERROR_PRODUCT_ENUMS } from './../helpers/ProductErrors';
import { Router, Request, Response } from 'express';
import ProductModel, { IProduct } from './../models/ProductModel';
import {
  createProduct,
  deleteProduct,
  editProduct,
} from './../controllers/ProductController';
import { IErrorProduct } from '../helpers/ProductErrors';

const productRouter = Router();
productRouter
  .route('/')
  .get(async (req: Request, res: Response) => {
    const showProductsDisabled: any = req.params.disabled || false;
    let errorMessage: IErrorProduct;
    await ProductModel.find(
      { disabled: showProductsDisabled },
      (err, products) => {
        if (err) {
          errorMessage = {
            type: ERROR_PRODUCT_ENUMS.UNKNOWN,
            message: err.message,
          };
          return res.status(500).json(errorMessage);
        }
        res.json(products);
      }
    );
  })
  .post(async (req: Request, res: Response) => {
    let errorMessage: IErrorProduct;
    const { name, size, quantity, price }: IProduct = req.body;
    if (!name || !size || !quantity || !price) {
      errorMessage = {
        type: ERROR_PRODUCT_ENUMS.PRODUCT_DATA_INVALID,
        status: 400,
      };
      return res.status(400).json(errorMessage);
    } else {
      createProduct({ name, size, quantity, price })
        .then((user) => {
          return res.status(201).json(user);
        })
        .catch((error) => {
          errorMessage = {
            type: ERROR_PRODUCT_ENUMS.UNKNOWN,
            message: error.message,
          };
          return res.status(error.status).json(errorMessage);
        });
    }
  });
productRouter
  .route('/:id')
  .put(async (req: Request, res: Response) => {
    const { id }: IProduct['_id'] = req.params;
    const { name, size, quantity, price }: IProduct = req.body;
    let errorMessage: IErrorProduct;

    if (!name || !size || !quantity || !price) {
      errorMessage = {
        type: ERROR_PRODUCT_ENUMS.PRODUCT_DATA_INVALID,
      };
      return res.status(400).json(errorMessage);
    } else {
      editProduct({ id, name, size, quantity, price })
        .then((user) => {
          return res.status(200).json(user);
        })
        .catch((error) => {
          errorMessage = {
            type: error.type || ERROR_PRODUCT_ENUMS.UNKNOWN,
            message: error.message,
          };
          return res.status(error.status).json(errorMessage);
        });
    }
  })
  .delete(async (req: Request, res: Response) => {
    const { id }: IProduct['_id'] = req.params;
    let errorMessage: IErrorProduct;

    if (!id) {
      errorMessage = {
        type: ERROR_PRODUCT_ENUMS.PRODUCT_DATA_INVALID,
      };
      return res.status(400).json(errorMessage);
    } else {
      deleteProduct({ id })
        .then(() => {
          return res
            .status(204)
            .json({ message: 'Product deleted successfully.' });
        })
        .catch((error) => {
          errorMessage = {
            type: error.type || ERROR_PRODUCT_ENUMS.UNKNOWN,
            message: error.message,
          };
          return res.status(error.status).json(errorMessage);
        });
    }
  });

export default productRouter;
