import mongoose from 'mongoose';

export default () => {
  mongoose.set('useCreateIndex', true);

  return mongoose
    .connect(
      `mongodb://${process.env.USERNAME_MONGO}:${process.env.PASSWORD_MONGO}@${process.env.IP_MONGO}:27017/`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log('✅ Database Connected');
      return mongoose.connection;
    })
    .catch(() => {
      console.log('⭕ Database ERROR');
      return false;
    });
};
