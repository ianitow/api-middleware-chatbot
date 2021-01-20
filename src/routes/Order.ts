import { STATUS_ORDER_ENUM, IOrder } from './../models/OrderModel';
import { listOrder, createOrder } from './../controllers/OrderController';
import { ICustomer } from './../models/CustomerModel';

import { Router, Request, Response } from 'express';

const orderRouter = Router();

orderRouter
  .route('/')
  .get((req: Request, res: Response) => {
    const status = <STATUS_ORDER_ENUM>req.params.status;

    listOrder({ status })
      .then((orders) => {
        res.json(orders);
      })
      .catch((err) => {
        return res
          .status(err.status)
          .json({ error: true, message: err.message });
      });
  })
  .post((req: Request, res: Response) => {
    const { user_id, customer_id, products }: IOrder = req.body;
    if (!user_id || !customer_id || !products) {
      return res.status(400).json({ error: true, message: 'Data invalid!' });
    } else {
      createOrder(req.body)
        .then((order) => {
          return res.status(201).json(order);
        })
        .catch((error) => {
          return res
            .status(error.status)
            .json({ error: true, message: error.message });
        });
    }
  });

export default orderRouter;
