import { Router } from 'express';
import usersRouter from './Users';
import productsRouter from './Products';
import customerRouter from './Customer';
const router = Router();

//Routes
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/customers', customerRouter);
export default router;
