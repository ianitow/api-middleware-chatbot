import { Router } from 'express';
import usersRouter from './Users';
import productsRouter from './Products';
import customerRouter from './Customer';
import orderRouter from './Order';
const router = Router();

//Routes
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/customers', customerRouter);
router.use('/orders', orderRouter);
export default router;
