import { Router } from 'express';
import ratingRouter from './Rating';
import reportMessagesRouter from './ReportMessages';
import sendMessageRouter from './SendMessage';
const router = Router();

//Routes
router.use('/send-message', sendMessageRouter);
router.use('/ratings', ratingRouter);
router.use('/report-messages', reportMessagesRouter);

export default router;
