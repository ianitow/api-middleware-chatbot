import { Schema, model, Document } from 'mongoose';
interface MetaReportMessages {
  meta: {
    __split__id: number;
    name: string;
  };
}

export interface ReportMessagesProperties {
  document_id: string;
  answer: string;
  meta: MetaReportMessages;
  name_user: string;
  course_user: string;
}
export interface IReportMessages extends ReportMessagesProperties, Document {}

const ReportMessages: Schema = new Schema(
  {
    document_id: {
      type: Schema.Types.ObjectId,

      required: [true, 'document_id is required!'],
    },
    answer: {
      type: String,
      validate: {
        validator: (value: string) => {
          return value.length >= 5;
        },
      },
      required: [true, 'answer is required!'],
    },

    meta: {
      type: Schema.Types.Mixed,
      validator: (value: MetaReportMessages) => {
        return value.meta.name && value.meta.__split__id;
      },
      required: [true, 'meta is required!'],
    },
    name_user: {
      type: String,
      validate: {
        validator: (value: string) => {
          return value.length >= 5;
        },
      },
      required: [true, 'name_user is required!'],
    },
    course_user: {
      type: String,
      validate: {
        validator: (value: string) => {
          return value.length >= 5;
        },
      },
      required: [true, 'course_user is required!'],
    },

    created_at: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  { collection: 'reports_messages' }
);

export default model<ReportMessagesProperties>('ReportMessage', ReportMessages);
