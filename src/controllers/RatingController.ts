import { IRating, RatingProperties } from './../models/RatingModel';
import RatingModel from '../models/RatingModel';

export const addNewRating = (rating: RatingProperties) => {
  return new Promise(async (resolve, reject) => {
    const RatingObject: IRating = new RatingModel(rating);
    RatingObject.save()
      .then(() => {
        resolve(RatingObject);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};
export const listRatings = () => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await RatingModel.find({}));
    } catch (err) {
      reject(err);
    }
  });
};
