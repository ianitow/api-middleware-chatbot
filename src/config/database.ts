import mongoose from 'mongoose';

export default () => {
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);

  return mongoose
    .connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('✅ Database Connected');
      return mongoose.connection;
    })
    .catch(() => {
      console.log('⭕ Database ERROR');
      return false;
    });
};
