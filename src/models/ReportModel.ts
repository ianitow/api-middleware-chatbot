import { Schema, model, Document } from 'mongoose';
export interface ReportProperties {
  fullname: string;
  course: string;
  question: string;
  answer: string;
  message: string;

  document_name: string;
}
export interface IReport extends ReportProperties, Document {}

const Report: Schema = new Schema(
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

    course: {
      type: String,
      validate: {
        validator: (value: string) => {
          return value.length >= 4;
        },
        message: 'Name must have at least 4 characters',
      },
      required: [true, 'Course is required!'],
    },
    message: {
      type: String,
      required: [true, 'Message is required!'],
    },
    question: {
      type: String,
      required: [true, 'Question is required!'],
    },
    answer: {
      type: String,
      required: [true, 'Answer is required!'],
    },
    document_name: {
      type: String,
      required: false,
    },

    created_at: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  { collection: 'reports' }
);

export default model<IReport>('Report', Report);
