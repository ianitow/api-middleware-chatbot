import {
  IReportMessages,
  ReportMessagesProperties,
} from './../models/ReportMessagesModel';
import ReportMessagesModel from '../models/ReportMessagesModel';

export const addNewReportMessage = (report: ReportMessagesProperties) => {
  return new Promise(async (resolve, reject) => {
    const ReportMessagesObject: IReportMessages = new ReportMessagesModel(
      report
    );
    ReportMessagesObject.save()
      .then(() => {
        resolve(ReportMessagesObject);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};
export const listReportMessages = () => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await ReportMessagesModel.find({}));
    } catch (err) {
      reject(err);
    }
  });
};
