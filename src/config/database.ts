import mongoose from 'mongoose';

export default () => {
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);

  return mongoose
    .connect(
      `mongodb+srv://teste:teste@cluster0.x61va.mongodb.net/myFirstDatabase?retryWrites=true&w=majorityy`,
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
