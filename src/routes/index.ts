import { Router } from 'express';
import ratingRouter from './Rating';

const router = Router();

//Routes
router.use('/ratings', ratingRouter);

export default router;
