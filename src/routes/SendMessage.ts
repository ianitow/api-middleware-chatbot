import { Router, Request, Response, response } from 'express';
import { SendMessageProperties } from '../models/SendMessage';
const sendMessageRouter = Router();

sendMessageRouter.post('/', async (req: Request, res: Response) => {
  const { answer }: SendMessageProperties = req.body;

  res.json({
    answers: [
      {
        type: 1,
        score: 99,
        context: 'Esse é um teste1 de contexto',
        document_id: '3820432sjdja',
        meta: {
          _split_id: 24,
          name: 'Documento XYZ',
        },
      },
      {
        type: 1,
        score: 10,
        context: 'T2',
        document_id: '9b30ff',
        meta: {
          _split_id: 12314,
          name: 'Documento b1b1b1',
        },
      },
    ],
  });
});

export default sendMessageRouter;
