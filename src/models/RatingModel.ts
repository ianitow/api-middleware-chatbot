import { Schema, model, Document } from 'mongoose';
export interface RatingProperties {
  fullname: string;
  rating: number;
}
export interface IRating extends RatingProperties, Document {}

const Rating: Schema = new Schema(
  {
    fullname: {
      type: String,
      validate: {
        validator: (value: string) => {
          return value.length >= 4;
        },
        message: 'Name must have at least 4 characters',
      },
      required: [true, 'Name is required!'],
    },

    rating: {
      type: Number,
      validate: {
        validator: (value: number) => {
          return value <= 5 && value >= 1;
        },
      },
      required: [true, 'rating is required!'],
    },

    created_at: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  { collection: 'ratings' }
);

export default model<IRating>('Rating', Rating);
