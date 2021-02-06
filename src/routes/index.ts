import { Router } from 'express';
import usersRouter from './Users';
import productsRouter from './Products';
import customerRouter from './Customer';
import orderRouter from './Order';
import errorRouter from './Errors';
import { checkJWT } from '../middlewares/checkJwt';

const router = Router();

//Routes
router.use('/users', usersRouter);
router.use('/products', [checkJWT], productsRouter);
router.use('/customers', [checkJWT], customerRouter);
router.use('/orders', [checkJWT], orderRouter);
router.use('/errors', errorRouter);

export default router;
