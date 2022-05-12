import { ReportMessagesProperties } from '../models/ReportMessagesModel';

import {
  addNewReportMessage,
  listReportMessages,
} from './../controllers/ReportMessagesController';

import { Router, Request, Response, response } from 'express';

const reportMessageRouter = Router();

reportMessageRouter.get('/', async (req: Request, res: Response) => {
  listReportMessages()
    .then((reports) => {
      res.json(reports);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});
reportMessageRouter.post('/', async (req: Request, res: Response) => {
  const {
    answer,
    document_id,
    course_user,
    name_user,
    meta,
  }: ReportMessagesProperties = req.body;
  addNewReportMessage({ answer, document_id, course_user, name_user, meta })
    .then((reportMessage) => {
      res.status(201).json(reportMessage);
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

export default reportMessageRouter;
