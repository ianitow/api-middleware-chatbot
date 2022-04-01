import { IRating, RatingProperties } from './../models/RatingModel';

import { addNewRating, listRatings } from './../controllers/RatingController';

import { Router, Request, Response, response } from 'express';
import RatingModel from '../models/RatingModel';

const ratingRouter = Router();
ratingRouter.get('/', async (req: Request, res: Response) => {
  listRatings()
    .then((ratings) => {
      res.json(ratings);
    })
    .catch((err) => {
      res.status(500).json('Erro interno');
    });
});
ratingRouter.post('/', async (req: Request, res: Response) => {
  const { fullname, rating }: RatingProperties = req.body;
  addNewRating({ fullname, rating })
    .then((rating) => {
      res.json(rating);
    })
    .catch((err) => {
      return res.status(500).json('Erro interno');
    });
});

export default ratingRouter;
