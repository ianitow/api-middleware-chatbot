import { IErrorOrder } from './../helpers/OrdersErrors';
import { STATUS_ORDER_ENUM, IOrder } from './../models/OrderModel';
import {
  listOrder,
  createOrder,
  patchOrder,
  editOrder,
} from './../controllers/OrderController';
import { Router, Request, Response } from 'express';

type IOrderPatch = {
  id: IOrder['_id'];
  status: STATUS_ORDER_ENUM;
};
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
    const { customer_id, products }: IOrder = req.body;
    if (!customer_id || !products) {
      return res.status(400).json({ error: true, message: 'Data invalid!' });
    } else {
      createOrder({ ...req.body, user_id: req.headers.user_id })
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
orderRouter
  .route('/:id')
  .patch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status = STATUS_ORDER_ENUM.PENDING } = req.body;
    let errorMessage: IErrorOrder;

    patchOrder({ id, status })
      .then((order) => {
        res.json(order);
      })
      .catch((err) => {
        errorMessage = {
          type: err.type,
          message: err.message,
          status: err.status || 500,
        };
        return res.status(<number>errorMessage.status).json(errorMessage);
      });
  })
  .put(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status = STATUS_ORDER_ENUM.PENDING, notes = '' } = req.body;
    let errorMessage: IErrorOrder;

    editOrder({ id, status, notes })
      .then((order) => {
        res.json(order);
      })
      .catch((err) => {
        errorMessage = {
          type: err.type,
          message: err.message,
          status: err.status || 500,
        };
        return res.status(<number>errorMessage.status).json(errorMessage);
      });
  });
export default orderRouter;
