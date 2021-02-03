import { Router } from 'express';
import usersRouter from './Users';
import productsRouter from './Products';
import customerRouter from './Customer';
import orderRouter from './Order';
import errorRouter from './Errors';

const router = Router();

//Routes
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/customers', customerRouter);
router.use('/orders', orderRouter);
router.use('/errors', errorRouter);

export default router;
